import axios from "axios"
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  FLAG_POST_FAIL,
  FLAG_POST_REQUEST,
  FLAG_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_RESET,
  GET_POSTS_SUCCESS,
  POST_RESET,
  REPORT_POST_REQUEST,
  REPORT_POST_SUCCESS,
  REPORT_POST_FAIL,
  CREATE_COMIC_REQUEST,
  CREATE_COMIC_SUCCESS,
  CREATE_COMIC_FAIL,
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

export const getPosts =
  (role = "user") =>
  async (dispatch, getState) => {
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

      const { data } = await axios.get(
        `/api/post/${role !== "user" ? "true" : ""}`,
        config
      )

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

export const flagPost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FLAG_POST_REQUEST,
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

    const { data } = await axios.put(`/api/post/${id}/flag`, {}, config)

    dispatch({
      type: FLAG_POST_SUCCESS,
      payload: data,
    })
    dispatch({
      type: GET_POSTS_RESET,
    })
  } catch (error) {
    dispatch({
      type: FLAG_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const reportPost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORT_POST_REQUEST,
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
    const { data } = await axios.put(`/api/post/${id}/report`, {}, config)

    dispatch({
      type: REPORT_POST_SUCCESS,
      payload: data,
    })
    dispatch({
      type: GET_POSTS_RESET,
    })
  } catch (error) {
    dispatch({
      type: REPORT_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createComic = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_COMIC_REQUEST,
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

    const { data } = await axios.post("/api/post/create/comic", post, config)

    dispatch({
      type: CREATE_COMIC_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_COMIC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
