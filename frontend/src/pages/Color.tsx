import {ColorClient} from "../apps/color/ColorClient.tsx";
import {ApplicationHeader} from "../components/ApplicationHeader.tsx";
import {APP_COLORS} from "../utils/applications.ts";

export function Color() {
    return (
        <div className="p-4">
            <ApplicationHeader application={APP_COLORS} />
            <ColorClient/>
        </div>
    );
}
