import { type NextRequest, NextResponse } from "next/server";// Adjust this path to where your helper lives
import { createClient } from "./utils/supabase/middleware";

const ROLE_ROUTES: Record<string, string> = {
  "/admin/dashboard": "admin",
  "/company/dashboard": "company",
  "/dashboard": "seeker",
};


export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("=> Middleware triggered for path:", pathname);

  // 1. Call your Supabase helper to refresh cookies globally
  const { supabaseResponse, supabase } = await createClient(request);

  console.log("=> Supabase client synced. Getting current user...");
  
  // 2. Safely fetch the user session using the created instance
  const { data: { user } } = await supabase.auth.getUser();
  
  // 3. Match protected dashboard pathways
  const matchedRoute = Object.keys(ROLE_ROUTES).find((path) => 
    pathname.startsWith(path)
  );

  if (matchedRoute) {
    // Guard Clause: No valid session
    if (!user) {
      console.log("=> No user found, redirecting to login");
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    console.log("=> User found:", user.id);
    const requiredRole = ROLE_ROUTES[matchedRoute];
    
    // Extract user role from Supabase metadata structures
    const userRole = user.app_metadata?.role || user.user_metadata?.role;
    console.log(`=> Checking access: User is "${userRole}", needs "${requiredRole}"`);

    // Master Admin bypass or exact role check
    if (userRole === "admin") {
      return supabaseResponse;
    }

    if (userRole !== requiredRole) {
      console.log("=> Role mismatch. Redirecting to unauthorized safety net.");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if(pathname === "/login" && user){
    console.log("=> User already logged in, redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }


  // Pass through cleanly for all non-dashboard files
  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};