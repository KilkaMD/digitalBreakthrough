import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../../icons/logo.png';
import userIcon from '../../../icons/user.svg';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import './Message.css';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}));

const Message = ({message: { user, text }, name, date}) => {

    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        return (
            promiseInProgress &&
            <div className="messageContainer justifyStart">
                <Loader type="ThreeDots" color="#7700FF" height="25" width="50" />
                <p className="sentTextBot avaPaddingBot">
                    <Avatar src={logo} className={classes.small} />
                </p>
            </div>
        );
    }

    let isSentByCurrentUser = false;

    if (user === "bot") {
        isSentByCurrentUser = false;
    } else {
        isSentByCurrentUser = true;
    }

    const parsedText = text.split('\n');
    let textToDisplay;
    console.log(typeof(text))
    console.log(parsedText.toString());
    if(!text.match(/\d+\..*/)){
        textToDisplay = text;
    }
    else if (parsedText.length === 1) {
        textToDisplay = parsedText[0].substr(2);
    } else {
        textToDisplay = (
          parsedText.map((elem,key)=>
            <li key={key}>
                {elem.substr(2)}
            </li>)
        )
    }

    const classes = useStyles();

    return (
        <div>
            {isSentByCurrentUser
            ? (
                    <div className="messageContainer justifyEnd">
                        <p className="time">{date}</p>
                        <div className="messageBox backgroundLight">
                            <p className="messageText colorWhite">
                                {text}
                            </p>
                            <p className="sentTextUser avaPaddingUser">
                                <Avatar src={userIcon} className={classes.small} />
                            </p>
                        </div>
                    </div>
            )
            : (
            <div className="messageContainer justifyStart">
                <p className="time">{date}</p>
                <div className="messageBox backgroundWhite">
                    <p className="messageText colorDark">
                        {textToDisplay}
                    </p>
                </div>
                <p className="sentTextBot avaPaddingBot">
                    <Avatar src={logo} className={classes.small} />
                </p>
            </div>
            )}
            <LoadingIndicator/>
        </div>
    );
}

export default Message;
