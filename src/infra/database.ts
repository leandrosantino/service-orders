import { DataSource } from "typeorm"
import { User } from "@/domain/entities/User/User"
import { Worker } from "@/domain/entities/Worker/Worker"
import { Machine } from "@/domain/entities/Machine/Machine"
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder"
import { PreventiveAction } from "@/domain/entities/PreventiveAction/PreventiveAction"
import { Cause } from "@/domain/entities/Cause/Cause"
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder"
import { PendingPreventiveServiceOrder } from "@/domain/entities/PendingPreventiveServiceOrder/PendingPreventiveServiceOrder"

export const database = new DataSource({
    type: "sqlite",
    database: "database/database.sqlite",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Worker,
        Machine,
        ServiceOrder,
        PreventiveAction,
        PendingPreventiveServiceOrder,
        PreventiveServiceOrder,
        Cause
    ],
    migrations: [],
    subscribers: [],
})
