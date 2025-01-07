import type { Metadata } from "next";
import { redirect } from 'next/navigation'
//import { cookies } from 'next/headers'

export default function IndexPage(){
  // const accessToken: string = cookies().get('token')?.value
  // if(!accessToken){
  //   return redirect('/pages/login')
  // } 
  return redirect('/pages/dashboard')
}

export const metadata: Metadata = {
  title: "RAB Admin Panel",
};
