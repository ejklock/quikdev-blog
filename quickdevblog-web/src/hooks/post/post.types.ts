export type User = {
  id?: number;
  name?: string;
  email?: string;
  created_at?: Date;
};

export type Post = {
  id?: number;
  title: string;
  userId?: number;
  likedByUser?: boolean;
  dislikedByUser?: boolean;
  viewsCount?: number;
  likesCount?: number;
  dislikesCount?: number;
  description?: string;
  user?: User;
  created_at?: Date;
};

export type PostFormCreate = {
  title: string;
  description: string;
  image: File;
};
