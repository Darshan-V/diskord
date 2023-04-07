import axios from "axios"
import React from "react"
import { useDispatch } from "react-redux"
import { FcGoogle } from "react-icons/fc"
import { setLoggedInStatus } from "../../store/features/diskord/diskordSlice"

const SignupWithGoogle = () => {
  const dispatch = useDispatch()
  const handleClickRegister = async () => {
    const baseUrl = "http://localhost:3000"
    const response = await axios.get(`${baseUrl}/api/users`)
    console.log(response)
    const url = await response.data
    console.log(url)
    dispatch(setLoggedInStatus(true))
    window.location.href = url.redirectUrl
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
