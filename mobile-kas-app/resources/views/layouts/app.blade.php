<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mobile Kas App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        darkgray: '#1f2937',
                        darkergray: '#111827',
                        black: '#000000',
                    },
                },
            },
        }
    </script>
</head>
<body class="bg-darkgray text-gray-200 min-h-screen flex flex-col">
    <div class="container mx-auto p-4 max-w-md w-full">
        @yield('content')
    </div>
</body>
</html>
