import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

export const selectDomain = (state: RootState) => {
  return state.post || initialState; 
}

export const selectPostList = createSelector(
  [selectDomain],
  postState => postState.posts
)

export const selectIsLoading = createSelector(
  [selectDomain],
  postState => postState.isLoading
)
