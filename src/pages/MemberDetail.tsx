import { useAuthStore } from "../store/useAuthStore";

function MemberDetail() {
  const { id, nickname, role } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
      <div className="w-4/5 min-h-screen bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5">내 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">사용자 ID</label>
            <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">닉네임</label>
            <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{nickname}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">역할</label>
            <p className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetail;