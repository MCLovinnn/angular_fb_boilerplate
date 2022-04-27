import { Injectable, EventEmitter } from '@angular/core';
import { IFormular, IRecepy, IRecepyList, IRecepyForm, IComment, IRecepyListForm, ICommentForm } from '../formular';
import _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class FormularService {
  forms: IFormular[] = [];
  formChange: EventEmitter<IFormular[]> = new EventEmitter();
  selectedList: string;
  obj: any;
  activeRecepyListChange: EventEmitter<string> = new EventEmitter();
  recepyChange: EventEmitter<IRecepy[]> = new EventEmitter();
  recepies: IRecepy[] = [];
  selectedRecepy: number;
  constructor() {
    this.formChange.subscribe((form: IFormular[]) => {
      this.forms = form;
    });
  }

  add(formular: IFormular) {
    const newForms = this.forms;
    newForms.push(formular);
    // console.log(newForms);
    this.formChange.emit(newForms);
  }

  get(){
    return this.formChange;
  }

  update(entry: IFormular) {
    const newForms = this.forms;
    _.merge(newForms,[entry]);
    this.formChange.emit(newForms);
    // console.log(newForms);
  }

  delete(entry: IFormular) {
    const newForms = this.forms;
    let index = newForms.indexOf(entry);

    if (index >= 0) {
      newForms.splice(index,1);
      this.formChange.emit(newForms);
    }
  }

  getRecepy(id: string): IRecepy[] {
    return this.recepies.filter((value: IRecepy, index) => {
      return value.id === id;
    });
  }

  selectRecepy(id: number) {
    this.selectedRecepy = id;
  }

  getSelectedRecepy() {
    console.log(this.selectedRecepy);

    if(this.selectedRecepy >= 0) {
      return this.recepies[this.selectedRecepy];
    }
  }

  addRecepy(obj: IRecepy) {
    let data;
    if(obj.id) {
      console.log(obj);

      data = this.getRecepy(obj.id)[0];

    }
    if(this.selectedRecepy >= 0) {
      data = this.getSelectedRecepy();
      this.selectedRecepy = null;
    }
    if(data) {
      _.merge(data, obj);
    } else {
      this.recepies.push(obj);
    }

    this.recepyChange.emit(this.recepies);
  }

  setActualList(obj?: IRecepyList) {
    if (obj) {
      this.selectedList = obj.id;
    } else {
    this.selectedList = '';
    }

    this.activeRecepyListChange.emit(this.selectedList);
  }

  getActualRecepyListChange() {
    return this.activeRecepyListChange;
  }

  getRecepyListChange() {
    return this.recepyChange;
  }

  getActualRecepyList() {
    return this.selectedList;
  }

  getComments(recepy: IRecepyForm): IComment[] {
    let data;
    if (recepy.home_recepy_id) {
      data = this.getRecepy(recepy.home_recepy_id)[0];
    }
    return data? data.comments || [] : [];
  }

  recepyToObject(recepy: IRecepyForm): IRecepy {
    return {
      name: recepy.home_recepy_name,
      description: recepy.home_recepy_description,
      image: recepy.home_recepy_image,
      position: recepy.home_recepy_position,
      ingredients: recepy.home_recepy_ingredients,
      comments: this.getComments(recepy)
    }
  }

  recepyToForm(recepy: IRecepy): IRecepyForm {
    return {
      home_recepy_id: recepy.id,
      home_recepy_description: recepy.description,
      home_recepy_image: recepy.image,
      home_recepy_ingredients: recepy.ingredients,
      home_recepy_name: recepy.name,
      home_recepy_position: recepy.position
    }
  }

  listToObject(list: IRecepyListForm): IRecepyList {
    return {
      name: list.home_recepylist_name,
      description: list.home_recepylist_description,
      recepies: list.home_recepylist_recepies,
      id: list.home_recepylist_id
    }
  }

  listToForm(list: IRecepyList): IRecepyListForm {
    return {
      home_recepylist_id: list.id,
      home_recepylist_name: list.name,
      home_recepylist_description: list.description,
      home_recepylist_recepies: list.recepies
    }
  }

  commentToForm(comment: IComment): ICommentForm {
    return {
      home_recepy_commentText: comment.comment,
      home_recepy_commentFor: comment.commentFor,
      home_recepy_commentKat: comment.commentKat,
      home_recepy_commentId: comment.id,
      home_recepy_commentUser: comment.user
    }
  }

  commentToObject(comment: ICommentForm): IComment {
    return {
      comment: comment.home_recepy_commentText,
      commentFor: comment.home_recepy_commentFor,
      commentKat: comment.home_recepy_commentKat,
      id: comment.home_recepy_commentId,
      user: comment.home_recepy_commentUser
    }
  }
}
