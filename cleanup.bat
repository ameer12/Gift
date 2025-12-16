@echo off
echo Cleaning up old node_modules...

if exist frontend\node_modules (
    echo Removing frontend\node_modules...
    rmdir /s /q frontend\node_modules
)

if exist backend\node_modules (
    echo Removing backend\node_modules...
    rmdir /s /q backend\node_modules
)

if exist node_modules (
    echo Removing root node_modules...
    rmdir /s /q node_modules
)

echo.
echo Cleanup complete!
echo Now run: npm install
echo.
pause
