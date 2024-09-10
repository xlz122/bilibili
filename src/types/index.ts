export type ResponseType<T = any> = {
  code?: number;
  data: T;
  msg?: string;
};

export type InputChange = React.ChangeEvent<HTMLInputElement>;
export type InputEnter = React.KeyboardEvent<HTMLInputElement> & InputChange;
