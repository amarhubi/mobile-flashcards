import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Button from './reuseables/Button'
import { connect } from 'react-redux'
import { addCard } from '../actions/cards'
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
        return (
            <View>
                <TextInput 
                    style={styles.textInput} 
                    onChangeText={(deckName) => this.setState({deckName})}
                    placeholder='Deck Name'
                />
                <Button onPress={this.onPressAddDeck} text='Save Deck'/>
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

// function mapStateToProps({ decks }, props){
//     return {
//         deck: decks[props.route.params.deckId]
//     }
// }

function mapDispatchToProps(dispatch){
    return {
        addDeck: (deck) => {
            dispatch(addDeck(deck))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddDeck)