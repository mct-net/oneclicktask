<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tags', function (Blueprint $table) {
            $table->foreignId('board_id')->nullable()->after('id')->constrained()->cascadeOnDelete();
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->dropUnique('tags_name_unique');
        });

        $tags = DB::table('tags')->orderBy('id')->get();

        foreach ($tags as $tag) {
            $boardIds = DB::table('task_tag')
                ->join('tasks', 'tasks.id', '=', 'task_tag.task_id')
                ->where('task_tag.tag_id', $tag->id)
                ->distinct()
                ->orderBy('tasks.board_id')
                ->pluck('tasks.board_id');

            if ($boardIds->isEmpty()) {
                DB::table('tags')->where('id', $tag->id)->delete();

                continue;
            }

            $primaryBoardId = $boardIds->shift();

            DB::table('tags')
                ->where('id', $tag->id)
                ->update(['board_id' => $primaryBoardId]);

            foreach ($boardIds as $boardId) {
                $newTagId = DB::table('tags')->insertGetId([
                    'board_id' => $boardId,
                    'name' => $tag->name,
                    'created_at' => $tag->created_at,
                    'updated_at' => $tag->updated_at,
                ]);

                $taskIds = DB::table('task_tag')
                    ->join('tasks', 'tasks.id', '=', 'task_tag.task_id')
                    ->where('task_tag.tag_id', $tag->id)
                    ->where('tasks.board_id', $boardId)
                    ->pluck('task_tag.task_id');

                DB::table('task_tag')
                    ->where('tag_id', $tag->id)
                    ->whereIn('task_id', $taskIds)
                    ->update(['tag_id' => $newTagId]);
            }
        }

        Schema::table('tags', function (Blueprint $table) {
            $table->unique(['board_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $duplicates = DB::table('tags')
            ->select('name')
            ->groupBy('name')
            ->havingRaw('COUNT(*) > 1')
            ->pluck('name');

        foreach ($duplicates as $name) {
            $tags = DB::table('tags')
                ->where('name', $name)
                ->orderBy('id')
                ->get();

            $primaryTag = $tags->shift();

            foreach ($tags as $tag) {
                DB::table('task_tag')
                    ->where('tag_id', $tag->id)
                    ->update(['tag_id' => $primaryTag->id]);

                DB::table('tags')->where('id', $tag->id)->delete();
            }
        }

        Schema::table('tags', function (Blueprint $table) {
            $table->dropUnique(['board_id', 'name']);
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->unique('name');
            $table->dropConstrainedForeignId('board_id');
        });
    }
};
