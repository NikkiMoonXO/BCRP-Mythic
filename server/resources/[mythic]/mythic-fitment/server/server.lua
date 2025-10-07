AddEventHandler("Fitment:Shared:DependencyUpdate", RetrieveComponents)
function RetrieveComponents()
	Callbacks = exports["mythic-base"]:FetchComponent("Callbacks")
	Database = exports["mythic-base"]:FetchComponent("Database")
	Utils = exports["mythic-base"]:FetchComponent("Utils")
	Fetch = exports["mythic-base"]:FetchComponent("Fetch")
	Logger = exports["mythic-base"]:FetchComponent("Logger")
	Inventory = exports["mythic-base"]:FetchComponent("Inventory")
end

AddEventHandler("Core:Shared:Ready", function()
	exports["mythic-base"]:RequestDependencies("Fitment", {
		"Fetch",
		"Logger",
		"Database",
		"Callbacks",
		"Utils",
		"Inventory",
	}, function(error)
		if #error > 0 then
			return
		end -- Do something to handle if not all dependencies loaded
		RetrieveComponents()

		Inventory.Items:RegisterUse("camber_controller", "Vehicles", function(source, item)
			Callbacks:ClientCallback(source, "Vehicles:UseCamberController", {}, function(veh)
				if not veh then
					return
				end
				veh = NetworkGetEntityFromNetworkId(veh)
				if veh and DoesEntityExist(veh) then
					local vehState = Entity(veh).state
					if not vehState.VIN then
						return
					end

					TriggerClientEvent("Fitment:Client:CamberController:UseItem", source)
				end
			end)
		end)
	end)
end)
