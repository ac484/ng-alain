import { Injectable } from '@angular/core';

export interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TreeConverterService {
  /**
   * 將文字行轉換為樹狀結構
   */
  convertToTree(textLines: string[], maxNodes: number = 100): TreeNode[] {
    const treeData: TreeNode[] = [];
    let keyCounter = 0;

    // 過濾空行並限制節點數量
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
