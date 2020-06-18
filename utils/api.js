import AsyncStorage from '@react-native-community/async-storage'
import { DECK_STORAGE_KEY } from './_decks'
import { CARD_STORAGE_KEY } from './_cards'

export function getDecks(){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(JSON.parse)
}

export function getCards(){
    return AsyncStorage.getItem(CARD_STORAGE_KEY)
        .then(JSON.parse)
}

export function saveCard(deck, card, cardId){
    AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(JSON.parse)
        .then(decks => {
            const updatedDecks = {
                ...decks,
                [deck.id]: {
                    ...decks[deck.id],
                    cards: decks[deck.id].cards.concat(cardId) 
                }   
            }
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(updatedDecks))
        })
    AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify(
        { 
            card
        }
    ))
}

export function deleteDeckFromStore(deckId){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then((results) => {
        const decks = JSON.parse(results)
        decks[deckId] = undefined
        delete decks[deckId]
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
      })
}

export function addDeckToStore(deck){
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        deck
    }))
}
