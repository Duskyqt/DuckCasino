import { Settings } from "../Processes/Settings";
import { Colors } from "./Colors";
// Content //

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
        print(InterfaceSettings.X, InterfaceSettings.Y);
        MainInterfaceFrame.StopMovingOrSizing();
    });
    MainInterfaceFrame.Show();


    export const MainButton: CreatedButton = CreateFrame("Button") as CreatedButton;
    MainButton.SetSize(10, 10);
    MainButton.SetPoint("TOPLEFT", MainInterfaceFrame, "TOPLEFT", 0, 0);
    MainButton.SetMovable(true);
    MainButton.EnableMouse(true);
    MainButton.SetClampedToScreen(true);
    MainButton.SetFrameStrata("MEDIUM");
    MainButton.SetBackdrop({
        bgFile: "Interface\\ChatFrame\\ChatFrameBackground",
        edgeFile: "Interface\\ChatFrame\\ChatFrameBackground",
        edgeSize: 1,
        tile: true,
        tileSize: 1
    });
    MainButton.SetBackground = (color: IColor, borderColor: IColor) => {
        MainButton.SetBackdropColor(color.R, color.G, color.G, color.A);
        MainButton.SetBackdropBorderColor(borderColor.R, borderColor.G, borderColor.G, color.A);
    };
    MainButton.OnClick = () => print("LOL");
    MainButton.SetScript("OnMouseUp", () => {
        if (MainButton.OnClick) {
            MainButton.OnClick();
        } else {
            print("Nothing Bound");
        }
    })
    MainButton.SetBackground(Colors.Background, Colors.Red);
    MainButton.Show();
    _G.MyInterfaceButton = MainButton;
    _G.MyInterfaceFrame = MainInterfaceFrame;
}
