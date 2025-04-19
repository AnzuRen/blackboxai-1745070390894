@extends('layouts.app')

@section('content')
<div class="flex flex-col space-y-6">
    <h2 class="text-xl font-semibold">Hi, {{ auth()->user()->name ?? auth()->user()->username }}</h2>

    <div class="bg-darkergray p-4 rounded shadow">
        <h3 class="font-semibold mb-2">Pengumuman</h3>
        <p>Tidak ada pengumuman saat ini.</p>
    </div>

    <div class="flex justify-around mt-6">
        <a href="https://google.com" target="_blank" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
            Monitor
        </a>
        <a href="https://google.com" target="_blank" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
            Tool
        </a>
        <a href="https://google.com" target="_blank" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
            Database
        </a>
    </div>
</div>
@endsection
