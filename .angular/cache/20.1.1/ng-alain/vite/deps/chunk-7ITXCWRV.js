import {
  ensureInBounds,
  fromEventOutsideAngular,
  isTouchEvent
} from "./chunk-J25EALHE.js";
import {
  takeUntilDestroyed
} from "./chunk-I75K2H66.js";
import {
  normalizePassiveListenerOptions
} from "./chunk-CQHDL44S.js";
import {
  Platform
} from "./chunk-GIT7CFOZ.js";
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  booleanAttribute,
  numberAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵlistener,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity
} from "./chunk-NQBXVTYU.js";
import {
  DOCUMENT,
  DestroyRef,
  inject,
  ɵɵdefineInjectable,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import {
  merge
} from "./chunk-KMLKBNXJ.js";
import {
  Subject,
  filter
} from "./chunk-EBAU53KC.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-resizable.mjs
var _c0 = ["*"];
function NzResizeHandlesComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-resize-handle", 0);
  }
  if (rf & 2) {
    const option_r1 = ctx.$implicit;
    ɵɵproperty("nzDirection", option_r1.direction)("nzCursorType", option_r1.cursorType);
  }
}
function getEventWithPoint(event) {
  return isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
}
var NzResizableService = class _NzResizableService {
  document = inject(DOCUMENT);
  ngZone = inject(NgZone);
  listeners = /* @__PURE__ */ new Map();
  /**
   * The `OutsideAngular` prefix means that the subject will emit events outside of the Angular zone,
   * so that becomes a bit more descriptive for those who'll maintain the code in the future:
   * ```ts
   * nzResizableService.handleMouseDownOutsideAngular$.subscribe(event => {
   *   console.log(Zone.current); // <root>
   *   console.log(NgZone.isInAngularZone()); // false
   * });
   * ```
   */
  handleMouseDownOutsideAngular$ = new Subject();
  documentMouseUpOutsideAngular$ = new Subject();
  documentMouseMoveOutsideAngular$ = new Subject();
  mouseEnteredOutsideAngular$ = new Subject();
  startResizing(event) {
    const _isTouchEvent = isTouchEvent(event);
    this.clearListeners();
    const moveEvent = _isTouchEvent ? "touchmove" : "mousemove";
    const upEvent = _isTouchEvent ? "touchend" : "mouseup";
    const moveEventHandler = (e) => {
      this.documentMouseMoveOutsideAngular$.next(e);
    };
    const upEventHandler = (e) => {
      this.documentMouseUpOutsideAngular$.next(e);
      this.clearListeners();
    };
    this.listeners.set(moveEvent, moveEventHandler);
    this.listeners.set(upEvent, upEventHandler);
    this.ngZone.runOutsideAngular(() => {
      this.listeners.forEach((handler, name) => {
        this.document.addEventListener(name, handler);
      });
    });
  }
  clearListeners() {
    this.listeners.forEach((handler, name) => {
      this.document.removeEventListener(name, handler);
    });
    this.listeners.clear();
  }
  ngOnDestroy() {
    this.handleMouseDownOutsideAngular$.complete();
    this.documentMouseUpOutsideAngular$.complete();
    this.documentMouseMoveOutsideAngular$.complete();
    this.mouseEnteredOutsideAngular$.complete();
    this.clearListeners();
  }
  static ɵfac = function NzResizableService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzResizableService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NzResizableService,
    factory: _NzResizableService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizableService, [{
    type: Injectable
  }], null, null);
})();
var NzResizableDirective = class _NzResizableDirective {
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  nzResizableService = inject(NzResizableService);
  platform = inject(Platform);
  ngZone = inject(NgZone);
  destroyRef = inject(DestroyRef);
  nzBounds = "parent";
  nzMaxHeight;
  nzMaxWidth;
  nzMinHeight = 40;
  nzMinWidth = 40;
  nzGridColumnCount = -1;
  nzMaxColumn = -1;
  nzMinColumn = -1;
  nzLockAspectRatio = false;
  nzPreview = false;
  nzDisabled = false;
  nzResize = new EventEmitter();
  nzResizeEnd = new EventEmitter();
  nzResizeStart = new EventEmitter();
  resizing = false;
  elRect;
  currentHandleEvent = null;
  ghostElement = null;
  el;
  sizeCache = null;
  constructor() {
    this.nzResizableService.handleMouseDownOutsideAngular$.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (this.nzDisabled) {
        return;
      }
      this.resizing = true;
      this.nzResizableService.startResizing(event.mouseEvent);
      this.currentHandleEvent = event;
      if (this.nzResizeStart.observers.length) {
        this.ngZone.run(() => this.nzResizeStart.emit({
          mouseEvent: event.mouseEvent,
          direction: event.direction
        }));
      }
      this.elRect = this.el.getBoundingClientRect();
    });
    this.nzResizableService.documentMouseUpOutsideAngular$.pipe(takeUntilDestroyed(), filter(Boolean)).subscribe((event) => {
      if (this.resizing) {
        this.resizing = false;
        this.nzResizableService.documentMouseUpOutsideAngular$.next(null);
        this.endResize(event);
      }
    });
    this.nzResizableService.documentMouseMoveOutsideAngular$.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (this.resizing) {
        this.resize(event);
      }
    });
  }
  setPosition() {
    const position = getComputedStyle(this.el).position;
    if (position === "static" || !position) {
      this.renderer.setStyle(this.el, "position", "relative");
    }
  }
  calcSize(width, height, ratio) {
    let newWidth;
    let newHeight;
    let maxWidth;
    let maxHeight;
    let col = 0;
    let spanWidth = 0;
    let minWidth = this.nzMinWidth;
    let boundWidth = Infinity;
    let boundHeight = Infinity;
    if (this.nzBounds === "parent") {
      const parent = this.renderer.parentNode(this.el);
      if (parent instanceof HTMLElement) {
        const parentRect = parent.getBoundingClientRect();
        boundWidth = parentRect.width;
        boundHeight = parentRect.height;
      }
    } else if (this.nzBounds === "window") {
      if (typeof window !== "undefined") {
        boundWidth = window.innerWidth;
        boundHeight = window.innerHeight;
      }
    } else if (this.nzBounds && this.nzBounds.nativeElement && this.nzBounds.nativeElement instanceof HTMLElement) {
      const boundsRect = this.nzBounds.nativeElement.getBoundingClientRect();
      boundWidth = boundsRect.width;
      boundHeight = boundsRect.height;
    }
    maxWidth = ensureInBounds(this.nzMaxWidth, boundWidth);
    maxHeight = ensureInBounds(this.nzMaxHeight, boundHeight);
    if (this.nzGridColumnCount !== -1) {
      spanWidth = maxWidth / this.nzGridColumnCount;
      minWidth = this.nzMinColumn !== -1 ? spanWidth * this.nzMinColumn : minWidth;
      maxWidth = this.nzMaxColumn !== -1 ? spanWidth * this.nzMaxColumn : maxWidth;
    }
    if (ratio !== -1) {
      if (/(left|right)/i.test(this.currentHandleEvent.direction)) {
        newWidth = Math.min(Math.max(width, minWidth), maxWidth);
        newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
        if (newHeight >= maxHeight || newHeight <= this.nzMinHeight) {
          newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
        }
      } else {
        newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
        newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
        if (newWidth >= maxWidth || newWidth <= minWidth) {
          newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
        }
      }
    } else {
      newWidth = Math.min(Math.max(width, minWidth), maxWidth);
      newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
    }
    if (this.nzGridColumnCount !== -1) {
      col = Math.round(newWidth / spanWidth);
      newWidth = col * spanWidth;
    }
    return {
      col,
      width: newWidth,
      height: newHeight
    };
  }
  resize(event) {
    const elRect = this.elRect;
    const resizeEvent = getEventWithPoint(event);
    const handleEvent = getEventWithPoint(this.currentHandleEvent.mouseEvent);
    let width = elRect.width;
    let height = elRect.height;
    const ratio = this.nzLockAspectRatio ? width / height : -1;
    switch (this.currentHandleEvent.direction) {
      case "bottomRight":
        width = resizeEvent.clientX - elRect.left;
        height = resizeEvent.clientY - elRect.top;
        break;
      case "bottomLeft":
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        height = resizeEvent.clientY - elRect.top;
        break;
      case "topRight":
        width = resizeEvent.clientX - elRect.left;
        height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
        break;
      case "topLeft":
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
        break;
      case "top":
        height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
        break;
      case "right":
        width = resizeEvent.clientX - elRect.left;
        break;
      case "bottom":
        height = resizeEvent.clientY - elRect.top;
        break;
      case "left":
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
    }
    const size = this.calcSize(width, height, ratio);
    this.sizeCache = __spreadValues({}, size);
    if (this.nzResize.observers.length) {
      this.ngZone.run(() => {
        this.nzResize.emit(__spreadProps(__spreadValues({}, size), {
          mouseEvent: event,
          direction: this.currentHandleEvent.direction
        }));
      });
    }
    if (this.nzPreview) {
      this.previewResize(size);
    }
  }
  endResize(event) {
    this.removeGhostElement();
    const size = this.sizeCache ? __spreadValues({}, this.sizeCache) : {
      width: this.elRect.width,
      height: this.elRect.height
    };
    if (this.nzResizeEnd.observers.length) {
      this.ngZone.run(() => {
        this.nzResizeEnd.emit(__spreadProps(__spreadValues({}, size), {
          mouseEvent: event,
          direction: this.currentHandleEvent.direction
        }));
      });
    }
    this.sizeCache = null;
    this.currentHandleEvent = null;
  }
  previewResize({
    width,
    height
  }) {
    this.createGhostElement();
    this.renderer.setStyle(this.ghostElement, "width", `${width}px`);
    this.renderer.setStyle(this.ghostElement, "height", `${height}px`);
  }
  createGhostElement() {
    if (!this.ghostElement) {
      this.ghostElement = this.renderer.createElement("div");
      this.renderer.setAttribute(this.ghostElement, "class", "nz-resizable-preview");
    }
    this.renderer.appendChild(this.el, this.ghostElement);
  }
  removeGhostElement() {
    if (this.ghostElement) {
      this.renderer.removeChild(this.el, this.ghostElement);
    }
  }
  ngAfterViewInit() {
    if (!this.platform.isBrowser) {
      return;
    }
    this.el = this.elementRef.nativeElement;
    this.setPosition();
    fromEventOutsideAngular(this.el, "mouseenter").pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.nzResizableService.mouseEnteredOutsideAngular$.next(true);
    });
    fromEventOutsideAngular(this.el, "mouseleave").pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.nzResizableService.mouseEnteredOutsideAngular$.next(false);
    });
  }
  ngOnDestroy() {
    this.ghostElement = null;
    this.sizeCache = null;
  }
  static ɵfac = function NzResizableDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzResizableDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NzResizableDirective,
    selectors: [["", "nz-resizable", ""]],
    hostAttrs: [1, "nz-resizable"],
    hostVars: 4,
    hostBindings: function NzResizableDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("nz-resizable-resizing", ctx.resizing)("nz-resizable-disabled", ctx.nzDisabled);
      }
    },
    inputs: {
      nzBounds: "nzBounds",
      nzMaxHeight: "nzMaxHeight",
      nzMaxWidth: "nzMaxWidth",
      nzMinHeight: [2, "nzMinHeight", "nzMinHeight", numberAttribute],
      nzMinWidth: [2, "nzMinWidth", "nzMinWidth", numberAttribute],
      nzGridColumnCount: [2, "nzGridColumnCount", "nzGridColumnCount", numberAttribute],
      nzMaxColumn: [2, "nzMaxColumn", "nzMaxColumn", numberAttribute],
      nzMinColumn: [2, "nzMinColumn", "nzMinColumn", numberAttribute],
      nzLockAspectRatio: [2, "nzLockAspectRatio", "nzLockAspectRatio", booleanAttribute],
      nzPreview: [2, "nzPreview", "nzPreview", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute]
    },
    outputs: {
      nzResize: "nzResize",
      nzResizeEnd: "nzResizeEnd",
      nzResizeStart: "nzResizeStart"
    },
    exportAs: ["nzResizable"],
    features: [ɵɵProvidersFeature([NzResizableService])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizableDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-resizable]",
      exportAs: "nzResizable",
      providers: [NzResizableService],
      host: {
        class: "nz-resizable",
        "[class.nz-resizable-resizing]": "resizing",
        "[class.nz-resizable-disabled]": "nzDisabled"
      }
    }]
  }], () => [], {
    nzBounds: [{
      type: Input
    }],
    nzMaxHeight: [{
      type: Input
    }],
    nzMaxWidth: [{
      type: Input
    }],
    nzMinHeight: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzMinWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzGridColumnCount: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzMaxColumn: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzMinColumn: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzLockAspectRatio: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPreview: [{
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
    nzResize: [{
      type: Output
    }],
    nzResizeEnd: [{
      type: Output
    }],
    nzResizeStart: [{
      type: Output
    }]
  });
})();
var NzResizeHandleMouseDownEvent = class {
  direction;
  mouseEvent;
  constructor(direction, mouseEvent) {
    this.direction = direction;
    this.mouseEvent = mouseEvent;
  }
};
var passiveEventListenerOptions = normalizePassiveListenerOptions({
  passive: true
});
var NzResizeHandleComponent = class _NzResizeHandleComponent {
  nzResizableService = inject(NzResizableService);
  renderer = inject(Renderer2);
  el = inject(ElementRef).nativeElement;
  destroyRef = inject(DestroyRef);
  nzDirection = "bottomRight";
  nzCursorType = "window";
  nzMouseDown = new EventEmitter();
  ngOnInit() {
    this.nzResizableService.mouseEnteredOutsideAngular$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((entered) => {
      if (entered) {
        this.renderer.addClass(this.el, "nz-resizable-handle-box-hover");
      } else {
        this.renderer.removeClass(this.el, "nz-resizable-handle-box-hover");
      }
    });
    merge(fromEventOutsideAngular(this.el, "mousedown", passiveEventListenerOptions), fromEventOutsideAngular(this.el, "touchstart", passiveEventListenerOptions)).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.nzResizableService.handleMouseDownOutsideAngular$.next(new NzResizeHandleMouseDownEvent(this.nzDirection, event));
    });
  }
  onPointerDown(event) {
    event.target.setPointerCapture(event.pointerId);
  }
  onPointerUp(event) {
    event.target.releasePointerCapture(event.pointerId);
  }
  static ɵfac = function NzResizeHandleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzResizeHandleComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzResizeHandleComponent,
    selectors: [["nz-resize-handle"], ["", "nz-resize-handle", ""]],
    hostAttrs: [1, "nz-resizable-handle"],
    hostVars: 20,
    hostBindings: function NzResizeHandleComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("pointerdown", function NzResizeHandleComponent_pointerdown_HostBindingHandler($event) {
          return ctx.onPointerDown($event);
        })("pointerup", function NzResizeHandleComponent_pointerup_HostBindingHandler($event) {
          return ctx.onPointerUp($event);
        });
      }
      if (rf & 2) {
        ɵɵclassProp("nz-resizable-handle-top", ctx.nzDirection === "top")("nz-resizable-handle-right", ctx.nzDirection === "right")("nz-resizable-handle-bottom", ctx.nzDirection === "bottom")("nz-resizable-handle-left", ctx.nzDirection === "left")("nz-resizable-handle-topRight", ctx.nzDirection === "topRight")("nz-resizable-handle-bottomRight", ctx.nzDirection === "bottomRight")("nz-resizable-handle-bottomLeft", ctx.nzDirection === "bottomLeft")("nz-resizable-handle-topLeft", ctx.nzDirection === "topLeft")("nz-resizable-handle-cursor-type-grid", ctx.nzCursorType === "grid")("nz-resizable-handle-cursor-type-window", ctx.nzCursorType === "window");
      }
    },
    inputs: {
      nzDirection: "nzDirection",
      nzCursorType: "nzCursorType"
    },
    outputs: {
      nzMouseDown: "nzMouseDown"
    },
    exportAs: ["nzResizeHandle"],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function NzResizeHandleComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizeHandleComponent, [{
    type: Component,
    args: [{
      selector: "nz-resize-handle, [nz-resize-handle]",
      exportAs: "nzResizeHandle",
      template: `<ng-content></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        class: "nz-resizable-handle",
        "[class.nz-resizable-handle-top]": `nzDirection === 'top'`,
        "[class.nz-resizable-handle-right]": `nzDirection === 'right'`,
        "[class.nz-resizable-handle-bottom]": `nzDirection === 'bottom'`,
        "[class.nz-resizable-handle-left]": `nzDirection === 'left'`,
        "[class.nz-resizable-handle-topRight]": `nzDirection === 'topRight'`,
        "[class.nz-resizable-handle-bottomRight]": `nzDirection === 'bottomRight'`,
        "[class.nz-resizable-handle-bottomLeft]": `nzDirection === 'bottomLeft'`,
        "[class.nz-resizable-handle-topLeft]": `nzDirection === 'topLeft'`,
        "[class.nz-resizable-handle-cursor-type-grid]": `nzCursorType === 'grid'`,
        "[class.nz-resizable-handle-cursor-type-window]": `nzCursorType === 'window'`,
        "(pointerdown)": "onPointerDown($event)",
        "(pointerup)": "onPointerUp($event)"
      }
    }]
  }], null, {
    nzDirection: [{
      type: Input
    }],
    nzCursorType: [{
      type: Input
    }],
    nzMouseDown: [{
      type: Output
    }]
  });
})();
var DEFAULT_RESIZE_DIRECTION = ["bottomRight", "topRight", "bottomLeft", "topLeft", "bottom", "right", "top", "left"];
function normalizeResizeHandleOptions(value) {
  return value.map((val) => {
    if (typeof val === "string") {
      return {
        direction: val,
        cursorType: "window"
      };
    }
    return val;
  });
}
var NzResizeHandlesComponent = class _NzResizeHandlesComponent {
  nzDirections = DEFAULT_RESIZE_DIRECTION;
  resizeHandleOptions = normalizeResizeHandleOptions(this.nzDirections);
  ngOnChanges(changes) {
    const {
      nzDirections
    } = changes;
    if (nzDirections) {
      this.resizeHandleOptions = normalizeResizeHandleOptions(nzDirections.currentValue);
    }
  }
  static ɵfac = function NzResizeHandlesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzResizeHandlesComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NzResizeHandlesComponent,
    selectors: [["nz-resize-handles"]],
    inputs: {
      nzDirections: "nzDirections"
    },
    exportAs: ["nzResizeHandles"],
    features: [ɵɵNgOnChangesFeature],
    decls: 2,
    vars: 0,
    consts: [[3, "nzDirection", "nzCursorType"]],
    template: function NzResizeHandlesComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵrepeaterCreate(0, NzResizeHandlesComponent_For_1_Template, 1, 2, "nz-resize-handle", 0, ɵɵrepeaterTrackByIdentity);
      }
      if (rf & 2) {
        ɵɵrepeater(ctx.resizeHandleOptions);
      }
    },
    dependencies: [NzResizeHandleComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizeHandlesComponent, [{
    type: Component,
    args: [{
      selector: "nz-resize-handles",
      exportAs: "nzResizeHandles",
      template: `
    @for (option of resizeHandleOptions; track option) {
      <nz-resize-handle [nzDirection]="option.direction" [nzCursorType]="option.cursorType" />
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NzResizeHandleComponent]
    }]
  }], null, {
    nzDirections: [{
      type: Input
    }]
  });
})();
var NzResizableModule = class _NzResizableModule {
  static ɵfac = function NzResizableModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzResizableModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NzResizableModule,
    imports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent],
    exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizableModule, [{
    type: NgModule,
    args: [{
      imports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent],
      exports: [NzResizableDirective, NzResizeHandleComponent, NzResizeHandlesComponent]
    }]
  }], null, null);
})();

export {
  getEventWithPoint,
  NzResizableDirective,
  NzResizeHandleComponent,
  NzResizableModule
};
//# sourceMappingURL=chunk-7ITXCWRV.js.map
