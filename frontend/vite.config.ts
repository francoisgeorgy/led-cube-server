import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()]
})
// export default defineConfig({
//     base: '/',
//     server: {
//     host: '192.168.1.73',
//     port: 5173
//   },
//     plugins: [react()],
// })
