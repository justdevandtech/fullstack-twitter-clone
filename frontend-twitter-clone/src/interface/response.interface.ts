export interface ResponseProps<T> {
  success: boolean;
  data?: T;
  error?: Error;
}
