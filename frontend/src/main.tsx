import App from "./App.tsx";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'

// Note: strict mode is removed to avoid some issue with websockets (double connection in dev mode).

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
