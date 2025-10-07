-- Death reasons
local deathHashTable = {
	[`WEAPON_ANIMAL`] = "Animal",
	[`WEAPON_COUGAR`] = "Cougar",
	[`WEAPON_ADVANCEDRIFLE`] = "Advanced Rifle",
	[`WEAPON_APPISTOL`] = "AP Pistol",
	[`WEAPON_ASSAULTRIFLE`] = "Assault Rifle",
	[`WEAPON_ASSAULTRIFLE_MK2`] = "Assault Rifke Mk2",
	[`WEAPON_ASSAULTSHOTGUN`] = "Assault Shotgun",
	[`WEAPON_ASSAULTSMG`] = "Assault SMG",
	[`WEAPON_AUTOSHOTGUN`] = "Automatic Shotgun",
	[`WEAPON_BULLPUPRIFLE`] = "Bullpup Rifle",
	[`WEAPON_BULLPUPRIFLE_MK2`] = "Bullpup Rifle Mk2",
	[`WEAPON_BULLPUPSHOTGUN`] = "Bullpup Shotgun",
	[`WEAPON_CARBINERIFLE`] = "Carbine Rifle",
	[`WEAPON_CARBINERIFLE_MK2`] = "PD .762",
	[`WEAPON_COMBATMG`] = "Combat MG",
	[`WEAPON_COMBATMG_MK2`] = "Combat MG Mk2",
	[`WEAPON_COMBATPDW`] = "Combat PDW",
	[`WEAPON_COMBATPISTOL`] = "Combat Pistol",
	[`WEAPON_COMPACTRIFLE`] = "Compact Rifle",
	[`WEAPON_DBSHOTGUN`] = "Double Barrel Shotgun",
	[`WEAPON_DOUBLEACTION`] = "Double Action Revolver",
	[`WEAPON_FLAREGUN`] = "Flare gun",
	[`WEAPON_GUSENBERG`] = "Gusenberg",
	[`WEAPON_HEAVYPISTOL`] = "Heavy Pistol",
	[`WEAPON_HEAVYSHOTGUN`] = "Heavy Shotgun",
	[`WEAPON_HEAVYSNIPER`] = "Heavy Sniper",
	[`WEAPON_HEAVYSNIPER_MK2`] = "Heavy Sniper",
	[`WEAPON_MACHINEPISTOL`] = "Machine Pistol",
	[`WEAPON_MARKSMANPISTOL`] = "Marksman Pistol",
	[`WEAPON_MARKSMANRIFLE`] = "Marksman Rifle",
	[`WEAPON_MARKSMANRIFLE_MK2`] = "Marksman Rifle Mk2",
	[`WEAPON_HK416B`] = ".556 LR",
	[`WEAPON_BEANBAG`] = "PD Beanbag",
	[`WEAPON_MG`] = "MG",
	[`WEAPON_MICROSMG`] = "Micro SMG",
	[`WEAPON_MAC10`] = "MAC 10",
	[`WEAPON_MINIGUN`] = "Minigun",
	[`WEAPON_MINISMG`] = "Mini SMG",
	[`WEAPON_MUSKET`] = "Musket",
	[`WEAPON_PISTOL`] = "Pistol",
	[`WEAPON_PISTOL_MK2`] = "PD 9MM",
	[`WEAPON_PISTOL50`] = "Pistol .50",
	[`WEAPON_PUMPSHOTGUN`] = "Pump Shotgun",
	[`WEAPON_PUMPSHOTGUN_MK2`] = "Pump Shotgun Mk2",
	[`WEAPON_RAILGUN`] = "Railgun",
	[`WEAPON_REVOLVER`] = "Revolver",
	[`WEAPON_REVOLVER_MK2`] = "Revolver Mk2",
	[`WEAPON_SAWNOFFSHOTGUN`] = "Sawnoff Shotgun",
	[`WEAPON_SMG`] = "SMG",
	[`WEAPON_SMG_MK2`] = "SIG MPX",
	[`WEAPON_SNIPERRIFLE`] = "Sniper Rifle",
	[`WEAPON_SNSPISTOL`] = "SNS Pistol",
	[`WEAPON_SNSPISTOL_MK2`] = "SNS Pistol Mk2",
	[`WEAPON_SPECIALCARBINE`] = "Special Carbine",
	[`WEAPON_SPECIALCARBINE_MK2`] = "Special Carbine Mk2",
	[`WEAPON_STINGER`] = "Stinger",
	[`WEAPON_STUNGUN`] = "Stungun",
	[`WEAPON_VINTAGEPISTOL`] = "Vintage Pistol",
	[`VEHICLE_WEAPON_PLAYER_LASER`] = "Vehicle Lasers",
	[`WEAPON_FIRE`] = "Fire",
	[`WEAPON_FLARE`] = "Flare",
	[`WEAPON_FLAREGUN`] = "Flaregun",
	[`WEAPON_MOLOTOV`] = "Molotov",
	[`WEAPON_PETROLCAN`] = "Petrol Can",
	[`WEAPON_HELI_CRASH`] = "Helicopter Crash",
	[`WEAPON_RAMMED_BY_CAR`] = "Rammed by Vehicle",
	[`WEAPON_RUN_OVER_BY_CAR`] = "Ranover by Vehicle",
	[`VEHICLE_WEAPON_SPACE_ROCKET`] = "Vehicle Space Rocket",
	[`VEHICLE_WEAPON_TANK`] = "Tank",
	[`WEAPON_AIRSTRIKE_ROCKET`] = "Airstrike Rocket",
	[`WEAPON_AIR_DEFENCE_GUN`] = "Air Defence Gun",
	[`WEAPON_COMPACTLAUNCHER`] = "Compact Launcher",
	[`WEAPON_EXPLOSION`] = "Explosion",
	[`WEAPON_FIREWORK`] = "Firework",
	[`WEAPON_GRENADE`] = "Grenade",
	[`WEAPON_GRENADELAUNCHER`] = "Grenade Launcher",
	[`WEAPON_HOMINGLAUNCHER`] = "Homing Launcher",
	[`WEAPON_PASSENGER_ROCKET`] = "Passenger Rocket",
	[`WEAPON_PIPEBOMB`] = "Pipe bomb",
	[`WEAPON_PROXMINE`] = "Proximity Mine",
	[`WEAPON_RPG`] = "RPG",
	[`WEAPON_STICKYBOMB`] = "Sticky Bomb",
	[`WEAPON_VEHICLE_ROCKET`] = "Vehicle Rocket",
	[`WEAPON_BZGAS`] = "BZ Gas",
	[`WEAPON_FIREEXTINGUISHER`] = "Fire Extinguisher",
	[`WEAPON_SMOKEGRENADE`] = "Smoke Grenade",
	[`WEAPON_BATTLEAXE`] = "Battleaxe",
	[`WEAPON_BOTTLE`] = "Bottle",
	[`WEAPON_KNIFE`] = "Knife",
	[`WEAPON_MACHETE`] = "Machete",
	[`WEAPON_SWITCHBLADE`] = "Switch Blade",
	[`OBJECT`] = "Object",
	[`VEHICLE_WEAPON_ROTORS`] = "Vehicle Rotors",
	[`WEAPON_BALL`] = "Ball",
	[`WEAPON_BAT`] = "Bat",
	[`WEAPON_CROWBAR`] = "Crowbar",
	[`WEAPON_FLASHLIGHT`] = "Flashlight",
	[`WEAPON_GOLFCLUB`] = "Golfclub",
	[`WEAPON_HAMMER`] = "Hammer",
	[`WEAPON_HATCHET`] = "Hatchet",
	[`WEAPON_HIT_BY_WATER_CANNON`] = "Water Cannon",
	[`WEAPON_KNUCKLE`] = "Knuckle",
	[`WEAPON_NIGHTSTICK`] = "Night Stick",
	[`WEAPON_POOLCUE`] = "Pool Cue",
	[`WEAPON_SNOWBALL`] = "Snowball",
	[`WEAPON_UNARMED`] = "Fist",
	[`WEAPON_WRENCH`] = "Wrench",
	[`WEAPON_DROWNING`] = "Drowned",
	[`WEAPON_DROWNING_IN_VEHICLE`] = "Drowned in Vehicle",
	[`WEAPON_BARBED_WIRE`] = "Barbed Wire",
	[`WEAPON_BLEEDING`] = "Bleed",
	[`WEAPON_ELECTRIC_FENCE`] = "Electric Fence",
	[`WEAPON_EXHAUSTION`] = "Exhaustion",
	[`WEAPON_FALL`] = "Falling",
	[`WEAPON_KATANA`] = "Katana",
	[`WEAPON_PONY`] = "Pony",
	[`WEAPON_SHOVEL`] = "Shovel",
	[`WEAPON_AK47`] = "AK-47",
	[`WEAPON_MP5`] = "SB54",
}

AddEventHandler("Ped:Client:Died", function(execution)
	local ped = LocalPlayer.state.ped

	local killerPed = GetPedSourceOfDeath(ped)
	local causeHash = GetPedCauseOfDeath(ped)
	local killer = false

	if killerPed == ped then
		killer = false
	else
		if IsEntityAPed(killerPed) and IsPedAPlayer(killerPed) then
			killer = NetworkGetPlayerIndexFromPed(killerPed)
		elseif IsEntityAVehicle(killerPed) then
			local drivingPed = GetPedInVehicleSeat(killerPed, -1)
			if IsEntityAPed(drivingPed) == 1 and IsPedAPlayer(drivingPed) then
				killer = NetworkGetPlayerIndexFromPed(drivingPed)
			end
		end
	end

	local deathReason = deathHashTable[causeHash] or string.format("Unknown: %s", causeHash)

	if not killer then
		if deathReason ~= "unknown" then
			deathReason = "Suicide (" .. deathReason .. ")"
		else
			deathReason = "Suicide"
		end
	else
		killer = GetPlayerServerId(killer)
	end

	TriggerServerEvent("Damage:Server:LogDeath", killer, deathReason, execution)
end)
