const initialState = {
    username: '',
    profile_pic: '',
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user,
    }
}

export function logout(user) {
    return {
        type: LOGOUT,
        payload: user,
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, user: action.payload }
        case LOGOUT:
            return { ...state, user: action.payload }
        default:
            return state
    }
}
