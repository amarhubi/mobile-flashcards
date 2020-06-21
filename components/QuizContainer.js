import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { Text, View } from 'react-native'
import Quiz from './Quiz'
import QuizResults from './QuizResults'
import { initialiseQuiz } from '../actions/quiz'

class QuizContainer extends Component {
    toDeckList = () => {
        this.props.navigation.navigate('DeckList')
    }

    componentDidMount(){
        const { dispatch, deck } = this.props
        dispatch(initialiseQuiz(deck.cards.length))
    }

    render(){
        const { quizFinished } = this.props
        const { deckId } = this.props.route.params
        return (
            quizFinished 
                ? <QuizResults 
                    toDeckList={this.toDeckList}
                  /> 
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