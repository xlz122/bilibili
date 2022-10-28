import type { ChangeEvent } from 'react';

export type ResponseType<T = any> = {
  code?: number | string;
  data?: T;
  list?: unknown[];
  msg?: string;
};

export type InputChange = ChangeEvent<HTMLInputElement>;
