import axios from "axios"

const http = axios.create({
    baseURL:"https://api.huobi.pro/",
    timeout:5000
})

export default http