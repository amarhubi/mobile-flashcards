import AsyncStorage from '@react-native-community/async-storage'
import { DECK_STORAGE_KEY, decks } from './_decks'
import { QUESTION_STORAGE_KEY, questions } from './_questions'

export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function createDummyData(){
    // clearStorage()
    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks)).catch(e => console.error(e))
    //     .then(AsyncStorage.setItem(QUESTION_STORAGE_KEY, questions))
}

// export function clearStorage() {
//     AsyncStorage.getAllKeys()
//         .then(results => console.log(JSON.parse(results)))
// }