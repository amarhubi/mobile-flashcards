import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { CenterView,
    StyledButton,
    PrimaryButton,
    PrimaryText,
    Heading1, Heading2, Heading3, StyledButtonText
 } from './reuseables/Button'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { initialiseQuiz } from '../actions/quiz'

class QuizResults extends Component {

    onPressRestartQuiz = () => {
        this.props.restartQuiz(this.props.totalQuestions)
    }

    onPressGoBackToQuizList = () => {
        this.props.toDeckList()
    }

    componentDidMount() {
        clearLocalNotification()
        .then(setLocalNotification)
    }

    render(){
        const { correctQuestions, totalQuestions } = this.props
        return (
            <CenterView>
                <CenterView>
                    <Heading1>{correctQuestions / totalQuestions > 0.5 ? 'Congratulations!' : 'Too bad!'}</Heading1>
                    <Heading2>You scored {correctQuestions}/{totalQuestions}</Heading2>
                </CenterView>
                <CenterView>
                    <StyledButton onPress={this.onPressRestartQuiz}>
                        <StyledButtonText>Restart quiz</StyledButtonText>
                    </StyledButton>
                    <PrimaryButton onPress={this.onPressGoBackToQuizList}>
                        <PrimaryText>Try another quiz</PrimaryText>
                    </PrimaryButton>
                </CenterView>
            </CenterView>    
        )
    }
}

function mapStateToProps( { quiz }){
    const { correctQuestions, quizFinished, totalQuestions } = quiz
    return {
        correctQuestions,
        quizFinished,
        totalQuestions
    }
}

function mapDispatchToProps(dispatch){
    return {
        restartQuiz: (totalQuestions) => dispatch(initialiseQuiz(totalQuestions))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizResults)