import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
} from "../constants/postContants"

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true }
    case CREATE_POST_SUCCESS:
      return { loading: false, postInfo: action.payload }
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
