export interface MenuNode {
  name: string;
  children?: MenuNode[];
}

export class AutoSearch {
  name: string;
  children?: AutoSearch[] | string[];
}
