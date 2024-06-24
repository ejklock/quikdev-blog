export type User{
  id?: number;
  name?: string;
  email?: string;
  created_at?: Date;
}

export type Post = {
  id?: number;
  title: string;
  description?: string;
  user?: User;
  created_at?: Date;
};
