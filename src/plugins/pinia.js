import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 存 localStorage
pinia.use(piniaPluginPersistedstate)

export default pinia
