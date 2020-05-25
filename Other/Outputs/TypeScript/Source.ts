//Source/Core.ts//

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




//Source/Models/Game.ts//

interface IGame {
    Amount: number;
    LastCallTime: number;
    Duration: number;
}
export class Game {
    public Amount = 0;
    public Duration = 0;
    public LastCallTime = 0;
    public LastCalled = false;
    public RollCalled = false;
    public Participants: string[] = [];
    constructor(payload: IGame) {
        this.Amount = payload.Amount;
        this.Duration = GetTime() + payload.Duration;
        this.LastCallTime = GetTime() + payload.LastCallTime;
    }
}//Source/Processes/Events.ts//

export class CombatEvent {
    public TimeStamp: number;
    public Type: string;
    public HideCaster: boolean;
    public SourceGuid: string;
    public SourceName: string;
    public SourceFlags: any;
    public SourceRaidFlags: any;
    public DestGuid: string;
    public DestName: string;
    public DestFlags: any;
    public DestRaidFlags: any;
    public SpellId: number;
    public SpellName: string;
    public SpellSchool: number;
    public AuraType: string;
    constructor(args: any[]) {
        this.TimeStamp = args[0];
        this.Type = args[1];
        this.HideCaster = args[2];
        this.SourceGuid = args[3];
        this.SourceName = args[4];
        this.SourceFlags = args[5];
        this.SourceRaidFlags = args[6];
        this.DestGuid = args[7];
        this.DestName = args[8];
        this.DestFlags = args[9];
        this.DestRaidFlags = args[10];
        this.SpellId = args[11];
        this.SpellName = args[12];
        this.SpellSchool = args[13];
        this.AuraType = args[14];
    }
}


export namespace Events {
    const CombatHandlers: INameToFunctions = {};

    // Combat Log Events
    const CombatEvents: CreatedFrame = CreateFrame("Frame");
    CombatEvents.RegisterEvent("COMBAT_LOG_EVENT_UNFILTERED");
    CombatEvents.SetScript("OnEvent", () => {
        const event: CombatEvent = new CombatEvent(CombatLogGetCurrentEventInfo());
        // Core.Dump(event);
        // print("Event - Type:", event.Type, "- Dest:", event.DestName, "- Source:", event.SourceName);
        if (CombatHandlers[event.Type] != null && CombatHandlers[event.Type].length > 0) {
            for (let i = 0; i < CombatHandlers[event.Type].length; i++) {
                CombatHandlers[event.Type][i](event);
            }
        }
    });

    /** Events that are within the COMBAT_LOG_EVENT_UNFILTERED event */
    export function Combat(this: void,event: string | string[], Function: Function): void {
        if (typeof event == "string") {
            if (CombatHandlers[event] == null) {
                CombatHandlers[event] = [];
            }
            CombatHandlers[event].push(Function);
        } else {
            for (let i = 0; i < event.length; i++) {
                if (CombatHandlers[event[i]] == null) {
                    CombatHandlers[event[i]] = [];
                }
                CombatHandlers[event[i]].push(Function);
            }
        }
    }
    /** Events that are NOT within the COMBAT_LOG_EVENT_UNFILTERED event */
    export function General(this: void, event: string | string[], Function: Function): void {
        const NewEvent: CreatedFrame = CreateFrame("Frame");
        if (typeof event == "string") {
            NewEvent.RegisterEvent(event);
        } else {
            for (let i = 0; i < event.length; i++) {
                NewEvent.RegisterEvent(event[i]);
            }
        }
        NewEvent.SetScript("OnEvent", (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any) => {
            Function(arg1, arg2, arg3, arg4, arg5, arg6);
        });
    }
}//Source/Processes/Chat.ts//


export namespace Chat {
    const ActiveGame = Core.ActiveGame;
    Events.General("CHAT_MSG_CHANNEL", (Message: string, Author: string) => {
        if (ActiveGame != undefined) {
            const OptIn = Message.indexOf("1") != -1;
            const OptOut = Message.indexOf("-1") != -1;
            if (OptIn) {
                if (ActiveGame.Participants.indexOf(Author) == -1) {
                    ActiveGame.Participants.push(Author);
                }
            } else if (OptOut) {
                const Index = ActiveGame.Participants.indexOf(Author);
                if (Index != -1) {
                    ActiveGame.Participants.splice(Index, 1);
                }
            }
        }
    });
    export function SendMessage(message: string, chatType: string) {
        const ChatType = chatType || "RAID";
        const Channel = chatType == "CHANNEL" && "1" || undefined;
        SendChatMessage(message, ChatType, undefined, Channel);
    }
}//Source/Processes/Settings.ts//


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
}//Source/Interface/Colors.ts//



export namespace Colors {
    export const Arcane: IColor = { R: 182 / 255, G: 52 / 255, B: 182 / 255, A: 0.8, Hex: "|cff" + "B634B6" };
    export const Black: IColor = { R: 0 / 255, G: 0 / 255, B: 0 / 255, A: 0.8, Hex: "|cff" + "000000" };
    export const Blue: IColor = { R: 7 / 255, G: 126 / 255, B: 181 / 255, A: 0.8, Hex: "|cff" + "4287f5" };
    export const Charcoal: IColor = { R: 28 / 255, G: 28 / 255, B: 28 / 255, A: 0.8, Hex: "|cff" + " 1c1c1c " };
    export const ElvUI: IColor = { R: 15 / 255, G: 15 / 255, B: 15 / 255, A: 0.8, Hex: "|cff" + "0F0F0F" };
    export const DarkGray: IColor = { R: 43 / 255, G: 43 / 255, B: 43 / 255, A: 0.8, Hex: "|cff" + "363636" };
    export const DarkRed: IColor = { R: 127 / 255, G: 0 / 255, B: 0 / 255, A: 0.8, Hex: "|cff" + "7F0000" };
    export const Green: IColor = { R: 52 / 255, G: 187 / 255, B: 52 / 255, A: 0.8, Hex: "|cff" + "34BB34" };
    export const Gray: IColor = { R: 75 / 255, G: 75 / 255, B: 75 / 255, A: 1, Hex: "|cff" + "7D7D7D" };
    export const Red: IColor = { R: 159 / 255, G: 4 / 255, B: 8 / 255, A: 0.8, Hex: "|cff" + "9F0408" };
    export const RedLite: IColor = { R: 159 / 255, G: 4 / 255, B: 8 / 255, A: 0.8, Hex: "|cff" + "FF0408" };
    export const Transparent: IColor = { R: 0, G: 0, B: 0, A: 0, Hex: "|c00" + "000000" };
    export const White: IColor = { R: 255 / 255, G: 255 / 255, B: 255 / 255, A: 0.8, Hex: "|cff" + "FFFFFF" };

    // Class
    export const DeathKnight: IColor = { R: 196 / 255, G: 31 / 255, B: 59 / 255, A: 0.8, Hex: "|cff" + "C41F3B" };
    export const DemonHunter: IColor = { R: 163 / 255, G: 48 / 255, B: 201 / 255, A: 0.8, Hex: "|cff" + "A330C9" };
    export const Druid: IColor = { R: 255 / 255, G: 125 / 255, B: 10 / 255, A: 0.8, Hex: "|cff" + "FF7D0A" };
    export const Hunter: IColor = { R: 171 / 255, G: 212 / 255, B: 115 / 255, A: 0.8, Hex: "|cff" + "ABD473" };
    export const Mage: IColor = { R: 64 / 255, G: 199 / 255, B: 235 / 255, A: 0.8, Hex: "|cff" + "40C7EB" };
    export const Monk: IColor = { R: 0 / 255, G: 255 / 255, B: 150 / 255, A: 0.8, Hex: "|cff" + "00FF96" };
    export const Paladin: IColor = { R: 245 / 255, G: 140 / 255, B: 186 / 255, A: 0.8, Hex: "|cff" + "F58CBA" };
    export const Priest: IColor = { R: 255 / 255, G: 255 / 255, B: 255 / 255, A: 0.8, Hex: "|cff" + "FFFFFF" };
    export const Rogue: IColor = { R: 255 / 255, G: 245 / 255, B: 105 / 255, A: 0.8, Hex: "|cff" + "FFF569" };
    export const Shaman: IColor = { R: 0 / 255, G: 112 / 255, B: 222 / 255, A: 0.8, Hex: "|cff" + "" };
    export const Warlock: IColor = { R: 135 / 255, G: 135 / 255, B: 237 / 255, A: 0.8, Hex: "|cff" + "" };
    export const Warrior: IColor = { R: 199 / 255, G: 156 / 255, B: 110 / 255, A: 0.8, Hex: "|cff" + "" };

    // Qualities
    export const Poor: IColor = { R: 157 / 255, G: 157 / 255, B: 157 / 255, A: 0.8, Hex: "|cff" + "9d9d9d" };
    export const Common: IColor = { R: 255 / 255, G: 255 / 255, B: 255 / 255, A: 0.8, Hex: "|cff" + "ffffff" };
    export const Uncommon: IColor = { R: 30 / 255, G: 255 / 255, B: 0 / 255, A: 0.8, Hex: "|cff" + "1eff00" };
    export const Rare: IColor = { R: 0 / 255, G: 112 / 255, B: 221 / 255, A: 0.8, Hex: "|cff" + "0070dd" };
    export const Epic: IColor = { R: 163 / 255, G: 53 / 255, B: 238 / 255, A: 0.8, Hex: "|cff" + "a335ee" };
    export const Legendary: IColor = { R: 255 / 255, G: 128 / 255, B: 0 / 255, A: 0.8, Hex: "|cff" + "ff8000" };
    export const Artifact: IColor = { R: 230 / 255, G: 204 / 255, B: 128 / 255, A: 0.8, Hex: "|cff" + "e6cc80" };
    export const Heirloom: IColor = { R: 0 / 255, G: 204 / 255, B: 255 / 255, A: 0.8, Hex: "|cff" + "00ccff" };

    const ClassColors: IColor[] = [
        Warrior,
        Paladin,
        Hunter,
        Rogue,
        Priest,
        DeathKnight,
        Shaman,
        Mage,
        Warlock,
        Monk,
        Druid,
        DemonHunter
    ];
    export function ForUnit(unitId: string): IColor {
        const UnitClassId: number = UnitClass(unitId)[2];
        if (ClassColors[UnitClassId - 1] != undefined) {
            return ClassColors[UnitClassId - 1];
        }
        return Accent;
    }


    // Skin
    export let Accent: IColor = ForUnit("player");
    export const DarkAccent: IColor = DarkGray;
    export const Background: IColor = Black;
    export const Border: IColor = { R: 15 / 255, G: 15 / 255, B: 15 / 255, A: 1, Hex: "|cff" + "0F0F0F" };
    export const ControlBackground: IColor = DarkGray;
    export const ControlBorder: IColor = Charcoal;
    // export const : IColor = { R:  / 255, G:  / 255, B:  / 255, A: 0.8, Hex: "|cff" + "" };
}
//Source/Interface/MainInterface.ts//


export namespace MainInterface {
    export const MainInterfaceFrame = CreateFrame("Frame", "Main Frame");
    const InterfaceSettings =  Settings.CasinoSettings && Settings.CasinoSettings.MainInterface || { X: 0, Y: 0 };
    const Height = 50;
    const Width = 50;
    MainInterfaceFrame.SetSize(Height, Width);
    MainInterfaceFrame.SetPoint("CENTER", UIParent, "CENTER", 0, 0);
    MainInterfaceFrame.SetMovable(true);
    MainInterfaceFrame.EnableMouse(true);
    MainInterfaceFrame.SetClampedToScreen(true);
    MainInterfaceFrame.SetFrameStrata("LOW");
    MainInterfaceFrame.SetBackdrop({
        bgFile: "Interface\\ChatFrame\\ChatFrameBackground",
        edgeFile: "Interface\\ChatFrame\\ChatFrameBackground",
        edgeSize: 1,
        tile: true,
        tileSize: 1
    });
    MainInterfaceFrame.SetBackground = (color: IColor, borderColor: IColor) => {
        MainInterfaceFrame.SetBackdropColor(color.R, color.G, color.G, color.A);
        MainInterfaceFrame.SetBackdropBorderColor(borderColor.R, borderColor.G, borderColor.G, color.A);
    };
    MainInterfaceFrame.SetBackground(Colors.Background, Colors.Border);
    MainInterfaceFrame.SetScript("OnMouseDown", MainInterfaceFrame.StartMoving);
    MainInterfaceFrame.SetScript("OnMouseUp", () => {
        InterfaceSettings.X = MainInterfaceFrame.GetPoint()[3];
        InterfaceSettings.Y = MainInterfaceFrame.GetPoint()[4];
        print(InterfaceSettings.X, InterfaceSettings.Y)
        MainInterfaceFrame.StopMovingOrSizing();
    });
    MainInterfaceFrame.Show();
    _G.MyInterfaceFrame = MainInterfaceFrame;
};