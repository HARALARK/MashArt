import axios from "axios"
import {
  CREATE_COLLAB_FAIL,
  CREATE_COLLAB_REQUEST,
  CREATE_COLLAB_SUCCESS,
  JOIN_COLLAB_FAIL,
  JOIN_COLLAB_REQUEST,
  JOIN_COLLAB_SUCCESS,
} from "../constants/collabConstants"

export const createCollab = (content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_COLLAB_REQUEST,
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

    const { data } = await axios.post("/api/collab/create", { content }, config)

    dispatch({
      type: CREATE_COLLAB_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_COLLAB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const joinCollab = (roomCode) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOIN_COLLAB_REQUEST,
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

    const { data } = await axios.post("/api/collab/join", { roomCode }, config)

    dispatch({
      type: JOIN_COLLAB_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: JOIN_COLLAB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
