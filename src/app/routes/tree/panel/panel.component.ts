/**
 * 樹狀面板（極簡主義，官方虛擬卷軸 + 搜索 + 拖曳）
 */
import { CommonModule, LowerCasePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule, NzDropdownMenuComponent, NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTreeModule, NzTreeNode, NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FirebaseCrudComponent } from '../firebase-crud/firebase-crud.component';
import { FirebaseCrudService } from '../firebase-crud/firebase-crud.service';
import { SpaceNode } from '../models/models';

@Component({
  selector: 'app-tree-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, NzTreeModule, NzDropDownModule, NzIconModule, NzInputModule, LowerCasePipe, FirebaseCrudComponent],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class TreePanelComponent {
  searchValue = '';
  treeData$: Observable<NzTreeNodeOptions[]>;
  activatedNode?: NzTreeNode;
  @ViewChild(FirebaseCrudComponent) crud!: FirebaseCrudComponent;
  @ViewChild('rootMenu', { static: false }) rootMenu?: NzDropdownMenuComponent;
  public contextNode: NzTreeNode | null = null;

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private crudService: FirebaseCrudService
  ) {
    this.treeData$ = this.crudService.getNodes().pipe(map(nodes => buildTree(nodes)));
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) node.isExpanded = !node.isExpanded;
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node!;
  }

  onDrop(event: NzFormatEmitEvent): void {
    const dragNode = event.dragNode;
    const node = event.node;
    if (!dragNode || !node) return;
    // 拖曳後，dragNode 變成 node 的子節點
    const parentKey = node.key;
    const order = 0; // 可擴展為同層排序
    this.crudService.updateNode(dragNode.key, { parentKey, order }).then(() => {
      // Firestore 資料變動，UI 會自動同步
    });
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, node?: NzTreeNode): void {
    this.contextNode = node ?? null;
    this.nzContextMenuService.create($event, menu);
  }

  onPanelContextMenu($event: MouseEvent): void {
    if (($event.target as HTMLElement).closest('.ant-tree-node')) return;
    $event.preventDefault();
    $event.stopPropagation();
    this.contextNode = null;
    if (this.rootMenu) {
      this.nzContextMenuService.create($event, this.rootMenu);
    }
  }

  addNode(): void {
    this.crud.showAddModal(this.contextNode?.key);
  }
  editNode(): void {
    if (this.contextNode) this.crud.showEditModal(this.contextNode.origin as SpaceNode);
  }
  deleteNode(): void {
    if (this.contextNode) this.crud.deleteNode(this.contextNode.origin as SpaceNode);
  }

  addRootNode(): void {
    this.crud.showAddModal(null);
  }

  public addTask(): void {
    if (!this.contextNode) return;
    const parentKey = this.contextNode.key;
    const now = new Date().toISOString();
    const key = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newTask: SpaceNode = {
      id: key,
      key,
      title: '新任務',
      name: '新任務',
      type: 'leaf',
      isTask: true,
      order: 0,
      parentKey,
      createdAt: now,
      updatedAt: now
    };
    this.crudService.addNode(newTask).then(() => {
      // Firestore 資料變動，UI 會自動同步
    });
  }

  selectDropdown(action: string): void {
    alert(action);
  }
}

function buildTree(nodes: SpaceNode[]): NzTreeNodeOptions[] {
  const nodeMap = new Map<string, NzTreeNodeOptions & { children: NzTreeNodeOptions[] }>();
  const roots: NzTreeNodeOptions[] = [];
  nodes.forEach(node => {
    nodeMap.set(node.key, { ...node, children: [] });
  });
  nodeMap.forEach(node => {
    if (node['parentKey'] && nodeMap.has(node['parentKey'])) {
      nodeMap.get(node['parentKey'])!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}
