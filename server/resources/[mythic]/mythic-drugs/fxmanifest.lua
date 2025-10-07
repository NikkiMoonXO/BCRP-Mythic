fx_version("cerulean")
games({ "gta5" })
lua54("yes")

client_script("@mythic-base/components/cl_error.lua")
client_script("@mythic-pwnzor/client/check.lua")
server_script("@oxmysql/lib/MySQL.lua")

shared_scripts({
	"shared/**/*.lua",
})

client_scripts({
	"@mythic-damage/shared/weapons.lua",
	"client/**/*.lua",
})

server_scripts({
	"server/**/*.lua",
})
