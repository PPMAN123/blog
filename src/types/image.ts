import { IGatsbyImageData } from 'gatsby-plugin-image';
import {
  FileNode,
  IGatsbyImageDataParent,
} from 'gatsby-plugin-image/dist/src/components/hooks';

export type BaseImage = {
  url: string;
};

export type SanityImage = {
  asset: BaseImage & ImageDataLike;
};

export type ImageDataLike =
  | FileNode
  | IGatsbyImageDataParent
  | IGatsbyImageData;
