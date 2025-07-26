// 驗證工具函數
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\-\+\(\)\s]+$/;
    return phoneRegex.test(phone);
}

export function isEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
}

export function isPositiveNumber(value: number): boolean {
    return typeof value === 'number' && value > 0;
}