import { Game } from "./Models/Game";
import { Events } from "./Processes/Events";
import { Chat } from "./Processes/Chat";

// Content //
export namespace Core {
    export let ActiveGame: Game | undefined;
    const Channel = "RAID";
    const MainFrame = CreateFrame("Frame");
    MainFrame.SetScript("OnUpdate", () => {
        if (ActiveGame != undefined) {
            if (!ActiveGame.LastCalled && ActiveGame.LastCallTime < GetTime()) {
                ActiveGame.LastCalled = true;
                Chat.SendMessage("Last Call to Roll! " + ActiveGame.LastCallTime + " seconds left!", Channel);
            }
            if (!ActiveGame.RollCalled && ActiveGame.LastCallTime < GetTime()) {
                ActiveGame.RollCalled = true;
                Chat.SendMessage("Roll Now!!!", Channel);
            }

        }
    });
}




