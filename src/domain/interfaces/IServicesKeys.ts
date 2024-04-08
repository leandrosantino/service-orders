import { IServiceOrderService } from "../entities/ServiceOrder/IServiceOrderService";
import { IUserAuthService } from "../entities/User/IUserAuthService";
import { IUserService } from "../entities/User/IUserService";

export type IServiceKeys =
  keyof IUserService |
  keyof IUserAuthService |
  keyof IServiceOrderService
