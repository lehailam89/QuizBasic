/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizsService";
import './quiz.css'; // Sử dụng file CSS riêng biệt cho trang quiz

function Quiz() {
    const params = useParams();
    const [dataTopic, setDataTopic] = useState();
    const [dataQuestions, setDataQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTopic(params.id);
            setDataTopic(response);
        } 
        fetchApi();
    }, [params.id]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListQuestion(params.id);
            setDataQuestions(response);
        }
        fetchApi(); 
    }, [params.id]);

    const handleAnswerClick = (questionId, answerIndex) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: answerIndex
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let selectedAnswersArray = Object.entries(selectedAnswers).map(([questionId, answerIndex]) => ({
            questionId: parseInt(questionId),
            answer: parseInt(answerIndex)
        }));

        let options = {
            userId: parseInt(getCookie("id")),
            topicId: parseInt(params.id),
            answers: selectedAnswersArray
        };

        const response = await createAnswer(options);
        console.log(response);
        if(response) {
            navigate(`/result/${response.id}`);
        }
    }

    return(
        <div className="quiz-container">
            <h2>Bài Quiz chủ đề: {dataTopic && (
                <>
                {dataTopic.name}
                </>
            )}</h2>

            <div className="form-quiz">
                <form onSubmit={handleSubmit}>
                    {dataQuestions.map((item, index) => (
                        <div className="form-quiz__item" key={item.id}>
                            <p className="quiz-head">Câu {index + 1}: {item.question}</p>
                            <div className="form-quiz__answers">
                                {item.answers.map((itemAns, indexAns) => (
                                    <div 
                                        className={`form-quiz__answer ${selectedAnswers[item.id] === indexAns ? 'selected' : ''}`} 
                                        key={indexAns} 
                                        onClick={() => handleAnswerClick(item.id, indexAns)}
                                    >
                                        {itemAns}
                                    </div>
                                ))}
                            </div>
                        </div>  
                    ))}
                    <button type="submit" className="submit-button">
                        Nộp bài
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Quiz;
