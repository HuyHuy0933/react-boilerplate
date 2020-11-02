import React, { useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import styled from 'styled-components';

import { selectGithubUsers } from './selectors';
import { reducer, sliceKey } from './slice';
import { actions as githubRepoFormActions } from '../../GithubRepoForm/slice';
import { selectUsername } from 'app/containers/GithubRepoForm/selectors';

export function GithubUsers() {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  const githubUsers = useSelector(selectGithubUsers);
  const selectedGithubUser = useSelector(selectUsername);

  const dispatch = useDispatch();

  function selectGithubUser(username) {
    dispatch(githubRepoFormActions.changeUsername(username));
  }

  const renderedGithubUsers = githubUsers.map(user => (
    <StyledGithubUser
      key={user}
      onClick={() => selectGithubUser(user)}
      isSelectedUser={user === selectedGithubUser}
    >
      {user}
    </StyledGithubUser>
  ));

  // return (
  //   <div>
  //     {githubUsers.map(user => (
  //       <StyledGithubUser
  //         key={user}
  //         onClick={() => selectGithubUser(user)}
  //         isSelectedUser={user === selectedGithubUser}
  //       >
  //         {user}
  //       </StyledGithubUser>
  //     ))}
  //   </div>
  // );

  return <div>{renderedGithubUsers}</div>;
}

const StyledGithubUser = styled.span<{ isSelectedUser: boolean }>`
  font-weight: 400;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid
    ${props =>
      props.isSelectedUser ? ' rgba(215, 113, 88, 1)' : 'rgba(0, 0, 0, 0.2)'};
  line-height: normal;
  vertical-align: middle;
  margin-right: 13px;
  margin-bottom: 12px;
  color: ${props =>
    props.isSelectedUser ? ' rgba(215, 113, 88, 1)' : 'rgba(0, 0, 0, 0.7)'};
  padding: 0.5em 1em;
  display: inline-block;
  font-size: 14px;

  :hover {
    cursor: pointer;
    color: rgba(215, 113, 88, 1);
    border-color: rgba(215, 113, 88, 1);
  }
`;
