import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080/v1/api'

export const TypeHTTP = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}

export const api = ({ path, body, type, sendToken }) => {
    const accessToken = globalThis.window.localStorage.getItem('accessToken')
    const refreshToken = globalThis.window.localStorage.getItem('refreshToken')
    return new Promise((rejects, resolve) => {
        switch (type) {
            case TypeHTTP.GET:
                axios.get(path, { headers: sendToken ? { accessToken, refreshToken } : {} })
                    .then(res => {
                        rejects(res.data)
                    })
                    .catch(res => {
                        resolve({ status: res.response?.status, message: res.response?.data.message })
                    })
                break
            case TypeHTTP.POST:
                axios.post(path, body, { headers: sendToken ? { accessToken, refreshToken } : {} })
                    .then(res => {
                        rejects(res.data)
                    })
                    .catch(res => {
                        resolve({ status: res.response?.status, message: res.response?.data.message })
                    })
                break
            case TypeHTTP.PUT:
                axios.put(path, body, { headers: sendToken ? { accessToken, refreshToken } : {} })
                    .then(res => {
                        rejects(res.data)
                    })
                    .catch(res => {
                        resolve({ status: res.response?.status, message: res.response?.data.message })
                    })
                break
            case TypeHTTP.DELETE:
                axios.delete(path, { headers: sendToken ? { accessToken, refreshToken } : {} })
                    .then(res => {
                        rejects(res.data)
                    })
                    .catch(res => {
                        resolve({ status: res.response?.status, message: res.response?.data.message })
                    })
                break
        }
    })
}