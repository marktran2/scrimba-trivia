import React, {useState, useEffect} from "react"
import Questions from './components/Questions'


function App() {

    const [started, setStarted] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [questions, setQuestions] = useState([])
    const [count, setCount] = useState(0)
    const [fetchSwitch, setFetchSwitch] = useState(true)

    const shuffle = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = arr[j]
            arr[j] = arr[i]
            arr[i] = temp
        }
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            const data = await response.json()

            const questionArr = data.results.map(info => {

                let choiceList = info.incorrect_answers
                choiceList.push(info.correct_answer)
                shuffle(choiceList)

                return {
                    key: info.question,
                    id: info.question,
                    question: info.question,
                    choices: choiceList,
                    correct: info.correct_answer,
                    chosenAnswer: "",
                }
            })
            setQuestions(questionArr)
        }
        if (fetchSwitch) {
            fetchQuestions()
        }
        console.log("HElLO!")
    }, [fetchSwitch])

     
    const countCorrect = () => {
        let count = 0
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].correct === questions[i].chosenAnswer) {
                count++
            }
        }
        return count
    }

    // const questionElements = questions.map(question => (
    //     <Questions questions={question} />
    // ))


    const updateChosenAnswer = (string, ans) => {
        if (!submit) {
            setQuestions(oldQuestions => oldQuestions.map(item => {
                return item.id === string ?
                    {...item, chosenAnswer: ans} :
                    item
            }))
            setCount(countCorrect)
        }
    }

    const handleClick = () => {
        setSubmit(prevState => !prevState)
        setFetchSwitch(prevState => !prevState)
    }

    const handleStart = () => {
        setStarted(true)
    }


    return (
        <div>
            <div className='yellow-blob-container'>
                {/* <img className='yellow-blob' src={require('./images/yellow-blob.png')} alt='yellow blob'/> */}
                <div className='yellow-blob'></div>
            </div>
            <div className='blue-blob-container'>
                {/* <img className='blue-blob' src={require('./images/blue-blob.png')} alt='blue blob'/> */}
                <div className='blue-blob'></div>
            </div>
            {
                started ? 
                    <div className='question-bank-container'>
                        <div className='question-bank'>
                            <Questions
                                list={questions}
                                updateAnswer={updateChosenAnswer}
                                submitState={submit}
                            />
                            <div className="question-bank-bottom">
                                {submit && <h2>You scored {count}/5 correct answers</h2>}
                                <button
                                    className='check-answer-button'
                                    onClick={handleClick}
                                >
                                    {submit ? 'Play again' : 'Check answers'}
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='homepage'>
                        <div className='description--container'>
                            <h1>Quizzical</h1>
                            <p>where you can test your trivia skills</p>
                            <button onClick={handleStart}>Start quiz</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default App
