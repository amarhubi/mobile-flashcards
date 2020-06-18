import { combineReducers } from 'redux'
import decks from './decks'
import quiz from './quiz'

export default combineReducers({
    quiz,
    decks,
  })