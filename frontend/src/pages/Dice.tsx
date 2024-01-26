import {ApplicationHeader} from "../components/ApplicationHeader.tsx";
import {APP_DICE} from "../utils/applications.ts";
import {DiceClient} from "../apps/DiceClient.tsx";

export function Dice() {
    return (
        <div className="p-4">
            <ApplicationHeader application={APP_DICE} />
            <DiceClient/>
        </div>
    );
}
