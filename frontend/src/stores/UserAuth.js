import useSWRV from 'swrv'
import axios from 'redaxios'

const fetcher = (url) => {
  return axios(url).then((r) => r)
}

// TODO create is logged in state, only fetch after the first login.
// Refresh access token while there is refresh token
export default function userAuth() {
  const { data: userAuthData, error: userAuthError } = useSWRV('/api/me', fetcher)
  

  return {
    userAuthData,
    userAuthError
  }
}
