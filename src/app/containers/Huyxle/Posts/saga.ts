import { takeLatest, put } from "redux-saga/effects";

import { actions } from './slice';
import { Post } from "./types";

export function* setPostList() {
  const arr: Post[] = [
    { id: '1', title: 'First Post!', content: 'Hello! Huy' },
    { id: '2', title: 'Second Post', content: 'More text' },
    { id: '3', title: 'Third Post', content: 'More text Huy' }
  ];

  yield put(actions.setPostList(arr));
}

export function* watchPostList() {
  yield takeLatest(actions.loadPostList.type, setPostList);
}