import { AxiosResponse } from 'axios';
import ApiService from './ApiService';

const STORAGE_KEY = 'todo-laravel::token';

type AuthTokenListener = (token?: string | null) => void;

export interface ILoginData {
  username: string;
  password: string;
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
  private currentToken: string | null = null;

  /**
   * Function that logs in a user.
   *
   * @param data User credentials
   */
  public async login(data: ILoginData) {
    try {
      const res: AxiosResponse = await ApiService.post(`auth/login`, data);

      this.setToken(res.data.token);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Logs out a user.
   */
  public logout() {
    this.removeToken();
  }

  private setToken(token: string) {
    this.currentToken = token;

    localStorage.setItem(STORAGE_KEY, token);
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
}

export default new AuthService();
