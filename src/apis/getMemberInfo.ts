import { BASE_URL } from "../context/baseURL";
import apiClient from "./apiClient";

export const getMemberInfo = async () => {
  const token = localStorage.getItem("token");
  if (!token) return [];
  try {
    const response = await apiClient.get(`${BASE_URL}/member/my-info`);
    const items = response.data;
    console.log(items, "회원 정보");
    return items;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};
