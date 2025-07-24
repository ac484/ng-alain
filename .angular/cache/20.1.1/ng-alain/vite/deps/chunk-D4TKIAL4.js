import {
  NzFormItemFeedbackIconComponent,
  NzFormNoStatusService,
  NzFormStatusService
} from "./chunk-JCLL7S6Q.js";
import {
  DateHelperService,
  NzI18nModule,
  NzI18nPipe,
  NzI18nService
} from "./chunk-VCVGLQF3.js";
import {
  NzButtonComponent,
  NzButtonModule
} from "./chunk-MKB5HFAJ.js";
import {
  NzWaveDirective
} from "./chunk-KEGEU5UL.js";
import {
  NzTransitionPatchDirective
} from "./chunk-FBEQODFK.js";
import {
  NZ_SPACE_COMPACT_ITEM_TYPE,
  NZ_SPACE_COMPACT_SIZE,
  NzSpaceCompactItemDirective
} from "./chunk-HXEEJHXJ.js";
import {
  requestAnimationFrame
} from "./chunk-QYDDKLT3.js";
import {
  isValid
} from "./chunk-BHH4M3PU.js";
import {
  NzConnectedOverlayDirective,
  NzOverlayModule
} from "./chunk-C6MTXAAB.js";
import {
  CdkConnectedOverlay,
  OverlayModule
} from "./chunk-U5VATZ4Q.js";
import {
  slideMotion
} from "./chunk-RH5RXJTD.js";
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-GP3H6RZA.js";
import {
  NzConfigService,
  WithConfig
} from "./chunk-LSG4V6ID.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-KG76OIXO.js";
import {
  fromEventOutsideAngular,
  getStatusClassNames,
  isNil,
  isNotNil,
  warn
} from "./chunk-J25EALHE.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-ZWI5T7AR.js";
import {
  takeUntilDestroyed
} from "./chunk-I75K2H66.js";
import {
  Directionality
} from "./chunk-TBGMZLZ3.js";
import {
  Platform,
  _getEventTarget
} from "./chunk-GIT7CFOZ.js";
import {
  AsyncPipe,
  DecimalPipe,
  NgTemplateOutlet
} from "./chunk-GUTSRBNM.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-NQBXVTYU.js";
import {
  DestroyRef,
  computed,
  forwardRef,
  inject,
  signal,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import {
  Subject,
  __esDecorate,
  __runInitializers,
  distinctUntilChanged,
  map,
  of,
  withLatestFrom
} from "./chunk-EBAU53KC.js";
import {
  __publicField
} from "./chunk-7CE4I3X6.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-time-picker.mjs
var _c0 = ["hourListElement"];
var _c1 = ["minuteListElement"];
var _c2 = ["secondListElement"];
var _c3 = ["use12HoursListElement"];
function NzTimePickerPanelComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4)(1, "div", 8);
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.dateHelper.format(ctx_r0.time == null ? null : ctx_r0.time.value, ctx_r0.format) || " ");
  }
}
function NzTimePickerPanelComponent_Conditional_2_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 10);
    ɵɵlistener("click", function NzTimePickerPanelComponent_Conditional_2_For_3_Conditional_0_Template_li_click_0_listener() {
      ɵɵrestoreView(_r2);
      const hour_r3 = ɵɵnextContext().$implicit;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.selectHour(hour_r3));
    });
    ɵɵelementStart(1, "div", 11);
    ɵɵtext(2);
    ɵɵpipe(3, "number");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const hour_r3 = ɵɵnextContext().$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelectedHour(hour_r3))("ant-picker-time-panel-cell-disabled", hour_r3.disabled);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind2(3, 5, hour_r3.index, "2.0-0"));
  }
}
function NzTimePickerPanelComponent_Conditional_2_For_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzTimePickerPanelComponent_Conditional_2_For_3_Conditional_0_Template, 4, 8, "li", 9);
  }
  if (rf & 2) {
    const hour_r3 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵconditional(!(ctx_r0.nzHideDisabledOptions && hour_r3.disabled) ? 0 : -1);
  }
}
function NzTimePickerPanelComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 6, 0);
    ɵɵrepeaterCreate(2, NzTimePickerPanelComponent_Conditional_2_For_3_Template, 1, 1, null, null, ɵɵrepeaterTrackByIndex);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵrepeater(ctx_r0.hourRange);
  }
}
function NzTimePickerPanelComponent_Conditional_3_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 10);
    ɵɵlistener("click", function NzTimePickerPanelComponent_Conditional_3_For_3_Conditional_0_Template_li_click_0_listener() {
      ɵɵrestoreView(_r4);
      const minute_r5 = ɵɵnextContext().$implicit;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.selectMinute(minute_r5));
    });
    ɵɵelementStart(1, "div", 11);
    ɵɵtext(2);
    ɵɵpipe(3, "number");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const minute_r5 = ɵɵnextContext().$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelectedMinute(minute_r5))("ant-picker-time-panel-cell-disabled", minute_r5.disabled);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind2(3, 5, minute_r5.index, "2.0-0"));
  }
}
function NzTimePickerPanelComponent_Conditional_3_For_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzTimePickerPanelComponent_Conditional_3_For_3_Conditional_0_Template, 4, 8, "li", 9);
  }
  if (rf & 2) {
    const minute_r5 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵconditional(!(ctx_r0.nzHideDisabledOptions && minute_r5.disabled) ? 0 : -1);
  }
}
function NzTimePickerPanelComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 6, 1);
    ɵɵrepeaterCreate(2, NzTimePickerPanelComponent_Conditional_3_For_3_Template, 1, 1, null, null, ɵɵrepeaterTrackByIndex);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵrepeater(ctx_r0.minuteRange);
  }
}
function NzTimePickerPanelComponent_Conditional_4_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 10);
    ɵɵlistener("click", function NzTimePickerPanelComponent_Conditional_4_For_3_Conditional_0_Template_li_click_0_listener() {
      ɵɵrestoreView(_r6);
      const second_r7 = ɵɵnextContext().$implicit;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.selectSecond(second_r7));
    });
    ɵɵelementStart(1, "div", 11);
    ɵɵtext(2);
    ɵɵpipe(3, "number");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const second_r7 = ɵɵnextContext().$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelectedSecond(second_r7))("ant-picker-time-panel-cell-disabled", second_r7.disabled);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind2(3, 5, second_r7.index, "2.0-0"));
  }
}
function NzTimePickerPanelComponent_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzTimePickerPanelComponent_Conditional_4_For_3_Conditional_0_Template, 4, 8, "li", 9);
  }
  if (rf & 2) {
    const second_r7 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵconditional(!(ctx_r0.nzHideDisabledOptions && second_r7.disabled) ? 0 : -1);
  }
}
function NzTimePickerPanelComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 6, 2);
    ɵɵrepeaterCreate(2, NzTimePickerPanelComponent_Conditional_4_For_3_Template, 1, 1, null, null, ɵɵrepeaterTrackByIndex);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵrepeater(ctx_r0.secondRange);
  }
}
function NzTimePickerPanelComponent_Conditional_5_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 10);
    ɵɵlistener("click", function NzTimePickerPanelComponent_Conditional_5_For_3_Template_li_click_0_listener() {
      const range_r9 = ɵɵrestoreView(_r8).$implicit;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.select12Hours(range_r9));
    });
    ɵɵelementStart(1, "div", 11);
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const range_r9 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelected12Hours(range_r9));
    ɵɵadvance(2);
    ɵɵtextInterpolate(range_r9.value);
  }
}
function NzTimePickerPanelComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 6, 3);
    ɵɵrepeaterCreate(2, NzTimePickerPanelComponent_Conditional_5_For_3_Template, 3, 3, "li", 12, ɵɵrepeaterTrackByIdentity);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵrepeater(ctx_r0.use12HoursRange);
  }
}
function NzTimePickerPanelComponent_Conditional_6_Conditional_1_ng_template_1_Template(rf, ctx) {
}
function NzTimePickerPanelComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 13);
    ɵɵtemplate(1, NzTimePickerPanelComponent_Conditional_6_Conditional_1_ng_template_1_Template, 0, 0, "ng-template", 19);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.nzAddOn);
  }
}
function NzTimePickerPanelComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7);
    ɵɵconditionalCreate(1, NzTimePickerPanelComponent_Conditional_6_Conditional_1_Template, 2, 1, "div", 13);
    ɵɵelementStart(2, "ul", 14)(3, "li", 15)(4, "a", 16);
    ɵɵlistener("click", function NzTimePickerPanelComponent_Conditional_6_Template_a_click_4_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onClickNow());
    });
    ɵɵtext(5);
    ɵɵpipe(6, "nzI18n");
    ɵɵelementEnd()();
    ɵɵelementStart(7, "li", 17)(8, "button", 18);
    ɵɵlistener("click", function NzTimePickerPanelComponent_Conditional_6_Template_button_click_8_listener() {
      ɵɵrestoreView(_r10);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onClickOk());
    });
    ɵɵtext(9);
    ɵɵpipe(10, "nzI18n");
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r0.nzAddOn ? 1 : -1);
    ɵɵadvance(4);
    ɵɵtextInterpolate1(" ", ctx_r0.nzNowText || ɵɵpipeBind1(6, 3, "Calendar.lang.now"), " ");
    ɵɵadvance(4);
    ɵɵtextInterpolate1(" ", ctx_r0.nzOkText || ɵɵpipeBind1(10, 5, "Calendar.lang.ok"), " ");
  }
}
var _c4 = ["inputElement"];
function NzTimePickerComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "nz-icon", 8);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const suffixIcon_r2 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("nzType", suffixIcon_r2);
  }
}
function NzTimePickerComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-form-item-feedback-icon", 5);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("status", ctx_r2.status);
  }
}
function NzTimePickerComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 9);
    ɵɵlistener("click", function NzTimePickerComponent_Conditional_7_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onClickClearBtn($event));
    });
    ɵɵelement(1, "nz-icon", 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵattribute("aria-label", ctx_r2.nzClearText)("title", ctx_r2.nzClearText);
  }
}
function NzTimePickerComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 11)(1, "div", 12)(2, "div", 13)(3, "nz-time-picker-panel", 14);
    ɵɵpipe(4, "async");
    ɵɵtwoWayListener("ngModelChange", function NzTimePickerComponent_ng_template_8_Template_nz_time_picker_panel_ngModelChange_3_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      ɵɵtwoWayBindingSet(ctx_r2.value, $event) || (ctx_r2.value = $event);
      return ɵɵresetView($event);
    });
    ɵɵlistener("ngModelChange", function NzTimePickerComponent_ng_template_8_Template_nz_time_picker_panel_ngModelChange_3_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onPanelValueChange($event));
    })("closePanel", function NzTimePickerComponent_ng_template_8_Template_nz_time_picker_panel_closePanel_3_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.closePanel());
    });
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("@slideMotion", "enter");
    ɵɵadvance(3);
    ɵɵclassMap(ctx_r2.nzPopupClassName);
    ɵɵproperty("format", ctx_r2.nzFormat)("nzHourStep", ctx_r2.nzHourStep)("nzMinuteStep", ctx_r2.nzMinuteStep)("nzSecondStep", ctx_r2.nzSecondStep)("nzDisabledHours", ctx_r2.nzDisabledHours)("nzDisabledMinutes", ctx_r2.nzDisabledMinutes)("nzDisabledSeconds", ctx_r2.nzDisabledSeconds)("nzPlaceHolder", ctx_r2.nzPlaceHolder || ɵɵpipeBind1(4, 20, ctx_r2.i18nPlaceHolder$))("nzHideDisabledOptions", ctx_r2.nzHideDisabledOptions)("nzUse12Hours", ctx_r2.nzUse12Hours)("nzDefaultOpenValue", ctx_r2.nzDefaultOpenValue)("nzAddOn", ctx_r2.nzAddOn)("nzClearText", ctx_r2.nzClearText)("nzNowText", ctx_r2.nzNowText)("nzOkText", ctx_r2.nzOkText)("nzAllowEmpty", ctx_r2.nzAllowEmpty);
    ɵɵtwoWayProperty("ngModel", ctx_r2.value);
  }
}
var TimeHolder = class {
  selected12Hours = void 0;
  _value;
  _use12Hours = false;
  _defaultOpenValue;
  _changes = new Subject();
  setMinutes(value, disabled) {
    if (!disabled) {
      this.initValue();
      this.value.setMinutes(value);
      this.update();
    }
    return this;
  }
  setHours(value, disabled) {
    if (!disabled) {
      this.initValue();
      if (this._use12Hours) {
        if (this.selected12Hours === "PM" && value !== 12) {
          this.value.setHours(value + 12);
        } else if (this.selected12Hours === "AM" && value === 12) {
          this.value.setHours(0);
        } else {
          this.value.setHours(value);
        }
      } else {
        this.value.setHours(value);
      }
      this.update();
    }
    return this;
  }
  setSeconds(value, disabled) {
    if (!disabled) {
      this.initValue();
      this.value.setSeconds(value);
      this.update();
    }
    return this;
  }
  setUse12Hours(value) {
    this._use12Hours = value;
    return this;
  }
  get changes() {
    return this._changes.asObservable();
  }
  setValue(value, use12Hours) {
    if (isNotNil(use12Hours)) {
      this._use12Hours = use12Hours;
    }
    if (value !== this.value) {
      this._value = value;
      if (isNotNil(this.value)) {
        if (this._use12Hours && isNotNil(this.hours)) {
          this.selected12Hours = this.hours >= 12 ? "PM" : "AM";
        }
      } else {
        this._clear();
      }
    }
    return this;
  }
  initValue() {
    if (isNil(this.value)) {
      this.setValue(/* @__PURE__ */ new Date(), this._use12Hours);
    }
  }
  clear() {
    this._clear();
    this.update();
  }
  get isEmpty() {
    return !(isNotNil(this.hours) || isNotNil(this.minutes) || isNotNil(this.seconds));
  }
  _clear() {
    this._value = void 0;
    this.selected12Hours = void 0;
  }
  update() {
    if (this.isEmpty) {
      this._value = void 0;
    } else {
      if (isNotNil(this.hours)) {
        this.value.setHours(this.hours);
      }
      if (isNotNil(this.minutes)) {
        this.value.setMinutes(this.minutes);
      }
      if (isNotNil(this.seconds)) {
        this.value.setSeconds(this.seconds);
      }
      if (this._use12Hours) {
        if (this.selected12Hours === "PM" && this.hours < 12) {
          this.value.setHours(this.hours + 12);
        }
        if (this.selected12Hours === "AM" && this.hours >= 12) {
          this.value.setHours(this.hours - 12);
        }
      }
    }
    this.changed();
  }
  changed() {
    this._changes.next(this.value);
  }
  /**
   * @description
   * UI view hours
   * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
   */
  get viewHours() {
    return this._use12Hours && isNotNil(this.hours) ? this.calculateViewHour(this.hours) : this.hours;
  }
  setSelected12Hours(value) {
    if (value.toUpperCase() !== this.selected12Hours) {
      this.selected12Hours = value.toUpperCase();
      this.update();
    }
  }
  get value() {
    return this._value || this._defaultOpenValue;
  }
  get hours() {
    return this.value?.getHours();
  }
  get minutes() {
    return this.value?.getMinutes();
  }
  get seconds() {
    return this.value?.getSeconds();
  }
  setDefaultOpenValue(value) {
    this._defaultOpenValue = value;
    return this;
  }
  calculateViewHour(value) {
    const selected12Hours = this.selected12Hours;
    if (selected12Hours === "PM" && value > 12) {
      return value - 12;
    }
    if (selected12Hours === "AM" && value === 0) {
      return 12;
    }
    return value;
  }
};
function makeRange(length, step = 1, start = 0) {
  return new Array(Math.ceil(length / step)).fill(0).map((_, i) => (i + start) * step);
}
var NzTimePickerPanelComponent = class _NzTimePickerPanelComponent {
  dateHelper = inject(DateHelperService);
  ngZone = inject(NgZone);
  cdr = inject(ChangeDetectorRef);
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);
  _nzHourStep = 1;
  _nzMinuteStep = 1;
  _nzSecondStep = 1;
  onChange;
  onTouch;
  _format = "HH:mm:ss";
  _disabledHours = () => [];
  _disabledMinutes = () => [];
  _disabledSeconds = () => [];
  _allowEmpty = true;
  time = new TimeHolder();
  hourEnabled = true;
  minuteEnabled = true;
  secondEnabled = true;
  firstScrolled = false;
  enabledColumns = 3;
  hourRange;
  minuteRange;
  secondRange;
  use12HoursRange;
  hourListElement;
  minuteListElement;
  secondListElement;
  use12HoursListElement;
  nzInDatePicker = false;
  // If inside a date-picker, more diff works need to be done
  nzAddOn;
  nzHideDisabledOptions = false;
  nzClearText;
  nzNowText;
  nzOkText;
  nzPlaceHolder;
  nzUse12Hours = false;
  nzDefaultOpenValue;
  closePanel = new EventEmitter();
  set nzAllowEmpty(value) {
    this._allowEmpty = value;
  }
  get nzAllowEmpty() {
    return this._allowEmpty;
  }
  set nzDisabledHours(value) {
    this._disabledHours = value;
    if (this._disabledHours) {
      this.buildHours();
    }
  }
  get nzDisabledHours() {
    return this._disabledHours;
  }
  set nzDisabledMinutes(value) {
    if (isNotNil(value)) {
      this._disabledMinutes = value;
      this.buildMinutes();
    }
  }
  get nzDisabledMinutes() {
    return this._disabledMinutes;
  }
  set nzDisabledSeconds(value) {
    if (isNotNil(value)) {
      this._disabledSeconds = value;
      this.buildSeconds();
    }
  }
  get nzDisabledSeconds() {
    return this._disabledSeconds;
  }
  set format(value) {
    if (isNotNil(value)) {
      this._format = value;
      this.enabledColumns = 0;
      const charSet = new Set(value);
      this.hourEnabled = charSet.has("H") || charSet.has("h");
      this.minuteEnabled = charSet.has("m");
      this.secondEnabled = charSet.has("s");
      if (this.hourEnabled) {
        this.enabledColumns++;
      }
      if (this.minuteEnabled) {
        this.enabledColumns++;
      }
      if (this.secondEnabled) {
        this.enabledColumns++;
      }
      if (this.nzUse12Hours) {
        this.build12Hours();
      }
    }
  }
  get format() {
    return this._format;
  }
  set nzHourStep(value) {
    this._nzHourStep = value || 1;
    this.buildHours();
  }
  get nzHourStep() {
    return this._nzHourStep;
  }
  set nzMinuteStep(value) {
    this._nzMinuteStep = value || 1;
    this.buildMinutes();
  }
  get nzMinuteStep() {
    return this._nzMinuteStep;
  }
  set nzSecondStep(value) {
    this._nzSecondStep = value || 1;
    this.buildSeconds();
  }
  get nzSecondStep() {
    return this._nzSecondStep;
  }
  buildHours() {
    let hourRanges = 24;
    let disabledHours = this.nzDisabledHours?.();
    let startIndex = 0;
    if (this.nzUse12Hours) {
      hourRanges = 12;
      if (disabledHours) {
        if (this.time.selected12Hours === "PM") {
          disabledHours = disabledHours.filter((i) => i >= 12).map((i) => i > 12 ? i - 12 : i);
        } else {
          disabledHours = disabledHours.filter((i) => i < 12 || i === 24).map((i) => i === 24 || i === 0 ? 12 : i);
        }
      }
      startIndex = 1;
    }
    this.hourRange = makeRange(hourRanges, this.nzHourStep, startIndex).map((r) => ({
      index: r,
      disabled: !!disabledHours && disabledHours.indexOf(r) !== -1
    }));
    if (this.nzUse12Hours && this.hourRange[this.hourRange.length - 1].index === 12) {
      const temp = [...this.hourRange];
      temp.unshift(temp[temp.length - 1]);
      temp.splice(temp.length - 1, 1);
      this.hourRange = temp;
    }
  }
  buildMinutes() {
    this.minuteRange = makeRange(60, this.nzMinuteStep).map((r) => ({
      index: r,
      disabled: !!this.nzDisabledMinutes && this.nzDisabledMinutes(this.time.hours).indexOf(r) !== -1
    }));
  }
  buildSeconds() {
    this.secondRange = makeRange(60, this.nzSecondStep).map((r) => ({
      index: r,
      disabled: !!this.nzDisabledSeconds && this.nzDisabledSeconds(this.time.hours, this.time.minutes).indexOf(r) !== -1
    }));
  }
  build12Hours() {
    const isUpperFormat = this._format.includes("A");
    this.use12HoursRange = [{
      index: 0,
      value: isUpperFormat ? "AM" : "am"
    }, {
      index: 1,
      value: isUpperFormat ? "PM" : "pm"
    }];
  }
  buildTimes() {
    this.buildHours();
    this.buildMinutes();
    this.buildSeconds();
    this.build12Hours();
  }
  scrollToTime(delay = 0) {
    if (this.hourEnabled && this.hourListElement) {
      this.scrollToSelected(this.hourListElement.nativeElement, this.time.viewHours, delay, "hour");
    }
    if (this.minuteEnabled && this.minuteListElement) {
      this.scrollToSelected(this.minuteListElement.nativeElement, this.time.minutes, delay, "minute");
    }
    if (this.secondEnabled && this.secondListElement) {
      this.scrollToSelected(this.secondListElement.nativeElement, this.time.seconds, delay, "second");
    }
    if (this.nzUse12Hours && this.use12HoursListElement) {
      const selectedHours = this.time.selected12Hours;
      const index = selectedHours === "AM" ? 0 : 1;
      this.scrollToSelected(this.use12HoursListElement.nativeElement, index, delay, "12-hour");
    }
  }
  selectHour(hour) {
    this.time.setHours(hour.index, hour.disabled);
    if (this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds || this._disabledMinutes) {
      this.buildSeconds();
    }
  }
  selectMinute(minute) {
    this.time.setMinutes(minute.index, minute.disabled);
    if (this._disabledSeconds) {
      this.buildSeconds();
    }
  }
  selectSecond(second) {
    this.time.setSeconds(second.index, second.disabled);
  }
  select12Hours(value) {
    this.time.setSelected12Hours(value.value);
    if (this._disabledHours) {
      this.buildHours();
    }
    if (this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds) {
      this.buildSeconds();
    }
  }
  scrollToSelected(instance, index, duration = 0, unit) {
    if (!instance) {
      return;
    }
    const transIndex = this.translateIndex(index, unit);
    const currentOption = instance.children[transIndex] || instance.children[0];
    this.scrollTo(instance, currentOption.offsetTop, duration);
  }
  translateIndex(index, unit) {
    if (unit === "hour") {
      return this.calcIndex(this.nzDisabledHours?.(), this.hourRange.map((item) => item.index).indexOf(index));
    } else if (unit === "minute") {
      return this.calcIndex(this.nzDisabledMinutes?.(this.time.hours), this.minuteRange.map((item) => item.index).indexOf(index));
    } else if (unit === "second") {
      return this.calcIndex(this.nzDisabledSeconds?.(this.time.hours, this.time.minutes), this.secondRange.map((item) => item.index).indexOf(index));
    } else {
      return this.calcIndex([], this.use12HoursRange.map((item) => item.index).indexOf(index));
    }
  }
  scrollTo(element, to, duration) {
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) {
          return;
        }
        this.scrollTo(element, to, duration - 10);
      });
    });
  }
  calcIndex(array, index) {
    if (array?.length && this.nzHideDisabledOptions) {
      return index - array.reduce((pre, value) => pre + (value < index ? 1 : 0), 0);
    } else {
      return index;
    }
  }
  changed() {
    if (this.onChange) {
      this.onChange(this.time.value);
    }
  }
  touched() {
    if (this.onTouch) {
      this.onTouch();
    }
  }
  timeDisabled(value) {
    const hour = value.getHours();
    const minute = value.getMinutes();
    const second = value.getSeconds();
    return (this.nzDisabledHours?.().indexOf(hour) ?? -1) > -1 || (this.nzDisabledMinutes?.(hour).indexOf(minute) ?? -1) > -1 || (this.nzDisabledSeconds?.(hour, minute).indexOf(second) ?? -1) > -1;
  }
  onClickNow() {
    const now = /* @__PURE__ */ new Date();
    if (this.timeDisabled(now)) {
      return;
    }
    this.time.setValue(now);
    this.changed();
    this.closePanel.emit();
  }
  onClickOk() {
    this.time.setValue(this.time.value, this.nzUse12Hours);
    this.changed();
    this.closePanel.emit();
  }
  isSelectedHour(hour) {
    return hour.index === this.time.viewHours;
  }
  isSelectedMinute(minute) {
    return minute.index === this.time.minutes;
  }
  isSelectedSecond(second) {
    return second.index === this.time.seconds;
  }
  isSelected12Hours(value) {
    return value.value.toUpperCase() === this.time.selected12Hours;
  }
  ngOnInit() {
    this.time.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.changed();
      this.touched();
      this.scrollToTime(120);
    });
    this.buildTimes();
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.scrollToTime();
        this.firstScrolled = true;
      });
    });
    fromEventOutsideAngular(this.elementRef.nativeElement, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      event.preventDefault();
    });
  }
  ngOnChanges(changes) {
    const {
      nzUse12Hours,
      nzDefaultOpenValue
    } = changes;
    if (!nzUse12Hours?.previousValue && nzUse12Hours?.currentValue) {
      this.build12Hours();
      this.enabledColumns++;
    }
    if (nzDefaultOpenValue?.currentValue) {
      this.time.setDefaultOpenValue(this.nzDefaultOpenValue || /* @__PURE__ */ new Date());
    }
  }
  writeValue(value) {
    this.time.setValue(value, this.nzUse12Hours);
    this.buildTimes();
    if (value && this.firstScrolled) {
      this.scrollToTime(120);
    }
    this.cdr.markForCheck();
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  static ɵfac = function NzTimePickerPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTimePickerPanelComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTimePickerPanelComponent,
    selectors: [["nz-time-picker-panel"]],
    viewQuery: function NzTimePickerPanelComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
        ɵɵviewQuery(_c1, 5);
        ɵɵviewQuery(_c2, 5);
        ɵɵviewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.hourListElement = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.minuteListElement = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.secondListElement = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.use12HoursListElement = _t.first);
      }
    },
    hostAttrs: [1, "ant-picker-time-panel"],
    hostVars: 12,
    hostBindings: function NzTimePickerPanelComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-picker-time-panel-column-0", ctx.enabledColumns === 0 && !ctx.nzInDatePicker)("ant-picker-time-panel-column-1", ctx.enabledColumns === 1 && !ctx.nzInDatePicker)("ant-picker-time-panel-column-2", ctx.enabledColumns === 2 && !ctx.nzInDatePicker)("ant-picker-time-panel-column-3", ctx.enabledColumns === 3 && !ctx.nzInDatePicker)("ant-picker-time-panel-narrow", ctx.enabledColumns < 3)("ant-picker-time-panel-placement-bottomLeft", !ctx.nzInDatePicker);
      }
    },
    inputs: {
      nzInDatePicker: [2, "nzInDatePicker", "nzInDatePicker", booleanAttribute],
      nzAddOn: "nzAddOn",
      nzHideDisabledOptions: "nzHideDisabledOptions",
      nzClearText: "nzClearText",
      nzNowText: "nzNowText",
      nzOkText: "nzOkText",
      nzPlaceHolder: "nzPlaceHolder",
      nzUse12Hours: [2, "nzUse12Hours", "nzUse12Hours", booleanAttribute],
      nzDefaultOpenValue: "nzDefaultOpenValue",
      nzAllowEmpty: [2, "nzAllowEmpty", "nzAllowEmpty", booleanAttribute],
      nzDisabledHours: "nzDisabledHours",
      nzDisabledMinutes: "nzDisabledMinutes",
      nzDisabledSeconds: "nzDisabledSeconds",
      format: "format",
      nzHourStep: [2, "nzHourStep", "nzHourStep", numberAttribute],
      nzMinuteStep: [2, "nzMinuteStep", "nzMinuteStep", numberAttribute],
      nzSecondStep: [2, "nzSecondStep", "nzSecondStep", numberAttribute]
    },
    outputs: {
      closePanel: "closePanel"
    },
    exportAs: ["nzTimePickerPanel"],
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _NzTimePickerPanelComponent),
      multi: true
    }]), ɵɵNgOnChangesFeature],
    decls: 7,
    vars: 6,
    consts: [["hourListElement", ""], ["minuteListElement", ""], ["secondListElement", ""], ["use12HoursListElement", ""], [1, "ant-picker-header"], [1, "ant-picker-content"], [1, "ant-picker-time-panel-column", 2, "position", "relative"], [1, "ant-picker-footer"], [1, "ant-picker-header-view"], [1, "ant-picker-time-panel-cell", 3, "ant-picker-time-panel-cell-selected", "ant-picker-time-panel-cell-disabled"], [1, "ant-picker-time-panel-cell", 3, "click"], [1, "ant-picker-time-panel-cell-inner"], [1, "ant-picker-time-panel-cell", 3, "ant-picker-time-panel-cell-selected"], [1, "ant-picker-footer-extra"], [1, "ant-picker-ranges"], [1, "ant-picker-now"], [3, "click"], [1, "ant-picker-ok"], ["nz-button", "", "type", "button", "nzSize", "small", "nzType", "primary", 3, "click"], [3, "ngTemplateOutlet"]],
    template: function NzTimePickerPanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, NzTimePickerPanelComponent_Conditional_0_Template, 3, 1, "div", 4);
        ɵɵelementStart(1, "div", 5);
        ɵɵconditionalCreate(2, NzTimePickerPanelComponent_Conditional_2_Template, 4, 0, "ul", 6);
        ɵɵconditionalCreate(3, NzTimePickerPanelComponent_Conditional_3_Template, 4, 0, "ul", 6);
        ɵɵconditionalCreate(4, NzTimePickerPanelComponent_Conditional_4_Template, 4, 0, "ul", 6);
        ɵɵconditionalCreate(5, NzTimePickerPanelComponent_Conditional_5_Template, 4, 0, "ul", 6);
        ɵɵelementEnd();
        ɵɵconditionalCreate(6, NzTimePickerPanelComponent_Conditional_6_Template, 11, 7, "div", 7);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.nzInDatePicker ? 0 : -1);
        ɵɵadvance(2);
        ɵɵconditional(ctx.hourEnabled ? 2 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.minuteEnabled ? 3 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.secondEnabled ? 4 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.nzUse12Hours ? 5 : -1);
        ɵɵadvance();
        ɵɵconditional(!ctx.nzInDatePicker ? 6 : -1);
      }
    },
    dependencies: [NgTemplateOutlet, NzI18nModule, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, DecimalPipe, NzI18nPipe],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimePickerPanelComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "nz-time-picker-panel",
      exportAs: "nzTimePickerPanel",
      template: `
    @if (nzInDatePicker) {
      <div class="ant-picker-header">
        <div class="ant-picker-header-view">{{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}</div>
      </div>
    }
    <div class="ant-picker-content">
      @if (hourEnabled) {
        <ul #hourListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (hour of hourRange; track $index) {
            @if (!(nzHideDisabledOptions && hour.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectHour(hour)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedHour(hour)"
                [class.ant-picker-time-panel-cell-disabled]="hour.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ hour.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (minuteEnabled) {
        <ul #minuteListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (minute of minuteRange; track $index) {
            @if (!(nzHideDisabledOptions && minute.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectMinute(minute)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedMinute(minute)"
                [class.ant-picker-time-panel-cell-disabled]="minute.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ minute.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (secondEnabled) {
        <ul #secondListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (second of secondRange; track $index) {
            @if (!(nzHideDisabledOptions && second.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectSecond(second)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedSecond(second)"
                [class.ant-picker-time-panel-cell-disabled]="second.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ second.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (nzUse12Hours) {
        <ul #use12HoursListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (range of use12HoursRange; track range) {
            <li
              (click)="select12Hours(range)"
              class="ant-picker-time-panel-cell"
              [class.ant-picker-time-panel-cell-selected]="isSelected12Hours(range)"
            >
              <div class="ant-picker-time-panel-cell-inner">{{ range.value }}</div>
            </li>
          }
        </ul>
      }
    </div>
    @if (!nzInDatePicker) {
      <div class="ant-picker-footer">
        @if (nzAddOn) {
          <div class="ant-picker-footer-extra">
            <ng-template [ngTemplateOutlet]="nzAddOn"></ng-template>
          </div>
        }
        <ul class="ant-picker-ranges">
          <li class="ant-picker-now">
            <a (click)="onClickNow()">
              {{ nzNowText || ('Calendar.lang.now' | nzI18n) }}
            </a>
          </li>
          <li class="ant-picker-ok">
            <button nz-button type="button" nzSize="small" nzType="primary" (click)="onClickOk()">
              {{ nzOkText || ('Calendar.lang.ok' | nzI18n) }}
            </button>
          </li>
        </ul>
      </div>
    }
  `,
      host: {
        class: "ant-picker-time-panel",
        "[class.ant-picker-time-panel-column-0]": `enabledColumns === 0 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-column-1]": `enabledColumns === 1 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-column-2]": `enabledColumns === 2 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-column-3]": `enabledColumns === 3 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-narrow]": `enabledColumns < 3`,
        "[class.ant-picker-time-panel-placement-bottomLeft]": `!nzInDatePicker`
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzTimePickerPanelComponent),
        multi: true
      }],
      imports: [DecimalPipe, NgTemplateOutlet, NzI18nModule, NzButtonModule]
    }]
  }], null, {
    hourListElement: [{
      type: ViewChild,
      args: ["hourListElement", {
        static: false
      }]
    }],
    minuteListElement: [{
      type: ViewChild,
      args: ["minuteListElement", {
        static: false
      }]
    }],
    secondListElement: [{
      type: ViewChild,
      args: ["secondListElement", {
        static: false
      }]
    }],
    use12HoursListElement: [{
      type: ViewChild,
      args: ["use12HoursListElement", {
        static: false
      }]
    }],
    nzInDatePicker: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAddOn: [{
      type: Input
    }],
    nzHideDisabledOptions: [{
      type: Input
    }],
    nzClearText: [{
      type: Input
    }],
    nzNowText: [{
      type: Input
    }],
    nzOkText: [{
      type: Input
    }],
    nzPlaceHolder: [{
      type: Input
    }],
    nzUse12Hours: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDefaultOpenValue: [{
      type: Input
    }],
    closePanel: [{
      type: Output
    }],
    nzAllowEmpty: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabledHours: [{
      type: Input
    }],
    nzDisabledMinutes: [{
      type: Input
    }],
    nzDisabledSeconds: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    nzHourStep: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzMinuteStep: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzSecondStep: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "timePicker";
var NzTimePickerComponent = (() => {
  var _a;
  let _nzVariant_decorators;
  let _nzVariant_initializers = [];
  let _nzVariant_extraInitializers = [];
  let _nzHourStep_decorators;
  let _nzHourStep_initializers = [];
  let _nzHourStep_extraInitializers = [];
  let _nzMinuteStep_decorators;
  let _nzMinuteStep_initializers = [];
  let _nzMinuteStep_extraInitializers = [];
  let _nzSecondStep_decorators;
  let _nzSecondStep_initializers = [];
  let _nzSecondStep_extraInitializers = [];
  let _nzClearText_decorators;
  let _nzClearText_initializers = [];
  let _nzClearText_extraInitializers = [];
  let _nzNowText_decorators;
  let _nzNowText_initializers = [];
  let _nzNowText_extraInitializers = [];
  let _nzOkText_decorators;
  let _nzOkText_initializers = [];
  let _nzOkText_extraInitializers = [];
  let _nzPopupClassName_decorators;
  let _nzPopupClassName_initializers = [];
  let _nzPopupClassName_extraInitializers = [];
  let _nzFormat_decorators;
  let _nzFormat_initializers = [];
  let _nzFormat_extraInitializers = [];
  let _nzUse12Hours_decorators;
  let _nzUse12Hours_initializers = [];
  let _nzUse12Hours_extraInitializers = [];
  let _nzSuffixIcon_decorators;
  let _nzSuffixIcon_initializers = [];
  let _nzSuffixIcon_extraInitializers = [];
  let _nzAllowEmpty_decorators;
  let _nzAllowEmpty_initializers = [];
  let _nzAllowEmpty_extraInitializers = [];
  let _nzBackdrop_decorators;
  let _nzBackdrop_initializers = [];
  let _nzBackdrop_extraInitializers = [];
  return _a = class {
    _nzModuleName = NZ_CONFIG_MODULE_NAME;
    nzConfigService = inject(NzConfigService);
    i18n = inject(NzI18nService);
    elementRef = inject(ElementRef);
    renderer = inject(Renderer2);
    cdr = inject(ChangeDetectorRef);
    dateHelper = inject(DateHelperService);
    platform = inject(Platform);
    directionality = inject(Directionality);
    destroyRef = inject(DestroyRef);
    _onChange;
    _onTouched;
    isNzDisableFirstChange = true;
    isInit = false;
    focused = false;
    inputValue = "";
    value = null;
    preValue = null;
    inputSize;
    i18nPlaceHolder$ = of(void 0);
    overlayPositions = [{
      offsetY: 3,
      originX: "start",
      originY: "bottom",
      overlayX: "start",
      overlayY: "top"
    }, {
      offsetY: -3,
      originX: "start",
      originY: "top",
      overlayX: "start",
      overlayY: "bottom"
    }, {
      offsetY: 3,
      originX: "end",
      originY: "bottom",
      overlayX: "end",
      overlayY: "top"
    }, {
      offsetY: -3,
      originX: "end",
      originY: "top",
      overlayX: "end",
      overlayY: "bottom"
    }];
    dir = "ltr";
    // status
    prefixCls = "ant-picker";
    statusCls = {};
    status = "";
    hasFeedback = false;
    get origin() {
      return this.elementRef;
    }
    inputRef;
    nzId = null;
    nzSize = "default";
    nzStatus = "";
    nzVariant = __runInitializers(this, _nzVariant_initializers, "outlined");
    nzHourStep = (__runInitializers(this, _nzVariant_extraInitializers), __runInitializers(this, _nzHourStep_initializers, 1));
    nzMinuteStep = (__runInitializers(this, _nzHourStep_extraInitializers), __runInitializers(this, _nzMinuteStep_initializers, 1));
    nzSecondStep = (__runInitializers(this, _nzMinuteStep_extraInitializers), __runInitializers(this, _nzSecondStep_initializers, 1));
    nzClearText = (__runInitializers(this, _nzSecondStep_extraInitializers), __runInitializers(this, _nzClearText_initializers, "clear"));
    nzNowText = (__runInitializers(this, _nzClearText_extraInitializers), __runInitializers(this, _nzNowText_initializers, ""));
    nzOkText = (__runInitializers(this, _nzNowText_extraInitializers), __runInitializers(this, _nzOkText_initializers, ""));
    nzPopupClassName = (__runInitializers(this, _nzOkText_extraInitializers), __runInitializers(this, _nzPopupClassName_initializers, ""));
    nzPlaceHolder = (__runInitializers(this, _nzPopupClassName_extraInitializers), "");
    nzAddOn;
    nzDefaultOpenValue;
    nzDisabledHours;
    nzDisabledMinutes;
    nzDisabledSeconds;
    nzFormat = __runInitializers(this, _nzFormat_initializers, "HH:mm:ss");
    nzOpen = (__runInitializers(this, _nzFormat_extraInitializers), false);
    nzUse12Hours = __runInitializers(this, _nzUse12Hours_initializers, false);
    nzSuffixIcon = (__runInitializers(this, _nzUse12Hours_extraInitializers), __runInitializers(this, _nzSuffixIcon_initializers, "clock-circle"));
    nzOpenChange = (__runInitializers(this, _nzSuffixIcon_extraInitializers), new EventEmitter());
    nzHideDisabledOptions = false;
    nzAllowEmpty = __runInitializers(this, _nzAllowEmpty_initializers, true);
    nzDisabled = (__runInitializers(this, _nzAllowEmpty_extraInitializers), false);
    nzAutoFocus = false;
    nzBackdrop = __runInitializers(this, _nzBackdrop_initializers, false);
    /**
     * @deprecated Will be removed in v21. It is recommended to use `nzVariant` instead.
     */
    nzBorderless = (__runInitializers(this, _nzBackdrop_extraInitializers), false);
    nzInputReadOnly = false;
    emitValue(value) {
      this.setValue(value, true);
      if (this._onChange) {
        this._onChange(this.value);
      }
      if (this._onTouched) {
        this._onTouched();
      }
    }
    setValue(value, syncPreValue = false) {
      if (syncPreValue) {
        this.preValue = isValid(value) ? new Date(value) : null;
      }
      this.value = isValid(value) ? new Date(value) : null;
      this.inputValue = this.dateHelper.format(value, this.nzFormat);
      this.cdr.markForCheck();
    }
    open() {
      if (this.nzDisabled || this.nzOpen) {
        return;
      }
      this.focus();
      this.nzOpen = true;
      this.nzOpenChange.emit(this.nzOpen);
    }
    close() {
      this.nzOpen = false;
      this.cdr.markForCheck();
      this.nzOpenChange.emit(this.nzOpen);
    }
    updateAutoFocus() {
      if (this.isInit && !this.nzDisabled) {
        if (this.nzAutoFocus) {
          this.renderer.setAttribute(this.inputRef.nativeElement, "autofocus", "autofocus");
        } else {
          this.renderer.removeAttribute(this.inputRef.nativeElement, "autofocus");
        }
      }
    }
    onClickClearBtn(event) {
      event.stopPropagation();
      this.emitValue(null);
    }
    onClickOutside(event) {
      const target = _getEventTarget(event);
      if (!this.elementRef.nativeElement.contains(target)) {
        this.setCurrentValueAndClose();
      }
    }
    onFocus(value) {
      this.focused = value;
      if (!value) {
        if (this.checkTimeValid(this.value)) {
          this.setCurrentValueAndClose();
        } else {
          this.setValue(this.preValue);
          this.close();
        }
      }
    }
    focus() {
      if (this.inputRef.nativeElement) {
        this.inputRef.nativeElement.focus();
      }
    }
    blur() {
      if (this.inputRef.nativeElement) {
        this.inputRef.nativeElement.blur();
      }
    }
    onKeyupEsc() {
      this.setValue(this.preValue);
    }
    onKeyupEnter() {
      if (this.nzOpen && isValid(this.value)) {
        this.setCurrentValueAndClose();
      } else if (!this.nzOpen) {
        this.open();
      }
    }
    onInputChange(str) {
      if (!this.platform.TRIDENT && document.activeElement === this.inputRef.nativeElement) {
        this.open();
        this.parseTimeString(str);
      }
    }
    onPanelValueChange(value) {
      this.setValue(value);
      this.focus();
    }
    closePanel() {
      this.inputRef.nativeElement.blur();
    }
    setCurrentValueAndClose() {
      this.emitValue(this.value);
      this.close();
    }
    finalSize = computed(() => {
      if (this.compactSize) {
        return this.compactSize();
      }
      return this.size();
    }, ...ngDevMode ? [{
      debugName: "finalSize"
    }] : []);
    size = signal(this.nzSize, ...ngDevMode ? [{
      debugName: "size"
    }] : []);
    compactSize = inject(NZ_SPACE_COMPACT_SIZE, {
      optional: true
    });
    nzFormStatusService = inject(NzFormStatusService, {
      optional: true
    });
    nzFormNoStatusService = inject(NzFormNoStatusService, {
      optional: true
    });
    ngOnInit() {
      this.nzFormStatusService?.formStatusChanges.pipe(distinctUntilChanged((pre, cur) => pre.status === cur.status && pre.hasFeedback === cur.hasFeedback), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{
        status,
        hasFeedback
      }, noStatus]) => ({
        status: noStatus ? "" : status,
        hasFeedback
      })), takeUntilDestroyed(this.destroyRef)).subscribe(({
        status,
        hasFeedback
      }) => {
        this.setStatusStyles(status, hasFeedback);
      });
      this.inputSize = Math.max(8, this.nzFormat.length) + 2;
      this.i18nPlaceHolder$ = this.i18n.localeChange.pipe(map((nzLocale) => nzLocale.TimePicker.placeholder));
      this.dir = this.directionality.value;
      this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
      });
    }
    ngOnChanges({
      nzUse12Hours,
      nzFormat,
      nzDisabled,
      nzAutoFocus,
      nzStatus,
      nzSize
    }) {
      if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue && !nzFormat) {
        this.nzFormat = "h:mm:ss a";
      }
      if (nzDisabled) {
        const value = nzDisabled.currentValue;
        const input = this.inputRef.nativeElement;
        if (value) {
          this.renderer.setAttribute(input, "disabled", "");
        } else {
          this.renderer.removeAttribute(input, "disabled");
        }
      }
      if (nzAutoFocus) {
        this.updateAutoFocus();
      }
      if (nzStatus) {
        this.setStatusStyles(this.nzStatus, this.hasFeedback);
      }
      if (nzSize) {
        this.size.set(nzSize.currentValue);
      }
    }
    parseTimeString(str) {
      const value = this.dateHelper.parseTime(str, this.nzFormat) || null;
      if (isValid(value)) {
        this.value = value;
        this.cdr.markForCheck();
      }
    }
    ngAfterViewInit() {
      this.isInit = true;
      this.updateAutoFocus();
    }
    writeValue(time) {
      let result;
      if (time instanceof Date) {
        result = time;
      } else if (isNil(time)) {
        result = null;
      } else {
        warn('Non-Date type is not recommended for time-picker, use "Date" type.');
        result = new Date(time);
      }
      this.setValue(result, true);
    }
    registerOnChange(fn) {
      this._onChange = fn;
    }
    registerOnTouched(fn) {
      this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
      this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || isDisabled;
      this.isNzDisableFirstChange = false;
      this.cdr.markForCheck();
    }
    checkTimeValid(value) {
      if (!value) {
        return true;
      }
      const disabledHours = this.nzDisabledHours?.();
      const disabledMinutes = this.nzDisabledMinutes?.(value.getHours());
      const disabledSeconds = this.nzDisabledSeconds?.(value.getHours(), value.getMinutes());
      return !(disabledHours?.includes(value.getHours()) || disabledMinutes?.includes(value.getMinutes()) || disabledSeconds?.includes(value.getSeconds()));
    }
    setStatusStyles(status, hasFeedback) {
      this.status = status;
      this.hasFeedback = hasFeedback;
      this.cdr.markForCheck();
      this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
      Object.keys(this.statusCls).forEach((status2) => {
        if (this.statusCls[status2]) {
          this.renderer.addClass(this.elementRef.nativeElement, status2);
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, status2);
        }
      });
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzVariant_decorators = [WithConfig()];
    _nzHourStep_decorators = [WithConfig()];
    _nzMinuteStep_decorators = [WithConfig()];
    _nzSecondStep_decorators = [WithConfig()];
    _nzClearText_decorators = [WithConfig()];
    _nzNowText_decorators = [WithConfig()];
    _nzOkText_decorators = [WithConfig()];
    _nzPopupClassName_decorators = [WithConfig()];
    _nzFormat_decorators = [WithConfig()];
    _nzUse12Hours_decorators = [WithConfig()];
    _nzSuffixIcon_decorators = [WithConfig()];
    _nzAllowEmpty_decorators = [WithConfig()];
    _nzBackdrop_decorators = [WithConfig()];
    __esDecorate(null, null, _nzVariant_decorators, {
      kind: "field",
      name: "nzVariant",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzVariant" in obj,
        get: (obj) => obj.nzVariant,
        set: (obj, value) => {
          obj.nzVariant = value;
        }
      },
      metadata: _metadata
    }, _nzVariant_initializers, _nzVariant_extraInitializers);
    __esDecorate(null, null, _nzHourStep_decorators, {
      kind: "field",
      name: "nzHourStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzHourStep" in obj,
        get: (obj) => obj.nzHourStep,
        set: (obj, value) => {
          obj.nzHourStep = value;
        }
      },
      metadata: _metadata
    }, _nzHourStep_initializers, _nzHourStep_extraInitializers);
    __esDecorate(null, null, _nzMinuteStep_decorators, {
      kind: "field",
      name: "nzMinuteStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzMinuteStep" in obj,
        get: (obj) => obj.nzMinuteStep,
        set: (obj, value) => {
          obj.nzMinuteStep = value;
        }
      },
      metadata: _metadata
    }, _nzMinuteStep_initializers, _nzMinuteStep_extraInitializers);
    __esDecorate(null, null, _nzSecondStep_decorators, {
      kind: "field",
      name: "nzSecondStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSecondStep" in obj,
        get: (obj) => obj.nzSecondStep,
        set: (obj, value) => {
          obj.nzSecondStep = value;
        }
      },
      metadata: _metadata
    }, _nzSecondStep_initializers, _nzSecondStep_extraInitializers);
    __esDecorate(null, null, _nzClearText_decorators, {
      kind: "field",
      name: "nzClearText",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzClearText" in obj,
        get: (obj) => obj.nzClearText,
        set: (obj, value) => {
          obj.nzClearText = value;
        }
      },
      metadata: _metadata
    }, _nzClearText_initializers, _nzClearText_extraInitializers);
    __esDecorate(null, null, _nzNowText_decorators, {
      kind: "field",
      name: "nzNowText",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzNowText" in obj,
        get: (obj) => obj.nzNowText,
        set: (obj, value) => {
          obj.nzNowText = value;
        }
      },
      metadata: _metadata
    }, _nzNowText_initializers, _nzNowText_extraInitializers);
    __esDecorate(null, null, _nzOkText_decorators, {
      kind: "field",
      name: "nzOkText",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzOkText" in obj,
        get: (obj) => obj.nzOkText,
        set: (obj, value) => {
          obj.nzOkText = value;
        }
      },
      metadata: _metadata
    }, _nzOkText_initializers, _nzOkText_extraInitializers);
    __esDecorate(null, null, _nzPopupClassName_decorators, {
      kind: "field",
      name: "nzPopupClassName",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzPopupClassName" in obj,
        get: (obj) => obj.nzPopupClassName,
        set: (obj, value) => {
          obj.nzPopupClassName = value;
        }
      },
      metadata: _metadata
    }, _nzPopupClassName_initializers, _nzPopupClassName_extraInitializers);
    __esDecorate(null, null, _nzFormat_decorators, {
      kind: "field",
      name: "nzFormat",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzFormat" in obj,
        get: (obj) => obj.nzFormat,
        set: (obj, value) => {
          obj.nzFormat = value;
        }
      },
      metadata: _metadata
    }, _nzFormat_initializers, _nzFormat_extraInitializers);
    __esDecorate(null, null, _nzUse12Hours_decorators, {
      kind: "field",
      name: "nzUse12Hours",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzUse12Hours" in obj,
        get: (obj) => obj.nzUse12Hours,
        set: (obj, value) => {
          obj.nzUse12Hours = value;
        }
      },
      metadata: _metadata
    }, _nzUse12Hours_initializers, _nzUse12Hours_extraInitializers);
    __esDecorate(null, null, _nzSuffixIcon_decorators, {
      kind: "field",
      name: "nzSuffixIcon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSuffixIcon" in obj,
        get: (obj) => obj.nzSuffixIcon,
        set: (obj, value) => {
          obj.nzSuffixIcon = value;
        }
      },
      metadata: _metadata
    }, _nzSuffixIcon_initializers, _nzSuffixIcon_extraInitializers);
    __esDecorate(null, null, _nzAllowEmpty_decorators, {
      kind: "field",
      name: "nzAllowEmpty",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzAllowEmpty" in obj,
        get: (obj) => obj.nzAllowEmpty,
        set: (obj, value) => {
          obj.nzAllowEmpty = value;
        }
      },
      metadata: _metadata
    }, _nzAllowEmpty_initializers, _nzAllowEmpty_extraInitializers);
    __esDecorate(null, null, _nzBackdrop_decorators, {
      kind: "field",
      name: "nzBackdrop",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzBackdrop" in obj,
        get: (obj) => obj.nzBackdrop,
        set: (obj, value) => {
          obj.nzBackdrop = value;
        }
      },
      metadata: _metadata
    }, _nzBackdrop_initializers, _nzBackdrop_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "ɵfac", function NzTimePickerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "ɵcmp", ɵɵdefineComponent({
    type: _a,
    selectors: [["nz-time-picker"]],
    viewQuery: function NzTimePickerComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c4, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.inputRef = _t.first);
      }
    },
    hostAttrs: [1, "ant-picker"],
    hostVars: 16,
    hostBindings: function NzTimePickerComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function NzTimePickerComponent_click_HostBindingHandler() {
          return ctx.open();
        });
      }
      if (rf & 2) {
        ɵɵclassProp("ant-picker-large", ctx.finalSize() === "large")("ant-picker-small", ctx.finalSize() === "small")("ant-picker-disabled", ctx.nzDisabled)("ant-picker-focused", ctx.focused)("ant-picker-rtl", ctx.dir === "rtl")("ant-picker-borderless", ctx.nzVariant === "borderless" || ctx.nzVariant === "outlined" && ctx.nzBorderless)("ant-picker-filled", ctx.nzVariant === "filled")("ant-picker-underlined", ctx.nzVariant === "underlined");
      }
    },
    inputs: {
      nzId: "nzId",
      nzSize: "nzSize",
      nzStatus: "nzStatus",
      nzVariant: "nzVariant",
      nzHourStep: "nzHourStep",
      nzMinuteStep: "nzMinuteStep",
      nzSecondStep: "nzSecondStep",
      nzClearText: "nzClearText",
      nzNowText: "nzNowText",
      nzOkText: "nzOkText",
      nzPopupClassName: "nzPopupClassName",
      nzPlaceHolder: "nzPlaceHolder",
      nzAddOn: "nzAddOn",
      nzDefaultOpenValue: "nzDefaultOpenValue",
      nzDisabledHours: "nzDisabledHours",
      nzDisabledMinutes: "nzDisabledMinutes",
      nzDisabledSeconds: "nzDisabledSeconds",
      nzFormat: "nzFormat",
      nzOpen: "nzOpen",
      nzUse12Hours: [2, "nzUse12Hours", "nzUse12Hours", booleanAttribute],
      nzSuffixIcon: "nzSuffixIcon",
      nzHideDisabledOptions: [2, "nzHideDisabledOptions", "nzHideDisabledOptions", booleanAttribute],
      nzAllowEmpty: [2, "nzAllowEmpty", "nzAllowEmpty", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzAutoFocus: [2, "nzAutoFocus", "nzAutoFocus", booleanAttribute],
      nzBackdrop: "nzBackdrop",
      nzBorderless: [2, "nzBorderless", "nzBorderless", booleanAttribute],
      nzInputReadOnly: [2, "nzInputReadOnly", "nzInputReadOnly", booleanAttribute]
    },
    outputs: {
      nzOpenChange: "nzOpenChange"
    },
    exportAs: ["nzTimePicker"],
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _a),
      multi: true
    }, {
      provide: NZ_SPACE_COMPACT_ITEM_TYPE,
      useValue: "picker"
    }]), ɵɵHostDirectivesFeature([NzSpaceCompactItemDirective]), ɵɵNgOnChangesFeature],
    decls: 9,
    vars: 16,
    consts: [["inputElement", ""], [1, "ant-picker-input"], ["type", "text", "autocomplete", "off", 3, "ngModelChange", "focus", "blur", "keyup.enter", "keyup.escape", "size", "placeholder", "ngModel", "disabled", "readOnly"], [1, "ant-picker-suffix"], [4, "nzStringTemplateOutlet"], [3, "status"], [1, "ant-picker-clear"], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", 3, "detach", "overlayOutsideClick", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayPositions", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayTransformOriginOn"], [3, "nzType"], [1, "ant-picker-clear", 3, "click"], ["nzType", "close-circle", "nzTheme", "fill"], [1, "ant-picker-dropdown", 2, "position", "relative"], [1, "ant-picker-panel-container"], ["tabindex", "-1", 1, "ant-picker-panel"], [3, "ngModelChange", "closePanel", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "nzPlaceHolder", "nzHideDisabledOptions", "nzUse12Hours", "nzDefaultOpenValue", "nzAddOn", "nzClearText", "nzNowText", "nzOkText", "nzAllowEmpty", "ngModel"]],
    template: function NzTimePickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "div", 1)(1, "input", 2, 0);
        ɵɵpipe(3, "async");
        ɵɵtwoWayListener("ngModelChange", function NzTimePickerComponent_Template_input_ngModelChange_1_listener($event) {
          ɵɵrestoreView(_r1);
          ɵɵtwoWayBindingSet(ctx.inputValue, $event) || (ctx.inputValue = $event);
          return ɵɵresetView($event);
        });
        ɵɵlistener("focus", function NzTimePickerComponent_Template_input_focus_1_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onFocus(true));
        })("blur", function NzTimePickerComponent_Template_input_blur_1_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onFocus(false));
        })("keyup.enter", function NzTimePickerComponent_Template_input_keyup_enter_1_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onKeyupEnter());
        })("keyup.escape", function NzTimePickerComponent_Template_input_keyup_escape_1_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onKeyupEsc());
        })("ngModelChange", function NzTimePickerComponent_Template_input_ngModelChange_1_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onInputChange($event));
        });
        ɵɵelementEnd();
        ɵɵelementStart(4, "span", 3);
        ɵɵtemplate(5, NzTimePickerComponent_ng_container_5_Template, 2, 1, "ng-container", 4);
        ɵɵconditionalCreate(6, NzTimePickerComponent_Conditional_6_Template, 1, 1, "nz-form-item-feedback-icon", 5);
        ɵɵelementEnd();
        ɵɵconditionalCreate(7, NzTimePickerComponent_Conditional_7_Template, 2, 2, "span", 6);
        ɵɵelementEnd();
        ɵɵtemplate(8, NzTimePickerComponent_ng_template_8_Template, 5, 22, "ng-template", 7);
        ɵɵlistener("detach", function NzTimePickerComponent_Template_ng_template_detach_8_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.close());
        })("overlayOutsideClick", function NzTimePickerComponent_Template_ng_template_overlayOutsideClick_8_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onClickOutside($event));
        });
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵproperty("size", ctx.inputSize)("placeholder", ctx.nzPlaceHolder || ɵɵpipeBind1(3, 14, ctx.i18nPlaceHolder$));
        ɵɵtwoWayProperty("ngModel", ctx.inputValue);
        ɵɵproperty("disabled", ctx.nzDisabled)("readOnly", ctx.nzInputReadOnly);
        ɵɵattribute("id", ctx.nzId);
        ɵɵadvance(4);
        ɵɵproperty("nzStringTemplateOutlet", ctx.nzSuffixIcon);
        ɵɵadvance();
        ɵɵconditional(ctx.hasFeedback && !!ctx.status ? 6 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.nzAllowEmpty && !ctx.nzDisabled && ctx.value ? 7 : -1);
        ɵɵadvance();
        ɵɵproperty("cdkConnectedOverlayHasBackdrop", ctx.nzBackdrop)("cdkConnectedOverlayPositions", ctx.overlayPositions)("cdkConnectedOverlayOrigin", ctx.origin)("cdkConnectedOverlayOpen", ctx.nzOpen)("cdkConnectedOverlayTransformOriginOn", ".ant-picker-dropdown");
      }
    },
    dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective, NzFormItemFeedbackIconComponent, NzTimePickerPanelComponent, NzOverlayModule, NzConnectedOverlayDirective, OverlayModule, CdkConnectedOverlay, AsyncPipe],
    encapsulation: 2,
    data: {
      animation: [slideMotion]
    },
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimePickerComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "nz-time-picker",
      exportAs: "nzTimePicker",
      template: `
    <div class="ant-picker-input">
      <input
        #inputElement
        [attr.id]="nzId"
        type="text"
        [size]="inputSize"
        autocomplete="off"
        [placeholder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
        [(ngModel)]="inputValue"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
        @if (hasFeedback && !!status) {
          <nz-form-item-feedback-icon [status]="status"></nz-form-item-feedback-icon>
        }
      </span>
      @if (nzAllowEmpty && !nzDisabled && value) {
        <span class="ant-picker-clear" (click)="onClickClearBtn($event)">
          <nz-icon nzType="close-circle" nzTheme="fill" [attr.aria-label]="nzClearText" [attr.title]="nzClearText" />
        </span>
      }
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-dropdown'"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div [@slideMotion]="'enter'" class="ant-picker-dropdown" style="position: relative">
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [class]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzNowText]="nzNowText"
              [nzOkText]="nzOkText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="closePanel()"
            ></nz-time-picker-panel>
          </div>
        </div>
      </div>
    </ng-template>
  `,
      host: {
        class: "ant-picker",
        "[class.ant-picker-large]": `finalSize() === 'large'`,
        "[class.ant-picker-small]": `finalSize() === 'small'`,
        "[class.ant-picker-disabled]": `nzDisabled`,
        "[class.ant-picker-focused]": `focused`,
        "[class.ant-picker-rtl]": `dir === 'rtl'`,
        "[class.ant-picker-borderless]": `nzVariant === 'borderless' || (nzVariant === 'outlined' && nzBorderless)`,
        "[class.ant-picker-filled]": `nzVariant === 'filled'`,
        "[class.ant-picker-underlined]": `nzVariant === 'underlined'`,
        "(click)": "open()"
      },
      hostDirectives: [NzSpaceCompactItemDirective],
      animations: [slideMotion],
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzTimePickerComponent),
        multi: true
      }, {
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "picker"
      }],
      imports: [AsyncPipe, FormsModule, NzOutletModule, NzIconModule, NzFormItemFeedbackIconComponent, NzTimePickerPanelComponent, NzOverlayModule, OverlayModule]
    }]
  }], null, {
    inputRef: [{
      type: ViewChild,
      args: ["inputElement", {
        static: true
      }]
    }],
    nzId: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzVariant: [{
      type: Input
    }],
    nzHourStep: [{
      type: Input
    }],
    nzMinuteStep: [{
      type: Input
    }],
    nzSecondStep: [{
      type: Input
    }],
    nzClearText: [{
      type: Input
    }],
    nzNowText: [{
      type: Input
    }],
    nzOkText: [{
      type: Input
    }],
    nzPopupClassName: [{
      type: Input
    }],
    nzPlaceHolder: [{
      type: Input
    }],
    nzAddOn: [{
      type: Input
    }],
    nzDefaultOpenValue: [{
      type: Input
    }],
    nzDisabledHours: [{
      type: Input
    }],
    nzDisabledMinutes: [{
      type: Input
    }],
    nzDisabledSeconds: [{
      type: Input
    }],
    nzFormat: [{
      type: Input
    }],
    nzOpen: [{
      type: Input
    }],
    nzUse12Hours: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSuffixIcon: [{
      type: Input
    }],
    nzOpenChange: [{
      type: Output
    }],
    nzHideDisabledOptions: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAllowEmpty: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzBackdrop: [{
      type: Input
    }],
    nzBorderless: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzInputReadOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var NzTimePickerModule = class _NzTimePickerModule {
  static ɵfac = function NzTimePickerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTimePickerModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzTimePickerModule,
    imports: [NzTimePickerComponent, NzTimePickerPanelComponent],
    exports: [NzTimePickerPanelComponent, NzTimePickerComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [NzTimePickerComponent, NzTimePickerPanelComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimePickerModule, [{
    type: NgModule,
    args: [{
      imports: [NzTimePickerComponent, NzTimePickerPanelComponent],
      exports: [NzTimePickerPanelComponent, NzTimePickerComponent]
    }]
  }], null, null);
})();

export {
  NzTimePickerPanelComponent,
  NzTimePickerComponent,
  NzTimePickerModule
};
//# sourceMappingURL=chunk-D4TKIAL4.js.map
