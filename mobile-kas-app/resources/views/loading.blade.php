<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Loading - Mobile Kas App</title>
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
<body class="bg-darkgray flex items-center justify-center min-h-screen">
    <div class="flex flex-col items-center">
        <img src="/assets/logo.png" alt="Logo" class="w-24 h-24 mb-4" />
        <p class="text-gray-300 text-lg">Loading...</p>
    </div>

    <script>
        setTimeout(() => {
            window.location.href = "{{ route('login') }}";
        }, 4000); // 4 seconds
    </script>
</body>
</html>
