import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Define NEXT_PUBLIC_API_URL en tu .env");
}

export default axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
