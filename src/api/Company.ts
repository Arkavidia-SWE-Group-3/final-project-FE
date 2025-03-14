import { getAuthToken } from "@/lib/session"
import axios from "./axios"

export const CompanyAPI = {
    getProfile: async function({
        slug
    }: {
        slug: string
    }){
        return axios.get(`/company/profile/${slug}`)
    },

    updateProfile: async function({
        company_id,
        name,
        industry,
        logo,
        cover,
        about,
    }: {
        company_id: string,
        name: string,
        industry: string,
        logo: Blob | null,
        cover: Blob | null
        about: string
    }){

        return axios.patch(`/company/update-profile`, {
            company_id,
            name,
            location,
            industry,
            logo,
            cover,
            about,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                
            }
        })
    },

    addJob: async function({
        company_id,
        title,
        description,
        location,
        location_type,
        job_type,
        min_salary,
        max_salary,
        experience,
        skills
    }: {
        company_id: string,
        title: string,
        description: string,
        location_type: string,
        location: string,
        job_type: string,
        min_salary: number,
        max_salary: number,
        experience: string,
        skills: string[]
    }){

        return axios.post(`/company/add-job`, {
            company_id,
            title,
            description,
            location,
            job_type,
            min_salary,
            max_salary,
            experience,
            skills,
            location_type
        })
    },

    updateJob: async function({
        company_id,
        job_id,
        title,
        description,
        location,
        location_type,
        job_type,
        min_salary,
        max_salary,
        experience,
        skills
    }: {
        company_id: string,
        job_id: string,
        title: string,
        description: string,
        location_type: string,
        location: string,
        job_type: string,
        min_salary: number,
        max_salary: number,
        experience: string,
        skills: string[]
    }){

        return axios.patch(`/company/update-job`, {
            company_id,
            job_id,
            title,
            description,
            location,
            job_type,
            min_salary,
            max_salary,
            experience,
            skills,
            location_type
        })
    }
}