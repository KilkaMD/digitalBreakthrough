import React, { useState } from "react";
import './InfoBar.css';
import {Fade, Stagger} from "react-animation-components";
import { ModalBody, ModalHeader, Modal, UncontrolledPopover, Card, Button, CardTitle, CardText, Input } from 'reactstrap';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import question from "../../icons/question.svg";

const PopoverContent = ({catIt, setCategory, setMessage}) => {
    const onSubmit = e => {
        e.preventDefault();
    }

    return (
        <>
            <Card body className="cardItem popoverFont">
                <CardTitle tag="h5" className="taskClass">taskClass</CardTitle>
                <CardText className="taskText">With supporting text below as a natural lead-in to additional content.</CardText>
                <form className="form" onSubmit={onSubmit}>
                    <Input
                        type="submit"
                        className="btn btn-block submit_category"
                        value="Выбрать"
                        onClick={(event) => {
                            setCategory(event.target.value);
                            setMessage(event.target.value);
                        }}
                    />
                </form>
            </Card>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

// Тут шаги действий для получения ответа

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}


const InfoBar = ({categories, setCategory, setMessage}) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [allGood, setAllGood] = useState(false);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onSubmit = e => {
        e.preventDefault();
    }

    const category_list = (categories !== undefined ? categories.map((category_item,i) => {
        const catIt = {
            id: i,
            text: category_item
        }
        return (
            <Stagger in>
                <Fade in>
                    <Button className="popupMenu" size="md" id="taskMore" type="button" block>{catIt.id}</Button>
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="taskMore">
                        {({ text }) => (
                            <PopoverContent catIt={catIt} setCategory={setCategory} setMessage={setMessage}/>
                        )}
                    </UncontrolledPopover>
                </Fade>
            </Stagger>
        );
    }) : null);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

        return (
            <div className="infoBar">
                <div className="row">
                    <div className="col-12">
                        <div className="container">
                            <h5 className="menuTitle">Меню выбора</h5>
                            <div className="row posMenu">
                                <div className="col-12 overflow-hidden">
                                    {category_list}
                                </div>
                            </div>
                            <div className="row justify-content-center rowFAQ">
                                <div className="col-12 posFAQ">
                                        <Button className="activateHow" onClick={toggle}><img src={question} width="30xp" height="30px"/></Button>
                                        <Modal isOpen={modal} fade={true} toggle={toggle}>
                                            <ModalHeader toggle={toggle}>Как это работает?</ModalHeader>
                                            <ModalBody>
                                                <Stepper activeStep={activeStep} orientation="vertical">
                                                    {steps.map((label, index) => (
                                                        <Step key={label}>
                                                            <StepLabel>{label}</StepLabel>
                                                            <StepContent>
                                                                <Typography>{getStepContent(index)}</Typography>
                                                                <div className={classes.actionsContainer}>
                                                                    <div>
                                                                        <Button
                                                                            disabled={activeStep === 0}
                                                                            onClick={handleBack}
                                                                            className={classes.button}
                                                                        >
                                                                            Back
                                                                        </Button>
                                                                        {activeStep === steps.length - 1 ?
                                                                            <Button className={"btn-success "+ classes.button} onClick={toggle}>Все понятно</Button>
                                                                            : <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                onClick={handleNext}
                                                                                className={classes.button}
                                                                            >
                                                                                Next
                                                                            </Button> }

                                                                    </div>
                                                                </div>
                                                            </StepContent>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </ModalBody>
                                        </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

}

export default InfoBar;