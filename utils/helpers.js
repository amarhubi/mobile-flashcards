import AsyncStorage from '@react-native-community/async-storage'
import { DECK_STORAGE_KEY, decks } from './_decks'
import { CARD_STORAGE_KEY, cards } from './_cards'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const currentDate = new Date()

const NOTIFICATION_KEY = 'MobileFlashcards:notification'
const NOTIFICATION_DATE = currentDate.getDate() + 1,
    NOTIFICATION_HOURS = currentDate.getHours(),
    NOTIFICATION_MINUTES = currentDate.getMinutes()


export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function createDummyData(){
    return Promise.all([
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks)), 
            AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(cards))
        ])
        .catch(e => console.error(e))
}


export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  function createNotification () {
    return {
      title: 'Refreseh your knowledge!',
      body: "👋 don't forget to study today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(NOTIFICATION_DATE)
                tomorrow.setHours(NOTIFICATION_HOURS)
                tomorrow.setMinutes(NOTIFICATION_MINUTES)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }