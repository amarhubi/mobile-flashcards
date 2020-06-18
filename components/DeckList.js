import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { receiveDecks } from '../actions/decks'
import { receiveCards } from '../actions/cards'
import { getDecks, getCards } from '../utils/api'
import Deck from './Deck'
import { white, black } from '../utils/colours'
import Button, { StyledButton } from './reuseables/Button'


class DeckList extends Component {
    componentDidMount(){
        const { dispatch } = this.props
        getDecks().then(decks => {
                dispatch(receiveDecks(decks))
            }
        )
        // getCards().then(cards => {
        //         console.log(cards)
        //         dispatch(receiveCards(cards))
        //     }
        // )
    }

    onPressDeck = (id) => {
        this.props.navigation.navigate('DeckDetail', { deckId: id })
    }

    onPressAddDeck = () => {
        this.props.navigation.navigate('AddDeck')
    }
    
    render(){
        const { decks } = this.props
        const deckIds = Object.keys(decks)
        return ( 
            <View style={styles.container}>
                <Text style={styles.deckListTitle}>Available Flashcard Decks</Text>
                { deckIds.length > 0 
                    ? deckIds.map(id => 
                        <TouchableOpacity 
                            style={[styles.deck, styles.center]}
                            onPress={() => this.onPressDeck(id)}
                            key={id}
                        >
                            <Text style={styles.deckTitle}>{decks[id].name}</Text>
                            <Text style={styles.deckNumbers}>
                                {decks[id].cards.length === 1 
                                    ? `${decks[id].cards.length} card`
                                    : `${decks[id].cards.length} cards`}
                            </Text>
                        </TouchableOpacity>
                       
                        )
                    : <Text>Oops, looks like you don't have any decks saved yet. Press the button below to create your first deck.</Text> }
                <Button onPress={this.onPressAddDeck} text="Add Deck"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      padding: 15,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    deckListTitle: {
        fontSize: 30
      },
    deck : {
        height: 70,
        alignSelf: 'stretch',
        padding: 20,
        margin: 20,
        backgroundColor: black,
    },
    deckTitle: {
        color: white,
        fontSize: 22,
    },
    deckNumbers: {
        color: white,
        fontSize: 18,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
  })

function mapStateToProps({ decks }){
    return {
        decks,
    }
}

export default connect(mapStateToProps)(DeckList)
