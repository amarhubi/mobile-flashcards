import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { Text, View } from 'react-native'
import Quiz from './Quiz'
import QuizResults from './QuizResults'
import { initialiseQuiz } from '../actions/quiz'

class QuizContainer extends Component {
    // state = {
    //     quizFinished: false,
    //     numberCorrect: 0,
    //     totalQuestions: 0
    // }

    // incrementCorrectQuestions = () => {
    //     this.setState((prevState) => ({
    //             numberCorrect: prevState.numberCorrect + 1 
    //     })
    // )}

    // toggleQuiz = () => {
    //     this.setState((prevState) => ({
    //         quizFinished: !prevState.quizFinished
    //     })
    // )}

    componentDidMount(){
        const { dispatch, deck } = this.props
        
        dispatch(initialiseQuiz(deck.cards.length))
    }

    render(){
        const { quizFinished } = this.props
        const { deckId } = this.props.route.params
        console.log(this.props)
        return (
            quizFinished 
                ? <QuizResults /> 
                : <Quiz 
                    deckId={deckId}
                  />
        )
    }
}

function mapStateToProps({ quiz, decks }, { route }){
    return {
        quizFinished: quiz.quizFinished,
        deck: decks[route.params.deckId]
    }
}

export default connect(mapStateToProps)(QuizContainer)