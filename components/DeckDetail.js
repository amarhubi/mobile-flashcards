import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { white, red, black } from '../utils/colours'
import Button from './Button'

class DeckDetail extends Component {
    onPressAddCard = () => {
        this.props.navigation.navigate('AddCard', { deckId: this.props.deck.id})
    }
    
    render(){
        const { deck } = this.props
        return (
            <View style={[styles.container, styles.center]}>
                <View style={styles.deckDetailsContainer}>
                    <Text style={styles.deckTitle}>{deck.name}</Text>
                    <Text style={styles.deckCards}>{deck.cards.length} cards</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button style={styles.addCardButton} onPress={this.onPressAddCard} text="Add Card" />
                    <Button style={styles.startQuizButton} onPress={() => console.log('pressed start quiz')} text="Start Quiz" textStyle={styles.startQuizButtonText}/>
                    <Button style={styles.deleteDeckButton} onPress={() => console.log('pressed delete deck')} text="Delete Deck" textStyle={styles.deleteDeckButtonText}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: white,
        },
        center: {
            justifyContent: 'space-between',
            alignItems: 'center',
        },
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