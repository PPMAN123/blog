import { Author } from './author';
import { Category } from './category';
import { SanityImage } from './image';
import { Slug } from './Slug';

export type Posts = Array<Post>;

export type Post = {
  title: string;
  _rawBody: [object];
  publishedAt: string;
  mainImage: SanityImage;
  author: Author;
  slug: Slug;
  _updatedAt: string;
  categories: Array<Category>;
};
