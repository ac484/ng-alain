# ng-alain 專案檔案結構與功能說明

## 📁 根目錄檔案 (Root Files)
│  index.html                    # 主 HTML 檔案，Angular 應用程式入口點
│  main.ts                       # 應用程式啟動檔案，初始化 Angular 應用
│  style-icons-auto.ts           # 自動生成的圖示樣式檔案
│  style-icons.ts                # 手動定義的圖示樣式檔案
│  styles.less                   # 全域樣式檔案
│  typings.d.ts                  # TypeScript 型別定義檔案

## 🏗️ 應用程式核心 (App Core)
├─app
│  │  app.component.ts           # 根元件，應用程式主要容器
│  │  app.config.ts              # 應用程式配置檔案，包含 providers 和 imports
│  │
│  ├─core                        # 核心服務模組
│  │  │  index.ts                # 核心模組匯出檔案
│  │  │  README.md               # 核心模組說明文件
│  │  │  start-page.guard.ts     # 起始頁面路由守衛
│  │  │
│  │  ├─auth                     # 認證相關服務 (空目錄，待實作)
│  │  │
│  │  ├─firebase                 # Firebase 整合服務
│  │  │      firebase-acl-init.service.ts    # Firebase ACL 初始化服務
│  │  │      firebase-acl.service.ts         # Firebase ACL 權限控制服務
│  │  │      firebase-user.service.ts        # Firebase 使用者管理服務
│  │  │      index.ts                        # Firebase 服務匯出檔案
│  │  │
│  │  ├─i18n                     # 國際化服務
│  │  │      i18n.service.spec.ts            # i18n 服務測試檔案
│  │  │      i18n.service.ts                 # 國際化服務實作
│  │  │
│  │  ├─net                      # 網路相關服務
│  │  │      default.interceptor.ts          # 預設 HTTP 攔截器
│  │  │      helper.ts                       # 網路輔助工具
│  │  │      index.ts                        # 網路服務匯出檔案
│  │  │      refresh-token.ts                # Token 重新整理服務
│  │  │
│  │  └─startup                   # 啟動相關服務
│  │          startup.service.ts             # 應用程式啟動服務

## 🎨 佈局模組 (Layout Module)
│  ├─layout                      # 佈局模組
│  │  │  index.ts                # 佈局模組匯出檔案
│  │  │
│  │  ├─basic                    # 基本佈局
│  │  │  │  basic.component.ts   # 基本佈局元件
│  │  │  │  README.md            # 基本佈局說明文件
│  │  │  │
│  │  │  └─widgets               # 佈局小工具
│  │  │          clear-storage.component.ts  # 清除儲存小工具
│  │  │          fullscreen.component.ts     # 全螢幕切換小工具
│  │  │          i18n.component.ts           # 語言切換小工具
│  │  │          icon.component.ts           # 圖示小工具
│  │  │          notify.component.ts         # 通知小工具
│  │  │          rtl.component.ts            # RTL 方向切換小工具
│  │  │          search.component.ts         # 搜尋小工具
│  │  │          task.component.ts           # 任務小工具
│  │  │          user.component.ts           # 使用者小工具
│  │  │
│  │  ├─blank                    # 空白佈局
│  │  │      blank.component.ts  # 空白佈局元件
│  │  │      README.md           # 空白佈局說明文件
│  │  │
│  │  └─passport                 # 認證佈局
│  │          passport.component.less        # 認證佈局樣式
│  │          passport.component.ts          # 認證佈局元件

## 🛣️ 路由模組 (Routes Module)
│  ├─routes                      # 路由模組
│  │  │  routes.ts               # 主要路由配置檔案
│  │  │
│  │  ├─dashboard                # 儀表板模組
│  │  │  │  routes.ts            # 儀表板路由配置
│  │  │  │
│  │  │  ├─analysis              # 分析頁面
│  │  │  │      analysis.component.html      # 分析頁面模板
│  │  │  │      analysis.component.less      # 分析頁面樣式
│  │  │  │      analysis.component.ts        # 分析頁面元件
│  │  │  │
│  │  │  ├─monitor               # 監控頁面
│  │  │  │      monitor.component.html       # 監控頁面模板
│  │  │  │      monitor.component.less       # 監控頁面樣式
│  │  │  │      monitor.component.ts         # 監控頁面元件
│  │  │  │
│  │  │  ├─v1                    # 版本1儀表板
│  │  │  │      v1.component.html            # V1 儀表板模板
│  │  │  │      v1.component.ts              # V1 儀表板元件
│  │  │  │
│  │  │  └─workplace             # 工作台頁面
│  │  │          workplace.component.html    # 工作台模板
│  │  │          workplace.component.less    # 工作台樣式
│  │  │          workplace.component.ts      # 工作台元件
│  │  │
│  │  ├─data-v                   # 資料視覺化模組
│  │  │  │  routes.ts            # 資料視覺化路由配置
│  │  │  │
│  │  │  └─relation              # 關係圖頁面
│  │  │          relation.component.html     # 關係圖模板
│  │  │          relation.component.ts       # 關係圖元件
│  │  │
│  │  ├─delon                    # Delon 功能模組
│  │  │  │  routes.ts            # Delon 路由配置
│  │  │  │
│  │  │  ├─acl                   # 權限控制
│  │  │  │      acl.component.html           # ACL 頁面模板
│  │  │  │      acl.component.ts             # ACL 頁面元件
│  │  │  │
│  │  │  ├─acl-admin             # ACL 管理
│  │  │  │      acl-admin.component.ts       # ACL 管理元件
│  │  │  │
│  │  │  ├─acl-permissions       # 權限管理
│  │  │  │      acl-permissions.component.ts # 權限管理元件
│  │  │  │
│  │  │  ├─acl-roles             # 角色管理
│  │  │  │      acl-roles.component.ts       # 角色管理元件
│  │  │  │
│  │  │  ├─acl-users             # 使用者管理
│  │  │  │      acl-users.component.ts       # 使用者管理元件
│  │  │  │
│  │  │  ├─cache                 # 快取管理
│  │  │  │      cache.component.html         # 快取管理模板
│  │  │  │      cache.component.ts           # 快取管理元件
│  │  │  │
│  │  │  ├─downfile              # 檔案下載
│  │  │  │      downfile.component.html      # 檔案下載模板
│  │  │  │      downfile.component.ts        # 檔案下載元件
│  │  │  │
│  │  │  ├─form                  # 表單功能
│  │  │  │      form.component.html          # 表單功能模板
│  │  │  │      form.component.ts            # 表單功能元件
│  │  │  │
│  │  │  ├─guard                 # 路由守衛
│  │  │  │      admin.component.ts           # 管理員守衛
│  │  │  │      auth.component.ts            # 認證守衛
│  │  │  │      can-leave.ts                 # 離開頁面守衛
│  │  │  │      guard.component.html         # 守衛測試模板
│  │  │  │      guard.component.ts           # 守衛測試元件
│  │  │  │      leave.component.ts           # 離開頁面元件
│  │  │  │
│  │  │  ├─print                 # 列印功能
│  │  │  │      print.component.html         # 列印功能模板
│  │  │  │      print.component.ts           # 列印功能元件
│  │  │  │
│  │  │  ├─qr                    # QR Code 功能
│  │  │  │      qr.component.html            # QR Code 模板
│  │  │  │      qr.component.ts              # QR Code 元件
│  │  │  │
│  │  │  ├─st                    # Simple Table
│  │  │  │      st.component.html            # 簡單表格模板
│  │  │  │      st.component.ts              # 簡單表格元件
│  │  │  │
│  │  │  ├─util                  # 工具功能
│  │  │  │      util.component.html          # 工具功能模板
│  │  │  │      util.component.ts            # 工具功能元件
│  │  │  │
│  │  │  ├─xlsx                  # Excel 功能
│  │  │  │      xlsx.component.html          # Excel 功能模板
│  │  │  │      xlsx.component.ts            # Excel 功能元件
│  │  │  │
│  │  │  └─zip                   # 壓縮檔案功能
│  │  │          zip.component.html          # 壓縮檔案模板
│  │  │          zip.component.ts            # 壓縮檔案元件
│  │  │
│  │  ├─exception                # 異常頁面模組
│  │  │      exception.component.ts          # 異常頁面元件
│  │  │      routes.ts                       # 異常頁面路由
│  │  │      trigger.component.ts            # 異常觸發元件
│  │  │
│  │  ├─extras                   # 額外功能模組
│  │  │  │  routes.ts            # 額外功能路由配置
│  │  │  │
│  │  │  ├─helpcenter            # 幫助中心
│  │  │  │      helpcenter.component.html    # 幫助中心模板
│  │  │  │      helpcenter.component.ts      # 幫助中心元件
│  │  │  │
│  │  │  ├─poi                   # 興趣點管理
│  │  │  │  │  poi.component.html            # 興趣點列表模板
│  │  │  │  │  poi.component.ts              # 興趣點列表元件
│  │  │  │  │
│  │  │  │  └─edit               # 興趣點編輯
│  │  │  │          edit.component.html      # 興趣點編輯模板
│  │  │  │          edit.component.ts        # 興趣點編輯元件
│  │  │  │
│  │  │  └─settings              # 設定頁面
│  │  │          settings.component.html     # 設定頁面模板
│  │  │          settings.component.ts       # 設定頁面元件
│  │  │
│  │  ├─passport                 # 認證模組
│  │  │  │  callback.component.ts            # 認證回調元件
│  │  │  │  routes.ts                        # 認證路由配置
│  │  │  │
│  │  │  ├─anonymous-login       # 匿名登入
│  │  │  │      anonymous-login.component.ts # 匿名登入元件
│  │  │  │
│  │  │  ├─email-login           # 電子郵件登入
│  │  │  │      email-login-form.component.ts    # 電子郵件登入表單
│  │  │  │      email-login-modal.component.ts   # 電子郵件登入模態框
│  │  │  │      email-login.component.ts         # 電子郵件登入元件
│  │  │  │      email-register-form.component.ts # 電子郵件註冊表單
│  │  │  │      email-reset-form.component.ts    # 電子郵件重設表單
│  │  │  │      index.ts                         # 電子郵件登入匯出檔案
│  │  │  │
│  │  │  ├─google-auth           # Google 認證
│  │  │  │      google-auth.component.ts     # Google 認證元件
│  │  │  │
│  │  │  ├─lock                  # 鎖定頁面
│  │  │  │      lock.component.html          # 鎖定頁面模板
│  │  │  │      lock.component.less          # 鎖定頁面樣式
│  │  │  │      lock.component.ts            # 鎖定頁面元件
│  │  │  │
│  │  │  ├─login                 # 登入頁面
│  │  │  │      login.component.html         # 登入頁面模板
│  │  │  │      login.component.less         # 登入頁面樣式
│  │  │  │      login.component.ts           # 登入頁面元件
│  │  │  │
│  │  │  ├─register              # 註冊頁面
│  │  │  │      register.component.html      # 註冊頁面模板
│  │  │  │      register.component.less      # 註冊頁面樣式
│  │  │  │      register.component.ts        # 註冊頁面元件
│  │  │  │
│  │  │  └─register-result       # 註冊結果頁面
│  │  │          register-result.component.html  # 註冊結果模板
│  │  │          register-result.component.ts    # 註冊結果元件
│  │  │
│  │  ├─pro                      # 專業版功能模組
│  │  │  │  routes.ts            # 專業版路由配置
│  │  │  │
│  │  │  ├─account               # 帳戶管理
│  │  │  │  ├─center             # 個人中心
│  │  │  │  │  │  center.component.html      # 個人中心模板
│  │  │  │  │  │  center.component.less      # 個人中心樣式
│  │  │  │  │  │  center.component.ts        # 個人中心元件
│  │  │  │  │  │
│  │  │  │  │  ├─applications    # 應用程式管理
│  │  │  │  │  │      applications.component.html    # 應用程式管理模板
│  │  │  │  │  │      applications.component.less    # 應用程式管理樣式
│  │  │  │  │  │      applications.component.ts      # 應用程式管理元件
│  │  │  │  │  │
│  │  │  │  │  ├─articles        # 文章管理
│  │  │  │  │  │      articles.component.html        # 文章管理模板
│  │  │  │  │  │      articles.component.ts          # 文章管理元件
│  │  │  │  │  │
│  │  │  │  │  └─projects        # 專案管理
│  │  │  │  │          projects.component.html      # 專案管理模板
│  │  │  │  │          projects.component.less      # 專案管理樣式
│  │  │  │  │          projects.component.ts        # 專案管理元件
│  │  │  │  │
│  │  │  │  └─settings           # 設定管理
│  │  │  │      │  settings.component.html          # 設定管理模板
│  │  │  │      │  settings.component.less          # 設定管理樣式
│  │  │  │      │  settings.component.ts            # 設定管理元件
│  │  │  │      │
│  │  │  │      ├─base           # 基本設定
│  │  │  │      │      base.component.html          # 基本設定模板
│  │  │  │      │      base.component.less          # 基本設定樣式
│  │  │  │      │      base.component.ts            # 基本設定元件
│  │  │  │      │
│  │  │  │      ├─binding        # 帳戶綁定
│  │  │  │      │      binding.component.html       # 帳戶綁定模板
│  │  │  │      │      binding.component.ts         # 帳戶綁定元件
│  │  │  │      │
│  │  │  │      ├─notification   # 通知設定
│  │  │  │      │      notification.component.html  # 通知設定模板
│  │  │  │      │      notification.component.ts    # 通知設定元件
│  │  │  │      │
│  │  │  │      └─security       # 安全設定
│  │  │  │              security.component.html     # 安全設定模板
│  │  │  │              security.component.ts       # 安全設定元件
│  │  │  │
│  │  │  ├─form                  # 表單功能
│  │  │  │  ├─advanced-form      # 進階表單
│  │  │  │  │      advanced-form.component.html     # 進階表單模板
│  │  │  │  │      advanced-form.component.ts       # 進階表單元件
│  │  │  │  │
│  │  │  │  ├─basic-form         # 基本表單
│  │  │  │  │      basic-form.component.html        # 基本表單模板
│  │  │  │  │      basic-form.component.ts          # 基本表單元件
│  │  │  │  │
│  │  │  │  └─step-form          # 步驟表單
│  │  │  │          step-form.component.html        # 步驟表單模板
│  │  │  │          step-form.component.less        # 步驟表單樣式
│  │  │  │          step-form.component.ts          # 步驟表單元件
│  │  │  │          step1.component.html            # 步驟1模板
│  │  │  │          step1.component.ts              # 步驟1元件
│  │  │  │          step2.component.html            # 步驟2模板
│  │  │  │          step2.component.ts              # 步驟2元件
│  │  │  │          step3.component.html            # 步驟3模板
│  │  │  │          step3.component.ts              # 步驟3元件
│  │  │  │          transfer.service.ts             # 轉移服務
│  │  │  │
│  │  │  ├─list                  # 列表功能
│  │  │  │  ├─applications       # 應用程式列表
│  │  │  │  │      applications.component.html      # 應用程式列表模板
│  │  │  │  │      applications.component.less      # 應用程式列表樣式
│  │  │  │  │      applications.component.ts        # 應用程式列表元件
│  │  │  │  │
│  │  │  │  ├─articles           # 文章列表
│  │  │  │  │      articles.component.html          # 文章列表模板
│  │  │  │  │      articles.component.ts            # 文章列表元件
│  │  │  │  │
│  │  │  │  ├─basic-list         # 基本列表
│  │  │  │  │  │  basic-list.component.html         # 基本列表模板
│  │  │  │  │  │  basic-list.component.less         # 基本列表樣式
│  │  │  │  │  │  basic-list.component.ts           # 基本列表元件
│  │  │  │  │  │
│  │  │  │  │  └─edit            # 編輯功能
│  │  │  │  │          edit.component.html          # 編輯模板
│  │  │  │  │          edit.component.ts            # 編輯元件
│  │  │  │  │
│  │  │  │  ├─card-list          # 卡片列表
│  │  │  │  │      card-list.component.html         # 卡片列表模板
│  │  │  │  │      card-list.component.ts           # 卡片列表元件
│  │  │  │  │
│  │  │  │  ├─list               # 一般列表
│  │  │  │  │      list.component.html              # 一般列表模板
│  │  │  │  │      list.component.ts                # 一般列表元件
│  │  │  │  │
│  │  │  │  ├─projects           # 專案列表
│  │  │  │  │      projects.component.html          # 專案列表模板
│  │  │  │  │      projects.component.less          # 專案列表樣式
│  │  │  │  │      projects.component.ts            # 專案列表元件
│  │  │  │  │
│  │  │  │  └─table-list         # 表格列表
│  │  │  │          table-list.component.html       # 表格列表模板
│  │  │  │          table-list.component.ts         # 表格列表元件
│  │  │  │
│  │  │  ├─profile               # 個人資料
│  │  │  │  ├─advanced           # 進階個人資料
│  │  │  │  │      advanced.component.html          # 進階個人資料模板
│  │  │  │  │      advanced.component.less          # 進階個人資料樣式
│  │  │  │  │      advanced.component.ts            # 進階個人資料元件
│  │  │  │  │
│  │  │  │  └─basic              # 基本個人資料
│  │  │  │          basic.component.html            # 基本個人資料模板
│  │  │  │          basic.component.ts              # 基本個人資料元件
│  │  │  │
│  │  │  └─result                # 結果頁面
│  │  │      ├─fail              # 失敗結果
│  │  │      │      fail.component.html             # 失敗結果模板
│  │  │      │      fail.component.ts               # 失敗結果元件
│  │  │      │
│  │  │      └─success           # 成功結果
│  │  │              success.component.html         # 成功結果模板
│  │  │              success.component.ts           # 成功結果元件
│  │  │
│  │  ├─style                    # 樣式功能模組
│  │  │  │  color.service.ts     # 顏色服務
│  │  │  │  routes.ts            # 樣式路由配置
│  │  │  │
│  │  │  ├─colors                # 顏色展示
│  │  │  │      colors.component.html               # 顏色展示模板
│  │  │  │      colors.component.less               # 顏色展示樣式
│  │  │  │      colors.component.ts                 # 顏色展示元件
│  │  │  │
│  │  │  ├─gridmasonry           # 瀑布流佈局
│  │  │  │      gridmasonry.component.html          # 瀑布流佈局模板
│  │  │  │      gridmasonry.component.less          # 瀑布流佈局樣式
│  │  │  │      gridmasonry.component.ts            # 瀑布流佈局元件
│  │  │  │
│  │  │  └─typography            # 排版展示
│  │  │          typography.component.html          # 排版展示模板
│  │  │          typography.component.ts            # 排版展示元件
│  │  │
│  │  └─widgets                  # 小工具模組
│  │      │  routes.ts           # 小工具路由配置
│  │      │
│  │      └─widgets              # 小工具展示
│  │              widgets.component.html            # 小工具展示模板
│  │              widgets.component.less            # 小工具展示樣式
│  │              widgets.component.ts              # 小工具展示元件

## 🔧 共享模組 (Shared Module)
│  └─shared                      # 共享模組
│      │  index.ts               # 共享模組匯出檔案
│      │  README.md              # 共享模組說明文件
│      │  shared-delon.module.ts # Delon 共享模組
│      │  shared-imports.ts      # 共享匯入檔案
│      │  shared-zorro.module.ts # Zorro 共享模組
│      │
│      ├─cell-widget             # 單元格小工具
│      │      index.ts           # 單元格小工具匯出檔案
│      │
│      ├─json-schema             # JSON Schema 功能
│      │  │  index.ts            # JSON Schema 匯出檔案
│      │  │  README.md           # JSON Schema 說明文件
│      │  │
│      │  └─test                 # JSON Schema 測試
│      │          test.widget.ts # JSON Schema 測試小工具
│      │
│      ├─st-widget               # Simple Table 小工具
│      │      index.ts           # ST 小工具匯出檔案
│      │      README.md          # ST 小工具說明文件
│      │
│      └─utils                   # 工具函數
│              yuan.ts           # 人民幣格式化工具

## 📦 靜態資源 (Assets)
├─assets                         # 靜態資源目錄
│  │  .gitkeep                   # Git 保持檔案
│  │  color.less                 # 顏色變數檔案
│  │  logo-color.svg             # 彩色 Logo
│  │  logo-full.svg              # 完整 Logo
│  │  logo.svg                   # 標準 Logo
│  │  style.compact.css          # 緊湊樣式
│  │  style.dark.css             # 深色主題樣式
│  │  zorro.svg                  # Zorro Logo
│  │
│  └─tmp                         # 臨時檔案目錄
│      │  app-data.json          # 應用程式資料
│      │  demo.docx              # 示範 Word 檔案
│      │  demo.pdf               # 示範 PDF 檔案
│      │  demo.pptx              # 示範 PowerPoint 檔案
│      │  demo.xlsx              # 示範 Excel 檔案
│      │  demo.zip               # 示範壓縮檔案
│      │  on-boarding.json       # 引導流程資料
│      │
│      ├─i18n                    # 國際化語言包
│      │      el-GR.json         # 希臘語
│      │      en-US.json         # 美式英語
│      │      es-ES.json         # 西班牙語
│      │      fr-FR.json         # 法語
│      │      hr-HR.json         # 克羅埃西亞語
│      │      it-IT.json         # 義大利語
│      │      ko-KR.json         # 韓語
│      │      pl-PL.json         # 波蘭語
│      │      sl-SI.json         # 斯洛維尼亞語
│      │      tr-TR.json         # 土耳其語
│      │      zh-CN.json         # 簡體中文
│      │      zh-TW.json         # 繁體中文
│      │
│      └─img                     # 圖片資源
│              1.png             # 示範圖片1
│              2.png             # 示範圖片2
│              3.png             # 示範圖片3
│              4.png             # 示範圖片4
│              5.png             # 示範圖片5
│              6.png             # 示範圖片6
│              avatar.jpg        # 頭像圖片
│              bg1.jpg           # 背景圖片1
│              bg10.jpg          # 背景圖片10
│              bg2.jpg           # 背景圖片2
│              bg3.jpg           # 背景圖片3
│              bg4.jpg           # 背景圖片4
│              bg5.jpg           # 背景圖片5
│              bg6.jpg           # 背景圖片6
│              bg7.jpg           # 背景圖片7
│              bg8.jpg           # 背景圖片8
│              bg9.jpg           # 背景圖片9
│              half-float-bg-1.jpg  # 半浮動背景圖片

## ⚙️ 環境配置 (Environments)
├─environments                   # 環境配置目錄
│      environment.prod.ts       # 生產環境配置
│      environment.ts            # 開發環境配置

## 🎨 全域樣式 (Global Styles)
└─styles                         # 全域樣式目錄
        index.less               # 樣式入口檔案
        theme.less               # 主題樣式檔案
