export interface BlogData {
  title: string;
  date: string;
  categories?: Category[] | [];
  id: number;
}

export interface Category {
  id: number;
  numberOfPosts: number;
  name: string;
}
