import { ipcRenderer } from "electron" 
export const invokeMethods = {
  authService:{
    auth: async ({password, register}: import("@/domain/entities/User/dto/IUserAuthDTO").IUserAuthRequestDTO):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/User/dto/IUserDTO").IUserResponseDTO>> =>await ipcRenderer.invoke('auth', [{password, register}]),
  },
  preventiveServiceOrderService:{
    getPlannedServiceOrders: async (filters: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder").PreventiveServiceOrder[]>> =>await ipcRenderer.invoke('getPlannedServiceOrders', [filters]),
    getPrintedServiceOrders: async (filters: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder").PrintedPreventiveServiceOrder[]>> =>await ipcRenderer.invoke('getPrintedServiceOrders', [filters]),
    printServiceOrder: async (plannedServiceOrderId: number):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<void>> =>await ipcRenderer.invoke('printServiceOrder', [plannedServiceOrderId]),
  },
  serviceOrderService:{
    createServiceOrder: async ({data, machineId}: import("@/domain/entities/ServiceOrder/dto/IServiceOrderDTO").ICreateServiceOrderRequestDTO):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/interfaces/Properties").Properties<import("@/domain/entities/ServiceOrder/ServiceOrder").ServiceOrder>>> =>await ipcRenderer.invoke('createServiceOrder', [{data, machineId}]),
  },
  userService:{
    getAllUsers: async ():Promise<import("@/domain/entities/User/dto/IUserDTO").IUserResponseDTO[]> =>await ipcRenderer.invoke('getAllUsers', []),
    getUserById: async (id: number):Promise<import("@/domain/entities/User/dto/IUserDTO").IUserResponseDTO> =>await ipcRenderer.invoke('getUserById', [id]),
    create: async (user: import("@/domain/entities/User/User").User):Promise<import("@/domain/entities/User/User").User> =>await ipcRenderer.invoke('create', [user]),
  },

}