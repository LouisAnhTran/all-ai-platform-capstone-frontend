// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { build } from "vite"
import type {  BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

// Function to get the token from cookies
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift()
  return undefined
}

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

console.log("api base url: ",apiBaseUrl)

console.log("i am torres")

interface GenerateResponseStreamArgs {
  docname: string;
  messages: any;
}

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: headers => {
      const token = getCookie("access_token")
      console.log("token: ",token)
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    }
  }),
  // The "endpoints" represent operations and requests for this server
  tagTypes: ['Post'],
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/posts",
    }),
    addUser: builder.mutation({
      query: userData => ({
        url: "/user_signup",
        method: "POST",
        body: userData,
      }),
    }),
    getUserOnboardingStatus: builder.query({
      query: (email_address) => `/auth/check_onboarding_status/${email_address}`
    }),
    onboardNewUser: builder.mutation({
      query: userData => ({
        url: "/auth/onboard_user",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: credentials => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    uploadFile: builder.mutation<File, FormData>({
      query: (formData) => ({
        url: '/uploadfile',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Post']
    }),
    fetchMessages: builder.query({
      query: (docName) => ({
        url: `/fetch_messages/${docName}`,
        method: 'GET',
      })
    }),
    getPdf: builder.query({
      query: (docname) => ({
        url: `/get-pdf/${docname}`,
        method: 'GET'
      })
    }),
    getAllDocs: builder.query({
      query: () => '/all_docs',
      providesTags: ['Post']
    }),
    genarateResponse: builder.query({
      query: (docname) => ({
        url: `/generate_response/${docname}`,
      }),
    }),
    genarateResponseStream: builder.query<ReadableStream<string>, GenerateResponseStreamArgs>({
      query: ({docname,messages}) => ({
        url: `/generate_response/${docname}`,
        method: 'POST',
        body: messages
      }),
    }),
    fetchAllMessages: builder.query({
      query: (docname) =>({
        url: `/fetch_messages/${docname}`
      })
    })
  }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { 
  useGetPostsQuery, 
  useAddUserMutation, 
  useLoginMutation, 
  useUploadFileMutation, 
  useFetchMessagesQuery,
  useGetPdfQuery,
  useGetAllDocsQuery,
  useGenarateResponseStreamQuery,
  useFetchAllMessagesQuery,
  useGetUserOnboardingStatusQuery,
  useOnboardNewUserMutation } =
  apiSlice
