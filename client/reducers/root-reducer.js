import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import searchResourceReducer from './search_resource_reducer'
import authReducer from './auth_reducer'
import detailReducer from './detail_reducer'
import { reducer as searchReducer } from 'redux-search'
import entitiesReducer from './entities_reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    searchResource: searchResourceReducer,
    detail: detailReducer,
    router: routerReducer,
    search: searchReducer,
    entities: entitiesReducer
})

export default rootReducer