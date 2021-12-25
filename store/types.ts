// store/type.ts
export interface PostAuthor {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  text: string;
  author: PostAuthor;
}

interface PaginationOptions {
  total: number;
  currentPage: number;
  perPage: number;
}

export interface PostState extends PaginationOptions {
  postList: Post[];
}
