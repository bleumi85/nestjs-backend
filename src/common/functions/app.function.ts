export const isYear = (value: string): boolean => {
    return /^20[2-9][0-9]$/.test(value);
}

export const isUuidV4 = (value: string): boolean => {
    return /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value);
}