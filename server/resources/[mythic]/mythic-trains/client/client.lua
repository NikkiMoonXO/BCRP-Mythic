local stations = {
    { node = 179, name = "Strawberry" },
    { node = 271, name = "Puerto Del Sol" },
    { node = 388, name = "LSIA Parking" },
    { node = 434, name = "LSIA Terminal 4" },
    { node = 530, name = "LSIA Terminal 4" },
    { node = 578, name = "LSIA Parking" },
    { node = 689, name = "Puerto Del Sol" },
    { node = 782, name = "Strawberry" },
    { node = 1078, name = "Burton" },
    { node = 1162, name = "Portola Drive" },
    { node = 1233, name = "Del Perro" },
    { node = 1331, name = "Little Seoul" },
    { node = 1397, name = "Pillbox South" },
    { node = 1522, name = "Davis" },
    { node = 1649, name = "Davis" },
    { node = 1791, name = "Pillbox South" },
    { node = 1869, name = "Little Seoul" },
    { node = 1977, name = "Del Perro" },
    { node = 2066, name = "Portola Drive" },
    { node = 2153, name = "Burton" },
    { node = 2246, name = "Strawberry" }
}

local trains = {}
local InTrain = false
local currentNode = nil
local trainBlips = {}
local debug = false --Change this if you want debug prints.
local addBlipToTrain = false --Change this if you want to add blips to trains in your zone.

function initTrainSystem()
    SwitchTrainTrack(0, true)
    SwitchTrainTrack(3, true)
    SetTrainTrackSpawnFrequency(0, 120000)
    SetRandomTrains(true)
    SetTrainsForceDoorsOpen(false)
	if debug then
    	print("Train system initialized.")
	end
end

function getTrains()
    local trainSystem = {}
    local vehicles = GetGamePool("CVehicle")
    local expectedTrainHash = GetHashKey("metrotrain")
	if debug then
    	print("Scanning all vehicles for trains. Expected hash: " .. tostring(expectedTrainHash))
	end

    for _, vehicle in ipairs(vehicles) do
        local model = GetEntityModel(vehicle)

        if model == expectedTrainHash then
            local vehicleCoords = GetEntityCoords(vehicle)
			if debug then
            	print("Train found! vehicle: " .. vehicle)
			end

            table.insert(trainSystem, {
                vehicle = vehicle,
                distance = 0.0,
                speed = GetEntitySpeed(vehicle)
            })
        end
    end

    return trainSystem
end

function addBlipsToTrains(trains)
    for _, train in ipairs(trains) do
        if trainBlips[train.vehicle] == nil then
			if debug then
            	print("Creating blip for train vehicle " .. train.vehicle)
			end

            local blip = AddBlipForEntity(train.vehicle)
            SetBlipSprite(blip, 795)
            SetBlipColour(blip, 3)
            SetBlipScale(blip, 0.7)
            SetBlipAsShortRange(blip, true)
            BeginTextCommandSetBlipName("STRING")
            AddTextComponentString("Train")
            EndTextCommandSetBlipName(blip)

            trainBlips[train.vehicle] = blip
        end
    end
end

-- Main game loop
Citizen.CreateThread(function()
    initTrainSystem()

    while true do
        Citizen.Wait(1000)

        local player = PlayerPedId()
        local coords = GetEntityCoords(player)
		if debug then
        	print("Checking for nearby trains...")
		end

        trains = getTrains(coords)

        if #trains >= 1 then
            local train = trains[1].vehicle
            currentNode = train and GetTrainCurrentTrackNode(train) or nil
			if debug then
            	print("Closest train found. Current track node: " .. tostring(currentNode))
			end
        else
			if debug then
            	print("No trains nearby.")
			end
        end

        InTrain = IsPedInAnyTrain(player)
        if InTrain then print("Player is in a train.") end
		if addBlipToTrain then
       		addBlipsToTrains(trains)
		end
    end
end)