type Tunes = { align: { alignment: 'left' | 'center' | 'right' } };

export interface ContentBlockHeader {
  id: string;
  type: 'header';
  data: {
    text: string;
  };
  tunes: Tunes;
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

export interface ContentBlockList {
  id: string;
  type: 'list';
  data: {
    style: 'unordered' | 'ordered';
    items: string[];
  };
  tunes: Tunes;
}

export interface ContentBlock {
  time: number;
  blocks: Array<
    | ContentBlockHeader
    | ContentBlockParagraph
    | ContentBlockImage
    | ContentBlockList
  >;
  version: string;
}
