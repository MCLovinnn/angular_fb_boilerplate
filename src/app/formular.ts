export interface IFormular {
  home_test_select: string;
  home_test_text: string;
  home_test_date: string;
  home_test_autocomplete: string;
}

export interface IUser {
  name: string;
  email: string;
  id: string;
}

export interface IRecepyForm {
  home_recepy_name: string;
  home_recepy_description: string;
  home_recepy_ingredients: string[];
  home_recepy_image: string;
  home_recepy_position: number;
  home_recepy_id: string;
}

export interface ICommentForm {
  home_recepy_commentText: string;
  home_recepy_commentFor: string;
  home_recepy_commentKat: string;
  home_recepy_commentUser: string;
  home_recepy_commentId: string;
}

export interface IComment {
  user: string;
  comment: string;
  commentFor: string;
  commentKat: string;
  id?: string;
}

export interface IRecepyListForm {
  home_recepylist_name: string;
  home_recepylist_description: string;
  home_recepylist_recepies: string[];
  home_recepylist_id: string;
}

export interface IRecepy {
  name: string;
  description: string;
  ingredients: string[];
  image: string;
  position: number;
  comments?: IComment[];
  id?: string;
}

export interface IRecepyList {
  name: string;
  recepies: string[];
  description: string;
  id?: string;
}
