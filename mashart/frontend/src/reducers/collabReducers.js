import {
  CREATE_COLLAB_FAIL,
  CREATE_COLLAB_REQUEST,
  CREATE_COLLAB_SUCCESS,
} from "../constants/collabConstants"

export const createCollabReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COLLAB_REQUEST:
      return { loading: true }
    case CREATE_COLLAB_SUCCESS:
      return { loading: false, collab: action.payload }
    case CREATE_COLLAB_FAIL:
      return { loading: false, error: action.payload }
    default:
      return {}
  }
}