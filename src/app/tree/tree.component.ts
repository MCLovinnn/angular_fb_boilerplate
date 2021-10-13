import { Component, Input, Injectable, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { ConnectorService } from '../services/connector.service';
import {
  FormService,
  ConfigService,
  TranslationService
} from '../../../projects/formbuilder/src/public-api';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { FieldService } from '../services/field.service';
import { FieldComponent } from '../field/field.component';
/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  name: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  name: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    this.buildFileTree(TREE_DATA, 0);
    // Notify the change.
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.name = key;

      if (value != null) {
        if (typeof value === 'object' && level < 2) {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          if (level === 2) {
            node.name = key;
          } else {
            node.name = value;
          }
        }
      }
      const data = accumulator.concat(node);
      this.dataChange.next(data);
      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.name = name;
    this.dataChange.next(this.data);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-tree',
  templateUrl: 'tree.component.html',
  styleUrls: ['tree.component.scss'],
  providers: [ChecklistDatabase]
})
export class TreeComponent implements OnInit {
  @Input() data: any;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  db: ChecklistDatabase;
  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(
    true /* multiple */
  );

  constructor(
    private _database: ChecklistDatabase,
    private cs: ConnectorService,
    public fs: FormService,
    private configS: ConfigService,
    private ts: TranslationService,
    private fieldS: FieldService
  ) {
    // fs.addConfig({home: {tree: homeTreeConfig}});
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    // this.db = new ChecklistDatabase(configs);
    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });

    // console.log(fs.getForms());
  }

  ngOnInit(){
    this.fs.onConfigChange().subscribe(config => {
      let newData = this.configS.buildFileTree(config, 0) as TodoItemNode[];
    this._database.dataChange.next(newData);

    const langField = this.fs.getFormControl(this.fs.getConfigByName('home_tree_lang'));
    langField.valueChanges.subscribe(val => {
      this.ts.setLang(val);
    });
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!(node.children && node.children.length);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    // console.log(node);

    const parentNode = this.flatNodeMap.get(node);
    // console.log(parentNode);

    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /**
   * TODO: update tree or config triggers confile file update / generation
   */
  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {

    const nestedNode = this.flatNodeMap.get(node);
    const parent = this.getParentNode(this.nestedNodeMap.get(nestedNode));
    const parentparent = this.getParentNode(parent);

    let key = parentparent.name + '_' + parent.name + '_' + itemValue.toLowerCase();

    let tmpConf = {
      [parentparent.name]: {
        [parent.name] : {
          [itemValue.toLowerCase()] : {
            name: key,
            htmlType: 'text'
          }
        }
      }
    };

    this.fs.addConfig(tmpConf);

    this.ts.onDataChange.emit({[key+'#label']: itemValue});

    this._database.updateItem(nestedNode!, key+'#label');
    this.ngOnInit();
  }

  toggleLang() {
    this.cs.toggleLang();
  }

  generateTextFile() {
    this.cs
      .generateTextFile(this.ts.lang, this.fs.getConfigs())
      .subscribe(res => console.log(res));
  }

  updateTxtFile() {
    this.cs
      .updateTxtFile(this.ts.lang, this.ts.data)
      .subscribe(res => console.log(res));
  }

  open(node) {
    let data = this.fs.getConfigByName(node.name);

    console.log(data);

    let field = this.fs.getFieldByName('home_ui_new') as FieldComponent;
    field.placeholder = data.name;
    // data.name = 'home_ui_new';
    field.internalType = data.htmlType;

    field.ngOnInit();
    this.fieldS.set(data.name);
  }

  generateConfig() {
    this.cs.doPost('config', 'de', this.fs.getConfigs()).subscribe( val => console.log(val));
  }
}
