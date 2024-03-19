import { DataSource } from "typeorm"
import { User } from "../domain/User/User"
import { Worker } from "../domain/Worker/Worker"
import { Machine } from "../domain/Machine/Machine"
import { ServiceOrder } from "../domain/ServiceOrder/ServiceOrder"

export const database = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Worker, Machine, ServiceOrder],
    migrations: [],
    subscribers: [],
})
