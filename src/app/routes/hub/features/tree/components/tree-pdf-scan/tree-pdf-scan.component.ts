/**
 * 樹狀結構 PDF 掃描元件
 * 
 * 功能：
 * - PDF 文件上傳和掃描
 * - 文件內容解析和結構化
 * - 自動生成樹狀結構
 * - 使用 ng-zorro-antd upload 和 steps 組件
 */
import { CommonModule } from '@angular/common';
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule, NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { TreeService } from '../../services/tree.service';

interface ScanResult {
    fileName: string;
    fileSize: number;
    pageCount: number;
    extractedText: string;
    suggestedStructure: TreeStructure[];
    confidence: number;
}

interface TreeStructure {
    title: string;
    level: number;
    children: TreeStructure[];
    content: string;
}

@Component({
    selector: 'hub-tree-pdf-scan',
    standalone: true,
    imports: [
        CommonModule,
        NzCardModule,
        NzUploadModule,
        NzStepsModule,
        NzProgressModule,
        NzResultModule,
        NzListModule,
        NzTagModule,
        NzButtonModule,
        NzIconModule,
        NzAlertModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <nz-card title="PDF 文件掃描" subtitle="上傳 PDF 文件自動生成樹狀結構">
      <!-- 步驟指示器 -->
      <nz-steps [nzCurrent]="currentStep()" class="steps-container">
        <nz-step nzTitle="上傳文件" nzDescription="選擇 PDF 文件"></nz-step>
        <nz-step nzTitle="掃描解析" nzDescription="分析文件內容"></nz-step>
        <nz-step nzTitle="結構預覽" nzDescription="確認樹狀結構"></nz-step>
        <nz-step nzTitle="完成創建" nzDescription="生成樹狀結構"></nz-step>
      </nz-steps>

      <!-- 步驟 1: 文件上傳 -->
      <div *ngIf="currentStep() === 0" class="step-content">
        <nz-alert
          nzType="info"
          nzMessage="支援的文件格式"
          nzDescription="請上傳 PDF 格式的文件，文件大小不超過 10MB"
          nzShowIcon
          class="upload-alert">
        </nz-alert>

        <nz-upload
          class="upload-area"
          nzType="drag"
          [nzMultiple]="false"
          [nzAccept]="'.pdf'"
          [nzBeforeUpload]="beforeUpload"
          (nzChange)="handleUploadChange($event)"
          [nzFileList]="fileList()"
          [nzShowUploadList]="{ showPreviewIcon: false, showRemoveIcon: true }">
          
          <p class="ant-upload-drag-icon">
            <span nz-icon nzType="file-pdf" nzTheme="twoTone"></span>
          </p>
          <p class="ant-upload-text">點擊或拖拽 PDF 文件到此區域上傳</p>
          <p class="ant-upload-hint">
            支援單個文件上傳，文件大小限制 10MB
          </p>
        </nz-upload>

        <div class="step-actions">
          <button 
            nz-button 
            nzType="primary" 
            [disabled]="fileList().length === 0"
            (click)="startScan()">
            開始掃描
          </button>
        </div>
      </div>

      <!-- 步驟 2: 掃描進度 -->
      <div *ngIf="currentStep() === 1" class="step-content">
        <div class="scan-progress">
          <div class="progress-info">
            <h3>正在掃描文件...</h3>
            <p>{{ scanStatus() }}</p>
          </div>
          
          <nz-progress 
            [nzPercent]="scanProgress()" 
            nzStatus="active"
            [nzShowInfo]="true">
          </nz-progress>

          <div class="scan-details" *ngIf="scanProgress() > 0">
            <nz-list [nzDataSource]="scanSteps" [nzSize]="'small'">
              <ng-template #item let-step>
                <nz-list-item>
                  <span nz-icon [nzType]="step.completed ? 'check-circle' : 'loading'" 
                        [style.color]="step.completed ? '#52c41a' : '#1890ff'"></span>
                  <span style="margin-left: 8px;">{{ step.name }}</span>
                  <nz-tag *ngIf="step.completed" nzColor="green">完成</nz-tag>
                  <nz-tag *ngIf="!step.completed && step.active" nzColor="blue">進行中</nz-tag>
                </nz-list-item>
              </ng-template>
            </nz-list>
          </div>
        </div>
      </div>

      <!-- 步驟 3: 結構預覽 -->
      <div *ngIf="currentStep() === 2" class="step-content">
        <div class="preview-container" *ngIf="scanResult()">
          <div class="scan-summary">
            <h3>掃描結果摘要</h3>
            <div class="summary-stats">
              <div class="stat-item">
                <span class="stat-label">文件名稱：</span>
                <span class="stat-value">{{ scanResult()?.fileName }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">文件大小：</span>
                <span class="stat-value">{{ formatFileSize(scanResult()?.fileSize || 0) }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">頁數：</span>
                <span class="stat-value">{{ scanResult()?.pageCount }} 頁</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">識別信心度：</span>
                <span class="stat-value">
                  <nz-tag [nzColor]="getConfidenceColor(scanResult()?.confidence || 0)">
                    {{ scanResult()?.confidence }}%
                  </nz-tag>
                </span>
              </div>
            </div>
          </div>

          <div class="structure-preview">
            <h3>建議的樹狀結構</h3>
            <div class="tree-preview">
              <div 
                *ngFor="let node of scanResult()?.suggestedStructure" 
                class="tree-node"
                [style.margin-left.px]="node.level * 20">
                <span nz-icon nzType="folder" *ngIf="node.children.length > 0"></span>
                <span nz-icon nzType="file-text" *ngIf="node.children.length === 0"></span>
                <span class="node-title">{{ node.title }}</span>
                <nz-tag nzSize="small">層級 {{ node.level }}</nz-tag>
              </div>
            </div>
          </div>
        </div>

        <div class="step-actions">
          <button nz-button (click)="goBack()">重新上傳</button>
          <button 
            nz-button 
            nzType="primary" 
            (click)="createTreeStructure()"
            style="margin-left: 8px;">
            創建樹狀結構
          </button>
        </div>
      </div>

      <!-- 步驟 4: 完成 -->
      <div *ngIf="currentStep() === 3" class="step-content">
        <nz-result
          nzStatus="success"
          nzTitle="樹狀結構創建成功！"
          nzSubTitle="PDF 文件已成功解析並生成樹狀結構">
          
          <div nz-result-extra>
            <button nz-button nzType="primary" (click)="viewCreatedTree()">
              查看樹狀結構
            </button>
            <button nz-button (click)="scanAnother()" style="margin-left: 8px;">
              掃描其他文件
            </button>
          </div>
        </nz-result>
      </div>
    </nz-card>
  `,
    styles: [`
    .steps-container {
      margin-bottom: 32px;
    }
    
    .step-content {
      min-height: 400px;
      padding: 24px 0;
    }
    
    .upload-alert {
      margin-bottom: 24px;
    }
    
    .upload-area {
      margin-bottom: 24px;
    }
    
    .step-actions {
      text-align: center;
      margin-top: 32px;
    }
    
    .scan-progress {
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .progress-info {
      margin-bottom: 24px;
    }
    
    .progress-info h3 {
      margin-bottom: 8px;
      color: #1890ff;
    }
    
    .scan-details {
      margin-top: 32px;
      text-align: left;
    }
    
    .preview-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .scan-summary {
      background: #fafafa;
      padding: 16px;
      border-radius: 6px;
      margin-bottom: 24px;
    }
    
    .summary-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-top: 16px;
    }
    
    .stat-item {
      display: flex;
      align-items: center;
    }
    
    .stat-label {
      font-weight: 500;
      margin-right: 8px;
    }
    
    .stat-value {
      color: #666;
    }
    
    .structure-preview {
      border: 1px solid #f0f0f0;
      border-radius: 6px;
      padding: 16px;
    }
    
    .tree-preview {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 16px;
    }
    
    .tree-node {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      border-bottom: 1px solid #f5f5f5;
    }
    
    .tree-node:last-child {
      border-bottom: none;
    }
    
    .node-title {
      flex: 1;
      font-size: 14px;
    }
  `]
})
export class TreePdfScanComponent {
    private treeService = inject(TreeService);
    private router = inject(Router);
    private message = inject(NzMessageService);

    // State management
    currentStep = signal(0);
    fileList = signal<NzUploadFile[]>([]);
    scanProgress = signal(0);
    scanStatus = signal('準備開始掃描...');
    scanResult = signal<ScanResult | null>(null);
    createdTreeId = signal<string | null>(null);

    // 掃描步驟
    scanSteps = [
        { name: '文件上傳', completed: false, active: false },
        { name: '文件解析', completed: false, active: false },
        { name: '內容提取', completed: false, active: false },
        { name: '結構分析', completed: false, active: false },
        { name: '樹狀生成', completed: false, active: false }
    ];

    beforeUpload = (file: NzUploadFile): boolean => {
        // 檢查文件類型
        if (file.type !== 'application/pdf') {
            this.message.error('只能上傳 PDF 格式的文件！');
            return false;
        }

        // 檢查文件大小 (10MB)
        const isLt10M = file.size! / 1024 / 1024 < 10;
        if (!isLt10M) {
            this.message.error('文件大小不能超過 10MB！');
            return false;
        }

        return false; // 阻止自動上傳，手動處理
    };

    handleUploadChange(info: NzUploadChangeParam): void {
        const fileList = [...info.fileList];

        // 只保留最新的一個文件
        if (fileList.length > 1) {
            fileList.splice(0, fileList.length - 1);
        }

        this.fileList.set(fileList);
    }

    startScan(): void {
        if (this.fileList().length === 0) {
            this.message.error('請先上傳 PDF 文件');
            return;
        }

        this.currentStep.set(1);
        this.simulateScanProcess();
    }

    private simulateScanProcess(): void {
        let progress = 0;
        let stepIndex = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5; // 隨機增加 5-20%

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.completeScan();
            }

            // 更新當前步驟
            const currentStepIndex = Math.floor((progress / 100) * this.scanSteps.length);
            if (currentStepIndex !== stepIndex && currentStepIndex < this.scanSteps.length) {
                if (stepIndex < this.scanSteps.length) {
                    this.scanSteps[stepIndex].completed = true;
                    this.scanSteps[stepIndex].active = false;
                }
                stepIndex = currentStepIndex;
                if (stepIndex < this.scanSteps.length) {
                    this.scanSteps[stepIndex].active = true;
                    this.scanStatus.set(`正在執行：${this.scanSteps[stepIndex].name}`);
                }
            }

            this.scanProgress.set(Math.min(progress, 100));
        }, 300);
    }

    private completeScan(): void {
        // 標記所有步驟完成
        this.scanSteps.forEach(step => {
            step.completed = true;
            step.active = false;
        });

        this.scanStatus.set('掃描完成！');

        // 生成模擬掃描結果
        const mockResult: ScanResult = {
            fileName: this.fileList()[0].name,
            fileSize: this.fileList()[0].size || 0,
            pageCount: Math.floor(Math.random() * 50) + 10,
            extractedText: '模擬提取的文本內容...',
            confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
            suggestedStructure: [
                {
                    title: '第一章 概述',
                    level: 1,
                    content: '章節內容...',
                    children: [
                        {
                            title: '1.1 背景介紹',
                            level: 2,
                            content: '背景內容...',
                            children: []
                        },
                        {
                            title: '1.2 目標說明',
                            level: 2,
                            content: '目標內容...',
                            children: []
                        }
                    ]
                },
                {
                    title: '第二章 詳細說明',
                    level: 1,
                    content: '章節內容...',
                    children: [
                        {
                            title: '2.1 技術規範',
                            level: 2,
                            content: '技術內容...',
                            children: []
                        }
                    ]
                }
            ]
        };

        this.scanResult.set(mockResult);

        setTimeout(() => {
            this.currentStep.set(2);
        }, 1000);
    }

    async createTreeStructure(): Promise<void> {
        try {
            const result = this.scanResult();
            if (!result) return;

            // 創建樹狀結構
            const treeData = {
                name: result.fileName.replace('.pdf', ''),
                description: `從 PDF 文件 "${result.fileName}" 自動生成的樹狀結構`,
                type: '其他' as const,
                status: 'active' as const,
                level: 0,
                maxLevel: Math.max(...result.suggestedStructure.map(s => s.level)),
                nodeCount: this.countNodes(result.suggestedStructure)
            };

            const treeId = await this.treeService.createTree(treeData);
            this.createdTreeId.set(treeId);
            this.currentStep.set(3);
            this.message.success('樹狀結構創建成功！');
        } catch (error) {
            console.error('創建樹狀結構失敗:', error);
            this.message.error('創建樹狀結構失敗');
        }
    }

    private countNodes(structure: TreeStructure[]): number {
        let count = structure.length;
        structure.forEach(node => {
            count += this.countNodes(node.children);
        });
        return count;
    }

    goBack(): void {
        this.currentStep.set(0);
        this.fileList.set([]);
        this.scanProgress.set(0);
        this.scanResult.set(null);
        this.scanSteps.forEach(step => {
            step.completed = false;
            step.active = false;
        });
    }

    viewCreatedTree(): void {
        const treeId = this.createdTreeId();
        if (treeId) {
            this.router.navigate(['/hub/tree/panel'], { queryParams: { id: treeId } });
        }
    }

    scanAnother(): void {
        this.goBack();
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getConfidenceColor(confidence: number): string {
        if (confidence >= 90) return 'green';
        if (confidence >= 70) return 'orange';
        return 'red';
    }
}