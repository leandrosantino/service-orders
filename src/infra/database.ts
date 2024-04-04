import { DataSource } from "typeorm"
import { User } from "@/domain/entities/User/User"
import { Worker } from "@/domain/entities/Worker/Worker"
import { Machine } from "@/domain/entities/Machine/Machine"
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder"
import { PreventiveAction } from "@/domain/entities/PreventiveAction/PreventiveAction"
import { Zone } from "@/domain/entities/Zone/Zone"
import { Technology } from "@/domain/entities/Technology/Technology"

export const database = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Worker, Machine, ServiceOrder, PreventiveAction, Zone, Technology],
    migrations: [],
    subscribers: [],
})
