import {APP_RUBIK} from "../utils/applications.ts";
import {ApplicationHeader} from "../components/ApplicationHeader.tsx";
import {RubikClient} from "../apps/rubik/RubikClient.tsx";


export function Rubik() {
    return (
        <div className="p-4">
            <ApplicationHeader application={APP_RUBIK} />
            <RubikClient/>
        </div>
    );
}
