
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
}