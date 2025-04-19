@echo off
REM One-time setup script for Mobile Kas App on Windows 11

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

echo Setup complete. You can now run the Laravel development server:
echo php artisan serve

pause
