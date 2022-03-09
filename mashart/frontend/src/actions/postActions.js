import axios from "axios"
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_RESET,
  GET_POSTS_SUCCESS,
  POST_RESET,
} from "../constants/postConstants"

export const createPost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post("/api/post/create", post, config)

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPostReset = () => async (dispatch) => {
  dispatch({
    type: POST_RESET,
  })
  dispatch({
    type: GET_POSTS_RESET,
  })
}

export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_POSTS_REQUEST,
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

    const { data } = await axios.get("/api/post/", config)

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
