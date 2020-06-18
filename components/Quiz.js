import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { CenterView, StyledButton } from './reuseables/Button'
import { connect } from 'react-redux'
import { incrementCorrectQuestions, toggleQuiz,  } from '../actions/quiz'

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        viewingQuestion: true,
    }

    onPressFilpCard = () => {
        this.setState((prevState) => ({
            viewingQuestion: !prevState.viewingQuestion   
        })
    )}

    answerQuestion = (answer) => { 
        answer && this.props.incrementCorrectQuestions()
        this.setState((prevState, props) => ({
            currentQuestion: prevState.currentQuestion + 1,
        })
    )}

    componentDidUpdate(){
        const { deck, toggleQuiz } = this.props
        this.state.currentQuestion === deck.cards.length && toggleQuiz()
    }

    render(){
        console.log(this.props)
        const {currentQuestion, viewingQuestion } = this.state
        const { deck } = this.props
        console.log(deck)
        const { cards } = deck

        return (
            <CenterView>
                <CenterView>
                    <Text>Quiz {deck.name}</Text>
                    <Text>{currentQuestion + 1} / { cards.length }</Text>
                    { viewingQuestion 
                        ? <Text>Question: {cards[currentQuestion] && cards[currentQuestion].question}</Text>
                        : <Text>Answer {cards[currentQuestion] && cards[currentQuestion].answer}</Text>
                    }
                </CenterView>
                <View>
                    <StyledButton onPress={this.onPressFilpCard}>
                        <Text>Flip Card</Text>
                    </StyledButton>
                    <StyledButton onPress={() => this.answerQuestion(true)}>
                        <Text>Correct</Text>
                    </StyledButton>
                    <StyledButton onPress={() => this.answerQuestion(false)}>
                        <Text>Incorrrect</Text>
                    </StyledButton>
                </View>
            </CenterView>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        incrementCorrectQuestions: () => dispatch(incrementCorrectQuestions()),
        toggleQuiz: () => dispatch(toggleQuiz())
    }
}

function mapStateToProps({ decks }, { deckId }){
    return {
        deck: decks[deckId]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)