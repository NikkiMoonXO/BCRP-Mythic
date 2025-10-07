local _timeout = false

AddEventHandler("Escort:Shared:DependencyUpdate", RetrieveComponents)
function RetrieveComponents()
	Callbacks = exports["mythic-base"]:FetchComponent("Callbacks")
	Utils = exports["mythic-base"]:FetchComponent("Utils")
	Logger = exports["mythic-base"]:FetchComponent("Logger")
	Game = exports["mythic-base"]:FetchComponent("Game")
	Stream = exports["mythic-base"]:FetchComponent("Stream")
	Keybinds = exports["mythic-base"]:FetchComponent("Keybinds")
	Notification = exports["mythic-base"]:FetchComponent("Notification")
	Targeting = exports["mythic-base"]:FetchComponent("Targeting")
	Progress = exports["mythic-base"]:FetchComponent("Progress")
	Hud = exports["mythic-base"]:FetchComponent("Hud")
	Escort = exports["mythic-base"]:FetchComponent("Escort")
	Vehicles = exports["mythic-base"]:FetchComponent("Vehicles")
end

AddEventHandler("Core:Shared:Ready", function()
	exports["mythic-base"]:RequestDependencies("Escort", {
		"Callbacks",
		"Utils",
		"Logger",
		"Game",
		"Stream",
		"Keybinds",
		"Notification",
		"Targeting",
		"Progress",
		"Hud",
		"Escort",
		"Vehicles",
	}, function(error)
		if #error > 0 then
			return
		end
		RetrieveComponents()

		Keybinds:Add("escort", "k", "keyboard", "Escort", function()
			if _timeout then
				Notification:Error("Stop spamming you pepega.")
				return
			end
			_timeout = true
			DoEscort()
			Citizen.SetTimeout(1000, function()
				_timeout = false
			end)
		end)

		Callbacks:RegisterClientCallback("Escort:StopEscort", function(data, cb)
			DetachEntity(LocalPlayer.state.ped, true, true)
			cb(true)
		end)
	end)
end)

ESCORT = {
	DoEscort = function(self, target, tPlayer)
		if target ~= nil then
			if LocalPlayer.state.AllowEscorting == false then
				Notification:Error("Unable to escort in this location.")
				return
			end
			Callbacks:ServerCallback("Escort:DoEscort", {
				target = target,
				inVeh = IsPedInAnyVehicle(GetPlayerPed(tPlayer)),
				isSwimming = IsPedSwimming(LocalPlayer.state.ped),
			}, function(state)
				if state then
					StartEscortThread(tPlayer)
				end
			end)
		end
	end,
	StopEscort = function(self)
		Callbacks:ServerCallback("Escort:StopEscort", function() end)
	end,
}

AddEventHandler("Proxy:Shared:RegisterReady", function()
	exports["mythic-base"]:RegisterComponent("Escort", ESCORT)
end)

AddEventHandler("Interiors:Exit", function()
	if LocalPlayer.state.isEscorting ~= nil then
		Escort:StopEscort()
	end
end)

--[[ TODO 
Add Dragging When Dead 
Place In vehicle while Dead Slump Animation
Police Drag Maybe Cuff Also
Get In Trunk or Place in trunk???
]]
