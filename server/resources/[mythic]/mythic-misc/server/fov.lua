local target_fov = 65.0

CreateThread(function()
	SetConvarReplicated("cam_vehicleFirstPersonFOV", target_fov)
end)