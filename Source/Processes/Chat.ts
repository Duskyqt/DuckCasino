import { Core } from "../Core";
import { Events } from "./Events";

// Content //

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
}