AddEventHandler("Damage:Shared:DependencyUpdate", PrisonHospitalComponents)
function PrisonHospitalComponents()
	Callbacks = exports["mythic-base"]:FetchComponent("Callbacks")
	Middleware = exports["mythic-base"]:FetchComponent("Middleware")
	Fetch = exports["mythic-base"]:FetchComponent("Fetch")
	Damage = exports["mythic-base"]:FetchComponent("Damage")
	Hospital = exports["mythic-base"]:FetchComponent("Hospital")
	Crypto = exports["mythic-base"]:FetchComponent("Crypto")
	Phone = exports["mythic-base"]:FetchComponent("Phone")
	Execute = exports["mythic-base"]:FetchComponent("Execute")
	Chat = exports["mythic-base"]:FetchComponent("Chat")
	Billing = exports["mythic-base"]:FetchComponent("Billing")
	Inventory = exports["mythic-base"]:FetchComponent("Inventory")
	Labor = exports["mythic-base"]:FetchComponent("Labor")
	Jobs = exports["mythic-base"]:FetchComponent("Jobs")
	Handcuffs = exports["mythic-base"]:FetchComponent("Handcuffs")
	Ped = exports["mythic-base"]:FetchComponent("Ped")
	Routing = exports["mythic-base"]:FetchComponent("Routing")
	Pwnzor = exports["mythic-base"]:FetchComponent("Pwnzor")
	Banking = exports["mythic-base"]:FetchComponent("Banking")
end

AddEventHandler("Core:Shared:Ready", function()
	exports["mythic-base"]:RequestDependencies("PrisonHospital", {
		"Callbacks",
		"Middleware",
		"Fetch",
		"Damage",
		"Hospital",
		"Crypto",
		"Phone",
		"Execute",
		"Chat",
		"Billing",
		"Inventory",
		"Labor",
		"Jobs",
		"Handcuffs",
		"Ped",
		"Routing",
		"Pwnzor",
		"Banking",
	}, function(error)
		if #error > 0 then
			return
		end -- Do something to handle if not all dependencies loaded
		PrisonHospitalComponents()
		PrisonHospitalCallbacks()
	end)
end)
