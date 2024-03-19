import { database } from "@/infra/database";
import { User } from "./User";


export const userRepository = database.getRepository(User)
