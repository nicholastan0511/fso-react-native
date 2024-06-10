import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutation'
import useAuthStorage from './useAuthStorage'
import { useApolloClient } from '@apollo/client'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const [authenticate, result] = useMutation(SIGN_IN)

  const signIn = async (credentials) => {
    const data = await authenticate({
      variables: {
        credentials
      }
    })

    await authStorage.setAccessToken(data.data.authenticate.accessToken)
    apolloClient.resetStore()

    return data
  }

  return [signIn, result]   
}

export default useSignIn