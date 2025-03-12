import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../apis/question";
import { QuestionResponse } from "../types/QuestionResponse";

function QuestionDetail() {
    const { questionId } = useParams<{ questionId: string }>();
    const [question, setQuestion] = useState<QuestionResponse | null>(null)
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await getQuestion(Number(questionId));
                setQuestion(data);
            } catch (error) {
                console.error("질문 데이터를 가져오는 중 오류 발생:", error);
            }
        }
        fetchQuestion();
    }, []);

    return (
        <div className="min-h-screen w-full bg-gray-100 py-6 flex p-5 justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-screen-xl flex flex-col items-center">
                <h2 className="text-xl font-bold text-gray-800">{question?.title}</h2>
                <span className="text-gray-500 text-sm">{question?.createdDate}</span>
                <span>{question?.memberName}</span>
                <span>{question?.content}</span>
            </div>
        </div>
    );
}

export default QuestionDetail;