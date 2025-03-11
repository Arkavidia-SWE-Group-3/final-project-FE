import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const UserAPI = {
    login: async function({
        email,
        password,
    }: {
        email: string,
        password: string
    }){
        return axios.post("/user/login", {
            email,
            password
        })
    },

    testRestricted: async function(){
        return axios.get("/restricted", {
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`
            }
        })
    },

    register: async function({
        name,
        email,
        password,
        about,
        address,
        currenttitle
    }: {
        name: string,
        email: string,
        password: string,
        about: string,
        address: string,
        currenttitle: string,
    }){
        return axios.post("/user/register", {
            name,
            email,
            password,
            about,
            address,
            currenttitle,
        })
    }
    
}