//Source/Core.ts//

export namespace Main {
    export let ActiveGame: Game | undefined;
    Events.General("CHAT_MSG_CHANNEL", (Message: string, Author: string) => {
        const OptIn = Message.search(RegExp(/1{1}/));
        const OptOut = Message.search(RegExp(/-1{1}/));
        if (ActiveGame != undefined) {
            if (OptIn) {
                if (ActiveGame.Participants.indexOf(Author) == -1) {
                    ActiveGame.Participants.push(Author);
                }
            } else {
                const Index = ActiveGame.Participants.indexOf(Author);
                if (Index != -1) {
                    ActiveGame.Participants.splice(Index, 1);
                }
            }
        }
    });
    const MainFrame = CreateFrame("Frame");
    MainFrame.SetScript("OnUpdate", () => {
        if (ActiveGame != undefined) {
            if (!ActiveGame.LastCalled && ActiveGame.LastCallTime < GetTime()) {
                
            }

        }
    });
}




