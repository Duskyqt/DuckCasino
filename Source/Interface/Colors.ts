// Content //


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
