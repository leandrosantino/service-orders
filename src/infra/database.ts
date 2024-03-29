import { DataSource } from "typeorm"
import { User } from "../domain/User/User"
import { Worker } from "../domain/Worker/Worker"
import { Machine } from "../domain/Machine/Machine"
import { ServiceOrder } from "../domain/ServiceOrder/ServiceOrder"
import { PreventiveAction } from "@/domain/PreventiveAction/PreventiveAction"
import { Zone } from "@/domain/Zone/Zone"
import { Technology } from "@/domain/Technology/Technology"

export const database = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Worker, Machine, ServiceOrder, PreventiveAction, Zone, Technology],
    migrations: [],
    subscribers: [],
})
