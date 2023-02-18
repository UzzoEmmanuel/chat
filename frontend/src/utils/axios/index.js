import axiosCore from 'axios'

const ROOT_URL = process.env.REACT_APP_ROOT_URL

const defaultInterceptor = {
  request: (config) => {
    const getToken = localStorage.getItem('token')
    const token = getToken
    config.headers.Authorization = 'bearer' + token
    return config
  },
}

const axios = axiosCore.create({
  baseURL: ROOT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
axios.interceptors.request.use(defaultInterceptor.request)

export { axios }
