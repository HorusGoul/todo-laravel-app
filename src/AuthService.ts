import { AxiosResponse } from 'axios';
import ApiService from './ApiService';

const STORAGE_KEY = 'todo-laravel::token';

type AuthTokenListener = (token?: string | null) => void;

export type AuthToken = string | null;

export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  name: string;
}

/**
 * Class that has all the methods and functions
 * needed to handle the authorization with the
 * servers.
 *
 * @class AuthService
 */
class AuthService {
  private listeners: AuthTokenListener[] = [];
  private currentToken: AuthToken = null;

  public async init() {
    const token: AuthToken = localStorage.getItem(STORAGE_KEY);

    ApiService.http.interceptors.response.use(null, this.onApiResponseError.bind(this));

    this.setToken(token);
  }

  /**
   * Function that logs in a user.
   *
   * @param data User credentials
   */
  public async login(data: ILoginData) {
    const res: AxiosResponse = await ApiService.post(`login`, data);

    this.setToken(res.data.api_token);
  }

  /**
   * Function that signs up a user.
   *
   * @param data New user's data
   */
  public async signup(data: ISignUpData) {
    const res: AxiosResponse = await ApiService.post('signup', data);

    this.setToken(res.data.api_token);
  }

  /**
   * Logs out a user.
   */
  public logout() {
    this.removeToken();
  }

  public addAuthListener(listener: AuthTokenListener) {
    this.listeners.push(listener);
  }

  private setToken(token: AuthToken) {
    this.currentToken = token;

    localStorage.setItem(STORAGE_KEY, token as string);
    ApiService.setAuthToken(token);
    this.notifyListeners();
  }

  private removeToken() {
    this.currentToken = null;
    ApiService.removeAuthToken();
    this.notifyListeners();
    localStorage.removeItem(STORAGE_KEY);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentToken));
  }

  private onApiResponseError(error: any) {
    if (error.response.status === 401) {
      this.removeToken();
    }
  }
}

export default new AuthService();
