import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionService";
import "./Result.css";

function Result() {
    const params = useParams();
    const [dataResult, setDataResult] = useState([]);
    const [correctPercentage, setCorrectPercentage] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const dataAnswer = await getAnswer(params.id);
            const dataQuestions = await getListQuestion(dataAnswer.topicId);
            console.log(dataAnswer.answers);
            console.log(dataQuestions);

            let resultFinal = [];
            let correctCount = 0;

            for (let i = 0; i < dataQuestions.length; i++) {
                const answerData = dataAnswer.answers.find(item => item.questionId === dataQuestions[i].id);
                const questionData = {
                    ...dataQuestions[i],
                    ...answerData
                };

                if (questionData.correctAnswer === questionData.answer) {
                    correctCount++;
                }

                resultFinal.push(questionData);
            }

            setDataResult(resultFinal);
            setCorrectPercentage((correctCount / dataQuestions.length) * 100);
        }
        fetchApi();
    }, [params.id]);

    return (
        <>
            <div className="result__component">
                <h1>Kết quả: </h1>
                <h2 className="result__percentage">
                    Phần trăm câu trả lời đúng: {correctPercentage.toFixed(2)}%
                </h2>
                <div className="result__list">
                    {dataResult.map((item, index) => (
                        <div className="result__item" key={item.id}>
                            <p className="quiz-head">Câu {index + 1} : {item.question}
                                {item.correctAnswer === item.answer ? (
                                    <span className="result__tag result__tag--true">Đúng</span>
                                ) : (
                                    <span className="result__tag result__tag--false">Sai</span>
                                )}
                            </p>
                            {item.answers.map((itemAns, indexAns) => {
                                let className = "";
                                let checked = false;

                                if (item.answer === indexAns) {
                                    checked = true;
                                    className = "result__item--selected";
                                }

                                if (item.correctAnswer === indexAns) {
                                    className += " result__item--result";
                                }

                                return (
                                    <div className="result__answer" key={indexAns}>
                                        <input type="radio" checked={checked} disabled />
                                        <label className={className}>{itemAns}</label>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Result;