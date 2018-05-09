import AuthService, { AuthToken } from "@/AuthService";
import ApiService from "@/ApiService";
import { AxiosResponse } from "axios";

export interface IUser {
  id: number;
  name: string;
  email: string;
  api_token: string;
  created_at: string;
  updated_at: string;
}

type UserListener = (user: IUser) => void;

class UserService {
  private listeners: UserListener[] = [];
  private currentUser: IUser = null;

  public init() {
    AuthService.addAuthListener(this.requestUserData.bind(this));
  }

  public getCurrentUser(): IUser {
    return this.currentUser;
  }

  public addUserListener(listener: UserListener) {
    this.listeners.push(listener);
  }

  private async requestUserData(token: AuthToken) {
    if (!token) {
      return;
    }

    const res: AxiosResponse = await ApiService.get('user');
    const user: IUser = res.data;

    this.currentUser = user;

    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }
}

export default new UserService();