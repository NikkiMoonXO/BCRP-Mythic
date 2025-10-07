fx_version("cerulean")
games({ "gta5" })
lua54("yes")
client_script("@mythic-base/components/cl_error.lua")
client_script("@mythic-pwnzor/client/check.lua")

description("Mythic Framework Wheel Fitment For Panda Because He is a Needy Cunt")
name("Mythic Framework: mythic-fitment")
author("Dr Nick")
version("v1.0.0")
url("https://www.mythicrp.com")

client_scripts({
	"client/**/*.lua",
})

server_scripts({
	"server/**/*.lua",
})
