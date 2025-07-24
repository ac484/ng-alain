# File Structure（現實同步骨架，2024-06-22）

## src/app/routes/hub/
- contract/
  - [✓] contract-list.component.ts
  - [✓] contract-form.component.ts
  - [✗] contract-payment-list.component.ts
  - [✗] contract-payment-form.component.ts
  - [✗] contract-payment.model.ts
  - [✗] contract-payment.service.ts
  - [✗] contract-workflow.model.ts
  - [✗] contract-workflow.service.ts
  - [✓] contract.model.ts
  - [✓] contract.service.ts
  - [✓] contract.component.ts
- settings/
  - [✓] settings.component.ts
  - [✓] settings.component.html
  - [✓] settings.component.less
  - [✗] owner-settings.component.ts
  - [✗] workflow-settings.component.ts
  - [✗] workflow-settings.model.ts
  - [✗] workflow-settings.service.ts
- fire-crud/
  - [✓] hub-crud.service.ts
  - [✓] hub-crud.component.ts
- basic/widget/
  - [✓] fab.component.ts

## memory-bank/
- [✓] projectbrief.md
- [✓] productContext.md
- [✓] systemPatterns.md
- [✓] techContext.md
- [✓] activeContext.md
- [✓] progress.md
- [✓] tasks.md
- features/
  - [✓] contract-payments.md
  - [✓] dynamic-workflow.md
  - [✓] settings-architecture.md

> [✓] 已落地  [✗] 缺少/待補

---

每次有檔案/文件新增、刪除、重構，請務必同步更新本文件，確保 Memory Bank 與專案現實完全一致。 
