import React from "react"
import { useLocation } from "react-router-dom"

const Dashboard = () => {
  const currenRoute = useLocation()

  
  console.log("currenRoute: ",currenRoute.pathname);
  
  return <div>Dashboard</div>
}

export default Dashboard
