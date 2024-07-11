import { AuthService } from "@/services/AuthService";
import { PreventiveServiceOrderService } from "@/services/PreventiveServiceOrderService";
import { ServiceOrderService } from "@/services/ServiceOrderService";
import { UserService } from "@/services/UserService";

export function servicesFactory(){

  return {
    userService: new UserService(),
    authService: new AuthService(),
    serviceOrderService: new ServiceOrderService(),
    preventiveServiceOrderService: new PreventiveServiceOrderService()
  }
}
