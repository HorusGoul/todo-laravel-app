import { AuthToken } from "@/AuthService";
import * as axios from "axios";

/**
 * Class that has all the methods and functions
 * that allow the app to connect with the Rest API.
 *
 * @class ApiService
 */
class ApiService {
  private http: axios.AxiosInstance;
  private apiUrl: string;

  constructor() {
    this.apiUrl = "http://homestead.test/api/";

    // Create a http client using axios.
    this.http = axios.default.create({
      baseURL: this.apiUrl
    });
  }

  /**
   * Sets the Authorization header from all the future
   * http requests handled with the ApiService's http client.
   *
   * @param {string} authToken
   * @memberof ApiService
   */
  public setAuthToken(authToken: AuthToken) {
    if (authToken) {
      this.http.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    } else {
      this.removeAuthToken();
    }
  }

  /**
   * Removes the Authorization header from all the future
   * http requests handled with the ApiService's http client.
   *
   * @memberof ApiService
   */
  public removeAuthToken() {
    this.http.defaults.headers.common.Authorization = undefined;
  }

  /**
   * Executes a get request.
   *
   * @param {string} route
   * @param {axios.AxiosRequestConfig} [options]
   * @returns {Promise<any>}
   * @memberof ApiService
   */
  public get(
    route: string,
    options?: axios.AxiosRequestConfig
  ): Promise<any> {
    return this.http.get(route, options);
  }

  /**
   * Executes a post request.
   *
   * @param {string} route
   * @param {object} data
   * @param {axios.AxiosRequestConfig} [options]
   * @returns {Promise<any>}
   * @memberof ApiService
   */
  public post(
    route: string,
    data: object,
    options?: axios.AxiosRequestConfig
  ): Promise<any> {
    return this.http.post(route, data, options);
  }

  /**
   * Executes a put request.
   *
   * @param {string} route
   * @param {object} [data]
   * @param {axios.AxiosRequestConfig} [options]
   * @returns {Promise<any>}
   * @memberof ApiService
   */
  public put(
    route: string,
    data?: object,
    options?: axios.AxiosRequestConfig
  ): Promise<any> {
    return this.http.put(route, data, options);
  }

  /**
   * Executes a delete request.
   *
   * @param {string} route
   * @param {axios.AxiosRequestConfig} [options]
   * @returns {Promise<any>}
   * @memberof ApiService
   */
  public delete(
    route: string,
    options?: axios.AxiosRequestConfig
  ): Promise<any> {
    return this.http.delete(route, options);
  }
}

export default new ApiService();
