import { NextRequest } from "next/server";
import { handleAuthProxy } from "./features/auth/utils/auth-proxy";

export async function proxy(request: NextRequest) {
  return await handleAuthProxy(request);
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard", "/dashboard/:path*"],
};
