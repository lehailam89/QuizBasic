import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answersService";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import './answers.css'; // Sử dụng file CSS riêng biệt cho trang câu trả lời

function Answers() {
    const [dataAnswers, setDataAnswers] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const answersByUserId = await getAnswersByUserId();
            const topics = await getListTopic();

            let result = [];

            for(let i=0; i < answersByUserId.length; i++){
                result.push({
                    ...topics.find(item => item.id === answersByUserId[i].topicId),
                    ...answersByUserId[i] 
                });

                setDataAnswers(result.reverse());
            }
        }
        fetchApi();
    }, []);

    console.log(dataAnswers);
    return(
        <div className="answers-container">
            <h2>Danh sách các bài đã luyện tập</h2>

            {dataAnswers.length > 0 && (
            <table className="answers-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên chủ đề</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {dataAnswers.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <Link to={"/result/" + item.id} className="answers-link">Xem chi tiết</Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}
export default Answers;