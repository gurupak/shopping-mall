const BAST_PATH_API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://shopping-mall-self.vercel.app";
export default BAST_PATH_API;