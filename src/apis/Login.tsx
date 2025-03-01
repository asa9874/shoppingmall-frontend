import { BASE_URL } from "../pages/Home/context/baseURL";

export async function loginMember(memberData: { memberId: string; password: string }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData), 
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`로그인 실패: ${errorMessage || "아이디 또는 비밀번호를 확인하세요."}`);
    }

    const responseData = await response.json();

    if (!responseData?.token) {
      throw new Error("로그인 응답에 토큰이 없습니다.");
    }

    return responseData;
  } catch (error) {
    console.error("로그인 오류:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}
