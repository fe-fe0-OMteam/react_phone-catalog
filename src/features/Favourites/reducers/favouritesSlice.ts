/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IFavourite } from '../favourite.interface';

export interface ICartState {
  favourites: IFavourite[],
}

const initialState: ICartState = {
  favourites: [],
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.favourites.push({ id: action.payload });
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(favourite => {
        return favourite.id !== action.payload;
      });
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
