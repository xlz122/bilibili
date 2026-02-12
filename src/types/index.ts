export type ResponseType<T = any> = {
  code?: number;
  data: T;
  message?: string;
};

export type InputChange = React.ChangeEvent<HTMLInputElement>;
export type InputEnter = React.KeyboardEvent<HTMLInputElement> & InputChange;
