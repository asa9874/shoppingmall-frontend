import { BASE_URL } from "../pages/Home/context/baseURL";

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
    }
  }