import { USER_LOGIN, USER_LOGOUT, USER_SAVE, TRANS_DELETE, DICTIONARY_CREATE } from '../actions/types';
const initialState = {
    userName: '',
    isLogin: false,
    translations: [],
    dictionaries: [{ Id: 1, Name: 'default' }],
    error: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, userName: action.payload.userName, isLogin: true }
        case USER_SAVE:
            {
                debugger
                let newTrans = {
                    Id: state.translations.length + 1,
                    sourceLanguage: action.payload.sourceLanguage,
                    targetLanguage: action.payload.targetLanguage,
                    inputText: action.payload.inputText,
                    outputText: action.payload.outputText,
                    dictionary: action.payload.dictionary
                }
                return { ...state, translations: [...state.translations, newTrans] }
            }
        case TRANS_DELETE: {
            return { ...state, translations: state.translations.filter(x => x.Id != action.payload.Id) }
        }
        case DICTIONARY_CREATE: {
            let dic = { Id: state.dictionaries.length + 1, Name: action.payload.dictionary };
            return { ...state, dictionaries: [...state.dictionaries, dic] }
        }
        case USER_LOGOUT:
            return initialState
        default:
            return state;
    }
}

export default userReducer;