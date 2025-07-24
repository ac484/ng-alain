import {
  NzProgressComponent,
  NzProgressModule
} from "./chunk-WGGZSBOI.js";
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-GP3H6RZA.js";
import "./chunk-OAOHUKFD.js";
import "./chunk-BQ76GOFF.js";
import "./chunk-LSG4V6ID.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-KG76OIXO.js";
import {
  fromEventOutsideAngular,
  toBoolean
} from "./chunk-J25EALHE.js";
import "./chunk-BVIJPY5U.js";
import "./chunk-ZO4CS3CJ.js";
import {
  takeUntilDestroyed
} from "./chunk-I75K2H66.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NDRILP3E.js";
import "./chunk-NFHVISCS.js";
import {
  Directionality
} from "./chunk-TBGMZLZ3.js";
import "./chunk-GIT7CFOZ.js";
import {
  NgTemplateOutlet
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-NQBXVTYU.js";
import {
  DestroyRef,
  inject,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import {
  merge
} from "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  Subject,
  Subscription,
  filter,
  startWith
} from "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-steps.mjs
var _c0 = ["processDotTemplate"];
var _c1 = ["itemContainer"];
var _c2 = (a0, a1, a2) => ({
  $implicit: a0,
  status: a1,
  index: a2
});
function NzStepComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 3);
  }
}
function NzStepComponent_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵelement(1, "nz-progress", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("nzPercent", ctx_r0.nzPercentage)("nzWidth", ctx_r0.nzSize === "small" ? 32 : 40)("nzFormat", ctx_r0.nullProcessFormat)("nzStrokeWidth", 4);
  }
}
function NzStepComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵelement(1, "nz-icon", 13);
    ɵɵelementEnd();
  }
}
function NzStepComponent_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵelement(1, "nz-icon", 14);
    ɵɵelementEnd();
  }
}
function NzStepComponent_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.index + 1, " ");
  }
}
function NzStepComponent_Conditional_4_Conditional_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "nz-icon", 15);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const icon_r2 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("nzType", icon_r2);
  }
}
function NzStepComponent_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵtemplate(1, NzStepComponent_Conditional_4_Conditional_4_ng_container_1_Template, 2, 1, "ng-container", 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.nzIcon);
  }
}
function NzStepComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzStepComponent_Conditional_4_Conditional_0_Template, 2, 4, "div", 11);
    ɵɵconditionalCreate(1, NzStepComponent_Conditional_4_Conditional_1_Template, 2, 0, "span", 5);
    ɵɵconditionalCreate(2, NzStepComponent_Conditional_4_Conditional_2_Template, 2, 0, "span", 5);
    ɵɵconditionalCreate(3, NzStepComponent_Conditional_4_Conditional_3_Template, 2, 1, "span", 5);
    ɵɵconditionalCreate(4, NzStepComponent_Conditional_4_Conditional_4_Template, 2, 1, "span", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵconditional(ctx_r0.showProgress ? 0 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.nzStatus === "finish" && !ctx_r0.nzIcon ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.nzStatus === "error" ? 2 : -1);
    ɵɵadvance();
    ɵɵconditional((ctx_r0.nzStatus === "process" || ctx_r0.nzStatus === "wait") && !ctx_r0.nzIcon ? 3 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.nzIcon ? 4 : -1);
  }
}
function NzStepComponent_Conditional_5_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 17);
  }
}
function NzStepComponent_Conditional_5_ng_template_3_Template(rf, ctx) {
}
function NzStepComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 5);
    ɵɵtemplate(1, NzStepComponent_Conditional_5_ng_template_1_Template, 1, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor)(3, NzStepComponent_Conditional_5_ng_template_3_Template, 0, 0, "ng-template", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const processDotTemplate_r3 = ɵɵreference(2);
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.customProcessTemplate || processDotTemplate_r3)("ngTemplateOutletContext", ɵɵpureFunction3(2, _c2, processDotTemplate_r3, ctx_r0.nzStatus, ctx_r0.index));
  }
}
function NzStepComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.nzTitle);
  }
}
function NzStepComponent_Conditional_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.nzSubtitle);
  }
}
function NzStepComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtemplate(1, NzStepComponent_Conditional_9_ng_container_1_Template, 2, 1, "ng-container", 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.nzSubtitle);
  }
}
function NzStepComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.nzDescription);
  }
}
var _c3 = ["*"];
var NzStepComponent = class _NzStepComponent {
  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  processDotTemplate;
  itemContainer;
  nzTitle;
  nzSubtitle;
  nzDescription;
  nzDisabled = false;
  nzPercentage = null;
  nzSize = "default";
  get nzStatus() {
    return this._status;
  }
  set nzStatus(status) {
    this._status = status;
    this.isCustomStatus = true;
  }
  isCustomStatus = false;
  _status = "wait";
  get nzIcon() {
    return this._icon;
  }
  set nzIcon(value) {
    if (!(value instanceof TemplateRef)) {
      this.oldAPIIcon = typeof value === "string" && value.indexOf("anticon") > -1;
    }
    this._icon = value;
  }
  oldAPIIcon = true;
  _icon;
  customProcessTemplate;
  // Set by parent.
  direction = "horizontal";
  index = 0;
  last = false;
  outStatus = "process";
  showProcessDot = false;
  clickable = false;
  clickOutsideAngular$ = new Subject();
  nullProcessFormat = () => null;
  get showProgress() {
    return this.nzPercentage !== null && !this.nzIcon && this.nzStatus === "process" && this.nzPercentage >= 0 && this.nzPercentage <= 100;
  }
  get currentIndex() {
    return this._currentIndex;
  }
  set currentIndex(current) {
    this._currentIndex = current;
    if (!this.isCustomStatus) {
      this._status = current > this.index ? "finish" : current === this.index ? this.outStatus || "" : "wait";
    }
  }
  _currentIndex = 0;
  ngOnInit() {
    fromEventOutsideAngular(this.itemContainer.nativeElement, "click").pipe(filter(() => this.clickable && this.currentIndex !== this.index && !this.nzDisabled), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.clickOutsideAngular$.next(this.index);
    });
  }
  enable() {
    this.nzDisabled = false;
    this.cdr.markForCheck();
  }
  disable() {
    this.nzDisabled = true;
    this.cdr.markForCheck();
  }
  markForCheck() {
    this.cdr.markForCheck();
  }
  static ɵfac = function NzStepComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzStepComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzStepComponent,
    selectors: [["nz-step"]],
    viewQuery: function NzStepComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
        ɵɵviewQuery(_c1, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.processDotTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemContainer = _t.first);
      }
    },
    hostAttrs: [1, "ant-steps-item"],
    hostVars: 16,
    hostBindings: function NzStepComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-steps-item-wait", ctx.nzStatus === "wait")("ant-steps-item-process", ctx.nzStatus === "process")("ant-steps-item-finish", ctx.nzStatus === "finish")("ant-steps-item-error", ctx.nzStatus === "error")("ant-steps-item-active", ctx.currentIndex === ctx.index)("ant-steps-item-disabled", ctx.nzDisabled)("ant-steps-item-custom", !!ctx.nzIcon)("ant-steps-next-error", ctx.outStatus === "error" && ctx.currentIndex === ctx.index + 1);
      }
    },
    inputs: {
      nzTitle: "nzTitle",
      nzSubtitle: "nzSubtitle",
      nzDescription: "nzDescription",
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzPercentage: "nzPercentage",
      nzSize: "nzSize",
      nzStatus: "nzStatus",
      nzIcon: "nzIcon"
    },
    exportAs: ["nzStep"],
    decls: 12,
    vars: 8,
    consts: [["itemContainer", ""], ["processDotTemplate", ""], [1, "ant-steps-item-container", 3, "tabindex"], [1, "ant-steps-item-tail"], [1, "ant-steps-item-icon"], [1, "ant-steps-icon"], [1, "ant-steps-item-content"], [1, "ant-steps-item-title"], [4, "nzStringTemplateOutlet"], [1, "ant-steps-item-subtitle"], [1, "ant-steps-item-description"], [1, "ant-steps-progress-icon"], ["nzType", "circle", 3, "nzPercent", "nzWidth", "nzFormat", "nzStrokeWidth"], ["nzType", "check"], ["nzType", "close"], [3, "nzType"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ant-steps-icon-dot"]],
    template: function NzStepComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 2, 0);
        ɵɵconditionalCreate(2, NzStepComponent_Conditional_2_Template, 1, 0, "div", 3);
        ɵɵelementStart(3, "div", 4);
        ɵɵconditionalCreate(4, NzStepComponent_Conditional_4_Template, 5, 5);
        ɵɵconditionalCreate(5, NzStepComponent_Conditional_5_Template, 4, 6, "span", 5);
        ɵɵelementEnd();
        ɵɵelementStart(6, "div", 6)(7, "div", 7);
        ɵɵtemplate(8, NzStepComponent_ng_container_8_Template, 2, 1, "ng-container", 8);
        ɵɵconditionalCreate(9, NzStepComponent_Conditional_9_Template, 2, 1, "div", 9);
        ɵɵelementEnd();
        ɵɵelementStart(10, "div", 10);
        ɵɵtemplate(11, NzStepComponent_ng_container_11_Template, 2, 1, "ng-container", 8);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        ɵɵproperty("tabindex", ctx.clickable && !ctx.nzDisabled ? 0 : null);
        ɵɵattribute("role", ctx.clickable && !ctx.nzDisabled ? "button" : null);
        ɵɵadvance(2);
        ɵɵconditional(!ctx.last ? 2 : -1);
        ɵɵadvance(2);
        ɵɵconditional(!ctx.showProcessDot ? 4 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.showProcessDot ? 5 : -1);
        ɵɵadvance(3);
        ɵɵproperty("nzStringTemplateOutlet", ctx.nzTitle);
        ɵɵadvance();
        ɵɵconditional(ctx.nzSubtitle ? 9 : -1);
        ɵɵadvance(2);
        ɵɵproperty("nzStringTemplateOutlet", ctx.nzDescription);
      }
    },
    dependencies: [NzProgressModule, NzProgressComponent, NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective, NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStepComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-step",
      exportAs: "nzStep",
      template: `
    <div
      #itemContainer
      class="ant-steps-item-container"
      [attr.role]="clickable && !nzDisabled ? 'button' : null"
      [tabindex]="clickable && !nzDisabled ? 0 : null"
    >
      @if (!last) {
        <div class="ant-steps-item-tail"></div>
      }
      <div class="ant-steps-item-icon">
        @if (!showProcessDot) {
          @if (showProgress) {
            <div class="ant-steps-progress-icon">
              <nz-progress
                [nzPercent]="nzPercentage"
                nzType="circle"
                [nzWidth]="nzSize === 'small' ? 32 : 40"
                [nzFormat]="nullProcessFormat"
                [nzStrokeWidth]="4"
              ></nz-progress>
            </div>
          }
          @if (nzStatus === 'finish' && !nzIcon) {
            <span class="ant-steps-icon"><nz-icon nzType="check" /></span>
          }
          @if (nzStatus === 'error') {
            <span class="ant-steps-icon"><nz-icon nzType="close" /></span>
          }
          @if ((nzStatus === 'process' || nzStatus === 'wait') && !nzIcon) {
            <span class="ant-steps-icon">
              {{ index + 1 }}
            </span>
          }
          @if (nzIcon) {
            <span class="ant-steps-icon">
              <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                <nz-icon [nzType]="icon" />
              </ng-container>
            </span>
          }
        }
        @if (showProcessDot) {
          <span class="ant-steps-icon">
            <ng-template #processDotTemplate>
              <span class="ant-steps-icon-dot"></span>
            </ng-template>
            <ng-template
              [ngTemplateOutlet]="customProcessTemplate || processDotTemplate"
              [ngTemplateOutletContext]="{
                $implicit: processDotTemplate,
                status: nzStatus,
                index: index
              }"
            ></ng-template>
          </span>
        }
      </div>
      <div class="ant-steps-item-content">
        <div class="ant-steps-item-title">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          @if (nzSubtitle) {
            <div class="ant-steps-item-subtitle">
              <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
            </div>
          }
        </div>
        <div class="ant-steps-item-description">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </div>
      </div>
    </div>
  `,
      host: {
        class: "ant-steps-item",
        "[class.ant-steps-item-wait]": 'nzStatus === "wait"',
        "[class.ant-steps-item-process]": 'nzStatus === "process"',
        "[class.ant-steps-item-finish]": 'nzStatus === "finish"',
        "[class.ant-steps-item-error]": 'nzStatus === "error"',
        "[class.ant-steps-item-active]": "currentIndex === index",
        "[class.ant-steps-item-disabled]": "nzDisabled",
        "[class.ant-steps-item-custom]": "!!nzIcon",
        "[class.ant-steps-next-error]": '(outStatus === "error") && (currentIndex === index + 1)'
      },
      imports: [NzProgressModule, NzIconModule, NzOutletModule, NgTemplateOutlet]
    }]
  }], null, {
    processDotTemplate: [{
      type: ViewChild,
      args: ["processDotTemplate", {
        static: false
      }]
    }],
    itemContainer: [{
      type: ViewChild,
      args: ["itemContainer", {
        static: true
      }]
    }],
    nzTitle: [{
      type: Input
    }],
    nzSubtitle: [{
      type: Input
    }],
    nzDescription: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPercentage: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzIcon: [{
      type: Input
    }]
  });
})();
var NzStepsComponent = class _NzStepsComponent {
  static ngAcceptInputType_nzProgressDot;
  cdr = inject(ChangeDetectorRef);
  ngZone = inject(NgZone);
  directionality = inject(Directionality);
  destroyRef = inject(DestroyRef);
  steps;
  nzCurrent = 0;
  nzDirection = "horizontal";
  nzLabelPlacement = "horizontal";
  nzType = "default";
  nzSize = "default";
  nzStartIndex = 0;
  nzStatus = "process";
  set nzProgressDot(value) {
    if (value instanceof TemplateRef) {
      this.showProcessDot = true;
      this.customProcessDotTemplate = value;
    } else {
      this.showProcessDot = toBoolean(value);
    }
    this.updateChildrenSteps();
  }
  nzIndexChange = new EventEmitter();
  indexChangeSubscription = Subscription.EMPTY;
  showProcessDot = false;
  showProgress = false;
  customProcessDotTemplate;
  dir = "ltr";
  ngOnChanges(changes) {
    const {
      nzStartIndex,
      nzDirection,
      nzStatus,
      nzCurrent,
      nzSize
    } = changes;
    if (nzStartIndex || nzDirection || nzStatus || nzCurrent || nzSize) {
      this.updateChildrenSteps();
    }
  }
  ngOnInit() {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
    this.updateChildrenSteps();
  }
  ngAfterContentInit() {
    if (this.steps) {
      this.steps.changes.pipe(startWith(null), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateHostProgressClass();
        this.updateChildrenSteps();
      });
    }
  }
  updateHostProgressClass() {
    if (this.steps && !this.showProcessDot) {
      this.showProgress = !!this.steps.toArray().find((step) => step.nzPercentage !== null);
    }
  }
  updateChildrenSteps() {
    if (this.steps) {
      const length = this.steps.length;
      this.steps.toArray().forEach((step, index) => {
        Promise.resolve().then(() => {
          step.nzSize = this.nzSize;
          step.outStatus = this.nzStatus;
          step.showProcessDot = this.showProcessDot;
          if (this.customProcessDotTemplate) {
            step.customProcessTemplate = this.customProcessDotTemplate;
          }
          step.clickable = this.nzIndexChange.observers.length > 0;
          step.direction = this.nzDirection;
          step.index = index + this.nzStartIndex;
          step.currentIndex = this.nzCurrent;
          step.last = length === index + 1;
          step.markForCheck();
        });
      });
      this.indexChangeSubscription.unsubscribe();
      this.indexChangeSubscription = merge(...this.steps.map((step) => step.clickOutsideAngular$)).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((index) => {
        if (this.nzIndexChange.observers.length) {
          this.ngZone.run(() => this.nzIndexChange.emit(index));
        }
      });
    }
  }
  static ɵfac = function NzStepsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzStepsComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzStepsComponent,
    selectors: [["nz-steps"]],
    contentQueries: function NzStepsComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, NzStepComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.steps = _t);
      }
    },
    hostAttrs: [1, "ant-steps"],
    hostVars: 18,
    hostBindings: function NzStepsComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-steps-horizontal", ctx.nzDirection === "horizontal")("ant-steps-vertical", ctx.nzDirection === "vertical")("ant-steps-label-horizontal", ctx.nzDirection === "horizontal")("ant-steps-label-vertical", (ctx.showProcessDot || ctx.nzLabelPlacement === "vertical") && ctx.nzDirection === "horizontal")("ant-steps-dot", ctx.showProcessDot)("ant-steps-small", ctx.nzSize === "small")("ant-steps-navigation", ctx.nzType === "navigation")("ant-steps-rtl", ctx.dir === "rtl")("ant-steps-with-progress", ctx.showProgress);
      }
    },
    inputs: {
      nzCurrent: "nzCurrent",
      nzDirection: "nzDirection",
      nzLabelPlacement: "nzLabelPlacement",
      nzType: "nzType",
      nzSize: "nzSize",
      nzStartIndex: "nzStartIndex",
      nzStatus: "nzStatus",
      nzProgressDot: "nzProgressDot"
    },
    outputs: {
      nzIndexChange: "nzIndexChange"
    },
    exportAs: ["nzSteps"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c3,
    decls: 1,
    vars: 0,
    template: function NzStepsComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStepsComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-steps",
      exportAs: "nzSteps",
      template: `<ng-content></ng-content>`,
      host: {
        class: "ant-steps",
        "[class.ant-steps-horizontal]": `nzDirection === 'horizontal'`,
        "[class.ant-steps-vertical]": `nzDirection === 'vertical'`,
        "[class.ant-steps-label-horizontal]": `nzDirection === 'horizontal'`,
        "[class.ant-steps-label-vertical]": `(showProcessDot || nzLabelPlacement === 'vertical') && nzDirection === 'horizontal'`,
        "[class.ant-steps-dot]": "showProcessDot",
        "[class.ant-steps-small]": `nzSize === 'small'`,
        "[class.ant-steps-navigation]": `nzType === 'navigation'`,
        "[class.ant-steps-rtl]": `dir === 'rtl'`,
        "[class.ant-steps-with-progress]": "showProgress"
      }
    }]
  }], null, {
    steps: [{
      type: ContentChildren,
      args: [NzStepComponent]
    }],
    nzCurrent: [{
      type: Input
    }],
    nzDirection: [{
      type: Input
    }],
    nzLabelPlacement: [{
      type: Input
    }],
    nzType: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzStartIndex: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzProgressDot: [{
      type: Input
    }],
    nzIndexChange: [{
      type: Output
    }]
  });
})();
var NzStepsModule = class _NzStepsModule {
  static ɵfac = function NzStepsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzStepsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzStepsModule,
    imports: [NzStepsComponent, NzStepComponent],
    exports: [NzStepsComponent, NzStepComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [NzStepComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStepsModule, [{
    type: NgModule,
    args: [{
      imports: [NzStepsComponent, NzStepComponent],
      exports: [NzStepsComponent, NzStepComponent]
    }]
  }], null, null);
})();
export {
  NzStepComponent,
  NzStepsComponent,
  NzStepsModule
};
//# sourceMappingURL=ng-zorro-antd_steps.js.map
