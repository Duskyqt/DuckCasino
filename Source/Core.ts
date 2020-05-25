import { Game } from "./Models/Game";
import { Chat } from "./Processes/Chat";
import { Events } from "./Processes/Events";

// Content //
export namespace Core {
    export let ActiveGame: Game | undefined;
    if (DuckCasinoSettings) {
        DuckCasinoSettings = { MainInterface: { X: 0, Y: 0 } };
    }
    const Channel = "SAY";
    const MainFrame = CreateFrame("Frame");
    const Throttle = 1;
    let NextCheck = 0;
    MainFrame.SetScript("OnUpdate", () => {
        if (ActiveGame != undefined && ActiveGame.Active) {
            if (NextCheck < GetTime()) {
                print(ActiveGame.Duration, GetTime())
                print("Time Left: ", ActiveGame.Duration - GetTime());
                NextCheck = GetTime() + Throttle;
            }
            if (!ActiveGame.LastCalled && ActiveGame.LastCallTime < GetTime()) {
                ActiveGame.LastCalled = true;
                print("LastCallSet");
                Chat.SendMessage("Last Call to Roll! " + ActiveGame.LastCallTime + " seconds left!", Channel);
            }
            if (!ActiveGame.RollCalled && ActiveGame.LastCallTime < GetTime()) {
                print("RollCallSet");
                ActiveGame.RollCalled = true;
                Chat.SendMessage("Roll Now!!!", Channel);
            }
            if (ActiveGame.Duration < GetTime()) {
                ActiveGame.Active = false;
                ActiveGame = undefined;
            }

        }
    });
}




