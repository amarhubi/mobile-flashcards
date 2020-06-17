export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks (decks){
    console.log('receiveing')
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck (deck){
    return {
        type: ADD_DECK,
        deck,
    }
}

export function addCardToDeck(deck, cardId){
    return {
        type: ADD_CARD_TO_DECK,
        deck,
        cardId,
    }
}

// export function DELETE_DECK(){
//     return {
//         type: 
//     }
// }