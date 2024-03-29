import HttpService from "app/services/HttpService";
import { applyMiddleware, compose, createStore } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import createSagaMiddleware from 'redux-saga';
import thunk from "redux-thunk";
import RootReducer from "./reducers/RootReducer";
import logger from "redux-logger"
import { rootSaga } from "./saga/RootSaga";

const sagaMiddleware = createSagaMiddleware()
const initialState = {};
//const middlewares = [thunk];
const middlewares = [
  thunk,
  sagaMiddleware,
  logger,
  //routerMiddleware(browserHistory),
  axiosMiddleware(HttpService.getAxiosClient())
];
export const Store = createStore(
  RootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares)
    // applyMiddleware(...middlewares),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
sagaMiddleware.run(rootSaga)
