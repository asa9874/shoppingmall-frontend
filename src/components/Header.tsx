import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../pages/Home/context/baseURL";
import { useAuthStore } from "../store/useAuthStore";

function Header() {
  const { nickname, setNickname, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetchNickname(token);
  }, []);

  const fetchNickname = async (token: string) => {
    try {
      const response = await fetch(`${BASE_URL}/member/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNickname(data.nickname);
      } else {
        console.error("닉네임 불러오기 실패");
        logout();
      }
    } catch (error) {
      console.error("API 요청 오류:", error);
      logout();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-[60px] bg-gray-800 flex items-center justify-between px-6 text-white">
      <Link to="/">
        <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">홈</button>
      </Link>

      {nickname ? (
        <div className="flex items-center gap-4">
          <span className="font-bold">{nickname}님</span>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
            로그아웃
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/register">
            <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">회원가입</button>
          </Link>
          <Link to="/login">
            <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">로그인</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
