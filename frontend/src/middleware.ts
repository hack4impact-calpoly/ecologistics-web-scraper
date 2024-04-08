// // import { withAuth } from "next-auth/middleware";

// // export default withAuth({
// //   pages: {
// //     signIn: "/login",
// //   },
// // });

export { default } from "next-auth/middleware";

export const config = { matcher: ["/"] };
