import AsyncStorage from '@react-native-community/async-storage'
import { DECK_STORAGE_KEY, decks } from './_decks'
import { CARD_STORAGE_KEY, cards } from './_cards'
import { getDecks, getCards } from './api'
import { receiveDecks } from '../actions/decks'
import { receiveCards } from '../actions/cards'

export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function createDummyData(){
    // clearStorage()
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks)).catch(e => console.error(e))
    AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(cards)).catch(e => console.error(e))
    //     .then(AsyncStorage.setItem(QUESTION_STORAGE_KEY, questions))
}

// export function updateStore(){
//     getDecks().then(decks => dispatch(receiveDecks(decks)))
//     getCards().then(cards => dispatch(receiveCards(cards)))
// }

// export function clearStorage() {
//     AsyncStorage.getAllKeys()
//         .then(results => console.log(JSON.parse(results)))
// }