import { QuestionResponse } from "../types/QuestionResponse";
import apiClient from "./apiClient";

export const getQuestions = async (

): Promise<QuestionResponse[]> => {
  const response = await apiClient.get(`/question`);
  console.log(response);
  const items = response.data;
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item: QuestionResponse) => ({
    questionId: item.questionId,
    memberId: item.memberId,
    title: item.title,
    content: item.content,
    createdDate: item.createdDate,
    updatedDate: item.updatedDate,
    memberName: item.memberName,
  }));
};

export const getQuestion = async (
  questionId: number
): Promise<QuestionResponse> => {
  const response = await apiClient.get(`/question/${questionId}`);
  const item = response.data;
  return {
    questionId: item.questionId,
    memberId: item.memberId,
    title: item.title,
    content: item.content,
    createdDate: item.createdDate,
    updatedDate: item.updatedDate,
    memberName: item.memberName,
  };
}