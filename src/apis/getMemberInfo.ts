import { BASE_URL } from "../context/baseURL";

export const getMemberInfo = async () => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/member/my-info`;
  
  if(!token) {return null;}
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data.id && data.memberId && data.nickname && data.role) {
        return data; // 유저 정보를 반환
      } else {
        console.error("유효한 사용자 정보 없음");
        return null;
      }
    } else {
      console.error("회원 정보 불러오기 실패");
      return null;
    }
  } catch (error) {
    console.error("API 요청 오류:", error);
    return null;
  }
};
