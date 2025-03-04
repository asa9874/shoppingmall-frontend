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


export const updateMemberInfo = async (memberId:number ,formData: {nickname: string}) => {
  const token = localStorage.getItem("token");
  if (!token) return [];
  try {
    await apiClient.put(`${BASE_URL}/member/${memberId}`, formData);
    console.log("회원 정보 수정");
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}