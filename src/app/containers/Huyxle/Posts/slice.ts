import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContainerState, Post } from './types';

export const initialState: ContainerState = {
  posts: [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
  ],
  isLoading: false
};

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostList(state, action: PayloadAction<Post[]>) {
      state.isLoading = false;
      const posts = action.payload
      state.posts = posts;
    },
    loadPostList(state) {
      state.posts = [];
      state.isLoading = true;
    }
  },
});

export const { actions, reducer, name: sliceKey } = postsSlice;
