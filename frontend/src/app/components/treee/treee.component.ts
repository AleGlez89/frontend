import { Posts } from './../../clases/post';
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';
import { DataApiService } from '../../services/data-api.service';

/** File node data with possible child nodes. */
export interface FileNode {
  name: string;
  type: string;
  src: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  src: string;
  expandable: boolean;
}

@Component({
  selector: 'app-treee',
  templateUrl: './treee.component.html',
  styleUrls: ['./treee.component.css']
})
export class TreeeComponent {

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  controlTree: boolean;
  treeNew;
  treeSave;
  temp;
  page: string;
  selectedNode: boolean;
  pdfSrc;
  nodeName: string;
  nodeType: string;

  directorio: string;
  nombre: string;
  type: string;
  papa: string;

  objData = new Posts();


  @Output() messageEvent = new EventEmitter<string>();
  @ViewChild('tree') tree;

  constructor(private dataApi: DataApiService) {
     // this.dataApi.getAllTree().subscribe(data => {
     // this.treeSave = data;
     // this.dataSource.data = this.treeSave;
     // console.log(this.treeSave);
     // });

      this.treeFlattener = new MatTreeFlattener(
     this.transformer,
     this.getLevel,
     this.isExpandable,
     this.getChildren);

      this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = files;
  }

// Functions Tree-Material
// ***********************

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      type: node.type,
      src: node.src,
      level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

// Functions for the API
// *********************

  // Add father node or Folder Selected
  gettreeFatherNew(newNode: HTMLInputElement) {
    if (newNode.value && this.nodeType == 'folder') {
      alert('Waiting for the API !!!');

      this.objData.directorio = this.directorio;
      this.objData.nombre = newNode.value;
      this.objData.type = this.nodeType;
      this.objData.papa = this.directorio;

      this.dataApi.getAllTree().subscribe(data => {
          this.treeNew = data;
          this.dataSource.data = this.treeNew;
          this.tree.treeControl.expandAll();
          this.controlTree = true;
      });
      newNode.value = '';
      this.controlTree = true;
      newNode.focus();
      return false;
  }
    if (!newNode.value || this.nodeType == null ) {
      alert(' Not insert node name or not selected node father !!!');
      newNode.value = '';
    }
    if (newNode.value && this.nodeType == 'file') {
      alert('Selected other node, the selected is type file !!!');
      newNode.value = '';
    }
  }
  // Add node for the tree
  gettreeAddNode(newNode, folder, file: HTMLInputElement) {
    if (newNode.value && this.nodeType == 'folder') {
      alert('Waiting for the API !!!');

      this.objData.directorio = this.directorio;
      this.objData.nombre = newNode.value;
      this.objData.type = this.nodeType;
      this.objData.typenew = this.getType(folder, file);
      this.objData.papa = this.directorio;

      this.dataApi.addNodeTree(this.objData).subscribe(data => {
          this.treeNew = data;
          this.dataSource.data = this.treeNew;
          this.tree.treeControl.expandAll();
          this.controlTree = true;
      });
      newNode.value = '';
      file.value = '';
      folder.value = '';
      this.controlTree = true;
      newNode.focus();
      return false;
  }
    if (!newNode.value || this.nodeType == null ) {
      alert(' Not insert node name or not selected node father !!!');
      newNode.value = '';
    }
    if (newNode.value && this.nodeType == 'file') {
      alert('Selected other node, the selected is type file !!!');
      newNode.value = '';
    }
  }
  // Move node for the tree
  gettreeMoveNode(newNode: HTMLInputElement) {
    if (newNode.value && this.nodeType == 'folder') {
      alert('Waiting for the API !!!');

      this.objData.directorio = this.directorio;
      this.objData.nombre = newNode.value;
      this.objData.type = this.nodeType;
      this.objData.papa = this.directorio;

      this.dataApi.moveNodeTree(this.objData).subscribe(data => {
          this.treeNew = data;
          this.dataSource.data = this.treeNew;
          this.tree.treeControl.expandAll();
          this.controlTree = true;
      });
      newNode.value = '';
      this.controlTree = true;
      newNode.focus();
      return false;
  }
    if (!newNode.value || this.nodeType == null ) {
      alert(' Not insert node name or not selected node father !!!');
      newNode.value = '';
    }
    if (newNode.value && this.nodeType == 'file') {
      alert('Selected other node, the selected is type file !!!');
      newNode.value = '';
    }
  }
  // Delete node for the tree
  gettreeDeleteNode() {
    if (this.nodeType) {
      alert('Waiting for the API !!!');

      this.objData.directorio = this.directorio;
      this.objData.type = this.nodeType;
      this.objData.papa = this.directorio;

      this.dataApi.moveNodeTree(this.objData).subscribe(data => {
          this.treeNew = data;
          this.dataSource.data = this.treeNew;
          this.tree.treeControl.expandAll();
          this.controlTree = true;
      });
      this.controlTree = true;
      return false;
  }
    if (this.nodeType == null ) {
      alert('Select Node for Delete !!!');
    }
  }


// Functions Auxiliary
// *******************

 // Get SRC for the ViewPDF and Other Utilies
  getSrc(node, pdfViewer) {
    this.pdfSrc = node.src;
    if (node.type == 'file') {
      // this.pdfSrc = '../../../assets/folder/Information/Document/DELL_Laptop.pdf';
         this.pdfSrc = node.src;
  } else {
    this.directorio = node.src;
    this.pdfSrc = '';
  }
    this.selectedNode = true;
    this.controlTree = true;
    this.nodeName = node.name;
    this.nodeType = node.type;
  }
 // Get type input: radio file and folde
  getType(obj1, obj2: HTMLInputElement) {
  if (obj1.value) {
    return obj1.value;
  } else {
      return obj2.value;
    }
  }
 // Expand or Collapse tree
  openClose() {
    if (this.controlTree) {
      this.tree.treeControl.collapseAll();
      this.controlTree = false;
      this.selectedNode = false;
    } else {
        this.tree.treeControl.expandAll();
        this.controlTree = true;
        this.selectedNode = false;
      }
  }

}
