<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('tasks', function () {
    return Inertia::render('Tasks');
})->middleware(['auth', 'verified'])->name('tasks');

Route::middleware(['auth', 'verified'])->group(function () {
    // Board routes without member check
    Route::get('boards', [App\Http\Controllers\BoardController::class, 'index'])->name('boards.index');
    Route::get('boards/create', [App\Http\Controllers\BoardController::class, 'create'])->name('boards.create');
    Route::post('boards', [App\Http\Controllers\BoardController::class, 'store'])->name('boards.store');

    // Board-scoped routes (with middleware)
    Route::middleware('board.member')->group(function () {
        // Board routes that require membership
        Route::get('boards/{board}', [App\Http\Controllers\BoardController::class, 'show'])->name('boards.show');
        Route::get('boards/{board}/edit', [App\Http\Controllers\BoardController::class, 'edit'])->name('boards.edit');
        Route::match(['put', 'patch'], 'boards/{board}', [App\Http\Controllers\BoardController::class, 'update'])->name('boards.update');
        Route::delete('boards/{board}', [App\Http\Controllers\BoardController::class, 'destroy'])->name('boards.destroy');

        // Board member management routes
        Route::post('boards/{board}/invite', [App\Http\Controllers\BoardController::class, 'inviteMember'])->name('boards.invite');
        Route::delete('boards/{board}/remove', [App\Http\Controllers\BoardController::class, 'removeMember'])->name('boards.remove');
        Route::patch('boards/{board}/role', [App\Http\Controllers\BoardController::class, 'updateMemberRole'])->name('boards.role');

        // Nested resources
        Route::resource('boards.tasks', App\Http\Controllers\TaskController::class);
        Route::resource('boards.tasks.comments', App\Http\Controllers\CommentController::class)->except(['create', 'edit']);
        Route::resource('boards.tasks.files', App\Http\Controllers\FileAttachmentController::class)->except(['create', 'edit']);
    });
});

require __DIR__.'/settings.php';
