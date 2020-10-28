import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => {
  return state.githubRepoForm || initialState;
}

export const selectUsername = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.username,
);

export const selectLoading = createSelector(
  [selectDomain],
  githubRepoFormState => {
    console.log('huy')
    return githubRepoFormState.loading
  },
);

export const selectError = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.error,
);

export const selectRepos = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.repositories,
);
