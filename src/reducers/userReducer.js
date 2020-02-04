import { USER_LOGIN, USER_LOGOUT, USER_SAVE } from '../actions/types';
const initialState = {
    userName: '',
    isLogin: false,
    translations: [],
    error: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, userName: action.payload.userName, isLogin: true }
        case USER_SAVE:
            {
                let currentTranslations = state.translations;
                let newTrans = {
                    sourceLanguage: action.payload.sourceLanguage,
                    targetLanguage: action.payload.targetLanguage,
                    inputText: action.payload.inputText,
                    outputText: action.payload.outputText
                }
                currentTranslations.push(newTrans);
                return { ...state, translations: currentTranslations }
            }
        case USER_LOGOUT:
            return initialState
        default:
            return state;
    }
}

export default userReducer;