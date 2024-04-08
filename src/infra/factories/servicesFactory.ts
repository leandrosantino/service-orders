import { AuthService } from "@/services/AuthService";
import { ServiceOrderService } from "@/services/ServiceOrderService";
import { UserService } from "@/services/UserService";

export function servicesFactory(){
  return {
    userService: new UserService(),
    authService: new AuthService(),
    ServiceOrderService: new ServiceOrderService()
  }
}
