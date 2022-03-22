import axios from "axios"
import {
  CREATE_PLAYLIST_FAIL,
  CREATE_PLAYLIST_REQUEST,
  CREATE_PLAYLIST_SUCCESS,
  PLAYLIST_RESET,
} from "../constants/playlistConstants"
import { GET_USER_PLAYLISTS_RESET } from "../constants/userConstants"

export const createPlaylist = (playlist) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PLAYLIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post("/api/playlist/create", playlist, config)

    dispatch({
      type: CREATE_PLAYLIST_SUCCESS,
      payload: data,
    })
    dispatch({
      type: GET_USER_PLAYLISTS_RESET,
    })
  } catch (error) {
    dispatch({
      type: CREATE_PLAYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPlaylistReset = () => async (dispatch) => {
  dispatch({
    type: PLAYLIST_RESET,
  })
  dispatch({
    type: GET_USER_PLAYLISTS_RESET,
  })
}