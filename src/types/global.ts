export type ResponseData = Record<
  string,
  number | string | boolean | null | undefined
>;

export type DataItem = {
  [key: string]: string | number | boolean | null | undefined;
};

export interface DecodedToken {
  exp: number;
  // Add any other claims you expect in your token
  userId: string;
}

export interface ErrorResponse {
  message: string[] | string;
  errorCode?: string;
}

export interface HTMLConversionResult {
  __html: string;
}

export interface MenuItem {
  key?: string;
  title: string;
  link: string;
  icon?: React.ReactNode;
  type?: "item" | "group";
  children?: MenuItem[];
}

export type DirtyFields = Record<string, boolean>;

export interface ParsedFile {
  fileName: string;
  fileType: string;
  fileUrl: string;
}

export type SidebarLinks = Array<{
  label: string;
  path: string;
}>;

export type SubmitValues = {
  [x: string]: string | number | boolean | null | undefined;
};

export interface TableSort {
  sortBy: string | null;
  sort: Sort;
}

export interface SelectInterface {
  value: string | number;
  label: string;
}

export interface ValuesMap {
  [key: string | number]: string;
}

export type SelectOptions = SelectInterface[];

export type Sort = "asc" | "desc" | null;
