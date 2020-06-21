import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { StyledButton, StyledButtonText } from './reuseables/StyledComponents'
import { connect } from 'react-redux'
import { addDeck } from '../actions/decks'
import { generateUID } from '../utils/helpers'
import { addDeckToStore } from '../utils/api'

class AddDeck extends Component {
    state = {
        deckName: '',
    }

    onPressAddDeck = () => {
        const { addDeck, navigation } = this.props
        const { deckName } = this.state
        const newDeckId = generateUID()
        const newDeck = {
            [newDeckId]: {
                id: newDeckId,
                name: deckName,
                cards: []
            }
        }
        addDeckToStore(newDeck)
        addDeck(newDeck)
        navigation.navigate('DeckDetail', { deckId: newDeck[newDeckId].id, title: newDeck[newDeckId].name })
    }

    render(){
        const { deckName } = this.state
        return (
            <View>
                <TextInput 
                    style={styles.textInput} 
                    onChangeText={(deckName) => this.setState({deckName})}
                    placeholder='Deck Name'
                />
                <StyledButton onPress={this.onPressAddDeck} disabled={deckName === '' ? true : false}>
                    <StyledButtonText>Add Deck</StyledButtonText>
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
        marginBottom: 20,
        padding: 5
    }
})

function mapDispatchToProps(dispatch){
    return {
        addDeck: (deck) => {
            dispatch(addDeck(deck))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddDeck)