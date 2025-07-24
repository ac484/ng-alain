/**
 * 樹狀面板（次世代智能分割佈局）
 * 採用 OnPush 策略優化效能，支援響應式資料流
 */
import { CommonModule, LowerCasePipe } from '@angular/common';
import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDropDownModule, NzDropdownMenuComponent, NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTreeModule, NzTreeNode, NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { Observable, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { map, takeUntil, shareReplay, debounceTime } from 'rxjs/operators';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { FirebaseCrudComponent } from '../firebase-crud/firebase-crud.component';
import { FirebaseCrudService } from '../firebase-crud/firebase-crud.service';
import { SpaceNode } from '../models/models';

@Component({
  selector: 'app-tree-panel',
  standalone: true,
  imports: [
    CommonModule, // 確保已引入 CommonModule
    FormsModule,
    NzTreeModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
    LowerCasePipe,
    FirebaseCrudComponent,
    NzSplitterModule,
    NzDescriptionsModule,
    NzTagModule,
    NzButtonModule,
    NzListModule,
    NzEmptyModule,
    NzLayoutModule // 新增
  ],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreePanelComponent implements OnInit, OnDestroy, AfterViewInit {
  // 現有屬性保持不變
  searchValue = '';
  activatedNode?: NzTreeNode;
  public contextNode: NzTreeNode | null = null;

  // 新增效能優化屬性
  private destroy$ = new Subject<void>();
  private selectedNodeSubject = new BehaviorSubject<SpaceNode | null>(null);
  private searchSubject = new BehaviorSubject<string>('');

  // Splitter 配置屬性
  readonly leftPanelSize = 70;
  readonly minLeftPanelSize = 200;
  readonly maxLeftPanelSize = 600;
  readonly upperPanelSize = 60;
  readonly minUpperPanelSize = 200;
  readonly resizerStyle = { background: 'rgba(0, 0, 0, 0.06)' };
  readonly verticalResizerStyle = { background: 'rgba(0, 0, 0, 0.04)' };

  leftPanelCollapsed = false;

  // 響應式資料流
  selectedNodeForDetail$ = this.selectedNodeSubject.asObservable();

  treeData$: Observable<NzTreeNodeOptions[]> = combineLatest([
    this.crudService.getNodes(),
    this.searchSubject.asObservable().pipe(debounceTime(300))
  ]).pipe(
    map(([nodes, searchTerm]) => {
      const tree = buildTree(nodes);
      return searchTerm ? this.filterTree(tree, searchTerm) : tree;
    }),
    takeUntil(this.destroy$),
    shareReplay(1)
  );

  @ViewChild(FirebaseCrudComponent) crud!: FirebaseCrudComponent;
  @ViewChild('rootMenu', { static: false }) rootMenu?: NzDropdownMenuComponent;

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private crudService: FirebaseCrudService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 初始化搜尋值
    this.searchSubject.next(this.searchValue);
  }

  ngAfterViewInit(): void {
    // 確保 ViewChild 已初始化
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.selectedNodeSubject.complete();
    this.searchSubject.complete();
  }

  // 搜尋功能增強
  onSearchChange(value: string): void {
    this.searchValue = value;
    this.searchSubject.next(value);
  }

  private filterTree(nodes: NzTreeNodeOptions[], searchTerm: string): NzTreeNodeOptions[] {
    if (!searchTerm.trim()) return nodes;

    return nodes
      .filter(node => this.matchesSearch(node, searchTerm))
      .map(node => ({
        ...node,
        children: node.children ? this.filterTree(node.children, searchTerm) : []
      }));
  }

  private matchesSearch(node: NzTreeNodeOptions, searchTerm: string): boolean {
    const matches = node.title.toLowerCase().includes(searchTerm.toLowerCase());
    const hasMatchingChildren = node.children?.some(child => this.matchesSearch(child, searchTerm));
    return matches || !!hasMatchingChildren;
  }

  // 現有方法增強
  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node!;
    const nodeData = data.node?.origin as SpaceNode;
    this.selectedNodeSubject.next(nodeData);
    this.cdr.markForCheck();
  }

  // 面板控制方法
  onLeftPanelCollapse(collapsed: boolean): void {
    this.leftPanelCollapsed = collapsed;
    this.cdr.markForCheck();
  }

  // 新增事件處理方法
  onEditNodeRequested(node: SpaceNode): void {
    this.crud.showEditModal(node);
  }

  onAddChildRequested(parentNode: SpaceNode): void {
    this.crud.showAddModal(parentNode.key);
  }

  onAddTaskRequested(parentNode: SpaceNode): void {
    this.addTaskToNode(parentNode);
  }

  onTaskUpdated(task: SpaceNode): void {
    // 任務更新處理
    this.cdr.markForCheck();
  }

  onAddTaskFromList(parentNodeId: string): void {
    // 從任務列表新增任務
    this.cdr.markForCheck();
  }

  private addTaskToNode(parentNode: SpaceNode): void {
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
      parentKey: parentNode.key,
      createdAt: now,
      updatedAt: now
    };

    this.crudService
      .addNode(newTask)
      .then(() => {
        // Firebase 會自動觸發資料更新
      })
      .catch(error => {
        console.error('新增任務失敗:', error);
      });
  }

  // 保持所有現有方法不變
  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) node.isExpanded = !node.isExpanded;
    }
  }

  onDrop(event: NzFormatEmitEvent): void {
    const dragNode = event.dragNode;
    const node = event.node;
    if (!dragNode || !node) return;

    const parentKey = node.key;
    const order = 0;

    this.crudService
      .updateNode(dragNode.key, { parentKey, order })
      .then(() => {
        // Firestore 資料變動，UI 會自動同步
      })
      .catch(error => {
        console.error('拖曳更新失敗:', error);
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
    const parentNode = this.contextNode.origin as SpaceNode;
    this.addTaskToNode(parentNode);
  }

  selectDropdown(action: string): void {
    alert(action);
  }

  // 新增模板所需的工具方法
  getNodeIcon(node: SpaceNode): string {
    if (node.isTask) return 'check-circle';
    return node.type === 'root' ? 'cluster' : node.type === 'branch' ? 'folder' : 'file';
  }

  getTypeColor(type: string): string {
    // 直接使用 ng-zorro-antd 主題色
    switch (type) {
      case 'root':
        return 'purple';
      case 'trunk':
        return 'geekblue';
      case 'branch':
        return 'green';
      case 'leaf':
        return 'orange';
      default:
        return 'default';
    }
  }

  getTypeLabel(type: string): string {
    const labels = {
      root: '根節點',
      trunk: '主幹',
      branch: '分支',
      leaf: '葉子節點'
    };
    return labels[type as keyof typeof labels] || type;
  }

  getStatusColor(status?: string): string {
    if (!status) return 'default';
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'archived':
        return 'warning';
      default:
        return 'default';
    }
  }

  getRelatedTasks(nodeId: string | undefined): SpaceNode[] {
    if (!nodeId) return [];
    // 這裡應該從 treeData$ 中過濾出相關任務
    return [];
  }

  getTaskStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'in-progress':
        return 'processing';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  }

  getTaskStatusLabel(status: string): string {
    const labels = {
      pending: '待辦',
      'in-progress': '進行中',
      completed: '已完成',
      cancelled: '已取消'
    };
    return labels[status as keyof typeof labels] || status;
  }
}

// buildTree 函數保持不變但增加型別安全性
function buildTree(nodes: SpaceNode[]): NzTreeNodeOptions[] {
  const nodeMap = new Map<string, NzTreeNodeOptions & { children: NzTreeNodeOptions[] }>();
  const roots: NzTreeNodeOptions[] = [];

  // 建立節點映射
  nodes.forEach(node => {
    nodeMap.set(node.key, {
      ...node,
      children: [],
      isLeaf: node.type === 'leaf' || node.isTask || false,
      expanded: false,
      selected: false
    });
  });

  // 建立樹狀結構
  nodeMap.forEach(node => {
    const parentKey = node['parentKey'] as string;
    if (parentKey && nodeMap.has(parentKey)) {
      nodeMap.get(parentKey)!.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}
