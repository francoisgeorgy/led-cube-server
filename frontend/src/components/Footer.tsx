import {observer} from "mobx-react-lite";
import {state} from "../State.ts";

export const Footer = observer(() => {

    return (
        <div>Actif: {state.running}</div>
    )
});
