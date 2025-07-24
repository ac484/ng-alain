import {
  NzPaginationComponent,
  NzPaginationModule
} from "./chunk-UOF6OP3D.js";
import {
  NzEmbedEmptyComponent,
  NzEmptyModule
} from "./chunk-F2DXCIWC.js";
import {
  NzSpinComponent
} from "./chunk-2VFBAWEG.js";
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
  NzResizeObserver
} from "./chunk-OIOY4I4G.js";
import {
  NzRadioComponent
} from "./chunk-DLHTX2ZQ.js";
import {
  NzCheckboxComponent,
  NzCheckboxModule
} from "./chunk-5CKH7BXE.js";
import {
  NzResizeService
} from "./chunk-XPEPFKNH.js";
import {
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
  NzIconDirective,
  NzIconModule
} from "./chunk-GP3H6RZA.js";
import {
  NzConfigService,
  WithConfig,
  onConfigChangeEventForComponent
} from "./chunk-LSG4V6ID.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-KG76OIXO.js";
import {
  arraysEqual,
  fromEventOutsideAngular,
  isNil,
  measureScrollbar
} from "./chunk-J25EALHE.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-ZWI5T7AR.js";
import {
  takeUntilDestroyed
} from "./chunk-I75K2H66.js";
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollingModule
} from "./chunk-IH6YTMYU.js";
import {
  Directionality
} from "./chunk-TBGMZLZ3.js";
import {
  Platform
} from "./chunk-GIT7CFOZ.js";
import {
  AsyncPipe,
  NgTemplateOutlet
} from "./chunk-GUTSRBNM.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  booleanAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
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
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵstyleMap,
  ɵɵstyleProp,
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
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import {
  merge
} from "./chunk-KMLKBNXJ.js";
import {
  BehaviorSubject,
  EMPTY,
  ReplaySubject,
  Subject,
  __esDecorate,
  __runInitializers,
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  of,
  skip,
  startWith,
  switchMap
} from "./chunk-EBAU53KC.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-table.mjs
var _c0 = ["*"];
var _forTrack0 = ($index, $item) => $item.value;
function NzTableFilterComponent_ng_template_1_Template(rf, ctx) {
}
function NzTableFilterComponent_Conditional_2_For_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 14);
    ɵɵlistener("ngModelChange", function NzTableFilterComponent_Conditional_2_For_7_Conditional_1_Template_label_ngModelChange_0_listener() {
      ɵɵrestoreView(_r5);
      const f_r4 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.check(f_r4));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const f_r4 = ɵɵnextContext().$implicit;
    ɵɵproperty("ngModel", f_r4.checked);
  }
}
function NzTableFilterComponent_Conditional_2_For_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 15);
    ɵɵlistener("ngModelChange", function NzTableFilterComponent_Conditional_2_For_7_Conditional_2_Template_label_ngModelChange_0_listener() {
      ɵɵrestoreView(_r6);
      const f_r4 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.check(f_r4));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const f_r4 = ɵɵnextContext().$implicit;
    ɵɵproperty("ngModel", f_r4.checked);
  }
}
function NzTableFilterComponent_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 11);
    ɵɵlistener("click", function NzTableFilterComponent_Conditional_2_For_7_Template_li_click_0_listener() {
      const f_r4 = ɵɵrestoreView(_r3).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.check(f_r4));
    });
    ɵɵconditionalCreate(1, NzTableFilterComponent_Conditional_2_For_7_Conditional_1_Template, 1, 1, "label", 12)(2, NzTableFilterComponent_Conditional_2_For_7_Conditional_2_Template, 1, 1, "label", 13);
    ɵɵelementStart(3, "span");
    ɵɵtext(4);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const f_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("nzSelected", f_r4.checked);
    ɵɵadvance();
    ɵɵconditional(!ctx_r1.filterMultiple ? 1 : 2);
    ɵɵadvance(3);
    ɵɵtextInterpolate(f_r4.text);
  }
}
function NzTableFilterComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "nz-filter-trigger", 3);
    ɵɵlistener("nzVisibleChange", function NzTableFilterComponent_Conditional_2_Template_nz_filter_trigger_nzVisibleChange_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onVisibleChange($event));
    });
    ɵɵelement(1, "nz-icon", 4);
    ɵɵelementEnd();
    ɵɵelementStart(2, "nz-dropdown-menu", null, 0)(4, "div", 5)(5, "ul", 6);
    ɵɵrepeaterCreate(6, NzTableFilterComponent_Conditional_2_For_7_Template, 5, 3, "li", 7, _forTrack0);
    ɵɵelementEnd();
    ɵɵelementStart(8, "div", 8)(9, "button", 9);
    ɵɵlistener("click", function NzTableFilterComponent_Conditional_2_Template_button_click_9_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.reset());
    });
    ɵɵtext(10);
    ɵɵelementEnd();
    ɵɵelementStart(11, "button", 10);
    ɵɵlistener("click", function NzTableFilterComponent_Conditional_2_Template_button_click_11_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.confirm());
    });
    ɵɵtext(12);
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const filterMenu_r7 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("nzVisible", ctx_r1.isVisible)("nzActive", ctx_r1.isChecked)("nzDropdownMenu", filterMenu_r7);
    ɵɵadvance(6);
    ɵɵrepeater(ctx_r1.listOfParsedFilter);
    ɵɵadvance(3);
    ɵɵproperty("disabled", !ctx_r1.isChecked);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.locale.filterReset, " ");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r1.locale.filterConfirm);
  }
}
function NzTableFilterComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 2);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.extraTemplate);
  }
}
function NzTableSelectionComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 3);
    ɵɵlistener("ngModelChange", function NzTableSelectionComponent_Conditional_0_Template_label_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onCheckedChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassProp("ant-table-selection-select-all-custom", ctx_r1.showRowSelection);
    ɵɵproperty("ngModel", ctx_r1.checked)("nzDisabled", ctx_r1.disabled)("nzIndeterminate", ctx_r1.indeterminate);
    ɵɵattribute("aria-label", ctx_r1.label);
  }
}
function NzTableSelectionComponent_Conditional_1_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 8);
    ɵɵlistener("click", function NzTableSelectionComponent_Conditional_1_For_7_Template_li_click_0_listener() {
      const selection_r4 = ɵɵrestoreView(_r3).$implicit;
      return ɵɵresetView(selection_r4.onSelect());
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const selection_r4 = ctx.$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", selection_r4.text, " ");
  }
}
function NzTableSelectionComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2)(1, "span", 4);
    ɵɵelement(2, "nz-icon", 5);
    ɵɵelementEnd();
    ɵɵelementStart(3, "nz-dropdown-menu", null, 0)(5, "ul", 6);
    ɵɵrepeaterCreate(6, NzTableSelectionComponent_Conditional_1_For_7_Template, 2, 1, "li", 7, ɵɵrepeaterTrackByIdentity);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const selectionMenu_r5 = ɵɵreference(4);
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzDropdownMenu", selectionMenu_r5);
    ɵɵadvance(5);
    ɵɵrepeater(ctx_r1.listOfSelections);
  }
}
function NzTableSortersComponent_ng_template_1_Template(rf, ctx) {
}
function NzTableSortersComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-icon", 6);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassProp("active", ctx_r0.sortOrder === "ascend");
  }
}
function NzTableSortersComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-icon", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassProp("active", ctx_r0.sortOrder === "descend");
  }
}
var _c1 = ["nzChecked", ""];
function NzTdAddOnComponent_Conditional_0_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzTdAddOnComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzTdAddOnComponent_Conditional_0_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 2);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.nzExpandIcon);
  }
}
function NzTdAddOnComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 4);
    ɵɵlistener("expandChange", function NzTdAddOnComponent_Conditional_0_Conditional_2_Template_button_expandChange_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onExpandChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("expand", ctx_r0.nzExpand)("spaceMode", !ctx_r0.nzShowExpand);
  }
}
function NzTdAddOnComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-row-indent", 1);
    ɵɵconditionalCreate(1, NzTdAddOnComponent_Conditional_0_Conditional_1_Template, 1, 1, null, 2)(2, NzTdAddOnComponent_Conditional_0_Conditional_2_Template, 1, 2, "button", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("indentSize", ctx_r0.nzIndentSize);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.nzExpandIcon ? 1 : 2);
  }
}
function NzTdAddOnComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 5);
    ɵɵlistener("ngModelChange", function NzTdAddOnComponent_Conditional_1_Template_label_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onCheckedChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("nzDisabled", ctx_r0.nzDisabled)("ngModel", ctx_r0.nzChecked)("nzIndeterminate", ctx_r0.nzIndeterminate);
    ɵɵattribute("aria-label", ctx_r0.nzLabel);
  }
}
var _c2 = ["nzColumnKey", ""];
var _c3 = [[["", "nz-th-extra", ""]], [["nz-filter-trigger"]], "*"];
var _c4 = ["[nz-th-extra]", "nz-filter-trigger", "*"];
function NzThAddOnComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "nz-table-filter", 6);
    ɵɵlistener("filterChange", function NzThAddOnComponent_Conditional_0_Template_nz_table_filter_filterChange_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFilterValueChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const notFilterTemplate_r3 = ɵɵreference(3);
    const extraTemplate_r4 = ɵɵreference(5);
    ɵɵproperty("contentTemplate", notFilterTemplate_r3)("extraTemplate", extraTemplate_r4)("customFilter", ctx_r1.nzCustomFilter)("filterMultiple", ctx_r1.nzFilterMultiple)("listOfFilter", ctx_r1.nzFilters);
  }
}
function NzThAddOnComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 5);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const notFilterTemplate_r3 = ɵɵreference(3);
    ɵɵproperty("ngTemplateOutlet", notFilterTemplate_r3);
  }
}
function NzThAddOnComponent_ng_template_2_ng_template_0_Template(rf, ctx) {
}
function NzThAddOnComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzThAddOnComponent_ng_template_2_ng_template_0_Template, 0, 0, "ng-template", 5);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const sortTemplate_r5 = ɵɵreference(7);
    const contentTemplate_r6 = ɵɵreference(9);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nzShowSort ? sortTemplate_r5 : contentTemplate_r6);
  }
}
function NzThAddOnComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
    ɵɵprojection(1, 1);
  }
}
function NzThAddOnComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-table-sorters", 7);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const contentTemplate_r6 = ɵɵreference(9);
    ɵɵproperty("sortOrder", ctx_r1.sortOrder)("sortDirections", ctx_r1.sortDirections)("contentTemplate", contentTemplate_r6);
  }
}
function NzThAddOnComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 2);
  }
}
var _c5 = ["nzSelections", ""];
var _c6 = ["nz-table-content", ""];
function NzTableContentComponent_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "col");
  }
  if (rf & 2) {
    const width_r1 = ctx.$implicit;
    ɵɵstyleProp("width", width_r1)("min-width", width_r1);
  }
}
function NzTableContentComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "colgroup");
    ɵɵrepeaterCreate(1, NzTableContentComponent_Conditional_0_For_2_Template, 1, 4, "col", 3, ɵɵrepeaterTrackByIndex);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵrepeater(ctx_r1.listOfColWidth);
  }
}
function NzTableContentComponent_Conditional_1_ng_template_1_Template(rf, ctx) {
}
function NzTableContentComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "thead", 0);
    ɵɵtemplate(1, NzTableContentComponent_Conditional_1_ng_template_1_Template, 0, 0, "ng-template", 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.theadTemplate);
  }
}
function NzTableContentComponent_ng_template_2_Template(rf, ctx) {
}
function NzTableContentComponent_Conditional_4_ng_template_1_Template(rf, ctx) {
}
function NzTableContentComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tfoot", 2);
    ɵɵtemplate(1, NzTableContentComponent_Conditional_4_ng_template_1_Template, 0, 0, "ng-template", 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.tfootTemplate);
  }
}
var _c7 = ["tdElement"];
var _c8 = ["nz-table-fixed-row", ""];
function NzTableFixedRowComponent_Conditional_2_ng_template_2_Template(rf, ctx) {
}
function NzTableFixedRowComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵpipe(1, "async");
    ɵɵtemplate(2, NzTableFixedRowComponent_Conditional_2_ng_template_2_Template, 0, 0, "ng-template", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const contentTemplate_r2 = ɵɵreference(6);
    ɵɵstyleProp("width", ɵɵpipeBind1(1, 3, ctx_r0.hostWidth$), "px");
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", contentTemplate_r2);
  }
}
function NzTableFixedRowComponent_Conditional_4_ng_template_0_Template(rf, ctx) {
}
function NzTableFixedRowComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzTableFixedRowComponent_Conditional_4_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const contentTemplate_r2 = ɵɵreference(6);
    ɵɵproperty("ngTemplateOutlet", contentTemplate_r2);
  }
}
function NzTableFixedRowComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
var _c9 = ["nz-table-measure-row", ""];
function NzTrMeasureComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵdomElement(0, "td", 1, 0);
  }
}
function NzTbodyComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "tr", 2);
    ɵɵlistener("listOfAutoWidth", function NzTbodyComponent_Conditional_0_Conditional_0_Template_tr_listOfAutoWidth_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onListOfAutoWidthChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const listOfMeasureColumn_r3 = ɵɵnextContext();
    ɵɵproperty("listOfMeasureColumn", listOfMeasureColumn_r3);
  }
}
function NzTbodyComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzTbodyComponent_Conditional_0_Conditional_0_Template, 1, 1, "tr", 1);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵconditional(ctx_r1.isInsideTable && ctx.length ? 0 : -1);
  }
}
function NzTbodyComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr", 0);
    ɵɵelement(1, "nz-embed-empty", 3);
    ɵɵpipe(2, "async");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("specificContent", ɵɵpipeBind1(2, 1, ctx_r1.noResult$));
  }
}
var _c10 = ["tableHeaderElement"];
var _c11 = ["tableBodyElement"];
var _c12 = ["tableFootElement"];
var _c13 = (a0, a1) => ({
  $implicit: a0,
  index: a1
});
function NzTableInnerScrollComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9, 1);
    ɵɵelement(2, "table", 10);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵstyleMap(ctx_r0.bodyStyleMap);
    ɵɵadvance(2);
    ɵɵproperty("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth)("contentTemplate", ctx_r0.contentTemplate);
  }
}
function NzTableInnerScrollComponent_Conditional_0_Conditional_4_ng_container_4_ng_template_1_Template(rf, ctx) {
}
function NzTableInnerScrollComponent_Conditional_0_Conditional_4_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, NzTableInnerScrollComponent_Conditional_0_Conditional_4_ng_container_4_ng_template_1_Template, 0, 0, "ng-template", 14);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.virtualTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c13, item_r2, i_r3));
  }
}
function NzTableInnerScrollComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "cdk-virtual-scroll-viewport", 11, 1)(2, "table", 12)(3, "tbody");
    ɵɵtemplate(4, NzTableInnerScrollComponent_Conditional_0_Conditional_4_ng_container_4_Template, 2, 5, "ng-container", 13);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵstyleProp("height", ctx_r0.data.length ? ctx_r0.scrollY : ctx_r0.noDataVirtualHeight);
    ɵɵproperty("itemSize", ctx_r0.virtualItemSize)("maxBufferPx", ctx_r0.virtualMaxBufferPx)("minBufferPx", ctx_r0.virtualMinBufferPx);
    ɵɵadvance(2);
    ɵɵproperty("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth);
    ɵɵadvance(2);
    ɵɵproperty("cdkVirtualForOf", ctx_r0.data)("cdkVirtualForTrackBy", ctx_r0.virtualForTrackBy);
  }
}
function NzTableInnerScrollComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 15, 2);
    ɵɵelement(2, "table", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵstyleMap(ctx_r0.headerStyleMap);
    ɵɵadvance(2);
    ɵɵproperty("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth)("tfootTemplate", ctx_r0.tfootTemplate);
  }
}
function NzTableInnerScrollComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4, 0);
    ɵɵelement(2, "table", 5);
    ɵɵelementEnd();
    ɵɵconditionalCreate(3, NzTableInnerScrollComponent_Conditional_0_Conditional_3_Template, 3, 5, "div", 6)(4, NzTableInnerScrollComponent_Conditional_0_Conditional_4_Template, 5, 9, "cdk-virtual-scroll-viewport", 7);
    ɵɵconditionalCreate(5, NzTableInnerScrollComponent_Conditional_0_Conditional_5_Template, 3, 5, "div", 8);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r0.headerStyleMap);
    ɵɵadvance(2);
    ɵɵproperty("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth)("theadTemplate", ctx_r0.theadTemplate)("tfootTemplate", ctx_r0.tfootFixed === "top" ? ctx_r0.tfootTemplate : null);
    ɵɵadvance();
    ɵɵconditional(!ctx_r0.virtualTemplate ? 3 : 4);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r0.tfootFixed === "bottom" ? 5 : -1);
  }
}
function NzTableInnerScrollComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 17, 1);
    ɵɵelement(2, "table", 18);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r0.bodyStyleMap);
    ɵɵadvance(2);
    ɵɵproperty("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth)("theadTemplate", ctx_r0.theadTemplate)("contentTemplate", ctx_r0.contentTemplate)("tfootTemplate", ctx_r0.tfootTemplate);
  }
}
function NzTableTitleFooterComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.title);
  }
}
function NzTableTitleFooterComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.footer);
  }
}
function NzTableComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzTableComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const paginationTemplate_r1 = ɵɵreference(10);
    ɵɵproperty("ngTemplateOutlet", paginationTemplate_r1);
  }
}
function NzTableComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-table-title-footer", 6);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("title", ctx_r1.nzTitle);
  }
}
function NzTableComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-table-inner-scroll", 7);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const tableMainElement_r3 = ɵɵreference(3);
    const contentTemplate_r4 = ɵɵreference(12);
    ɵɵproperty("data", ctx_r1.data)("scrollX", ctx_r1.scrollX)("scrollY", ctx_r1.scrollY)("contentTemplate", contentTemplate_r4)("listOfColWidth", ctx_r1.listOfAutoColWidth)("theadTemplate", ctx_r1.theadTemplate)("tfootTemplate", ctx_r1.tfootTemplate)("tfootFixed", ctx_r1.tfootFixed)("verticalScrollBarWidth", ctx_r1.verticalScrollBarWidth)("virtualTemplate", ctx_r1.nzVirtualScrollDirective ? ctx_r1.nzVirtualScrollDirective.templateRef : null)("virtualItemSize", ctx_r1.nzVirtualItemSize)("virtualMaxBufferPx", ctx_r1.nzVirtualMaxBufferPx)("virtualMinBufferPx", ctx_r1.nzVirtualMinBufferPx)("tableMainElement", tableMainElement_r3)("virtualForTrackBy", ctx_r1.nzVirtualForTrackBy)("noDataVirtualHeight", ctx_r1.noDataVirtualHeight);
  }
}
function NzTableComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-table-inner-default", 8);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const contentTemplate_r4 = ɵɵreference(12);
    ɵɵproperty("tableLayout", ctx_r1.nzTableLayout)("listOfColWidth", ctx_r1.listOfManualColWidth)("theadTemplate", ctx_r1.theadTemplate)("contentTemplate", contentTemplate_r4)("tfootTemplate", ctx_r1.tfootTemplate);
  }
}
function NzTableComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-table-title-footer", 9);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("footer", ctx_r1.nzFooter);
  }
}
function NzTableComponent_Conditional_8_ng_template_0_Template(rf, ctx) {
}
function NzTableComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzTableComponent_Conditional_8_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const paginationTemplate_r1 = ɵɵreference(10);
    ɵɵproperty("ngTemplateOutlet", paginationTemplate_r1);
  }
}
function NzTableComponent_ng_template_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "nz-pagination", 11);
    ɵɵlistener("nzPageSizeChange", function NzTableComponent_ng_template_9_Conditional_0_Template_nz_pagination_nzPageSizeChange_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onPageSizeChange($event));
    })("nzPageIndexChange", function NzTableComponent_ng_template_9_Conditional_0_Template_nz_pagination_nzPageIndexChange_0_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onPageIndexChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("hidden", !ctx_r1.showPagination)("nzShowSizeChanger", ctx_r1.nzShowSizeChanger)("nzPageSizeOptions", ctx_r1.nzPageSizeOptions)("nzItemRender", ctx_r1.nzItemRender)("nzShowQuickJumper", ctx_r1.nzShowQuickJumper)("nzHideOnSinglePage", ctx_r1.nzHideOnSinglePage)("nzShowTotal", ctx_r1.nzShowTotal)("nzSize", ctx_r1.nzPaginationType === "small" ? "small" : ctx_r1.nzSize === "default" ? "default" : "small")("nzPageSize", ctx_r1.nzPageSize)("nzTotal", ctx_r1.nzTotal)("nzSimple", ctx_r1.nzSimple)("nzPageIndex", ctx_r1.nzPageIndex);
  }
}
function NzTableComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzTableComponent_ng_template_9_Conditional_0_Template, 1, 12, "nz-pagination", 10);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵconditional(ctx_r1.nzShowPagination && ctx_r1.data.length ? 0 : -1);
  }
}
function NzTableComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
var _c14 = ["contentTemplate"];
var _c15 = ["nzSummary", ""];
function NzTfootSummaryComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function NzTfootSummaryComponent_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzTfootSummaryComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzTfootSummaryComponent_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const contentTemplate_r1 = ɵɵreference(1);
    ɵɵproperty("ngTemplateOutlet", contentTemplate_r1);
  }
}
function NzTheadComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function NzTheadComponent_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzTheadComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzTheadComponent_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const contentTemplate_r1 = ɵɵreference(1);
    ɵɵproperty("ngTemplateOutlet", contentTemplate_r1);
  }
}
var NZ_CONFIG_MODULE_NAME$2 = "filterTrigger";
var NzFilterTriggerComponent = (() => {
  var _a;
  let _nzBackdrop_decorators;
  let _nzBackdrop_initializers = [];
  let _nzBackdrop_extraInitializers = [];
  return _a = class {
    _nzModuleName = NZ_CONFIG_MODULE_NAME$2;
    nzConfigService = inject(NzConfigService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    nzActive = false;
    nzDropdownMenu;
    nzVisible = false;
    nzBackdrop = __runInitializers(this, _nzBackdrop_initializers, false);
    nzVisibleChange = (__runInitializers(this, _nzBackdrop_extraInitializers), new EventEmitter());
    nzDropdown;
    onVisibleChange(visible) {
      this.nzVisible = visible;
      this.nzVisibleChange.next(visible);
    }
    hide() {
      this.nzVisible = false;
      this.cdr.markForCheck();
    }
    show() {
      this.nzVisible = true;
      this.cdr.markForCheck();
    }
    ngOnInit() {
      fromEventOutsideAngular(this.nzDropdown.nativeElement, "click").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => event.stopPropagation());
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzBackdrop_decorators = [WithConfig()];
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
  })(), __publicField(_a, "ɵfac", function NzFilterTriggerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "ɵcmp", ɵɵdefineComponent({
    type: _a,
    selectors: [["nz-filter-trigger"]],
    viewQuery: function NzFilterTriggerComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(NzDropDownDirective, 7, ElementRef);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nzDropdown = _t.first);
      }
    },
    inputs: {
      nzActive: "nzActive",
      nzDropdownMenu: "nzDropdownMenu",
      nzVisible: "nzVisible",
      nzBackdrop: [2, "nzBackdrop", "nzBackdrop", booleanAttribute]
    },
    outputs: {
      nzVisibleChange: "nzVisibleChange"
    },
    exportAs: ["nzFilterTrigger"],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 8,
    consts: [["nz-dropdown", "", "nzTrigger", "click", "nzPlacement", "bottomRight", 1, "ant-table-filter-trigger", 3, "nzVisibleChange", "nzBackdrop", "nzClickHide", "nzDropdownMenu", "nzVisible"]],
    template: function NzFilterTriggerComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "span", 0);
        ɵɵlistener("nzVisibleChange", function NzFilterTriggerComponent_Template_span_nzVisibleChange_0_listener($event) {
          return ctx.onVisibleChange($event);
        });
        ɵɵprojection(1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassProp("active", ctx.nzActive)("ant-table-filter-open", ctx.nzVisible);
        ɵɵproperty("nzBackdrop", ctx.nzBackdrop)("nzClickHide", false)("nzDropdownMenu", ctx.nzDropdownMenu)("nzVisible", ctx.nzVisible);
      }
    },
    dependencies: [NzDropDownModule, NzDropDownDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFilterTriggerComponent, [{
    type: Component,
    args: [{
      selector: "nz-filter-trigger",
      exportAs: `nzFilterTrigger`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      (nzVisibleChange)="onVisibleChange($event)"
    >
      <ng-content></ng-content>
    </span>
  `,
      imports: [NzDropDownModule]
    }]
  }], null, {
    nzActive: [{
      type: Input
    }],
    nzDropdownMenu: [{
      type: Input
    }],
    nzVisible: [{
      type: Input
    }],
    nzBackdrop: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzVisibleChange: [{
      type: Output
    }],
    nzDropdown: [{
      type: ViewChild,
      args: [NzDropDownDirective, {
        static: true,
        read: ElementRef
      }]
    }]
  });
})();
var NzTableFilterComponent = class _NzTableFilterComponent {
  cdr = inject(ChangeDetectorRef);
  i18n = inject(NzI18nService);
  destroyRef = inject(DestroyRef);
  contentTemplate = null;
  customFilter = false;
  extraTemplate = null;
  filterMultiple = true;
  listOfFilter = [];
  filterChange = new EventEmitter();
  locale;
  isChecked = false;
  isVisible = false;
  listOfParsedFilter = [];
  listOfChecked = [];
  check(filter2) {
    if (this.filterMultiple) {
      this.listOfParsedFilter = this.listOfParsedFilter.map((item) => {
        if (item === filter2) {
          return __spreadProps(__spreadValues({}, item), {
            checked: !filter2.checked
          });
        } else {
          return item;
        }
      });
      filter2.checked = !filter2.checked;
    } else {
      this.listOfParsedFilter = this.listOfParsedFilter.map((item) => __spreadProps(__spreadValues({}, item), {
        checked: item === filter2
      }));
    }
    this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
  }
  confirm() {
    this.isVisible = false;
    this.emitFilterData();
  }
  reset() {
    this.isVisible = false;
    this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
    this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    this.emitFilterData();
  }
  onVisibleChange(value) {
    this.isVisible = value;
    if (!value) {
      this.emitFilterData();
    } else {
      this.listOfChecked = this.listOfParsedFilter.filter((item) => item.checked).map((item) => item.value);
    }
  }
  emitFilterData() {
    const listOfChecked = this.listOfParsedFilter.filter((item) => item.checked).map((item) => item.value);
    if (!arraysEqual(this.listOfChecked, listOfChecked)) {
      if (this.filterMultiple) {
        this.filterChange.emit(listOfChecked);
      } else {
        this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
      }
    }
  }
  parseListOfFilter(listOfFilter, reset) {
    return listOfFilter.map((item) => {
      const checked = reset ? false : !!item.byDefault;
      return {
        text: item.text,
        value: item.value,
        checked
      };
    });
  }
  getCheckedStatus(listOfParsedFilter) {
    return listOfParsedFilter.some((item) => item.checked);
  }
  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData("Table");
      this.cdr.markForCheck();
    });
  }
  ngOnChanges(changes) {
    const {
      listOfFilter
    } = changes;
    if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
      this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
      this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    }
  }
  static ɵfac = function NzTableFilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableFilterComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTableFilterComponent,
    selectors: [["nz-table-filter"]],
    hostAttrs: [1, "ant-table-filter-column"],
    inputs: {
      contentTemplate: "contentTemplate",
      customFilter: "customFilter",
      extraTemplate: "extraTemplate",
      filterMultiple: "filterMultiple",
      listOfFilter: "listOfFilter"
    },
    outputs: {
      filterChange: "filterChange"
    },
    features: [ɵɵNgOnChangesFeature],
    decls: 4,
    vars: 2,
    consts: [["filterMenu", "nzDropdownMenu"], [1, "ant-table-column-title"], [3, "ngTemplateOutlet"], [3, "nzVisibleChange", "nzVisible", "nzActive", "nzDropdownMenu"], ["nzType", "filter", "nzTheme", "fill"], [1, "ant-table-filter-dropdown"], ["nz-menu", ""], ["nz-menu-item", "", 3, "nzSelected"], [1, "ant-table-filter-dropdown-btns"], ["nz-button", "", "nzType", "link", "nzSize", "small", 3, "click", "disabled"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click"], ["nz-menu-item", "", 3, "click", "nzSelected"], ["nz-radio", "", 3, "ngModel"], ["nz-checkbox", "", 3, "ngModel"], ["nz-radio", "", 3, "ngModelChange", "ngModel"], ["nz-checkbox", "", 3, "ngModelChange", "ngModel"]],
    template: function NzTableFilterComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "span", 1);
        ɵɵtemplate(1, NzTableFilterComponent_ng_template_1_Template, 0, 0, "ng-template", 2);
        ɵɵelementEnd();
        ɵɵconditionalCreate(2, NzTableFilterComponent_Conditional_2_Template, 13, 6)(3, NzTableFilterComponent_Conditional_3_Template, 1, 1, "ng-container", 2);
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate);
        ɵɵadvance();
        ɵɵconditional(!ctx.customFilter ? 2 : 3);
      }
    },
    dependencies: [NgTemplateOutlet, NzFilterTriggerComponent, NzIconModule, NzIconDirective, NzDropDownModule, NzMenuDirective, NzMenuItemComponent, NzDropdownMenuComponent, NzRadioComponent, NzCheckboxModule, NzCheckboxComponent, FormsModule, NgControlStatus, NgModel, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableFilterComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-filter",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <span class="ant-table-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    @if (!customFilter) {
      <nz-filter-trigger
        [nzVisible]="isVisible"
        [nzActive]="isChecked"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <nz-icon nzType="filter" nzTheme="fill" />
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            @for (f of listOfParsedFilter; track f.value) {
              <li nz-menu-item [nzSelected]="f.checked" (click)="check(f)">
                @if (!filterMultiple) {
                  <label nz-radio [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
                } @else {
                  <label nz-checkbox [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
                }
                <span>{{ f.text }}</span>
              </li>
            }
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">
              {{ locale.filterReset }}
            </button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    } @else {
      <ng-container [ngTemplateOutlet]="extraTemplate"></ng-container>
    }
  `,
      host: {
        class: "ant-table-filter-column"
      },
      imports: [NgTemplateOutlet, NzFilterTriggerComponent, NzIconModule, NzDropDownModule, NzRadioComponent, NzCheckboxModule, FormsModule, NzButtonModule]
    }]
  }], null, {
    contentTemplate: [{
      type: Input
    }],
    customFilter: [{
      type: Input
    }],
    extraTemplate: [{
      type: Input
    }],
    filterMultiple: [{
      type: Input
    }],
    listOfFilter: [{
      type: Input
    }],
    filterChange: [{
      type: Output
    }]
  });
})();
var NzRowExpandButtonDirective = class _NzRowExpandButtonDirective {
  expand = false;
  spaceMode = false;
  expandChange = new EventEmitter();
  onHostClick() {
    if (!this.spaceMode) {
      this.expand = !this.expand;
      this.expandChange.next(this.expand);
    }
  }
  static ɵfac = function NzRowExpandButtonDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzRowExpandButtonDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzRowExpandButtonDirective,
    selectors: [["button", "nz-row-expand-button", ""]],
    hostAttrs: [1, "ant-table-row-expand-icon"],
    hostVars: 7,
    hostBindings: function NzRowExpandButtonDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function NzRowExpandButtonDirective_click_HostBindingHandler() {
          return ctx.onHostClick();
        });
      }
      if (rf & 2) {
        ɵɵdomProperty("type", "button");
        ɵɵclassProp("ant-table-row-expand-icon-expanded", !ctx.spaceMode && ctx.expand === true)("ant-table-row-expand-icon-collapsed", !ctx.spaceMode && ctx.expand === false)("ant-table-row-expand-icon-spaced", ctx.spaceMode);
      }
    },
    inputs: {
      expand: "expand",
      spaceMode: "spaceMode"
    },
    outputs: {
      expandChange: "expandChange"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRowExpandButtonDirective, [{
    type: Directive,
    args: [{
      selector: "button[nz-row-expand-button]",
      host: {
        class: "ant-table-row-expand-icon",
        "[type]": `'button'`,
        "[class.ant-table-row-expand-icon-expanded]": `!spaceMode && expand === true`,
        "[class.ant-table-row-expand-icon-collapsed]": `!spaceMode && expand === false`,
        "[class.ant-table-row-expand-icon-spaced]": "spaceMode",
        "(click)": "onHostClick()"
      }
    }]
  }], null, {
    expand: [{
      type: Input
    }],
    spaceMode: [{
      type: Input
    }],
    expandChange: [{
      type: Output
    }]
  });
})();
var NzRowIndentDirective = class _NzRowIndentDirective {
  indentSize = 0;
  static ɵfac = function NzRowIndentDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzRowIndentDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzRowIndentDirective,
    selectors: [["nz-row-indent"]],
    hostAttrs: [1, "ant-table-row-indent"],
    hostVars: 2,
    hostBindings: function NzRowIndentDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("padding-left", ctx.indentSize, "px");
      }
    },
    inputs: {
      indentSize: "indentSize"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRowIndentDirective, [{
    type: Directive,
    args: [{
      selector: "nz-row-indent",
      host: {
        class: "ant-table-row-indent",
        "[style.padding-left.px]": "indentSize"
      }
    }]
  }], null, {
    indentSize: [{
      type: Input
    }]
  });
})();
var NzTableSelectionComponent = class _NzTableSelectionComponent {
  listOfSelections = [];
  checked = false;
  disabled = false;
  indeterminate = false;
  label = null;
  showCheckbox = false;
  showRowSelection = false;
  checkedChange = new EventEmitter();
  onCheckedChange(checked) {
    this.checked = checked;
    this.checkedChange.emit(checked);
  }
  static ɵfac = function NzTableSelectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableSelectionComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTableSelectionComponent,
    selectors: [["nz-table-selection"]],
    hostAttrs: [1, "ant-table-selection"],
    inputs: {
      listOfSelections: "listOfSelections",
      checked: "checked",
      disabled: "disabled",
      indeterminate: "indeterminate",
      label: "label",
      showCheckbox: "showCheckbox",
      showRowSelection: "showRowSelection"
    },
    outputs: {
      checkedChange: "checkedChange"
    },
    decls: 2,
    vars: 2,
    consts: [["selectionMenu", "nzDropdownMenu"], ["nz-checkbox", "", 3, "ant-table-selection-select-all-custom", "ngModel", "nzDisabled", "nzIndeterminate"], [1, "ant-table-selection-extra"], ["nz-checkbox", "", 3, "ngModelChange", "ngModel", "nzDisabled", "nzIndeterminate"], ["nz-dropdown", "", "nzPlacement", "bottomLeft", 1, "ant-table-selection-down", 3, "nzDropdownMenu"], ["nzType", "down"], ["nz-menu", "", 1, "ant-table-selection-menu"], ["nz-menu-item", ""], ["nz-menu-item", "", 3, "click"]],
    template: function NzTableSelectionComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, NzTableSelectionComponent_Conditional_0_Template, 1, 6, "label", 1);
        ɵɵconditionalCreate(1, NzTableSelectionComponent_Conditional_1_Template, 8, 1, "div", 2);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.showCheckbox ? 0 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.showRowSelection ? 1 : -1);
      }
    },
    dependencies: [FormsModule, NgControlStatus, NgModel, NzCheckboxModule, NzCheckboxComponent, NzDropDownModule, NzMenuDirective, NzMenuItemComponent, NzDropDownDirective, NzDropdownMenuComponent, NzIconModule, NzIconDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableSelectionComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-selection",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (showCheckbox) {
      <label
        nz-checkbox
        [class.ant-table-selection-select-all-custom]="showRowSelection"
        [ngModel]="checked"
        [nzDisabled]="disabled"
        [nzIndeterminate]="indeterminate"
        [attr.aria-label]="label"
        (ngModelChange)="onCheckedChange($event)"
      ></label>
    }
    @if (showRowSelection) {
      <div class="ant-table-selection-extra">
        <span nz-dropdown class="ant-table-selection-down" nzPlacement="bottomLeft" [nzDropdownMenu]="selectionMenu">
          <nz-icon nzType="down" />
        </span>
        <nz-dropdown-menu #selectionMenu="nzDropdownMenu">
          <ul nz-menu class="ant-table-selection-menu">
            @for (selection of listOfSelections; track selection) {
              <li nz-menu-item (click)="selection.onSelect()">
                {{ selection.text }}
              </li>
            }
          </ul>
        </nz-dropdown-menu>
      </div>
    }
  `,
      host: {
        class: "ant-table-selection"
      },
      imports: [FormsModule, NzCheckboxModule, NzDropDownModule, NzIconModule]
    }]
  }], null, {
    listOfSelections: [{
      type: Input
    }],
    checked: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    indeterminate: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    showCheckbox: [{
      type: Input
    }],
    showRowSelection: [{
      type: Input
    }],
    checkedChange: [{
      type: Output
    }]
  });
})();
var NzTableSortersComponent = class _NzTableSortersComponent {
  sortDirections = ["ascend", "descend", null];
  sortOrder = null;
  contentTemplate = null;
  isUp = false;
  isDown = false;
  ngOnChanges(changes) {
    const {
      sortDirections
    } = changes;
    if (sortDirections) {
      this.isUp = this.sortDirections.indexOf("ascend") !== -1;
      this.isDown = this.sortDirections.indexOf("descend") !== -1;
    }
  }
  static ɵfac = function NzTableSortersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableSortersComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTableSortersComponent,
    selectors: [["nz-table-sorters"]],
    hostAttrs: [1, "ant-table-column-sorters"],
    inputs: {
      sortDirections: "sortDirections",
      sortOrder: "sortOrder",
      contentTemplate: "contentTemplate"
    },
    features: [ɵɵNgOnChangesFeature],
    decls: 6,
    vars: 5,
    consts: [[1, "ant-table-column-title"], [3, "ngTemplateOutlet"], [1, "ant-table-column-sorter"], [1, "ant-table-column-sorter-inner"], ["nzType", "caret-up", 1, "ant-table-column-sorter-up", 3, "active"], ["nzType", "caret-down", 1, "ant-table-column-sorter-down", 3, "active"], ["nzType", "caret-up", 1, "ant-table-column-sorter-up"], ["nzType", "caret-down", 1, "ant-table-column-sorter-down"]],
    template: function NzTableSortersComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "span", 0);
        ɵɵtemplate(1, NzTableSortersComponent_ng_template_1_Template, 0, 0, "ng-template", 1);
        ɵɵelementEnd();
        ɵɵelementStart(2, "span", 2)(3, "span", 3);
        ɵɵconditionalCreate(4, NzTableSortersComponent_Conditional_4_Template, 1, 2, "nz-icon", 4);
        ɵɵconditionalCreate(5, NzTableSortersComponent_Conditional_5_Template, 1, 2, "nz-icon", 5);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate);
        ɵɵadvance();
        ɵɵclassProp("ant-table-column-sorter-full", ctx.isDown && ctx.isUp);
        ɵɵadvance(2);
        ɵɵconditional(ctx.isUp ? 4 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.isDown ? 5 : -1);
      }
    },
    dependencies: [NzIconModule, NzIconDirective, NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableSortersComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-sorters",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <span class="ant-table-column-title"><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        @if (isUp) {
          <nz-icon nzType="caret-up" class="ant-table-column-sorter-up" [class.active]="sortOrder === 'ascend'" />
        }
        @if (isDown) {
          <nz-icon nzType="caret-down" class="ant-table-column-sorter-down" [class.active]="sortOrder === 'descend'" />
        }
      </span>
    </span>
  `,
      host: {
        class: "ant-table-column-sorters"
      },
      imports: [NzIconModule, NgTemplateOutlet]
    }]
  }], null, {
    sortDirections: [{
      type: Input
    }],
    sortOrder: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }]
  });
})();
var NzCellFixedDirective = class _NzCellFixedDirective {
  renderer = inject(Renderer2);
  el = inject(ElementRef).nativeElement;
  nzRight = false;
  nzLeft = false;
  colspan = null;
  colSpan = null;
  changes$ = new Subject();
  isAutoLeft = false;
  isAutoRight = false;
  isFixedLeft = false;
  isFixedRight = false;
  isFixed = false;
  setAutoLeftWidth(autoLeft) {
    this.renderer.setStyle(this.el, "left", autoLeft);
  }
  setAutoRightWidth(autoRight) {
    this.renderer.setStyle(this.el, "right", autoRight);
  }
  setIsFirstRight(isFirstRight) {
    this.setFixClass(isFirstRight, "ant-table-cell-fix-right-first");
  }
  setIsLastLeft(isLastLeft) {
    this.setFixClass(isLastLeft, "ant-table-cell-fix-left-last");
  }
  setFixClass(flag, className) {
    this.renderer.removeClass(this.el, className);
    if (flag) {
      this.renderer.addClass(this.el, className);
    }
  }
  ngOnChanges() {
    this.setIsFirstRight(false);
    this.setIsLastLeft(false);
    this.isAutoLeft = this.nzLeft === "" || this.nzLeft === true;
    this.isAutoRight = this.nzRight === "" || this.nzRight === true;
    this.isFixedLeft = this.nzLeft !== false;
    this.isFixedRight = this.nzRight !== false;
    this.isFixed = this.isFixedLeft || this.isFixedRight;
    const validatePx = (value) => {
      if (typeof value === "string" && value !== "") {
        return value;
      } else {
        return null;
      }
    };
    this.setAutoLeftWidth(validatePx(this.nzLeft));
    this.setAutoRightWidth(validatePx(this.nzRight));
    this.changes$.next();
  }
  static ɵfac = function NzCellFixedDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzCellFixedDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzCellFixedDirective,
    selectors: [["td", "nzRight", ""], ["th", "nzRight", ""], ["td", "nzLeft", ""], ["th", "nzLeft", ""]],
    hostVars: 6,
    hostBindings: function NzCellFixedDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("position", ctx.isFixed ? "sticky" : null);
        ɵɵclassProp("ant-table-cell-fix-right", ctx.isFixedRight)("ant-table-cell-fix-left", ctx.isFixedLeft);
      }
    },
    inputs: {
      nzRight: "nzRight",
      nzLeft: "nzLeft",
      colspan: "colspan",
      colSpan: "colSpan"
    },
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCellFixedDirective, [{
    type: Directive,
    args: [{
      selector: "td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]",
      host: {
        "[class.ant-table-cell-fix-right]": `isFixedRight`,
        "[class.ant-table-cell-fix-left]": `isFixedLeft`,
        "[style.position]": `isFixed? 'sticky' : null`
      }
    }]
  }], null, {
    nzRight: [{
      type: Input
    }],
    nzLeft: [{
      type: Input
    }],
    colspan: [{
      type: Input
    }],
    colSpan: [{
      type: Input
    }]
  });
})();
var NzTableStyleService = class _NzTableStyleService {
  theadTemplate$ = new ReplaySubject(1);
  tfootTemplate$ = new ReplaySubject(1);
  tfootFixed$ = new ReplaySubject(1);
  hasFixLeft$ = new ReplaySubject(1);
  hasFixRight$ = new ReplaySubject(1);
  hostWidth$ = new ReplaySubject(1);
  columnCount$ = new ReplaySubject(1);
  showEmpty$ = new ReplaySubject(1);
  noResult$ = new ReplaySubject(1);
  listOfThWidthConfigPx$ = new BehaviorSubject([]);
  tableWidthConfigPx$ = new BehaviorSubject([]);
  manualWidthConfigPx$ = combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(map(([widthConfig, listOfWidth]) => widthConfig.length ? widthConfig : listOfWidth));
  listOfAutoWidthPx$ = new ReplaySubject(1);
  listOfListOfThWidthPx$ = merge(
    /** init with manual width **/
    this.manualWidthConfigPx$,
    combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(map(([autoWidth, manualWidth]) => {
      if (autoWidth.length === manualWidth.length) {
        return autoWidth.map((width, index) => {
          if (width === "0px") {
            return manualWidth[index] || null;
          } else {
            return manualWidth[index] || width;
          }
        });
      } else {
        return manualWidth;
      }
    }))
  );
  listOfMeasureColumn$ = new ReplaySubject(1);
  listOfListOfThWidth$ = this.listOfAutoWidthPx$.pipe(map((list) => list.map((width) => parseInt(width, 10))));
  enableAutoMeasure$ = new ReplaySubject(1);
  setTheadTemplate(template) {
    this.theadTemplate$.next(template);
  }
  setTfootTemplate(template) {
    this.tfootTemplate$.next(template);
  }
  setTfootFixed(fixed) {
    this.tfootFixed$.next(fixed);
  }
  setHasFixLeft(hasFixLeft) {
    this.hasFixLeft$.next(hasFixLeft);
  }
  setHasFixRight(hasFixRight) {
    this.hasFixRight$.next(hasFixRight);
  }
  setTableWidthConfig(widthConfig) {
    this.tableWidthConfigPx$.next(widthConfig);
  }
  setListOfTh(listOfTh) {
    let columnCount = 0;
    listOfTh.forEach((th) => {
      columnCount += th.colspan && +th.colspan || th.colSpan && +th.colSpan || 1;
    });
    const listOfThPx = listOfTh.map((item) => item.nzWidth);
    this.columnCount$.next(columnCount);
    this.listOfThWidthConfigPx$.next(listOfThPx);
  }
  setListOfMeasureColumn(listOfTh) {
    const listOfKeys = [];
    listOfTh.forEach((th) => {
      const length = th.colspan && +th.colspan || th.colSpan && +th.colSpan || 1;
      for (let i = 0; i < length; i++) {
        listOfKeys.push(`measure_key_${i}`);
      }
    });
    this.listOfMeasureColumn$.next(listOfKeys);
  }
  setListOfAutoWidth(listOfAutoWidth) {
    this.listOfAutoWidthPx$.next(listOfAutoWidth.map((width) => `${width}px`));
  }
  setShowEmpty(showEmpty) {
    this.showEmpty$.next(showEmpty);
  }
  setNoResult(noResult) {
    this.noResult$.next(noResult);
  }
  setScroll(scrollX, scrollY) {
    const enableAutoMeasure = !!(scrollX || scrollY);
    if (!enableAutoMeasure) {
      this.setListOfAutoWidth([]);
    }
    this.enableAutoMeasure$.next(enableAutoMeasure);
  }
  static ɵfac = function NzTableStyleService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableStyleService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NzTableStyleService,
    factory: _NzTableStyleService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableStyleService, [{
    type: Injectable
  }], null, null);
})();
var NzTableCellDirective = class _NzTableCellDirective {
  isInsideTable = !!inject(NzTableStyleService, {
    optional: true
  });
  static ɵfac = function NzTableCellDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableCellDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzTableCellDirective,
    selectors: [["th", 9, "nz-disable-th"], ["td", 9, "nz-disable-td"]],
    hostVars: 2,
    hostBindings: function NzTableCellDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-table-cell", ctx.isInsideTable);
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableCellDirective, [{
    type: Directive,
    args: [{
      selector: "th:not(.nz-disable-th), td:not(.nz-disable-td)",
      host: {
        "[class.ant-table-cell]": "isInsideTable"
      }
    }]
  }], null, null);
})();
var NzTableDataService = class _NzTableDataService {
  destroyRef = inject(DestroyRef);
  pageIndex$ = new BehaviorSubject(1);
  frontPagination$ = new BehaviorSubject(true);
  pageSize$ = new BehaviorSubject(10);
  listOfData$ = new BehaviorSubject([]);
  listOfCustomColumn$ = new BehaviorSubject([]);
  pageIndexDistinct$ = this.pageIndex$.pipe(distinctUntilChanged());
  pageSizeDistinct$ = this.pageSize$.pipe(distinctUntilChanged());
  listOfCalcOperator$ = new BehaviorSubject([]);
  queryParams$ = combineLatest([this.pageIndexDistinct$, this.pageSizeDistinct$, this.listOfCalcOperator$]).pipe(debounceTime(0), skip(1), map(([pageIndex, pageSize, listOfCalc]) => ({
    pageIndex,
    pageSize,
    sort: listOfCalc.filter((item) => item.sortFn).map((item) => ({
      key: item.key,
      value: item.sortOrder
    })),
    filter: listOfCalc.filter((item) => item.filterFn).map((item) => ({
      key: item.key,
      value: item.filterValue
    }))
  })));
  listOfDataAfterCalc$ = combineLatest([this.listOfData$, this.listOfCalcOperator$]).pipe(map(([listOfData, listOfCalcOperator]) => {
    let listOfDataAfterCalc = [...listOfData];
    const listOfFilterOperator = listOfCalcOperator.filter((item) => {
      const {
        filterValue,
        filterFn
      } = item;
      const isReset = filterValue === null || filterValue === void 0 || Array.isArray(filterValue) && filterValue.length === 0;
      return !isReset && typeof filterFn === "function";
    });
    for (const item of listOfFilterOperator) {
      const {
        filterFn,
        filterValue
      } = item;
      listOfDataAfterCalc = listOfDataAfterCalc.filter((data) => filterFn(filterValue, data));
    }
    const listOfSortOperator = listOfCalcOperator.filter((item) => item.sortOrder !== null && typeof item.sortFn === "function").sort((a, b) => +b.sortPriority - +a.sortPriority);
    if (listOfCalcOperator.length) {
      listOfDataAfterCalc.sort((record1, record2) => {
        for (const item of listOfSortOperator) {
          const {
            sortFn,
            sortOrder
          } = item;
          if (sortFn && sortOrder) {
            const compareResult = sortFn(record1, record2, sortOrder);
            if (compareResult !== 0) {
              return sortOrder === "ascend" ? compareResult : -compareResult;
            }
          }
        }
        return 0;
      });
    }
    return listOfDataAfterCalc;
  }));
  listOfFrontEndCurrentPageData$ = combineLatest([this.pageIndexDistinct$, this.pageSizeDistinct$, this.listOfDataAfterCalc$]).pipe(takeUntilDestroyed(this.destroyRef), filter((value) => {
    const [pageIndex, pageSize, listOfData] = value;
    const maxPageIndex = Math.ceil(listOfData.length / pageSize) || 1;
    return pageIndex <= maxPageIndex;
  }), map(([pageIndex, pageSize, listOfData]) => listOfData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)));
  listOfCurrentPageData$ = this.frontPagination$.pipe(switchMap((pagination) => pagination ? this.listOfFrontEndCurrentPageData$ : this.listOfDataAfterCalc$));
  total$ = this.frontPagination$.pipe(switchMap((pagination) => pagination ? this.listOfDataAfterCalc$ : this.listOfData$), map((list) => list.length), distinctUntilChanged());
  updatePageSize(size) {
    this.pageSize$.next(size);
  }
  updateFrontPagination(pagination) {
    this.frontPagination$.next(pagination);
  }
  updatePageIndex(index) {
    this.pageIndex$.next(index);
  }
  updateListOfData(list) {
    this.listOfData$.next(list);
  }
  updateListOfCustomColumn(list) {
    this.listOfCustomColumn$.next(list);
  }
  static ɵfac = function NzTableDataService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableDataService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NzTableDataService,
    factory: _NzTableDataService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableDataService, [{
    type: Injectable
  }], null, null);
})();
var NzCustomColumnDirective = class _NzCustomColumnDirective {
  el = inject(ElementRef).nativeElement;
  renderer = inject(Renderer2);
  nzTableDataService = inject(NzTableDataService);
  destroyRef = inject(DestroyRef);
  nzCellControl = null;
  ngOnInit() {
    this.nzTableDataService.listOfCustomColumn$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((item) => {
      item.forEach((v, i) => {
        if (v.value === this.nzCellControl) {
          this.renderer.setStyle(this.el, "display", v.default ? "block" : "none");
          this.renderer.setStyle(this.el, "order", i);
          this.renderer.setStyle(this.el, "flex", v.fixWidth ? `1 0 ${v.width}px` : `1 1 ${v.width}px`);
        }
      });
    });
  }
  static ɵfac = function NzCustomColumnDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzCustomColumnDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzCustomColumnDirective,
    selectors: [["td", "nzCellControl", ""], ["th", "nzCellControl", ""]],
    inputs: {
      nzCellControl: "nzCellControl"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCustomColumnDirective, [{
    type: Directive,
    args: [{
      selector: "td[nzCellControl],th[nzCellControl]"
    }]
  }], null, {
    nzCellControl: [{
      type: Input
    }]
  });
})();
var NzTdAddOnComponent = class _NzTdAddOnComponent {
  nzChecked = false;
  nzDisabled = false;
  nzIndeterminate = false;
  nzLabel = null;
  nzIndentSize = 0;
  nzShowExpand = false;
  nzShowCheckbox = false;
  nzExpand = false;
  nzExpandIcon = null;
  nzCheckedChange = new EventEmitter();
  nzExpandChange = new EventEmitter();
  isNzShowExpandChanged = false;
  isNzShowCheckboxChanged = false;
  onCheckedChange(checked) {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }
  onExpandChange(expand) {
    this.nzExpand = expand;
    this.nzExpandChange.emit(expand);
  }
  ngOnChanges(changes) {
    const isFirstChange = (value) => value && value.firstChange && value.currentValue !== void 0;
    const {
      nzExpand,
      nzChecked,
      nzShowExpand,
      nzShowCheckbox
    } = changes;
    if (nzShowExpand) {
      this.isNzShowExpandChanged = true;
    }
    if (nzShowCheckbox) {
      this.isNzShowCheckboxChanged = true;
    }
    if (isFirstChange(nzExpand) && !this.isNzShowExpandChanged) {
      this.nzShowExpand = true;
    }
    if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
      this.nzShowCheckbox = true;
    }
  }
  static ɵfac = function NzTdAddOnComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTdAddOnComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTdAddOnComponent,
    selectors: [["td", "nzChecked", ""], ["td", "nzDisabled", ""], ["td", "nzIndeterminate", ""], ["td", "nzIndentSize", ""], ["td", "nzExpand", ""], ["td", "nzShowExpand", ""], ["td", "nzShowCheckbox", ""]],
    hostVars: 4,
    hostBindings: function NzTdAddOnComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-table-cell-with-append", ctx.nzShowExpand || ctx.nzIndentSize > 0)("ant-table-selection-column", ctx.nzShowCheckbox);
      }
    },
    inputs: {
      nzChecked: "nzChecked",
      nzDisabled: "nzDisabled",
      nzIndeterminate: "nzIndeterminate",
      nzLabel: "nzLabel",
      nzIndentSize: "nzIndentSize",
      nzShowExpand: [2, "nzShowExpand", "nzShowExpand", booleanAttribute],
      nzShowCheckbox: [2, "nzShowCheckbox", "nzShowCheckbox", booleanAttribute],
      nzExpand: [2, "nzExpand", "nzExpand", booleanAttribute],
      nzExpandIcon: "nzExpandIcon"
    },
    outputs: {
      nzCheckedChange: "nzCheckedChange",
      nzExpandChange: "nzExpandChange"
    },
    features: [ɵɵNgOnChangesFeature],
    attrs: _c1,
    ngContentSelectors: _c0,
    decls: 3,
    vars: 2,
    consts: [["nz-checkbox", "", 3, "nzDisabled", "ngModel", "nzIndeterminate"], [3, "indentSize"], [3, "ngTemplateOutlet"], ["nz-row-expand-button", "", 3, "expand", "spaceMode"], ["nz-row-expand-button", "", 3, "expandChange", "expand", "spaceMode"], ["nz-checkbox", "", 3, "ngModelChange", "nzDisabled", "ngModel", "nzIndeterminate"]],
    template: function NzTdAddOnComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵconditionalCreate(0, NzTdAddOnComponent_Conditional_0_Template, 3, 2);
        ɵɵconditionalCreate(1, NzTdAddOnComponent_Conditional_1_Template, 1, 4, "label", 0);
        ɵɵprojection(2);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.nzShowExpand || ctx.nzIndentSize > 0 ? 0 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.nzShowCheckbox ? 1 : -1);
      }
    },
    dependencies: [NzRowIndentDirective, NzRowExpandButtonDirective, NgTemplateOutlet, NzCheckboxModule, NzCheckboxComponent, FormsModule, NgControlStatus, NgModel],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTdAddOnComponent, [{
    type: Component,
    args: [{
      selector: "td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (nzShowExpand || nzIndentSize > 0) {
      <nz-row-indent [indentSize]="nzIndentSize"></nz-row-indent>
      @if (nzExpandIcon) {
        <ng-template [ngTemplateOutlet]="nzExpandIcon"></ng-template>
      } @else {
        <button
          nz-row-expand-button
          [expand]="nzExpand"
          (expandChange)="onExpandChange($event)"
          [spaceMode]="!nzShowExpand"
        ></button>
      }
    }
    @if (nzShowCheckbox) {
      <label
        nz-checkbox
        [nzDisabled]="nzDisabled"
        [ngModel]="nzChecked"
        [nzIndeterminate]="nzIndeterminate"
        [attr.aria-label]="nzLabel"
        (ngModelChange)="onCheckedChange($event)"
      ></label>
    }
    <ng-content></ng-content>
  `,
      host: {
        "[class.ant-table-cell-with-append]": `nzShowExpand || nzIndentSize > 0`,
        "[class.ant-table-selection-column]": `nzShowCheckbox`
      },
      imports: [NzRowIndentDirective, NzRowExpandButtonDirective, NgTemplateOutlet, NzCheckboxModule, FormsModule]
    }]
  }], null, {
    nzChecked: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input
    }],
    nzIndeterminate: [{
      type: Input
    }],
    nzLabel: [{
      type: Input
    }],
    nzIndentSize: [{
      type: Input
    }],
    nzShowExpand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowCheckbox: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExpand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExpandIcon: [{
      type: Input
    }],
    nzCheckedChange: [{
      type: Output
    }],
    nzExpandChange: [{
      type: Output
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME$1 = "table";
var NzThAddOnComponent = (() => {
  var _a;
  let _nzSortDirections_decorators;
  let _nzSortDirections_initializers = [];
  let _nzSortDirections_extraInitializers = [];
  return _a = class {
    _nzModuleName = NZ_CONFIG_MODULE_NAME$1;
    nzConfigService = inject(NzConfigService);
    el = inject(ElementRef).nativeElement;
    destroyRef = inject(DestroyRef);
    cdr = inject(ChangeDetectorRef);
    ngZone = inject(NgZone);
    manualClickOrder$ = new Subject();
    calcOperatorChange$ = new Subject();
    nzFilterValue = null;
    sortOrder = null;
    sortDirections = ["ascend", "descend", null];
    sortOrderChange$ = new Subject();
    isNzShowSortChanged = false;
    isNzShowFilterChanged = false;
    nzColumnKey;
    nzFilterMultiple = true;
    nzSortOrder = null;
    nzSortPriority = false;
    nzSortDirections = __runInitializers(this, _nzSortDirections_initializers, ["ascend", "descend", null]);
    nzFilters = (__runInitializers(this, _nzSortDirections_extraInitializers), []);
    nzSortFn = null;
    nzFilterFn = null;
    nzShowSort = false;
    nzShowFilter = false;
    nzCustomFilter = false;
    nzCheckedChange = new EventEmitter();
    nzSortOrderChange = new EventEmitter();
    nzFilterChange = new EventEmitter();
    getNextSortDirection(sortDirections, current) {
      const index = sortDirections.indexOf(current);
      if (index === sortDirections.length - 1) {
        return sortDirections[0];
      } else {
        return sortDirections[index + 1];
      }
    }
    setSortOrder(order) {
      this.sortOrderChange$.next(order);
    }
    clearSortOrder() {
      if (this.sortOrder !== null) {
        this.setSortOrder(null);
      }
    }
    onFilterValueChange(value) {
      this.nzFilterChange.emit(value);
      this.nzFilterValue = value;
      this.updateCalcOperator();
    }
    updateCalcOperator() {
      this.calcOperatorChange$.next();
    }
    ngOnInit() {
      fromEventOutsideAngular(this.el, "click").pipe(filter(() => this.nzShowSort), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder);
        this.ngZone.run(() => {
          this.setSortOrder(nextOrder);
          this.manualClickOrder$.next(this);
        });
      });
      this.sortOrderChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((order) => {
        if (this.sortOrder !== order) {
          this.sortOrder = order;
          this.nzSortOrderChange.emit(order);
        }
        this.updateCalcOperator();
        this.cdr.markForCheck();
      });
    }
    ngOnChanges(changes) {
      const {
        nzSortDirections,
        nzFilters,
        nzSortOrder,
        nzSortFn,
        nzFilterFn,
        nzSortPriority,
        nzFilterMultiple,
        nzShowSort,
        nzShowFilter
      } = changes;
      if (nzSortDirections) {
        if (this.nzSortDirections && this.nzSortDirections.length) {
          this.sortDirections = this.nzSortDirections;
        }
      }
      if (nzSortOrder) {
        this.sortOrder = this.nzSortOrder;
        this.setSortOrder(this.nzSortOrder);
      }
      if (nzShowSort) {
        this.isNzShowSortChanged = true;
      }
      if (nzShowFilter) {
        this.isNzShowFilterChanged = true;
      }
      const isFirstChange = (value) => value && value.firstChange && value.currentValue !== void 0;
      if ((isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) && !this.isNzShowSortChanged) {
        this.nzShowSort = true;
      }
      if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
        this.nzShowFilter = true;
      }
      if ((nzFilters || nzFilterMultiple) && this.nzShowFilter) {
        const listOfValue = this.nzFilters.filter((item) => item.byDefault).map((item) => item.value);
        this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
      }
      if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters) {
        this.updateCalcOperator();
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzSortDirections_decorators = [WithConfig()];
    __esDecorate(null, null, _nzSortDirections_decorators, {
      kind: "field",
      name: "nzSortDirections",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSortDirections" in obj,
        get: (obj) => obj.nzSortDirections,
        set: (obj, value) => {
          obj.nzSortDirections = value;
        }
      },
      metadata: _metadata
    }, _nzSortDirections_initializers, _nzSortDirections_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "ɵfac", function NzThAddOnComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "ɵcmp", ɵɵdefineComponent({
    type: _a,
    selectors: [["th", "nzColumnKey", ""], ["th", "nzSortFn", ""], ["th", "nzSortOrder", ""], ["th", "nzFilters", ""], ["th", "nzShowSort", ""], ["th", "nzShowFilter", ""], ["th", "nzCustomFilter", ""]],
    hostVars: 4,
    hostBindings: function NzThAddOnComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-table-column-has-sorters", ctx.nzShowSort)("ant-table-column-sort", ctx.sortOrder === "descend" || ctx.sortOrder === "ascend");
      }
    },
    inputs: {
      nzColumnKey: "nzColumnKey",
      nzFilterMultiple: "nzFilterMultiple",
      nzSortOrder: "nzSortOrder",
      nzSortPriority: "nzSortPriority",
      nzSortDirections: "nzSortDirections",
      nzFilters: "nzFilters",
      nzSortFn: "nzSortFn",
      nzFilterFn: "nzFilterFn",
      nzShowSort: [2, "nzShowSort", "nzShowSort", booleanAttribute],
      nzShowFilter: [2, "nzShowFilter", "nzShowFilter", booleanAttribute],
      nzCustomFilter: [2, "nzCustomFilter", "nzCustomFilter", booleanAttribute]
    },
    outputs: {
      nzCheckedChange: "nzCheckedChange",
      nzSortOrderChange: "nzSortOrderChange",
      nzFilterChange: "nzFilterChange"
    },
    features: [ɵɵNgOnChangesFeature],
    attrs: _c2,
    ngContentSelectors: _c4,
    decls: 10,
    vars: 1,
    consts: [["notFilterTemplate", ""], ["extraTemplate", ""], ["sortTemplate", ""], ["contentTemplate", ""], [3, "contentTemplate", "extraTemplate", "customFilter", "filterMultiple", "listOfFilter"], [3, "ngTemplateOutlet"], [3, "filterChange", "contentTemplate", "extraTemplate", "customFilter", "filterMultiple", "listOfFilter"], [3, "sortOrder", "sortDirections", "contentTemplate"]],
    template: function NzThAddOnComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c3);
        ɵɵconditionalCreate(0, NzThAddOnComponent_Conditional_0_Template, 1, 5, "nz-table-filter", 4)(1, NzThAddOnComponent_Conditional_1_Template, 1, 1, "ng-container", 5);
        ɵɵtemplate(2, NzThAddOnComponent_ng_template_2_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(4, NzThAddOnComponent_ng_template_4_Template, 2, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor)(6, NzThAddOnComponent_ng_template_6_Template, 1, 3, "ng-template", null, 2, ɵɵtemplateRefExtractor)(8, NzThAddOnComponent_ng_template_8_Template, 1, 0, "ng-template", null, 3, ɵɵtemplateRefExtractor);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.nzShowFilter || ctx.nzCustomFilter ? 0 : 1);
      }
    },
    dependencies: [NzTableFilterComponent, NgTemplateOutlet, NzTableSortersComponent],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzThAddOnComponent, [{
    type: Component,
    args: [{
      selector: "th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (nzShowFilter || nzCustomFilter) {
      <nz-table-filter
        [contentTemplate]="notFilterTemplate"
        [extraTemplate]="extraTemplate"
        [customFilter]="nzCustomFilter"
        [filterMultiple]="nzFilterMultiple"
        [listOfFilter]="nzFilters"
        (filterChange)="onFilterValueChange($event)"
      ></nz-table-filter>
    } @else {
      <ng-container [ngTemplateOutlet]="notFilterTemplate"></ng-container>
    }
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
      <ng-content select="nz-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters
        [sortOrder]="sortOrder"
        [sortDirections]="sortDirections"
        [contentTemplate]="contentTemplate"
      ></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
      host: {
        "[class.ant-table-column-has-sorters]": "nzShowSort",
        "[class.ant-table-column-sort]": `sortOrder === 'descend' || sortOrder === 'ascend'`
      },
      imports: [NzTableFilterComponent, NgTemplateOutlet, NzTableSortersComponent]
    }]
  }], null, {
    nzColumnKey: [{
      type: Input
    }],
    nzFilterMultiple: [{
      type: Input
    }],
    nzSortOrder: [{
      type: Input
    }],
    nzSortPriority: [{
      type: Input
    }],
    nzSortDirections: [{
      type: Input
    }],
    nzFilters: [{
      type: Input
    }],
    nzSortFn: [{
      type: Input
    }],
    nzFilterFn: [{
      type: Input
    }],
    nzShowSort: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowFilter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCustomFilter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCheckedChange: [{
      type: Output
    }],
    nzSortOrderChange: [{
      type: Output
    }],
    nzFilterChange: [{
      type: Output
    }]
  });
})();
var NzThMeasureDirective = class _NzThMeasureDirective {
  renderer = inject(Renderer2);
  el = inject(ElementRef).nativeElement;
  changes$ = new Subject();
  nzWidth = null;
  colspan = null;
  colSpan = null;
  rowspan = null;
  rowSpan = null;
  ngOnChanges(changes) {
    const {
      nzWidth,
      colspan,
      rowspan,
      colSpan,
      rowSpan
    } = changes;
    if (colspan || colSpan) {
      const col = this.colspan || this.colSpan;
      if (!isNil(col)) {
        this.renderer.setAttribute(this.el, "colspan", `${col}`);
      } else {
        this.renderer.removeAttribute(this.el, "colspan");
      }
    }
    if (rowspan || rowSpan) {
      const row = this.rowspan || this.rowSpan;
      if (!isNil(row)) {
        this.renderer.setAttribute(this.el, "rowspan", `${row}`);
      } else {
        this.renderer.removeAttribute(this.el, "rowspan");
      }
    }
    if (nzWidth || colspan) {
      this.changes$.next();
    }
  }
  static ɵfac = function NzThMeasureDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzThMeasureDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzThMeasureDirective,
    selectors: [["th"]],
    inputs: {
      nzWidth: "nzWidth",
      colspan: "colspan",
      colSpan: "colSpan",
      rowspan: "rowspan",
      rowSpan: "rowSpan"
    },
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzThMeasureDirective, [{
    type: Directive,
    args: [{
      selector: "th"
    }]
  }], null, {
    nzWidth: [{
      type: Input
    }],
    colspan: [{
      type: Input
    }],
    colSpan: [{
      type: Input
    }],
    rowspan: [{
      type: Input
    }],
    rowSpan: [{
      type: Input
    }]
  });
})();
var NzThSelectionComponent = class _NzThSelectionComponent {
  nzSelections = [];
  nzChecked = false;
  nzDisabled = false;
  nzIndeterminate = false;
  nzLabel = null;
  nzShowCheckbox = false;
  nzShowRowSelection = false;
  nzCheckedChange = new EventEmitter();
  isNzShowExpandChanged = false;
  isNzShowCheckboxChanged = false;
  onCheckedChange(checked) {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }
  ngOnChanges(changes) {
    const isFirstChange = (value) => value && value.firstChange && value.currentValue !== void 0;
    const {
      nzChecked,
      nzSelections,
      nzShowExpand,
      nzShowCheckbox
    } = changes;
    if (nzShowExpand) {
      this.isNzShowExpandChanged = true;
    }
    if (nzShowCheckbox) {
      this.isNzShowCheckboxChanged = true;
    }
    if (isFirstChange(nzSelections) && !this.isNzShowExpandChanged) {
      this.nzShowRowSelection = true;
    }
    if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
      this.nzShowCheckbox = true;
    }
  }
  static ɵfac = function NzThSelectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzThSelectionComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzThSelectionComponent,
    selectors: [["th", "nzSelections", ""], ["th", "nzChecked", ""], ["th", "nzShowCheckbox", ""], ["th", "nzShowRowSelection", ""]],
    hostAttrs: [1, "ant-table-selection-column"],
    inputs: {
      nzSelections: "nzSelections",
      nzChecked: [2, "nzChecked", "nzChecked", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzIndeterminate: "nzIndeterminate",
      nzLabel: "nzLabel",
      nzShowCheckbox: [2, "nzShowCheckbox", "nzShowCheckbox", booleanAttribute],
      nzShowRowSelection: [2, "nzShowRowSelection", "nzShowRowSelection", booleanAttribute]
    },
    outputs: {
      nzCheckedChange: "nzCheckedChange"
    },
    features: [ɵɵNgOnChangesFeature],
    attrs: _c5,
    ngContentSelectors: _c0,
    decls: 2,
    vars: 7,
    consts: [[3, "checkedChange", "checked", "disabled", "indeterminate", "label", "listOfSelections", "showCheckbox", "showRowSelection"]],
    template: function NzThSelectionComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "nz-table-selection", 0);
        ɵɵlistener("checkedChange", function NzThSelectionComponent_Template_nz_table_selection_checkedChange_0_listener($event) {
          return ctx.onCheckedChange($event);
        });
        ɵɵelementEnd();
        ɵɵprojection(1);
      }
      if (rf & 2) {
        ɵɵproperty("checked", ctx.nzChecked)("disabled", ctx.nzDisabled)("indeterminate", ctx.nzIndeterminate)("label", ctx.nzLabel)("listOfSelections", ctx.nzSelections)("showCheckbox", ctx.nzShowCheckbox)("showRowSelection", ctx.nzShowRowSelection);
      }
    },
    dependencies: [NzTableSelectionComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzThSelectionComponent, [{
    type: Component,
    args: [{
      selector: "th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <nz-table-selection
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [label]="nzLabel"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></nz-table-selection>
    <ng-content></ng-content>
  `,
      host: {
        class: "ant-table-selection-column"
      },
      imports: [NzTableSelectionComponent]
    }]
  }], null, {
    nzSelections: [{
      type: Input
    }],
    nzChecked: [{
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
    nzIndeterminate: [{
      type: Input
    }],
    nzLabel: [{
      type: Input
    }],
    nzShowCheckbox: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowRowSelection: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCheckedChange: [{
      type: Output
    }]
  });
})();
var NzCellAlignDirective = class _NzCellAlignDirective {
  nzAlign = null;
  static ɵfac = function NzCellAlignDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzCellAlignDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzCellAlignDirective,
    selectors: [["th", "nzAlign", ""], ["td", "nzAlign", ""]],
    hostVars: 2,
    hostBindings: function NzCellAlignDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("text-align", ctx.nzAlign);
      }
    },
    inputs: {
      nzAlign: "nzAlign"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCellAlignDirective, [{
    type: Directive,
    args: [{
      selector: "th[nzAlign],td[nzAlign]",
      host: {
        "[style.text-align]": "nzAlign"
      }
    }]
  }], null, {
    nzAlign: [{
      type: Input
    }]
  });
})();
var NzCellEllipsisDirective = class _NzCellEllipsisDirective {
  nzEllipsis = true;
  static ɵfac = function NzCellEllipsisDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzCellEllipsisDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzCellEllipsisDirective,
    selectors: [["th", "nzEllipsis", ""], ["td", "nzEllipsis", ""]],
    hostVars: 2,
    hostBindings: function NzCellEllipsisDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-table-cell-ellipsis", ctx.nzEllipsis);
      }
    },
    inputs: {
      nzEllipsis: [2, "nzEllipsis", "nzEllipsis", booleanAttribute]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCellEllipsisDirective, [{
    type: Directive,
    args: [{
      selector: "th[nzEllipsis],td[nzEllipsis]",
      host: {
        "[class.ant-table-cell-ellipsis]": "nzEllipsis"
      }
    }]
  }], null, {
    nzEllipsis: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var NzCellBreakWordDirective = class _NzCellBreakWordDirective {
  nzBreakWord = true;
  static ɵfac = function NzCellBreakWordDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzCellBreakWordDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzCellBreakWordDirective,
    selectors: [["th", "nzBreakWord", ""], ["td", "nzBreakWord", ""]],
    hostVars: 2,
    hostBindings: function NzCellBreakWordDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("word-break", ctx.nzBreakWord ? "break-all" : "");
      }
    },
    inputs: {
      nzBreakWord: [2, "nzBreakWord", "nzBreakWord", booleanAttribute]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCellBreakWordDirective, [{
    type: Directive,
    args: [{
      selector: "th[nzBreakWord],td[nzBreakWord]",
      host: {
        "[style.word-break]": `nzBreakWord ? 'break-all' : ''`
      }
    }]
  }], null, {
    nzBreakWord: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var NzTableContentComponent = class _NzTableContentComponent {
  tableLayout = "auto";
  theadTemplate = null;
  contentTemplate = null;
  tfootTemplate = null;
  listOfColWidth = [];
  scrollX = null;
  static ɵfac = function NzTableContentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableContentComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTableContentComponent,
    selectors: [["table", "nz-table-content", ""]],
    hostVars: 8,
    hostBindings: function NzTableContentComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("table-layout", ctx.tableLayout)("width", ctx.scrollX)("min-width", ctx.scrollX ? "100%" : null);
        ɵɵclassProp("ant-table-fixed", ctx.scrollX);
      }
    },
    inputs: {
      tableLayout: "tableLayout",
      theadTemplate: "theadTemplate",
      contentTemplate: "contentTemplate",
      tfootTemplate: "tfootTemplate",
      listOfColWidth: "listOfColWidth",
      scrollX: "scrollX"
    },
    attrs: _c6,
    ngContentSelectors: _c0,
    decls: 5,
    vars: 4,
    consts: [[1, "ant-table-thead"], [3, "ngTemplateOutlet"], [1, "ant-table-summary"], [3, "width", "minWidth"]],
    template: function NzTableContentComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵconditionalCreate(0, NzTableContentComponent_Conditional_0_Template, 3, 0, "colgroup");
        ɵɵconditionalCreate(1, NzTableContentComponent_Conditional_1_Template, 2, 1, "thead", 0);
        ɵɵtemplate(2, NzTableContentComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
        ɵɵprojection(3);
        ɵɵconditionalCreate(4, NzTableContentComponent_Conditional_4_Template, 2, 1, "tfoot", 2);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.listOfColWidth.length > 0 ? 0 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.theadTemplate ? 1 : -1);
        ɵɵadvance();
        ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate);
        ɵɵadvance(2);
        ɵɵconditional(ctx.tfootTemplate ? 4 : -1);
      }
    },
    dependencies: [NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableContentComponent, [{
    type: Component,
    args: [{
      selector: "table[nz-table-content]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (listOfColWidth.length > 0) {
      <colgroup>
        @for (width of listOfColWidth; track $index) {
          <col [style.width]="width" [style.minWidth]="width" />
        }
      </colgroup>
    }
    @if (theadTemplate) {
      <thead class="ant-table-thead">
        <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
      </thead>
    }
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    <ng-content></ng-content>
    @if (tfootTemplate) {
      <tfoot class="ant-table-summary">
        <ng-template [ngTemplateOutlet]="tfootTemplate"></ng-template>
      </tfoot>
    }
  `,
      host: {
        "[style.table-layout]": "tableLayout",
        "[class.ant-table-fixed]": "scrollX",
        "[style.width]": "scrollX",
        "[style.min-width]": `scrollX ? '100%' : null`
      },
      imports: [NgTemplateOutlet]
    }]
  }], null, {
    tableLayout: [{
      type: Input
    }],
    theadTemplate: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }],
    tfootTemplate: [{
      type: Input
    }],
    listOfColWidth: [{
      type: Input
    }],
    scrollX: [{
      type: Input
    }]
  });
})();
var NzTableFixedRowComponent = class _NzTableFixedRowComponent {
  nzTableStyleService = inject(NzTableStyleService);
  renderer = inject(Renderer2);
  destroyRef = inject(DestroyRef);
  tdElement;
  hostWidth$ = new BehaviorSubject(null);
  enableAutoMeasure$ = new BehaviorSubject(false);
  ngOnInit() {
    if (this.nzTableStyleService) {
      const {
        enableAutoMeasure$,
        hostWidth$
      } = this.nzTableStyleService;
      enableAutoMeasure$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.enableAutoMeasure$);
      hostWidth$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.hostWidth$);
    }
  }
  ngAfterViewInit() {
    this.nzTableStyleService.columnCount$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((count) => {
      this.renderer.setAttribute(this.tdElement.nativeElement, "colspan", `${count}`);
    });
  }
  static ɵfac = function NzTableFixedRowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableFixedRowComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTableFixedRowComponent,
    selectors: [["tr", "nz-table-fixed-row", ""], ["tr", "nzExpand", ""]],
    viewQuery: function NzTableFixedRowComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c7, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tdElement = _t.first);
      }
    },
    attrs: _c8,
    ngContentSelectors: _c0,
    decls: 7,
    vars: 3,
    consts: [["tdElement", ""], ["contentTemplate", ""], [1, "nz-disable-td", "ant-table-cell"], [1, "ant-table-expanded-row-fixed", 2, "position", "sticky", "left", "0", "overflow", "hidden", 3, "width"], [3, "ngTemplateOutlet"], [1, "ant-table-expanded-row-fixed", 2, "position", "sticky", "left", "0", "overflow", "hidden"]],
    template: function NzTableFixedRowComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "td", 2, 0);
        ɵɵconditionalCreate(2, NzTableFixedRowComponent_Conditional_2_Template, 3, 5, "div", 3);
        ɵɵpipe(3, "async");
        ɵɵconditionalBranchCreate(4, NzTableFixedRowComponent_Conditional_4_Template, 1, 1, null, 4);
        ɵɵelementEnd();
        ɵɵtemplate(5, NzTableFixedRowComponent_ng_template_5_Template, 1, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵconditional(ɵɵpipeBind1(3, 1, ctx.enableAutoMeasure$) ? 2 : 4);
      }
    },
    dependencies: [NgTemplateOutlet, AsyncPipe],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableFixedRowComponent, [{
    type: Component,
    args: [{
      selector: "tr[nz-table-fixed-row], tr[nzExpand]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <td class="nz-disable-td ant-table-cell" #tdElement>
      @if (enableAutoMeasure$ | async) {
        <div
          class="ant-table-expanded-row-fixed"
          style="position: sticky; left: 0; overflow: hidden;"
          [style.width.px]="hostWidth$ | async"
        >
          <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
        </div>
      } @else {
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      }
    </td>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
      imports: [AsyncPipe, NgTemplateOutlet]
    }]
  }], null, {
    tdElement: [{
      type: ViewChild,
      args: ["tdElement", {
        static: true
      }]
    }]
  });
})();
var NzTableInnerDefaultComponent = class _NzTableInnerDefaultComponent {
  tableLayout = "auto";
  listOfColWidth = [];
  theadTemplate = null;
  contentTemplate = null;
  tfootTemplate = null;
  static ɵfac = function NzTableInnerDefaultComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableInnerDefaultComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTableInnerDefaultComponent,
    selectors: [["nz-table-inner-default"]],
    hostAttrs: [1, "ant-table-container"],
    inputs: {
      tableLayout: "tableLayout",
      listOfColWidth: "listOfColWidth",
      theadTemplate: "theadTemplate",
      contentTemplate: "contentTemplate",
      tfootTemplate: "tfootTemplate"
    },
    decls: 2,
    vars: 5,
    consts: [[1, "ant-table-content"], ["nz-table-content", "", 3, "contentTemplate", "tableLayout", "listOfColWidth", "theadTemplate", "tfootTemplate"]],
    template: function NzTableInnerDefaultComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelement(1, "table", 1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵproperty("contentTemplate", ctx.contentTemplate)("tableLayout", ctx.tableLayout)("listOfColWidth", ctx.listOfColWidth)("theadTemplate", ctx.theadTemplate)("tfootTemplate", ctx.tfootTemplate);
      }
    },
    dependencies: [NzTableContentComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableInnerDefaultComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-inner-default",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <div class="ant-table-content">
      <table
        nz-table-content
        [contentTemplate]="contentTemplate"
        [tableLayout]="tableLayout"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
        [tfootTemplate]="tfootTemplate"
      ></table>
    </div>
  `,
      host: {
        class: "ant-table-container"
      },
      imports: [NzTableContentComponent]
    }]
  }], null, {
    tableLayout: [{
      type: Input
    }],
    listOfColWidth: [{
      type: Input
    }],
    theadTemplate: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }],
    tfootTemplate: [{
      type: Input
    }]
  });
})();
var NzTrMeasureComponent = class _NzTrMeasureComponent {
  nzResizeObserver = inject(NzResizeObserver);
  ngZone = inject(NgZone);
  destroyRef = inject(DestroyRef);
  listOfMeasureColumn = [];
  listOfAutoWidth = new EventEmitter();
  listOfTdElement;
  ngAfterViewInit() {
    this.listOfTdElement.changes.pipe(startWith(this.listOfTdElement)).pipe(switchMap((list) => combineLatest(list.toArray().map((item) => this.nzResizeObserver.observe(item).pipe(map(([entry]) => {
      const {
        width
      } = entry.target.getBoundingClientRect();
      return Math.floor(width);
    }))))), debounceTime(16), takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      if (this.ngZone instanceof NgZone && NgZone.isInAngularZone()) {
        this.listOfAutoWidth.next(data);
      } else {
        this.ngZone.run(() => this.listOfAutoWidth.next(data));
      }
    });
  }
  static ɵfac = function NzTrMeasureComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTrMeasureComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTrMeasureComponent,
    selectors: [["tr", "nz-table-measure-row", ""]],
    viewQuery: function NzTrMeasureComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c7, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listOfTdElement = _t);
      }
    },
    hostAttrs: [1, "ant-table-measure-now"],
    inputs: {
      listOfMeasureColumn: "listOfMeasureColumn"
    },
    outputs: {
      listOfAutoWidth: "listOfAutoWidth"
    },
    attrs: _c9,
    decls: 2,
    vars: 0,
    consts: [["tdElement", ""], [1, "nz-disable-td", 2, "padding", "0", "border", "0", "height", "0"]],
    template: function NzTrMeasureComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵrepeaterCreate(0, NzTrMeasureComponent_For_1_Template, 2, 0, "td", 1, ɵɵrepeaterTrackByIndex);
      }
      if (rf & 2) {
        ɵɵrepeater(ctx.listOfMeasureColumn);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTrMeasureComponent, [{
    type: Component,
    args: [{
      selector: "tr[nz-table-measure-row]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @for (th of listOfMeasureColumn; track $index) {
      <td #tdElement class="nz-disable-td" style="padding: 0; border: 0; height: 0;"></td>
    }
  `,
      host: {
        class: "ant-table-measure-now"
      }
    }]
  }], null, {
    listOfMeasureColumn: [{
      type: Input
    }],
    listOfAutoWidth: [{
      type: Output
    }],
    listOfTdElement: [{
      type: ViewChildren,
      args: ["tdElement"]
    }]
  });
})();
var NzTbodyComponent = class _NzTbodyComponent {
  showEmpty$ = new BehaviorSubject(false);
  noResult$ = new BehaviorSubject(void 0);
  listOfMeasureColumn$ = new BehaviorSubject([]);
  nzTableStyleService = inject(NzTableStyleService, {
    optional: true
  });
  isInsideTable = !!this.nzTableStyleService;
  constructor() {
    if (this.nzTableStyleService) {
      const {
        showEmpty$,
        noResult$,
        listOfMeasureColumn$
      } = this.nzTableStyleService;
      noResult$.pipe(takeUntilDestroyed()).subscribe(this.noResult$);
      listOfMeasureColumn$.pipe(takeUntilDestroyed()).subscribe(this.listOfMeasureColumn$);
      showEmpty$.pipe(takeUntilDestroyed()).subscribe(this.showEmpty$);
    }
  }
  onListOfAutoWidthChange(listOfAutoWidth) {
    this.nzTableStyleService?.setListOfAutoWidth(listOfAutoWidth);
  }
  static ɵfac = function NzTbodyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTbodyComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTbodyComponent,
    selectors: [["tbody"]],
    hostVars: 2,
    hostBindings: function NzTbodyComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-table-tbody", ctx.isInsideTable);
      }
    },
    ngContentSelectors: _c0,
    decls: 5,
    vars: 6,
    consts: [["nz-table-fixed-row", "", 1, "ant-table-placeholder"], ["nz-table-measure-row", "", 3, "listOfMeasureColumn"], ["nz-table-measure-row", "", 3, "listOfAutoWidth", "listOfMeasureColumn"], ["nzComponentName", "table", 3, "specificContent"]],
    template: function NzTbodyComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵconditionalCreate(0, NzTbodyComponent_Conditional_0_Template, 1, 1);
        ɵɵpipe(1, "async");
        ɵɵprojection(2);
        ɵɵconditionalCreate(3, NzTbodyComponent_Conditional_3_Template, 3, 3, "tr", 0);
        ɵɵpipe(4, "async");
      }
      if (rf & 2) {
        let tmp_0_0;
        ɵɵconditional((tmp_0_0 = ɵɵpipeBind1(1, 2, ctx.listOfMeasureColumn$)) ? 0 : -1, tmp_0_0);
        ɵɵadvance(3);
        ɵɵconditional(ɵɵpipeBind1(4, 4, ctx.showEmpty$) ? 3 : -1);
      }
    },
    dependencies: [NzTrMeasureComponent, NzTableFixedRowComponent, NzEmptyModule, NzEmbedEmptyComponent, AsyncPipe],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTbodyComponent, [{
    type: Component,
    args: [{
      selector: "tbody",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (listOfMeasureColumn$ | async; as listOfMeasureColumn) {
      @if (isInsideTable && listOfMeasureColumn.length) {
        <tr
          nz-table-measure-row
          [listOfMeasureColumn]="listOfMeasureColumn"
          (listOfAutoWidth)="onListOfAutoWidthChange($event)"
        ></tr>
      }
    }
    <ng-content></ng-content>
    @if (showEmpty$ | async) {
      <tr class="ant-table-placeholder" nz-table-fixed-row>
        <nz-embed-empty nzComponentName="table" [specificContent]="(noResult$ | async)!"></nz-embed-empty>
      </tr>
    }
  `,
      host: {
        "[class.ant-table-tbody]": "isInsideTable"
      },
      imports: [AsyncPipe, NzTrMeasureComponent, NzTableFixedRowComponent, NzEmptyModule]
    }]
  }], () => [], null);
})();
var NzTableInnerScrollComponent = class _NzTableInnerScrollComponent {
  renderer = inject(Renderer2);
  ngZone = inject(NgZone);
  platform = inject(Platform);
  resizeService = inject(NzResizeService);
  destroyRef = inject(DestroyRef);
  data = [];
  scrollX = null;
  scrollY = null;
  contentTemplate = null;
  widthConfig = [];
  listOfColWidth = [];
  theadTemplate = null;
  tfootTemplate = null;
  tfootFixed = null;
  virtualTemplate = null;
  virtualItemSize = 0;
  virtualMaxBufferPx = 200;
  virtualMinBufferPx = 100;
  tableMainElement;
  virtualForTrackBy = (index) => index;
  tableHeaderElement;
  tableBodyElement;
  tableFootElement;
  cdkVirtualScrollViewport;
  headerStyleMap = {};
  bodyStyleMap = {};
  verticalScrollBarWidth = 0;
  noDataVirtualHeight = "182px";
  data$ = new Subject();
  scroll$ = new Subject();
  setScrollPositionClassName(clear = false) {
    const {
      scrollWidth,
      scrollLeft,
      clientWidth
    } = this.tableBodyElement.nativeElement;
    const leftClassName = "ant-table-ping-left";
    const rightClassName = "ant-table-ping-right";
    if (scrollWidth === clientWidth && scrollWidth !== 0 || clear) {
      this.renderer.removeClass(this.tableMainElement, leftClassName);
      this.renderer.removeClass(this.tableMainElement, rightClassName);
    } else if (scrollLeft === 0) {
      this.renderer.removeClass(this.tableMainElement, leftClassName);
      this.renderer.addClass(this.tableMainElement, rightClassName);
    } else if (scrollWidth === scrollLeft + clientWidth) {
      this.renderer.removeClass(this.tableMainElement, rightClassName);
      this.renderer.addClass(this.tableMainElement, leftClassName);
    } else {
      this.renderer.addClass(this.tableMainElement, leftClassName);
      this.renderer.addClass(this.tableMainElement, rightClassName);
    }
  }
  constructor() {
    this.destroyRef.onDestroy(() => {
      this.setScrollPositionClassName(true);
    });
  }
  ngOnChanges(changes) {
    const {
      scrollX,
      scrollY,
      data
    } = changes;
    if (scrollX || scrollY) {
      const hasVerticalScrollBar = this.verticalScrollBarWidth !== 0;
      this.headerStyleMap = {
        overflowX: "hidden",
        overflowY: this.scrollY && hasVerticalScrollBar ? "scroll" : "hidden"
      };
      this.bodyStyleMap = {
        overflowY: this.scrollY ? "scroll" : "hidden",
        overflowX: this.scrollX ? "auto" : null,
        maxHeight: this.scrollY
      };
      this.ngZone.runOutsideAngular(() => this.scroll$.next());
    }
    if (data) {
      this.ngZone.runOutsideAngular(() => this.data$.next());
    }
  }
  ngAfterViewInit() {
    if (this.platform.isBrowser) {
      const scrollEvent$ = this.scroll$.pipe(startWith(null), delay(0), switchMap(() => fromEventOutsideAngular(this.tableBodyElement.nativeElement, "scroll").pipe(startWith(true))));
      const resize$ = this.resizeService.connect();
      merge(scrollEvent$, resize$, this.data$, this.scroll$).pipe(startWith(true), delay(0), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.setScrollPositionClassName());
      scrollEvent$.pipe(filter(() => !!this.scrollY)).subscribe(() => {
        this.tableHeaderElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft;
        if (this.tableFootElement) {
          this.tableFootElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft;
        }
      });
    }
  }
  static ɵfac = function NzTableInnerScrollComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableInnerScrollComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTableInnerScrollComponent,
    selectors: [["nz-table-inner-scroll"]],
    viewQuery: function NzTableInnerScrollComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c10, 5, ElementRef);
        ɵɵviewQuery(_c11, 5, ElementRef);
        ɵɵviewQuery(_c12, 5, ElementRef);
        ɵɵviewQuery(CdkVirtualScrollViewport, 5, CdkVirtualScrollViewport);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tableHeaderElement = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tableBodyElement = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tableFootElement = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.cdkVirtualScrollViewport = _t.first);
      }
    },
    hostAttrs: [1, "ant-table-container"],
    inputs: {
      data: "data",
      scrollX: "scrollX",
      scrollY: "scrollY",
      contentTemplate: "contentTemplate",
      widthConfig: "widthConfig",
      listOfColWidth: "listOfColWidth",
      theadTemplate: "theadTemplate",
      tfootTemplate: "tfootTemplate",
      tfootFixed: "tfootFixed",
      virtualTemplate: "virtualTemplate",
      virtualItemSize: "virtualItemSize",
      virtualMaxBufferPx: "virtualMaxBufferPx",
      virtualMinBufferPx: "virtualMinBufferPx",
      tableMainElement: "tableMainElement",
      virtualForTrackBy: "virtualForTrackBy",
      verticalScrollBarWidth: "verticalScrollBarWidth",
      noDataVirtualHeight: "noDataVirtualHeight"
    },
    features: [ɵɵNgOnChangesFeature],
    decls: 2,
    vars: 1,
    consts: [["tableHeaderElement", ""], ["tableBodyElement", ""], ["tableFootElement", ""], [1, "ant-table-content", 3, "style"], [1, "ant-table-header", "nz-table-hide-scrollbar"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth", "theadTemplate", "tfootTemplate"], [1, "ant-table-body", 3, "style"], [3, "itemSize", "maxBufferPx", "minBufferPx", "height"], [1, "ant-table-summary", 3, "style"], [1, "ant-table-body"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth", "contentTemplate"], [3, "itemSize", "maxBufferPx", "minBufferPx"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth"], [4, "cdkVirtualFor", "cdkVirtualForOf", "cdkVirtualForTrackBy"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ant-table-summary"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth", "tfootTemplate"], [1, "ant-table-content"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth", "theadTemplate", "contentTemplate", "tfootTemplate"]],
    template: function NzTableInnerScrollComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, NzTableInnerScrollComponent_Conditional_0_Template, 6, 8)(1, NzTableInnerScrollComponent_Conditional_1_Template, 3, 7, "div", 3);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.scrollY ? 0 : 1);
      }
    },
    dependencies: [NzTableContentComponent, ScrollingModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, NgTemplateOutlet, NzTbodyComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableInnerScrollComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-inner-scroll",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (scrollY) {
      <div #tableHeaderElement [style]="headerStyleMap" class="ant-table-header nz-table-hide-scrollbar">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [tfootTemplate]="tfootFixed === 'top' ? tfootTemplate : null"
        ></table>
      </div>
      @if (!virtualTemplate) {
        <div #tableBodyElement class="ant-table-body" [style]="bodyStyleMap">
          <table
            nz-table-content
            tableLayout="fixed"
            [scrollX]="scrollX"
            [listOfColWidth]="listOfColWidth"
            [contentTemplate]="contentTemplate"
          ></table>
        </div>
      } @else {
        <cdk-virtual-scroll-viewport
          #tableBodyElement
          [itemSize]="virtualItemSize"
          [maxBufferPx]="virtualMaxBufferPx"
          [minBufferPx]="virtualMinBufferPx"
          [style.height]="data.length ? scrollY : noDataVirtualHeight"
        >
          <table nz-table-content tableLayout="fixed" [scrollX]="scrollX" [listOfColWidth]="listOfColWidth">
            <tbody>
              <ng-container *cdkVirtualFor="let item of data; let i = index; trackBy: virtualForTrackBy">
                <ng-template
                  [ngTemplateOutlet]="virtualTemplate"
                  [ngTemplateOutletContext]="{ $implicit: item, index: i }"
                ></ng-template>
              </ng-container>
            </tbody>
          </table>
        </cdk-virtual-scroll-viewport>
      }
      @if (tfootFixed === 'bottom') {
        <div #tableFootElement class="ant-table-summary" [style]="headerStyleMap">
          <table
            nz-table-content
            tableLayout="fixed"
            [scrollX]="scrollX"
            [listOfColWidth]="listOfColWidth"
            [tfootTemplate]="tfootTemplate"
          ></table>
        </div>
      }
    } @else {
      <div class="ant-table-content" #tableBodyElement [style]="bodyStyleMap">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [contentTemplate]="contentTemplate"
          [tfootTemplate]="tfootTemplate"
        ></table>
      </div>
    }
  `,
      host: {
        class: "ant-table-container"
      },
      imports: [NzTableContentComponent, ScrollingModule, NgTemplateOutlet, NzTbodyComponent]
    }]
  }], () => [], {
    data: [{
      type: Input
    }],
    scrollX: [{
      type: Input
    }],
    scrollY: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }],
    widthConfig: [{
      type: Input
    }],
    listOfColWidth: [{
      type: Input
    }],
    theadTemplate: [{
      type: Input
    }],
    tfootTemplate: [{
      type: Input
    }],
    tfootFixed: [{
      type: Input
    }],
    virtualTemplate: [{
      type: Input
    }],
    virtualItemSize: [{
      type: Input
    }],
    virtualMaxBufferPx: [{
      type: Input
    }],
    virtualMinBufferPx: [{
      type: Input
    }],
    tableMainElement: [{
      type: Input
    }],
    virtualForTrackBy: [{
      type: Input
    }],
    tableHeaderElement: [{
      type: ViewChild,
      args: ["tableHeaderElement", {
        read: ElementRef
      }]
    }],
    tableBodyElement: [{
      type: ViewChild,
      args: ["tableBodyElement", {
        read: ElementRef
      }]
    }],
    tableFootElement: [{
      type: ViewChild,
      args: ["tableFootElement", {
        read: ElementRef
      }]
    }],
    cdkVirtualScrollViewport: [{
      type: ViewChild,
      args: [CdkVirtualScrollViewport, {
        read: CdkVirtualScrollViewport
      }]
    }],
    verticalScrollBarWidth: [{
      type: Input
    }],
    noDataVirtualHeight: [{
      type: Input
    }]
  });
})();
var NzTableVirtualScrollDirective = class _NzTableVirtualScrollDirective {
  templateRef = inject(TemplateRef);
  static ngTemplateContextGuard(_dir, _ctx) {
    return true;
  }
  static ɵfac = function NzTableVirtualScrollDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableVirtualScrollDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzTableVirtualScrollDirective,
    selectors: [["", "nz-virtual-scroll", ""]],
    exportAs: ["nzVirtualScroll"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableVirtualScrollDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-virtual-scroll]",
      exportAs: "nzVirtualScroll"
    }]
  }], null, null);
})();
var NzTableTitleFooterComponent = class _NzTableTitleFooterComponent {
  title = null;
  footer = null;
  static ɵfac = function NzTableTitleFooterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableTitleFooterComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTableTitleFooterComponent,
    selectors: [["nz-table-title-footer"]],
    hostVars: 4,
    hostBindings: function NzTableTitleFooterComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-table-title", ctx.title !== null)("ant-table-footer", ctx.footer !== null);
      }
    },
    inputs: {
      title: "title",
      footer: "footer"
    },
    decls: 2,
    vars: 2,
    consts: [[4, "nzStringTemplateOutlet"]],
    template: function NzTableTitleFooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, NzTableTitleFooterComponent_ng_container_0_Template, 2, 1, "ng-container", 0)(1, NzTableTitleFooterComponent_ng_container_1_Template, 2, 1, "ng-container", 0);
      }
      if (rf & 2) {
        ɵɵproperty("nzStringTemplateOutlet", ctx.title);
        ɵɵadvance();
        ɵɵproperty("nzStringTemplateOutlet", ctx.footer);
      }
    },
    dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableTitleFooterComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-title-footer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
  `,
      host: {
        "[class.ant-table-title]": `title !== null`,
        "[class.ant-table-footer]": `footer !== null`
      },
      imports: [NzOutletModule]
    }]
  }], null, {
    title: [{
      type: Input
    }],
    footer: [{
      type: Input
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "table";
var NzTableComponent = (() => {
  var _a;
  let _nzLoadingIndicator_decorators;
  let _nzLoadingIndicator_initializers = [];
  let _nzLoadingIndicator_extraInitializers = [];
  let _nzBordered_decorators;
  let _nzBordered_initializers = [];
  let _nzBordered_extraInitializers = [];
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  let _nzShowSizeChanger_decorators;
  let _nzShowSizeChanger_initializers = [];
  let _nzShowSizeChanger_extraInitializers = [];
  let _nzHideOnSinglePage_decorators;
  let _nzHideOnSinglePage_initializers = [];
  let _nzHideOnSinglePage_extraInitializers = [];
  let _nzShowQuickJumper_decorators;
  let _nzShowQuickJumper_initializers = [];
  let _nzShowQuickJumper_extraInitializers = [];
  let _nzSimple_decorators;
  let _nzSimple_initializers = [];
  let _nzSimple_extraInitializers = [];
  return _a = class {
    _nzModuleName = NZ_CONFIG_MODULE_NAME;
    elementRef = inject(ElementRef);
    nzResizeObserver = inject(NzResizeObserver);
    cdr = inject(ChangeDetectorRef);
    nzTableStyleService = inject(NzTableStyleService);
    nzTableDataService = inject(NzTableDataService);
    directionality = inject(Directionality);
    destroyRef = inject(DestroyRef);
    nzTableLayout = "auto";
    nzShowTotal = null;
    nzItemRender = null;
    nzTitle = null;
    nzFooter = null;
    nzNoResult = void 0;
    nzPageSizeOptions = [10, 20, 30, 40, 50];
    nzVirtualItemSize = 0;
    nzVirtualMaxBufferPx = 200;
    nzVirtualMinBufferPx = 100;
    nzVirtualForTrackBy = (index) => index;
    nzLoadingDelay = 0;
    nzPageIndex = 1;
    nzPageSize = 10;
    nzTotal = 0;
    nzWidthConfig = [];
    nzData = [];
    nzCustomColumn = [];
    nzPaginationPosition = "bottom";
    nzScroll = {
      x: null,
      y: null
    };
    noDataVirtualHeight = "182px";
    nzPaginationType = "default";
    nzFrontPagination = true;
    nzTemplateMode = false;
    nzShowPagination = true;
    nzLoading = false;
    nzOuterBordered = false;
    nzLoadingIndicator = __runInitializers(this, _nzLoadingIndicator_initializers, null);
    nzBordered = (__runInitializers(this, _nzLoadingIndicator_extraInitializers), __runInitializers(this, _nzBordered_initializers, false));
    nzSize = (__runInitializers(this, _nzBordered_extraInitializers), __runInitializers(this, _nzSize_initializers, "default"));
    nzShowSizeChanger = (__runInitializers(this, _nzSize_extraInitializers), __runInitializers(this, _nzShowSizeChanger_initializers, false));
    nzHideOnSinglePage = (__runInitializers(this, _nzShowSizeChanger_extraInitializers), __runInitializers(this, _nzHideOnSinglePage_initializers, false));
    nzShowQuickJumper = (__runInitializers(this, _nzHideOnSinglePage_extraInitializers), __runInitializers(this, _nzShowQuickJumper_initializers, false));
    nzSimple = (__runInitializers(this, _nzShowQuickJumper_extraInitializers), __runInitializers(this, _nzSimple_initializers, false));
    nzPageSizeChange = (__runInitializers(this, _nzSimple_extraInitializers), new EventEmitter());
    nzPageIndexChange = new EventEmitter();
    nzQueryParams = new EventEmitter();
    nzCurrentPageDataChange = new EventEmitter();
    nzCustomColumnChange = new EventEmitter();
    /** public data for ngFor tr */
    data = [];
    cdkVirtualScrollViewport;
    scrollX = null;
    scrollY = null;
    theadTemplate = null;
    tfootTemplate = null;
    tfootFixed = null;
    listOfAutoColWidth = [];
    listOfManualColWidth = [];
    hasFixLeft = false;
    hasFixRight = false;
    showPagination = true;
    templateMode$ = new BehaviorSubject(false);
    dir = "ltr";
    nzVirtualScrollDirective;
    nzTableInnerScrollComponent;
    verticalScrollBarWidth = 0;
    onPageSizeChange(size) {
      this.nzTableDataService.updatePageSize(size);
    }
    onPageIndexChange(index) {
      this.nzTableDataService.updatePageIndex(index);
    }
    constructor() {
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => this.cdr.markForCheck());
    }
    ngOnInit() {
      const {
        pageIndexDistinct$,
        pageSizeDistinct$,
        listOfCurrentPageData$,
        total$,
        queryParams$,
        listOfCustomColumn$
      } = this.nzTableDataService;
      const {
        theadTemplate$,
        tfootTemplate$,
        tfootFixed$,
        hasFixLeft$,
        hasFixRight$
      } = this.nzTableStyleService;
      this.dir = this.directionality.value;
      this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      queryParams$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.nzQueryParams);
      pageIndexDistinct$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pageIndex) => {
        if (pageIndex !== this.nzPageIndex) {
          this.nzPageIndex = pageIndex;
          this.nzPageIndexChange.next(pageIndex);
        }
      });
      pageSizeDistinct$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pageSize) => {
        if (pageSize !== this.nzPageSize) {
          this.nzPageSize = pageSize;
          this.nzPageSizeChange.next(pageSize);
        }
      });
      total$.pipe(takeUntilDestroyed(this.destroyRef), filter((total) => this.nzFrontPagination && total !== this.nzTotal)).subscribe((total) => {
        this.nzTotal = total;
        this.cdr.markForCheck();
      });
      listOfCurrentPageData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
        this.data = data;
        this.nzCurrentPageDataChange.next(data);
        this.cdr.markForCheck();
      });
      listOfCustomColumn$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
        this.nzCustomColumn = data;
        this.nzCustomColumnChange.next(data);
        this.cdr.markForCheck();
      });
      theadTemplate$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((theadTemplate) => {
        this.theadTemplate = theadTemplate;
        this.cdr.markForCheck();
      });
      combineLatest([tfootTemplate$, tfootFixed$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([tfootTemplate, tfootFixed]) => {
        this.tfootTemplate = tfootTemplate;
        this.tfootFixed = tfootFixed;
        this.cdr.markForCheck();
      });
      hasFixLeft$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((hasFixLeft) => {
        this.hasFixLeft = hasFixLeft;
        this.cdr.markForCheck();
      });
      hasFixRight$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((hasFixRight) => {
        this.hasFixRight = hasFixRight;
        this.cdr.markForCheck();
      });
      combineLatest([total$, this.templateMode$]).pipe(map(([total, templateMode]) => total === 0 && !templateMode), takeUntilDestroyed(this.destroyRef)).subscribe((empty) => {
        this.nzTableStyleService.setShowEmpty(empty);
      });
      this.verticalScrollBarWidth = measureScrollbar("vertical");
      this.nzTableStyleService.listOfListOfThWidthPx$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((listOfWidth) => {
        this.listOfAutoColWidth = listOfWidth;
        this.cdr.markForCheck();
      });
      this.nzTableStyleService.manualWidthConfigPx$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((listOfWidth) => {
        this.listOfManualColWidth = listOfWidth;
        this.cdr.markForCheck();
      });
    }
    ngOnChanges(changes) {
      const {
        nzScroll,
        nzPageIndex,
        nzPageSize,
        nzFrontPagination,
        nzData,
        nzCustomColumn,
        nzWidthConfig,
        nzNoResult,
        nzTemplateMode
      } = changes;
      if (nzPageIndex) {
        this.nzTableDataService.updatePageIndex(this.nzPageIndex);
      }
      if (nzPageSize) {
        this.nzTableDataService.updatePageSize(this.nzPageSize);
      }
      if (nzData) {
        this.nzData = this.nzData || [];
        this.nzTableDataService.updateListOfData(this.nzData);
      }
      if (nzCustomColumn) {
        this.nzCustomColumn = this.nzCustomColumn || [];
        this.nzTableDataService.updateListOfCustomColumn(this.nzCustomColumn);
      }
      if (nzFrontPagination) {
        this.nzTableDataService.updateFrontPagination(this.nzFrontPagination);
      }
      if (nzScroll) {
        this.setScrollOnChanges();
      }
      if (nzWidthConfig) {
        this.nzTableStyleService.setTableWidthConfig(this.nzWidthConfig);
      }
      if (nzTemplateMode) {
        this.templateMode$.next(this.nzTemplateMode);
      }
      if (nzNoResult) {
        this.nzTableStyleService.setNoResult(this.nzNoResult);
      }
      this.updateShowPagination();
    }
    ngAfterViewInit() {
      this.nzResizeObserver.observe(this.elementRef).pipe(map(([entry]) => {
        const {
          width
        } = entry.target.getBoundingClientRect();
        const scrollBarWidth = this.scrollY ? this.verticalScrollBarWidth : 0;
        return Math.floor(width - scrollBarWidth);
      }), takeUntilDestroyed(this.destroyRef)).subscribe(this.nzTableStyleService.hostWidth$);
      if (this.nzTableInnerScrollComponent && this.nzTableInnerScrollComponent.cdkVirtualScrollViewport) {
        this.cdkVirtualScrollViewport = this.nzTableInnerScrollComponent.cdkVirtualScrollViewport;
      }
    }
    setScrollOnChanges() {
      this.scrollX = this.nzScroll && this.nzScroll.x || null;
      this.scrollY = this.nzScroll && this.nzScroll.y || null;
      this.nzTableStyleService.setScroll(this.scrollX, this.scrollY);
    }
    updateShowPagination() {
      this.showPagination = this.nzHideOnSinglePage && this.nzData.length > this.nzPageSize || this.nzData.length > 0 && !this.nzHideOnSinglePage || !this.nzFrontPagination && this.nzTotal > this.nzPageSize;
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzLoadingIndicator_decorators = [WithConfig()];
    _nzBordered_decorators = [WithConfig()];
    _nzSize_decorators = [WithConfig()];
    _nzShowSizeChanger_decorators = [WithConfig()];
    _nzHideOnSinglePage_decorators = [WithConfig()];
    _nzShowQuickJumper_decorators = [WithConfig()];
    _nzSimple_decorators = [WithConfig()];
    __esDecorate(null, null, _nzLoadingIndicator_decorators, {
      kind: "field",
      name: "nzLoadingIndicator",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzLoadingIndicator" in obj,
        get: (obj) => obj.nzLoadingIndicator,
        set: (obj, value) => {
          obj.nzLoadingIndicator = value;
        }
      },
      metadata: _metadata
    }, _nzLoadingIndicator_initializers, _nzLoadingIndicator_extraInitializers);
    __esDecorate(null, null, _nzBordered_decorators, {
      kind: "field",
      name: "nzBordered",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzBordered" in obj,
        get: (obj) => obj.nzBordered,
        set: (obj, value) => {
          obj.nzBordered = value;
        }
      },
      metadata: _metadata
    }, _nzBordered_initializers, _nzBordered_extraInitializers);
    __esDecorate(null, null, _nzSize_decorators, {
      kind: "field",
      name: "nzSize",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSize" in obj,
        get: (obj) => obj.nzSize,
        set: (obj, value) => {
          obj.nzSize = value;
        }
      },
      metadata: _metadata
    }, _nzSize_initializers, _nzSize_extraInitializers);
    __esDecorate(null, null, _nzShowSizeChanger_decorators, {
      kind: "field",
      name: "nzShowSizeChanger",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShowSizeChanger" in obj,
        get: (obj) => obj.nzShowSizeChanger,
        set: (obj, value) => {
          obj.nzShowSizeChanger = value;
        }
      },
      metadata: _metadata
    }, _nzShowSizeChanger_initializers, _nzShowSizeChanger_extraInitializers);
    __esDecorate(null, null, _nzHideOnSinglePage_decorators, {
      kind: "field",
      name: "nzHideOnSinglePage",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzHideOnSinglePage" in obj,
        get: (obj) => obj.nzHideOnSinglePage,
        set: (obj, value) => {
          obj.nzHideOnSinglePage = value;
        }
      },
      metadata: _metadata
    }, _nzHideOnSinglePage_initializers, _nzHideOnSinglePage_extraInitializers);
    __esDecorate(null, null, _nzShowQuickJumper_decorators, {
      kind: "field",
      name: "nzShowQuickJumper",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShowQuickJumper" in obj,
        get: (obj) => obj.nzShowQuickJumper,
        set: (obj, value) => {
          obj.nzShowQuickJumper = value;
        }
      },
      metadata: _metadata
    }, _nzShowQuickJumper_initializers, _nzShowQuickJumper_extraInitializers);
    __esDecorate(null, null, _nzSimple_decorators, {
      kind: "field",
      name: "nzSimple",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSimple" in obj,
        get: (obj) => obj.nzSimple,
        set: (obj, value) => {
          obj.nzSimple = value;
        }
      },
      metadata: _metadata
    }, _nzSimple_initializers, _nzSimple_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "ɵfac", function NzTableComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "ɵcmp", ɵɵdefineComponent({
    type: _a,
    selectors: [["nz-table"]],
    contentQueries: function NzTableComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, NzTableVirtualScrollDirective, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nzVirtualScrollDirective = _t.first);
      }
    },
    viewQuery: function NzTableComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(NzTableInnerScrollComponent, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nzTableInnerScrollComponent = _t.first);
      }
    },
    hostAttrs: [1, "ant-table-wrapper"],
    hostVars: 4,
    hostBindings: function NzTableComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-table-wrapper-rtl", ctx.dir === "rtl")("ant-table-custom-column", ctx.nzCustomColumn.length);
      }
    },
    inputs: {
      nzTableLayout: "nzTableLayout",
      nzShowTotal: "nzShowTotal",
      nzItemRender: "nzItemRender",
      nzTitle: "nzTitle",
      nzFooter: "nzFooter",
      nzNoResult: "nzNoResult",
      nzPageSizeOptions: "nzPageSizeOptions",
      nzVirtualItemSize: "nzVirtualItemSize",
      nzVirtualMaxBufferPx: "nzVirtualMaxBufferPx",
      nzVirtualMinBufferPx: "nzVirtualMinBufferPx",
      nzVirtualForTrackBy: "nzVirtualForTrackBy",
      nzLoadingDelay: "nzLoadingDelay",
      nzPageIndex: "nzPageIndex",
      nzPageSize: "nzPageSize",
      nzTotal: "nzTotal",
      nzWidthConfig: "nzWidthConfig",
      nzData: "nzData",
      nzCustomColumn: "nzCustomColumn",
      nzPaginationPosition: "nzPaginationPosition",
      nzScroll: "nzScroll",
      noDataVirtualHeight: "noDataVirtualHeight",
      nzPaginationType: "nzPaginationType",
      nzFrontPagination: [2, "nzFrontPagination", "nzFrontPagination", booleanAttribute],
      nzTemplateMode: [2, "nzTemplateMode", "nzTemplateMode", booleanAttribute],
      nzShowPagination: [2, "nzShowPagination", "nzShowPagination", booleanAttribute],
      nzLoading: [2, "nzLoading", "nzLoading", booleanAttribute],
      nzOuterBordered: [2, "nzOuterBordered", "nzOuterBordered", booleanAttribute],
      nzLoadingIndicator: "nzLoadingIndicator",
      nzBordered: [2, "nzBordered", "nzBordered", booleanAttribute],
      nzSize: "nzSize",
      nzShowSizeChanger: [2, "nzShowSizeChanger", "nzShowSizeChanger", booleanAttribute],
      nzHideOnSinglePage: [2, "nzHideOnSinglePage", "nzHideOnSinglePage", booleanAttribute],
      nzShowQuickJumper: [2, "nzShowQuickJumper", "nzShowQuickJumper", booleanAttribute],
      nzSimple: [2, "nzSimple", "nzSimple", booleanAttribute]
    },
    outputs: {
      nzPageSizeChange: "nzPageSizeChange",
      nzPageIndexChange: "nzPageIndexChange",
      nzQueryParams: "nzQueryParams",
      nzCurrentPageDataChange: "nzCurrentPageDataChange",
      nzCustomColumnChange: "nzCustomColumnChange"
    },
    exportAs: ["nzTable"],
    features: [ɵɵProvidersFeature([NzTableStyleService, NzTableDataService]), ɵɵNgOnChangesFeature],
    ngContentSelectors: _c0,
    decls: 13,
    vars: 26,
    consts: [["tableMainElement", ""], ["paginationTemplate", ""], ["contentTemplate", ""], [3, "nzDelay", "nzSpinning", "nzIndicator"], [3, "ngTemplateOutlet"], [1, "ant-table"], [3, "title"], [3, "data", "scrollX", "scrollY", "contentTemplate", "listOfColWidth", "theadTemplate", "tfootTemplate", "tfootFixed", "verticalScrollBarWidth", "virtualTemplate", "virtualItemSize", "virtualMaxBufferPx", "virtualMinBufferPx", "tableMainElement", "virtualForTrackBy", "noDataVirtualHeight"], [3, "tableLayout", "listOfColWidth", "theadTemplate", "contentTemplate", "tfootTemplate"], [3, "footer"], [1, "ant-table-pagination", "ant-table-pagination-right", 3, "hidden", "nzShowSizeChanger", "nzPageSizeOptions", "nzItemRender", "nzShowQuickJumper", "nzHideOnSinglePage", "nzShowTotal", "nzSize", "nzPageSize", "nzTotal", "nzSimple", "nzPageIndex"], [1, "ant-table-pagination", "ant-table-pagination-right", 3, "nzPageSizeChange", "nzPageIndexChange", "hidden", "nzShowSizeChanger", "nzPageSizeOptions", "nzItemRender", "nzShowQuickJumper", "nzHideOnSinglePage", "nzShowTotal", "nzSize", "nzPageSize", "nzTotal", "nzSimple", "nzPageIndex"]],
    template: function NzTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "nz-spin", 3);
        ɵɵconditionalCreate(1, NzTableComponent_Conditional_1_Template, 1, 1, null, 4);
        ɵɵelementStart(2, "div", 5, 0);
        ɵɵconditionalCreate(4, NzTableComponent_Conditional_4_Template, 1, 1, "nz-table-title-footer", 6);
        ɵɵconditionalCreate(5, NzTableComponent_Conditional_5_Template, 1, 16, "nz-table-inner-scroll", 7)(6, NzTableComponent_Conditional_6_Template, 1, 5, "nz-table-inner-default", 8);
        ɵɵconditionalCreate(7, NzTableComponent_Conditional_7_Template, 1, 1, "nz-table-title-footer", 9);
        ɵɵelementEnd();
        ɵɵconditionalCreate(8, NzTableComponent_Conditional_8_Template, 1, 1, null, 4);
        ɵɵelementEnd();
        ɵɵtemplate(9, NzTableComponent_ng_template_9_Template, 1, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor)(11, NzTableComponent_ng_template_11_Template, 1, 0, "ng-template", null, 2, ɵɵtemplateRefExtractor);
      }
      if (rf & 2) {
        ɵɵproperty("nzDelay", ctx.nzLoadingDelay)("nzSpinning", ctx.nzLoading)("nzIndicator", ctx.nzLoadingIndicator);
        ɵɵadvance();
        ɵɵconditional(ctx.nzPaginationPosition === "both" || ctx.nzPaginationPosition === "top" ? 1 : -1);
        ɵɵadvance();
        ɵɵclassProp("ant-table-rtl", ctx.dir === "rtl")("ant-table-fixed-header", ctx.nzData.length && ctx.scrollY)("ant-table-fixed-column", ctx.scrollX)("ant-table-has-fix-left", ctx.hasFixLeft)("ant-table-has-fix-right", ctx.hasFixRight)("ant-table-bordered", ctx.nzBordered)("nz-table-out-bordered", ctx.nzOuterBordered && !ctx.nzBordered)("ant-table-middle", ctx.nzSize === "middle")("ant-table-small", ctx.nzSize === "small");
        ɵɵadvance(2);
        ɵɵconditional(ctx.nzTitle ? 4 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.scrollY || ctx.scrollX ? 5 : 6);
        ɵɵadvance(2);
        ɵɵconditional(ctx.nzFooter ? 7 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.nzPaginationPosition === "both" || ctx.nzPaginationPosition === "bottom" ? 8 : -1);
      }
    },
    dependencies: [NzSpinComponent, NgTemplateOutlet, NzTableTitleFooterComponent, NzTableInnerScrollComponent, NzTableInnerDefaultComponent, NzPaginationModule, NzPaginationComponent],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableComponent, [{
    type: Component,
    args: [{
      selector: "nz-table",
      exportAs: "nzTable",
      providers: [NzTableStyleService, NzTableDataService],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <nz-spin [nzDelay]="nzLoadingDelay" [nzSpinning]="nzLoading" [nzIndicator]="nzLoadingIndicator">
      @if (nzPaginationPosition === 'both' || nzPaginationPosition === 'top') {
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      }
      <div
        #tableMainElement
        class="ant-table"
        [class.ant-table-rtl]="dir === 'rtl'"
        [class.ant-table-fixed-header]="nzData.length && scrollY"
        [class.ant-table-fixed-column]="scrollX"
        [class.ant-table-has-fix-left]="hasFixLeft"
        [class.ant-table-has-fix-right]="hasFixRight"
        [class.ant-table-bordered]="nzBordered"
        [class.nz-table-out-bordered]="nzOuterBordered && !nzBordered"
        [class.ant-table-middle]="nzSize === 'middle'"
        [class.ant-table-small]="nzSize === 'small'"
      >
        @if (nzTitle) {
          <nz-table-title-footer [title]="nzTitle"></nz-table-title-footer>
        }
        @if (scrollY || scrollX) {
          <nz-table-inner-scroll
            [data]="data"
            [scrollX]="scrollX"
            [scrollY]="scrollY"
            [contentTemplate]="contentTemplate"
            [listOfColWidth]="listOfAutoColWidth"
            [theadTemplate]="theadTemplate"
            [tfootTemplate]="tfootTemplate"
            [tfootFixed]="tfootFixed"
            [verticalScrollBarWidth]="verticalScrollBarWidth"
            [virtualTemplate]="nzVirtualScrollDirective ? nzVirtualScrollDirective.templateRef : null"
            [virtualItemSize]="nzVirtualItemSize"
            [virtualMaxBufferPx]="nzVirtualMaxBufferPx"
            [virtualMinBufferPx]="nzVirtualMinBufferPx"
            [tableMainElement]="tableMainElement"
            [virtualForTrackBy]="nzVirtualForTrackBy"
            [noDataVirtualHeight]="noDataVirtualHeight"
          ></nz-table-inner-scroll>
        } @else {
          <nz-table-inner-default
            [tableLayout]="nzTableLayout"
            [listOfColWidth]="listOfManualColWidth"
            [theadTemplate]="theadTemplate"
            [contentTemplate]="contentTemplate"
            [tfootTemplate]="tfootTemplate"
          ></nz-table-inner-default>
        }
        @if (nzFooter) {
          <nz-table-title-footer [footer]="nzFooter"></nz-table-title-footer>
        }
      </div>
      @if (nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom') {
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      }
    </nz-spin>
    <ng-template #paginationTemplate>
      @if (nzShowPagination && data.length) {
        <nz-pagination
          [hidden]="!showPagination"
          class="ant-table-pagination ant-table-pagination-right"
          [nzShowSizeChanger]="nzShowSizeChanger"
          [nzPageSizeOptions]="nzPageSizeOptions"
          [nzItemRender]="nzItemRender!"
          [nzShowQuickJumper]="nzShowQuickJumper"
          [nzHideOnSinglePage]="nzHideOnSinglePage"
          [nzShowTotal]="nzShowTotal"
          [nzSize]="nzPaginationType === 'small' ? 'small' : nzSize === 'default' ? 'default' : 'small'"
          [nzPageSize]="nzPageSize"
          [nzTotal]="nzTotal"
          [nzSimple]="nzSimple"
          [nzPageIndex]="nzPageIndex"
          (nzPageSizeChange)="onPageSizeChange($event)"
          (nzPageIndexChange)="onPageIndexChange($event)"
        ></nz-pagination>
      }
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
      host: {
        class: "ant-table-wrapper",
        "[class.ant-table-wrapper-rtl]": 'dir === "rtl"',
        "[class.ant-table-custom-column]": `nzCustomColumn.length`
      },
      imports: [NzSpinComponent, NgTemplateOutlet, NzTableTitleFooterComponent, NzTableInnerScrollComponent, NzTableInnerDefaultComponent, NzPaginationModule]
    }]
  }], () => [], {
    nzTableLayout: [{
      type: Input
    }],
    nzShowTotal: [{
      type: Input
    }],
    nzItemRender: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzFooter: [{
      type: Input
    }],
    nzNoResult: [{
      type: Input
    }],
    nzPageSizeOptions: [{
      type: Input
    }],
    nzVirtualItemSize: [{
      type: Input
    }],
    nzVirtualMaxBufferPx: [{
      type: Input
    }],
    nzVirtualMinBufferPx: [{
      type: Input
    }],
    nzVirtualForTrackBy: [{
      type: Input
    }],
    nzLoadingDelay: [{
      type: Input
    }],
    nzPageIndex: [{
      type: Input
    }],
    nzPageSize: [{
      type: Input
    }],
    nzTotal: [{
      type: Input
    }],
    nzWidthConfig: [{
      type: Input
    }],
    nzData: [{
      type: Input
    }],
    nzCustomColumn: [{
      type: Input
    }],
    nzPaginationPosition: [{
      type: Input
    }],
    nzScroll: [{
      type: Input
    }],
    noDataVirtualHeight: [{
      type: Input
    }],
    nzPaginationType: [{
      type: Input
    }],
    nzFrontPagination: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzTemplateMode: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowPagination: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOuterBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLoadingIndicator: [{
      type: Input
    }],
    nzBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSize: [{
      type: Input
    }],
    nzShowSizeChanger: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHideOnSinglePage: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowQuickJumper: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSimple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPageSizeChange: [{
      type: Output
    }],
    nzPageIndexChange: [{
      type: Output
    }],
    nzQueryParams: [{
      type: Output
    }],
    nzCurrentPageDataChange: [{
      type: Output
    }],
    nzCustomColumnChange: [{
      type: Output
    }],
    nzVirtualScrollDirective: [{
      type: ContentChild,
      args: [NzTableVirtualScrollDirective, {
        static: false
      }]
    }],
    nzTableInnerScrollComponent: [{
      type: ViewChild,
      args: [NzTableInnerScrollComponent]
    }]
  });
})();
function fixedAttribute(value) {
  return value === "top" || value === "bottom" ? value : booleanAttribute(value) ? "bottom" : null;
}
var NzTfootSummaryComponent = class _NzTfootSummaryComponent {
  nzFixed = null;
  templateRef;
  nzTableStyleService = inject(NzTableStyleService, {
    optional: true
  });
  isInsideTable = !!this.nzTableStyleService;
  ngOnInit() {
    this.nzTableStyleService?.setTfootTemplate(this.templateRef);
  }
  ngOnChanges(changes) {
    const {
      nzFixed
    } = changes;
    this.nzTableStyleService?.setTfootFixed(nzFixed.currentValue);
  }
  static ɵfac = function NzTfootSummaryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTfootSummaryComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTfootSummaryComponent,
    selectors: [["tfoot", "nzSummary", ""]],
    viewQuery: function NzTfootSummaryComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c14, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templateRef = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function NzTfootSummaryComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-table-summary", !ctx.isInsideTable || !ctx.nzFixed);
      }
    },
    inputs: {
      nzFixed: [2, "nzFixed", "nzFixed", fixedAttribute]
    },
    features: [ɵɵNgOnChangesFeature],
    attrs: _c15,
    ngContentSelectors: _c0,
    decls: 3,
    vars: 1,
    consts: [["contentTemplate", ""], [3, "ngTemplateOutlet"]],
    template: function NzTfootSummaryComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, NzTfootSummaryComponent_ng_template_0_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        ɵɵconditionalCreate(2, NzTfootSummaryComponent_Conditional_2_Template, 1, 1, null, 1);
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵconditional(!ctx.isInsideTable || !ctx.nzFixed ? 2 : -1);
      }
    },
    dependencies: [NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTfootSummaryComponent, [{
    type: Component,
    args: [{
      selector: "tfoot[nzSummary]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
    @if (!isInsideTable || !nzFixed) {
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    }
  `,
      imports: [NgTemplateOutlet],
      host: {
        "[class.ant-table-summary]": "!isInsideTable || !nzFixed"
      }
    }]
  }], null, {
    nzFixed: [{
      type: Input,
      args: [{
        transform: fixedAttribute
      }]
    }],
    templateRef: [{
      type: ViewChild,
      args: ["contentTemplate", {
        static: true
      }]
    }]
  });
})();
var NzTrDirective = class _NzTrDirective {
  destroyRef = inject(DestroyRef);
  listOfNzThDirective;
  listOfCellFixedDirective;
  listOfFixedColumns$ = new ReplaySubject(1);
  listOfColumns$ = new ReplaySubject(1);
  listOfFixedColumnsChanges$ = this.listOfFixedColumns$.pipe(switchMap((list) => merge(this.listOfFixedColumns$, ...list.map((c) => c.changes$)).pipe(mergeMap(() => this.listOfFixedColumns$))), takeUntilDestroyed(this.destroyRef));
  listOfFixedLeftColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map((list) => list.filter((item) => item.nzLeft !== false)));
  listOfFixedRightColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map((list) => list.filter((item) => item.nzRight !== false)));
  listOfColumnsChanges$ = this.listOfColumns$.pipe(switchMap((list) => merge(this.listOfColumns$, ...list.map((c) => c.changes$)).pipe(mergeMap(() => this.listOfColumns$))), takeUntilDestroyed(this.destroyRef));
  nzTableStyleService = inject(NzTableStyleService, {
    optional: true
  });
  isInsideTable = !!this.nzTableStyleService;
  ngAfterContentInit() {
    if (this.nzTableStyleService) {
      this.listOfCellFixedDirective.changes.pipe(startWith(this.listOfCellFixedDirective), takeUntilDestroyed(this.destroyRef)).subscribe(this.listOfFixedColumns$);
      this.listOfNzThDirective.changes.pipe(startWith(this.listOfNzThDirective), takeUntilDestroyed(this.destroyRef)).subscribe(this.listOfColumns$);
      this.listOfFixedLeftColumnChanges$.subscribe((listOfFixedLeft) => {
        listOfFixedLeft.forEach((cell) => cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]));
      });
      this.listOfFixedRightColumnChanges$.subscribe((listOfFixedRight) => {
        listOfFixedRight.forEach((cell) => cell.setIsFirstRight(cell === listOfFixedRight[0]));
      });
      combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedLeftColumnChanges$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([listOfAutoWidth, listOfLeftCell]) => {
        listOfLeftCell.forEach((cell, index) => {
          if (cell.isAutoLeft) {
            const currentArray = listOfLeftCell.slice(0, index);
            const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || cur.colSpan || 1), 0);
            const width = listOfAutoWidth.slice(0, count).reduce((pre, cur) => pre + cur, 0);
            cell.setAutoLeftWidth(`${width}px`);
          }
        });
      });
      combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedRightColumnChanges$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([listOfAutoWidth, listOfRightCell]) => {
        listOfRightCell.forEach((_, index) => {
          const cell = listOfRightCell[listOfRightCell.length - index - 1];
          if (cell.isAutoRight) {
            const currentArray = listOfRightCell.slice(listOfRightCell.length - index, listOfRightCell.length);
            const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || cur.colSpan || 1), 0);
            const width = listOfAutoWidth.slice(listOfAutoWidth.length - count, listOfAutoWidth.length).reduce((pre, cur) => pre + cur, 0);
            cell.setAutoRightWidth(`${width}px`);
          }
        });
      });
    }
  }
  static ɵfac = function NzTrDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTrDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzTrDirective,
    selectors: [["tr", 3, "nz-table-measure-row", "", 3, "nzExpand", "", 3, "nz-table-fixed-row", ""]],
    contentQueries: function NzTrDirective_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, NzThMeasureDirective, 4);
        ɵɵcontentQuery(dirIndex, NzCellFixedDirective, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listOfNzThDirective = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listOfCellFixedDirective = _t);
      }
    },
    hostVars: 2,
    hostBindings: function NzTrDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ant-table-row", ctx.isInsideTable);
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTrDirective, [{
    type: Directive,
    args: [{
      selector: "tr:not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])",
      host: {
        "[class.ant-table-row]": "isInsideTable"
      }
    }]
  }], null, {
    listOfNzThDirective: [{
      type: ContentChildren,
      args: [NzThMeasureDirective]
    }],
    listOfCellFixedDirective: [{
      type: ContentChildren,
      args: [NzCellFixedDirective]
    }]
  });
})();
var NzTheadComponent = class _NzTheadComponent {
  nzTableStyleService = inject(NzTableStyleService, {
    optional: true
  });
  nzTableDataService = inject(NzTableDataService, {
    optional: true
  });
  destroyRef = inject(DestroyRef);
  el = inject(ElementRef).nativeElement;
  renderer = inject(Renderer2);
  isInsideTable = !!this.nzTableStyleService;
  templateRef;
  listOfNzTrDirective;
  listOfNzThAddOnComponent;
  nzSortOrderChange = new EventEmitter();
  ngOnInit() {
    if (this.nzTableStyleService) {
      this.nzTableStyleService.setTheadTemplate(this.templateRef);
    }
  }
  ngAfterContentInit() {
    if (this.nzTableStyleService) {
      const firstTableRow$ = this.listOfNzTrDirective.changes.pipe(startWith(this.listOfNzTrDirective), map((item) => item && item.first), takeUntilDestroyed(this.destroyRef));
      const listOfColumnsChanges$ = firstTableRow$.pipe(switchMap((firstTableRow) => firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY));
      listOfColumnsChanges$.subscribe((data) => this.nzTableStyleService.setListOfTh(data));
      this.nzTableStyleService.enableAutoMeasure$.pipe(switchMap((enable) => enable ? listOfColumnsChanges$ : of([]))).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => this.nzTableStyleService.setListOfMeasureColumn(data));
      const listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(switchMap((firstTr) => firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY));
      const listOfFixedRightColumnChanges$ = firstTableRow$.pipe(switchMap((firstTr) => firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY));
      listOfFixedLeftColumnChanges$.subscribe((listOfFixedLeftColumn) => {
        this.nzTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
      });
      listOfFixedRightColumnChanges$.subscribe((listOfFixedRightColumn) => {
        this.nzTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
      });
    }
    if (this.nzTableDataService) {
      const listOfColumn$ = this.listOfNzThAddOnComponent.changes.pipe(startWith(this.listOfNzThAddOnComponent));
      const manualSort$ = listOfColumn$.pipe(switchMap(() => merge(...this.listOfNzThAddOnComponent.map((th) => th.manualClickOrder$))), takeUntilDestroyed(this.destroyRef));
      manualSort$.subscribe((data) => {
        const emitValue = {
          key: data.nzColumnKey,
          value: data.sortOrder
        };
        this.nzSortOrderChange.emit(emitValue);
        if (data.nzSortFn && data.nzSortPriority === false) {
          this.listOfNzThAddOnComponent.filter((th) => th !== data).forEach((th) => th.clearSortOrder());
        }
      });
      const listOfCalcOperator$ = listOfColumn$.pipe(
        switchMap((list) => merge(listOfColumn$, ...list.map((c) => c.calcOperatorChange$)).pipe(mergeMap(() => listOfColumn$))),
        map((list) => list.filter((item) => !!item.nzSortFn || !!item.nzFilterFn).map((item) => {
          const {
            nzSortFn,
            sortOrder,
            nzFilterFn,
            nzFilterValue,
            nzSortPriority,
            nzColumnKey
          } = item;
          return {
            key: nzColumnKey,
            sortFn: nzSortFn,
            sortPriority: nzSortPriority,
            sortOrder,
            filterFn: nzFilterFn,
            filterValue: nzFilterValue
          };
        })),
        // TODO: after checked error here
        delay(0),
        takeUntilDestroyed(this.destroyRef)
      );
      listOfCalcOperator$.subscribe((list) => {
        this.nzTableDataService?.listOfCalcOperator$.next(list);
      });
    }
  }
  ngAfterViewInit() {
    if (this.nzTableStyleService) {
      this.renderer.removeChild(this.renderer.parentNode(this.el), this.el);
    }
  }
  static ɵfac = function NzTheadComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTheadComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzTheadComponent,
    selectors: [["thead", 9, "ant-table-thead"]],
    contentQueries: function NzTheadComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, NzTrDirective, 5);
        ɵɵcontentQuery(dirIndex, NzThAddOnComponent, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listOfNzTrDirective = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listOfNzThAddOnComponent = _t);
      }
    },
    viewQuery: function NzTheadComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c14, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templateRef = _t.first);
      }
    },
    outputs: {
      nzSortOrderChange: "nzSortOrderChange"
    },
    ngContentSelectors: _c0,
    decls: 3,
    vars: 1,
    consts: [["contentTemplate", ""], [3, "ngTemplateOutlet"]],
    template: function NzTheadComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, NzTheadComponent_ng_template_0_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
        ɵɵconditionalCreate(2, NzTheadComponent_Conditional_2_Template, 1, 1, null, 1);
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵconditional(!ctx.isInsideTable ? 2 : -1);
      }
    },
    dependencies: [NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTheadComponent, [{
    type: Component,
    args: [{
      selector: "thead:not(.ant-table-thead)",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
    @if (!isInsideTable) {
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    }
  `,
      imports: [NgTemplateOutlet]
    }]
  }], null, {
    templateRef: [{
      type: ViewChild,
      args: ["contentTemplate", {
        static: true
      }]
    }],
    listOfNzTrDirective: [{
      type: ContentChildren,
      args: [NzTrDirective, {
        descendants: true
      }]
    }],
    listOfNzThAddOnComponent: [{
      type: ContentChildren,
      args: [NzThAddOnComponent, {
        descendants: true
      }]
    }],
    nzSortOrderChange: [{
      type: Output
    }]
  });
})();
var NzTrExpandDirective = class _NzTrExpandDirective {
  nzExpand = true;
  static ɵfac = function NzTrExpandDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTrExpandDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzTrExpandDirective,
    selectors: [["tr", "nzExpand", ""]],
    hostAttrs: [1, "ant-table-expanded-row"],
    hostVars: 1,
    hostBindings: function NzTrExpandDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵdomProperty("hidden", !ctx.nzExpand);
      }
    },
    inputs: {
      nzExpand: [2, "nzExpand", "nzExpand", booleanAttribute]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTrExpandDirective, [{
    type: Directive,
    args: [{
      selector: "tr[nzExpand]",
      host: {
        class: "ant-table-expanded-row",
        "[hidden]": `!nzExpand`
      }
    }]
  }], null, {
    nzExpand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var NzTableModule = class _NzTableModule {
  static ɵfac = function NzTableModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTableModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzTableModule,
    imports: [NzTableComponent, NzThAddOnComponent, NzTableCellDirective, NzThMeasureDirective, NzTdAddOnComponent, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzTrExpandDirective, NzTfootSummaryComponent, NzTableVirtualScrollDirective, NzCellFixedDirective, NzCustomColumnDirective, NzTableContentComponent, NzTableTitleFooterComponent, NzTableInnerDefaultComponent, NzTableInnerScrollComponent, NzTrMeasureComponent, NzRowIndentDirective, NzRowExpandButtonDirective, NzCellBreakWordDirective, NzCellAlignDirective, NzTableSortersComponent, NzTableFilterComponent, NzTableSelectionComponent, NzCellEllipsisDirective, NzFilterTriggerComponent, NzTableFixedRowComponent, NzThSelectionComponent],
    exports: [NzTableComponent, NzThAddOnComponent, NzTableCellDirective, NzThMeasureDirective, NzTdAddOnComponent, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzTableVirtualScrollDirective, NzCellFixedDirective, NzCustomColumnDirective, NzFilterTriggerComponent, NzTrExpandDirective, NzTfootSummaryComponent, NzCellBreakWordDirective, NzCellAlignDirective, NzCellEllipsisDirective, NzTableFixedRowComponent, NzThSelectionComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [NzTableComponent, NzThAddOnComponent, NzTdAddOnComponent, NzTbodyComponent, NzTableTitleFooterComponent, NzTableInnerScrollComponent, NzTableSortersComponent, NzTableFilterComponent, NzTableSelectionComponent, NzFilterTriggerComponent, NzThSelectionComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableModule, [{
    type: NgModule,
    args: [{
      imports: [NzTableComponent, NzThAddOnComponent, NzTableCellDirective, NzThMeasureDirective, NzTdAddOnComponent, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzTrExpandDirective, NzTfootSummaryComponent, NzTableVirtualScrollDirective, NzCellFixedDirective, NzCustomColumnDirective, NzTableContentComponent, NzTableTitleFooterComponent, NzTableInnerDefaultComponent, NzTableInnerScrollComponent, NzTrMeasureComponent, NzRowIndentDirective, NzRowExpandButtonDirective, NzCellBreakWordDirective, NzCellAlignDirective, NzTableSortersComponent, NzTableFilterComponent, NzTableSelectionComponent, NzCellEllipsisDirective, NzFilterTriggerComponent, NzTableFixedRowComponent, NzThSelectionComponent],
      exports: [NzTableComponent, NzThAddOnComponent, NzTableCellDirective, NzThMeasureDirective, NzTdAddOnComponent, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzTableVirtualScrollDirective, NzCellFixedDirective, NzCustomColumnDirective, NzFilterTriggerComponent, NzTrExpandDirective, NzTfootSummaryComponent, NzCellBreakWordDirective, NzCellAlignDirective, NzCellEllipsisDirective, NzTableFixedRowComponent, NzThSelectionComponent]
    }]
  }], null, null);
})();

export {
  NzFilterTriggerComponent,
  NzTableFilterComponent,
  NzRowExpandButtonDirective,
  NzRowIndentDirective,
  NzTableSelectionComponent,
  NzTableSortersComponent,
  NzCellFixedDirective,
  NzTableStyleService,
  NzTableCellDirective,
  NzTableDataService,
  NzCustomColumnDirective,
  NzTdAddOnComponent,
  NzThAddOnComponent,
  NzThMeasureDirective,
  NzThSelectionComponent,
  NzCellAlignDirective,
  NzCellEllipsisDirective,
  NzCellBreakWordDirective,
  NzTableContentComponent,
  NzTableFixedRowComponent,
  NzTableInnerDefaultComponent,
  NzTrMeasureComponent,
  NzTbodyComponent,
  NzTableInnerScrollComponent,
  NzTableVirtualScrollDirective,
  NzTableTitleFooterComponent,
  NzTableComponent,
  NzTfootSummaryComponent,
  NzTrDirective,
  NzTheadComponent,
  NzTrExpandDirective,
  NzTableModule
};
//# sourceMappingURL=chunk-AWLDUNVU.js.map
