import {ApplicationHeader} from "../components/ApplicationHeader.tsx";
import {ImuClient} from "../apps/imu/ImuClient.tsx";
import {APP_IMU} from "../utils/applications.ts";

export function IMU() {
    return (
        <div className="p-4">
            <ApplicationHeader application={APP_IMU} />
            <ImuClient/>
        </div>
    );
}
