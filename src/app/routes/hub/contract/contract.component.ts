import { Component, OnInit } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

export interface ContractAmount {
  original: number;
  changed?: number;
  current: number;
}

export interface Contract {
  key: string; // 唯一識別
  client: string; // 業主
  contractName: string; // 合約名稱
  contractCode?: string; // 合約案號識別碼
  feeCode?: string; // 合約費用識別碼
  amount: ContractAmount; // 合約金額
  // ...其他欄位
  // 若需支援樹狀結構，可加 children?: Contract[]
  children?: Contract[];
  parent?: Contract;
}

@Component({
  selector: 'hub-contract',
  imports: [NzTableModule, NzDropDownModule, NzIconModule, NzInputModule, FormsModule, CdkDropList, CdkDrag],
  template: `
    <nz-table #contractTable [nzData]="filteredData" nzTableLayout="fixed">
      <thead>
        <tr>
          <th>序號</th>
          <th>業主</th>
          <th>合約名稱</th>
          <th>合約案號識別碼</th>
          <th>合約費用識別碼</th>
          <th>
            合約金額
            <div style="font-size: 12px;"> <span>原始</span> / <span>變更</span> / <span>現行</span> </div>
          </th>
        </tr>
      </thead>
      <tbody cdkDropList (cdkDropListDropped)="drop($event)">
        @for (data, idx of contractTable.data; track data) {
          @for (item of mapOfExpandedData[data.key]; track item) {
            @if ((item.parent && item.parent.expand) || !item.parent) {
              <tr cdkDrag>
                <td>{{ idx + 1 }}</td>
                <td>
                  <div *ngIf="editKey !== item.key; else editClient" (click)="startEdit(item.key, 'client')">
                    {{ item.client }}
                  </div>
                  <ng-template #editClient>
                    <input nz-input [(ngModel)]="item.client" (blur)="stopEdit()" />
                  </ng-template>
                </td>
                <td>
                  <div *ngIf="editKey !== item.key; else editName" (click)="startEdit(item.key, 'contractName')">
                    {{ item.contractName }}
                  </div>
                  <ng-template #editName>
                    <input nz-input [(ngModel)]="item.contractName" (blur)="stopEdit()" />
                  </ng-template>
                </td>
                <td>
                  <div *ngIf="editKey !== item.key; else editCode" (click)="startEdit(item.key, 'contractCode')">
                    {{ item.contractCode || '-' }}
                  </div>
                  <ng-template #editCode>
                    <input nz-input [(ngModel)]="item.contractCode" (blur)="stopEdit()" />
                  </ng-template>
                </td>
                <td>
                  <div *ngIf="editKey !== item.key; else editFee" (click)="startEdit(item.key, 'feeCode')">
                    {{ item.feeCode || '-' }}
                  </div>
                  <ng-template #editFee>
                    <input nz-input [(ngModel)]="item.feeCode" (blur)="stopEdit()" />
                  </ng-template>
                </td>
                <td>
                  <ng-container *ngIf="editKey !== item.key; else editAmount">
                    <span>{{ item.amount.original | number: '1.0-0' }}</span> / <span>{{ item.amount.changed || '-' }}</span> /
                    <span>{{ item.amount.current | number: '1.0-0' }}</span>
                  </ng-container>
                  <ng-template #editAmount>
                    <input nz-input type="number" style="width: 60px;" [(ngModel)]="item.amount.original" (blur)="stopEdit()" /> /
                    <input nz-input type="number" style="width: 60px;" [(ngModel)]="item.amount.changed" (blur)="stopEdit()" /> /
                    <input nz-input type="number" style="width: 60px;" [(ngModel)]="item.amount.current" (blur)="stopEdit()" />
                  </ng-template>
                </td>
              </tr>
            }
          }
        }
      </tbody>
    </nz-table>
    <nz-dropdown-menu #nameMenu="nzDropdownMenu">
      <div class="ant-table-filter-dropdown">
        <div class="search-box">
          <input type="text" nz-input placeholder="Search name" [(ngModel)]="nameSearchValue" />
          <button nz-button nzSize="small" nzType="primary" (click)="searchName()" class="search-button">Search</button>
          <button nz-button nzSize="small" (click)="resetName()">Reset</button>
        </div>
      </div>
    </nz-dropdown-menu>
    <nz-dropdown-menu #ageMenu="nzDropdownMenu">
      <div class="ant-table-filter-dropdown">
        <div class="search-box">
          <input type="text" nz-input placeholder="Search age" [(ngModel)]="ageSearchValue" />
          <button nz-button nzSize="small" nzType="primary" (click)="searchAge()" class="search-button">Search</button>
          <button nz-button nzSize="small" (click)="resetAge()">Reset</button>
        </div>
      </div>
    </nz-dropdown-menu>
    <nz-dropdown-menu #addressMenu="nzDropdownMenu">
      <div class="ant-table-filter-dropdown">
        <div class="search-box">
          <input type="text" nz-input placeholder="Search address" [(ngModel)]="addressSearchValue" />
          <button nz-button nzSize="small" nzType="primary" (click)="searchAddress()" class="search-button">Search</button>
          <button nz-button nzSize="small" (click)="resetAddress()">Reset</button>
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  styles: [
    `
      .search-box {
        padding: 8px;
      }
      .search-box input {
        width: 188px;
        margin-bottom: 8px;
        display: block;
      }
      .search-box button {
        width: 90px;
      }
      .search-button {
        margin-right: 8px;
      }
      ::ng-deep .cdk-drag-preview {
        display: table;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      ::ng-deep .cdk-drag-placeholder {
        opacity: 0;
      }
    `
  ]
})
export class HubContractComponent implements OnInit {
  editKey: string | null = null;
  editField: string | null = null;

  // 新資料結構範例
  listOfMapData: Contract[] = [
    {
      key: '1',
      client: '台灣電力公司',
      contractName: '台電南部電廠維護合約',
      contractCode: 'A-001',
      feeCode: 'F-001',
      amount: { original: 1000000, changed: 1200000, current: 1200000 },
      children: [
        {
          key: '1-1',
          client: '台灣電力公司',
          contractName: '台電南部電廠子合約',
          contractCode: 'A-001-1',
          feeCode: 'F-001-1',
          amount: { original: 200000, changed: 250000, current: 250000 }
        }
      ]
    },
    {
      key: '2',
      client: '台灣自來水公司',
      contractName: '自來水管線維護合約',
      contractCode: 'B-001',
      feeCode: 'F-002',
      amount: { original: 800000, current: 800000 }
    }
  ];
  mapOfExpandedData: { [key: string]: Contract[] } = {};

  // 各欄位 filter 狀態
  nameSearchValue = '';
  nameFilterVisible = false;
  ageSearchValue = '';
  ageFilterVisible = false;
  addressSearchValue = '';
  addressFilterVisible = false;

  // 多欄位同時篩選
  get filteredData(): Contract[] {
    return this.listOfMapData.filter(item => this.treeNodeMatchAll(item));
  }

  treeNodeMatchAll(node: Contract): boolean {
    // name
    const nameMatch = !this.nameSearchValue || this.treeNodeMatch(node, 'client', this.nameSearchValue);
    // age
    const ageMatch = !this.ageSearchValue || this.treeNodeMatch(node, 'contractName', this.ageSearchValue);
    // address
    const addressMatch = !this.addressSearchValue || this.treeNodeMatch(node, 'contractCode', this.addressSearchValue);
    return nameMatch && ageMatch && addressMatch;
  }

  treeNodeMatch(node: Contract, field: 'client' | 'contractName' | 'contractCode', search: string): boolean {
    const value = node[field] ? String(node[field]) : '';
    if (value.includes(search)) return true;
    if (node.children) {
      return node.children.some(child => this.treeNodeMatch(child, field, search));
    }
    return false;
  }

  // 搜尋與重設
  searchName(): void {
    this.nameFilterVisible = false;
  }
  resetName(): void {
    this.nameSearchValue = '';
    this.searchName();
  }
  searchAge(): void {
    this.ageFilterVisible = false;
  }
  resetAge(): void {
    this.ageSearchValue = '';
    this.searchAge();
  }
  searchAddress(): void {
    this.addressFilterVisible = false;
  }
  resetAddress(): void {
    this.addressSearchValue = '';
    this.searchAddress();
  }

  collapse(array: Contract[], data: Contract, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: Contract): Contract[] {
    const stack: Contract[] = [];
    const array: Contract[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: Contract, hashMap: { [key: string]: boolean }, array: Contract[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  // 新增拖曳排序方法
  drop(event: CdkDragDrop<Contract[]>) {
    moveItemInArray(this.filteredData, event.previousIndex, event.currentIndex);
  }

  startEdit(key: string, field: string): void {
    this.editKey = key;
    this.editField = field;
  }
  stopEdit(): void {
    this.editKey = null;
    this.editField = null;
  }

  ngOnInit(): void {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
  }
}
