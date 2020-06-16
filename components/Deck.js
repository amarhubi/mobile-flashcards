import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { black, white } from '../utils/colours'
import { connect } from 'react-redux'

class Deck extends Component {
    toDeckView(id) {
        console.log(`navigating to ${id}`)    
    }

    render(){
        const { name, questions, id } = this.props.deck

        return (
            <TouchableOpacity 
                style={[styles.deck, styles.center]}
                onPress={() => this.toDeckView(id)}
            >
                <Text style={styles.deckTitle}>{name}</Text>
                <Text style={styles.deckNumbers}>{questions.length} Cards</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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

function mapStateToProps({ decks }, { id }){
    return {
        deck: decks[id]
    }
}

export default connect(mapStateToProps)(Deck)