interface Item {
    fullname: string;
    summary: string;
    imageurl: string;
}

interface ContentData {
    items: Item[];
    next_page_url: string;
    page: string;
}

export interface Content {
    data: ContentData;
    status: string;
}
