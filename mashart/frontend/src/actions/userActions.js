import axios from "axios"
import {
  BAN_USER_REQUEST, //ahmed
  BAN_USER_SUCCESS, //ahmed
  BAN_USER_FAIL, //ahmed
  BLOCK_USER_FAIL,
  BLOCK_USER_REQUEST,
  BLOCK_USER_SUCCESS,
  CHANGE_ROLE_FAIL,
  CHANGE_ROLE_REQUEST,
  CHANGE_ROLE_SUCCESS,
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_BLOCKED_USERS_FAIL,
  GET_BLOCKED_USERS_REQUEST,
  GET_BLOCKED_USERS_SUCCESS,
  GET_USER_PLAYLISTS_FAIL,
  GET_USER_PLAYLISTS_REQUEST,
  GET_USER_PLAYLISTS_SUCCESS,
  GET_USER_POST_FAIL,
  GET_USER_POST_REQUEST,
  GET_USER_POST_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEARCH_USER_FAIL,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UNBLOCK_USER_FAIL,
  UNBLOCK_USER_REQUEST,
  UNBLOCK_USER_SUCCESS,
  UNFOLLOW_USER_FAIL,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_PROFILE,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants"

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      "/api/user/login",
      { username, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({
    type: USER_LOGOUT,
  })
  dispatch({
    type: USER_DETAILS_RESET,
  })
}

export const register =
  (username, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        "/api/user",
        {
          username,
          email,
          password,
          confirmPassword,
        },
        config
      )

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/user/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.reponse && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetUserDetails = () => (dispatch) => {
  dispatch({
    type: USER_DETAILS_RESET,
  })
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(`/api/user/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetUserProfile = () => (dispatch) => {
  dispatch({
    type: USER_RESET_PROFILE,
  })
}

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(
      "/api/user/forgot-password",
      { email },
      config
    )

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetPassword = (password, resetLink) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(
      "/api/user/reset-password",
      { password, resetLink },
      config
    )

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const searchUser = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCH_USER_REQUEST,
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
      `/api/user/search?username=${username}`,
      config
    )

    dispatch({
      type: SEARCH_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SEARCH_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_POST_REQUEST,
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

    const { data } = await axios.get(`/api/user/post`, config)

    dispatch({
      type: GET_USER_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_USER_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserPlaylists = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_PLAYLISTS_REQUEST,
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

    const { data } = await axios.get(`/api/user/playlist`, config)

    dispatch({
      type: GET_USER_PLAYLISTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_USER_PLAYLISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const changeRole = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANGE_ROLE_REQUEST,
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

    const { data } = await axios.put(`/api/user/role`, { _id }, config)

    dispatch({
      type: CHANGE_ROLE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_DETAILS_RESET,
    })
  } catch (error) {
    dispatch({
      type: CHANGE_ROLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const followUser = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOLLOW_USER_REQUEST,
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

    const { data } = await axios.put(
      `/api/user/profile/follow`,
      { _id },
      config
    )

    dispatch({
      type: FOLLOW_USER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_DETAILS_RESET,
    })
  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const unfollowUser = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
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

    const { data } = await axios.put(
      `/api/user/profile/unfollow`,
      { _id },
      config
    )

    dispatch({
      type: UNFOLLOW_USER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_DETAILS_RESET,
    })
  } catch (error) {
    dispatch({
      type: UNFOLLOW_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getblockedUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_BLOCKED_USERS_REQUEST,
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
    const { data } = await axios.get(`/api/user/blocked`, config)

    dispatch({
      type: GET_BLOCKED_USERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_BLOCKED_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const blockUser = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOCK_USER_REQUEST,
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

    const { data } = await axios.put(`/api/user/profile/block`, { _id }, config)

    dispatch({
      type: BLOCK_USER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_DETAILS_RESET,
    })
  } catch (error) {
    dispatch({
      type: BLOCK_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const unblockUser = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNBLOCK_USER_REQUEST,
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

    const { data } = await axios.put(
      `/api/user/profile/unblock`,
      { _id },
      config
    )

    dispatch({
      type: UNBLOCK_USER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_DETAILS_RESET,
    })
  } catch (error) {
    dispatch({
      type: UNBLOCK_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const banUser = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BAN_USER_REQUEST,
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

    const { data } = await axios.put(`/api/user/profile/block`, { _id }, config)

    dispatch({
      type: BAN_USER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_DETAILS_RESET,
    })
  } catch (error) {
    dispatch({
      type: BAN_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
