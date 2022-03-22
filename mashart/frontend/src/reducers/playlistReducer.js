import {
  ADD_POST_PLAYLIST_FAIL,
  ADD_POST_PLAYLIST_REQUEST,
  ADD_POST_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAIL,
  CREATE_PLAYLIST_REQUEST,
  CREATE_PLAYLIST_SUCCESS,
  GET_PLAYLIST_FAIL,
  GET_PLAYLIST_REQUEST,
  GET_PLAYLIST_RESET,
  GET_PLAYLIST_SUCCESS,
  PLAYLIST_RESET,
} from "../constants/playlistConstants"

export const createPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PLAYLIST_REQUEST:
      return { loading: true }
    case CREATE_PLAYLIST_SUCCESS:
      return { loading: false, playlistInfo: action.payload }
    case CREATE_PLAYLIST_FAIL:
      return { loading: false, error: action.payload }
    case PLAYLIST_RESET:
      return {}
    default:
      return state
  }
}

export const addPostToPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST_PLAYLIST_REQUEST:
      return { loading: true }
    case ADD_POST_PLAYLIST_SUCCESS:
      return { loading: false, playlistInfo: action.payload }
    case ADD_POST_PLAYLIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PLAYLIST_REQUEST:
      return { loading: true }
    case GET_PLAYLIST_SUCCESS:
      return { loading: false, playlist: action.payload }
    case GET_PLAYLIST_FAIL:
      return { loading: false, error: action.payload }
    case GET_PLAYLIST_RESET:
      return {}
    default:
      return state
  }
}
