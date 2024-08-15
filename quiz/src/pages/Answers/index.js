import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answersService";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowRightToBracket } from "react-icons/fa6";
import './answers.css'; // Sử dụng file CSS riêng biệt cho trang câu trả lời

function Answers() {
    const [dataAnswers, setDataAnswers] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const answersByUserId = await getAnswersByUserId();
            const topics = await getListTopic();

            let result = [];

            for(let i = 0; i < answersByUserId.length; i++) {
                result.push({
                    ...topics.find(item => item.id === answersByUserId[i].topicId),
                    ...answersByUserId[i]
                });

                setDataAnswers(result.reverse());
            }
        }
        fetchApi();
    }, []);

    const scrollLeftHandler = () => {
        const container = document.querySelector('.answers-elements');
        container.scrollBy({
            left: -300, // Số pixel để cuộn trái
            behavior: 'smooth'
        });
    }

    const scrollRightHandler = () => {
        const container = document.querySelector('.answers-elements');
        container.scrollBy({
            left: 300, // Số pixel để cuộn phải
            behavior: 'smooth'
        });
    }

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - e.currentTarget.offsetLeft);
        setScrollLeft(e.currentTarget.scrollLeft);
    }

    const onMouseLeave = () => {
        setIsDragging(false);
    }

    const onMouseUp = () => {
        setIsDragging(false);
    }

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - e.currentTarget.offsetLeft;
        const scroll = x - startX;
        e.currentTarget.scrollLeft = scrollLeft - scroll;
    }

    return (
        <div className="answers-container">
            <h2 className="answer-title">Danh sách các bài đã luyện tập</h2>
            <div className="scroll-button left" onClick={scrollLeftHandler}><IoIosArrowBack /></div>
            <div className="scroll-button right" onClick={scrollRightHandler}><IoIosArrowForward /></div>
            <div
                className="answers-elements"
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                {dataAnswers.length > 0 && (
                    dataAnswers.map(item => (
                        <div className="answers-element" key={item.id}>
                            <div className="element-id">ID: {item.id}</div>
                            <div className="element-name">Chủ đề: {item.name}</div>
                            <div className="element-detail">
                                <Link to={"/result/" + item.id} className="answers-link">
                                <div>Xem chi tiết</div>
                                <div className="element-icon"><FaArrowRightToBracket /></div></Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Answers;
