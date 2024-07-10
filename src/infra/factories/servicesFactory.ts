import { AuthService } from "@/services/AuthService";
import { ModalService } from "@/services/ModalService";
import { PreventiveServiceOrderService } from "@/services/PreventiveServiceOrderService";
import { PrintService } from "@/services/PrintService";
import { ServiceOrderService } from "@/services/ServiceOrderService";
import { UserService } from "@/services/UserService";
import { BrowserWindow } from "electron";

export function servicesFactory(mainWindow: BrowserWindow){

  const modalService = new ModalService(mainWindow)

  return {
    userService: new UserService(),
    authService: new AuthService(),
    serviceOrderService: new ServiceOrderService(),
    preventiveServiceOrderService: new PreventiveServiceOrderService(modalService),
    printService: new PrintService(),
    modalService
  }
}
