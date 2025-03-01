import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../context/baseURL";
import { useAuthStore } from "../store/useAuthStore";

function Header() {
  const { id, nickname, role, setUser, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetchMemberInfo(token);
  }, []);

  const fetchMemberInfo = async (token: string) => {
    try {
      const response = await fetch(`${BASE_URL}/member/my-info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.id && data.memberId && data.nickname && data.role) {
          setUser({
            id: data.id,
            memberId: data.memberId,
            nickname: data.nickname,
            role: data.role,
          });
        } else {
          console.error("유효한 사용자 정보 없음");
          logout();
        }
      } else {
        console.error("회원 정보 불러오기 실패");
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
        <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
          홈
        </button>
      </Link>

      {id ? ( 
        <div className="flex items-center gap-4">
          <span className="font-bold">{nickname}님</span>

          {role === "ADMIN" && (
            <Link to="/admin">
              <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
                관리자 페이지
              </button>
            </Link>
          )}

          {role === "SELLER" && (
            <Link to={`/seller/${id}/products`}>
              <button className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-700">
                판매자 페이지
              </button>
            </Link>
          )}

          {role === "CUSTOMER" && (
            <>
              <Link to={`/customer/${id}/cart`}>
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
                  장바구니
                </button>
              </Link>
              <Link to={`/customer/${id}/orders`}>
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
                  주문 목록
                </button>
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/register">
            <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
              회원가입
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
              로그인
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
