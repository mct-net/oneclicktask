<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        if (! $user) {
            $this->command->warn('No users found. Please run UserSeeder first.');

            return;
        }

        // Create a board for these quirky tasks
        $board = Board::firstOrCreate(
            ['name' => 'My Tasks'],
            [
                'description' => 'Late night thoughts and side projects from the graveyard shift',
                'owner_id' => $user->id,
                'color' => '#7c3aed',
            ]
        );

        $tasks = [
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Document my night shift reading system',
                'content' => 'I\'ve developed a sophisticated method for reading during slow hours at work. Need to write it down before I forget. Involves strategic bookmark placement and the ability to hide a book in 0.3 seconds.',
                'status' => 'backlog',
                'color' => 'transparent',
                'is_important' => false,
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(10),
            ],
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Create playlist: Desert Highway Coding Sessions',
                'content' => 'That road trip gave me ideas. Need to curate the perfect playlist for those late-night debugging sessions. Something with long instrumental sections and the vibe of endless open road.',
                'status' => 'in_progress',
                'color' => 'transparent',
                'is_starred' => true,
                'due_date' => now()->addDays(3),
                'created_at' => now()->subDays(9),
                'updated_at' => now()->subDays(2),
            ],
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Review local coffee shops for remote work',
                'content' => 'Map out which coffee shops have the best wifi, the most comfortable chairs, and baristas who don\'t judge you for occupying a table for 4 hours with a single cortado.',
                'status' => 'backlog',
                'color' => 'transparent',
                'created_at' => now()->subDays(8),
                'updated_at' => now()->subDays(8),
            ],
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Write blog post: Physical books vs eBooks for developers',
                'content' => 'A deeply scientific analysis of why physical programming books are superior to PDFs. Will include photographic evidence of my color-coded bookshelf system.',
                'status' => 'backlog',
                'color' => 'transparent',
                'is_important' => true,
                'due_date' => now()->addDays(5),
                'created_at' => now()->subDays(7),
                'updated_at' => now()->subDays(7),
            ],
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Compile list: Overrated productivity frameworks',
                'content' => 'Everyone needs to hear my thoughts on which productivity systems are overrated. Looking at you, some-methods-that-shall-not-be-named. Time to speak truth to power.',
                'status' => 'done',
                'color' => 'transparent',
                'created_at' => now()->subDays(6),
                'updated_at' => now()->subDays(4),
            ],
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Reorganize project folder structure (again)',
                'content' => 'There are two types of developers: those who organize by feature, and those who organize by file type. I change my mind weekly. This week: chaos reigns.',
                'status' => 'backlog',
                'color' => 'transparent',
                'is_starred' => true,
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Apply lessons from that one self-help book',
                'content' => 'I read it ironically, but it actually had some good points about work-life balance. Figure out how to implement without admitting the book was helpful.',
                'status' => 'backlog',
                'color' => 'transparent',
                'last_postponed_at' => now()->subDays(1),
                'created_at' => now()->subDays(4),
                'updated_at' => now()->subDays(1),
            ],
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Master the art of context switching',
                'content' => 'Currently juggling three side projects, two learning tracks, and a stack of unread articles. Time to systematize this madness like a pro.',
                'status' => 'in_progress',
                'color' => 'transparent',
                'is_important' => true,
                'is_starred' => true,
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subHours(6),
            ],
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Confessions of a serial side-project starter',
                'content' => 'I start new projects faster than I finish old ones. Time to document this process and maybe, possibly, attempt to finish something. Novel concept.',
                'status' => 'backlog',
                'color' => 'transparent',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'board_id' => $board->id,
                'author_id' => $user->id,
                'assignee_id' => $user->id,
                'name' => 'Week-long challenge: Only work on abandoned projects',
                'content' => 'What if I only worked on projects I\'ve previously abandoned? This will either be incredibly productive or a devastating confrontation with my inability to finish things.',
                'status' => 'backlog',
                'color' => 'transparent',
                'due_date' => now()->addWeek(),
                'is_starred' => true,
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
}
