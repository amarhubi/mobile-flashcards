import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { white, red, black } from '../utils/colours'
import Button, { StyledButton, CenterView } from './reuseables/Button'
import { deleteDeckFromStore } from '../utils/api'
import { deleteDeck } from '../actions/decks'
import { deleteCards } from '../actions/cards'

class DeckDetail extends Component {
    onPressAddCard = () => {
        this.props.navigation.navigate('AddCard', { deckId: this.props.deck.id})
    }

    onPressDeleteDeck = () => {
        const { deck, dispatch } = this.props
        this.props.navigation.goBack()
        deleteDeckFromStore(deck.id)
        dispatch(deleteDeck(deck.id))
    }

    onPressStartQuiz = () => {
        this.props.navigation.navigate('QuizContainer', { deckId: this.props.deck.id })
    }
    
    render(){
        const { deck } = this.props
        return (
            deck !== undefined ? 
            (<CenterView >
                <View style={styles.deckDetailsContainer}>
                    <Text style={styles.deckTitle}>{deck.name}</Text>
                    <Text style={styles.deckCards}>
                        {deck.cards.length === 1 
                            ? `${deck.cards.length} card`
                            : `${deck.cards.length} cards`}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    
                    <Button style={styles.addCardButton} onPress={this.onPressAddCard} text="Add Card" />
                    <Button style={styles.startQuizButton} onPress={this.onPressStartQuiz} text="Start Quiz" textStyle={styles.startQuizButtonText}/>
                    <Button style={styles.deleteDeckButton} onPress={this.onPressDeleteDeck} text="Delete Deck" textStyle={styles.deleteDeckButtonText}/>
                </View>
            </CenterView>) : null
            
        )
    }
}

const styles = StyleSheet.create({
        deckDetailsContainer: {
            height: 100,
            marginTop: 200,
            alignItems: 'center',
        },
        buttonsContainer: {
            flex: 1,
            marginBottom: 200,
            alignItems: 'stretch',
            justifyContent: 'center',
            alignSelf: 'stretch',
        },
        deckTitle: {
            fontSize: 30,
            paddingBottom: 10
        },
        deckCards: {
            fontSize: 20
        },
       
        addCardButton: {
            borderColor: black,
        },
        startQuizButton: {
            backgroundColor: black,
            borderColor: black,
        },
        startQuizButtonText: {
            color: white
        },
        deleteDeckButton: {
            borderColor: 'red'
        },
        deleteDeckButtonText: {
            color: 'red'
        },

})

function mapStateToProps( { decks }, props){
    return {
        deck: decks[props.route.params.deckId],
    }
}

export default connect(mapStateToProps)(DeckDetail)