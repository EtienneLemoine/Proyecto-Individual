import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../Reducer/index'
import thunk from 'redux-thunk'

const composeEnhancers =(typeof window !== 'undefined' && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE) || compose;

const store = createStore(
    reducer,  
    composeEnhancers(applyMiddleware(thunk))
);

export default store;