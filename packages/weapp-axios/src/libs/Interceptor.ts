import { CbFunc } from '../types';

export class Interceptor {
  use = (resolve: CbFunc, reject: CbFunc) => {
    if (typeof resolve === 'function') this.success = resolve;
    if (typeof reject === 'function') this.error = reject;
  };

  success: Function = (config: object) => {
    return config;
  };

  error: Function = (error: Error) => {
    return error;
  };
}
