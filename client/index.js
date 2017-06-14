import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"

import { Route } from "react-router-dom"
import { ConnectedRouter,  routerMiddleware } from 'react-router-redux'

import createHistory from "history/createBrowserHistory"

import { composeWithDevTools } from 'redux-devtools-extension'

import { reduxSearch } from 'redux-search'

import rootReducer from "./reducers/root-reducer"
import App from "./components/app"

const searchEnhancer = reduxSearch({
    resourceIndexes: {
        entities: ({resources, indexDocument, state}) => {
            for (let i in resources) {
                resources[i].tags.forEach(
                    tag => {
                        tag.content.forEach((co) => {
                            indexDocument(resources[i].id, co)
                        })
                    }
                )
            }
        }
    },
    resourceSelector: (resourceName, state) => {
        return state.searchResource[resourceName]
    }
})
const history = createHistory()       
const enhancer = composeWithDevTools(
    applyMiddleware(routerMiddleware(history)),
    searchEnhancer
)
        
const store = createStore(rootReducer,  enhancer)            

ReactDOM.render(
    <Provider store={store}>                    
        <ConnectedRouter history={history}  >   
            <Route path="/" component={App} />  
        </ConnectedRouter>   
    </Provider>,
    document.getElementById('app')
)
