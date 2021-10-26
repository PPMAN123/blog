import type { SanityImage } from './image';

export type AuthorId = string;

export type Author = {
  id: AuthorId;
  name: string;
  image: SanityImage;
  slug: {
    current: string;
  };
  bio: Array<{ children: Array<{ text: string }> }>;
};

export type Authors = Array<Author>;
