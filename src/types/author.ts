export type AuthorId = String;

export type Author = {
  id: AuthorId;
  name: string;
  slug: {
    current: string;
  };
};

export type Authors = Array<Author>;
