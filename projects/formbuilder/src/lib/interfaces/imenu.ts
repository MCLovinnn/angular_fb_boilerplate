export interface MenuNode {
  name: string;
  children?: MenuNode[];
}

export interface AutoSearch {
  name: string;
  children?: AutoSearch[] | string[];
}