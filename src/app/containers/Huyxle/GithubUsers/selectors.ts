import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

export const selectDomain = (state: RootState) => {
  return state.githubUsers || initialState; 
}

export const selectGithubUsers = createSelector(
  [selectDomain],
  githubUserState => githubUserState.githubUsers,
)