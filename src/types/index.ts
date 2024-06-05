export type ResponseType<T = any> = {
  code?: number | string;
  data?: T;
  list?: never[];
  msg?: string;
};

export type InputChange = React.ChangeEvent<HTMLInputElement>;
export type InputEnter = React.KeyboardEvent<HTMLInputElement> & InputChange;
