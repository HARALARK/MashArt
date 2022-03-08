import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_RESET,
  GET_POSTS_SUCCESS,
  POST_RESET,
} from "../constants/postContants"

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true }
    case CREATE_POST_SUCCESS:
      return { loading: false, postInfo: action.payload }
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload }
    case POST_RESET:
      return {}
    default:
      return state
  }
}

export const getPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { loading: true }
    case GET_POSTS_SUCCESS:
      return { loading: false, posts: action.payload }
    case GET_POSTS_FAIL:
      return { loading: false, error: action.payload }
    case GET_POSTS_RESET:
      return {}
    default:
      return state
  }
}
