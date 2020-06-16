import AsyncStorage from '@react-native-community/async-storage'
import { DECK_STORAGE_KEY } from './_decks'

export function getDecks(){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(JSON.parse)
}