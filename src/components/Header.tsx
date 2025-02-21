import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="h-[60px] bg-gray-800 flex items-center justify-between px-6">
            <Link to="/">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    홈
                </button>
            </Link>
            <Link to="/register">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    회원가입
                </button>
            </Link>
        </div>
    );
}

export default Header;
