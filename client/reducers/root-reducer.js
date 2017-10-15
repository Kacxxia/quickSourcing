import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import searchResourceReducer from './search_resource_reducer'
import authReducer from './auth_reducer'
import detailReducer from './detail_reducer'
import { reducer as searchReducer } from 'redux-search'
import entitiesReducer from './entities_reducer'
import errorReducer from './error_reducer'
import userReducer from './user_reducer'
import commonReducer from './common_reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    searchResource: searchResourceReducer,
    detail: detailReducer,
    router: routerReducer,
    search: searchReducer,
    entities: entitiesReducer,
    error: errorReducer,
    user: userReducer,
    common: commonReducer
})

export default rootReducer