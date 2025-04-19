@echo off
REM Laragon compatible installer and server starter for Mobile Kas App on Windows 11

REM Check if composer is installed
composer --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Composer is not installed. Please install Composer first: https://getcomposer.org/download/
    pause
    exit /b 1
)

REM Check if PHP is installed
php -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo PHP is not installed or not in PATH. Please install PHP and add it to PATH.
    pause
    exit /b 1
)

REM Install Laravel dependencies
echo Installing Laravel dependencies...
composer install

REM Generate application key
echo Generating application key...
php artisan key:generate

REM Run database migrations
echo Running database migrations...
php artisan migrate

REM Laragon typically uses Apache, so no need to start built-in server here
echo Setup complete. You can now open Laragon and start Apache server.
echo Place this project folder inside Laragon's www directory if not already.

pause
