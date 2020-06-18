import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Button from './reuseables/Button'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions/decks'
import { generateUID } from '../utils/helpers'

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

        addCard(deck, newCard)
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
        addCard: (deck, card) => {
            dispatch(addCardToDeck(deck, card))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)