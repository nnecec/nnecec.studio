type PostBase = {
  date?: string;
  description?: string;
  excerpt?: string;
  headings?: Heading[];
  marp?: boolean;
  next?: PostPreview;
  prev?: PostPreview;
  slug?: string;
  status?: number;
  summary?: string;
  tags?: string[];
  title?: string;
};

export type PostPreview = PostBase & {
  summary: string;
};

export type Post = PostBase & {
  content: string;
  originContent: string;
};

export type Heading = { id: string; level: number; title: string };
