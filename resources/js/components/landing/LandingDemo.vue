<script setup lang="ts">
import { Circle, CircleCheck, Search, Star } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';

interface DemoTask {
    id: number;
    name: string;
    tags: string[];
    done: boolean;
    starred: boolean;
}

const HASHTAG_PATTERN = /#([\p{L}\d_-]+)/gu;

const tasks = ref<DemoTask[]>([
    {
        id: 1,
        name: 'Angebot für Relaunch schicken',
        tags: ['kunde'],
        done: false,
        starred: true,
    },
    {
        id: 2,
        name: 'Login-Fehler auf Staging prüfen',
        tags: ['bug'],
        done: false,
        starred: false,
    },
    {
        id: 3,
        name: 'Zertifikat erneuern',
        tags: ['ops'],
        done: true,
        starred: false,
    },
]);

const query = ref('');
const activeTag = ref<string | null>(null);
const input = ref<HTMLInputElement | null>(null);
let nextId = tasks.value.length + 1;

const allTags = computed(() => [
    ...new Set(tasks.value.flatMap((task) => task.tags)),
]);

const searchTerm = computed(() =>
    query.value.replace(HASHTAG_PATTERN, '').trim().toLowerCase(),
);

const visibleTasks = computed(() =>
    tasks.value.filter(
        (task) =>
            (!activeTag.value || task.tags.includes(activeTag.value)) &&
            task.name.toLowerCase().includes(searchTerm.value),
    ),
);

function createTask() {
    const name = query.value.replace(HASHTAG_PATTERN, '').trim();
    if (!name) return;

    const tags = [...query.value.matchAll(HASHTAG_PATTERN)].map((match) =>
        match[1].toLowerCase(),
    );

    tasks.value.unshift({
        id: nextId++,
        name,
        tags,
        done: false,
        starred: false,
    });
    query.value = '';
    activeTag.value = null;
}

function toggleTag(tag: string) {
    activeTag.value = activeTag.value === tag ? null : tag;
}

onMounted(() => {
    // Wie in der App: Das Feld ist sofort bereit. Auf Touch-Geräten würde
    // der Fokus die Tastatur über die Seite schieben.
    if (window.matchMedia('(pointer: fine)').matches) {
        input.value?.focus({ preventScroll: true });
    }
});
</script>

<template>
    <div
        class="rounded-xl border border-border bg-card p-4 shadow-lg sm:p-5"
        aria-label="Interaktive Demo"
    >
        <form class="relative" @submit.prevent="createTask">
            <label for="landing-demo-input" class="sr-only">
                Aufgabe suchen oder anlegen
            </label>
            <input
                id="landing-demo-input"
                ref="input"
                v-model="query"
                type="text"
                autocomplete="off"
                placeholder="Suchen oder anlegen … probier „Changelog schreiben #release“"
                class="h-11 w-full rounded-md border border-border bg-background pr-10 pl-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
            <Search
                class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
        </form>

        <div class="mt-3 flex min-h-7 flex-wrap items-center gap-1.5">
            <button
                v-for="tag in allTags"
                :key="tag"
                type="button"
                :aria-pressed="activeTag === tag"
                class="rounded-md border border-border px-2 py-0.5 text-xs transition"
                :class="
                    activeTag === tag
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-accent'
                "
                @click="toggleTag(tag)"
            >
                <span class="opacity-60">#</span>{{ tag }}
            </button>
        </div>

        <ul class="mt-3 space-y-1.5" aria-live="polite">
            <li
                v-for="task in visibleTasks"
                :key="task.id"
                class="flex items-center gap-2 rounded-md bg-background px-3 py-2 text-sm"
            >
                <button
                    type="button"
                    :aria-label="
                        task.done
                            ? `„${task.name}“ wieder öffnen`
                            : `„${task.name}“ erledigen`
                    "
                    class="text-muted-foreground transition hover:text-foreground"
                    @click="task.done = !task.done"
                >
                    <CircleCheck v-if="task.done" class="size-4.5" />
                    <Circle v-else class="size-4.5" />
                </button>
                <span
                    class="min-w-0 flex-1 truncate"
                    :class="{
                        'text-muted-foreground line-through': task.done,
                    }"
                >
                    {{ task.name }}
                </span>
                <span
                    v-for="tag in task.tags"
                    :key="tag"
                    class="hidden text-xs text-muted-foreground sm:inline"
                >
                    #{{ tag }}
                </span>
                <button
                    type="button"
                    :aria-label="`„${task.name}“ markieren`"
                    :aria-pressed="task.starred"
                    class="transition"
                    :class="
                        task.starred
                            ? 'text-[var(--yellow-500)]'
                            : 'text-muted-foreground hover:text-foreground'
                    "
                    @click="task.starred = !task.starred"
                >
                    <Star
                        class="size-4"
                        :fill="task.starred ? 'currentColor' : 'none'"
                    />
                </button>
            </li>
            <li
                v-if="visibleTasks.length === 0"
                class="rounded-md border border-dashed border-border px-3 py-2 text-sm text-muted-foreground"
            >
                Nichts gefunden. Enter legt die Aufgabe an.
            </li>
        </ul>

        <p class="mt-3 text-xs text-muted-foreground">
            Das ist eine Demo: Nichts davon wird gespeichert.
        </p>
    </div>
</template>
