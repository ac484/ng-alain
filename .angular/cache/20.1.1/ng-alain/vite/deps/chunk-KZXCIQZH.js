import {
  Platform
} from "./chunk-GIT7CFOZ.js";
import {
  Injectable,
  setClassMetadata
} from "./chunk-NQBXVTYU.js";
import {
  DOCUMENT,
  inject,
  ɵɵdefineInjectable
} from "./chunk-QZDSTGXI.js";
import {
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/@delon/util/fesm2022/browser.mjs
var CookieService = class _CookieService {
  _doc = inject(DOCUMENT);
  platform = inject(Platform);
  get doc() {
    return this._doc || document;
  }
  /**
   * Original cookie value
   *
   * 原始Cookie值
   */
  get cookie() {
    return this.platform.isBrowser ? this.doc.cookie : "";
  }
  /**
   * Get all cookie key-value pairs
   *
   * 获取所有Cookie键值对
   */
  getAll() {
    const ret = {};
    const arr = this.cookie.split("; ");
    for (let i = 0; i < arr.length; i++) {
      const cookie = arr[i];
      const index = cookie.indexOf("=");
      if (index > 0) {
        const name = decodeURIComponent(cookie.substring(0, index));
        if (ret[name] == null) {
          ret[name] = decodeURIComponent(cookie.substring(index + 1));
        }
      }
    }
    return ret;
  }
  /**
   * Get the value of given cookie `key`
   *
   * 获取指定 `key` 的值
   */
  get(key) {
    return this.getAll()[key];
  }
  /**
   * Sets a value for given cookie key
   *
   * 设置指定 Cookie 键的值
   */
  put(key, value, options) {
    if (!this.platform.isBrowser) {
      return;
    }
    const opt = __spreadValues({
      path: "/"
    }, options);
    if (typeof opt.expires === "number") {
      opt.expires = new Date(+/* @__PURE__ */ new Date() + opt.expires * 1e3);
    }
    if (typeof opt.expires !== "string") {
      opt.expires = opt.expires ? opt.expires.toUTCString() : "";
    }
    const optStr = opt;
    const attributes = Object.keys(optStr).filter((k) => optStr[k] && optStr[k] !== true).map((k) => `${k}=${optStr[k].split(";")[0]}`).join(";");
    const keyValue = `${encodeURIComponent(String(key))}=${encodeURIComponent(String(value))}`;
    this.doc.cookie = `${keyValue}${attributes ? `; ${attributes}` : ""}`;
  }
  /**
   * Remove given cookie
   *
   * 移除指定 Cookie
   */
  remove(key, options) {
    this.put(key, "", options);
  }
  /**
   * Remove all cookies
   *
   * 移除所有 Cookies
   */
  removeAll() {
    this.doc.cookie = "";
  }
  static ɵfac = function CookieService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CookieService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _CookieService,
    factory: _CookieService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CookieService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function copy(value) {
  return new Promise((resolve) => {
    let copyTextArea = null;
    try {
      copyTextArea = document.createElement("textarea");
      copyTextArea.style.height = "0px";
      copyTextArea.style.opacity = "0";
      copyTextArea.style.width = "0px";
      document.body.appendChild(copyTextArea);
      copyTextArea.value = value;
      copyTextArea.select();
      document.execCommand("copy");
      resolve(value);
    } finally {
      if (copyTextArea && copyTextArea.parentNode) {
        copyTextArea.parentNode.removeChild(copyTextArea);
      }
    }
  });
}
function isEmpty(element) {
  const nodes = element.childNodes;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes.item(i);
    if (node.nodeType === 1 && node.outerHTML.toString().trim().length !== 0) {
      return false;
    } else if (node.nodeType === 3 && node.textContent.toString().trim().length !== 0) {
      return false;
    }
  }
  return true;
}
var ScrollService = class _ScrollService {
  _doc = inject(DOCUMENT);
  platform = inject(Platform);
  _getDoc() {
    return this._doc || document;
  }
  _getWin() {
    const doc = this._getDoc();
    return doc.defaultView || window;
  }
  /**
   * 获取滚动条位置
   *
   * @param element 指定元素，默认 `window`
   */
  getScrollPosition(element) {
    if (!this.platform.isBrowser) {
      return [0, 0];
    }
    const win = this._getWin();
    if (element && element !== win) {
      return [element.scrollLeft, element.scrollTop];
    } else {
      return [win.scrollX, win.scrollY];
    }
  }
  /**
   * 设置滚动条位置
   *
   * @param element 指定元素
   */
  scrollToPosition(element, position) {
    if (!this.platform.isBrowser) {
      return;
    }
    (element || this._getWin()).scrollTo(position[0], position[1]);
  }
  /**
   * 设置滚动条至指定元素
   *
   * @param element 指定元素，默认 `document.body`
   * @param topOffset 偏移值，默认 `0`
   */
  scrollToElement(element, topOffset = 0) {
    if (!this.platform.isBrowser) {
      return;
    }
    if (!element) {
      element = this._getDoc().body;
    }
    element.scrollIntoView();
    const win = this._getWin();
    if (win && win.scrollBy) {
      win.scrollBy(0, element.getBoundingClientRect().top - topOffset);
      if (win.scrollY < 20) {
        win.scrollBy(0, -win.scrollY);
      }
    }
  }
  /**
   * 滚动至顶部
   *
   * @param topOffset 偏移值，默认 `0`
   */
  scrollToTop(topOffset = 0) {
    if (!this.platform.isBrowser) {
      return;
    }
    this.scrollToElement(this._getDoc().body, topOffset);
  }
  static ɵfac = function ScrollService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ScrollService,
    factory: _ScrollService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function removeClass(el, classMap, renderer) {
  Object.keys(classMap).forEach((key) => renderer.removeClass(el, key));
}
function addClass(el, classMap, renderer) {
  for (const i in classMap) {
    if (classMap[i]) {
      renderer.addClass(el, i);
    }
  }
}
function updateHostClass(el, renderer, classMap, preClean = false) {
  if (preClean === true) {
    renderer.removeAttribute(el, "class");
  } else {
    removeClass(el, classMap, renderer);
  }
  classMap = __spreadValues({}, classMap);
  addClass(el, classMap, renderer);
}

export {
  CookieService,
  copy,
  isEmpty,
  ScrollService,
  updateHostClass
};
//# sourceMappingURL=chunk-KZXCIQZH.js.map
