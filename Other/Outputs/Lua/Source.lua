-- Lua Library inline imports
function __TS__ObjectKeys(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = key
    end
    return result
end

C_Timer.After(
    2,
    function()
        print(
            "Hello",
            UnitName("Player"),
            "thank you for using",
            AddonName,
            "!"
        )
        local x = __TS__ObjectKeys({})
        RunMacroText("/jump")
    end
)
