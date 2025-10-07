AddEventHandler("Hospital:Shared:DependencyUpdate", PrisonHospitalComponents)
function PrisonHospitalComponents()
	Callbacks = exports["mythic-base"]:FetchComponent("Callbacks")
	Notification = exports["mythic-base"]:FetchComponent("Notification")
	Damage = exports["mythic-base"]:FetchComponent("Damage")
	Notification = exports["mythic-base"]:FetchComponent("Notification")
	Targeting = exports["mythic-base"]:FetchComponent("Targeting")
	Hospital = exports["mythic-base"]:FetchComponent("Hospital")
	Progress = exports["mythic-base"]:FetchComponent("Progress")
	PedInteraction = exports["mythic-base"]:FetchComponent("PedInteraction")
	Escort = exports["mythic-base"]:FetchComponent("Escort")
	Action = exports["mythic-base"]:FetchComponent("Action")
	Polyzone = exports["mythic-base"]:FetchComponent("Polyzone")
	Animations = exports["mythic-base"]:FetchComponent("Animations")
	Inventory = exports["mythic-base"]:FetchComponent("Inventory")
end

AddEventHandler("Core:Shared:Ready", function()
	exports["mythic-base"]:RequestDependencies("Hospital", {
		"Callbacks",
		"Notification",
		"Damage",
		"Targeting",
		"Hospital",
		"Progress",
		"PedInteraction",
		"Escort",
		"Polyzone",
		"Action",
		"Animations",
		"Inventory",
	}, function(error)
		if #error > 0 then
			return
		end
		PrisonHospitalComponents()
		PrisonHospitalInit()
		PrisonVisitation()
	end)
end)
