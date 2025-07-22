# Tech Context: ng-alain

## Technologies Used
- Angular 20
- ng-zorro-antd 20
- @delon 系列
- TypeScript 5.8（strict=true）
- Firebase
- rxjs
- less

## Development Setup
- Node.js（建議 LTS）
- Yarn 4
- Angular CLI
- ESLint、Stylelint、Husky
- scripts/_ci/ 目錄下有自動化部署與測試腳本

## Technical Constraints
- 僅支援現代瀏覽器
- 嚴格型別與模組化
- 需支援 SSR

## Dependencies
- 主要依賴詳見 package.json（Angular、ng-zorro-antd、@delon、Firebase、rxjs 等）

## Tool Usage Patterns
- CLI 腳本自動化（build、test、lint、deploy）
- 主題/國際化切換
- CI/CD、Lint/Format 工具整合
- Lint 問題分批修正，優先 any、prefer-inject、import/order、no-empty 
