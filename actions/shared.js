import getDecks from '../utils/api'
import receieveDecks from './decks'

export function handleInitialData(){
    return (dispatch) => {
        console.log('dispatching')
        return Promise.all([getDecks()])
            .then(([decks]) => {
                dispatch(receieveDecks(decks))
            })
    }
}