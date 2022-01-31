import axios from "axios"
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
} from "../constants/postContants"

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
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