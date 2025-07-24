import {
  NzDropDownDirective,
  NzDropDownModule,
  NzDropdownMenuComponent
} from "./chunk-6Y4KUKOA.js";
import {
  NzMenuDirective,
  NzMenuItemComponent
} from "./chunk-IIASACYA.js";
import {
  NzTooltipDirective,
  NzTooltipModule
} from "./chunk-4P4HHPBT.js";
import "./chunk-C6MTXAAB.js";
import "./chunk-U5VATZ4Q.js";
import "./chunk-EGGX2FJX.js";
import "./chunk-76DJI4FU.js";
import "./chunk-MIQKVNBS.js";
import "./chunk-RH5RXJTD.js";
import "./chunk-Y5G3O3B7.js";
import {
  AlainConfigService
} from "./chunk-ES4WNO3Q.js";
import "./chunk-XMKNXNVX.js";
import "./chunk-GP3H6RZA.js";
import "./chunk-OAOHUKFD.js";
import "./chunk-BQ76GOFF.js";
import "./chunk-LSG4V6ID.js";
import "./chunk-KG76OIXO.js";
import "./chunk-J25EALHE.js";
import "./chunk-FZ3LGF3I.js";
import "./chunk-LTANXE67.js";
import "./chunk-36PX2JTV.js";
import "./chunk-BVIJPY5U.js";
import "./chunk-ZO4CS3CJ.js";
import "./chunk-I75K2H66.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NDRILP3E.js";
import "./chunk-IH6YTMYU.js";
import "./chunk-D4QSWQD6.js";
import "./chunk-NFHVISCS.js";
import {
  Directionality
} from "./chunk-TBGMZLZ3.js";
import {
  Platform
} from "./chunk-GIT7CFOZ.js";
import {
  CommonModule
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  Renderer2,
  isDevMode,
  setClassMetadata,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-NQBXVTYU.js";
import {
  DOCUMENT,
  InjectionToken,
  inject,
  ɵɵdefineInjector,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/theme/fesm2022/theme-btn.mjs
function ThemeBtnComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 8);
    ɵɵlistener("click", function ThemeBtnComponent_For_9_Template_li_click_0_listener() {
      const i_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onThemeChange(i_r2.key));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r2 = ctx.$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate(i_r2.text);
  }
}
var ALAIN_THEME_BTN_KEYS = new InjectionToken("ALAIN_THEME_BTN_KEYS");
var ThemeBtnComponent = class _ThemeBtnComponent {
  doc = inject(DOCUMENT);
  platform = inject(Platform);
  renderer = inject(Renderer2);
  configSrv = inject(AlainConfigService);
  theme = "default";
  isDev = isDevMode();
  types = [{
    key: "default",
    text: "Default Theme"
  }, {
    key: "dark",
    text: "Dark Theme"
  }, {
    key: "compact",
    text: "Compact Theme"
  }];
  devTips = `When the dark.css file can't be found, you need to run it once: npm run theme`;
  deployUrl = "";
  themeChange = new EventEmitter();
  dir = inject(Directionality).valueSignal;
  key = inject(ALAIN_THEME_BTN_KEYS, {
    optional: true
  }) ?? "site-theme";
  ngOnInit() {
    this.initTheme();
  }
  initTheme() {
    if (!this.platform.isBrowser) {
      return;
    }
    this.theme = localStorage.getItem(this.key) || "default";
    this.updateChartTheme();
    this.onThemeChange(this.theme);
  }
  updateChartTheme() {
    this.configSrv.set("chart", {
      theme: this.theme === "dark" ? "dark" : ""
    });
  }
  onThemeChange(theme) {
    if (!this.platform.isBrowser) {
      return;
    }
    this.theme = theme;
    this.themeChange.emit(theme);
    this.renderer.setAttribute(this.doc.body, "data-theme", theme);
    const dom = this.doc.getElementById(this.key);
    if (dom) {
      dom.remove();
    }
    localStorage.removeItem(this.key);
    if (theme !== "default") {
      const el = this.doc.createElement("link");
      el.type = "text/css";
      el.rel = "stylesheet";
      el.id = this.key;
      el.href = `${this.deployUrl}assets/style.${theme}.css`;
      localStorage.setItem(this.key, theme);
      this.doc.body.append(el);
    }
    this.updateChartTheme();
  }
  ngOnDestroy() {
    const el = this.doc.getElementById(this.key);
    if (el != null) {
      this.doc.body.removeChild(el);
    }
  }
  static ɵfac = function ThemeBtnComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeBtnComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ThemeBtnComponent,
    selectors: [["theme-btn"]],
    hostVars: 4,
    hostBindings: function ThemeBtnComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("theme-btn", true)("theme-btn-rtl", ctx.dir() === "rtl");
      }
    },
    inputs: {
      types: "types",
      devTips: "devTips",
      deployUrl: "deployUrl"
    },
    outputs: {
      themeChange: "themeChange"
    },
    decls: 10,
    vars: 2,
    consts: [["menu", "nzDropdownMenu"], ["nz-dropdown", "", "nzPlacement", "topCenter", 1, "ant-avatar", "ant-avatar-circle", "ant-avatar-icon", 3, "nzDropdownMenu"], ["nz-tooltip", "", "role", "img", "width", "21", "height", "21", "viewBox", "0 0 21 21", "fill", "currentColor", 1, "anticon", 3, "nzTooltipTitle"], ["fill-rule", "evenodd"], ["fill-rule", "nonzero"], ["d", "M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z"], ["nz-menu", "", "nzSelectable", ""], ["nz-menu-item", ""], ["nz-menu-item", "", 3, "click"]],
    template: function ThemeBtnComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 1);
        ɵɵnamespaceSVG();
        ɵɵelementStart(1, "svg", 2)(2, "g", 3)(3, "g", 4);
        ɵɵelement(4, "path", 5);
        ɵɵelementEnd()()();
        ɵɵnamespaceHTML();
        ɵɵelementStart(5, "nz-dropdown-menu", null, 0)(7, "ul", 6);
        ɵɵrepeaterCreate(8, ThemeBtnComponent_For_9_Template, 2, 1, "li", 7, ɵɵrepeaterTrackByIndex);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        const menu_r4 = ɵɵreference(6);
        ɵɵproperty("nzDropdownMenu", ctx.types.length > 0 ? menu_r4 : null);
        ɵɵadvance();
        ɵɵproperty("nzTooltipTitle", ctx.isDev ? ctx.devTips : null);
        ɵɵadvance(7);
        ɵɵrepeater(ctx.types);
      }
    },
    dependencies: [NzDropDownDirective, NzDropdownMenuComponent, NzMenuDirective, NzMenuItemComponent, NzTooltipDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeBtnComponent, [{
    type: Component,
    args: [{
      selector: "theme-btn",
      host: {
        "[class.theme-btn]": `true`,
        "[class.theme-btn-rtl]": `dir() === 'rtl'`
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NzDropDownDirective, NzDropdownMenuComponent, NzMenuDirective, NzMenuItemComponent, NzTooltipDirective],
      template: '<div\n  class="ant-avatar ant-avatar-circle ant-avatar-icon"\n  nz-dropdown\n  nzPlacement="topCenter"\n  [nzDropdownMenu]="types.length > 0 ? menu : null"\n>\n  <svg\n    nz-tooltip\n    [nzTooltipTitle]="isDev ? devTips : null"\n    class="anticon"\n    role="img"\n    width="21"\n    height="21"\n    viewBox="0 0 21 21"\n    fill="currentColor"\n  >\n    <g fill-rule="evenodd">\n      <g fill-rule="nonzero">\n        <path\n          d="M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z"\n        />\n      </g>\n    </g>\n  </svg>\n  <nz-dropdown-menu #menu="nzDropdownMenu">\n    <ul nz-menu nzSelectable>\n      @for (i of types; track $index) {\n        <li nz-menu-item (click)="onThemeChange(i.key)">{{ i.text }}</li>\n      }\n    </ul>\n  </nz-dropdown-menu>\n</div>\n'
    }]
  }], null, {
    types: [{
      type: Input
    }],
    devTips: [{
      type: Input
    }],
    deployUrl: [{
      type: Input
    }],
    themeChange: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [ThemeBtnComponent];
var ThemeBtnModule = class _ThemeBtnModule {
  static ɵfac = function ThemeBtnModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeBtnModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ThemeBtnModule,
    imports: [CommonModule, NzDropDownModule, NzTooltipModule, ThemeBtnComponent],
    exports: [ThemeBtnComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzDropDownModule, NzTooltipModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeBtnModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzDropDownModule, NzTooltipModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  ALAIN_THEME_BTN_KEYS,
  ThemeBtnComponent,
  ThemeBtnModule
};
//# sourceMappingURL=@delon_theme_theme-btn.js.map
