import axios from "axios"

export const fn = (id: number) => {
    return axios.get(`http://127.0.0.1:3000/test/user?id=${id}`)
}

export const a = 10
