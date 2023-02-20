import React from "react"
import he from 'he'

import Choice from "./Choice"


const Questions = (props) => {

    
    const questionElems = props.list.map(item => {
        const choiceElems = item.choices.map(string => (
            <Choice
                chosenAnswer={item.chosenAnswer}
                questionStr={item.question}
                title={he.decode(string)}
                onClick={props.updateAnswer}
                submitState={props.submitState}
                correctAnswer={item.correct}
            />
        ))


        return (
            <div className="individual-question-container">
                <h1>{he.decode(item.question)}</h1>
                <div className="choice--container">
                    {choiceElems}
                </div>
                <div className="horizontal-line"></div>
            </div>
        )
    })



    return (
        <div>
            {questionElems}
        </div>
    )
}


export default Questions