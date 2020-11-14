import React, { useEffect, useState } from 'react';
import InputMessage from '../Input/InputMessage';
import Messages from '../Messages/Messages';
import './Chat.css';
import InfoBar from "../InfoBar/InfoBar";

const Chat = () => {
    const name = 'user';
    const greeting = "Привет! Чем я могу помочь тебе?";
    const [messages, setMessages] = useState([{ user: "bot", text: greeting }]);
    const [message, setMessage] = useState('');
    const [chatActive, setChatActive] = useState(false);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [date, setDate] = useState('');


    const sendMessage = (event) => {
        if(!chatActive) {
            setChatActive(true);
        }
        setDate(new Date().toLocaleString());
        event.preventDefault();
        console.log(category);
        if (category) {

            const url = "http://localhost:4001";
            const route = `/model?question=${category}`
            fetch(url + route, {
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(({ answer }) => setMessages([...messages, { user: name, text: category }, { user: "bot", text: answer }]))
                .catch(error => {
                    console.log('get message', error.message)
                });
            setCategories([]);
            setCategory('');
            setMessage('');
        }

        else if (message) {
            const url = "http://localhost:4001";
            const route = `/model?question=${message}`
            fetch(url + route, {
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(parsedRes => {
                    if (parsedRes.responseData) {
                        setCategories(parsedRes.responseData);
                        setMessages([...messages,{ user: name, text: message }, { user: "bot", text: "К сожалению, мы не смогли точно распознать ваш вопрос. Пожалуйста, выберите один из похожих запросов ниже: " }])
                    } else {
                        setMessages([...messages, { user: name, text: message }, { user: "bot", text: parsedRes.answer }])
                    }

                })
                .catch(error => {
                    console.log('get message', error.message)
                });
            setMessage('');
        }
    }
    console.log(message, messages);
    return (
        <div className="container outerContainer">
            <div className="row mt-3">
                <h3>Помощь</h3>
            </div>
            <div className="row">
                <div className="col-12 mt-3">
                    <InputMessage message={message} setMessage={setMessage} sendMessage={sendMessage} category={category}/>
                </div>
            </div>
            {(chatActive) ?
            <div className="row containerInner mt-3">
                <div className="col-4 pr-0">
                    <InfoBar categories={categories} setCategory={setCategory} setMessage={setMessage}/>
                </div>
                <div className="col-8 pl-0">
                    <Messages messages={messages} name={name} date={date}/>
                </div>
            </div> : null}
        </div>
    )
};

export default Chat;