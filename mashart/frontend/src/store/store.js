import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import composeWithDevTools from "redux-devtools-extension"

let reducer = combineReducers({})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

let middleware = [thunk]

let store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
