import axios from "axios"
import {
  CREATE_COLLAB_FAIL,
  CREATE_COLLAB_REQUEST,
  CREATE_COLLAB_SUCCESS,
  DELETE_COLLAB_FAIL,
  DELETE_COLLAB_REQUEST,
  DELETE_COLLAB_SUCCESS,
  GET_COLLAB_USERS_FAIL,
  GET_COLLAB_USERS_REQUEST,
  GET_COLLAB_USERS_SUCCESS,
  JOIN_COLLAB_FAIL,
  JOIN_COLLAB_REQUEST,
  JOIN_COLLAB_SUCCESS,
  LEAVE_COLLAB_FAIL,
  LEAVE_COLLAB_REQUEST,
  LEAVE_COLLAB_SUCCESS,
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

export const leaveCollab = (roomCode) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LEAVE_COLLAB_REQUEST,
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

    const { data } = await axios.post("/api/collab/leave", { roomCode }, config)

    dispatch({
      type: LEAVE_COLLAB_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LEAVE_COLLAB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCollabUsers = (roomCode) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COLLAB_USERS_REQUEST,
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

    const { data } = await axios.get(`/api/collab/users/${roomCode}`, config)

    dispatch({
      type: GET_COLLAB_USERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_COLLAB_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCollab = (roomCode) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_COLLAB_REQUEST,
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

    const { data } = await axios.delete(
      "/api/collab/delete",
      { roomCode },
      config
    )

    dispatch({
      type: DELETE_COLLAB_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_COLLAB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
