import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from './components/Input';
import { RepoItem } from './RepoItem';
import { TextButton } from './components/TextButton';
import { sliceKey, reducer, actions } from './slice';
import { actions as githubUsersActions } from '../Huyxle/GithubUsers/slice';
import { githubRepoFormSaga } from './saga';
import {
  selectUsername,
  selectRepos,
  selectLoading,
  selectError,
} from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { RepoErrorType } from './types';
import { selectGithubUsers } from '../Huyxle/GithubUsers/selectors';

export function GithubRepoForm() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: githubRepoFormSaga });

  const username = useSelector(selectUsername);
  const repos = useSelector(selectRepos);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  //const [githubUsers, setGithubUsers] = useState([username]);
  //const githubUsers = useSelector(selectGithubUsers);

  const dispatch = useDispatch();

  const onChangeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeUsername(evt.currentTarget.value));
    //dispatch(actions.loadRepos());
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) {
      dispatch(actions.loadRepos());
      dispatch(githubUsersActions.addGithubUser(username));
    }
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    dispatch(actions.loadRepos());
  };

  const addGithubUser = () => {
    dispatch(githubUsersActions.addGithubUser(username));
  };

  const renderedRepos = useMemo(
    () =>
      repos.map(repo => {
        return (
          <RepoItem
            key={repo.id}
            name={repo.name}
            starCount={repo.stargazers_count}
            url={repo.html_url}
          />
        );
      }),
    [repos],
  );

  return (
    <Wrapper>
      <FormGroup onSubmit={onSubmitForm}>
        <FormLabel>Github Username</FormLabel>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Type any Github username"
            value={username}
            onChange={onChangeUsername}
          />

          <StyledDefaultButton type="submit" disabled={isLoading}>
            {isLoading ? <LoadingIndicator small /> : 'Load Repos'}
          </StyledDefaultButton>

          <StyledCustomeButton
            type="button"
            onClick={addGithubUser}
            disabled={isLoading}
          >
            {isLoading ? <LoadingIndicator small /> : 'Add User'}
          </StyledCustomeButton>
        </InputWrapper>

        {/* <StyledDefaultButton
          type="button"
          onClick={addGithubUser}
          disabled={isLoading}
        >
          {isLoading ? <LoadingIndicator small /> : 'Add User'}
        </StyledDefaultButton> */}
      </FormGroup>
      {repos?.length > 0 ? (
        <List>{renderedRepos}</List>
      ) : error ? (
        <ErrorText>{repoErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
}

export const repoErrorText = (error: RepoErrorType) => {
  switch (error) {
    case RepoErrorType.USER_NOT_FOUND:
      return 'There is no such user 😞';
    case RepoErrorType.USERNAME_EMPTY:
      return 'Type any Github username';
    case RepoErrorType.USER_HAS_NO_REPO:
      return 'User has no repository 🥺';
    case RepoErrorType.GITHUB_RATE_LIMIT:
      return 'Looks like github api`s rate limit(60 request/h) has exceeded 🤔';
    default:
      return 'An error has occurred!';
  }
};

const StyledDefaultButton = styled.button`
  color: rgba(0, 0, 0, 0.7);
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 1em;
  border: 2px solid rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  background-color: unset;
  width: 150px;

  :hover {
    cursor: pointer;
  }
`;

const StyledCustomeButton = styled(StyledDefaultButton)`
  color: rgba(215, 113, 88, 1);
  border-color: rgba(215, 113, 88, 1);
`;

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  ${Input} {
    width: ${100 / 3}%;
    margin-right: 0.5rem;
  }

  ${StyledDefaultButton} {
    color: rgba(215, 113, 88, 1);
    border-color: rgba(215, 113, 88, 1);
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
`;

const List = styled.div``;
