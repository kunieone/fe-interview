import { createPinia } from "pinia";
const pinia = createPinia();
const userStore = defineStore("user");
export { userStore };
