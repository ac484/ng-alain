// 日期工具函數
export function formatDate(date: Date | any): string {
    if (!date) return '';

    try {
        // 處理 Firestore Timestamp
        if (date.toDate) {
            return date.toDate().toLocaleDateString('zh-TW');
        }
        // 處理一般 Date
        if (date instanceof Date) {
            return date.toLocaleDateString('zh-TW');
        }
        // 處理時間戳
        if (typeof date === 'number') {
            return new Date(date).toLocaleDateString('zh-TW');
        }
        return '';
    } catch (error) {
        console.error('Date formatting error:', error);
        return '';
    }
}