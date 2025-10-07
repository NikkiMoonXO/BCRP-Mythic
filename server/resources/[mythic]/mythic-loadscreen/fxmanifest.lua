

fx_version("cerulean")
games({"gta5"})

version("1.0.0")

loadscreen("html/index.html")
client_script("@elysium-base/components/cl_error.lua")
client_script("@elysium-pwnzor/client/check.lua")
loadscreen_manual_shutdown("yes")

files({
	"html/index.html",
	"html/assets/logo.png",
	"html/css/style.css",
	"html/js/main.js",
	"html/assets/bgvideo.mp4",
	"html/assets/*.mp3",
})
