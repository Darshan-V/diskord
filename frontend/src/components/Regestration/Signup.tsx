import React, { useState } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack
} from "@chakra-ui/react"
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri"

import SignupWithGoogle from "./SignupWithGoogle"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className=" flex w-screen h-screen bg-[#7880f7]">
      <div className="flex flex-col bg-slate-800 w-1/3 p-5 rounded-lg m-auto">
        <form>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel color="white">Email</FormLabel>
              <Input
                type="email"
                required
                placeholder="Email"
                variant="filled"
                bgColor="#1c1c1c"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="white">Username</FormLabel>
              <Input
                type="text"
                required
                placeholder="Username"
                bgColor="#1c1c1c"
                variant="filled"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="white">Password</FormLabel>

              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  variant="filled"
                  bgColor="#1c1c1c"
                />
                <InputRightElement>
                  {showPassword ? (
                    <RiEyeOffFill
                      className="text-white"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <RiEyeFill
                      className="text-white "
                      onClick={toggleShowPassword}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel color="white">
                Date of Birth
              </FormLabel>
              <Input
                placeholder="Select Date"
                size="md"
                type="date"
                bgColor="#1c1c1c"
                variant="filled"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Register
            </Button>
          </Stack>
        </form>
        <br></br>
        <span className="m-auto text-white">OR</span>
        <div className="flex m-auto cursor-pointer hover:bg-[#3f4147] p-2 rounded-lg">
          <SignupWithGoogle />
        </div>
      </div>
    </div>
  )
}

export default Signup
