import {
  BAN_USER_FAIL,
  BAN_USER_REQUEST,
  BAN_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_BLOCKED_USERS_FAIL,
  GET_BLOCKED_USERS_REQUEST,
  GET_BLOCKED_USERS_SUCCESS,
  GET_USER_PLAYLISTS_FAIL,
  GET_USER_PLAYLISTS_REQUEST,
  GET_USER_PLAYLISTS_RESET,
  GET_USER_PLAYLISTS_SUCCESS,
  GET_USER_POST_FAIL,
  GET_USER_POST_REQUEST,
  GET_USER_POST_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEARCH_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PROFILE,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userLogin: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_RESET_PROFILE:
      return {}
    default:
      return state
  }
}

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true }
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: action.payload }
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true }
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: action.payload }
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const searchUserReducer = (
  state = { usersInfo: { users: [] } },
  action
) => {
  switch (action.type) {
    case SEARCH_USER_REQUEST:
      return { loading: true }
    case SEARCH_USER_SUCCESS:
      return { loading: false, usersInfo: action.payload }
    case SEARCH_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getUserPostReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_POST_REQUEST:
      return { loading: true }
    case GET_USER_POST_SUCCESS:
      return { loading: false, posts: action.payload }
    case GET_USER_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getUserPlaylistsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PLAYLISTS_REQUEST:
      return { loading: true }
    case GET_USER_PLAYLISTS_SUCCESS:
      return { loading: false, playlists: action.payload }
    case GET_USER_PLAYLISTS_FAIL:
      return { loading: false, error: action.payload }
    case GET_USER_PLAYLISTS_RESET:
      return {}
    default:
      return state
  }
}

export const blockedUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BLOCKED_USERS_REQUEST:
      return { loading: true }
    case GET_BLOCKED_USERS_SUCCESS:
      return { loading: false, blockedUsers: action.payload }
    case GET_BLOCKED_USERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const banUserReducer = (state = {}, action) => {
  //ahmed
  switch (action.type) {
    case BAN_USER_REQUEST:
      return { loading: true }
    case BAN_USER_SUCCESS:
      return { loading: false, banUser: action.payload }
    case BAN_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
