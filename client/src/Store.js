import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from "redux";
  import thunk from "redux-thunk";
  import {rootReducer} from './Reducers/index'
  
  // const initialState = {};
  const middleware = [thunk];
  
  function saveToSessionStorage(store) {
    try {
        const reduxStore = JSON.stringify(store);
        window.sessionStorage.setItem('store', reduxStore);
    } catch(error) {
        console.log(error);
    }
  }
  
  function loadFromSessionStorage() {
    try {
        const reduxStore = window.sessionStorage.getItem('store');
        if(reduxStore === null) return undefined;
        return JSON.parse(reduxStore);
    } catch(error) {
        console.log(error);
        return undefined;
    }
  }
  
  const initialState = loadFromSessionStorage();
  
  
  const store = createStore(
      rootReducer,
      initialState,
      compose(
          applyMiddleware(...middleware),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );
  
  store.subscribe(() => saveToSessionStorage(store.getState()));
  
  export default store;