type EndpointPath = string;
type EndpointFunction = (...args: string[]) => string;
type EndpointDefinition = EndpointPath | EndpointFunction;

// Definimos la interfaz para ENDPOINTS
interface Endpoints {
  [key: string]: EndpointDefinition;
}

type Root = {
  main: "/";
  journey: "/12-meses-viajando";
  tales: "/relatos";
};

export const ROOT: Root = {
  main: "/",
  journey: "/12-meses-viajando",
  tales: "/relatos",
};

export const ENDPOINTS = {
  ARTICLES: `${ROOT.journey}/article`,
  ARTICLE: (slug: string) => `${ROOT.journey}/article/${slug}`,
  TALES: `${ROOT.tales}`,
  TALE: (slug: string) => `${ROOT.tales}/${slug}`,
};

export const ENDPOINTS_BASE: Endpoints = {
  ARTICLES: `/${ROOT.journey}/article`,
  ARTICLE: (slug: string) => `/${ROOT.journey}/article/${slug}`,
  TALES: `/${ROOT.tales}`,
  TALE: (slug: string) => `/${ROOT.tales}/${slug}`,
};

export class Endpoint {
  constructor(private readonly path: string) {
    if (!path || typeof path !== "string") {
      throw new Error("Path must be a non-empty string");
    }
  }

  // Obtener la ruta base
  getPath(): string {
    return this.path;
  }

  // Agregar parámetros de consulta (query params)
  withQueryParams(params: Record<string, string>): string {
    const query = new URLSearchParams(params).toString();
    return `${this.path}${query ? `?${query}` : ""}`;
  }

  // Método genérico para redirigir a cualquier endpoint
  static to(endpointKey: keyof typeof ENDPOINTS_BASE, ...args: string[]): Endpoint {
    const endpoint = ENDPOINTS_BASE[endpointKey];
    if (typeof endpoint === "string") {
      return new Endpoint(endpoint);
    }
    if (typeof endpoint === "function") {
      // Validar parámetros dinámicos
      args.forEach((arg, index) => {
        if (!arg || typeof arg !== "string") {
          throw new Error(`Parameter at position ${index} must be a non-empty string`);
        }
      });
      return new Endpoint(endpoint(...args));
    }
    throw new Error(`Invalid endpoint: ${endpointKey}`);
  }

  // Método para construir la raíz
  static root(): Endpoint {
    return new Endpoint(`/${ROOT}`);
  }
}
