import { Core } from "../Core";
import { Events } from "./Events";

// Content //

export namespace Settings {
    export let CasinoSettings: { MainInterface: { X: number, Y: number } };


    Events.General("ADDON_LOADED", (addonName: string) => {
        if (addonName == "DuckCasino") {
            InitSettings();
        }
    });


    function InitSettings(): void {
        if (_G.DuckCasinoSettings) {
            CasinoSettings = _G.DuckCasinoSettings;
        }
    }
}