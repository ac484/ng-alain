import { Component, OnInit } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

export interface TreeNodeInterface {
  key: string;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

@Component({
  selector: 'nz-demo-table-expand-children',
  imports: [NzTableModule, NzDropDownModule, NzIconModule, NzInputModule, FormsModule, CdkDropList, CdkDrag],
  template: `
    <nz-table #expandTable [nzData]="filteredData" nzTableLayout="fixed">
      <thead>
        <tr>
          <th nzCustomFilter>
            Name
            <nz-filter-trigger [(nzVisible)]="nameFilterVisible" [nzActive]="nameSearchValue.length > 0" [nzDropdownMenu]="nameMenu">
              <nz-icon nzType="search" />
            </nz-filter-trigger>
          </th>
          <th nzCustomFilter>
            Age
            <nz-filter-trigger [(nzVisible)]="ageFilterVisible" [nzActive]="ageSearchValue.length > 0" [nzDropdownMenu]="ageMenu">
              <nz-icon nzType="search" />
            </nz-filter-trigger>
          </th>
          <th nzCustomFilter>
            Address
            <nz-filter-trigger
              [(nzVisible)]="addressFilterVisible"
              [nzActive]="addressSearchValue.length > 0"
              [nzDropdownMenu]="addressMenu"
            >
              <nz-icon nzType="search" />
            </nz-filter-trigger>
          </th>
        </tr>
      </thead>
      <tbody cdkDropList (cdkDropListDropped)="drop($event)">
        @for (data of expandTable.data; track data) {
          @for (item of mapOfExpandedData[data.key]; track item) {
            @if ((item.parent && item.parent.expand) || !item.parent) {
              <tr cdkDrag>
                <td
                  [nzIndentSize]="item.level! * 20"
                  [nzShowExpand]="!!item.children"
                  [(nzExpand)]="item.expand"
                  (nzExpandChange)="collapse(mapOfExpandedData[data.key], item, $event)"
                >
                  {{ item.name }}
                </td>
                <td>{{ item.age }}</td>
                <td>{{ item.address }}</td>
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
  listOfMapData: TreeNodeInterface[] = [
    {
      key: `1`,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: `1-1`,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park'
        },
        {
          key: `1-2`,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: `1-2-1`,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park'
            }
          ]
        },
        {
          key: `1-3`,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: `1-3-1`,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: `1-3-1-1`,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park'
                },
                {
                  key: `1-3-1-2`,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      key: `2`,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  // 各欄位 filter 狀態
  nameSearchValue = '';
  nameFilterVisible = false;
  ageSearchValue = '';
  ageFilterVisible = false;
  addressSearchValue = '';
  addressFilterVisible = false;

  // 多欄位同時篩選
  get filteredData(): TreeNodeInterface[] {
    return this.listOfMapData.filter(item => this.treeNodeMatchAll(item));
  }

  treeNodeMatchAll(node: TreeNodeInterface): boolean {
    // name
    const nameMatch = !this.nameSearchValue || this.treeNodeMatch(node, 'name', this.nameSearchValue);
    // age
    const ageMatch = !this.ageSearchValue || this.treeNodeMatch(node, 'age', this.ageSearchValue);
    // address
    const addressMatch = !this.addressSearchValue || this.treeNodeMatch(node, 'address', this.addressSearchValue);
    return nameMatch && ageMatch && addressMatch;
  }

  treeNodeMatch(node: TreeNodeInterface, field: 'name' | 'age' | 'address', search: string): boolean {
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

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
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

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
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

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  // 新增拖曳排序方法
  drop(event: CdkDragDrop<TreeNodeInterface[]>) {
    moveItemInArray(this.filteredData, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
  }
}
