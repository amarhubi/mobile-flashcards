import { INITIALISE_QUIZ, RESET_QUIZ, INCREMENT_CORRECT_QUESTIONS, TOGGLE_QUIZ } from '../actions/quiz'

export default function quiz(state = {}, action){
    switch(action.type){
        case INITIALISE_QUIZ:
            return {
                totalQuestions: action.totalQuestions,
                correctQuestions: 0,
                quizFinished: false
            }
        case INCREMENT_CORRECT_QUESTIONS:
            return {
                ...state,
                correctQuestions: state.correctQuestions + 1
            }
            
        // case RESET_QUIZ:
        //     return {
        //         totalQuestions: action.totalQuestions,
        //         correctQuestions: 0,
        //         quizFinished: false
        //     }
        
        case TOGGLE_QUIZ:
            return {
                ...state,
                quizFinished: !state.quizFinished
            }
        default:
            return state
    }
}