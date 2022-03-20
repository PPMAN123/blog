import { ContentWidthRules } from '../components/StyledBlocks/Section';

export type SanityDataContent = object;

export type DefaultRendererParams = {
  rows: Array<CodeBlockNode>;
  stylesheet: any;
  useInlineStyles: any;
};

export type CodeBlockNode = {
  type: string;
  tagName: string;
  properties: {
    className: Array<string>;
  };
  children: Array<CodeBlockNode>;
};

export type PortableTextType = {
  className: string;
  content: SanityDataContent;
  serializers: Serializer;
};

export type Serializer = {
  types: {
    blockQuote: BlockQuoteSerializer;
    section: SectionSerializer;
    codeBlock: CodeBlockSerializer;
    reference: ReferenceSerializer;
  };
  marks: {
    centerAlign: TextWrapperSerializer;
    rightAlign: TextWrapperSerializer;
    normal: TextWrapperSerializer;
  };
};

export type BlockQuote = {
  node: {
    message: string;
    authorName: string;
  };
};

export type Section = {
  node: {
    leftContent: [SanityDataContent];
    rightContent: [SanityDataContent];
    type: ContentWidthRules;
  };
};

export type CodeBlock = {
  node: {
    code: string;
    language: string;
    title: string;
  };
};

export type SanityPolls = {
  nodes: Array<SanityPoll>;
};

export type SanityPoll = {
  votes: {
    votes: Array<number>;
  };
  _id: string;
  options: Array<string>;
  title: string;
};

export type Reference = {
  node: {
    _ref: string;
  };
};

export type BlockQuoteSerializer = (object: BlockQuote) => JSX.Element;

export type SectionSerializer = (object: Section) => JSX.Element;

export type CodeBlockSerializer = (Object: CodeBlock) => JSX.Element;

export type TextWrapperSerializer = (object: {
  children: JSX.Element;
}) => JSX.Element;

export type ReferenceSerializer = (Object: Reference) => JSX.Element;
