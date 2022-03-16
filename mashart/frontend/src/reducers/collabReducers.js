import {
  CREATE_COLLAB_FAIL,
  CREATE_COLLAB_REQUEST,
  CREATE_COLLAB_SUCCESS,
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

export const collabReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COLLAB_REQUEST:
      return { loading: true }
    case CREATE_COLLAB_SUCCESS:
      return { loading: false, collab: action.payload }
    case CREATE_COLLAB_FAIL:
      return { loading: false, error: action.payload }
    case JOIN_COLLAB_REQUEST:
      return { loading: true }
    case JOIN_COLLAB_SUCCESS:
      return { loading: false, collab: action.payload }
    case JOIN_COLLAB_FAIL:
      return { loading: false, error: action.payload }
    case LEAVE_COLLAB_REQUEST:
      return { loading: true }
    case LEAVE_COLLAB_SUCCESS:
      return { loading: false, collab: null, leave: true }
    case LEAVE_COLLAB_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const collabUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COLLAB_USERS_REQUEST:
      return { loading: true }
    case GET_COLLAB_USERS_SUCCESS:
      return { loading: false, users: action.payload }
    case GET_COLLAB_USERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
