import {ApplicationHeader} from "../components/ApplicationHeader.tsx";
import {SnowClient} from "../apps/snow/SnowClient.tsx";
import {APP_SNOW_CUBE} from "../utils/applications.ts";

export function Snow() {
    return (
        <div className="p-4">
            <ApplicationHeader application={APP_SNOW_CUBE} />
            <SnowClient/>
        </div>
    );
}
