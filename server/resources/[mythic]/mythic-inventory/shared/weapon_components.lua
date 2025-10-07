_weaponModels = _weaponModels or {}

WEAPON_COMPS = {
	WEAPON_HK416B = {
		{
			type = "magazine",
			attachment = "COMPONENT_HK416B_CLIP_01",
		},
	},
	WEAPON_MP5 = {
		{
			type = "magazine",
			attachment = "COMPONENT_MP5_CLIP_01",
		},
	},
	WEAPON_MG = {
		{
			type = "magazine",
			attachment = "COMPONENT_MG_CLIP_01",
		},
	},
	WEAPON_COMBATMG = {
		{
			type = "magazine",
			attachment = "COMPONENT_COMBATMG_CLIP_01",
		},
	},
	WEAPON_COMBATMG_MK2 = {
		{
			type = "magazine",
			attachment = "COMPONENT_COMBATMG_MK2_CLIP_01",
		},
	},
	WEAPON_COMBATMG_MK2 = {
		{
			type = "magazine",
			attachment = "COMPONENT_COMBATMG_MK2_CLIP_01",
		},
	},
	WEAPON_ASSAULTRIFLE = {
		{
			type = "magazine",
			attachment = "COMPONENT_ASSAULTRIFLE_CLIP_01",
		},
	},
	WEAPON_ASSAULTRIFLE_MK2 = {
		{
			type = "magazine",
			attachment = "COMPONENT_ASSAULTRIFLE_MK2_CLIP_01",
		},
		{
			type = "barrel",
			attachment = "COMPONENT_AT_AR_BARREL_01",
		},
	},
	WEAPON_CARBINERIFLE = {
		{
			type = "magazine",
			attachment = "COMPONENT_CARBINERIFLE_CLIP_01",
		},
	},
	WEAPON_CARBINERIFLE_MK2 = {
		{
			type = "magazine",
			attachment = "COMPONENT_CARBINERIFLE_MK2_CLIP_01",
		},
		{
			type = "barrel",
			attachment = "COMPONENT_AT_CR_BARREL_01",
		},
	},
	WEAPON_BULLPUPRIFLE = {
		{
			type = "magazine",
			attachment = "COMPONENT_BULLPUPRIFLE_CLIP_01",
		},
	},
	WEAPON_BULLPUPRIFLE_MK2 = {
		{
			type = "magazine",
			attachment = "COMPONENT_BULLPUPRIFLE_MK2_CLIP_01",
		},
	},
	WEAPON_MUSKET = {},
	WEAPON_BEANBAG = {
		{
			type = "magazine",
			attachment = "COMPONENT_BEANBAG_CLIP_01",
		},
	},
	WEAPON_COMPACTRIFLE = {
		{
			type = "magazine",
			attachment = "COMPONENT_COMPACTRIFLE_CLIP_01",
		},
	},
	WEAPON_ASSAULTSMG = {
		{
			type = "magazine",
			attachment = "COMPONENT_ASSAULTSMG_CLIP_01",
		},
	},
	WEAPON_GUSENBERG = {
		{
			type = "magazine",
			attachment = "COMPONENT_GUSENBERG_CLIP_01",
		},
	},
	WEAPON_COMBATPDW = {
		{
			type = "magazine",
			attachment = "COMPONENT_COMBATPDW_CLIP_01",
		},
	},
	WEAPON_SMG = {
		{
			type = "magazine",
			attachment = "COMPONENT_SMG_CLIP_01",
		},
	},
	WEAPON_SMG_MK2 = {
		{
			type = "magazine",
			attachment = "COMPONENT_SMG_MK2_CLIP_01",
		},
	},
	WEAPON_MINISMG = {
		{
			type = "magazine",
			attachment = "COMPONENT_MINISMG_CLIP_01",
		},
	},
	WEAPON_MAC10 = {
		{
			type = "magazine",
			attachment = "COMPONENT_MICROSMG_CLIP_01",
		},
	},
	WEAPON_BULLPUPSHOTGUN = {
		{
			type = "magazine",
			attachment = "COMPONENT_BULLPUPSHOTGUN_CLIP_01",
		},
		{
			type = "muzzle",
			attachment = "COMPONENT_AT_AR_SUPP_02",
		}
	},
	WEAPON_HEAVYSHOTGUN = {
		{
			type = "magazine",
			attachment = "COMPONENT_HEAVYSHOTGUN_CLIP_01",
		},
	},
	WEAPON_ASSAULTSHOTGUN = {
		{
			type = "magazine",
			attachment = "COMPONENT_ASSAULTSHOTGUN_CLIP_01",
		},
	},
	WEAPON_PUMPSHOTGUN = {},
	WEAPON_PUMPSHOTGUN_MK2 = {
		{
			type = "magazine",
			attachment = "COMPONENT_PUMPSHOTGUN_MK2_CLIP_01",
		},
	},
	WEAPON_DBSHOTGUN = {},
	WEAPON_SAWNOFFSHOTGUN = {},
	WEAPON_SA80 = {
		{
			type = "magazine",
			attachment = "COMPONENT_MARKOMODS_SA80_CLIP_01",
		},
		{
			type = "grip",
			attachment = "COMPONENT_MARKOMODS_SA80_HANDGUARD_01",
		},
		{
			type = "optic",
			attachment = "COMPONENT_MARKOMODS_SA80_SCOPE_01",
		},
	},
	WEAPON_ADVANCEDRIFLE = {
		
	},
}

CreateThread(function()
	if IsDuplicityVersion() then
		for k, v in pairs(WEAPON_COMPS) do
			WEAPON_PROPS[k] = true
			_weaponModels[k] = true
		end
	end
end)

CreateThread(function()
	if not IsDuplicityVersion() then
		for k, v in pairs(WEAPON_COMPS) do
			local wHash = GetHashKey(k)
			RequestWeaponAsset(wHash, 31, 0)
			while not HasWeaponAssetLoaded(wHash) do
				Wait(1)
			end
		end
	end
end)

CreateThread(function()
	if not IsDuplicityVersion() then
		for k, v in pairs(WEAPON_COMPS) do
			for k2, v2 in ipairs(v) do
				local componentModel = GetWeaponComponentTypeModel(v2.attachment)
				RequestModel(componentModel)
				while not HasModelLoaded(componentModel) do
					Wait(1)
				end
			end
		end
	end
end)
