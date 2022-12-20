import { Package } from "./package.model"
export interface Operation {
  id: number
  name: string
  value: number
  billType: 10 | 50 | 100
  status: "concluded" | "closed" | "reserved"
  parentOperationId?: number
  createdAt: Date
  updatedAt: Date
  userId: number

  /** Children operations ID */
  children: number[]
  packages: Package[]
}
