import type { SanityImage } from './image';

export type AuthorId = String;

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
