import { ResultEnum } from '@/enums/httpEnum'

export interface ApiResponse<T = any> {
  code: ResultEnum
  data: T
  msg: string
}
