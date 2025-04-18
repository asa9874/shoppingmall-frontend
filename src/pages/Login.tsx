import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginMember } from "../apis/auth";

function Login() {
  const [formData, setFormData] = useState({ memberId: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const responseData = await loginMember(formData);
      localStorage.setItem("token", responseData.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      console.error("로그인 실패:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">로그인</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="memberId" className="block text-sm font-medium text-gray-700">아이디</label>
          <input
            type="text"
            id="memberId"
            name="memberId"
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
            로그인
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <a
            href="http://localhost:8080/oauth2/authorization/google"
            className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
          >
            Google 로그인
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
