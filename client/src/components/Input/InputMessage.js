import React,{ useState, useEffect } from 'react';
import './InputMessage.css';
import search from "../../icons/search.svg";
import { InputGroupText, InputGroup, InputGroupAddon, Input} from 'reactstrap';


const InputMessage = ({message,setMessage, sendMessage, category,messages}) => {
    const onSubmit = e => {
        this.e.message = "";
        e.preventDefault();
    }


    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)

    useEffect(() => {
        handleListen()
    }, [isListening])

    const handleListen = () => {
    }

    return (
        <div>
                <div className="row">
                    <div className="col-12 innerProbCol">
                        <form className="form" onSubmit={onSubmit}>
                            <InputGroup className="inputOuter">
                                <InputGroupAddon addonType="prepend" className="prependAddon"><img src={search} width="20px" height="20px"/></InputGroupAddon>
                                {messages.length > 4 ? <Input
                                    type="text"
                                    className="input"
                                    placeholder="Обратитесь к оператору"
                                    value={note ? note : message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                                    disabled
                                /> : <Input
                                    type="text"
                                    className="input"
                                    placeholder="Введите сообщение..."
                                    value={note ? note : message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}

                                />}
                                {messages.length > 4 ? null
                                 : <InputGroupAddon addonType="append" className="appendAddon">
                                        <InputGroupText className="appendGroupBtn">
                                            <button type="submit" className="sendButton" onClick={(event) => sendMessage(event)}><i className="fa fa-paper-plane fa-lg"></i></button>
                                        </InputGroupText>
                                    </InputGroupAddon>}
                            </InputGroup>
                        </form>
                        {messages.length > 4 ? null :
                        <button className="btn micro" onClick={() => {
                            setIsListening(prevState => !prevState);
                        }}>
                            <i className="fa fa-microphone fa-lg" aria-hidden="true"></i>
                        </button> }
                    </div>
                    </div>
    </div>
    );
}

export default InputMessage;
