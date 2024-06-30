import { ipcRenderer } from "electron"

export const invokeMethods = {
    async auth({password, register}: import("D:/dev/service_orders/src/domain/entities/User/dto/IUserAuthDTO").IUserAuthRequestDTO): Promise<Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<import("D:/dev/service_orders/src/domain/entities/User/dto/IUserDTO").IUserResponseDTO>>> {
       return await ipcRenderer.invoke('auth', [{password, register}]);
   },
    async generate(loginPass: string): Promise<string> {
       return await ipcRenderer.invoke('generate', [loginPass]);
   },
    async verify(loginPass: string, registeredHash: string): Promise<boolean> {
       return await ipcRenderer.invoke('verify', [loginPass, registeredHash]);
   },
    async getPlannedServiceOrders(filters: import("D:/dev/service_orders/src/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters): Promise<Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<import("D:/dev/service_orders/src/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder").PreventiveServiceOrder[]>>> {
       return await ipcRenderer.invoke('getPlannedServiceOrders', [filters]);
   },
    async getPrintedServiceOrders(filters: import("D:/dev/service_orders/src/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters): Promise<Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<import("D:/dev/service_orders/src/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder").PrintedPreventiveServiceOrder[]>>> {
       return await ipcRenderer.invoke('getPrintedServiceOrders', [filters]);
   },
    async printServiceOrder(plannedServiceOrderId: number): Promise<Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<void>>> {
       return await ipcRenderer.invoke('printServiceOrder', [plannedServiceOrderId]);
   },
    async executeServiceOrders(printedServiceOrderId: number, data: import("D:/dev/service_orders/src/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").ExecuteServiceOrdersRequestDTO): Promise<Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<void>>> {
       return await ipcRenderer.invoke('executeServiceOrders', [printedServiceOrderId, data]);
   },
    async createServiceOrder({data, machineId}: import("D:/dev/service_orders/src/domain/entities/ServiceOrder/dto/IServiceOrderDTO").ICreateServiceOrderRequestDTO): Promise<Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<import("D:/dev/service_orders/src/domain/interfaces/Properties").Properties<import("D:/dev/service_orders/src/domain/entities/ServiceOrder/ServiceOrder").ServiceOrder>>>> {
       return await ipcRenderer.invoke('createServiceOrder', [{data, machineId}]);
   },
    async savePreventiveServiceOrder(data: import("D:/dev/service_orders/src/domain/entities/ServiceOrder/dto/IServiceOrderDTO").ISavePreventiveServiceOrderRequestDTO): Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<import("D:/dev/service_orders/src/domain/interfaces/Properties").Properties<import("D:/dev/service_orders/src/domain/entities/ServiceOrder/ServiceOrder").ServiceOrder>>> {
       return await ipcRenderer.invoke('savePreventiveServiceOrder', [data]);
   },
    async closeServiceOrder(data: import("D:/dev/service_orders/src/domain/entities/ServiceOrder/dto/IServiceOrderDTO").ICloseServiceOrderDTO): Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<import("D:/dev/service_orders/src/domain/interfaces/Properties").Properties<import("D:/dev/service_orders/src/domain/entities/ServiceOrder/ServiceOrder").ServiceOrder>>> {
       return await ipcRenderer.invoke('closeServiceOrder', [data]);
   },
    async closePreventiveServiceOrder(data: import("D:/dev/service_orders/src/domain/entities/ServiceOrder/dto/IServiceOrderDTO").ICreateServiceOrderRequestDTO): Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<import("D:/dev/service_orders/src/domain/interfaces/Properties").Properties<import("D:/dev/service_orders/src/domain/entities/ServiceOrder/ServiceOrder").ServiceOrder>>> {
       return await ipcRenderer.invoke('closePreventiveServiceOrder', [data]);
   },
    async listPreventiveServiceOrders(): Promise<import("D:/dev/service_orders/src/domain/interfaces/IResponseEntity").IResponseEntity<import("D:/dev/service_orders/src/domain/interfaces/Properties").Properties<import("D:/dev/service_orders/src/domain/entities/ServiceOrder/ServiceOrder").ServiceOrder>[]>> {
       return await ipcRenderer.invoke('listPreventiveServiceOrders', []);
   },
    async getAllUsers(): Promise<Promise<import("D:/dev/service_orders/src/domain/entities/User/dto/IUserDTO").IUserResponseDTO[]>> {
       return await ipcRenderer.invoke('getAllUsers', []);
   },
    async getUserById(id: number): Promise<Promise<import("D:/dev/service_orders/src/domain/entities/User/dto/IUserDTO").IUserResponseDTO>> {
       return await ipcRenderer.invoke('getUserById', [id]);
   },
    async create(user: import("D:/dev/service_orders/src/domain/entities/User/User").User): Promise<Promise<import("D:/dev/service_orders/src/domain/entities/User/User").User>> {
       return await ipcRenderer.invoke('create', [user]);
   },
    async createWorker(worker: import("D:/dev/service_orders/src/domain/entities/Worker/Worker").Worker): Promise<Promise<void>> {
       return await ipcRenderer.invoke('createWorker', [worker]);
   },

}
