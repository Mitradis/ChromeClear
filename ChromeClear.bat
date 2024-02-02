taskkill /f /im chrome.exe
taskkill /f /im GoogleUpdate.exe
TIMEOUT /T 2 /NOBREAK >nul
rd /s /q "%programfiles(x86)%\Google\Update"
mkdir "%programfiles(x86)%\Google\Update"
icacls "%programfiles(x86)%\Google\Update" /deny *S-1-1-0:(W,D,X,R,RX,M,F) *S-1-5-7:(W,D,X,R,RX,M,F)
for /f "tokens=*" %%i in ('dir "%programfiles%\Google\Chrome\Application\" /b /a:d') do (
	if /i "%%i" neq "SetupMetrics" set version=%%i
)
rd /s /q "%programfiles%\Google\Chrome\Application\%version%\Installer"
del /f /q "%programfiles%\Google\Chrome\Application\%version%\elevation_service.exe"
del /f /q "%programfiles%\Google\Chrome\Application\%version%\notification_helper.exe"
sc delete gupdate
sc delete gupdatem
sc delete GoogleChromeElevationService
cd %windir%\System32\Tasks
for /f "tokens=*" %%i in ('dir "GoogleUpdate*" /b') do (
	schtasks /delete /tn "%%i" /f
)
reg delete HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Google\Update /f
rd /s /q "%userprofile%\AppData\Local\Google\Chrome\User Data\Default\Cache\Cache_Data"
mkdir "%userprofile%\AppData\Local\Google\Chrome\User Data\Default\Cache\Cache_Data"
icacls "%userprofile%\AppData\Local\Google\Chrome\User Data\Default\Cache\Cache_Data" /deny *S-1-1-0:(W,D,X,R,RX,M,F) *S-1-5-7:(W,D,X,R,RX,M,F)
rd /s /q "%userprofile%\AppData\Local\Google\Chrome\User Data\Default\Code Cache\js"
mkdir "%userprofile%\AppData\Local\Google\Chrome\User Data\Default\Code Cache\js"
icacls "%userprofile%\AppData\Local\Google\Chrome\User Data\Default\Code Cache\js" /deny *S-1-1-0:(W,D,X,R,RX,M,F) *S-1-5-7:(W,D,X,R,RX,M,F)
rd /s /q "%userprofile%\AppData\Local\Google\Chrome\User Data\Default\Service Worker\CacheStorage"
mkdir "%userprofile%\AppData\Local\Google\Chrome\User Data\Default\Service Worker\CacheStorage"
icacls "%userprofile%\AppData\Local\Google\Chrome\User Data\Default\Service Worker\CacheStorage" /deny *S-1-1-0:(W,D,X,R,RX,M,F) *S-1-5-7:(W,D,X,R,RX,M,F)
rd /s /q "%userprofile%\AppData\Local\Google\Chrome\User Data\BrowserMetrics"
mkdir "%userprofile%\AppData\Local\Google\Chrome\User Data\BrowserMetrics"
icacls "%userprofile%\AppData\Local\Google\Chrome\User Data\BrowserMetrics" /deny *S-1-1-0:(W,D,X,R,RX,M,F) *S-1-5-7:(W,D,X,R,RX,M,F)
rd /s /q "%userprofile%\AppData\Local\Google\Chrome\User Data\component_crx_cache"
mkdir "%userprofile%\AppData\Local\Google\Chrome\User Data\component_crx_cache"
icacls "%userprofile%\AppData\Local\Google\Chrome\User Data\component_crx_cache" /deny *S-1-1-0:(W,D,X,R,RX,M,F) *S-1-5-7:(W,D,X,R,RX,M,F)
rd /s /q "%userprofile%\AppData\Local\Google\Chrome\User Data\GraphiteDawnCache"
mkdir "%userprofile%\AppData\Local\Google\Chrome\User Data\GraphiteDawnCache"
icacls "%userprofile%\AppData\Local\Google\Chrome\User Data\GraphiteDawnCache" /deny *S-1-1-0:(W,D,X,R,RX,M,F) *S-1-5-7:(W,D,X,R,RX,M,F)
rd /s /q "%userprofile%\AppData\Local\Google\Chrome\User Data\GrShaderCache"
mkdir "%userprofile%\AppData\Local\Google\Chrome\User Data\GrShaderCache"
icacls "%userprofile%\AppData\Local\Google\Chrome\User Data\GrShaderCache" /deny *S-1-1-0:(W,D,X,R,RX,M,F) *S-1-5-7:(W,D,X,R,RX,M,F)
rd /s /q "%userprofile%\AppData\Local\Google\Chrome\User Data\ShaderCache"
mkdir "%userprofile%\AppData\Local\Google\Chrome\User Data\ShaderCache"
icacls "%userprofile%\AppData\Local\Google\Chrome\User Data\ShaderCache" /deny *S-1-1-0:(W,D,X,R,RX,M,F) *S-1-5-7:(W,D,X,R,RX,M,F)
pause
