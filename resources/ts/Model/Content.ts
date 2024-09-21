export type Item = {
    contentid: string;
    fullname: string;
    summary: string;
    imageurl: string;
    contenttype: string;
}

export const getContentTypeBgColor = (type: string): string => {
    switch(type) {
        case 'Course': return '#ffccbc';
        case 'Live Learning': return '#bbdefb';
        case 'Program': return '#c8e6c9';
        default: return 'grey';
    }
}