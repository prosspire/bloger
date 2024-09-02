export interface CheckBlogStausResponse {
  success: boolean;
  statusCode: number;
  data?: unknown;
  errors?: unknown;
}

export interface BlogsCommentsByBlogIdResponse {
  message: string;
  data: BlogComment[];
  meta: Meta;
}

export interface SingleBlogComment {
  id: string;
  content: string;
  userId: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogComment extends SingleBlogComment {
  user: {
    id: string;
    name: string;
    image: string;
  };
}

export interface BlogsByAuthorResponse {
  message: string;
  data: Blog[];
  meta: Meta;
}

export interface SingleBlog {
  id: string;
  slug: string;
  title: string;
  content?: string;
  contentJson?: string;
  isPublished: boolean;
  previewImage: string | null;
  userId: string;
  reactionsId: string;
  _count?: {
    blogComments?: number;
    blogBookmarks?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog extends SingleBlog {
  user: User;
  reactions: Reactions | null;
  userBlogReaction: UserBlogReaction[];
}

export interface PublishedBlog extends SingleBlog {
  user: User;
  reactions: Reactions | null;
  userBlogReaction?: UserBlogReaction[];
}

export interface UserBlogReaction {
  reaction: string;
  userId: string;
  blogId: string;
}
export interface User {
  id: string;
  name: string;
  image: string;
  shortLink: string;
}

export interface Reactions {
  heart: number;
  thumbsUp: number;
  thumbsDown: number;
}

export interface Meta {
  currentPage: number;
  previousPage?: number | null;
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BookmarkBlog {
  id: string;
  userId: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
  blog: Blog;
}
export interface BookmarkBlogResponse {
  message: string;
  data: BookmarkBlog[];
  meta: Meta;
}
