import { Injectable } from '@angular/core';
import { CustomerPOItem } from '../pdf/pdf.service';

export interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
  data?: any; // 用於存儲額外數據
}

@Injectable({
  providedIn: 'root'
})
export class TreeConverterService {
  /**
   * 將Customer PO項目轉換為樹狀結構
   */
  convertCustomerPOToTree(customerPOItems: CustomerPOItem[]): TreeNode[] {
    const treeData: TreeNode[] = [];
    let keyCounter = 0;

    customerPOItems.forEach((item, index) => {
      const children: TreeNode[] = [];

      // 提取識別碼（如果存在）
      let identifier = '';
      const identifierMatch = item.customerPO.match(/^([A-Z0-9]+)\(/);
      if (identifierMatch) {
        identifier = identifierMatch[1];
      }

      // 添加內容節點（作為主要顯示內容）
      if (item.content) {
        children.push({
          title: item.content,
          key: `content-${keyCounter++}`,
          isLeaf: true,
          data: { type: 'content', value: item.content }
        });
      }

      // 添加Cost Ref節點（如果存在）
      if (item.costRef) {
        children.push({
          title: `Cost Ref: ${item.costRef}`,
          key: `costref-${keyCounter++}`,
          isLeaf: true,
          data: { type: 'costRef', value: item.costRef }
        });
      }

      // 創建Customer PO主節點
      let customerPOTitle = '';

      // 如果有識別碼，使用識別碼作為節點標題的一部分
      if (identifier) {
        customerPOTitle = `${index + 1}. ${identifier} (Customer PO)`;
      } else {
        // 否則使用原始Customer PO行
        customerPOTitle = `${index + 1}. ${item.customerPO.includes('Customer PO:') ? item.customerPO : `Customer PO: ${item.customerPO}`}`;
      }

      const node: TreeNode = {
        title: customerPOTitle,
        key: `customerpo-${keyCounter++}`,
        children: children,
        isLeaf: children.length === 0,
        data: {
          type: 'customerPO',
          customerPO: item.customerPO,
          content: item.content,
          costRef: item.costRef,
          identifier: identifier || undefined
        }
      };

      treeData.push(node);
    });

    return treeData;
  }

  /**
   * 將文字行轉換為樹狀結構（原有方法，保持向後兼容）
   */
  convertToTree(textLines: string[], maxNodes: number = 100): TreeNode[] {
    const treeData: TreeNode[] = [];
    let keyCounter = 0;

    const validLines = textLines.filter(line => line.trim()).slice(0, maxNodes);

    validLines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      const node: TreeNode = {
        title: this.truncateTitle(trimmedLine),
        key: `node-${keyCounter++}`,
        isLeaf: true
      };
      treeData.push(node);
    });

    return treeData;
  }

  /**
   * 截斷過長的標題
   */
  private truncateTitle(title: string, maxLength: number = 50): string {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  }

  /**
   * 獲取所有節點的 key
   */
  getAllKeys(nodes: TreeNode[]): string[] {
    const keys: string[] = [];
    nodes.forEach(node => {
      keys.push(node.key);
      if (node.children) {
        keys.push(...this.getAllKeys(node.children));
      }
    });
    return keys;
  }

  /**
   * 計算總節點數量
   */
  countNodes(nodes: TreeNode[]): number {
    let count = 0;
    nodes.forEach(node => {
      count++;
      if (node.children) {
        count += this.countNodes(node.children);
      }
    });
    return count;
  }
}
