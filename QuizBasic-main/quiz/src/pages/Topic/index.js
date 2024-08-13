import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicService";
import { useEffect, useState } from "react";
import './topic.css'; // Sử dụng file CSS riêng biệt cho trang chủ đề

function Topic() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopic();
            setTopics(response);
        }
        fetchApi();
    }, []);

    console.log(topics);

    return(
        <div className="topic-container">
            <h2>Danh sách chủ đề</h2>
            
            {topics.length > 0 && (
            <table className="topic-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên chủ đề</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <Link to={"/quiz/" + item.id} className="topic-link">Làm bài</Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}
export default Topic;