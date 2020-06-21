import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { 
    StyledButton, 
    CenterView, 
    StyledButtonText, 
    PrimaryButton,
    PrimaryText,
    DeleteButton,
    DeleteText,
    Heading1, Heading2, Heading3
 } from './reuseables/StyledComponents'
import { deleteDeckFromStore } from '../utils/api'
import { deleteDeck } from '../actions/decks'

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
                    <Heading1 style={styles.deckTitle}>{deck.name}</Heading1>
                    <Heading2 style={styles.deckCards}>
                        {deck.cards.length === 1 
                            ? `${deck.cards.length} card`
                            : `${deck.cards.length} cards`}
                    </Heading2>
                    { deck.cards.length === 0 && <Heading3>The deck is empty. Add some cards to be able to start the quiz</Heading3>}
                </CenterView>
                <CenterView>
                    <StyledButton style={styles.addCardButton} onPress={this.onPressAddCard}>
                        <StyledButtonText>Add Card</StyledButtonText>
                    </StyledButton>
                    <PrimaryButton onPress={this.onPressStartQuiz} disabled={deck.cards.length === 0 ? true : false}>
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