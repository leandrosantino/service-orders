import { z } from "zod";
import { FileStorageProvider } from "./src/infra/FileStorageProvider";
import path from 'path'
import { DateTime } from "./src/utils/DateToos";

// const FILE_NAME_PATTERN = /^OS_\d+_\d+_\d+_(OPEN|CLOSE)_\d+_\d+\.json$/

// const fileStorage = new FileStorageProvider(path.join(__dirname, './data'))

// const os = fileStorage.listFiles()
//   .filter( file => FILE_NAME_PATTERN.test(file))
//   .map(file => {
//     const [
//       id, createdAt, updatedAt, status, machineId, responsibleId
//     ] = file
//       .replace(/^OS_|\.json$/g, '')
//       .split('_')

//     const date1 = new DateTime().fromDateNumber(Number(createdAt))
//     const date2 = new DateTime().fromDateNumber(Number(updatedAt))

//     return {
//       id: Number(id),
//       createdAt: date1,
//       updatedAt: date2,
//       status,
//       machineId: Number(machineId),
//       responsibleId: Number(responsibleId)}
//   })

//   const fileNameDataSchema = z.object({
//     id: z.number(),
//     createdAt: z.date(),
//     updatedAt: z.date(),
//     status: z.enum(['OPEN', 'CLOSE']),
//     machineId: z.number(),
//     responsibleId: z.number()
//   })

//   z.array(fileNameDataSchema).parse(os)

//   console.log(os)

// fileStorage.listeningDir()
// const d = 1000 * 60 * 60 * 24

// const i = new Date(2300, 3, 2).valueOf()
// const f = new Date(i + d).valueOf()
// console.log(new Date(i).toLocaleDateString(), ' - ',new Date(f).toLocaleDateString())
// console.log(i / 100000, ' - ', f / 100000)
// console.log(i, ' - ', f)
// console.log(i - f)

// const date = new DateTime(2024, 3, 2)
// const f = new DateTime(2024, 3, 2).plusDay(1)

const teste = new DateTime(2024, 3, 2, 12, 30, 10, 659).toDateNumber()
const t2 = new DateTime().fromDateNumber(teste).getWeekOfYearString()
const t3 = new DateTime().fromDateNumber(teste).plusYear(1).getWeekOfYearString()
console.log(t3, t2)
//1712071810_1712158210
