import { Injectable } from '@angular/core';
import { DataFlattnerService } from './data-flattner.service';
import { IField } from '../interfaces/ifield';
import { MenuNode } from '../interfaces/imenu';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */

const TREE_DATA: MenuNode[] = [
  {
    name: 'Array1',
    children: [
      {name: 'Element1'},
      {name: 'Element2'},
      {
        name: 'Array',
        children: [
          {name: 'Element1'},
          {name: 'Element1'},
        ]
      },
      {name: 'Element3'},
    ]
  }, {
    name: 'Person',
    children: [
      {
        name: 'Adresse',
        children: [
          {name: 'Strasse & Nr.'},
          {name: 'Ort'},
        ]
      },
      {
        name: 'Name'
      }, {
        name: 'Email'
      },
    ]
  },
];

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  flatControlls: MenuNode[];

  constructor() {
    this.flatControlls = TREE_DATA;
    // console.log(this.flatControlls);
  }

  buildTree(config: IField[], name: string) {
    const children = [];
    // console.log(name);
    config.forEach((value: IField, index, array) => {
      // console.log(value);
      children.push(value.placeholder);
    });
    const tmpData = [
      {
        name: name,
        children: children
      }
    ];
    // DataFlattnerService.flatten(tmpData)
    this.flatControlls = tmpData;
    // console.log('newtree', this.flatControlls);
  }

  getControlls() {
    return this.flatControlls;
  }

  getFlatControlls() {
    return DataFlattnerService.flatten(this.flatControlls);
  }
}
