import { get } from "../untils/request";

export const getListQuestion = async (topicId) => {
    const result = await get(`questions?topicId=${topicId}`);
    return result;   
}