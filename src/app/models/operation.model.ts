import { Package } from "./package.model"
export interface Operation {
  id: number
  name: string
  value: number
  billType: 10 | 50 | 100
  status: "concluded" | "closed" | "reserved"
  parentOperationId?: number
  subId?: number
  createdAt: Date
  updatedAt: Date
  userId: number

  children: Operation[] | Partial<Operation>[]
  packages: Package[]
}
