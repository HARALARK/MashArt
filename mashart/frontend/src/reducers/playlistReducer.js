import {
  CREATE_PLAYLIST_FAIL,
  CREATE_PLAYLIST_REQUEST,
  CREATE_PLAYLIST_SUCCESS,
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
