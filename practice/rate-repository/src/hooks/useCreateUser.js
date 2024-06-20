import { useMutation } from "@apollo/client"
import { useState } from "react"
import { SIGN_UP } from "../graphql/mutation"

const useCreateUser = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [mutation, result] = useMutation(SIGN_UP, {
    onError: (error) => {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage('') 
      }, 5000)
    }
  })

  const signUp = async (user) => {
    const data = await mutation({
      variables: {
        user
      }
    })
    
    return data
  }

  return [signUp, errorMessage, result]
}

export default useCreateUser