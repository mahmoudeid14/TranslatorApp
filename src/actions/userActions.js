import { USER_LOGIN, USER_LOGOUT, USER_SAVE, TRANS_DELETE, DICTIONARY_CREATE } from './types';
export const loginAction = (userName) => {
    return {
        type: USER_LOGIN,
        payload: { userName }
    }
}

export const saveAction = (sourceLanguage, targetLanguage, inputText, outputText,dictionary) => {
    return {
        type: USER_SAVE,
        payload: { sourceLanguage, targetLanguage, inputText, outputText,dictionary }
    }
}

export const logoutAction = () => {
    return { type: USER_LOGOUT }
}

export const deleteTranslation = (Id) => {
    return {
        type: TRANS_DELETE,
        payload: { Id }
    }
}
export const createDictionary = (dictionary) => {
    return {
        type: DICTIONARY_CREATE,
        payload: { dictionary }
    }
}