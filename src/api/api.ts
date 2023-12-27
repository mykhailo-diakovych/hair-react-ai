import { AxiosRequestConfig } from "axios";
import {
  AxiosBaseApiInstance,
  AxiosPrivateApiInstance,
  AxiosPublicApiInstance
} from "@config/axios";

interface AxiosRequestBaseConfig<T> extends AxiosRequestConfig<T> {
  isPublic?: boolean;
  withoutPublicOrPrivate?: boolean;
}

const DEFAULT_API_CONFIG = {
  withoutPublicOrPrivate: false,
  isPublic: false
};

export class Api {
  private readonly serviceName: string | null | undefined = null;

  protected constructor(serviceName?: string | null | undefined) {
    this.serviceName = serviceName;
  }

  private getUrl(endpoint: string) {
    if (this.serviceName) {
      return `/${this.serviceName}/${endpoint}`;
    }

    return `/${endpoint}`;
  }

  private getApiInstance<T>(config: AxiosRequestBaseConfig<T>) {
    const AxiosApiInstance = config.isPublic
      ? AxiosPublicApiInstance
      : AxiosPrivateApiInstance;

    return config.withoutPublicOrPrivate
      ? AxiosBaseApiInstance
      : AxiosApiInstance;
  }

  protected get<T, K = any>(
    endpoint: string,
    config: AxiosRequestBaseConfig<T> = DEFAULT_API_CONFIG
  ) {
    const apiConfig = { ...DEFAULT_API_CONFIG, ...config };
    const AxiosApiInstance = this.getApiInstance(config);

    return AxiosApiInstance.get<K>(this.getUrl(endpoint), apiConfig);
  }

  protected async post<T, K>(
    endpoint: string,
    data?: T,
    config: AxiosRequestBaseConfig<T> = DEFAULT_API_CONFIG
  ) {
    const apiConfig = { ...DEFAULT_API_CONFIG, ...config };
    const AxiosApiInstance = this.getApiInstance(config);

    return AxiosApiInstance.post<K>(this.getUrl(endpoint), data, apiConfig);
  }

  protected put<T, K>(
    endpoint: string,
    data?: T,
    config: AxiosRequestBaseConfig<T> = DEFAULT_API_CONFIG
  ) {
    const apiConfig = { ...DEFAULT_API_CONFIG, ...config };
    const AxiosApiInstance = this.getApiInstance(config);

    return AxiosApiInstance.put<K>(this.getUrl(endpoint), data, apiConfig);
  }

  protected patch<T, K>(
    endpoint: string,
    data?: T,
    config: AxiosRequestBaseConfig<T> = DEFAULT_API_CONFIG
  ) {
    const apiConfig = { ...DEFAULT_API_CONFIG, ...config };
    const AxiosApiInstance = this.getApiInstance(apiConfig);

    return AxiosApiInstance.patch<K>(this.getUrl(endpoint), data, apiConfig);
  }

  protected delete<T, K>(
    endpoint: string,
    config: AxiosRequestBaseConfig<T> = DEFAULT_API_CONFIG
  ) {
    const apiConfig = { ...DEFAULT_API_CONFIG, ...config };
    const AxiosApiInstance = this.getApiInstance(config);

    return AxiosApiInstance.delete<K>(this.getUrl(endpoint), apiConfig);
  }
}
