import httpStatus from "http-status";


export type ApiResponse<T> = {
  status: 'success' | 'fail' | 'error',
  data: T,
  message?: string,
  code?: string | number,
};

export function sendJson(body: {
  status: 'success' | 'fail' | 'error',
  message?: string,
  code?: string | number,
  data?: Record<string, any>,
}, status: number = httpStatus.OK) {

  return {
    statusCode: status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}
