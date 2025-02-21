import { BASE_URL } from "../../Home/context/baseURL";

export async function registerMember(memberData: { memberId: string, password: string, nickname: string, role: string }) {
    try {
      const response = await fetch(`${BASE_URL}/member/register`, {
        method: 'POST',
        headers: {
          'accept': '*/*', 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(memberData), 
      });
  
      if (!response.ok) {
        throw new Error('회원가입 실패');
      }
  
      const responseData = await response.json();
      return responseData; 
  
    } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`회원가입 오류: ${error.message}`);
        } else {
          throw new Error('회원가입 오류: 알 수 없는 오류 발생');
        }
    }
  }