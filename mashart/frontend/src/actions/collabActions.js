import axios from "axios"
import {
  CREATE_COLLAB_FAIL,
  CREATE_COLLAB_SUCCESS,
} from "../constants/collabConstants"

export const createCollab = (content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_COLLAB_SUCCESS,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "json/application",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post("/api/collab/create", config, content)

    dispatch({
      type: CREATE_COLLAB_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_COLLAB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
