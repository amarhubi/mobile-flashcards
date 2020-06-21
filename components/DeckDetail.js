import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { white, red, black } from '../utils/colours'
import { 
    StyledButton, 
    CenterView, 
    StyledButtonText, 
    PrimaryButton,
    PrimaryText,
    DeleteButton,
    DeleteText
 } from './reuseables/Button'
import { deleteDeckFromStore } from '../utils/api'
import { deleteDeck } from '../actions/decks'
import styled from 'styled-components/native'

class DeckDetail extends Component {
    onPressAddCard = () => {
        this.props.navigation.navigate('AddCard', { deckId: this.props.deck.id, title: 'Add Card'})
    }

    onPressDeleteDeck = () => {
        const { deck, dispatch } = this.props
        this.props.navigation.goBack()
        deleteDeckFromStore(deck.id)
        dispatch(deleteDeck(deck.id))
    }

    onPressStartQuiz = () => {
        this.props.navigation.navigate('QuizContainer', { deckId: this.props.deck.id, title: 'Quiz' })
    }
    
    render(){
        const { deck } = this.props
        return (
            deck !== undefined ? 
            (<CenterView >
                <CenterView>
                    <Text style={styles.deckTitle}>{deck.name}</Text>
                    <Text style={styles.deckCards}>
                        {deck.cards.length === 1 
                            ? `${deck.cards.length} card`
                            : `${deck.cards.length} cards`}
                    </Text>
                </CenterView>
                <CenterView>
                    <StyledButton style={styles.addCardButton} onPress={this.onPressAddCard}>
                        <StyledButtonText>Add Card</StyledButtonText>
                    </StyledButton>
                    <PrimaryButton onPress={this.onPressStartQuiz}>
                        <PrimaryText>Start Quiz</PrimaryText>
                    </PrimaryButton>
                    <DeleteButton style={styles.deleteDeckButton} onPress={this.onPressDeleteDeck}>
                        <DeleteText>Delete Deck</DeleteText>
                    </DeleteButton>
                </CenterView>
            </CenterView>) : null
            
        )
    }
}


const styles = StyleSheet.create({
    deckTitle: {
        fontSize: 30,
        paddingBottom: 10
    },
    deckCards: {
        fontSize: 20
    },
})

function mapStateToProps( { decks }, props){
    return {
        deck: decks[props.route.params.deckId],
    }
}

export default connect(mapStateToProps)(DeckDetail)