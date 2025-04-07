import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuth2Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // 홈으로 이동 or 로그인 후 페이지
    } else {
      alert("로그인에 실패했습니다.");
      navigate("/login");
    }
  }, []);

  return <div>로그인 처리 중입니다...</div>;
}

export default OAuth2Redirect;