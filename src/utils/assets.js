export const getAssetPath = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path; // Skip external links

    // Check if we are in production and have a base URL
    const baseUrl = import.meta.env.BASE_URL;

    // Remove leading slash to avoid double slashes if baseUrl ends with slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    return `${cleanBaseUrl}${cleanPath}`;
};
