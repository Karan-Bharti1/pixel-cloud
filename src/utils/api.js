import axios from 'axios'
import { baseURL } from '../url'

const api=axios.create({
    baseURL:`${baseURL}/auth`
})
export const googleAuth=(code)=>api.get(`/google?code=${code}`)