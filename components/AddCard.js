import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Button from './Button'
import { connect } from 'react-redux'
import { addCard } from '../actions/cards'
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
        const newCardId = generateUID()
        const newCard = {
            [newCardId]: {
                id: newCardId,
                question: questionValue,
                answer: answerValue
            }
        }
        saveCard(deck, newCard, newCardId)
        addCard(deck, newCard, newCardId)
        this.props.navigation.goBack()
    }

    render(){
        return (
            <View>
                <TextInput 
                    style={styles.textInput} 
                    onChangeText={(questionValue) => this.setState({questionValue})}
                    placeholder='Question'
                />
                <TextInput 
                    style={styles.textInput}
                    onChangeText={(answerValue) => this.setState({answerValue})}
                    placeholder='Answer'
                />
                <Button onPress={this.onPressAddCard} text='Save Card'/>
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
        addCard: (deck, card, cardId) => {
            dispatch(addCard(card))
            dispatch(addCardToDeck(deck, cardId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)