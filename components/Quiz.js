import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { CenterView,
    StyledButton,
    StyledButtonText,
    RejectButton,
    ApproveButton,
    PrimaryText,
    Heading1, Heading2, Heading3 } from './reuseables/Button'
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
            viewingQuestion: true,
        })
    )}

    componentDidUpdate(){
        const { deck, toggleQuiz } = this.props
        this.state.currentQuestion === deck.cards.length && toggleQuiz()
    }

    render(){
        const {currentQuestion, viewingQuestion } = this.state
        const { deck } = this.props
        const { cards } = deck

        return (
            <CenterView>
                <CenterView>
                    <CenterView>
                        <Heading1>{deck.name}</Heading1>
                        <Heading2>{currentQuestion + 1} / { cards.length }</Heading2>
                    </CenterView>
                    
                    { viewingQuestion 
                        ? <CenterView>
                            <Heading3>Question</Heading3>
                            <Heading2>{cards[currentQuestion] && cards[currentQuestion].question}</Heading2>
                          </CenterView>
                        : <CenterView>
                            <Heading3>Answer</Heading3>
                            <Heading2>{cards[currentQuestion] && cards[currentQuestion].answer}</Heading2>
                          </CenterView>
                    }
                </CenterView>
                <CenterView>
                    <StyledButton onPress={this.onPressFilpCard}>
                        <StyledButtonText>Flip Card</StyledButtonText>
                    </StyledButton>
                    <ApproveButton onPress={() => this.answerQuestion(true)}>
                        <PrimaryText>Correct</PrimaryText>
                    </ApproveButton>
                    <RejectButton onPress={() => this.answerQuestion(false)}>
                        <PrimaryText>Incorrrect</PrimaryText>
                    </RejectButton>
                </CenterView>
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