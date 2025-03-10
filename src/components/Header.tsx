import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMemberInfo } from "../apis/member";
import { useAuthStore } from "../store/useAuthStore";

function Header() {
  const { id, nickname, role, setUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getMemberInfo().then((data) => {
      if (data) {
        setUser({
          id: data.id,
          memberId: data.memberId,
          nickname: data.nickname,
          role: data.role,
        });
      } else {
        logout();
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="h-[60px] bg-gray-800 flex items-center justify-between px-6 text-white">
        <Link to="/">
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
            HOME
          </button>
        </Link>
        <Link to="/product/search">
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
            검색
          </button>
        </Link>
        <Link to="/questions">
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
            질문
          </button>
        </Link>

        <div className="flex items-center gap-4">
          {id ? (
            <>
              <span className="font-bold ">{nickname}님</span>
              <Link to={`/member/${id}`} className="hidden sm:block">
                <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
                  내 정보 페이지
                </button>
              </Link>

              {role === "ADMIN" && (
                <Link to="/admin" className="hidden sm:block">
                  <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
                    관리자 페이지
                  </button>
                </Link>
              )}

              {role === "SELLER" && (
                <>
                  <Link
                    to={`/seller/${id}/products`}
                    className="hidden sm:block"
                  >
                    <button className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-700">
                      상품 관리
                    </button>
                  </Link>
                  <Link
                    to={`/seller/${id}/products/create`}
                    className="hidden sm:block"
                  >
                    <button className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-700">
                      상품 등록
                    </button>
                  </Link>
                </>
              )}

              {role === "CUSTOMER" && (
                <>
                  <Link to={`/customer/${id}/cart`} className="hidden sm:block">
                    <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
                      장바구니
                    </button>
                  </Link>
                  <Link
                    to={`/customer/${id}/orders`}
                    className="hidden sm:block"
                  >
                    <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
                      주문 목록
                    </button>
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 hidden sm:block"
              >
                로그아웃
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/register" className="hidden sm:block">
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
                  회원가입
                </button>
              </Link>
              <Link to="/login" className="hidden sm:block">
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
                  로그인
                </button>
              </Link>
            </div>
          )}
          <button
            className="sm:hidden bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
            onClick={toggleMenu}
          >
            메뉴
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="w-full bg-gray-800 flex flex-col items-center sm:hidden">
          {id ? (
            <>
              <Link to={`/member/${id}`} className="w-full">
                <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 w-full">
                  내 정보 페이지
                </button>
              </Link>

              {role === "ADMIN" && (
                <Link to="/admin" className="w-full">
                  <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 w-full">
                    관리자 페이지
                  </button>
                </Link>
              )}

              {role === "SELLER" && (
                <>
                  <Link to={`/seller/${id}/products`} className="w-full">
                    <button className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-700 w-full">
                      상품 관리
                    </button>
                  </Link>
                  <Link to={`/seller/${id}/products/create`} className="w-full">
                    <button className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-700 w-full">
                      상품 등록
                    </button>
                  </Link>
                </>
              )}

              {role === "CUSTOMER" && (
                <>
                  <Link to={`/customer/${id}/cart`} className="w-full">
                    <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 w-full">
                      장바구니
                    </button>
                  </Link>
                  <Link to={`/customer/${id}/orders`} className="w-full">
                    <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 w-full">
                      주문 목록
                    </button>
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 w-full"
              >
                로그아웃
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <Link to="/register" className="w-full">
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 w-full">
                  회원가입
                </button>
              </Link>
              <Link to="/login" className="w-full">
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 w-full">
                  로그인
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
