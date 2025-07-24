import {
  NzTooltipDirective,
  NzTooltipModule
} from "./chunk-4P4HHPBT.js";
import {
  CdkObserveContent,
  ObserversModule
} from "./chunk-2BDLX2FQ.js";
import "./chunk-C6MTXAAB.js";
import "./chunk-U5VATZ4Q.js";
import "./chunk-EGGX2FJX.js";
import "./chunk-76DJI4FU.js";
import "./chunk-MIQKVNBS.js";
import "./chunk-RH5RXJTD.js";
import "./chunk-Y5G3O3B7.js";
import "./chunk-LSG4V6ID.js";
import "./chunk-KG76OIXO.js";
import "./chunk-J25EALHE.js";
import "./chunk-FZ3LGF3I.js";
import "./chunk-LTANXE67.js";
import {
  DomSanitizer
} from "./chunk-BVIJPY5U.js";
import "./chunk-ZO4CS3CJ.js";
import "./chunk-I75K2H66.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NDRILP3E.js";
import "./chunk-IH6YTMYU.js";
import "./chunk-D4QSWQD6.js";
import "./chunk-NFHVISCS.js";
import "./chunk-TBGMZLZ3.js";
import "./chunk-GIT7CFOZ.js";
import {
  CommonModule,
  NgTemplateOutlet
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgModule,
  NgZone,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵsanitizeHtml,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-NQBXVTYU.js";
import {
  DOCUMENT,
  inject,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  take
} from "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/ellipsis.mjs
var _c0 = ["orgEl"];
var _c1 = ["shadowOrgEl"];
var _c2 = ["shadowTextEl"];
var _c3 = ["*"];
var _c4 = () => ({
  "overflow-wrap": "break-word",
  "word-wrap": "break-word"
});
var _c5 = (a0) => ({
  $implicit: a0
});
var _c6 = (a0) => ({
  "-webkit-line-clamp": a0,
  "-webkit-box-orient": "vertical"
});
function EllipsisComponent_ng_template_3_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function EllipsisComponent_ng_template_3_Conditional_0_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 12);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("innerHTML", ctx_r1.orgHtml, ɵɵsanitizeHtml);
  }
}
function EllipsisComponent_ng_template_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 10);
    ɵɵtemplate(1, EllipsisComponent_ng_template_3_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 11)(2, EllipsisComponent_ng_template_3_Conditional_0_ng_template_2_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const titleTpl_r3 = ɵɵreference(3);
    const con_r4 = ɵɵnextContext().$implicit;
    ɵɵproperty("nzTooltipTitle", titleTpl_r3)("nzTooltipOverlayStyle", ɵɵpureFunction0(3, _c4));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", con_r4);
  }
}
function EllipsisComponent_ng_template_3_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function EllipsisComponent_ng_template_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, EllipsisComponent_ng_template_3_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 11);
  }
  if (rf & 2) {
    const con_r4 = ɵɵnextContext().$implicit;
    ɵɵproperty("ngTemplateOutlet", con_r4);
  }
}
function EllipsisComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, EllipsisComponent_ng_template_3_Conditional_0_Template, 4, 4, "span", 10)(1, EllipsisComponent_ng_template_3_Conditional_1_Template, 1, 1, "ng-container");
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵconditional(ctx_r1.tooltip ? 0 : 1);
  }
}
function EllipsisComponent_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span");
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(ctx_r1.cls);
  }
}
function EllipsisComponent_Case_6_ng_template_0_Template(rf, ctx) {
}
function EllipsisComponent_Case_6_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵtextInterpolate(ctx_r1.text);
  }
}
function EllipsisComponent_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, EllipsisComponent_Case_6_ng_template_0_Template, 0, 0, "ng-template", 13)(1, EllipsisComponent_Case_6_ng_template_1_Template, 1, 1, "ng-template", null, 3, ɵɵtemplateRefExtractor);
  }
  if (rf & 2) {
    const lengthTpl_r5 = ɵɵreference(2);
    ɵɵnextContext();
    const tooltipTpl_r6 = ɵɵreference(4);
    ɵɵproperty("ngTemplateOutlet", tooltipTpl_r6)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c5, lengthTpl_r5));
  }
}
function EllipsisComponent_Case_7_ng_template_0_Template(rf, ctx) {
}
function EllipsisComponent_Case_7_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div");
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵstyleMap(ɵɵpureFunction1(4, _c6, ctx_r1.lines));
    ɵɵclassMap(ctx_r1.cls);
  }
}
function EllipsisComponent_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, EllipsisComponent_Case_7_ng_template_0_Template, 0, 0, "ng-template", 13)(1, EllipsisComponent_Case_7_ng_template_1_Template, 1, 6, "ng-template", null, 4, ɵɵtemplateRefExtractor);
  }
  if (rf & 2) {
    const lineClampTpl_r7 = ɵɵreference(2);
    ɵɵnextContext();
    const tooltipTpl_r6 = ɵɵreference(4);
    ɵɵproperty("ngTemplateOutlet", tooltipTpl_r6)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c5, lineClampTpl_r7));
  }
}
function EllipsisComponent_Case_8_ng_template_2_Template(rf, ctx) {
}
function EllipsisComponent_Case_8_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵtextInterpolate(ctx_r1.linsWord);
  }
}
function EllipsisComponent_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div")(1, "div", 14);
    ɵɵtemplate(2, EllipsisComponent_Case_8_ng_template_2_Template, 0, 0, "ng-template", 13)(3, EllipsisComponent_Case_8_ng_template_3_Template, 1, 1, "ng-template", null, 5, ɵɵtemplateRefExtractor);
    ɵɵelement(5, "div", 15, 6);
    ɵɵelementStart(7, "div", 16, 7)(9, "span");
    ɵɵtext(10);
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const lineTpl_r8 = ɵɵreference(4);
    const ctx_r1 = ɵɵnextContext();
    const tooltipTpl_r6 = ɵɵreference(4);
    ɵɵclassMap(ctx_r1.cls);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", tooltipTpl_r6)("ngTemplateOutletContext", ɵɵpureFunction1(6, _c5, lineTpl_r8));
    ɵɵadvance(3);
    ɵɵproperty("innerHTML", ctx_r1.orgHtml, ɵɵsanitizeHtml);
    ɵɵadvance(5);
    ɵɵtextInterpolate(ctx_r1.text);
  }
}
var EllipsisComponent = class _EllipsisComponent {
  el = inject(ElementRef).nativeElement;
  ngZone = inject(NgZone);
  dom = inject(DomSanitizer);
  doc = inject(DOCUMENT);
  cdr = inject(ChangeDetectorRef);
  isSupportLineClamp = this.doc.body.style["webkitLineClamp"] !== void 0;
  orgEl;
  shadowOrgEl;
  shadowTextEl;
  inited = false;
  orgHtml;
  type = "default";
  cls = {};
  text = "";
  targetCount = 0;
  tooltip = false;
  length;
  lines;
  fullWidthRecognition = false;
  tail = "...";
  get linsWord() {
    const {
      targetCount,
      text,
      tail
    } = this;
    return (targetCount > 0 ? text.substring(0, targetCount) : "") + (targetCount > 0 && targetCount < text.length ? tail : "");
  }
  get win() {
    return this.doc.defaultView || window;
  }
  getStrFullLength(str) {
    return str.split("").reduce((pre, cur) => {
      const charCode = cur.charCodeAt(0);
      if (charCode >= 0 && charCode <= 128) {
        return pre + 1;
      }
      return pre + 2;
    }, 0);
  }
  cutStrByFullLength(str, maxLength) {
    let showLength = 0;
    return str.split("").reduce((pre, cur) => {
      const charCode = cur.charCodeAt(0);
      if (charCode >= 0 && charCode <= 128) {
        showLength += 1;
      } else {
        showLength += 2;
      }
      if (showLength <= maxLength) {
        return pre + cur;
      }
      return pre;
    }, "");
  }
  bisection(targetHeight, mid, begin, end, text, node) {
    const suffix = this.tail;
    node.innerHTML = text.substring(0, mid) + suffix;
    let sh = node.offsetHeight;
    if (sh <= targetHeight) {
      node.innerHTML = text.substring(0, mid + 1) + suffix;
      sh = node.offsetHeight;
      if (sh > targetHeight || mid === begin) {
        return mid;
      }
      begin = mid;
      mid = end - begin === 1 ? begin + 1 : Math.floor((end - begin) / 2) + begin;
      return this.bisection(targetHeight, mid, begin, end, text, node);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    node.innerHTML = text.substring(0, mid - 1) + suffix;
    sh = node.offsetHeight;
    if (sh <= targetHeight) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;
    return this.bisection(targetHeight, mid, begin, end, text, node);
  }
  genType() {
    const {
      lines,
      length,
      isSupportLineClamp
    } = this;
    this.cls = {
      ellipsis: true,
      ellipsis__lines: lines && !isSupportLineClamp,
      "ellipsis__line-clamp": lines && isSupportLineClamp
    };
    if (!lines && !length) {
      this.type = "default";
    } else if (!lines) {
      this.type = "length";
    } else if (isSupportLineClamp) {
      this.type = "line-clamp";
    } else {
      this.type = "line";
    }
  }
  gen() {
    const {
      type,
      lines,
      length,
      fullWidthRecognition,
      tail,
      orgEl,
      cdr,
      ngZone
    } = this;
    if (type === "length") {
      const el = orgEl.nativeElement;
      if (el.children.length > 0) {
        throw new Error("Ellipsis content must be string.");
      }
      const lengthText = el.textContent;
      const textLength = fullWidthRecognition ? this.getStrFullLength(lengthText) : lengthText.length;
      if (textLength <= length || length < 0) {
        this.text = lengthText;
      } else {
        let displayText;
        if (length - tail.length <= 0) {
          displayText = "";
        } else {
          displayText = fullWidthRecognition ? this.cutStrByFullLength(lengthText, length) : lengthText.slice(0, length);
        }
        this.text = displayText + tail;
      }
      ngZone.run(() => cdr.detectChanges());
    } else if (type === "line") {
      const {
        shadowOrgEl,
        shadowTextEl
      } = this;
      const orgNode = shadowOrgEl.nativeElement;
      const lineText = orgNode.innerText || orgNode.textContent;
      const lineHeight = parseInt(this.win.getComputedStyle(this.getEl(".ellipsis")).lineHeight, 10);
      const targetHeight = lines * lineHeight;
      const handleEl = this.getEl(".ellipsis__handle");
      handleEl.style.height = `${targetHeight}px`;
      if (orgNode.offsetHeight <= targetHeight) {
        this.text = lineText;
        this.targetCount = lineText.length;
      } else {
        const len = lineText.length;
        const mid = Math.ceil(len / 2);
        const count = this.bisection(targetHeight, mid, 0, len, lineText, shadowTextEl.nativeElement.firstChild);
        this.text = lineText;
        this.targetCount = count;
      }
      ngZone.run(() => cdr.detectChanges());
    }
  }
  getEl(cls) {
    return this.el.querySelector(cls);
  }
  executeOnStable(fn) {
    if (this.ngZone.isStable) {
      fn();
    } else {
      this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(fn);
    }
  }
  refresh() {
    this.genType();
    const {
      type,
      dom,
      orgEl,
      cdr
    } = this;
    const html = orgEl.nativeElement.innerHTML;
    this.orgHtml = dom.bypassSecurityTrustHtml(html);
    cdr.detectChanges();
    this.executeOnStable(() => {
      this.gen();
      if (type !== "line") {
        const el = this.getEl(".ellipsis");
        if (el) {
          el.innerHTML = html;
        }
      }
    });
  }
  ngAfterViewInit() {
    this.inited = true;
    this.refresh();
  }
  ngOnChanges() {
    if (this.inited) {
      this.refresh();
    }
  }
  static ɵfac = function EllipsisComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EllipsisComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _EllipsisComponent,
    selectors: [["ellipsis"]],
    viewQuery: function EllipsisComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
        ɵɵviewQuery(_c1, 5);
        ɵɵviewQuery(_c2, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.orgEl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.shadowOrgEl = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.shadowTextEl = _t.first);
      }
    },
    inputs: {
      tooltip: [2, "tooltip", "tooltip", booleanAttribute],
      length: [2, "length", "length", (v) => v == null ? null : numberAttribute(v)],
      lines: [2, "lines", "lines", (v) => v == null ? null : numberAttribute(v)],
      fullWidthRecognition: [2, "fullWidthRecognition", "fullWidthRecognition", booleanAttribute],
      tail: "tail"
    },
    exportAs: ["ellipsis"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c3,
    decls: 9,
    vars: 1,
    consts: [["orgEl", ""], ["tooltipTpl", ""], ["titleTpl", ""], ["lengthTpl", ""], ["lineClampTpl", ""], ["lineTpl", ""], ["shadowOrgEl", ""], ["shadowTextEl", ""], [2, "display", "none", 3, "cdkObserveContent"], [3, "class"], ["nz-tooltip", "", 3, "nzTooltipTitle", "nzTooltipOverlayStyle"], [4, "ngTemplateOutlet"], [3, "innerHTML"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ellipsis__handle"], [1, "ellipsis__shadow", 3, "innerHTML"], [1, "ellipsis__shadow"]],
    template: function EllipsisComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 8, 0);
        ɵɵlistener("cdkObserveContent", function EllipsisComponent_Template_div_cdkObserveContent_0_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.refresh());
        });
        ɵɵprojection(2);
        ɵɵelementEnd();
        ɵɵtemplate(3, EllipsisComponent_ng_template_3_Template, 2, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        ɵɵconditionalCreate(5, EllipsisComponent_Case_5_Template, 1, 2, "span", 9)(6, EllipsisComponent_Case_6_Template, 3, 4)(7, EllipsisComponent_Case_7_Template, 3, 4)(8, EllipsisComponent_Case_8_Template, 11, 8, "div", 9);
      }
      if (rf & 2) {
        let tmp_2_0;
        ɵɵadvance(5);
        ɵɵconditional((tmp_2_0 = ctx.type) === "default" ? 5 : tmp_2_0 === "length" ? 6 : tmp_2_0 === "line-clamp" ? 7 : tmp_2_0 === "line" ? 8 : -1);
      }
    },
    dependencies: [CdkObserveContent, NzTooltipDirective, NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EllipsisComponent, [{
    type: Component,
    args: [{
      selector: "ellipsis",
      exportAs: "ellipsis",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [CdkObserveContent, NzTooltipDirective, NgTemplateOutlet],
      template: `<div (cdkObserveContent)="refresh()" #orgEl style="display: none"><ng-content /></div>
<ng-template #tooltipTpl let-con>
  @if (tooltip) {
    <span
      nz-tooltip
      [nzTooltipTitle]="titleTpl"
      [nzTooltipOverlayStyle]="{ 'overflow-wrap': 'break-word', 'word-wrap': 'break-word' }"
    >
      <ng-container *ngTemplateOutlet="con" />
      <ng-template #titleTpl><div [innerHTML]="orgHtml"></div></ng-template>
    </span>
  } @else {
    <ng-container *ngTemplateOutlet="con" />
  }
</ng-template>
@switch (type) {
  @case ('default') {
    <span [class]="cls"></span>
  }
  @case ('length') {
    <ng-template [ngTemplateOutlet]="tooltipTpl" [ngTemplateOutletContext]="{ $implicit: lengthTpl }" />
    <ng-template #lengthTpl>{{ text }}</ng-template>
  }
  @case ('line-clamp') {
    <ng-template [ngTemplateOutlet]="tooltipTpl" [ngTemplateOutletContext]="{ $implicit: lineClampTpl }" />
    <ng-template #lineClampTpl>
      <div [class]="cls" [style]="{ '-webkit-line-clamp': lines, '-webkit-box-orient': 'vertical' }"></div>
    </ng-template>
  }
  @case ('line') {
    <div [class]="cls">
      <div class="ellipsis__handle">
        <ng-template [ngTemplateOutlet]="tooltipTpl" [ngTemplateOutletContext]="{ $implicit: lineTpl }" />
        <ng-template #lineTpl>{{ linsWord }}</ng-template>
        <div class="ellipsis__shadow" #shadowOrgEl [innerHTML]="orgHtml"></div>
        <div class="ellipsis__shadow" #shadowTextEl>
          <span>{{ text }}</span>
        </div>
      </div>
    </div>
  }
}
`
    }]
  }], null, {
    orgEl: [{
      type: ViewChild,
      args: ["orgEl", {
        static: false
      }]
    }],
    shadowOrgEl: [{
      type: ViewChild,
      args: ["shadowOrgEl", {
        static: false
      }]
    }],
    shadowTextEl: [{
      type: ViewChild,
      args: ["shadowTextEl", {
        static: false
      }]
    }],
    tooltip: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    length: [{
      type: Input,
      args: [{
        transform: (v) => v == null ? null : numberAttribute(v)
      }]
    }],
    lines: [{
      type: Input,
      args: [{
        transform: (v) => v == null ? null : numberAttribute(v)
      }]
    }],
    fullWidthRecognition: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tail: [{
      type: Input
    }]
  });
})();
var COMPONENTS = [EllipsisComponent];
var EllipsisModule = class _EllipsisModule {
  static ɵfac = function EllipsisModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EllipsisModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _EllipsisModule,
    imports: [CommonModule, ObserversModule, NzTooltipModule, EllipsisComponent],
    exports: [EllipsisComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, ObserversModule, NzTooltipModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EllipsisModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ObserversModule, NzTooltipModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  EllipsisComponent,
  EllipsisModule
};
//# sourceMappingURL=@delon_abc_ellipsis.js.map
