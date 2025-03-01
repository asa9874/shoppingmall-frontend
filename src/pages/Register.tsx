import { useState } from 'react';
import { registerMember } from '../apis/Register';
import { useNavigate } from 'react-router-dom';

function Register() {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    nickname: '',
    role: 'CUSTOMER', // 기본값은 'CUSTOMER'
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const memberData = {
      memberId: formData.user_id,
      password: formData.password,
      nickname: formData.nickname,
      role: formData.role,
    };

    try {
      const responseData = await registerMember(memberData); 
      console.log('회원가입 성공:', responseData);
      navigate('/'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
  <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">사용자 아이디</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">역할</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="CUSTOMER">고객</option>
            <option value="SELLER">판매자</option>
            <option value="BOTH">고객 및 판매자</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
