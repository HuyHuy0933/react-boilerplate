import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GithubUsersState {
  githubUsers: string[]
}

export const initialState: GithubUsersState = {
  githubUsers: []
};

const githubUsersSlice = createSlice({
  name: 'githubUsers',
  initialState,
  reducers: {
    addGithubUser(state, action: PayloadAction<string>) {
      if (!state.githubUsers.includes(action.payload))
        state.githubUsers.push(action.payload);
    }
  }
});

export const  { actions, reducer, name: sliceKey } = githubUsersSlice;
