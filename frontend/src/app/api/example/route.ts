import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTest() {
  try {
    const response = await axios.get(`${API_URL}/test/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching test:", error);
    throw error;
  }
}
