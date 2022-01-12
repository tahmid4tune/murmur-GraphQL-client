export interface PostAuthor {
  id: number;
  name: string;
}

interface PaginationOptions {
  total: number;
  currentPage: number;
  perPage: number;
}

export interface User {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  likedBy: User;
}
export interface Post {
  id: number;
  text: string;
  author: PostAuthor;
  createdAt: Date;
  likes: Like[];
}

export interface PostState extends PaginationOptions {
  postList: Post[];
  editModePosts: number[];
}
export interface UserWithFollowRecord extends User {
  isFollowing: boolean;
}

export interface UserState {
  followingUserList: User[];
  followedByUserList: User[];
  currentPostPage: number;
  currentUsersPage: number;
  totalPostsByUser: number;
  currentFollowedByUserPage: number;
  currentFollowingUserPage: number;
  perPage: number;
  postList: Post[];
  userList: UserWithFollowRecord[];
  totalUsers: number;
}

export interface FollowState {
  followedByCount: number;
  followingCount: number;
  currentFollowsPage: number;
  currentFollowedByPage: number;
  perPage: number;
  followingUserList: User[];
}