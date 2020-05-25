import { Core } from "../Core";
import { Events } from "./Events";
import { Game } from "../Models/Game";

// Content //

export namespace Chat {
    const ActiveGame = Core.ActiveGame;
    Events.General(["CHAT_MSG_CHANNEL", "CHAT_MSG_RAID", "CHAT_MSG_GUILD", "CHAT_MSG_PARTY", "CHAT_MSG_SAY"], (Event: string, Message: string, Author: string) => {
        print(Event, Message, Author)
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
        } else {
            if (Author == "Realducky-Area52") {
                const NewGameMessage = Message.toLowerCase().indexOf("newgame") != -1;
                if (NewGameMessage) {
                    const MessageSplit = Message.split(" ");
                    const Amount = tonumber(MessageSplit[1]) || 1;
                    const Duration = tonumber(MessageSplit[2]) || 20;
                    const LastCall = tonumber(MessageSplit[3]) || 5;
                    print("adding game!", Amount, Duration, LastCall)
                    Core.ActiveGame = new Game({Amount: Amount, Duration: Duration, LastCallTime: LastCall })
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
