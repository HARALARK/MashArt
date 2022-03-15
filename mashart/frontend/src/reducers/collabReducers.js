import {
  CREATE_COLLAB_FAIL,
  CREATE_COLLAB_REQUEST,
  CREATE_COLLAB_SUCCESS,
  JOIN_COLLAB_FAIL,
  JOIN_COLLAB_REQUEST,
  JOIN_COLLAB_SUCCESS,
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
    default:
      return state
  }
}
