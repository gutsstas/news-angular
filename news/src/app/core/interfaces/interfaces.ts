export interface INews {
  id?: number;
  title: string;
  description: string;
  publishedDate: string;
  url: string;
  fullUrl?: string;
  titleImageUrl: string;
  categoryType?: string;
  text?: string;
}

export interface IResponse {
  news: INews[];
}
