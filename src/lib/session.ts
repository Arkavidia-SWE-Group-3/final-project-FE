"use server";

import { get } from "http";
import { cookies } from "next/headers";



export const setAuthToken = async (cookie: string) => {
  const cookieStore = await cookies()
  cookieStore.set('auth_token', cookie)
}

export const setUserCookie = async (userData: string) => {
  const cookieStore = await cookies()
  cookieStore.set('user', userData)
}

export const getUserCookie = async () => {
  const cookieStore = await cookies()
  return JSON.parse(cookieStore.get('user')?.value ||  '{"name": "", "current_title": "", "slug": "", "role": "", "profile_picture": ""}')
}

export const getAuthToken = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('auth_token')?.value
}


export const verifySession = async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("auth_token")?.value;
  
    let isAuthenticated = false;
    let user = await getUserCookie();
    if (!cookie) return { isAuthenticated, user };
  
    const session = await decrypt(cookie);
    // const data = await getSession();

  
    if (session) {
      isAuthenticated = true;
    }
  
    return { isAuthenticated, user };
};
  

export async function decrypt(cookie: string | undefined = "") {
  try {
    if (!cookie) {
      throw "no cookie provided";
    }

    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  cookieStore.delete({
    name: "auth_token",
    secure: false,
    path: "/",
  });

  cookieStore.delete({
    name: "user",
    secure: false,
    path: "/",
  });
  
}

// export async function getSession(auth_token?: string) {
//   try {
//     const cookieStore = await cookies();
//     const token = auth_token ?? cookieStore.get("auth_token")?.value;

//     if (!token) return null;


//     const data = await resp.json();
//     return resp.ok ? data : null;
//   } catch (e) {
//     // DO NOTHING
//   }
// }
