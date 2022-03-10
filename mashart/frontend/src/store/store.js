import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  forgotPasswordReducer,
  getUserPostReducer,
  resetPasswordReducer,
  searchUserReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "../reducers/userReducers"
import { createPostReducer, getPostsReducer } from "../reducers/postReducers"
import { createCollabReducer } from "../reducers/collabReducers"

let reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  searchUser: searchUserReducer,
  createPost: createPostReducer,
  posts: getPostsReducer,
  userPosts: getUserPostReducer,
  createCollab: createCollabReducer,
})

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
