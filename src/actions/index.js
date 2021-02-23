import {
  SEARCH_JOBS,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  NO_RESULTS,
  RESET_RESULTS,
  LOGIN,
  LOGOUT,
} from "./types";
import { fetchJobResults, getUserInfo, logout } from "../utils/fetches";

export const addToFavorite = favorite => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_FAVORITE,
    payload: favorite,
  });
};

export const removeFromFavorite = favorite => dispatch => {
  dispatch({
    type: REMOVE_FROM_FAVORITE,
    payload: favorite,
  });
};

export const noResults = msg => dispatch => {
  dispatch({
    type: NO_RESULTS,
    payload: msg,
  });
};

export const resetResults = () => dispatch => {
  dispatch({
    type: RESET_RESULTS,
  });
};

export const logUserIn = () => async dispatch => {
  try {
    const user = await getUserInfo();
    if (user)
      dispatch({
        type: LOGIN,
        payload: user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logUserOut = () => async dispatch => {
  try {
    const logoutUser = await logout();
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchJobs = (position, location) => async dispatch => {
  try {
    const jobs = await fetchJobResults(position, location);
    if (jobs.length !== 0) {
      dispatch(noResults(""));
    } else {
      dispatch(noResults("There are no results for this location/position"));
    }
    dispatch({
      type: SEARCH_JOBS,
      payload: jobs,
      position,
      location,
    });
  } catch (error) {}
};
