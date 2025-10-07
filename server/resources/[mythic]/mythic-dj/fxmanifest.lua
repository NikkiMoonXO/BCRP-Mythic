name "DJBooth"
author "katahtonic"
version "v1.1"
description 'DJBooth Edit By Katahtonic'
fx_version "cerulean"
game "gta5"

client_scripts {
	"@mythic-polyzone/client.lua",
	"@mythic-polyzone/BoxZone.lua",
	"@mythic-polyzone/EntityZone.lua",
	"@mythic-polyzone/CircleZone.lua",
	"@mythic-polyzone/ComboZone.lua",
    'client.lua'
}

shared_script { 'config.lua' }
server_script { 'server.lua' }

dependency 'xsound'

lua54 'yes'