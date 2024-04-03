import { database } from "@/infra/database";
import { ServiceOrder } from "./ServiceOrder";


export const serviceOrderRepository = database.getRepository(ServiceOrder)
