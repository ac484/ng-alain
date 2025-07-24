import {
  addDays,
  addSeconds,
  differenceInCalendarDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  formatDistanceToNow,
  parse,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears
} from "./chunk-BHH4M3PU.js";
import {
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/@delon/util/fesm2022/date-time.mjs
function getTimeDistance(type, time, options) {
  time = time ? typeof time === "string" ? parse(time, "yyyy-MM-dd HH:mm:ss", /* @__PURE__ */ new Date()) : new Date(time) : /* @__PURE__ */ new Date();
  const opt = { weekStartsOn: 1 };
  let res;
  switch (type) {
    case "today":
      res = [time, time];
      break;
    case "-today":
      res = [addDays(time, -1), time];
      break;
    case "yesterday":
      res = [addDays(time, -1), addDays(time, -1)];
      break;
    case "week":
      res = [startOfWeek(time, opt), endOfWeek(time, opt)];
      break;
    case "-week":
      res = [startOfWeek(subWeeks(time, 1), opt), endOfWeek(subWeeks(time, 1), opt)];
      break;
    case "month":
      res = [startOfMonth(time), endOfMonth(time)];
      break;
    case "-month":
      res = [startOfMonth(subMonths(time, 1)), endOfMonth(subMonths(time, 1))];
      break;
    case "year":
      res = [startOfYear(time), endOfYear(time)];
      break;
    case "-year":
      res = [startOfYear(subYears(time, 1)), endOfYear(subYears(time, 1))];
      break;
    default:
      res = type > 0 ? [time, addDays(time, type)] : [addDays(time, type), time];
      break;
  }
  return options?.ignoreMaxTime ? res : fixEndTimeOfRange(res);
}
function fixEndTimeOfRange(dates) {
  return [startOfDay(dates[0]), endOfDay(dates[1])];
}
function toDate(value, options) {
  const { formatString, defaultValue, timestampSecond } = __spreadValues({
    formatString: "yyyy-MM-dd HH:mm:ss",
    defaultValue: /* @__PURE__ */ new Date(NaN),
    timestampSecond: false
  }, typeof options === "string" ? { formatString: options } : options);
  if (value == null) {
    return defaultValue;
  }
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === "number" || typeof value === "string" && /^[0-9]+$/.test(value)) {
    const valueNumber = +value;
    return new Date(timestampSecond ? valueNumber * 1e3 : valueNumber);
  }
  let tryDate = parseISO(value);
  if (isNaN(tryDate)) {
    tryDate = parse(value, formatString, /* @__PURE__ */ new Date());
  }
  return isNaN(tryDate) ? defaultValue : tryDate;
}
function formatDate(value, formatString, options) {
  value = toDate(value);
  if (isNaN(value))
    return "";
  const langOpt = { locale: options?.locale };
  return formatString === "fn" ? formatDistanceToNow(value, langOpt) : (options?.customFormat ?? format)(value, formatString, langOpt);
}
var DateTimePickerUtil = class {
  /**
   * Current local time
   *
   * 当前本地时间
   */
  get now() {
    return /* @__PURE__ */ new Date();
  }
  /**
   * Current local date (not including time part)
   *
   * 当前本地日期（不包含时间部分）
   */
  get date() {
    return this.removeTime(this.now);
  }
  /**
   * Remove the time part of the date
   *
   * 移除日期的时间部分
   */
  removeTime(d) {
    return new Date(d.toDateString());
  }
  /**
   * Format date-time
   *
   * 格式化日期
   */
  format(d, formatString = "yyyy-MM-dd HH:mm:ss") {
    return format(d, formatString);
  }
  genTick(count) {
    return new Array(count).fill(0).map((_, idx) => idx);
  }
  /**
   * Calculate the number of days between two dates, `0` means the same day
   *
   * 计算两个日期相差天数，`0` 表示同一天
   */
  getDiffDays(dateLeft, dateRight) {
    return differenceInCalendarDays(dateLeft, typeof dateRight === "number" ? addDays(this.date, dateRight) : dateRight || this.date);
  }
  /**
   * Disabled Before date (Default: today), Generally serves `nzDisabledDate`
   *
   * 禁用之前日期（默认：今天），一般服务于 `nzDisabledDate`
   */
  disabledBeforeDate(options) {
    return (d) => this.getDiffDays(d, options?.offsetDays) < 0;
  }
  /**
   * Disabled After date (Default: today), Generally serves `nzDisabledDate`
   *
   * 禁用之后日期（默认：今天），一般服务于 `nzDisabledDate`
   */
  disabledAfterDate(options) {
    return (d) => this.getDiffDays(d, options?.offsetDays) > 0;
  }
  baseDisabledTime(type, offsetSeconds) {
    const tick24 = this.genTick(24);
    const tick60 = this.genTick(60);
    return (current) => {
      const cur = current;
      if (cur == null) {
        return {};
      }
      const now = addSeconds(this.now, offsetSeconds || 0);
      const nowHours = now.getHours();
      const nowMinutes = now.getMinutes();
      const curHours = cur.getHours();
      const isToday = this.getDiffDays(this.removeTime(cur)) === 0;
      return {
        nzDisabledHours: () => {
          if (!isToday)
            return [];
          return type === "before" ? tick24.slice(0, nowHours) : tick24.slice(nowHours + 1);
        },
        nzDisabledMinutes: () => {
          if (isToday && curHours === nowHours) {
            return type === "before" ? tick60.slice(0, nowMinutes) : tick60.slice(nowMinutes + 1);
          }
          return [];
        },
        nzDisabledSeconds: () => {
          if (isToday && curHours === nowHours && cur.getMinutes() === nowMinutes) {
            const nowSeconds = now.getSeconds();
            return type === "before" ? tick60.slice(0, nowSeconds) : tick60.slice(nowSeconds + 1);
          }
          return [];
        }
      };
    };
  }
  /**
   * Disabled Before time (Default: now), Generally serves `nzDisabledTime`
   *
   * 禁用之前时间（默认：现在），一般服务于 `nzDisabledTime`
   */
  disabledBeforeTime(options) {
    return this.baseDisabledTime("before", options?.offsetSeconds);
  }
  /**
   * Disabled After time (Default: now), Generally serves `nzDisabledTime`
   *
   * 禁用之后时间（默认：现在），一般服务于 `nzDisabledTime`
   */
  disabledAfterTime(options) {
    return this.baseDisabledTime("after", options?.offsetSeconds);
  }
};
var dateTimePickerUtil = new DateTimePickerUtil();

export {
  getTimeDistance,
  fixEndTimeOfRange,
  toDate,
  formatDate,
  DateTimePickerUtil,
  dateTimePickerUtil
};
//# sourceMappingURL=chunk-SQJ77OAJ.js.map
