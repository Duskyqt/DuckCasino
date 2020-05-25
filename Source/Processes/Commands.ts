import { Core } from "../Core";
import { Game } from "../Models/Game";

// Content //




export namespace Commands {

    function RegisterCommand(this: void, Command: string) {
        _G["SLASH_" + Command.toUpperCase() + "1"] = "/" + Command.toLowerCase();
        _G.SlashCmdList[Command.toUpperCase()] = Parse;
    }
    RegisterCommand("DuckCasino");
    /** Finds the macro and execute it when a command is issued */
    function Parse(this: void, Parts: string) {
        const PartsArray: string[] = Parts.split(" ");
        const Command: string = PartsArray[0];
        // Toggle
        if (Parts.toLowerCase().indexOf("new") != -1) {
            Core.ActiveGame = new Game({Amount: 5000, LastCallTime: 5, Duration: 20});
            print("Casting", "Invalid Command:", Parts, " could not be found.");
        }
    }
}
