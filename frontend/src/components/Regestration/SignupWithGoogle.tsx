import axios from "axios"
import React from "react"
import { FcGoogle } from "react-icons/fc"

const SignupWithGoogle = () => {
  const handleClickRegister = async () => {
    const baseUrl = "http://localhost:3000"
    const response = await axios.get(`${baseUrl}/api/users`)
    console.log(response)
    const url = await response.data
    console.log(url)
    window.location.href = url.url
  }
  return (
    <div
      className="w-full h-full flex"
      onClick={handleClickRegister}
    >
      <div>
        <FcGoogle className="text-3xl" />
      </div>
      <span className="w-full text-sm m-auto p-2 text-white">
        Signup with Google
      </span>
    </div>
  )
}

export default SignupWithGoogle
