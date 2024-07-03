import { useQuery, useMutation } from "@tanstack/react-query"

export const api = {
    authService:{
        auth: {
            query: (params: import("@/domain/entities/User/dto/IUserAuthDTO").IUserAuthRequestDTO) => {
                return useQuery({
                    queryKey: ['auth', { params }] as const,
                    queryFn: ({queryKey}):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/User/dto/IUserDTO").IUserResponseDTO>> => {
                        const [_, { params }] = queryKey
                        return window.app.ipc('auth', params)
                    }
                })
            },
            invoke: async (params: import("@/domain/entities/User/dto/IUserAuthDTO").IUserAuthRequestDTO):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/User/dto/IUserDTO").IUserResponseDTO>> => await window.app.ipc('auth', params)
        },
                
    },
    preventiveServiceOrderService:{
        getPlannedServiceOrders: {
            query: (filters: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters) => {
                return useQuery({
                    queryKey: ['getPlannedServiceOrders', { filters }] as const,
                    queryFn: ({queryKey}):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder").PreventiveServiceOrder[]>> => {
                        const [_, { filters }] = queryKey
                        return window.app.ipc('getPlannedServiceOrders', filters)
                    }
                })
            },
            invoke: async (filters: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder").PreventiveServiceOrder[]>> => await window.app.ipc('getPlannedServiceOrders', filters)
        },
                
        getPrintedServiceOrders: {
            query: (filters: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters) => {
                return useQuery({
                    queryKey: ['getPrintedServiceOrders', { filters }] as const,
                    queryFn: ({queryKey}):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder").PrintedPreventiveServiceOrder[]>> => {
                        const [_, { filters }] = queryKey
                        return window.app.ipc('getPrintedServiceOrders', filters)
                    }
                })
            },
            invoke: async (filters: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder").PrintedPreventiveServiceOrder[]>> => await window.app.ipc('getPrintedServiceOrders', filters)
        },
                
        printServiceOrder: {
            mutation: () => {
                return useMutation({
                    mutationFn: ( args:{plannedServiceOrderId: number }):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<void>> => {
                        return window.app.ipc('printServiceOrder', ...Object.values(args))
                    }
                })
            },
            invoke: async (plannedServiceOrderId: number):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<void>> => await window.app.ipc('printServiceOrder', plannedServiceOrderId)
        },
                
        executeServiceOrders: {
            mutation: () => {
                return useMutation({
                    mutationFn: ( args:{printedServiceOrderId: number, data: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").ExecuteServiceOrdersRequestDTO }):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<void>> => {
                        return window.app.ipc('executeServiceOrders', ...Object.values(args))
                    }
                })
            },
            invoke: async (printedServiceOrderId: number, data: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").ExecuteServiceOrdersRequestDTO):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<void>> => await window.app.ipc('executeServiceOrders', printedServiceOrderId, data)
        },
                
    },
    serviceOrderService:{
        createServiceOrder: {
            mutation: () => {
                return useMutation({
                    mutationFn: ( args:{params: import("@/domain/entities/ServiceOrder/dto/IServiceOrderDTO").ICreateServiceOrderRequestDTO }):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/interfaces/Properties").Properties<import("@/domain/entities/ServiceOrder/ServiceOrder").ServiceOrder>>> => {
                        return window.app.ipc('createServiceOrder', ...Object.values(args))
                    }
                })
            },
            invoke: async (params: import("@/domain/entities/ServiceOrder/dto/IServiceOrderDTO").ICreateServiceOrderRequestDTO):Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/interfaces/Properties").Properties<import("@/domain/entities/ServiceOrder/ServiceOrder").ServiceOrder>>> => await window.app.ipc('createServiceOrder', params)
        },
                
    },
    userService:{
        getAllUsers: {
            query: () => {
                return useQuery({
                    queryKey: ['getAllUsers', {  }] as const,
                    queryFn: ({queryKey}):Promise<import("@/domain/entities/User/dto/IUserDTO").IUserResponseDTO[]> => {
                        const [_, {  }] = queryKey
                        return window.app.ipc('getAllUsers', )
                    }
                })
            },
            invoke: async ():Promise<import("@/domain/entities/User/dto/IUserDTO").IUserResponseDTO[]> => await window.app.ipc('getAllUsers', )
        },
                
        getUserById: {
            query: (id: number) => {
                return useQuery({
                    queryKey: ['getUserById', { id }] as const,
                    queryFn: ({queryKey}):Promise<import("@/domain/entities/User/dto/IUserDTO").IUserResponseDTO> => {
                        const [_, { id }] = queryKey
                        return window.app.ipc('getUserById', id)
                    }
                })
            },
            invoke: async (id: number):Promise<import("@/domain/entities/User/dto/IUserDTO").IUserResponseDTO> => await window.app.ipc('getUserById', id)
        },
                
        create: {
            mutation: () => {
                return useMutation({
                    mutationFn: ( args:{user: import("@/domain/entities/User/User").User }):Promise<import("@/domain/entities/User/User").User> => {
                        return window.app.ipc('create', ...Object.values(args))
                    }
                })
            },
            invoke: async (user: import("@/domain/entities/User/User").User):Promise<import("@/domain/entities/User/User").User> => await window.app.ipc('create', user)
        },
                
    },

}