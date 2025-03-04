import { useState } from "react";
import { updateMemberInfo } from "../apis/member"; // 업데이트 API 호출 함수
import { useAuthStore } from "../store/useAuthStore";

function MemberUpdate() {
  const { id, nickname } = useAuthStore();
  const [formData, setFormData] = useState({
    nickname: nickname || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(!id) throw new Error("사용자 ID가 없습니다.");
      await updateMemberInfo(id,formData);
      alert("정보가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("정보 업데이트 중 오류 발생:", error);
      alert("정보 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
      <div className="w-4/5 min-h-screen bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5">내 정보 업데이트</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">사용자 ID</label>
            <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">닉네임</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            정보 업데이트
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemberUpdate;