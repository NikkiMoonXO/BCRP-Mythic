_weaponModels = _weaponModels or {}

WEAPON_PROPS = {
    { type = 'weapon', item = "WEAPON_BULLPUPSHOTGUN", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_MG", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_COMBATMG", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_COMBATMG_MK2", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_HEAVYSHOTGUN", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_ASSAULTSHOTGUN", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_PUMPSHOTGUN", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_PUMPSHOTGUN_MK2", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_DBSHOTGUN", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_SAWNOFFSHOTGUN", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_ASSAULTRIFLE", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_ASSAULTRIFLE_MK2", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_CARBINERIFLE", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_CARBINERIFLE_MK2", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_BULLPUPRIFLE", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_BULLPUPRIFLE_MK2", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_MUSKET", override = true, x = 0.2, y = -0.155, z = 0.155, rx = 0.0, ry = 0.0, rz = 180.0 },
    { type = 'weapon', item = "WEAPON_HK416B", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_COMPACTRIFLE", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_ASSAULTSMG", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_GUSENBERG", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_COMBATPDW", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_SMG", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_SMG_MK2", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_MP5", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_MINISMG", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_MAC10", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_BEANBAG", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'weapon', item = "WEAPON_SNIPERRIFLE", x = 0.0, y = 0.0, z = 0.0, rx = 0.0, ry = 0.0, rz = 0.0 },
    { type = 'melee', item = "WEAPON_MACHETE", model = `w_me_machette_lr`, x = 0.2, y = -0.125, z = -0.15, rx = 5.0, ry = -60.0, rz = 0.0 },
    { type = 'melee', item = "WEAPON_PONY", model = `w_me_pony`, x = 0.4, y = -0.125, z = -0.25, rx = 5.0, ry = -60.0, rz = 0.0 },
    -- { type = 'melee', item = "WEAPON_BAT", model = `w_me_bat`, x = 0.2, y = -0.125, z = -0.15, rx = 5.0, ry = -60.0, rz = 0.0 },
    -- { type = 'melee', item = "WEAPON_GOLFCLUB", model = `w_me_gclub`, x = 0.35, y = -0.125, z = -0.15, rx = 5.0, ry = -60.0, rz = 0.0 },
    -- { type = 'melee', item = "WEAPON_POOLCUE", model = `w_me_poolcue`, x = 0.2, y = -0.125, z = -0.15, rx = 5.0, ry = -60.0, rz = 0.0 },
    -- { type = 'melee', item = "WEAPON_SHOVEL", model = `w_me_SHOVEL`, x = 0.3, y = -0.125, z = -0.25, rx = 85.0, ry = -75.0, rz = 0.0 },

    { type = 'object', item = "moneybag", model = `prop_money_bag_01`, x = -0.55, y = -0.11, z = -0.14, rx = 0.0, ry = 90.0, rz = 0.0 },
}

CreateThread(function()
    for k, v in ipairs(WEAPON_PROPS) do
        WEAPON_PROPS[v.item] = v
        if v.model ~= nil then
            _weaponModels[v.model] = true
        end
    end
end)