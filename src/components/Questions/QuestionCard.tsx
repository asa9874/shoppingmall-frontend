import { Link } from "react-router-dom";
import { QuestionResponse } from "../../types/QuestionResponse";

interface QuestionCardProps {
    question: QuestionResponse;
}

function QuestionCard({question}:QuestionCardProps) {
    return (
        <Link to={`/questions/${question.questionId}`}
            className="bg-white gap-4 md:gap-10 px-4 md:px-6 py-4 overflow-x-auto scrollbar-hide grid grid-cols-3">
            <span>{question.memberName}</span>
            <span>{question.title}</span>
            <span>{question.createdDate}</span>
        </Link>
    );
}

export default QuestionCard;