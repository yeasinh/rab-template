export interface MenuRequest {
  page: number;
  limit: number;
}

export interface IMenu {
  id: number;
  labelBn: string;
  labelEn: string;
  link: string;
  parent: number;
  sort: number;
  class: string;
  menu: number;
  depth: number;
}

export interface MenuResponse {
  menuItems: IMenu[];
}
