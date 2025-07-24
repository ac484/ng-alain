# File Structure（現實同步骨架，2024-06-22）

## src/app/routes/hub/
- contract/
  - [✓] contract-list.component.ts
  - [✓] contract-form.component.ts
  - [✓] contract-payment-list.component.ts   # 新增：多次請款子表格
  - [✓] contract-payment-form.component.ts   # 新增：單次請款編輯表單
  - [✓] contract-payment.model.ts            # 新增：多次請款型別
  - [✓] contract-payment.service.ts          # 新增：多次請款 service
  - [✓] contract-workflow.model.ts           # 新增：請款審批流程型別
  - [✓] contract-workflow.service.ts         # 新增：動態審批流程 service
  - [✓] contract.model.ts
  - [✓] contract.service.ts
  - [✓] contract.component.ts
- settings/
  - [✓] settings.component.ts
  - [✓] settings.component.html
  - [✓] settings.component.less
- fire-crud/
  - [✓] hub-crud.service.ts
  - [✓] hub-crud.component.ts
- basic/widget/
  - [✓] fab.component.ts
- tree/
  - [✓] contract.component.ts
  - [✓] contract.component.html
  - [✓] contract.component.less
- workspace/
  - [✓] workspace.component.ts
  - [✓] workspace.component.html
  - [✓] workspace.component.less

## memory-bank/
- [✓] projectbrief.md
- [✓] productContext.md
- [✓] systemPatterns.md
- [✓] techContext.md
- [✓] activeContext.md
- [✓] progress.md
- [✓] tasks.md
- [✓] file-structure.md
- features/
  - [✓] contract-payments.md
  - [✓] dynamic-workflow.md
  - [✓] settings-architecture.md

> [✓] 已落地  [✗] 缺少/待補

---

每次有檔案/文件新增、刪除、重構，請務必同步更新本文件，確保 Memory Bank 與專案現實完全一致。 
