import { ADD_CARD, RECEIVE_CARDS, DELETE_CARDS } from '../actions/cards'
import { DELETE_DECK } from '../actions/decks'

export function cards(state = {}, action){
    switch(action.type){
        case RECEIVE_CARDS:
            return {
                ...state,
                ...action.cards
            }
        case ADD_CARD:
            return{
                ...state,
                ...action.card
            }
        case DELETE_CARDS:
            return {
                ...state
            }
        default:
            return state
    }
}

export default cards