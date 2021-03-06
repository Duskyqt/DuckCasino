const concat = require('concat');
let appRoot = require("app-root-path");
const Args = process.argv;
const fs = require("fs");
appRoot = appRoot + "\\";

const TocPath = "Source\\Source.toc";

class NiceDate extends Date {

    constructor() {
        super();
    }

    public GetDay(): string {
        const Month = this.getMonth() + 1; // getMonth() is zero-based
        const Day = this.getDate();

        return [
            (Day > 9 ? "" : "0") + Day,
            " / ",
            (Month > 9 ? "" : "0") + Month,
            " / ",
            this.getFullYear()
        ].join("");
    }

    public GetTime(): string {
        const Hour = this.getHours();
        const Minute = this.getMinutes();
        const Seconds = this.getSeconds();
        const MilliSeconds = this.getMilliseconds();

        return "<" + [
            (Hour > 9 ? "" : "0") + Hour,
            ":",
            (Minute > 9 ? "" : "0") + Minute,
            ":",
            (Seconds > 9 ? "" : "0") + Seconds,
            ":",
            (MilliSeconds > 99 ? "" : MilliSeconds > 9 ? "0" : "00") + MilliSeconds,
        ].join("") + ">";
    }
}

function GetNiceTime(): string {
    return new NiceDate().GetTime();
}

namespace Core {
    
    let SavedAddonName: string;
    let Standalone: boolean = true;
    let SavedVariables: boolean = false;
    let SavedVariablesName: string = "";
    async function GetAddonProperties(): Promise<string> {
        if (SavedAddonName == undefined) {
            const TocFilePromise = ReadFile("ReadToc", TocPath, "UTF-8");
            await TocFilePromise.then((value: [string, string]) => {
                // Here we got the content of the toc, we will add every lines by splitting
                const FileContent = value[1];
                const FileLines = FileContent.split(RegExp("[\r\n]"));
                for (let i = 0; i < FileLines.length; i++) {
                    const ThisLine = FileLines[i];
                    if (ThisLine.indexOf("AddonName=") != -1) {
                        const SplitLine = ThisLine.split('=');
                        SavedAddonName = SplitLine[SplitLine.length - 1];
                    }
                    if (ThisLine.indexOf("Standalone=") != -1) {
                        const SplitLine = ThisLine.split('=');
                        Standalone = SplitLine[SplitLine.length - 1].toLowerCase() == "false" ? false : true;
                    }
                    if (ThisLine.indexOf("SavedVariables=") != -1) {
                        const SplitLine = ThisLine.split('=');
                        SavedVariables = SplitLine[SplitLine.length - 1].toLowerCase() == "false" ? false : true;
                    }
                    if (SavedVariables && ThisLine.indexOf("SavedVariablesName=") != -1) {
                        const SplitLine = ThisLine.split('=');
                        SavedVariablesName = SplitLine[SplitLine.length - 1];
                    }
                }
            });
        }
        return SavedAddonName;
    }
    
    export const BaseDirectory = Args[1];
    export const LuaFilesPaths = [
        "Header"
    ];

    //#region Files Management

    async function AppendFile(filePath: string, fileContent: string): Promise<void> {
        return await fs.appendFile(filePath, fileContent, (err: string) => {
            if (err) {
                console.log(GetNiceTime(), "AppendFile failed for " + filePath + " Error: " + err);
            }
        });
    }

    async function DeleteFile(filePath: string): Promise<void> {
        return await fs.unlink(filePath, (err: string) => {
            if (err) {
                console.log(GetNiceTime(), "DeleteFile failed for " + filePath + " Error: " + err);
            }
        });
    }

    async function ReadFile(identifier: string, filePath: string, enc: string = "UTF-8"): Promise<[string, string]> {
        // make Promise version of fs.readFile()
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, enc, (err: string, data: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve([identifier, data]);
                }
            });
        });
    }

    async function WriteFile(filePath: string, fileContent: string): Promise<void> {
        await fs.writeFile(filePath, fileContent, (err: string) => {
            if (err) {
                console.log(GetNiceTime(), "WriteFile failed for" + filePath + " Error: " + err);
            }
        });
    }

    async function GetFiles(identifier: string, filePath: string, enc: string = "UTF-8"): Promise<[string, string[]]> {
        // make Promise version of fs.readFile()
        return new Promise((resolve, reject) => {
            fs.readdir(filePath, enc, (err: string, data: string[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve([identifier, data]);
                }
            });
        });
    }

    //#endregion

    /** Call it after tstl transpiled */
    export async function LuaWrapper(): Promise<void> {
        console.log(GetNiceTime(), "Typescript-To-Lua - Transpilation finished");
        console.log(GetNiceTime(), "Lua Wrapper - Begins");

        const AddonFolder = appRoot + "AddOn\\"
        // Empty addons directory        
        await GetFiles("AddonFolderFiles", AddonFolder).then(async ([Identifier, TypeScriptFilesPaths]) => {
            console.log(GetNiceTime(), "TypeScript Wrapper - Finished reading Toc", TypeScriptFilesPaths.length, "files were found.");
            // For each files, remove the top of the file and add them to a single file
            for (let i = 0; i < TypeScriptFilesPaths.length; i++) {
                const ThisFilePath = TypeScriptFilesPaths[i];
                await DeleteFile(AddonFolder + ThisFilePath).then(() => {
                    console.log(GetNiceTime(), "Lua Wrapper - Deleted file", AddonFolder + ThisFilePath)
                });
            }
        });

        await GetAddonProperties();
        const WrappedLuaFile = AddonFolder + SavedAddonName + ".lua";
        const TocFile = AddonFolder + SavedAddonName + ".toc";
        
        try {
            const FilesToMerge = Standalone && [
                "Other/Outputs/Lua/Header.lua",
                "Other/Outputs/Lua/Source.lua",
                "Other/Outputs/Lua/Footer.lua"
            ] || [
                "Other/Outputs/Lua/Source.lua"
            ];
            let Content = Standalone ? "local AddonName = \"" + SavedAddonName + "\"\n\n" : "";
            for (let i = 0; i < FilesToMerge.length; i++) {
                const ReadFileResult = await ReadFile(FilesToMerge[i], FilesToMerge[i]);
                Content += "\n\n-- " + ReadFileResult[0] + " --\n";
                Content += ReadFileResult[1];
            }
            // Lua File
            console.log(GetNiceTime(), "Lua Addon Wrapper - Append");
            await AppendFile(WrappedLuaFile, Content)
            .then(async () => {
                console.log(GetNiceTime(), "Lua Addon Wrapper - Finished", Date());
            });
            // Toc File
            if (Standalone) {
                console.log(GetNiceTime(), "Lua Toc Wrapper - Append Standalone", Date());
                await AppendFile(TocFile, "## Title: " + SavedAddonName + "\n\n").then(() => {
                    console.log(GetNiceTime(), "Lua Toc Wrapper - Finished", Date());
                });
            }
            if (SavedVariables) {
                console.log(GetNiceTime(), "Lua Toc Wrapper - Append SavedVariables", Date());
                await AppendFile(TocFile, "## SavedVariables: " + SavedVariablesName + "\n\n").then(() => {
                    console.log(GetNiceTime(), "Lua Toc Wrapper - Finished", Date());
                });                
            }
            if (Standalone) {
                console.log(GetNiceTime(), "Lua Toc Wrapper - Append Standalone", Date());
                await AppendFile(TocFile,  SavedAddonName + ".lua").then(() => {
                    console.log(GetNiceTime(), "Lua Toc Wrapper - Finished", Date());
                });
            }
           
        } catch (error) {
            console.log(GetNiceTime(), "Error", error);
        }
    }

    async function GetTypeScriptFilesPaths(): Promise<string[]> {
        const PathsArray: string[] = [];
        const TocFilePromise = ReadFile("ReadToc", TocPath, "UTF-8");
        await TocFilePromise.then((value: [string, string]) => {
            // Here we got the content of the toc, we will add every lines by splitting
            const FileContent = value[1];
            const FileLines = FileContent.split(RegExp("[\r\n]"));
            for (let i = 0; i < FileLines.length; i++) {
                const ThisLine = FileLines[i];
                if (ThisLine != "" && ThisLine.indexOf("##") == -1 && ThisLine.indexOf("AddonName=") == -1 && ThisLine.indexOf("Standalone=") == -1 && ThisLine.indexOf("SavedVariables=") == -1 && ThisLine.indexOf("SavedVariablesName=") == -1) {
                    PathsArray.push("Source/" + ThisLine);
                }
            }
        });
        return PathsArray;
    }


    export async function TypeScriptWrapper() {
        await GetAddonProperties();
        console.log(GetNiceTime(), "TypeScript Wrapper - Started");
        // Gather the files paths array from the toc file
        const TypeScriptFilesPaths: string[] = await GetTypeScriptFilesPaths();
        let LuaContent = "";
        console.log(GetNiceTime(), "TypeScript Wrapper - Finished reading Toc", TypeScriptFilesPaths.length, "files were found.");
        // For each files, remove the top of the file and add them to a single file
        for (let i = 0; i < TypeScriptFilesPaths.length; i++) {
            const ThisFilePath = TypeScriptFilesPaths[i];
            await ReadFile(ThisFilePath, ThisFilePath).then((value: [string, string]) => {
                const ContentBegins = value[1].indexOf("// Content //");
                let Sanitized = value[1].substring(ContentBegins + 14);
                LuaContent += "//" + ThisFilePath + "//\n\r" + Sanitized;
                // second proeprty of the value is the file content
            });
        }
        WriteFile("Other/Outputs/TypeScript/Source.ts", LuaContent);
        console.log(GetNiceTime(), "TypeScript Wrapper - Finished");
        console.log(GetNiceTime(), "Typescript-To-Lua - Transpilation begins");
    }
}

//#region Command Support

/** Retrive the value of a key=value pair passed as parameters */
function GetValue(key: string): undefined | string {
    let Value: undefined | string;
    Args.forEach((val, index) => {
        if (!Value && val.indexOf(key) != -1) {
            Value = val.split("=")[1];
        }
    });
    return Value || undefined;
}
if (GetValue("Wrap") == "Lua") {
    Core.LuaWrapper();
} else {
    Core.TypeScriptWrapper();
}
//#endregion