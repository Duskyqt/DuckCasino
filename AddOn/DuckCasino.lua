local AddonName = "DuckCasino"



-- Other/Outputs/Lua/Header.lua --
-- This header is used to feed the inner scope of the addon with links to the global environment.
-- If you need additional API from wow you need to start by adding it here and then you can update the types to reflect this change.

local function Load()
local Environment = {
	AddonName = AddonName,
	-- Lua API
	_G = _G,
	bit = bit,
	cos = math.cos,
	debugstack = debugstack,
	error = error,
	geterrorhandler = geterrorhandler,
	getmetatable = getmetatable,
	ipairs = ipairs,
	loadstring = loadstring,
	math = math,
	DoAtan2 = function (...) return math.atan2(...) end, -- Atan2 is wrongly transpiled so we use this detour
	next = next,
	pairs = pairs,
	pcall = pcall,
	-- If you lost track of where the prints come from or another dev forgot to remove one switch print with debugstack
	-- print = function (...) return print(debugstack(print("|cffFFFFFF[|cffff8000" + AddonName + "|cffFFFFFF] |r", ...))) end,
	print = function (...) return print("|cffFFFFFF[|cffff8000" .. AddonName .. "|cffFFFFFF] |r", ...) end,
	rad = math.rad,
    require = require,
    rawget = rawget,
	rawset = rawset,
	select = select,
	setmetatable = setmetatable,
	sin = math.sin,
	string = string,
	table = table,
	tinsert = table.insert,
	tonumber = tonumber,
	tostring = tostring,
	tremove = table.remove,
	type = type,
	unpack = unpack,
	strsplit = strsplit,
	xpcall = xpcall,
    DuckCasinoSettings = DuckCasinoSettings,
	-- Flight Masters
	CloseTaxiMap = CloseTaxiMap,
	NumTaxiNodes = NumTaxiNodes,
	TaxiNodeCost = TaxiNodeCost,
	TakeTaxiNode = TakeTaxiNode,
	TaxiNodeGetType = TaxiNodeGetType,
	TaxiNodeName = TaxiNodeName,
	TaxiNodePosition = TaxiNodePosition,
	UnitOnTaxi = UnitOnTaxi,

	-- Wow API
	CameraOrSelectOrMoveStart = CameraOrSelectOrMoveStart,
	CameraOrSelectOrMoveStop = CameraOrSelectOrMoveStop,
	CancelShapeshiftForm = CancelShapeshiftForm,
	CloseLoot = CloseLoot,
	CreateVector2D = CreateVector2D,
	GetAddOnMemoryUsage = GetAddOnMemoryUsage,
	GetInventoryItemDurability = GetInventoryItemDurability,
	GetNumGroupMembers = GetNumGroupMembers,
	GetNumLootItems = GetNumLootItems,
	GetNumSpellTabs = GetNumSpellTabs,
	GetSpellTabInfo = GetSpellTabInfo,
	GetSpellBookItemName = GetSpellBookItemName,
	IsInGroup = IsInGroup,
	IsInRaid = IsInRaid,
	LootSlot = LootSlot,
    GetProfessionInfos = GetProfessionInfos,
    GetLatestThreeSenders = GetLatestThreeSenders,
    GetInboxNumItems = GetInboxNumItems,
    GetProfessions = GetProfessions,
	LootSlotHasItem = LootSlotHasItem,
	PetAssistMode = PetAssistMode,
	PetPassiveMode = PetPassiveMode,
	SlashCmdList = SlashCmdList,
	SpellIsTargeting = SpellIsTargeting,
	SpellStopCasting = SpellStopCasting,
	SpellStopTargeting = SpellStopTargeting,
	UnitInVehicle = UnitInVehicle,
	UnitIsAFK = UnitIsAFK,
	UpdateAddOnMemoryUsage = UpdateAddOnMemoryUsage,
	WorldMapFrame = WorldMapFrame,
    MailFrame = MailFrame,
    
    RealMobHealth = RealMobHealth,
	-- Units API
	GetRaidRosterInfo = GetRaidRosterInfo,
	GetRaidTargetIndex = GetRaidTargetIndex,
	GetUnitSpeed = GetUnitSpeed,
	UnitAffectingCombat = UnitAffectingCombat,
	UnitCanAttack = UnitCanAttack,
	UnitCastingInfo = UnitCastingInfo,
	UnitChannelInfo = UnitChannelInfo,
	UnitClass = UnitClass,
	UnitClassification = UnitClassification,
	UnitCreatureType = UnitCreatureType,
	UnitDetailedThreatSituation = UnitDetailedThreatSituation,
	UnitExists = UnitExists,
	UnitGetIncomingHeals = UnitGetIncomingHeals,
	UnitGetTotalHealAbsorbs = UnitGetTotalHealAbsorbs,
	UnitGroupRolesAssigned = UnitGroupRolesAssigned,
	UnitGUID = UnitGUID,
	UnitHealth = UnitHealth,
	UnitHealthMax = UnitHealthMax,
	UnitInRaid = UnitInRaid,
	UnitInParty = UnitInParty,
	UnitIsDead = UnitIsDead,
	UnitIsDeadOrGhost = UnitIsDeadOrGhost,
	UnitIsGhost = UnitIsGhost,
	UnitIsPlayer = UnitIsPlayer,
	UnitIsPVP = UnitIsPVP,
	UnitIsUnit = UnitIsUnit,
	UnitIsVisible = UnitIsVisible,
	UnitIsTapDenied = UnitIsTapDenied,
	UnitLevel = UnitLevel,
	UnitName = UnitName,
	UnitPlayerOrPetInParty = UnitPlayerOrPetInParty,
	UnitPlayerOrPetInRaid = UnitPlayerOrPetInRaid,
	UnitThreatSituation = UnitThreatSituation,
	
	-- Buffs API
	UnitBuff = UnitBuff,
	UnitDebuff = UnitDebuff,
	UnitAura = UnitAura,

	-- Player API
	GetHaste = GetHaste,
	GetInstanceInfo = GetInstanceInfo,
	GetPVPDesired = GetPVPDesired,
	GetSpecialization = GetSpecialization,
	GetSpecializationInfo = GetSpecializationInfo,
	GetUnitMaxHealthModifier = GetUnitMaxHealthModifier,
	HasFullControl = HasFullControl,
	IsAutoRepeatSpell = IsAutoRepeatSpell,
	IsCurrentSpell = IsCurrentSpell,
	IsFalling = IsFalling,
	IsFlying = IsFlying,
	IsInInstance = IsInInstance,
	IsMounted = IsMounted,
	IsPetActive = IsPetActive,
	UnitAttackSpeed = UnitAttackSpeed,
	UnitInBattleground = UnitInBattleground,
	UnitIsWarModeDesired = UnitIsWarModeDesired,
	UnitOnTaxi = UnitOnTaxi,
	
	-- PlayerPet API
	DisableSpellAutocast = DisableSpellAutocast,
	EnableSpellAutocast = EnableSpellAutocast,
	GetPetActionInfo = GetPetActionInfo,
	IsPetAttackActive = IsPetAttackActive,
	PetAttack = PetAttack,

	-- Power API
	GetPowerRegen = GetPowerRegen,
	GetRuneCooldown = GetRuneCooldown,
	UnitPower = UnitPower,
	UnitPowerMax = UnitPowerMax,
	UnitStagger = UnitStagger,
	
	-- Spells API
	GetSpellCharges = GetSpellCharges,
	GetSpellCooldown = GetSpellCooldown,
	GetSpellCount = GetSpellCount,
	GetSpellDescription = GetSpellDescription,
	GetSpellInfo = GetSpellInfo,
	GetTotemInfo = GetTotemInfo,
	GetTotemTimeLeft = GetTotemTimeLeft,
	IsUsableSpell = IsUsableSpell,
	IsPlayerSpell = IsPlayerSpell,
	IsSpellInRange = IsSpellInRange,
	IsSpellKnown = IsSpellKnown,

	-- Stats API
	CR_VERSATILITY_DAMAGE_DONE = CR_VERSATILITY_DAMAGE_DONE,
	GetCombatRating = GetCombatRating,
	GetCombatRatingBonus = GetCombatRatingBonus,
	GetVersatilityBonus = GetVersatilityBonus,
	GetMasteryEffect = GetMasteryEffect,
	GetCritChance = GetCritChance,
	GetHaste = GetHaste,
	UnitAttackPower = UnitAttackPower,
	UnitDamage = UnitDamage,
	UnitSpellHaste = UnitSpellHaste,

	-- Keybinds
	AscendStop = AscendStop,
	JumpOrAscendStart = JumpOrAscendStart,
	JumpOrAscendStop = JumpOrAscendStop,
	MoveBackwardStart = MoveBackwardStart,
	MoveBackwardStop = MoveBackwardStop,
	MoveForwardStart = MoveForwardStart,
	MoveForwardStop = MoveForwardStop,
	StrafeLeftStart = StrafeLeftStart,
	StrafeLeftStop = StrafeLeftStop,
	StrafeRightStart = StrafeRightStart,
	StrafeRightStop = StrafeRightStop,
	TurnLeftStart = TurnLeftStart,
	TurnLeftStop = TurnLeftStop,
	TurnRightStart = TurnRightStart,
	TurnRightStop = TurnRightStop,
	PitchUpStart = PitchUpStart,
	PitchDownStart = PitchDownStart,
	PitchDownStop = PitchDownStop,
	PitchUpStop = PitchUpStop,
	IsMouselooking = IsMouselooking,
	IsShiftKeyDown = IsShiftKeyDown,
	IsSwimming = IsSwimming,
	IsControlKeyDown = IsControlKeyDown,
	MouselookStart = MouselookStart,

    -- General API
    ClearTarget = ClearTarget,
	CombatLogGetCurrentEventInfo = CombatLogGetCurrentEventInfo,
	C_AzeriteEmpoweredItem = C_AzeriteEmpoweredItem,
	C_ChatInfo = C_ChatInfo,	
	C_Map = C_Map,
    C_MountJournal = C_MountJournal,
	C_Timer = C_Timer,
	C_Item = C_Item,
	Enum = Enum,
	
    Dismount = Dismount,
	ItemLocation = ItemLocation,
	GetAddOnMetadata = GetAddOnMetadata,
	GetBuildInfo = GetBuildInfo,
	GetCursorPosition = GetCursorPosition,
	GetGossipOptions = GetGossipOptions,
	GetNumGossipOptions = GetNumGossipOptions,
	GetSkillLevel = GetSkillLevel,
	GetSkillLineInfo = GetSkillLineInfo,
	GetNumSkillLines = GetNumSkillLines,
	SelectGossipOption = SelectGossipOption,
    GetNumQuestLogEntries = GetNumQuestLogEntries,
    GetQuestLogQuestText = GetQuestLogQuestText,
    GetQuestIDFromLogIndex = GetQuestIDFromLogIndex,
	GetLocale = GetLocale,
	GetTime = GetTime,
	GetNetStats = GetNetStats,
	GetInventorySlotInfo = GetInventorySlotInfo,
	GetWeaponEnchantInfo = GetWeaponEnchantInfo,
    InterfaceOptions_AddCategory = InterfaceOptions_AddCategory,
    IsIndoors = IsIndoors,
    IsOutdoors = IsOutdoors,
    PowerType = Enum.PowerType,
	UnitIsWildBattlePet = UnitIsWildBattlePet,
	AcceptProposal = AcceptProposal,
	GetCVar = GetCVar,
	SetCVar = SetCVar,
	UIErrorsFrame = UIErrorsFrame,
	mod = mod,
    CanLootUnit = CanLootUnit,
    ResetInstances = ResetInstances,
    SendChatMessage = SendChatMessage,

	-- Equipment API
	ContainerIDToInventoryID = ContainerIDToInventoryID,
	EquipCursorItem = EquipCursorItem,
    EquipItemByName = EquipItemByName,
	GetContainerItemInfo = GetContainerItemInfo,
	GetContainerItemLink = GetContainerItemLink,
	GetContainerFreeSlots = GetContainerFreeSlots,
	GetContainerNumFreeSlots = GetContainerNumFreeSlots,
	GetContainerNumSlots = GetContainerNumSlots,
	GetInventoryItemCooldown = GetInventoryItemCooldown,
	GetInventoryItemID = GetInventoryItemID,
	GetItemCooldown = GetItemCooldown,
	GetItemCount = GetItemCount,
	GetItemInfo = GetItemInfo,
	IsUsableInventory = IsUsableInventory,
	NUM_BAG_SLOTS = NUM_BAG_SLOTS,
	PickupContainerItem = PickupContainerItem,
	PickupInventoryItem = PickupInventoryItem,
    PickupMerchantItem = PickupMerchantItem,
	PutItemInBackpack = PutItemInBackpack,
	PutItemInBag = PutItemInBag,
	UseContainerItem = UseContainerItem,

	-- Talents API
	LearnTalent = LearnTalent,
	RemoveTalent = RemoveTalent,
	GetTalentInfo = GetTalentInfo,
	RAID_CLASS_COLORS = RAID_CLASS_COLORS,
	ITEM_QUALITY_COLORS = ITEM_QUALITY_COLORS,

	-- Pet Battles / Critters
	BATTLE_PET_NAME_5 = BATTLE_PET_NAME_5,
	PETTAME_NOTDEAD = PETTAME_NOTDEAD,
	SPELL_FAILED_NO_PET = SPELL_FAILED_NO_PET,
	ERR_ATTACK_DEAD = ERR_ATTACK_DEAD,
	PETTAME_DEAD = PETTAME_DEAD,
    -- Constants
	SPELL_FAILED_NOT_BEHIND = SPELL_FAILED_NOT_BEHIND,
	SPELL_FAILED_NO_MOUNTS_ALLOWED = SPELL_FAILED_NO_MOUNTS_ALLOWED,
	MINIMAP_TRACKING_MAILBOX = MINIMAP_TRACKING_MAILBOX,
	-- WoW UI API
	CreateFrame = CreateFrame,
	GameTooltip = GameTooltip,
	CreateMacro = CreateMacro,
	message = message,
	UIParent = UIParent,
	Enum = Enum,
	WorldFrame = WorldFrame,
	-- RealMobHealth
	assert = assert,
	GameTooltipStatusBar = GameTooltipStatusBar,
	hooksecurefunc = hooksecurefunc,
	IsInGuild = IsInGuild,
	NamePlateDriverFrame = NamePlateDriverFrame,
    TargetFrameHealthBar = TargetFrameHealthBar,
    TargetFrameTextureFrame = TargetFrameTextureFrame,
	TargetFrameManaBar = TargetFrameManaBar,
	TextStatusBar_Initialize = TextStatusBar_Initialize,
	TextStatusBar_OnValueChanged = TextStatusBar_OnValueChanged,
	TextStatusBar_UpdateTextString = TextStatusBar_UpdateTextString,
	TextStatusBar_UpdateTextStringWithValues = TextStatusBar_UpdateTextStringWithValues,
}
if setfenv == nil then return end
setfenv(1, Environment)

-- Other/Outputs/Lua/Source.lua --
-- Lua Library inline imports
function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

function __TS__ArrayPush(arr, ...)
    local items = {...}
    for ____, item in ipairs(items) do
        arr[#arr + 1] = item
    end
    return #arr
end

function __TS__ArrayIndexOf(arr, searchElement, fromIndex)
    local len = #arr
    if len == 0 then
        return -1
    end
    local n = 0
    if fromIndex then
        n = fromIndex
    end
    if n >= len then
        return -1
    end
    local k
    if n >= 0 then
        k = n
    else
        k = len + n
        if k < 0 then
            k = 0
        end
    end
    do
        local i = k
        while i < len do
            if arr[i + 1] == searchElement then
                return i
            end
            i = i + 1
        end
    end
    return -1
end

function __TS__ArraySplice(list, ...)
    local len = #list
    local actualArgumentCount = select("#", ...)
    local start = select(1, ...)
    local deleteCount = select(2, ...)
    local actualStart
    if start < 0 then
        actualStart = math.max(len + start, 0)
    else
        actualStart = math.min(start, len)
    end
    local itemCount = math.max(actualArgumentCount - 2, 0)
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - actualStart
    else
        actualDeleteCount = math.min(
            math.max(deleteCount or 0, 0),
            len - actualStart
        )
    end
    local out = {}
    do
        local k = 0
        while k < actualDeleteCount do
            local from = actualStart + k
            if list[from + 1] then
                out[k + 1] = list[from + 1]
            end
            k = k + 1
        end
    end
    if itemCount < actualDeleteCount then
        do
            local k = actualStart
            while k < (len - actualDeleteCount) do
                local from = k + actualDeleteCount
                local to = k + itemCount
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k + 1
            end
        end
        do
            local k = len
            while k > ((len - actualDeleteCount) + itemCount) do
                list[k] = nil
                k = k - 1
            end
        end
    elseif itemCount > actualDeleteCount then
        do
            local k = len - actualDeleteCount
            while k > actualStart do
                local from = (k + actualDeleteCount) - 1
                local to = (k + itemCount) - 1
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k - 1
            end
        end
    end
    local j = actualStart
    for i = 3, actualArgumentCount do
        list[j + 1] = select(i, ...)
        j = j + 1
    end
    do
        local k = #list - 1
        while k >= ((len - actualDeleteCount) + itemCount) do
            list[k + 1] = nil
            k = k - 1
        end
    end
    return out
end

function __TS__StringSplit(source, separator, limit)
    if limit == nil then
        limit = 4294967295
    end
    if limit == 0 then
        return {}
    end
    local out = {}
    local index = 0
    local count = 0
    if (separator == nil) or (separator == "") then
        while (index < (#source - 1)) and (count < limit) do
            out[count + 1] = string.sub(source, index + 1, index + 1)
            count = count + 1
            index = index + 1
        end
    else
        local separatorLength = #separator
        local nextIndex = (string.find(source, separator, nil, true) or 0) - 1
        while (nextIndex >= 0) and (count < limit) do
            out[count + 1] = string.sub(source, index + 1, nextIndex)
            count = count + 1
            index = nextIndex + separatorLength
            nextIndex = (string.find(source, separator, index + 1, true) or 0) - 1
        end
    end
    if count < limit then
        out[count + 1] = string.sub(source, index + 1)
    end
    return out
end

local ____exports = {}
local Chat
____exports.Core = {}
local Core = ____exports.Core
do
    if DuckCasinoSettings then
        DuckCasinoSettings = {MainInterface = {X = 0, Y = 0}}
    end
    local Channel = "SAY"
    local MainFrame = CreateFrame("Frame")
    local Throttle = 1
    local NextCheck = 0
    MainFrame:SetScript(
        "OnUpdate",
        function()
            if (Core.ActiveGame ~= nil) and Core.ActiveGame.Active then
                if NextCheck < GetTime() then
                    print(
                        Core.ActiveGame.Duration,
                        GetTime()
                    )
                    print(
                        "Time Left: ",
                        Core.ActiveGame.Duration - GetTime()
                    )
                    NextCheck = GetTime() + Throttle
                end
                if (not Core.ActiveGame.LastCalled) and (Core.ActiveGame.LastCallTime < GetTime()) then
                    Core.ActiveGame.LastCalled = true
                    print("LastCallSet")
                    ____exports.Chat:SendMessage(
                        ("Last Call to Roll! " .. tostring(Core.ActiveGame.LastCallTime)) .. " seconds left!",
                        Channel
                    )
                end
                if (not Core.ActiveGame.RollCalled) and (Core.ActiveGame.LastCallTime < GetTime()) then
                    print("RollCallSet")
                    Core.ActiveGame.RollCalled = true
                    ____exports.Chat:SendMessage("Roll Now!!!", Channel)
                end
            end
        end
    )
end
____exports.Game = __TS__Class()
local Game = ____exports.Game
Game.name = "Game"
function Game.prototype.____constructor(self, payload)
    self.Active = false
    self.Amount = 0
    self.Duration = 0
    self.LastCallTime = 0
    self.LastCalled = false
    self.RollCalled = false
    self.Participants = {}
    self.Active = true
    self.Amount = payload.Amount
    self.Duration = GetTime() + payload.Duration
    self.LastCallTime = GetTime() + payload.LastCallTime
    print("Making Game!", self.Amount, self.Duration, self.LastCallTime)
end
____exports.CombatEvent = __TS__Class()
local CombatEvent = ____exports.CombatEvent
CombatEvent.name = "CombatEvent"
function CombatEvent.prototype.____constructor(self, args)
    self.TimeStamp = args[1]
    self.Type = args[2]
    self.HideCaster = args[3]
    self.SourceGuid = args[4]
    self.SourceName = args[5]
    self.SourceFlags = args[6]
    self.SourceRaidFlags = args[7]
    self.DestGuid = args[8]
    self.DestName = args[9]
    self.DestFlags = args[10]
    self.DestRaidFlags = args[11]
    self.SpellId = args[12]
    self.SpellName = args[13]
    self.SpellSchool = args[14]
    self.AuraType = args[15]
end
____exports.Events = {}
local Events = ____exports.Events
do
    local CombatHandlers = {}
    local CombatEvents = CreateFrame("Frame")
    CombatEvents:RegisterEvent("COMBAT_LOG_EVENT_UNFILTERED")
    CombatEvents:SetScript(
        "OnEvent",
        function()
            local event = __TS__New(
                ____exports.CombatEvent,
                {
                    CombatLogGetCurrentEventInfo()
                }
            )
            if (CombatHandlers[event.Type] ~= nil) and (#CombatHandlers[event.Type] > 0) then
                do
                    local i = 0
                    while i < #CombatHandlers[event.Type] do
                        (function()
                            local ____self = CombatHandlers[event.Type]
                            return ____self[i + 1](____self, event)
                        end)()
                        i = i + 1
                    end
                end
            end
        end
    )
    function Events.Combat(event, Function)
        if type(event) == "string" then
            if CombatHandlers[event] == nil then
                CombatHandlers[event] = {}
            end
            __TS__ArrayPush(CombatHandlers[event], Function)
        else
            do
                local i = 0
                while i < #event do
                    if CombatHandlers[event[i + 1]] == nil then
                        CombatHandlers[event[i + 1]] = {}
                    end
                    __TS__ArrayPush(CombatHandlers[event[i + 1]], Function)
                    i = i + 1
                end
            end
        end
    end
    function Events.General(event, Function)
        local NewEvent = CreateFrame("Frame")
        if type(event) == "string" then
            NewEvent:RegisterEvent(event)
        else
            do
                local i = 0
                while i < #event do
                    NewEvent:RegisterEvent(event[i + 1])
                    i = i + 1
                end
            end
        end
        NewEvent:SetScript(
            "OnEvent",
            function(____, arg1, arg2, arg3, arg4, arg5, arg6)
                Function(nil, arg1, arg2, arg3, arg4, arg5, arg6)
            end
        )
    end
end
____exports.Chat = {}
Chat = ____exports.Chat
do
    local ActiveGame = ____exports.Core.ActiveGame
    ____exports.Events.General(
        {"CHAT_MSG_CHANNEL", "CHAT_MSG_RAID", "CHAT_MSG_GUILD", "CHAT_MSG_PARTY", "CHAT_MSG_SAY"},
        function(____, Event, Message, Author)
            print(Event, Message, Author)
            if ActiveGame ~= nil then
                local OptIn = ((string.find(Message, "1", nil, true) or 0) - 1) ~= -1
                local OptOut = ((string.find(Message, "-1", nil, true) or 0) - 1) ~= -1
                if OptIn then
                    if __TS__ArrayIndexOf(ActiveGame.Participants, Author) == -1 then
                        __TS__ArrayPush(ActiveGame.Participants, Author)
                    end
                elseif OptOut then
                    local Index = __TS__ArrayIndexOf(ActiveGame.Participants, Author)
                    if Index ~= -1 then
                        __TS__ArraySplice(ActiveGame.Participants, Index, 1)
                    end
                end
            else
                if Author == "Realducky-Area52" then
                    local NewGameMessage = ((string.find(
                        string.lower(Message),
                        "newgame",
                        nil,
                        true
                    ) or 0) - 1) ~= -1
                    if NewGameMessage then
                        local MessageSplit = __TS__StringSplit(Message, " ")
                        local Amount = tonumber(MessageSplit[2]) or 1
                        local Duration = tonumber(MessageSplit[3]) or 20
                        local LastCall = tonumber(MessageSplit[4]) or 5
                        print("adding game!", Amount, Duration, LastCall)
                        ____exports.Core.ActiveGame = __TS__New(____exports.Game, {Amount = Amount, Duration = Duration, LastCallTime = LastCall})
                    end
                end
            end
        end
    )
    function Chat.SendMessage(self, message, chatType)
        local ChatType = chatType or "RAID"
        local Channel = ((chatType == "CHANNEL") and "1") or nil
        SendChatMessage(message, ChatType, nil, Channel)
    end
end
____exports.Settings = {}
local Settings = ____exports.Settings
do
    local InitSettings
    function InitSettings(self)
        if DuckCasinoSettings then
            Settings.CasinoSettings = DuckCasinoSettings
        end
    end
    local SettingsFrame = CreateFrame("Frame")
    C_Timer.After(
        2,
        function()
            print("init")
            InitSettings(nil)
        end
    )
end
____exports.Colors = {}
local Colors = ____exports.Colors
do
    Colors.Arcane = {R = 182 / 255, G = 52 / 255, B = 182 / 255, A = 0.8, Hex = "|cff" .. "B634B6"}
    Colors.Black = {R = 0 / 255, G = 0 / 255, B = 0 / 255, A = 0.8, Hex = "|cff" .. "000000"}
    Colors.Blue = {R = 7 / 255, G = 126 / 255, B = 181 / 255, A = 0.8, Hex = "|cff" .. "4287f5"}
    Colors.Charcoal = {R = 28 / 255, G = 28 / 255, B = 28 / 255, A = 0.8, Hex = "|cff" .. " 1c1c1c "}
    Colors.ElvUI = {R = 15 / 255, G = 15 / 255, B = 15 / 255, A = 0.8, Hex = "|cff" .. "0F0F0F"}
    Colors.DarkGray = {R = 43 / 255, G = 43 / 255, B = 43 / 255, A = 0.8, Hex = "|cff" .. "363636"}
    Colors.DarkRed = {R = 127 / 255, G = 0 / 255, B = 0 / 255, A = 0.8, Hex = "|cff" .. "7F0000"}
    Colors.Green = {R = 52 / 255, G = 187 / 255, B = 52 / 255, A = 0.8, Hex = "|cff" .. "34BB34"}
    Colors.Gray = {R = 75 / 255, G = 75 / 255, B = 75 / 255, A = 1, Hex = "|cff" .. "7D7D7D"}
    Colors.Red = {R = 159 / 255, G = 4 / 255, B = 8 / 255, A = 0.8, Hex = "|cff" .. "9F0408"}
    Colors.RedLite = {R = 159 / 255, G = 4 / 255, B = 8 / 255, A = 0.8, Hex = "|cff" .. "FF0408"}
    Colors.Transparent = {R = 0, G = 0, B = 0, A = 0, Hex = "|c00" .. "000000"}
    Colors.White = {R = 255 / 255, G = 255 / 255, B = 255 / 255, A = 0.8, Hex = "|cff" .. "FFFFFF"}
    Colors.DeathKnight = {R = 196 / 255, G = 31 / 255, B = 59 / 255, A = 0.8, Hex = "|cff" .. "C41F3B"}
    Colors.DemonHunter = {R = 163 / 255, G = 48 / 255, B = 201 / 255, A = 0.8, Hex = "|cff" .. "A330C9"}
    Colors.Druid = {R = 255 / 255, G = 125 / 255, B = 10 / 255, A = 0.8, Hex = "|cff" .. "FF7D0A"}
    Colors.Hunter = {R = 171 / 255, G = 212 / 255, B = 115 / 255, A = 0.8, Hex = "|cff" .. "ABD473"}
    Colors.Mage = {R = 64 / 255, G = 199 / 255, B = 235 / 255, A = 0.8, Hex = "|cff" .. "40C7EB"}
    Colors.Monk = {R = 0 / 255, G = 255 / 255, B = 150 / 255, A = 0.8, Hex = "|cff" .. "00FF96"}
    Colors.Paladin = {R = 245 / 255, G = 140 / 255, B = 186 / 255, A = 0.8, Hex = "|cff" .. "F58CBA"}
    Colors.Priest = {R = 255 / 255, G = 255 / 255, B = 255 / 255, A = 0.8, Hex = "|cff" .. "FFFFFF"}
    Colors.Rogue = {R = 255 / 255, G = 245 / 255, B = 105 / 255, A = 0.8, Hex = "|cff" .. "FFF569"}
    Colors.Shaman = {R = 0 / 255, G = 112 / 255, B = 222 / 255, A = 0.8, Hex = "|cff" .. ""}
    Colors.Warlock = {R = 135 / 255, G = 135 / 255, B = 237 / 255, A = 0.8, Hex = "|cff" .. ""}
    Colors.Warrior = {R = 199 / 255, G = 156 / 255, B = 110 / 255, A = 0.8, Hex = "|cff" .. ""}
    Colors.Poor = {R = 157 / 255, G = 157 / 255, B = 157 / 255, A = 0.8, Hex = "|cff" .. "9d9d9d"}
    Colors.Common = {R = 255 / 255, G = 255 / 255, B = 255 / 255, A = 0.8, Hex = "|cff" .. "ffffff"}
    Colors.Uncommon = {R = 30 / 255, G = 255 / 255, B = 0 / 255, A = 0.8, Hex = "|cff" .. "1eff00"}
    Colors.Rare = {R = 0 / 255, G = 112 / 255, B = 221 / 255, A = 0.8, Hex = "|cff" .. "0070dd"}
    Colors.Epic = {R = 163 / 255, G = 53 / 255, B = 238 / 255, A = 0.8, Hex = "|cff" .. "a335ee"}
    Colors.Legendary = {R = 255 / 255, G = 128 / 255, B = 0 / 255, A = 0.8, Hex = "|cff" .. "ff8000"}
    Colors.Artifact = {R = 230 / 255, G = 204 / 255, B = 128 / 255, A = 0.8, Hex = "|cff" .. "e6cc80"}
    Colors.Heirloom = {R = 0 / 255, G = 204 / 255, B = 255 / 255, A = 0.8, Hex = "|cff" .. "00ccff"}
    local ClassColors = {Colors.Warrior, Colors.Paladin, Colors.Hunter, Colors.Rogue, Colors.Priest, Colors.DeathKnight, Colors.Shaman, Colors.Mage, Colors.Warlock, Colors.Monk, Colors.Druid, Colors.DemonHunter}
    function Colors.ForUnit(self, unitId)
        local UnitClassId = ({
            UnitClass(unitId)
        })[3]
        if ClassColors[UnitClassId] ~= nil then
            return ClassColors[UnitClassId]
        end
        return Colors.Accent
    end
    Colors.Accent = Colors.ForUnit(nil, "player")
    Colors.DarkAccent = Colors.DarkGray
    Colors.Background = Colors.Black
    Colors.Border = {R = 15 / 255, G = 15 / 255, B = 15 / 255, A = 1, Hex = "|cff" .. "0F0F0F"}
    Colors.ControlBackground = Colors.DarkGray
    Colors.ControlBorder = Colors.Charcoal
end
____exports.MainInterface = {}
local MainInterface = ____exports.MainInterface
do
    MainInterface.MainInterfaceFrame = CreateFrame("Frame", "Main Frame")
    local InterfaceSettings = (____exports.Settings.CasinoSettings and ____exports.Settings.CasinoSettings.MainInterface) or ({X = 0, Y = 0})
    local Height = 50
    local Width = 50
    MainInterface.MainInterfaceFrame:SetSize(Height, Width)
    MainInterface.MainInterfaceFrame:SetPoint("CENTER", UIParent, "CENTER", 0, 0)
    MainInterface.MainInterfaceFrame:SetMovable(true)
    MainInterface.MainInterfaceFrame:EnableMouse(true)
    MainInterface.MainInterfaceFrame:SetClampedToScreen(true)
    MainInterface.MainInterfaceFrame:SetFrameStrata("LOW")
    MainInterface.MainInterfaceFrame:SetBackdrop({bgFile = "Interface\\ChatFrame\\ChatFrameBackground", edgeFile = "Interface\\ChatFrame\\ChatFrameBackground", edgeSize = 1, tile = true, tileSize = 1})
    MainInterface.MainInterfaceFrame.SetBackground = function(color, borderColor)
        MainInterface.MainInterfaceFrame:SetBackdropColor(color.R, color.G, color.G, color.A)
        MainInterface.MainInterfaceFrame:SetBackdropBorderColor(borderColor.R, borderColor.G, borderColor.G, color.A)
    end
    MainInterface.MainInterfaceFrame.SetBackground(____exports.Colors.Background, ____exports.Colors.Border)
    MainInterface.MainInterfaceFrame:SetScript("OnMouseDown", MainInterface.MainInterfaceFrame.StartMoving)
    MainInterface.MainInterfaceFrame:SetScript(
        "OnMouseUp",
        function()
            InterfaceSettings.X = ({
                MainInterface.MainInterfaceFrame:GetPoint()
            })[4]
            InterfaceSettings.Y = ({
                MainInterface.MainInterfaceFrame:GetPoint()
            })[5]
            print(InterfaceSettings.X, InterfaceSettings.Y)
            MainInterface.MainInterfaceFrame:StopMovingOrSizing()
        end
    )
    MainInterface.MainInterfaceFrame:Show()
    MainInterface.MainButton = CreateFrame("Button")
    MainInterface.MainButton:SetSize(10, 10)
    MainInterface.MainButton:SetPoint("TOPLEFT", MainInterface.MainInterfaceFrame, "TOPLEFT", 0, 0)
    MainInterface.MainButton:SetMovable(true)
    MainInterface.MainButton:EnableMouse(true)
    MainInterface.MainButton:SetClampedToScreen(true)
    MainInterface.MainButton:SetFrameStrata("MEDIUM")
    MainInterface.MainButton:SetBackdrop({bgFile = "Interface\\ChatFrame\\ChatFrameBackground", edgeFile = "Interface\\ChatFrame\\ChatFrameBackground", edgeSize = 1, tile = true, tileSize = 1})
    MainInterface.MainButton.SetBackground = function(color, borderColor)
        MainInterface.MainButton:SetBackdropColor(color.R, color.G, color.G, color.A)
        MainInterface.MainButton:SetBackdropBorderColor(borderColor.R, borderColor.G, borderColor.G, color.A)
    end
    MainInterface.MainButton.OnClick = function() return print("LOL") end
    MainInterface.MainButton:SetScript(
        "OnMouseUp",
        function()
            if MainInterface.MainButton.OnClick then
                MainInterface.MainButton:OnClick()
            else
                print("Nothing Bound")
            end
        end
    )
    MainInterface.MainButton.SetBackground(____exports.Colors.Background, ____exports.Colors.Red)
    MainInterface.MainButton:Show()
    _G.MyInterfaceButton = MainInterface.MainButton
    _G.MyInterfaceFrame = MainInterface.MainInterfaceFrame
end
return ____exports


-- Other/Outputs/Lua/Footer.lua --
-- This file will be the bottom of the addon file and the setfenv scope finishes here, after the end, is back to file scope

end

local function TryLoading()
    C_Timer.After(1, function () 
        if setfenv ~= nil then
            Load()
        else
            TryLoading()
        end
    end)
end

TryLoading()