export const INCREMENT_CORRECT_QUESTIONS = 'INCREMENT_CORRECT_QUESTIONS'
export const RESET_QUIZ = 'RESET_QUIZ'
export const INITIALISE_QUIZ = 'RECEIVE_TOTAL_QUESTIONS'
export const TOGGLE_QUIZ = 'TOGGLE_QUIZ'

export function incrementCorrectQuestions(){
    return {
        type: INCREMENT_CORRECT_QUESTIONS
    }
}

export function initialiseQuiz(totalQuestions){
    return{
        type: INITIALISE_QUIZ,
        totalQuestions
    }
}

export function resetQuiz(){
    return {
        type: RESET_QUIZ
    }
}

export function toggleQuiz(){
    return {
        type: TOGGLE_QUIZ
    }
}