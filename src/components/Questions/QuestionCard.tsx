import { Link } from "react-router-dom";

function QuestionCard() {
    return (
        <Link to={`/questions/${1}`}
            className="bg-white gap-4 md:gap-10 px-4 md:px-6 py-4 overflow-x-auto scrollbar-hide grid grid-cols-3">
            <span>작성자</span>
            <span>제목</span>
            <span>작성일자</span>
        </Link>
    );
}

export default QuestionCard;