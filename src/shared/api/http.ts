// http.ts

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpRequestConfig<T = any> {
  baseURL?: string;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: T;
  responseType?: 'json' | 'text' | 'blob';
  transformResponse?: (data: any) => any;
  signal?: AbortSignal;
}

export interface HttpError {
  message: string;
  status?: number;
  statusText?: string;
  data?: any;
}

const DEFAULT_BASE_URL = 'http://localhost:3000';

function buildQuery(params?: Record<string, string | number | boolean>): string {
  if (!params) return '';
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

async function request<T = any, D = any>(
  method: HttpMethod,
  url: string,
  config: HttpRequestConfig<D> = {}
): Promise<T> {
  const {
    baseURL = DEFAULT_BASE_URL,
    headers = {},
    params,
    data,
    responseType = 'json',
    transformResponse,
    signal
  } = config;

  const query = buildQuery(params);
  const fullUrl = `${url}${query ? `?${query}` : ''}`;

  const fetchConfig: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    signal
  };

  if (data && method !== 'GET') {
    fetchConfig.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, fetchConfig);

  const contentType = response.headers.get('content-type') || '';
  let parsedData: any;

  if (responseType === 'blob') {
    parsedData = await response.blob();
  } else if (contentType.includes('application/json')) {
    parsedData = await response.json();
  } else {
    parsedData = await response.text();
  }

  if (!response.ok) {
    const error: HttpError = {
      message: 'Request failed',
      status: response.status,
      statusText: response.statusText,
      data: parsedData
    };
    throw error;
  }

  return transformResponse ? transformResponse(parsedData) : parsedData;
}

export const http = {
  get: <T = any>(url: string, config?: HttpRequestConfig): Promise<T> => request<T>('GET', url, config),

  post: <T = any, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
    request<T, D>('POST', url, { ...config, data }),

  put: <T = any, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
    request<T, D>('PUT', url, { ...config, data }),

  patch: <T = any, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
    request<T, D>('PATCH', url, { ...config, data }),

  delete: <T = any>(url: string, config?: HttpRequestConfig): Promise<T> => request<T>('DELETE', url, config)
};
