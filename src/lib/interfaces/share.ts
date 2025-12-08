export type ContentBySlug<T extends object> = { md_content: string } & T;

export type ArticleReadStatus = "read" | "reading" | "unread";
export type ArticleStatusMap = Record<string, ArticleReadStatus>;

export type LocalStorageConfig = {
  version: number;
  bookmarked: string[];
  "articles-read-status": ArticleStatusMap;
};

export type LocalStorageConfigUpdateFunction = <K extends keyof LocalStorageConfig>(
  field: K,
  newValue: LocalStorageConfig[K]
) => void;

export type Category = {
  type: "category";
  name:
    | (
        | "context"
        | "enero"
        | "febrero"
        | "febrero-25"
        | "marzo"
        | "abril"
        | "mayo"
        | "junio"
        | "julio"
        | "agosto"
        | "septiembre"
        | "octubre"
        | "noviembre"
        | "diciembre"
      )
    | "tale";
};

export type Phrase = {
  type: "phrase";
  text: string;
};

export type EntriesOrderByCategory = Category | Phrase;
