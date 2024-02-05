import { defineStore } from "pinia";
import type { UserState } from "../interface/user";
import piniaPersistConfig from "@/store/helper/persist";
export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    userInfo: {
      userName: ""
    }
  }),
  persist: piniaPersistConfig("user")
});
