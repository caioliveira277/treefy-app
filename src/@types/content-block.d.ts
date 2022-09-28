export interface ContentBlockHeader {
  id: string;
  type: 'header';
  data: {
    text: string;
    level: 2 | 3;
  };
}

export interface ContentBlockParagraph {
  id: string;
  type: 'paragraph';
  data: {
    text: string;
  };
}

export interface ContentBlockImage {
  id: string;
  type: 'image';
  data: {
    file: {
      url: string;
      mime: string;
      height: number;
      width: number;
    };
    caption: string;
  };
}

export interface ContentBlockLink {
  id: string;
  type: 'LinkTool';
  data: {
    link: string;
    meta: {
      title: string;
      description: string;
      image?: {
        url?: string;
      };
    };
  };
}

export interface ContentBlockList {
  id: string;
  type: 'list';
  data: {
    style: 'unordered' | 'ordered';
    items: string[];
  };
}

export interface ContentBlock {
  time: number;
  blocks: Array<
    | ContentBlockHeader
    | ContentBlockParagraph
    | ContentBlockLink
    | ContentBlockImage
    | ContentBlockList
  >;
  version: string;
}
