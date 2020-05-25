import { Core } from "../Core";
import { Events } from "./Events";

// Content //

export namespace Settings {
    export let CasinoSettings: { MainInterface: { X: number, Y: number } };
    const SettingsFrame = CreateFrame("Frame");
    C_Timer.After(2, () => {
        print("init");
        InitSettings();
    });


    function InitSettings(): void {
        if (DuckCasinoSettings) {
            CasinoSettings = DuckCasinoSettings;
        }
    }
}
