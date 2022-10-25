import type { ChangeEvent } from 'react';

export type ResponseType<T = any> = {
  code?: number | string;
  data?: T;
  msg?: string;
};

export type InputChange = ChangeEvent<HTMLInputElement>;
