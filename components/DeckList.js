import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions/decks'
import { receiveCards } from '../actions/cards'
import { getDecks, getCards } from '../utils/api'
import Deck from './Deck'
import { white, black } from '../utils/colours'
import { StyledButton, StyledButtonText } from './reuseables/StyledComponents'

function DeckSnippet({id, name, cards, onPress}){
    return (
        <TouchableOpacity 
            style={[styles.deck, styles.center]}
            onPress={() => onPress(id)}
            key={id}
        >
            <Text style={styles.deckTitle}>{name}</Text>
            <Text style={styles.deckNumbers}>
                {cards.length === 1 
                    ? `${cards.length} card`
                    : `${cards.length} cards`}
            </Text>
        </TouchableOpacity>
    )
}

class DeckList extends Component {
    componentDidMount(){
        const { dispatch } = this.props
        getDecks().then(decks => {
                dispatch(receiveDecks(decks))
            }
        )
    }

    renderDeckSnippet = ({ item }) => {
        return <DeckSnippet { ...item } onPress={this.onPressDeck}/>
    }

    onPressDeck = (id) => {
        const { decks, navigation } = this.props
        navigation.navigate('DeckDetail', { deckId: id, title: decks[id].name })
    }

    onPressAddDeck = () => {
        this.props.navigation.navigate('AddDeck', {title: 'Create New Deck'})
    }
    
    render(){
        const { decks } = this.props
        const decksArray = Object.values(decks)
        return ( 
            <View style={styles.container}>
                <Text style={styles.deckListTitle}>Available Flashcard Decks</Text>
                {
                    decksArray.length > 0 
                        ?  <FlatList style={{alignSelf: 'stretch', marginTop: 10, marginRight: 20, marginBottom: 0, marginLeft: 20}} 
                                data={decksArray}
                                renderItem={this.renderDeckSnippet}
                            />
                        : <Text>Oops, looks like you don't have any decks saved yet. Press the button below to create your first deck.</Text>
                }

                <StyledButton onPress={this.onPressAddDeck}>
                    <StyledButtonText>Add Deck</StyledButtonText>
                </StyledButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      padding: 10,
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
        margin: 5,
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
