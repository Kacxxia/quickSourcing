// import fetch from 'node-fetch'
// import React from 'react'
// import { API_URL } from '../utils'
// import { renderToString } from 'react-dom/server'
// import { Provider } from "react-redux"
// import { createStore, applyMiddleware } from "redux"
// import { Route } from "react-router-dom"
// import { ConnectedRouter,  routerMiddleware } from 'react-router-redux'

// import createHistory from "history/createMemoryHistory"

// import { composeWithDevTools } from 'redux-devtools-extension'

// import rootReducer from '../../client/reducers/root-reducer'

// import {
//     GET_ENTITIES_DONE,
//     GET_TAGS_DONE,
//     GET_DETAIL_DONE
// } from '../../client/actions/types'

// import App from '../../client/components/app'

// export function handleRequest(req, res, next) {
//     const history = createHistory()       
//     const enhancer = composeWithDevTools(
//         applyMiddleware(routerMiddleware(history))
//     )
//     const store = createStore(rootReducer,  enhancer)  

//     Promise.all([getEntities(), getTags(), getDetail(req.url)])
//     .then((responses) => {
//         let jsons = []
//         for (let i=0; i<responses.length; i++) {
//             if (responses[i]){
//                 jsons.push(responses[i].json())
//             }
//         }
//         return Promise.all(jsons)
//     })
//     .then((datas) => {
//         store.dispatch({type: GET_ENTITIES_DONE, payload: datas[0]})
//         store.dispatch({type: GET_TAGS_DONE, payload: datas[1]})
//         if (datas[2]) {
//             store.dispatch({type: GET_DETAIL_DONE, payload: datas[2]})
//         }
//         const html = renderToString(
//             <Provider store={store}>                    
//                 <ConnectedRouter history={history} location={req.url} >   
//                     <Route path="/" component={App} />  
//                 </ConnectedRouter>   
//             </Provider>
//         )

//         const finalState = store.getState()

//         res.send(renderFullPage(html, finalState))
//     })
//     .catch((err) => {
//         res.send(err)
//     })
// }

// function getTags() {
//     return fetch(`${API_URL}/tags`)
// }
// function getEntities() {
//     return fetch(`${API_URL}/entities`)
// }
// function getDetail(url) {
//     const reg = /\/entities\/(\w{24})\/?/
//     const match = url.match(reg)
//     if (match) {
//         const id = match[1]
//         return fetch(`${API_URL}/entities/${id}`)
//     }
//     else {
//         return Promise.resolve(null)
//     }
// }

// function renderFullPage(html, preloadedState) {
//   return `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Document</title>
//     <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
//     <link type="text/css" rel="stylesheet" href="/static/css/materialize.min.css"  media="screen,projection"/>
//     <style>
//         html, body, #app {
//             height: 100%;
//         }
//         .flex-column {
//             flex-direction: column;
//         }
//         .align-items-center{
//             align-items: center;
//         }
//         .justify-content-center{
//             justify-content: center;
//         }
//         .d-flex {
//             display: flex;
//         }
//         .h-100 {
//             height: 100%;
//         }
//         .pt-2 {
//             padding-top: 2rem;
//         }
//         .pd-4 {
//             padding-bottom: 4rem;
//         }
//         .breadcrumb::before {
//             font-size: inherit;
//             color: rgba(0, 0, 0, 0.6);
//             cursor: default;
//         }
//         .breadcrumb {
//             color: rgba(0, 0, 0, 0.4);
//         }
//         .breadcrumb:last-child {
//             color: black;
//         }
//         .align-items-end {
//             align-items: flex-end;
//         }
//     </style>
// </head>
// <body>
//     <div id="app">${html}</div>
// </body>
//     <script>
//           window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
//     </script>
//     <script type="text/javascript" src="/static/js/jquery-3.2.1.min.js"></script>
//     <script type="text/javascript" src="/static/js/materialize.min.js"></script>
//     <script src="/static/bundle.js"></script>

// </html>
//     `
// }