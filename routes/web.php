<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/privacy', function () {
    return Inertia::render('PrivacyPolicy', [
        'appName' => config('app.name'),
        'lastUpdated' => '2026-03-02',
    ]);
})->name('privacy-policy');

Route::get('/', function () {
    if (Auth::check()) {
        $boards = Auth::user()->allBoards()->get();

        if ($boards->count() === 1) {
            return redirect()->route('boards.show', $boards->first());
        }

        return redirect()->route('boards.index');
    }

    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // User routes
    Route::get('users/current', [App\Http\Controllers\UserController::class, 'current'])->name('users.current');

    // Board routes without member check
    Route::get('boards', [App\Http\Controllers\BoardController::class, 'index'])->name('boards.index');
    Route::get('boards/create', [App\Http\Controllers\BoardController::class, 'create'])->name('boards.create');
    Route::post('boards', [App\Http\Controllers\BoardController::class, 'store'])->name('boards.store');

    // Board-scoped routes (with middleware)
    Route::middleware('board.member')->group(function () {
        // Board user routes
        Route::get('boards/{board}/users', [App\Http\Controllers\UserController::class, 'index'])->name('boards.users.index');

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

        // Board-level tags (for listing all tags in a board)
        Route::get('boards/{board}/tags', [App\Http\Controllers\TagController::class, 'index'])->name('boards.tags.index');
        Route::post('boards/{board}/tags', [App\Http\Controllers\TagController::class, 'store'])->name('boards.tags.store');

        // Task-level tags (for attaching/detaching tags to/from tasks)
        Route::post('boards/{board}/tasks/{task}/tags', [App\Http\Controllers\TaskTagController::class, 'attach'])->name('boards.tasks.tags.attach');
        Route::put('boards/{board}/tasks/{task}/tags/{tag}', [App\Http\Controllers\TaskTagController::class, 'update'])->name('boards.tasks.tags.update');
        Route::delete('boards/{board}/tasks/{task}/tags/{tag}', [App\Http\Controllers\TaskTagController::class, 'detach'])->name('boards.tasks.tags.detach');
    });
});

require __DIR__.'/settings.php';
