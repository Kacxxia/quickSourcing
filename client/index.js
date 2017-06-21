import 'babel-polyfill'
import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"

import ReduxThunk from 'redux-thunk'

import { Route } from "react-router-dom"
import { ConnectedRouter,  routerMiddleware } from 'react-router-redux'

import createHistory from "history/createBrowserHistory"

import { composeWithDevTools } from 'redux-devtools-extension'

import { reduxSearch } from 'redux-search'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTagEventPlugin from 'react-tap-event-plugin'

import rootReducer from "./reducers/root-reducer"
import App from "./components/app"

injectTagEventPlugin()

const searchEnhancer = reduxSearch({
    resourceIndexes: {
        entities: ({resources, indexDocument, state}) => {
            for (let i in resources) {
                resources[i].tags.forEach(
                    tag => {
                            indexDocument(resources[i].id, tag)
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
    applyMiddleware(ReduxThunk),
    searchEnhancer
)
        
const store = createStore(rootReducer,  enhancer)            

ReactDOM.render(
    <Provider store={store}>                    
        <ConnectedRouter history={history}  >
            <MuiThemeProvider >   
                <Route path="/" component={App} />  
            </MuiThemeProvider>
        </ConnectedRouter>   
    </Provider>,
    document.getElementById('app')
)
