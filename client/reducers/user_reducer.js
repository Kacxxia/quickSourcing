import {
    AUTH_USER,
    UNAUTH_USER,
    OPEN_NAV_AVATAR_MENU,
    CLOSE_NAV_AVATAR_MENU,
    GET_PROFILE_WAITING,
    GET_PROFILE_DONE,
    GET_PROFILE_NOTFOUND,
    EDIT_PROFILE_START,
    EDIT_PROFILE_WAITING,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_CANCEL,
    EDIT_PROFILE_AVATAR,
    EDIT_PROFILE_USERNAME,
    EDIT_PROFILE_INTRODUCTION
} from '../actions/types'

const INITIAL_STATE = {
    isFetching: true,
    exist: true,
    editStatus: 0, //0不在编辑状态 2等待上传
    email: '',
    avatar: '',
    role: '',
    username: '',
    _id: '',
    createTime: '',
    introduction: '',
    activities: [],
    menu: {
        open: false,
        anchorTarget: null
    },
    edit: {
        avatar: '',
        username: '',
        introduction: ''
    }
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UNAUTH_USER:
            return Object.assign({}, state, { _id: '' })
        case AUTH_USER:
            return Object.assign({}, state, 
                { 
                    email: action.user.email, 
                    avatar: action.user.avatar,
                    _id: action.user._id
                })
        case OPEN_NAV_AVATAR_MENU:
            return Object.assign({}, state, 
                { menu: { open: true, anchorTarget: action.target }})
        case CLOSE_NAV_AVATAR_MENU:
            return Object.assign({}, state, 
                { menu: INITIAL_STATE.menu})
        case GET_PROFILE_WAITING:
            return Object.assign({}, state, { isFetching: true })
        case GET_PROFILE_DONE:
            return Object.assign({}, state, 
                { 
                    isFetching: false,
                    exist: true,
                    username: action.payload.username,
                    avatar: action.payload.avatar,
                    createTime: action.payload.createTime,
                    role: action.payload.role,
                    // _id: action.payload._id,
                    activities: action.payload.activities,
                    introduction: action.payload.introduction,
                    edit: {
                        username: action.payload.username,
                        avatar: action.payload.avatar,
                        introduction: action.payload.introduction
                    }
                })
        case GET_PROFILE_NOTFOUND:
            return Object.assign({}, state, 
                {
                    isFetching: false,
                    exist: false
                }
            )
        case EDIT_PROFILE_START:
            return Object.assign({}, state, { editStatus: 1 } )
        case EDIT_PROFILE_WAITING:
            return Object.assign({}, state, { editStatus: 2 } )
        case EDIT_PROFILE_SUCCESS:
            return Object.assign({}, state, { 
                editStatus: 0,
                username: action.payload.username,
                introduction: action.payload.introduction,
                avatar: action.payload.avatar
             } )
        case EDIT_PROFILE_CANCEL:
            return Object.assign({}, state, { editStatus: 0 } )
        case EDIT_PROFILE_AVATAR:
        case EDIT_PROFILE_INTRODUCTION:
        case EDIT_PROFILE_USERNAME:
            return Object.assign({}, state, { edit: handleEdit(state.edit, action)})
        default: 
            return state
    }
}

function handleEdit(state, action){
    switch(action.type) {
        case EDIT_PROFILE_AVATAR:
            return Object.assign({}, state, { avatar: action.payload})
        case EDIT_PROFILE_INTRODUCTION:
            return Object.assign({}, state, { introduction: action.payload})
        case EDIT_PROFILE_USERNAME:
            return Object.assign({}, state, { username: action.payload})
        default:
            return state
    }
}