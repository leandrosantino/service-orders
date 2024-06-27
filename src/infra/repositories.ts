import { database } from "./database";
import { Machine } from "@/domain/entities/Machine/Machine";
import { Worker } from "@/domain/entities/Worker/Worker";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { PreventiveAction } from "@/domain/entities/PreventiveAction/PreventiveAction";
import { PrintedPreventiveServiceOrder } from "@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder";
import { Cause } from "@/domain/entities/Cause/Cause";
import { User } from "@/domain/entities/User/User";


export const userRepository = database.getRepository(User)
export const workerRepository = database.getRepository(Worker)
export const machineRepository = database.getRepository(Machine)
export const serviceOrderRepository = database.getRepository(ServiceOrder)
export const preventiveActionRepository = database.getRepository(PreventiveAction)
export const printedPreventiveServiceOrderRepository = database.getRepository(PrintedPreventiveServiceOrder)
export const preventiveServiceOrderRepository = database.getRepository(PreventiveServiceOrder)
export const causeRepository = database.getRepository(Cause)

