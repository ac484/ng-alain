import {
  NzRadioComponent,
  NzRadioModule
} from "./chunk-DLHTX2ZQ.js";
import {
  NzCheckboxComponent,
  NzCheckboxModule
} from "./chunk-5CKH7BXE.js";
import {
  CurrencyService,
  formatMask
} from "./chunk-BSLJP3PC.js";
import {
  WINDOW
} from "./chunk-B3BRWWTU.js";
import {
  NzTagComponent,
  NzTagModule
} from "./chunk-IZAPUEE4.js";
import {
  NzBadgeComponent,
  NzBadgeModule
} from "./chunk-D4M6RSJC.js";
import {
  ImagePreloadService
} from "./chunk-XPEPFKNH.js";
import {
  NzTooltipDirective,
  NzTooltipModule
} from "./chunk-4P4HHPBT.js";
import {
  updateHostClass
} from "./chunk-KZXCIQZH.js";
import {
  yn
} from "./chunk-WLPEXMS5.js";
import {
  NzI18nService
} from "./chunk-VCVGLQF3.js";
import {
  formatDate
} from "./chunk-SQJ77OAJ.js";
import {
  Overlay,
  OverlayConfig,
  OverlayRef
} from "./chunk-U5VATZ4Q.js";
import {
  ComponentPortal
} from "./chunk-EGGX2FJX.js";
import {
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  hasModifierKey
} from "./chunk-76DJI4FU.js";
import {
  fadeMotion
} from "./chunk-RH5RXJTD.js";
import {
  AlainConfigService
} from "./chunk-ES4WNO3Q.js";
import {
  deepMerge,
  warn as warn2
} from "./chunk-XMKNXNVX.js";
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
  fromEventOutsideAngular,
  isNotNil,
  warn
} from "./chunk-J25EALHE.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-ZWI5T7AR.js";
import {
  Router
} from "./chunk-36PX2JTV.js";
import {
  DomSanitizer
} from "./chunk-BVIJPY5U.js";
import {
  takeUntilDestroyed,
  toObservable
} from "./chunk-I75K2H66.js";
import {
  CdkDrag,
  CdkDragHandle
} from "./chunk-2WJ2IEY4.js";
import {
  Directionality
} from "./chunk-TBGMZLZ3.js";
import {
  CommonModule,
  NgTemplateOutlet
} from "./chunk-GUTSRBNM.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  booleanAttribute,
  input,
  model,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreadContextLet,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstoreLet,
  ɵɵstyleProp,
  ɵɵsyntheticHostListener,
  ɵɵsyntheticHostProperty,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-NQBXVTYU.js";
import {
  DOCUMENT,
  DestroyRef,
  Injector,
  computed,
  effect,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
  signal,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import {
  fromEvent
} from "./chunk-KMLKBNXJ.js";
import {
  Subject,
  __esDecorate,
  __runInitializers,
  combineLatest,
  filter,
  map,
  of,
  switchMap,
  take,
  takeUntil
} from "./chunk-EBAU53KC.js";
import {
  __publicField,
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-image.mjs
var _c0 = ["*"];
var _c1 = ["imgRef"];
var _c2 = ["imagePreviewWrapper"];
function NzImagePreviewComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 13);
    ɵɵlistener("click", function NzImagePreviewComponent_Conditional_2_Template_div_click_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onSwitchLeft($event));
    });
    ɵɵelement(1, "nz-icon", 14);
    ɵɵelementEnd();
    ɵɵelementStart(2, "div", 15);
    ɵɵlistener("click", function NzImagePreviewComponent_Conditional_2_Template_div_click_2_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onSwitchRight($event));
    });
    ɵɵelement(3, "nz-icon", 16);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassProp("ant-image-preview-switch-left-disabled", ctx_r2.index <= 0);
    ɵɵadvance(2);
    ɵɵclassProp("ant-image-preview-switch-right-disabled", ctx_r2.index >= ctx_r2.images.length - 1);
  }
}
function NzImagePreviewComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 5);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate2("", ctx_r2.index + 1, " / ", ctx_r2.images.length);
  }
}
function NzImagePreviewComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 17);
    ɵɵlistener("click", function NzImagePreviewComponent_For_6_Template_li_click_0_listener() {
      const option_r5 = ɵɵrestoreView(_r4).$implicit;
      return ɵɵresetView(option_r5.onClick());
    });
    ɵɵelement(1, "nz-icon", 18);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassProp("ant-image-preview-operations-operation-disabled", ctx_r2.zoomOutDisabled && option_r5.type === "zoomOut");
    ɵɵadvance();
    ɵɵproperty("nzType", option_r5.icon)("nzRotate", option_r5.rotate ?? 0);
  }
}
function NzImagePreviewComponent_For_15_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "img", 20, 1);
  }
  if (rf & 2) {
    const image_r6 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵstyleProp("width", image_r6.width)("height", image_r6.height)("transform", ctx_r2.previewImageTransform);
    ɵɵattribute("src", ctx_r2.sanitizerResourceUrl(image_r6.src), ɵɵsanitizeUrl)("srcset", image_r6.srcset)("alt", image_r6.alt);
  }
}
function NzImagePreviewComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, NzImagePreviewComponent_For_15_Conditional_0_Template, 2, 9, "img", 19);
  }
  if (rf & 2) {
    const ɵ$index_37_r7 = ctx.$index;
    const ctx_r2 = ɵɵnextContext();
    ɵɵconditional(ɵ$index_37_r7 === ctx_r2.index ? 0 : -1);
  }
}
var NzImageGroupComponent = class _NzImageGroupComponent {
  nzScaleStep = null;
  images = [];
  addImage(image) {
    this.images.push(image);
  }
  static ɵfac = function NzImageGroupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzImageGroupComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzImageGroupComponent,
    selectors: [["nz-image-group"]],
    inputs: {
      nzScaleStep: "nzScaleStep"
    },
    exportAs: ["nzImageGroup"],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function NzImageGroupComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzImageGroupComponent, [{
    type: Component,
    args: [{
      selector: "nz-image-group",
      exportAs: "nzImageGroup",
      template: "<ng-content></ng-content>",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    nzScaleStep: [{
      type: Input
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME$1 = "image";
var NzImagePreviewOptions = class {
  nzKeyboard = true;
  nzNoAnimation = false;
  nzMaskClosable = true;
  nzCloseOnNavigation = true;
  nzZIndex;
  nzZoom;
  nzRotate;
  nzFlipHorizontally;
  nzFlipVertically;
  nzScaleStep;
  nzDirection;
};
function getFitContentPosition(params) {
  let fixPos = {};
  if (params.width <= params.clientWidth && params.height <= params.clientHeight) {
    fixPos = {
      x: 0,
      y: 0
    };
  }
  if (params.width > params.clientWidth || params.height > params.clientHeight) {
    fixPos = {
      x: fitPoint(params.left, params.width, params.clientWidth),
      y: fitPoint(params.top, params.height, params.clientHeight)
    };
  }
  return fixPos;
}
function getOffset(node) {
  const box = node.getBoundingClientRect();
  const docElem = document.documentElement;
  return {
    left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
    top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
  };
}
function getClientSize() {
  const width = document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;
  return {
    width,
    height
  };
}
function fitPoint(start, size, clientSize) {
  const startAddSize = start + size;
  const offsetStart = (size - clientSize) / 2;
  let distance = null;
  if (size > clientSize) {
    if (start > 0) {
      distance = offsetStart;
    }
    if (start < 0 && startAddSize < clientSize) {
      distance = -offsetStart;
    }
  } else {
    if (start < 0 || startAddSize > clientSize) {
      distance = start < 0 ? offsetStart : -offsetStart;
    }
  }
  return distance;
}
var initialPosition = {
  x: 0,
  y: 0
};
var NZ_DEFAULT_SCALE_STEP = 0.5;
var NZ_DEFAULT_ZOOM = 1;
var NZ_DEFAULT_ROTATE = 0;
var NzImagePreviewComponent = class _NzImagePreviewComponent {
  document = inject(DOCUMENT);
  ngZone = inject(NgZone);
  cdr = inject(ChangeDetectorRef);
  nzConfigService = inject(NzConfigService);
  config = inject(NzImagePreviewOptions);
  sanitizer = inject(DomSanitizer);
  destroyRef = inject(DestroyRef);
  _defaultNzZoom = NZ_DEFAULT_ZOOM;
  _defaultNzScaleStep = NZ_DEFAULT_SCALE_STEP;
  _defaultNzRotate = NZ_DEFAULT_ROTATE;
  images = [];
  index = 0;
  isDragging = false;
  visible = true;
  animationStateChanged = new EventEmitter();
  scaleStepMap = /* @__PURE__ */ new Map();
  previewImageTransform = "";
  previewImageWrapperTransform = "";
  operations = [{
    icon: "close",
    onClick: () => {
      this.onClose();
    },
    type: "close"
  }, {
    icon: "zoom-in",
    onClick: () => {
      this.onZoomIn();
    },
    type: "zoomIn"
  }, {
    icon: "zoom-out",
    onClick: () => {
      this.onZoomOut();
    },
    type: "zoomOut"
  }, {
    icon: "rotate-right",
    onClick: () => {
      this.onRotateRight();
    },
    type: "rotateRight"
  }, {
    icon: "rotate-left",
    onClick: () => {
      this.onRotateLeft();
    },
    type: "rotateLeft"
  }, {
    icon: "swap",
    onClick: () => {
      this.onHorizontalFlip();
    },
    type: "flipHorizontally"
  }, {
    icon: "swap",
    onClick: () => {
      this.onVerticalFlip();
    },
    type: "flipVertically",
    rotate: 90
  }];
  zoomOutDisabled = false;
  position = __spreadValues({}, initialPosition);
  previewRef;
  closeClick = new EventEmitter();
  imageRef;
  imagePreviewWrapper;
  zoom = this.config.nzZoom ?? this._defaultNzZoom;
  rotate = this.config.nzRotate ?? this._defaultNzRotate;
  scaleStep = this.config.nzScaleStep ?? this._defaultNzScaleStep;
  flipHorizontally = this.config.nzFlipHorizontally ?? false;
  flipVertically = this.config.nzFlipVertically ?? false;
  get animationDisabled() {
    return this.config.nzNoAnimation ?? false;
  }
  get maskClosable() {
    const defaultConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME$1) || {};
    return this.config.nzMaskClosable ?? defaultConfig.nzMaskClosable ?? true;
  }
  constructor() {
    this.updateZoomOutDisabled();
    this.updatePreviewImageTransform();
    this.updatePreviewImageWrapperTransform();
  }
  ngOnInit() {
    fromEventOutsideAngular(this.imagePreviewWrapper.nativeElement, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.isDragging = true;
    });
    fromEventOutsideAngular(this.imagePreviewWrapper.nativeElement, "wheel").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.ngZone.run(() => this.wheelZoomEventHandler(event));
    });
    fromEventOutsideAngular(this.document, "keydown").pipe(filter((event) => event.keyCode === ESCAPE), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.ngZone.run(() => {
        this.onClose();
        this.markForCheck();
      });
    });
  }
  setImages(images, scaleStepMap) {
    if (scaleStepMap) this.scaleStepMap = scaleStepMap;
    this.images = images;
    this.markForCheck();
  }
  switchTo(index) {
    this.index = index;
    this.markForCheck();
  }
  next() {
    if (this.index < this.images.length - 1) {
      this.reset();
      this.index++;
      this.updatePreviewImageTransform();
      this.updatePreviewImageWrapperTransform();
      this.updateZoomOutDisabled();
      this.markForCheck();
    }
  }
  prev() {
    if (this.index > 0) {
      this.reset();
      this.index--;
      this.updatePreviewImageTransform();
      this.updatePreviewImageWrapperTransform();
      this.updateZoomOutDisabled();
      this.markForCheck();
    }
  }
  markForCheck() {
    this.cdr.markForCheck();
  }
  onClose() {
    this.visible = false;
    this.closeClick.emit();
  }
  onZoomIn() {
    const zoomStep = this.scaleStepMap.get(this.images[this.index].src ?? this.images[this.index].srcset) ?? this.scaleStep;
    this.zoom += zoomStep;
    this.updatePreviewImageTransform();
    this.updateZoomOutDisabled();
  }
  onZoomOut() {
    if (this.zoom > 1) {
      const zoomStep = this.scaleStepMap.get(this.images[this.index].src ?? this.images[this.index].srcset) ?? this.scaleStep;
      this.zoom -= zoomStep;
      this.updatePreviewImageTransform();
      this.updateZoomOutDisabled();
      if (this.zoom <= 1) {
        this.reCenterImage();
      }
    }
  }
  onRotateRight() {
    this.rotate += 90;
    this.updatePreviewImageTransform();
  }
  onRotateLeft() {
    this.rotate -= 90;
    this.updatePreviewImageTransform();
  }
  onSwitchLeft(event) {
    event.preventDefault();
    event.stopPropagation();
    this.prev();
  }
  onSwitchRight(event) {
    event.preventDefault();
    event.stopPropagation();
    this.next();
  }
  onHorizontalFlip() {
    this.flipHorizontally = !this.flipHorizontally;
    this.updatePreviewImageTransform();
  }
  onVerticalFlip() {
    this.flipVertically = !this.flipVertically;
    this.updatePreviewImageTransform();
  }
  wheelZoomEventHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.handlerImageTransformationWhileZoomingWithMouse(event, event.deltaY);
    this.handleImageScaleWhileZoomingWithMouse(event.deltaY);
    this.updatePreviewImageWrapperTransform();
    this.updatePreviewImageTransform();
    this.markForCheck();
  }
  onAnimationStart(event) {
    this.animationStateChanged.emit(event);
  }
  onAnimationDone(event) {
    this.animationStateChanged.emit(event);
  }
  onDragEnd(event) {
    this.isDragging = false;
    const width = this.imageRef.nativeElement.offsetWidth * this.zoom;
    const height = this.imageRef.nativeElement.offsetHeight * this.zoom;
    const {
      left,
      top
    } = getOffset(this.imageRef.nativeElement);
    const {
      width: clientWidth,
      height: clientHeight
    } = getClientSize();
    const isRotate = this.rotate % 180 !== 0;
    const fitContentParams = {
      width: isRotate ? height : width,
      height: isRotate ? width : height,
      left,
      top,
      clientWidth,
      clientHeight
    };
    const fitContentPos = getFitContentPosition(fitContentParams);
    if (isNotNil(fitContentPos.x) || isNotNil(fitContentPos.y)) {
      this.position = __spreadValues(__spreadValues({}, this.position), fitContentPos);
    } else if (!isNotNil(fitContentPos.x) && !isNotNil(fitContentPos.y)) {
      this.position = {
        x: event.source.getFreeDragPosition().x,
        y: event.source.getFreeDragPosition().y
      };
    }
  }
  sanitizerResourceUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  updatePreviewImageTransform() {
    this.previewImageTransform = `scale3d(${this.zoom * (this.flipHorizontally ? -1 : 1)}, ${this.zoom * (this.flipVertically ? -1 : 1)}, 1) rotate(${this.rotate}deg)`;
  }
  updatePreviewImageWrapperTransform() {
    this.previewImageWrapperTransform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
  }
  updateZoomOutDisabled() {
    this.zoomOutDisabled = this.zoom <= 1;
  }
  handlerImageTransformationWhileZoomingWithMouse(event, deltaY) {
    let scaleValue;
    const imageElement = this.imageRef.nativeElement;
    const elementTransform = getComputedStyle(imageElement).transform;
    const matrixValue = elementTransform.match(/matrix.*\((.+)\)/);
    if (matrixValue) {
      scaleValue = +matrixValue[1].split(", ")[0];
    } else {
      scaleValue = this.zoom;
    }
    const x = (event.clientX - imageElement.getBoundingClientRect().x) / scaleValue;
    const y = (event.clientY - imageElement.getBoundingClientRect().y) / scaleValue;
    const halfOfScaleStepValue = deltaY < 0 ? this.scaleStep / 2 : -this.scaleStep / 2;
    this.position.x += -x * halfOfScaleStepValue * 2 + imageElement.offsetWidth * halfOfScaleStepValue;
    this.position.y += -y * halfOfScaleStepValue * 2 + imageElement.offsetHeight * halfOfScaleStepValue;
  }
  handleImageScaleWhileZoomingWithMouse(deltaY) {
    if (this.isZoomedInWithMouseWheel(deltaY)) {
      this.onZoomIn();
    } else {
      this.onZoomOut();
    }
    if (this.zoom <= 1) {
      this.reCenterImage();
    }
  }
  isZoomedInWithMouseWheel(delta) {
    return delta < 0;
  }
  reset() {
    this.zoom = this.config.nzZoom ?? this._defaultNzZoom;
    this.scaleStep = this.config.nzScaleStep ?? this._defaultNzScaleStep;
    this.rotate = this.config.nzRotate ?? this._defaultNzRotate;
    this.flipHorizontally = false;
    this.flipVertically = false;
    this.reCenterImage();
  }
  reCenterImage() {
    this.position = __spreadValues({}, initialPosition);
  }
  static ɵfac = function NzImagePreviewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzImagePreviewComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzImagePreviewComponent,
    selectors: [["nz-image-preview"]],
    viewQuery: function NzImagePreviewComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c1, 5);
        ɵɵviewQuery(_c2, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.imageRef = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.imagePreviewWrapper = _t.first);
      }
    },
    hostAttrs: [1, "ant-image-preview-root"],
    hostVars: 6,
    hostBindings: function NzImagePreviewComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵsyntheticHostListener("@fadeMotion.start", function NzImagePreviewComponent_animation_fadeMotion_start_HostBindingHandler($event) {
          return ctx.onAnimationStart($event);
        })("@fadeMotion.done", function NzImagePreviewComponent_animation_fadeMotion_done_HostBindingHandler($event) {
          return ctx.onAnimationDone($event);
        });
      }
      if (rf & 2) {
        ɵɵsyntheticHostProperty("@.disabled", ctx.config.nzNoAnimation)("@fadeMotion", ctx.visible ? "enter" : "leave");
        ɵɵstyleProp("z-index", ctx.config.nzZIndex);
        ɵɵclassProp("ant-image-preview-moving", ctx.isDragging);
      }
    },
    exportAs: ["nzImagePreview"],
    decls: 17,
    vars: 5,
    consts: [["imagePreviewWrapper", ""], ["imgRef", ""], [1, "ant-image-preview-mask"], [1, "ant-image-preview-operations-wrapper"], [1, "ant-image-preview-operations"], [1, "ant-image-preview-operations-progress"], [1, "ant-image-preview-operations-operation", 3, "ant-image-preview-operations-operation-disabled"], ["tabindex", "-1", 1, "ant-image-preview-wrap", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "ant-image-preview"], ["tabindex", "0", "aria-hidden", "true", 1, "ant-image-preview-focus-trap"], [1, "ant-image-preview-content"], [1, "ant-image-preview-body"], ["cdkDrag", "", 1, "ant-image-preview-img-wrapper", 3, "cdkDragEnded", "cdkDragFreeDragPosition"], [1, "ant-image-preview-switch-left", 3, "click"], ["nzType", "left", "nzTheme", "outline"], [1, "ant-image-preview-switch-right", 3, "click"], ["nzType", "right", "nzTheme", "outline"], [1, "ant-image-preview-operations-operation", 3, "click"], ["nzTheme", "outline", 1, "ant-image-preview-operations-icon", 3, "nzType", "nzRotate"], ["cdkDragHandle", "", 1, "ant-image-preview-img", 3, "width", "height", "transform"], ["cdkDragHandle", "", 1, "ant-image-preview-img"]],
    template: function NzImagePreviewComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelement(0, "div", 2);
        ɵɵelementStart(1, "div", 3);
        ɵɵconditionalCreate(2, NzImagePreviewComponent_Conditional_2_Template, 4, 4);
        ɵɵelementStart(3, "ul", 4);
        ɵɵconditionalCreate(4, NzImagePreviewComponent_Conditional_4_Template, 2, 2, "li", 5);
        ɵɵrepeaterCreate(5, NzImagePreviewComponent_For_6_Template, 2, 4, "li", 6, ɵɵrepeaterTrackByIdentity);
        ɵɵelementEnd()();
        ɵɵelementStart(7, "div", 7);
        ɵɵlistener("click", function NzImagePreviewComponent_Template_div_click_7_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.maskClosable && $event.target === $event.currentTarget && ctx.onClose());
        });
        ɵɵelementStart(8, "div", 8);
        ɵɵelement(9, "div", 9);
        ɵɵelementStart(10, "div", 10)(11, "div", 11)(12, "div", 12, 0);
        ɵɵlistener("cdkDragEnded", function NzImagePreviewComponent_Template_div_cdkDragEnded_12_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onDragEnd($event));
        });
        ɵɵrepeaterCreate(14, NzImagePreviewComponent_For_15_Template, 1, 1, null, null, ɵɵrepeaterTrackByIdentity);
        ɵɵelementEnd()()();
        ɵɵelement(16, "div", 9);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵconditional(ctx.images.length > 1 ? 2 : -1);
        ɵɵadvance(2);
        ɵɵconditional(ctx.images.length > 1 ? 4 : -1);
        ɵɵadvance();
        ɵɵrepeater(ctx.operations);
        ɵɵadvance(7);
        ɵɵstyleProp("transform", ctx.previewImageWrapperTransform);
        ɵɵproperty("cdkDragFreeDragPosition", ctx.position);
        ɵɵadvance(2);
        ɵɵrepeater(ctx.images);
      }
    },
    dependencies: [NzIconModule, NzIconDirective, CdkDragHandle, CdkDrag],
    encapsulation: 2,
    data: {
      animation: [fadeMotion]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzImagePreviewComponent, [{
    type: Component,
    args: [{
      selector: "nz-image-preview",
      exportAs: "nzImagePreview",
      animations: [fadeMotion],
      template: `
    <div class="ant-image-preview-mask"></div>

    <div class="ant-image-preview-operations-wrapper">
      @if (images.length > 1) {
        <div
          class="ant-image-preview-switch-left"
          [class.ant-image-preview-switch-left-disabled]="index <= 0"
          (click)="onSwitchLeft($event)"
        >
          <nz-icon nzType="left" nzTheme="outline" />
        </div>
        <div
          class="ant-image-preview-switch-right"
          [class.ant-image-preview-switch-right-disabled]="index >= images.length - 1"
          (click)="onSwitchRight($event)"
        >
          <nz-icon nzType="right" nzTheme="outline" />
        </div>
      }

      <ul class="ant-image-preview-operations">
        @if (images.length > 1) {
          <li class="ant-image-preview-operations-progress">{{ index + 1 }} / {{ images.length }}</li>
        }

        @for (option of operations; track option) {
          <li
            class="ant-image-preview-operations-operation"
            [class.ant-image-preview-operations-operation-disabled]="zoomOutDisabled && option.type === 'zoomOut'"
            (click)="option.onClick()"
          >
            <nz-icon
              class="ant-image-preview-operations-icon"
              [nzType]="option.icon"
              [nzRotate]="option.rotate ?? 0"
              nzTheme="outline"
            />
          </li>
        }
      </ul>
    </div>

    <div
      class="ant-image-preview-wrap"
      tabindex="-1"
      (click)="maskClosable && $event.target === $event.currentTarget && onClose()"
    >
      <div class="ant-image-preview" role="dialog" aria-modal="true">
        <div tabindex="0" aria-hidden="true" class="ant-image-preview-focus-trap"></div>
        <div class="ant-image-preview-content">
          <div class="ant-image-preview-body">
            <div
              class="ant-image-preview-img-wrapper"
              #imagePreviewWrapper
              cdkDrag
              [style.transform]="previewImageWrapperTransform"
              [cdkDragFreeDragPosition]="position"
              (cdkDragEnded)="onDragEnd($event)"
            >
              @for (image of images; track image; let imageIndex = $index) {
                @if (imageIndex === index) {
                  <img
                    cdkDragHandle
                    class="ant-image-preview-img"
                    #imgRef
                    [attr.src]="sanitizerResourceUrl(image.src)"
                    [attr.srcset]="image.srcset"
                    [attr.alt]="image.alt"
                    [style.width]="image.width"
                    [style.height]="image.height"
                    [style.transform]="previewImageTransform"
                  />
                }
              }
            </div>
          </div>
        </div>
        <div tabindex="0" aria-hidden="true" class="ant-image-preview-focus-trap"></div>
      </div>
    </div>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "ant-image-preview-root",
        "[class.ant-image-preview-moving]": "isDragging",
        "[style.zIndex]": "config.nzZIndex",
        "[@.disabled]": "config.nzNoAnimation",
        "[@fadeMotion]": `visible ? 'enter' : 'leave'`,
        "(@fadeMotion.start)": "onAnimationStart($event)",
        "(@fadeMotion.done)": "onAnimationDone($event)"
      },
      imports: [NzIconModule, CdkDragHandle, CdkDrag]
    }]
  }], () => [], {
    imageRef: [{
      type: ViewChild,
      args: ["imgRef"]
    }],
    imagePreviewWrapper: [{
      type: ViewChild,
      args: ["imagePreviewWrapper", {
        static: true
      }]
    }]
  });
})();
var NzImagePreviewRef = class {
  previewInstance;
  config;
  overlayRef;
  destroy$ = new Subject();
  constructor(previewInstance, config, overlayRef) {
    this.previewInstance = previewInstance;
    this.config = config;
    this.overlayRef = overlayRef;
    overlayRef.keydownEvents().pipe(filter((event) => this.config.nzKeyboard && (event.keyCode === ESCAPE || event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW) && !hasModifierKey(event))).subscribe((event) => {
      event.preventDefault();
      if (event.keyCode === ESCAPE) {
        previewInstance.onClose();
      }
      if (event.keyCode === LEFT_ARROW) {
        this.prev();
      }
      if (event.keyCode === RIGHT_ARROW) {
        this.next();
      }
    });
    overlayRef.detachments().subscribe(() => {
      this.overlayRef.dispose();
    });
    previewInstance.closeClick.pipe(take(1), switchMap(() => previewInstance.animationStateChanged), filter((event) => event.phaseName === "done"), takeUntil(this.destroy$)).subscribe(() => {
      this.close();
    });
  }
  switchTo(index) {
    this.previewInstance.switchTo(index);
  }
  next() {
    this.previewInstance.next();
  }
  prev() {
    this.previewInstance.prev();
  }
  close() {
    this.destroy$.next();
    this.overlayRef.dispose();
  }
};
var NzImageService = class _NzImageService {
  overlay = inject(Overlay);
  injector = inject(Injector);
  nzConfigService = inject(NzConfigService);
  directionality = inject(Directionality);
  preview(images, options, zoomMap) {
    return this.display(images, options, zoomMap);
  }
  display(images, config, scaleStepMap) {
    const configMerged = __spreadValues(__spreadValues({}, new NzImagePreviewOptions()), config ?? {});
    const overlayRef = this.createOverlay(configMerged);
    const previewComponent = this.attachPreviewComponent(overlayRef, configMerged);
    previewComponent.setImages(images, scaleStepMap);
    const previewRef = new NzImagePreviewRef(previewComponent, configMerged, overlayRef);
    previewComponent.previewRef = previewRef;
    return previewRef;
  }
  attachPreviewComponent(overlayRef, config) {
    const injector = Injector.create({
      parent: this.injector,
      providers: [{
        provide: OverlayRef,
        useValue: overlayRef
      }, {
        provide: NzImagePreviewOptions,
        useValue: config
      }]
    });
    const containerPortal = new ComponentPortal(NzImagePreviewComponent, null, injector);
    const containerRef = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }
  createOverlay(config) {
    const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME$1) || {};
    const overLayConfig = new OverlayConfig({
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: config.nzCloseOnNavigation ?? globalConfig.nzCloseOnNavigation ?? true,
      direction: config.nzDirection || globalConfig.nzDirection || this.directionality.value
    });
    return this.overlay.create(overLayConfig);
  }
  static ɵfac = function NzImageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzImageService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NzImageService,
    factory: _NzImageService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzImageService, [{
    type: Injectable
  }], null, null);
})();
var NZ_CONFIG_MODULE_NAME = "image";
var NzImageDirective = (() => {
  var _a;
  let _nzDisablePreview_decorators;
  let _nzDisablePreview_initializers = [];
  let _nzDisablePreview_extraInitializers = [];
  let _nzFallback_decorators;
  let _nzFallback_initializers = [];
  let _nzFallback_extraInitializers = [];
  let _nzPlaceholder_decorators;
  let _nzPlaceholder_initializers = [];
  let _nzPlaceholder_extraInitializers = [];
  let _nzScaleStep_decorators;
  let _nzScaleStep_initializers = [];
  let _nzScaleStep_extraInitializers = [];
  return _a = class {
    document = inject(DOCUMENT);
    nzConfigService = inject(NzConfigService);
    elementRef = inject(ElementRef);
    nzImageService = inject(NzImageService);
    cdr = inject(ChangeDetectorRef);
    directionality = inject(Directionality);
    destroyRef = inject(DestroyRef);
    _nzModuleName = NZ_CONFIG_MODULE_NAME;
    nzSrc = "";
    nzSrcset = "";
    nzDisablePreview = __runInitializers(this, _nzDisablePreview_initializers, false);
    nzFallback = (__runInitializers(this, _nzDisablePreview_extraInitializers), __runInitializers(this, _nzFallback_initializers, null));
    nzPlaceholder = (__runInitializers(this, _nzFallback_extraInitializers), __runInitializers(this, _nzPlaceholder_initializers, null));
    nzScaleStep = (__runInitializers(this, _nzPlaceholder_extraInitializers), __runInitializers(this, _nzScaleStep_initializers, null));
    dir = __runInitializers(this, _nzScaleStep_extraInitializers);
    backLoadImage;
    status = "normal";
    backLoadDestroy$ = new Subject();
    parentGroup = inject(NzImageGroupComponent, {
      optional: true
    });
    get previewable() {
      return !this.nzDisablePreview && this.status !== "error";
    }
    ngOnInit() {
      this.backLoad();
      if (this.parentGroup) {
        this.parentGroup.addImage(this);
      }
      if (this.directionality) {
        this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
          this.dir = direction;
          this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
      }
    }
    onPreview() {
      if (!this.previewable) {
        return;
      }
      if (this.parentGroup) {
        const previewAbleImages = this.parentGroup.images.filter((e) => e.previewable);
        const previewImages = previewAbleImages.map((e) => ({
          src: e.nzSrc,
          srcset: e.nzSrcset
        }));
        const previewIndex = previewAbleImages.findIndex((el) => this === el);
        const scaleStepMap = /* @__PURE__ */ new Map();
        previewAbleImages.forEach((imageDirective) => {
          scaleStepMap.set(imageDirective.nzSrc ?? imageDirective.nzSrcset, imageDirective.nzScaleStep ?? this.parentGroup.nzScaleStep ?? this.nzScaleStep ?? NZ_DEFAULT_SCALE_STEP);
        });
        const previewRef = this.nzImageService.preview(previewImages, {
          nzDirection: this.dir
        }, scaleStepMap);
        previewRef.switchTo(previewIndex);
      } else {
        const previewImages = [{
          src: this.nzSrc,
          srcset: this.nzSrcset
        }];
        this.nzImageService.preview(previewImages, {
          nzDirection: this.dir,
          nzScaleStep: this.nzScaleStep ?? NZ_DEFAULT_SCALE_STEP
        });
      }
    }
    getElement() {
      return this.elementRef;
    }
    ngOnChanges(changes) {
      const {
        nzSrc
      } = changes;
      if (nzSrc) {
        this.getElement().nativeElement.src = nzSrc.currentValue;
        this.backLoad();
      }
    }
    /**
     * use internal Image object handle fallback & placeholder
     *
     * @private
     */
    backLoad() {
      this.backLoadImage = this.document.createElement("img");
      this.backLoadImage.src = this.nzSrc;
      this.backLoadImage.srcset = this.nzSrcset;
      this.status = "loading";
      this.backLoadDestroy$.next();
      this.backLoadDestroy$.complete();
      this.backLoadDestroy$ = new Subject();
      if (this.backLoadImage.complete) {
        this.status = "normal";
        this.getElement().nativeElement.src = this.nzSrc;
        this.getElement().nativeElement.srcset = this.nzSrcset;
      } else {
        if (this.nzPlaceholder) {
          this.getElement().nativeElement.src = this.nzPlaceholder;
          this.getElement().nativeElement.srcset = "";
        } else {
          this.getElement().nativeElement.src = this.nzSrc;
          this.getElement().nativeElement.srcset = this.nzSrcset;
        }
        fromEvent(this.backLoadImage, "load").pipe(takeUntil(this.backLoadDestroy$), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.status = "normal";
          this.getElement().nativeElement.src = this.nzSrc;
          this.getElement().nativeElement.srcset = this.nzSrcset;
        });
        fromEvent(this.backLoadImage, "error").pipe(takeUntil(this.backLoadDestroy$), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.status = "error";
          if (this.nzFallback) {
            this.getElement().nativeElement.src = this.nzFallback;
            this.getElement().nativeElement.srcset = "";
          }
        });
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzDisablePreview_decorators = [WithConfig()];
    _nzFallback_decorators = [WithConfig()];
    _nzPlaceholder_decorators = [WithConfig()];
    _nzScaleStep_decorators = [WithConfig()];
    __esDecorate(null, null, _nzDisablePreview_decorators, {
      kind: "field",
      name: "nzDisablePreview",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzDisablePreview" in obj,
        get: (obj) => obj.nzDisablePreview,
        set: (obj, value) => {
          obj.nzDisablePreview = value;
        }
      },
      metadata: _metadata
    }, _nzDisablePreview_initializers, _nzDisablePreview_extraInitializers);
    __esDecorate(null, null, _nzFallback_decorators, {
      kind: "field",
      name: "nzFallback",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzFallback" in obj,
        get: (obj) => obj.nzFallback,
        set: (obj, value) => {
          obj.nzFallback = value;
        }
      },
      metadata: _metadata
    }, _nzFallback_initializers, _nzFallback_extraInitializers);
    __esDecorate(null, null, _nzPlaceholder_decorators, {
      kind: "field",
      name: "nzPlaceholder",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzPlaceholder" in obj,
        get: (obj) => obj.nzPlaceholder,
        set: (obj, value) => {
          obj.nzPlaceholder = value;
        }
      },
      metadata: _metadata
    }, _nzPlaceholder_initializers, _nzPlaceholder_extraInitializers);
    __esDecorate(null, null, _nzScaleStep_decorators, {
      kind: "field",
      name: "nzScaleStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzScaleStep" in obj,
        get: (obj) => obj.nzScaleStep,
        set: (obj, value) => {
          obj.nzScaleStep = value;
        }
      },
      metadata: _metadata
    }, _nzScaleStep_initializers, _nzScaleStep_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "ɵfac", function NzImageDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "ɵdir", ɵɵdefineDirective({
    type: _a,
    selectors: [["img", "nz-image", ""]],
    hostBindings: function NzImageDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function NzImageDirective_click_HostBindingHandler() {
          return ctx.onPreview();
        });
      }
    },
    inputs: {
      nzSrc: "nzSrc",
      nzSrcset: "nzSrcset",
      nzDisablePreview: [2, "nzDisablePreview", "nzDisablePreview", booleanAttribute],
      nzFallback: "nzFallback",
      nzPlaceholder: "nzPlaceholder",
      nzScaleStep: "nzScaleStep"
    },
    exportAs: ["nzImage"],
    features: [ɵɵNgOnChangesFeature]
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzImageDirective, [{
    type: Directive,
    args: [{
      selector: "img[nz-image]",
      exportAs: "nzImage",
      host: {
        "(click)": "onPreview()"
      }
    }]
  }], null, {
    nzSrc: [{
      type: Input
    }],
    nzSrcset: [{
      type: Input
    }],
    nzDisablePreview: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzFallback: [{
      type: Input
    }],
    nzPlaceholder: [{
      type: Input
    }],
    nzScaleStep: [{
      type: Input
    }]
  });
})();
var NzImageModule = class _NzImageModule {
  static ɵfac = function NzImageModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzImageModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzImageModule,
    imports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent],
    exports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [NzImageService],
    imports: [NzImagePreviewComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzImageModule, [{
    type: NgModule,
    args: [{
      imports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent],
      exports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent],
      providers: [NzImageService]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-experimental-image.mjs
var _c02 = ["imageRef"];
function isFixedSize(size) {
  return typeof size === "number" || /^(\d)+(px)?$/.test(size);
}
var defaultImageSrcLoader = ({
  src
}) => {
  return src;
};
var NZ_CONFIG_MODULE_NAME2 = "imageExperimental";
var sizeBreakpoints = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
var NzImageViewComponent = (() => {
  var _a;
  let _nzSrcLoader_decorators;
  let _nzSrcLoader_initializers = [];
  let _nzSrcLoader_extraInitializers = [];
  let _nzAutoSrcset_decorators;
  let _nzAutoSrcset_initializers = [];
  let _nzAutoSrcset_extraInitializers = [];
  let _nzFallback_decorators;
  let _nzFallback_initializers = [];
  let _nzFallback_extraInitializers = [];
  let _nzPlaceholder_decorators;
  let _nzPlaceholder_initializers = [];
  let _nzPlaceholder_extraInitializers = [];
  let _nzDisablePreview_decorators;
  let _nzDisablePreview_initializers = [];
  let _nzDisablePreview_extraInitializers = [];
  return _a = class {
    cdr = inject(ChangeDetectorRef);
    imagePreloadService = inject(ImagePreloadService);
    destroyRef = inject(DestroyRef);
    _nzModuleName = NZ_CONFIG_MODULE_NAME2;
    nzSrc = "";
    nzAlt = "";
    nzWidth = "auto";
    nzHeight = "auto";
    nzSrcLoader = __runInitializers(this, _nzSrcLoader_initializers, defaultImageSrcLoader);
    nzAutoSrcset = (__runInitializers(this, _nzSrcLoader_extraInitializers), __runInitializers(this, _nzAutoSrcset_initializers, false));
    nzPriority = (__runInitializers(this, _nzAutoSrcset_extraInitializers), false);
    nzFallback = __runInitializers(this, _nzFallback_initializers, null);
    nzPlaceholder = (__runInitializers(this, _nzFallback_extraInitializers), __runInitializers(this, _nzPlaceholder_initializers, null));
    nzDisablePreview = (__runInitializers(this, _nzPlaceholder_extraInitializers), __runInitializers(this, _nzDisablePreview_initializers, false));
    imageRef = __runInitializers(this, _nzDisablePreview_extraInitializers);
    src = "";
    width = "auto";
    height = "auto";
    srcset = "";
    reloadDisposeHandler = () => void 0;
    constructor() {
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME2, () => {
        this.composeImageAttrs();
        this.cdr.markForCheck();
      });
      this.destroyRef.onDestroy(() => {
        this.reloadDisposeHandler();
      });
    }
    ngOnInit() {
      if (this.nzPriority) {
        this.preload();
      }
    }
    ngOnChanges(changes) {
      const {
        nzLoader,
        nzSrc,
        nzOptimize
      } = changes;
      if (nzSrc || nzLoader || nzOptimize) {
        this.composeImageAttrs();
      }
    }
    preload() {
      this.reloadDisposeHandler = this.imagePreloadService.addPreload({
        src: this.src,
        srcset: this.srcset
      });
    }
    optimizable() {
      if (this.nzAutoSrcset) {
        if (!isFixedSize(this.nzWidth) || !isFixedSize(this.nzHeight)) {
          warn(`When using "nzAutoSrcset" you should use a fixed size width and height, for more information please refer to CLS (https://web.dev/cls/) performance metrics`);
          return false;
        }
        if (this.nzSrc.endsWith(".svg")) {
          warn(`SVG does not need to be optimized`);
          return false;
        }
        if (this.nzSrc.startsWith("data:")) {
          warn(`Data URLs cannot be optimized`);
          return false;
        }
        return true;
      }
      return false;
    }
    composeImageAttrs() {
      const loader = this.getLoader();
      if (!this.optimizable()) {
        this.src = loader({
          src: this.nzSrc
        });
        this.width = this.nzWidth;
        this.height = this.nzHeight;
        return;
      }
      this.width = typeof this.nzWidth === "number" ? this.nzWidth : parseInt(this.nzWidth, 10);
      this.height = typeof this.nzHeight === "number" ? this.nzHeight : parseInt(this.nzHeight, 10);
      const widths = this.convertWidths(this.width, sizeBreakpoints);
      this.src = loader({
        src: this.nzSrc,
        width: widths[0]
      });
      this.srcset = widths.map((w, i) => `${loader({
        src: this.nzSrc,
        width: w
      })} ${i + 1}x`).join(", ");
    }
    getLoader() {
      return this.nzSrcLoader || defaultImageSrcLoader;
    }
    convertWidths(width, optimizeSizes) {
      const allSizes = [...optimizeSizes].sort((a, b) => a - b);
      return [...new Set(
        // 2x scale is sufficient
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [width, width * 2].map((w) => allSizes.find((p) => p >= w) || w)
      )];
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzSrcLoader_decorators = [WithConfig()];
    _nzAutoSrcset_decorators = [WithConfig()];
    _nzFallback_decorators = [WithConfig()];
    _nzPlaceholder_decorators = [WithConfig()];
    _nzDisablePreview_decorators = [WithConfig()];
    __esDecorate(null, null, _nzSrcLoader_decorators, {
      kind: "field",
      name: "nzSrcLoader",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSrcLoader" in obj,
        get: (obj) => obj.nzSrcLoader,
        set: (obj, value) => {
          obj.nzSrcLoader = value;
        }
      },
      metadata: _metadata
    }, _nzSrcLoader_initializers, _nzSrcLoader_extraInitializers);
    __esDecorate(null, null, _nzAutoSrcset_decorators, {
      kind: "field",
      name: "nzAutoSrcset",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzAutoSrcset" in obj,
        get: (obj) => obj.nzAutoSrcset,
        set: (obj, value) => {
          obj.nzAutoSrcset = value;
        }
      },
      metadata: _metadata
    }, _nzAutoSrcset_initializers, _nzAutoSrcset_extraInitializers);
    __esDecorate(null, null, _nzFallback_decorators, {
      kind: "field",
      name: "nzFallback",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzFallback" in obj,
        get: (obj) => obj.nzFallback,
        set: (obj, value) => {
          obj.nzFallback = value;
        }
      },
      metadata: _metadata
    }, _nzFallback_initializers, _nzFallback_extraInitializers);
    __esDecorate(null, null, _nzPlaceholder_decorators, {
      kind: "field",
      name: "nzPlaceholder",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzPlaceholder" in obj,
        get: (obj) => obj.nzPlaceholder,
        set: (obj, value) => {
          obj.nzPlaceholder = value;
        }
      },
      metadata: _metadata
    }, _nzPlaceholder_initializers, _nzPlaceholder_extraInitializers);
    __esDecorate(null, null, _nzDisablePreview_decorators, {
      kind: "field",
      name: "nzDisablePreview",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzDisablePreview" in obj,
        get: (obj) => obj.nzDisablePreview,
        set: (obj, value) => {
          obj.nzDisablePreview = value;
        }
      },
      metadata: _metadata
    }, _nzDisablePreview_initializers, _nzDisablePreview_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "ɵfac", function NzImageViewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "ɵcmp", ɵɵdefineComponent({
    type: _a,
    selectors: [["nz-image"]],
    viewQuery: function NzImageViewComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c02, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.imageRef = _t.first);
      }
    },
    inputs: {
      nzSrc: "nzSrc",
      nzAlt: "nzAlt",
      nzWidth: "nzWidth",
      nzHeight: "nzHeight",
      nzSrcLoader: "nzSrcLoader",
      nzAutoSrcset: [2, "nzAutoSrcset", "nzAutoSrcset", booleanAttribute],
      nzPriority: [2, "nzPriority", "nzPriority", booleanAttribute],
      nzFallback: "nzFallback",
      nzPlaceholder: "nzPlaceholder",
      nzDisablePreview: [2, "nzDisablePreview", "nzDisablePreview", booleanAttribute]
    },
    exportAs: ["nzImage"],
    features: [ɵɵNgOnChangesFeature],
    decls: 2,
    vars: 9,
    consts: [["imageRef", ""], ["nz-image", "", 3, "nzSrc", "nzSrcset", "nzDisablePreview", "nzFallback", "nzPlaceholder"]],
    template: function NzImageViewComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelement(0, "img", 1, 0);
      }
      if (rf & 2) {
        ɵɵproperty("nzSrc", ctx.src)("nzSrcset", ctx.srcset)("nzDisablePreview", ctx.nzDisablePreview)("nzFallback", ctx.nzFallback)("nzPlaceholder", ctx.nzPlaceholder);
        ɵɵattribute("width", ctx.width)("height", ctx.height)("srcset", ctx.srcset)("alt", ctx.nzAlt || null);
      }
    },
    dependencies: [NzImageDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzImageViewComponent, [{
    type: Component,
    args: [{
      selector: "nz-image",
      exportAs: "nzImage",
      template: `
    <img
      #imageRef
      nz-image
      [nzSrc]="src"
      [nzSrcset]="srcset"
      [nzDisablePreview]="nzDisablePreview"
      [nzFallback]="nzFallback"
      [nzPlaceholder]="nzPlaceholder"
      [attr.width]="width"
      [attr.height]="height"
      [attr.srcset]="srcset"
      [attr.alt]="nzAlt || null"
    />
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzImageDirective]
    }]
  }], () => [], {
    nzSrc: [{
      type: Input
    }],
    nzAlt: [{
      type: Input
    }],
    nzWidth: [{
      type: Input
    }],
    nzHeight: [{
      type: Input
    }],
    nzSrcLoader: [{
      type: Input
    }],
    nzAutoSrcset: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPriority: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzFallback: [{
      type: Input
    }],
    nzPlaceholder: [{
      type: Input
    }],
    nzDisablePreview: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    imageRef: [{
      type: ViewChild,
      args: ["imageRef"]
    }]
  });
})();
var NzImageModule2 = class _NzImageModule {
  static ɵfac = function NzImageModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzImageModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzImageModule,
    imports: [NzImageViewComponent],
    exports: [NzImageViewComponent]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzImageModule2, [{
    type: NgModule,
    args: [{
      imports: [NzImageViewComponent],
      exports: [NzImageViewComponent]
    }]
  }], null, null);
})();

// node_modules/@delon/abc/fesm2022/cell.mjs
function CellComponent_ng_template_0_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 9);
    ɵɵlistener("ngModelChange", function CellComponent_ng_template_0_Case_2_Template_label_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.value.set($event));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("nzDisabled", ctx_r1.disabled())("ngModel", ctx_r1.value());
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.safeOpt.checkbox == null ? null : ctx_r1.safeOpt.checkbox.label, " ");
  }
}
function CellComponent_ng_template_0_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 10);
    ɵɵlistener("ngModelChange", function CellComponent_ng_template_0_Case_3_Template_label_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.value.set($event));
    });
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("nzDisabled", ctx_r1.disabled())("ngModel", ctx_r1.value());
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.safeOpt.radio == null ? null : ctx_r1.safeOpt.radio.label, " ");
  }
}
function CellComponent_ng_template_0_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 11);
    ɵɵlistener("click", function CellComponent_ng_template_0_Case_4_Template_a_click_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1._link($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const text_r5 = ɵɵreadContextLet(1);
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("innerHTML", text_r5, ɵɵsanitizeHtml);
    ɵɵattribute("target", ctx_r1.safeOpt.link == null ? null : ctx_r1.safeOpt.link.target)("title", ctx_r1.value());
  }
}
function CellComponent_ng_template_0_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "nz-tag", 7);
    ɵɵelement(1, "span", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const res_r6 = ɵɵreadContextLet(0);
    const text_r5 = ɵɵreadContextLet(1);
    ɵɵproperty("nzColor", res_r6 == null ? null : res_r6.result == null ? null : res_r6.result.color);
    ɵɵadvance();
    ɵɵproperty("innerHTML", text_r5, ɵɵsanitizeHtml);
  }
}
function CellComponent_ng_template_0_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-badge", 8);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const res_r6 = ɵɵreadContextLet(0);
    const text_r5 = ɵɵreadContextLet(1);
    ɵɵproperty("nzText", ɵɵinterpolate(text_r5))("nzStatus", res_r6 == null ? null : res_r6.result == null ? null : res_r6.result.color);
  }
}
function CellComponent_ng_template_0_Case_7_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function CellComponent_ng_template_0_Case_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CellComponent_ng_template_0_Case_7_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 12);
  }
  if (rf & 2) {
    ɵɵnextContext(2);
    const res_r6 = ɵɵreadContextLet(0);
    ɵɵproperty("data", res_r6);
  }
}
function CellComponent_ng_template_0_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, CellComponent_ng_template_0_Case_7_Conditional_0_Template, 1, 1, null, 12);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const res_r6 = ɵɵreadContextLet(0);
    ɵɵconditional(res_r6 ? 0 : -1);
  }
}
function CellComponent_ng_template_0_Case_8_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "img", 14);
    ɵɵlistener("click", function CellComponent_ng_template_0_Case_8_For_1_Template_img_click_0_listener() {
      const i_r8 = ɵɵrestoreView(_r7).$implicit;
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1._showImg(i_r8));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r8 = ctx.$implicit;
    const img_r9 = ɵɵnextContext(3).safeOpt.img;
    ɵɵclassProp("point", img_r9 == null ? null : img_r9.big);
    ɵɵattribute("src", i_r8, ɵɵsanitizeUrl)("height", img_r9 == null ? null : img_r9.size)("width", img_r9 == null ? null : img_r9.size);
  }
}
function CellComponent_ng_template_0_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵrepeaterCreate(0, CellComponent_ng_template_0_Case_8_For_1_Template, 1, 5, "img", 13, ɵɵrepeaterTrackByIndex);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const text_r5 = ɵɵreadContextLet(1);
    ɵɵrepeater(text_r5);
  }
}
function CellComponent_ng_template_0_Case_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 15);
  }
  if (rf & 2) {
    ɵɵnextContext(2);
    const text_r5 = ɵɵreadContextLet(1);
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("innerText", text_r5);
    ɵɵattribute("title", ctx_r1.value());
  }
}
function CellComponent_ng_template_0_Case_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 6);
  }
  if (rf & 2) {
    ɵɵnextContext(2);
    const text_r5 = ɵɵreadContextLet(1);
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("innerHTML", text_r5, ɵɵsanitizeHtml);
    ɵɵattribute("title", ctx_r1.value());
  }
}
function CellComponent_ng_template_0_Case_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 16);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1._unit());
  }
}
function CellComponent_ng_template_0_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, CellComponent_ng_template_0_Case_9_Conditional_0_Template, 1, 2, "span", 15)(1, CellComponent_ng_template_0_Case_9_Conditional_1_Template, 1, 2, "span", 6);
    ɵɵconditionalCreate(2, CellComponent_ng_template_0_Case_9_Conditional_2_Template, 2, 1, "span", 16);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵconditional(ctx_r1.isText() ? 0 : 1);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1._unit() ? 2 : -1);
  }
}
function CellComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵdeclareLet(0)(1);
    ɵɵconditionalCreate(2, CellComponent_ng_template_0_Case_2_Template, 2, 3, "label", 4)(3, CellComponent_ng_template_0_Case_3_Template, 2, 3, "label", 5)(4, CellComponent_ng_template_0_Case_4_Template, 1, 3, "a", 6)(5, CellComponent_ng_template_0_Case_5_Template, 2, 2, "nz-tag", 7)(6, CellComponent_ng_template_0_Case_6_Template, 1, 3, "nz-badge", 8)(7, CellComponent_ng_template_0_Case_7_Template, 1, 1)(8, CellComponent_ng_template_0_Case_8_Template, 2, 0)(9, CellComponent_ng_template_0_Case_9_Template, 3, 2);
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = ɵɵnextContext();
    ɵɵstoreLet(ctx_r1._res());
    ɵɵadvance();
    ɵɵstoreLet(ctx_r1._text());
    ɵɵadvance();
    ɵɵconditional((tmp_5_0 = ctx_r1.safeOpt.type) === "checkbox" ? 2 : tmp_5_0 === "radio" ? 3 : tmp_5_0 === "link" ? 4 : tmp_5_0 === "tag" ? 5 : tmp_5_0 === "badge" ? 6 : tmp_5_0 === "widget" ? 7 : tmp_5_0 === "img" ? 8 : 9);
  }
}
function CellComponent_ng_template_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵtextInterpolate1(" ", ctx_r1.safeOpt.default == null ? null : ctx_r1.safeOpt.default.text, " ");
  }
}
function CellComponent_ng_template_2_Conditional_1_Conditional_0_ng_template_1_Template(rf, ctx) {
}
function CellComponent_ng_template_2_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 17);
    ɵɵtemplate(1, CellComponent_ng_template_2_Conditional_1_Conditional_0_ng_template_1_Template, 0, 0, "ng-template", 3);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    const text_r10 = ɵɵreference(1);
    ɵɵproperty("nz-tooltip", ctx_r1.safeOpt.tooltip);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", text_r10);
  }
}
function CellComponent_ng_template_2_Conditional_1_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function CellComponent_ng_template_2_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CellComponent_ng_template_2_Conditional_1_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 3);
  }
  if (rf & 2) {
    ɵɵnextContext(3);
    const text_r10 = ɵɵreference(1);
    ɵɵproperty("ngTemplateOutlet", text_r10);
  }
}
function CellComponent_ng_template_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, CellComponent_ng_template_2_Conditional_1_Conditional_0_Template, 2, 2, "span", 17)(1, CellComponent_ng_template_2_Conditional_1_Conditional_1_Template, 1, 1, null, 3);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵconditional(ctx_r1.safeOpt.tooltip ? 0 : 1);
  }
}
function CellComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵconditionalCreate(0, CellComponent_ng_template_2_Conditional_0_Template, 1, 1)(1, CellComponent_ng_template_2_Conditional_1_Template, 2, 1);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵconditional(ctx_r1.showDefault() ? 0 : 1);
  }
}
function CellComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-icon", 2);
  }
}
function CellComponent_Conditional_5_ng_template_0_Template(rf, ctx) {
}
function CellComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CellComponent_Conditional_5_ng_template_0_Template, 0, 0, "ng-template", 3);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const textWrap_r11 = ɵɵreference(3);
    ɵɵproperty("ngTemplateOutlet", textWrap_r11);
  }
}
var CellService = class _CellService {
  nzI18n = inject(NzI18nService);
  currency = inject(CurrencyService);
  dom = inject(DomSanitizer);
  configSrv = inject(AlainConfigService);
  globalOptions = this.configSrv.merge("cell", {
    date: {
      format: "yyyy-MM-dd HH:mm:ss"
    },
    img: {
      size: 32
    },
    default: {
      text: "-"
    }
  });
  widgets = {
    date: {
      type: "fn",
      ref: (value, opt) => {
        return {
          text: formatDate(value, opt.date.format, {
            locale: this.nzI18n.getDateLocale(),
            customFormat: this.configSrv.get("themePipe")?.dateFormatCustom
          })
        };
      }
    },
    mega: {
      type: "fn",
      ref: (value, opt) => {
        const res = this.currency.mega(value, opt.mega);
        return {
          text: res.value,
          unit: res.unitI18n
        };
      }
    },
    currency: {
      type: "fn",
      ref: (value, opt) => {
        return {
          text: this.currency.format(value, opt.currency)
        };
      }
    },
    cny: {
      type: "fn",
      ref: (value, opt) => {
        return {
          text: this.currency.cny(value, opt.cny)
        };
      }
    },
    boolean: {
      type: "fn",
      ref: (value, opt) => {
        return {
          text: this.dom.bypassSecurityTrustHtml(yn(value, opt.boolean))
        };
      }
    },
    img: {
      type: "fn",
      ref: (value) => {
        return {
          text: Array.isArray(value) ? value : [value]
        };
      }
    }
  };
  registerWidget(key, widget) {
    this.widgets[key] = {
      type: "widget",
      ref: widget
    };
  }
  getWidget(key) {
    return this.widgets[key];
  }
  genType(value, options) {
    if (options.type != null) return options.type;
    const typeOf = typeof value;
    if (typeOf === "number" && /^[0-9]{13}$/g.test(value)) return "date";
    if (value instanceof Date || options.date != null) return "date";
    if (options.widget != null) return "widget";
    else if (options.mega != null) return "mega";
    else if (options.currency != null) return "currency";
    else if (options.cny != null) return "cny";
    else if (options.img != null) return "img";
    else if (options.link != null) return "link";
    else if (options.html != null) return "html";
    else if (options.badge != null) return "badge";
    else if (options.tag != null) return "tag";
    else if (options.checkbox != null) return "checkbox";
    else if (options.radio != null) return "radio";
    else if (options.enum != null) return "enum";
    else if (typeOf === "number") return "number";
    else if (typeOf === "boolean" || options.boolean != null) return "boolean";
    else return "string";
  }
  fixOptions(options) {
    return deepMerge({}, this.globalOptions, options);
  }
  get(value, options) {
    const type = this.genType(value, __spreadValues({}, options));
    const opt = this.fixOptions(options);
    opt.type = type;
    const isSafeHtml = typeof value === "object" && typeof value?.getTypeName === "function" && value?.getTypeName() != null;
    let res = {
      result: typeof value === "object" && !isSafeHtml ? value : {
        text: value == null ? "" : isSafeHtml ? value : `${value}`
      },
      options: opt
    };
    const widget = this.widgets[type];
    if (widget?.type === "fn") {
      res.result = widget.ref(value, opt);
    }
    return (typeof value === "function" ? value(value, opt) : of(res.result)).pipe(map((text) => {
      res.result = text;
      let dictData;
      switch (type) {
        case "badge":
          dictData = (opt.badge?.data ?? {})[value];
          res.result = __spreadValues({
            color: "default"
          }, dictData);
          break;
        case "tag":
          dictData = (opt.tag?.data ?? {})[value];
          res.result = dictData;
          break;
        case "enum":
          res.result = {
            text: (opt.enum ?? {})[value]
          };
          break;
        case "html":
          res.safeHtml = opt.html?.safe;
          break;
        case "string":
          if (isSafeHtml) res.safeHtml = "safeHtml";
          break;
      }
      if ((type === "badge" || type === "tag") && dictData?.tooltip != null) {
        res.options.tooltip = dictData.tooltip;
      }
      if (opt.mask != null) {
        res.result.text = formatMask(res.result.text, opt.mask);
      }
      return res;
    }));
  }
  static ɵfac = function CellService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CellService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _CellService,
    factory: _CellService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CellService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var CellHostDirective = class _CellHostDirective {
  srv = inject(CellService);
  vcr = inject(ViewContainerRef);
  data = input.required(...ngDevMode ? [{
    debugName: "data"
  }] : []);
  constructor() {
    effect(() => {
      const data = this.data();
      const widget = data.options.widget;
      const componentType = this.srv.getWidget(widget.key)?.ref;
      if (componentType == null) {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          warn2(`cell: No widget for type "${widget.key}"`);
        }
        return;
      }
      this.vcr.clear();
      const componentRef = this.vcr.createComponent(componentType);
      componentRef.instance.data = data;
    });
  }
  static ɵfac = function CellHostDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CellHostDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CellHostDirective,
    selectors: [["", "cell-widget-host", ""]],
    inputs: {
      data: [1, "data"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CellHostDirective, [{
    type: Directive,
    args: [{
      selector: "[cell-widget-host]"
    }]
  }], () => [], null);
})();
var CellComponent = class _CellComponent {
  srv = inject(CellService);
  router = inject(Router);
  renderer = inject(Renderer2);
  imgSrv = inject(NzImageService);
  win = inject(WINDOW);
  el = inject(ElementRef).nativeElement;
  destroy$;
  _text = signal("", ...ngDevMode ? [{
    debugName: "_text"
  }] : []);
  _unit = signal(void 0, ...ngDevMode ? [{
    debugName: "_unit"
  }] : []);
  _res = signal(void 0, ...ngDevMode ? [{
    debugName: "_res"
  }] : []);
  showDefault = computed(() => this.value() == this.safeOpt.default?.condition, ...ngDevMode ? [{
    debugName: "showDefault"
  }] : []);
  value = model(...ngDevMode ? [void 0, {
    debugName: "value"
  }] : []);
  options = input(...ngDevMode ? [void 0, {
    debugName: "options"
  }] : []);
  loading = input(false, ...ngDevMode ? [{
    debugName: "loading",
    transform: booleanAttribute
  }] : [{
    transform: booleanAttribute
  }]);
  disabled = input(false, ...ngDevMode ? [{
    debugName: "disabled",
    transform: booleanAttribute
  }] : [{
    transform: booleanAttribute
  }]);
  get safeOpt() {
    return this._res()?.options ?? {};
  }
  isText = computed(() => this._res()?.safeHtml === "text", ...ngDevMode ? [{
    debugName: "isText"
  }] : []);
  constructor() {
    combineLatest([toObservable(this.loading), toObservable(this.disabled)]).pipe(takeUntilDestroyed()).subscribe(() => this.setClass());
    effect(() => {
      const v = this.value();
      const o = this.options();
      this.destroy$?.unsubscribe();
      this.destroy$ = this.srv.get(v, o).pipe(take(1)).subscribe((res) => {
        this._res.set(res);
        this._text.set(res.result?.text ?? "");
        this._unit.set(res.result?.unit ?? this.safeOpt?.unit);
        this.setClass();
      });
    });
  }
  setClass() {
    const {
      el,
      renderer
    } = this;
    const {
      renderType,
      size,
      type
    } = this.safeOpt;
    updateHostClass(el, renderer, {
      [`cell`]: true,
      [`cell__${renderType}`]: renderType != null,
      [`cell__${size}`]: size != null,
      [`cell__has-unit`]: this._unit(),
      [`cell__has-default`]: this.showDefault(),
      [`cell__disabled`]: this.disabled()
    });
    el.setAttribute("data-type", `${type}`);
  }
  _link(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled()) return;
    const link = this.safeOpt.link;
    const url = link?.url;
    if (url == null) return;
    if (/https?:\/\//g.test(url)) {
      this.win.open(url, link?.target);
    } else {
      this.router.navigateByUrl(url);
    }
  }
  _showImg(img) {
    const config = this.safeOpt.img;
    if (config == null || config.big == null) return;
    let idx = -1;
    const list = this._text().map((p, index) => {
      if (idx === -1 && p === img) idx = index;
      return typeof config.big === "function" ? config.big(p) : p;
    });
    this.imgSrv.preview(list.map((p) => ({
      src: p
    })), config.previewOptions).switchTo(idx);
  }
  ngOnDestroy() {
    this.destroy$?.unsubscribe();
  }
  static ɵfac = function CellComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CellComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _CellComponent,
    selectors: [["cell"], ["", "cell", ""]],
    inputs: {
      value: [1, "value"],
      options: [1, "options"],
      loading: [1, "loading"],
      disabled: [1, "disabled"]
    },
    outputs: {
      value: "valueChange"
    },
    exportAs: ["cell"],
    decls: 6,
    vars: 1,
    consts: [["text", ""], ["textWrap", ""], ["nzType", "loading"], [3, "ngTemplateOutlet"], ["nz-checkbox", "", 3, "nzDisabled", "ngModel"], ["nz-radio", "", 3, "nzDisabled", "ngModel"], [3, "innerHTML"], [3, "nzColor"], [3, "nzStatus", "nzText"], ["nz-checkbox", "", 3, "ngModelChange", "nzDisabled", "ngModel"], ["nz-radio", "", 3, "ngModelChange", "nzDisabled", "ngModel"], [3, "click", "innerHTML"], ["cell-widget-host", "", 3, "data"], [1, "img", 3, "point"], [1, "img", 3, "click"], [3, "innerText"], [1, "unit"], [3, "nz-tooltip"]],
    template: function CellComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, CellComponent_ng_template_0_Template, 10, 3, "ng-template", null, 0, ɵɵtemplateRefExtractor)(2, CellComponent_ng_template_2_Template, 2, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        ɵɵconditionalCreate(4, CellComponent_Conditional_4_Template, 1, 0, "nz-icon", 2)(5, CellComponent_Conditional_5_Template, 1, 1, null, 3);
      }
      if (rf & 2) {
        ɵɵadvance(4);
        ɵɵconditional(ctx.loading() ? 4 : 5);
      }
    },
    dependencies: [FormsModule, NgControlStatus, NgModel, NgTemplateOutlet, NzCheckboxComponent, NzRadioComponent, NzIconDirective, NzTagComponent, NzBadgeComponent, NzTooltipDirective, NzImageModule, CellHostDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CellComponent, [{
    type: Component,
    args: [{
      selector: "cell, [cell]",
      template: `
    <ng-template #text>
      @let res = _res();
      @let text = _text();
      @switch (safeOpt.type) {
        @case ('checkbox') {
          <label nz-checkbox [nzDisabled]="disabled()" [ngModel]="value()" (ngModelChange)="value.set($event)">
            {{ safeOpt.checkbox?.label }}
          </label>
        }
        @case ('radio') {
          <label nz-radio [nzDisabled]="disabled()" [ngModel]="value()" (ngModelChange)="value.set($event)">
            {{ safeOpt.radio?.label }}
          </label>
        }
        @case ('link') {
          <a (click)="_link($event)" [attr.target]="safeOpt.link?.target" [attr.title]="value()" [innerHTML]="text"></a>
        }
        @case ('tag') {
          <nz-tag [nzColor]="res?.result?.color">
            <span [innerHTML]="text"></span>
          </nz-tag>
        }
        @case ('badge') {
          <nz-badge [nzStatus]="res?.result?.color" nzText="{{ text }}" />
        }
        @case ('widget') {
          @if (res) {
            <ng-template cell-widget-host [data]="res" />
          }
        }
        @case ('img') {
          @for (i of $any(text); track $index) {
            @let img = safeOpt.img;
            <img
              [attr.src]="i"
              [attr.height]="img?.size"
              [attr.width]="img?.size"
              (click)="_showImg(i)"
              class="img"
              [class.point]="img?.big"
            />
          }
        }
        @default {
          @if (isText()) {
            <span [innerText]="text" [attr.title]="value()"></span>
          } @else {
            <span [innerHTML]="text" [attr.title]="value()"></span>
          }
          @if (_unit()) {
            <span class="unit">{{ _unit() }}</span>
          }
        }
      }
    </ng-template>
    <ng-template #textWrap>
      @if (showDefault()) {
        {{ safeOpt.default?.text }}
      } @else {
        @if (safeOpt.tooltip) {
          <span [nz-tooltip]="safeOpt.tooltip">
            <ng-template [ngTemplateOutlet]="text" />
          </span>
        } @else {
          <ng-template [ngTemplateOutlet]="text" />
        }
      }
    </ng-template>
    @if (loading()) {
      <nz-icon nzType="loading" />
    } @else {
      <ng-template [ngTemplateOutlet]="textWrap" />
    }
  `,
      exportAs: "cell",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [FormsModule, NgTemplateOutlet, NzCheckboxComponent, NzRadioComponent, NzIconDirective, NzTagComponent, NzBadgeComponent, NzTooltipDirective, NzImageModule, CellHostDirective]
    }]
  }], () => [], null);
})();
var COMPS = [CellComponent];
var CellModule = class _CellModule {
  static ɵfac = function CellModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CellModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _CellModule,
    imports: [CommonModule, FormsModule, NzCheckboxModule, NzRadioModule, NzBadgeModule, NzTagModule, NzTooltipModule, NzIconModule, NzImageModule2, CellComponent, CellHostDirective],
    exports: [CellComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, FormsModule, NzCheckboxModule, NzRadioModule, NzBadgeModule, NzTagModule, NzTooltipModule, NzIconModule, NzImageModule2, COMPS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CellModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FormsModule, NzCheckboxModule, NzRadioModule, NzBadgeModule, NzTagModule, NzTooltipModule, NzIconModule, NzImageModule2, ...COMPS, CellHostDirective],
      exports: COMPS
    }]
  }], null, null);
})();
function provideCellWidgets(...widgets) {
  return makeEnvironmentProviders([provideEnvironmentInitializer(() => {
    const srv = inject(CellService);
    widgets.forEach((widget) => srv.registerWidget(widget.KEY, widget.type));
  })]);
}

export {
  CellService,
  CellHostDirective,
  CellComponent,
  CellModule,
  provideCellWidgets
};
//# sourceMappingURL=chunk-4YTCLN44.js.map
