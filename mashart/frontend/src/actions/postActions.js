import axios from "axios"
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  POST_RESET,
} from "../constants/postContants"

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
}
