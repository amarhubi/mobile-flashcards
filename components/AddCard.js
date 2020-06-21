import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { StyledButton, StyledButtonText } from './reuseables/StyledComponents'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions/decks'
import { generateUID } from '../utils/helpers'
import { saveCard } from '../utils/api'

class AddCard extends Component {
    state = {
        questionValue: '',
        answerValue: '',
    }

    onPressAddCard = () => {
        const { addCard, deck } = this.props
        const { questionValue, answerValue } = this.state
        const newCard = {
                id: generateUID(),
                question: questionValue,
                answer: answerValue
        }
        saveCard(deck, newCard) 
        addCard(deck, newCard)
        this.props.navigation.goBack()
    }

    render(){
        const { questionValue, answerValue } = this.state
        return (
            <View>
                <TextInput 
                    style={styles.textInput} 
                    onChangeText={(questionValue) => this.setState({questionValue})}
                    placeholder='Question'
                />
                <TextInput 
                    style={[styles.textInput, {marginBottom: 20 }]}
                    onChangeText={(answerValue) => this.setState({answerValue})}
                    placeholder='Answer'
                />
                <StyledButton 
                    onPress={this.onPressAddCard}
                    disabled={questionValue==='' || answerValue==='' ? true : false}>
                        <StyledButtonText>Save Card</StyledButtonText>
                    </StyledButton>
            </View>
        )
    }
}

styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        padding: 5
    }
})

function mapStateToProps({ decks }, props){
    return {
        deck: decks[props.route.params.deckId]
    }
}

function mapDispatchToProps(dispatch){
    return {
        addCard: (deck, card) => {
            dispatch(addCardToDeck(deck, card))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)