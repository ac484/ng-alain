# System Patterns: ng-alain

## System Architecture
模組化 Angular 架構，採用獨立 API，支援多語系、主題切換、動態路由與雲端整合。

## Key Technical Decisions
- 全面採用 Angular 20
- 採用 ng-zorro-antd 20 與 @delon 系列
- 整合 Firebase 雲端服務

## Design Patterns in Use
- 依賴注入（DI）
- RxJS 資料流
- 配置驅動與模組分層

## Component Relationships
核心、共用、業務模組分明，元件間透過服務與事件溝通。

## Critical Implementation Paths
- 應用啟動流程
- 權限驗證與路由守衛
- 主題/國際化切換
- 雲端服務整合 
