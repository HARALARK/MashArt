import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  banUserReducer, //ahmed
  blockedUsersReducer,
  forgotPasswordReducer,
  getUserPlaylistsReducer,
  getUserPostReducer,
  resetPasswordReducer,
  searchUserReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "../reducers/userReducers"
import {
  createPostReducer,
  getComicsReducer,
  getPostReducer,
  getPostsReducer,
  searchPostReducer,
} from "../reducers/postReducers"
import { collabReducer, collabUsersReducer } from "../reducers/collabReducers"
import {
  addPostToPlaylistReducer,
  createPlaylistReducer,
  getPlaylistReducer,
} from "../reducers/playlistReducer"

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
  collab: collabReducer,
  collabUsers: collabUsersReducer,
  blockedUsers: blockedUsersReducer,
  banUser: banUserReducer,
  userPlaylists: getUserPlaylistsReducer,
  createPlaylist: createPlaylistReducer,
  addPostToPlaylist: addPostToPlaylistReducer,
  getPlaylist: getPlaylistReducer,
  comics: getComicsReducer,
  searchPost: searchPostReducer,
  getPost: getPostReducer,
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
