export type ContentId = string;

export type Item = {
    contentid: ContentId;
    fullname: string;
    summary: string;
    imageurl: string;
    contenttype: string;
    badgecolor:string;
    duration?: string;
}