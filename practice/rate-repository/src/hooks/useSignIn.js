import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutation'
import { useState, useEffect } from 'react'

const useSignIn = () => {
  const [authenticate, result] = useMutation(SIGN_IN)

  const signIn = async (credentials) => {
    const data = await authenticate({
      variables: {
        credentials
      }
    })

    return data
  }

  return [signIn, result]   
}

export default useSignIn