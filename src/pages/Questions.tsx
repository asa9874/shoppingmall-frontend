import { useEffect, useState } from "react";
import { getQuestions } from "../apis/question";
import QuestionCard from "../components/Questions/QuestionCard";
import { QuestionResponse } from "../types/QuestionResponse";

function Questions() {
    const [questions, setQuestions] = useState<QuestionResponse[]>([]);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestions();
                setQuestions(data);
            } catch (error) {
                console.error("질문 데이터를 가져오는 중 오류 발생:", error);
            }
        }
        fetchQuestions();
    }, []);
    return (
        <div className="min-h-screen w-full bg-gray-100 py-6 flex p-5 justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-screen-xl">
                <h2 className="text-xl font-bold text-gray-800">질문</h2>
                {questions.map((question) => (
                    <QuestionCard key={String(question.questionId)} question={question} />
                ))}
            </div>
        </div>
    );
}

export default Questions;