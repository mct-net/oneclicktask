<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FileAttachment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'path',
        'url',
        'type',
        'task_id',
    ];

    /**
     * Get the task that owns the file attachment.
     */
    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
