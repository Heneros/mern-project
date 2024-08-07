import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const AuthVerify = () => {
 const navigate = useNavigate();
    useEffect(() =>{
const timer=  setTimeout(() =>{
navigate("/profile")
  }, 2600)

  return () => clearTimeout(timer)

 }, [navigate])
    return (
    <Container>
      <h1 className="text-center">  Successfully Verified ! </h1>
      <h3 className="text-center">  Please authorize in login</h3>
    </Container>
  )
}
