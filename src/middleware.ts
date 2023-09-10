import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/product/female",
    "/product/male",
    "/product/kids",
    "/product/female/(.*?)",
    "/product/male/(.*?)",
    "/product/kids/(.*?)",
    "/cart",
    "/details/(.*?)",
    "/products",
    "/register",
    "/search",
    "/search/(.*?)",

    "/stripe_session",
  ],
  ignoredRoutes: [
    "/api/stripe_session",
    "/api/products",
    "/api/cartfunc",
    "/regiter",
    "/sanity",
  ],
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/checkout",    
  ],
};
