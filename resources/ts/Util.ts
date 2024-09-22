/**
 * Check if given string contains HTML tag elements
 * 
 * @param text input text 
 * @returns true if it contains, else false
 */
export const isHTML = (text: string) => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
};

/**
 * Check if given string contains image tag elements
 * 
 * @param text input text
 * @returns true if it contains, else false
 */
export const hasImage = (text: string): boolean => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.querySelectorAll('img').length > 0;
};

/**
 * Fallback image 
 * 
 * @returns url containing the fallback image
 */
export const getFallbackImageUrl = (): string => {
    return '/images/acorn-logo.png';
}