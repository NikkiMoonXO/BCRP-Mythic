fx_version 'adamant'
game "gta5"

author "NVE Team - cherry"
version "1.0.0"
description "First-Person FOV Adjustments"

files {
    'ui/index.html',
	"server.lua"
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    'server/*.lua'
}


ui_page 'ui/index.html'

lua54 "yes"
use_experimental_fxv2_oal "yes"
