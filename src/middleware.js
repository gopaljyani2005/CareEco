import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export default async function middleware(request){
  const url = request.nextUrl;
  const path = url.pathname;
  if(!path.startsWith('/signup') && path.startsWith('/login/')){
    const cookie = await cookies();
    const token = cookie.get("usertoken");
    if(!token){
      return NextResponse.redirect(new URL('/login', request.url));
    }
    else{
        return NextResponse.next();
    }
    
  }
}