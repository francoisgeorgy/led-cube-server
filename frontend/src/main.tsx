import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App.tsx";

// import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div>
        {/*<ThemeProvider>*/}
        <App />
        {/*</ThemeProvider>*/}
        </div>
)
    // <React.StrictMode>
    // </React.StrictMode>,
