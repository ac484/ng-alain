import {
  WINDOW
} from "./chunk-B3BRWWTU.js";
import {
  Router,
  RouterModule
} from "./chunk-36PX2JTV.js";
import {
  DomSanitizer
} from "./chunk-BVIJPY5U.js";
import "./chunk-ZO4CS3CJ.js";
import "./chunk-NDRILP3E.js";
import {
  Directionality
} from "./chunk-TBGMZLZ3.js";
import {
  CommonModule,
  NgTemplateOutlet
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation,
  booleanAttribute,
  contentChildren,
  input,
  setClassMetadata,
  viewChild,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵdomTemplate,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵviewQuerySignal
} from "./chunk-NQBXVTYU.js";
import {
  computed,
  inject,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/global-footer.mjs
var _c0 = ["host"];
var _c1 = ["*"];
function GlobalFooterItemComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function GlobalFooterComponent_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 4);
    ɵɵlistener("click", function GlobalFooterComponent_Conditional_0_For_2_Template_a_click_0_listener() {
      const i_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.to(i_r2));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r2 = ctx.$implicit;
    ɵɵproperty("innerHTML", i_r2.title, ɵɵsanitizeHtml);
  }
}
function GlobalFooterComponent_Conditional_0_For_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function GlobalFooterComponent_Conditional_0_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 5);
    ɵɵlistener("click", function GlobalFooterComponent_Conditional_0_For_4_Template_a_click_0_listener() {
      const i_r5 = ɵɵrestoreView(_r4).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.to(i_r5));
    });
    ɵɵtemplate(1, GlobalFooterComponent_Conditional_0_For_4_ng_container_1_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r5 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", i_r5.host());
  }
}
function GlobalFooterComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 0);
    ɵɵrepeaterCreate(1, GlobalFooterComponent_Conditional_0_For_2_Template, 1, 1, "a", 2, ɵɵrepeaterTrackByIndex);
    ɵɵrepeaterCreate(3, GlobalFooterComponent_Conditional_0_For_4_Template, 2, 1, "a", 3, ɵɵrepeaterTrackByIndex);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵrepeater(ctx_r2.linkHtmls());
    ɵɵadvance(2);
    ɵɵrepeater(ctx_r2.items());
  }
}
var GlobalFooterItemComponent = class _GlobalFooterItemComponent {
  host = viewChild.required("host");
  // @ViewChild('host', { static: true }) host!: TemplateRef<void>;
  href = input(...ngDevMode ? [void 0, {
    debugName: "href"
  }] : []);
  blankTarget = input(false, ...ngDevMode ? [{
    debugName: "blankTarget",
    transform: booleanAttribute
  }] : [{
    transform: booleanAttribute
  }]);
  static ɵfac = function GlobalFooterItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GlobalFooterItemComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _GlobalFooterItemComponent,
    selectors: [["global-footer-item"]],
    viewQuery: function GlobalFooterItemComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuerySignal(ctx.host, _c0, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    },
    inputs: {
      href: [1, "href"],
      blankTarget: [1, "blankTarget"]
    },
    exportAs: ["globalFooterItem"],
    ngContentSelectors: _c1,
    decls: 2,
    vars: 0,
    consts: [["host", ""]],
    template: function GlobalFooterItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵdomTemplate(0, GlobalFooterItemComponent_ng_template_0_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GlobalFooterItemComponent, [{
    type: Component,
    args: [{
      selector: "global-footer-item",
      exportAs: "globalFooterItem",
      template: `<ng-template #host><ng-content /></ng-template>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, null);
})();
var GlobalFooterComponent = class _GlobalFooterComponent {
  router = inject(Router);
  win = inject(WINDOW);
  dom = inject(DomSanitizer);
  dir = inject(Directionality).valueSignal;
  links = input([], ...ngDevMode ? [{
    debugName: "links"
  }] : []);
  items = contentChildren(GlobalFooterItemComponent, ...ngDevMode ? [{
    debugName: "items"
  }] : []);
  linkHtmls = computed(() => {
    return this.links().map((item) => {
      if (typeof item.title === "string") {
        item.title = this.dom.bypassSecurityTrustHtml(item.title);
      }
      return item;
    });
  }, ...ngDevMode ? [{
    debugName: "linkHtmls"
  }] : []);
  to(item) {
    const href = typeof item.href === "string" ? item.href : item.href();
    if (!href) {
      return;
    }
    const blankTarget = typeof item.blankTarget === "boolean" ? item.blankTarget : item.blankTarget?.();
    if (blankTarget) {
      this.win.open(href);
      return;
    }
    if (/^https?:\/\//.test(href)) {
      this.win.location.href = href;
    } else {
      this.router.navigateByUrl(href);
    }
  }
  static ɵfac = function GlobalFooterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GlobalFooterComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _GlobalFooterComponent,
    selectors: [["global-footer"]],
    contentQueries: function GlobalFooterComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuerySignal(dirIndex, ctx.items, GlobalFooterItemComponent, 4);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    },
    hostVars: 4,
    hostBindings: function GlobalFooterComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("global-footer", true)("global-footer-rtl", ctx.dir() === "rtl");
      }
    },
    inputs: {
      links: [1, "links"]
    },
    exportAs: ["globalFooter"],
    ngContentSelectors: _c1,
    decls: 3,
    vars: 1,
    consts: [[1, "global-footer__links"], [1, "global-footer__copyright"], [1, "global-footer__links-item", 3, "innerHTML"], [1, "global-footer__links-item"], [1, "global-footer__links-item", 3, "click", "innerHTML"], [1, "global-footer__links-item", 3, "click"], [4, "ngTemplateOutlet"]],
    template: function GlobalFooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵconditionalCreate(0, GlobalFooterComponent_Conditional_0_Template, 5, 0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵprojection(2);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵconditional(ctx.linkHtmls().length > 0 || ctx.items().length > 0 ? 0 : -1);
      }
    },
    dependencies: [NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GlobalFooterComponent, [{
    type: Component,
    args: [{
      selector: "global-footer",
      exportAs: "globalFooter",
      template: `
    @if (linkHtmls().length > 0 || items().length > 0) {
      <div class="global-footer__links">
        @for (i of linkHtmls(); track $index) {
          <a class="global-footer__links-item" (click)="to(i)" [innerHTML]="i.title"></a>
        }
        @for (i of items(); track $index) {
          <a class="global-footer__links-item" (click)="to(i)">
            <ng-container *ngTemplateOutlet="i.host()" />
          </a>
        }
      </div>
    }
    <div class="global-footer__copyright">
      <ng-content />
    </div>
  `,
      host: {
        "[class.global-footer]": "true",
        "[class.global-footer-rtl]": `dir() === 'rtl'`
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NgTemplateOutlet]
    }]
  }], null, null);
})();
var COMPONENTS = [GlobalFooterComponent, GlobalFooterItemComponent];
var GlobalFooterModule = class _GlobalFooterModule {
  static ɵfac = function GlobalFooterModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GlobalFooterModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _GlobalFooterModule,
    imports: [CommonModule, RouterModule, GlobalFooterComponent, GlobalFooterItemComponent],
    exports: [GlobalFooterComponent, GlobalFooterItemComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, RouterModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GlobalFooterModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, RouterModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  GlobalFooterComponent,
  GlobalFooterItemComponent,
  GlobalFooterModule
};
//# sourceMappingURL=@delon_abc_global-footer.js.map
