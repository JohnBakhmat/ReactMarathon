import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from '../services/firebase';
const initialState = {
  isLoading: false,
  data: {},
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUser: () => ({
      isLoading: true,
    }),
    updateUser: (state, action) => ({
      isLoading: false,
      data: action.payload,
    }),
    removeUser: () => ({
      isLoading: false,
      data: {},
    }),
  },
});

export const { fetchUser, updateUser, removeUser } = user.actions;

export const selectUserLoading = (state) => state.user.isLoading;
export const selectUser = (state) => state.user.data;
export const selectLocalId = (state) => state.user.data?.localId;

export const getUserUpdateAsync = () => async (dispatch) => {
  const idToken = localStorage.getItem('idToken');
  if (idToken) {
    getUserInfo(idToken)
      .then((response) => {
        console.log(response.data.users);
        dispatch(updateUser(response.data.users[0]));
      })
      .catch((error) => {
        console.dir(error);
        localStorage.removeItem('idToken');
        dispatch(removeUser());
      });
  } else {
    dispatch(removeUser());
  }
};
export const getUserAsync = () => (dispatch) => {
  dispatch(fetchUser());
  dispatch(getUserUpdateAsync());
};

export default user.reducer;
