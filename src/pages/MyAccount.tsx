import React from 'react'

import { useGetPdfQuery } from '@/features/api/apiSlice'

const MyAccount = () => {
  const { data, isError, isLoading, isFetching } = useGetPdfQuery('notes_02.pdf')
  
  return (
    <div>MyAccount</div>
  )
}

export default MyAccount