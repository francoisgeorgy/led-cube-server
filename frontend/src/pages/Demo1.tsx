import {ApplicationHeader} from "../components/ApplicationHeader.tsx";
import {Demo1Client} from "../apps/Demo1Client.tsx";
import {APP_DEMO1} from "../utils/applications.ts";

export function Demo1() {
    return (
        <div className="p-4">
            <ApplicationHeader application={APP_DEMO1} />
            <Demo1Client/>
        </div>
    );
}
