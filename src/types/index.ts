export type ResponseType<T = any> = {
  code?: number | string;
  data?: T;
  msg?: string;
};
