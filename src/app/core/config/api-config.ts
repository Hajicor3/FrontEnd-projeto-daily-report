declare global {
  interface Window {
    __env?: {
      apiUrl?: string;
    };
  }
}

/**
 * URL base da API. Em produção, é preenchida em tempo de execução pelo
 * docker-entrypoint.sh (via env.js), a partir da variável de ambiente API_URL.
 * Em desenvolvimento local (ng serve), cai no fallback do localhost.
 */
export const API_BASE_URL: string = window.__env?.apiUrl || 'http://localhost:8080';
