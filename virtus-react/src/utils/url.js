export const getAssetUrl = (url) => {
    if (!url) return '';
    // If the URL is already absolute (starts with http), return it as is
    if (url.startsWith('http')) {
        return url;
    }
    // Otherwise, prepend the API URL from environment variables
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    // Ensure there's only one slash between baseUrl and url
    return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
};
