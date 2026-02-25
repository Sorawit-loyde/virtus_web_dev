/**
 * Resolves an asset URL to a full absolute URL.
 * Works for both old absolute URLs (http://...) and new relative paths (/uploads/...)
 */
export const getAssetUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
};
