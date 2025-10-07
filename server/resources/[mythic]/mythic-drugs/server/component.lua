_DRUGS = _DRUGS or {}
local _addictionTemplate = {
	Meth = {
		LastUse = false,
		Factor = 0.0,
	},
	Coke = {
		LastUse = false,
		Factor = 0.0,
	},
	Moonshine = {
		LastUse = false,
		Factor = 0.0,
	},
}

function table.copy(t)
	local u = {}
	for k, v in pairs(t) do
		u[k] = v
	end
	return setmetatable(u, getmetatable(t))
end

AddEventHandler("Drugs:Shared:DependencyUpdate", RetrieveComponents)
function RetrieveComponents()
	Fetch = exports["mythic-base"]:FetchComponent("Fetch")
	Logger = exports["mythic-base"]:FetchComponent("Logger")
	Callbacks = exports["mythic-base"]:FetchComponent("Callbacks")
	Middleware = exports["mythic-base"]:FetchComponent("Middleware")
	Execute = exports["mythic-base"]:FetchComponent("Execute")
	Chat = exports["mythic-base"]:FetchComponent("Chat")
	Inventory = exports["mythic-base"]:FetchComponent("Inventory")
	Crypto = exports["mythic-base"]:FetchComponent("Crypto")
	Vehicles = exports["mythic-base"]:FetchComponent("Vehicles")
	Drugs = exports["mythic-base"]:FetchComponent("Drugs")
	Vendor = exports["mythic-base"]:FetchComponent("Vendor")
end

AddEventHandler("Core:Shared:Ready", function()
	exports["mythic-base"]:RequestDependencies("Drugs", {
		"Fetch",
		"Logger",
		"Callbacks",
		"Middleware",
		"Execute",
		"Chat",
		"Inventory",
		"Crypto",
		"Vehicles",
		"Drugs",
		"Vendor",
	}, function(error)
		if #error > 0 then
			exports["mythic-base"]:FetchComponent("Logger"):Critical("Drugs", "Failed To Load All Dependencies")
			return
		end
		RetrieveComponents()
		RegisterItemUse()
		RunDegenThread()

		Middleware:Add("Characters:Spawning", function(source)
			local char = Fetch:CharacterSource(source)
			if char ~= nil then
				local addictions = char:GetData("Addiction")
				if char:GetData("Addiction") == nil then
					char:SetData("Addiction", _addictionTemplate)
				else
					for k, v in pairs(_addictionTemplate) do
						if addictions[k] == nil then
							addictions[k] = table.copy(v)
						end
					end
					char:SetData("Addiction", addictions)
				end
			end
		end, 1)

		TriggerEvent("Drugs:Server:Startup")
		TriggerEvent("Drugs:Server:StartCookThreads")
	end)
end)

AddEventHandler("Proxy:Shared:RegisterReady", function()
	exports["mythic-base"]:RegisterComponent("Drugs", _DRUGS)
end)
