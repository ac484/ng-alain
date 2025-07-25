/**
 * NG-ALAIN Mock POI 資料服務
 *
 * 此檔案提供：
 * - 興趣點 (POI) 的 Mock 資料
 * - 商家和地點的 Mock API
 * - 地理位置相關的測試資料
 * - 用於地圖和位置服務的資料
 *
 * 用於開發環境的 POI 資料模擬
 * 基於 @delon/mock 框架
 */

export const POIS = {
  '/pois': {
    total: 2,
    list: [
      {
        id: 10000,
        user_id: 1,
        name: '测试品牌',
        branch_name: '测试分店',
        geo: 310105,
        country: '中国',
        province: '上海',
        city: '上海市',
        district: '长宁区',
        address: '中山公园',
        tel: '15900000000',
        categories: '美食,粤菜,湛江菜',
        lng: 121.41707989151003,
        lat: 31.218656214644792,
        recommend: '推荐品',
        special: '特色服务',
        introduction: '商户简介',
        open_time: '营业时间',
        avg_price: 260,
        reason: null,
        status: 1,
        status_str: '待审核',
        status_wx: 1,
        modified: 1505826527288,
        created: 1505826527288
      },
      {
        id: 10001,
        user_id: 2,
        name: '测试品牌2',
        branch_name: '测试分店2',
        geo: 310105,
        country: '中国',
        province: '上海',
        city: '上海市',
        district: '长宁区',
        address: '中山公园',
        tel: '15900000000',
        categories: '美食,粤菜,湛江菜',
        lng: 121.41707989151003,
        lat: 31.218656214644792,
        recommend: '推荐品',
        special: '特色服务',
        introduction: '商户简介',
        open_time: '营业时间',
        avg_price: 260,
        reason: null,
        status: 1,
        status_str: '待审核',
        status_wx: 1,
        modified: 1505826527288,
        created: 1505826527288
      }
    ]
  }
};
