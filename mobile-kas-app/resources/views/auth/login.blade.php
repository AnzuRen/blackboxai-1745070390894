@extends('layouts.app')

@section('content')
<div class="flex flex-col justify-center h-screen max-w-md mx-auto">
    <div class="mb-6 text-center">
        <h1 class="text-4xl font-bold text-gray-100">Login</h1>
    </div>
    <form method="POST" action="{{ route('login.post') }}" class="bg-darkergray p-6 rounded-lg shadow-md">
        @csrf
        <div class="mb-4">
            <label for="username" class="block text-gray-300 mb-2">Username</label>
            <input id="username" name="username" type="text" required autofocus
                class="w-full px-3 py-2 rounded bg-darkgray text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div class="mb-6">
            <label for="password" class="block text-gray-300 mb-2">Password</label>
            <input id="password" name="password" type="password" required
                class="w-full px-3 py-2 rounded bg-darkgray text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        @if ($errors->any())
            <div class="mb-4 text-red-500 text-sm">
                {{ $errors->first() }}
            </div>
        @endif
        <button type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition duration-200">
            Login
        </button>
    </form>
</div>
@endsection
