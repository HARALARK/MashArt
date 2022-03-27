import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_RESET,
  GET_POSTS_SUCCESS,
  POST_RESET,
  REPORT_POST_SUCCESS,
  REPORT_POST_FAIL,
  CREATE_COMIC_REQUEST,
  CREATE_COMIC_SUCCESS,
  CREATE_COMIC_FAIL,
  GET_COMICS_REQUEST,
  GET_COMICS_SUCCESS,
  GET_COMICS_FAIL,
  GET_COMICS_RESET,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  FLAG_POST_SUCCESS,
  FLAG_POST_FAIL,
  SEARCH_POST_REQUEST,
  SEARCH_POST_SUCCESS,
  SEARCH_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
} from "../constants/postConstants"

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true }
    case CREATE_POST_SUCCESS:
      return { loading: false, postInfo: action.payload }
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_COMIC_REQUEST:
      return { loading: true }
    case CREATE_COMIC_SUCCESS:
      return { loading: false, postInfo: action.payload }
    case CREATE_COMIC_FAIL:
      return { loading: false, error: action.payload }
    case POST_RESET:
      return {}
    default:
      return state
  }
}

export const getPostReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return { loading: true }
    case GET_POST_SUCCESS:
      return { loading: false, posts: action.payload }
    case GET_POST_FAIL:
      return { loading: false, error: action.payload }
    case GET_POSTS_RESET:
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

    case LIKE_POST_SUCCESS: {
      const { post } = action.payload
      const updatedPosts = state.posts.posts.map((p) => {
        if (p._id === post._id) {
          p.likes = post.likes
          return p
        } else {
          return p
        }
      })

      return { ...state, posts: { posts: updatedPosts } }
    }
    case LIKE_POST_FAIL:
      return { loading: false, error: action.payload }

    case REPORT_POST_SUCCESS: {
      const { post } = action.payload
      const updatedPosts = state.posts.posts.map((p) => {
        if (p._id === post._id) {
          p.reports = post.reports
          p.reportCount = post.reportCount
          return p
        } else {
          return p
        }
      })

      return { ...state, posts: { posts: updatedPosts } }
    }
    case REPORT_POST_FAIL:
      return { loading: false, error: action.payload }

    case FLAG_POST_SUCCESS: {
      const { post } = action.payload
      const updatedPosts = state.posts.posts.filter((p) => p._id !== post._id)

      return { ...state, posts: { posts: updatedPosts } }
    }
    case FLAG_POST_FAIL:
      return { loading: false, error: action.payload }

    case GET_POSTS_RESET:
      return {}
    default:
      return state
  }
}

export const getComicsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMICS_REQUEST:
      return { loading: true }
    case GET_COMICS_SUCCESS:
      return { loading: false, comics: action.payload }
    case GET_COMICS_FAIL:
      return { loading: false, error: action.payload }
    case GET_COMICS_RESET:
      return {}
    default:
      return state
  }
}

export const searchPostReducer = (
  state = { postsInfo: { posts: [] } },
  action
) => {
  switch (action.type) {
    case SEARCH_POST_REQUEST:
      return { loading: true }
    case SEARCH_POST_SUCCESS:
      return { loading: false, postsInfo: action.payload }
    case SEARCH_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
