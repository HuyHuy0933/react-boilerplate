import { GithubRepoFormState } from 'app/containers/GithubRepoForm/types';
import { ThemeState } from 'styles/theme/types';
import { PostState } from 'app/containers/Huyxle/Posts/types';
import { GithubUsersState } from 'app/containers/Huyxle/GithubUsers/slice';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  githubRepoForm?: GithubRepoFormState;
  post?: PostState;
  githubUsers: GithubUsersState
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
