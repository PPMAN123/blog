import { ContentWidthRules } from '../components/StyledBlocks/Section';

export type SanityDataContent = object;

export type PortableTextType = {
  className: string;
  content: SanityDataContent;
  serializers: Serializer;
};

export type Serializer = {
  blockQuote: BlockQuoteSerializer;
  section: SectionSerializer;
  centerAlign: TextWrapperSerializer;
  rightAlign: TextWrapperSerializer;
  normal: TextWrapperSerializer;
};

export type BlockQuote = {
  message: string;
  authorName: string;
};

export type Section = {
  leftContent: [SanityDataContent];
  rightContent: [SanityDataContent];
  type: ContentWidthRules;
};

export type BlockQuoteSerializer = (object: BlockQuote) => JSX.Element;

export type SectionSerializer = (object: Section) => JSX.Element;

export type TextWrapperSerializer = (object: {
  children: JSX.Element;
}) => JSX.Element;
