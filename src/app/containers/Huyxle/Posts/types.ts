export interface PostState {
  posts: Post[],
  isLoading: boolean
}

export interface Post {
  id: string,
  title: string,
  content: string 
}

export type ContainerState = PostState;