import { SemanticCOLORS } from 'semantic-ui-react';
import { Slug } from './Slug';

export type CategoryId = String;

export type Category = {
  id: CategoryId;
  title: string;
  colour: SemanticCOLORS;
  slug: Slug;
};

export type Categories = Array<Category>;
