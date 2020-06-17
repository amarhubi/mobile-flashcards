export const ADD_CARD = 'ADD_CARD'
export const RECEIVE_CARDS = 'RECEIVE_CARDS'

export function addCard(card){
    return {
        type: ADD_CARD,
        card
    }
}

export function receiveCards(cards){
    return {
        type: RECEIVE_CARDS,
        cards
    }
}