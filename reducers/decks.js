import { ADD_DECK, RECEIVE_DECKS, ADD_CARD_TO_DECK, DELETE_DECK } from '../actions/decks'

export function decks (state = {}, action){
    switch(action.type){
        case RECEIVE_DECKS:
            return{
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.deck.id]: {
                    ...action.deck,
                    cards: action.deck.cards.concat(action.card)
                }
            }
        case DELETE_DECK:
            const newDecks = {}
            Object.keys(state).filter(id => id !== action.deckId).map(id => newDecks[id] = state[id])
            
            return {
                ...newDecks,
            }
        default: 
            return state
    }
}

export default decks