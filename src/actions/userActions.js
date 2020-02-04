import { USER_LOGIN, USER_LOGOUT, USER_SAVE } from './types';
export const loginAction = (userName) => {
    return {
        type: USER_LOGIN,
        payload: { userName }
    }
}

export const saveAction = (sourceLanguage, targetLanguage, inputText, outputText) => {
    return {
        type: USER_SAVE,
        payload: { sourceLanguage, targetLanguage, inputText, outputText }
    }
}

export const logoutAction = () => {
    return { type: USER_LOGOUT }
}