import { AuthorId } from './author';
import { CategoryId } from './category';

export type FilterId = CategoryId | AuthorId;

export type FilterIds = Array<CategoryId | AuthorId>;
