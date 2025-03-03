import axios from 'axios';
import { BASE_URL } from "../context/baseURL";
import apiClient from './apiClient';

export async function registerMember(memberData: { memberId: string, password: string, nickname: string, role: string }) {
  try {
    const response = await apiClient.post(`${BASE_URL}/member/register`, memberData);
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data || '회원가입 실패';
      console.error('회원가입 실패:', errorMessage);
      throw new Error(`회원가입 실패: ${errorMessage}`);
    } else {
      console.error('회원가입 오류:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}
