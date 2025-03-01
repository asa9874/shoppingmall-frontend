import axios from 'axios';
import { BASE_URL } from "../context/baseURL";

export async function loginMember(memberData: { memberId: string; password: string }) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, memberData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    if (!response.data?.token) {
      throw new Error("로그인 응답에 토큰이 없습니다.");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data || "아이디 또는 비밀번호를 확인하세요.";
      console.error("로그인 실패:", errorMessage);
      throw new Error(`로그인 실패: ${errorMessage}`);
    } else {
      console.error("로그인 오류:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}
