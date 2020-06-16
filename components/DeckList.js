import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { receiveDecks } from '../actions/decks'
import { getDecks } from '../utils/api'
import Deck from './Deck'
import white from '../utils/colours'


class DeckList extends Component {
    componentDidMount(){
        const { dispatch } = this.props
        getDecks().then(decks => dispatch(receiveDecks(decks)))
        // console.log(this.props)
        // this.props.dispatch(handleInitialData)
    }
    
    render(){
        const { decks } = this.props
        const keys = Object.keys(decks)
        return ( 
            <View style={styles.container}>
                <Text style={styles.deckListTitle}>Available Flashcard Decks</Text>
                { keys.length > 0 
                    ? keys.map(k => <Deck key={k} id={k} />)
                    : <Text>Oops, looks like you don't have any decks saved yet. Press the button below to create your first deck.</Text> }
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
  })

function mapStateToProps({ decks }){
    return {
        decks,
    }
}

export default connect(mapStateToProps)(DeckList)
