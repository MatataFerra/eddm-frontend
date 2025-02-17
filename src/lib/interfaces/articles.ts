export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: RootNode[];
  blocks?: RichTextBlock[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  summary?: string;
  cover?: MediaElement;
  header?: MediaElement;
  media?: MediaElement[];
  order: number;
}

export interface RichTextBlock {
  id: number;
  __component: "shared.rich-text";
  body: string;
}

export interface MediaElement {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Formats {
  thumbnail: ImageInfo;
  large: ImageInfo;
  medium: ImageInfo;
  small: ImageInfo;
}

export interface ImageInfo {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface TextInlineNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkInlineNode {
  type: "link";
  url: string;
  children: TextInlineNode[];
}

interface ListItemInlineNode {
  type: "list-item";
  children: DefaultInlineNode[];
}

// Inline node types
type DefaultInlineNode = TextInlineNode | LinkInlineNode;

interface ParagraphBlockNode {
  type: "paragraph";
  children: DefaultInlineNode[];
}

interface QuoteBlockNode {
  type: "quote";
  children: DefaultInlineNode[];
}

interface CodeBlockNode {
  type: "code";
  children: DefaultInlineNode[];
}

interface HeadingBlockNode {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: DefaultInlineNode[];
}

interface ListBlockNode {
  type: "list";
  format: "ordered" | "unordered";
  children: (ListItemInlineNode | ListBlockNode)[];
}

interface ImageBlockNode {
  type: "image";
  image: {
    name: string;
    alternativeText?: string | null;
    url: string;
    caption?: string | null;
    width: number;
    height: number;
    formats?: Record<string, unknown>;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    previewUrl?: string | null;
    provider: string;
    provider_metadata?: unknown | null;
    createdAt: string;
    updatedAt: string;
  };
  children: [{ type: "text"; text: "" }];
}

// Block node types
export type RootNode =
  | ParagraphBlockNode
  | QuoteBlockNode
  | CodeBlockNode
  | HeadingBlockNode
  | ListBlockNode
  | ImageBlockNode;
