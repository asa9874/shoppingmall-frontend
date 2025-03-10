import QuestionCard from "../components/Questions/QuestionCard";

function Questions() {
    return (
        <div className="min-h-screen w-full bg-gray-100 py-6 flex p-5 justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-screen-xl">
                <h2 className="text-xl font-bold text-gray-800">질문</h2>
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
            </div>
        </div>
    );
}

export default Questions;