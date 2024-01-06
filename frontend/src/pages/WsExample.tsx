import WsExampleClient from "../apps/rubik/WsExampleClient.tsx";
import {ApplicationHeader} from "../components/ApplicationHeader.tsx";
import {APP_COLORS} from "../utils/applications.ts";

export function WsExample() {
    return (
        <div className="p-4">
            <ApplicationHeader application={APP_COLORS} />
            <WsExampleClient/>
        </div>
    );
}
