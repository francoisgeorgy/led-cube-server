import WsRubikClient from "../apps/rubik/WsRubikClient.tsx";
import {ApplicationHeader} from "../components/ApplicationHeader.tsx";
import {APP_RUBIK} from "../utils/applications.ts";


export function Rubik() {
    return (
        <div className="p-4">
            <ApplicationHeader application={APP_RUBIK} />
            <WsRubikClient/>
        </div>
    );
}
