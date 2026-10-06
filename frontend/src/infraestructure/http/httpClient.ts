import { getCookie } from "../cookies/CookieService";
import { CookieEnum } from "../enums/cookieEnum";

interface HttpClientOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, any>;
  bearerToken?: string;
  skipBlockUI?: boolean;
  GlobalLoader?: boolean;
  contentType?: string | null;
  responseType?: "json" | "blob" | "text";
}

import { getAuthToken } from "../../presentation/providers/AuthTokenProvider";
import { logoutAndRedirect } from "../cookies/CookieService";

export default class HttpClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  }

  private async getHeaders(options?: HttpClientOptions): Promise<Headers> {
    const headers = new Headers(options?.headers);

    // Determinar Content-Type
    if (options?.contentType !== null && !headers.has("Content-Type")) {
      headers.set("Content-Type", options?.contentType || "application/json");
    }

    // Remover Content-Type si explícitamente es null (ej: para FormData nativo)
    if (options?.contentType === null) {
      headers.delete("Content-Type");
    }

    // Autenticación automática optimizada
    let token = options?.bearerToken || getAuthToken();

    // Fallback para Server Components / SSR
    if (!token && typeof window === "undefined") {
      token = await getCookie<string>(CookieEnum.Token);
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const qs = searchParams.toString();
      if (qs) {
        url += `?${qs}`;
      }
    }
    return url;
  }

  private async execute<T>(
    endpoint: string,
    config: RequestInit,
    options?: HttpClientOptions,
  ): Promise<T> {
    const url = this.buildUrl(endpoint, options?.params);
    const headers = await this.getHeaders(options);

    try {
      const response = await fetch(url, { ...config, headers });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.error("[HttpClient] Error de Autorización (401/403). Redirigiendo a acceso-denegado...");
          if (typeof window !== "undefined") {
            try {
              await logoutAndRedirect();
            } catch (e) {
              console.error("Error al redirigir:", e);
            }
            return new Promise(() => {}) as unknown as T;
          }
        }

        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      if (options?.responseType === "blob") {
        return (await response.blob()) as unknown as T;
      }

      const text = await response.text();
      if (!text) return {} as T;

      try {
        const json = JSON.parse(text);

        if (
          json &&
          typeof json === "object" &&
          "statusCode" in json &&
          "data" in json
        ) {
          if ("meta" in json) {
             return { data: json.data, meta: json.meta } as T;
          }
          return json.data as T;
        }

        return json as T;
      } catch {
        throw new Error("Respuesta no es un JSON válido");
      }
    } catch (error) {
      console.error("[HttpClient] Request failed:", error);
      throw error;
    }
  }

  public async get<T>(url: string, options?: HttpClientOptions): Promise<T> {
    return this.execute<T>(url, { method: "GET" }, options);
  }

  public async post<T>(
    url: string,
    data?: any,
    options?: HttpClientOptions,
  ): Promise<T> {
    const isFormData = data instanceof FormData;
    const configOptions = { ...options };

    if (isFormData) {
      configOptions.contentType = null;
    }

    return this.execute<T>(
      url,
      {
        method: "POST",
        body: isFormData ? data : JSON.stringify(data),
      },
      configOptions,
    );
  }

  public async put<T>(
    url: string,
    data?: any,
    options?: HttpClientOptions,
  ): Promise<T> {
    const isFormData = data instanceof FormData;
    const configOptions = { ...options };

    if (isFormData) {
      configOptions.contentType = null;
    }

    return this.execute<T>(
      url,
      {
        method: "PUT",
        body: isFormData ? data : JSON.stringify(data),
      },
      configOptions,
    );
  }

  public async patch<T>(
    url: string,
    data?: any,
    options?: HttpClientOptions,
  ): Promise<T> {
    const isFormData = data instanceof FormData;
    const configOptions = { ...options };

    if (isFormData) {
      configOptions.contentType = null;
    }

    return this.execute<T>(
      url,
      {
        method: "PATCH",
        body: isFormData ? data : JSON.stringify(data),
      },
      configOptions,
    );
  }

  public async delete<T>(url: string, options?: HttpClientOptions): Promise<T> {
    return this.execute<T>(url, { method: "DELETE" }, options);
  }
}
