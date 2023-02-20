import React from 'react'


const Choice = (props) => {

    let backgroundStyle, borderStyle, opacityStyle

    if (props.submitState) {
        if (props.title === props.correctAnswer) {
            backgroundStyle = "#94D7A2"
            borderStyle = "none"
            opacityStyle = 1
        } else if (props.title !== props.correctAnswer && props.title === props.chosenAnswer) {
            backgroundStyle = "#F8BCBC"
            borderStyle = "none"
            opacityStyle = 0.5
        } else {
            backgroundStyle = "white"
            borderStyle = "1px solid #4D5B9E"
            opacityStyle = 0.5
        }
    } else {
        opacityStyle = 1
        if (props.title === props.chosenAnswer) {
            backgroundStyle = "#D6DBF5"
            borderStyle = "none"
        } else {
            backgroundStyle = "white"
            borderStyle = "1px solid #4D5B9E"
        }
    }

    const styling = {
        backgroundColor: backgroundStyle,
        border: borderStyle,
        opacity: opacityStyle
    }
    
    return (
        <div className='choice--button--container'>
            <div
                style={styling}
                className='choice--button'
                onClick={() => props.onClick(props.questionStr, props.title)}
            >
                {props.title}
            </div>
        </div>
    )
}

export default Choice