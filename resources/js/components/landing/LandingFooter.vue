<script setup lang="ts">
import { privacyPolicy } from '@/routes';
import { Link } from '@inertiajs/vue3';

defineProps<{
    repositoryUrl: string;
}>();

const year = new Date().getFullYear();
</script>

<template>
    <footer class="border-t border-border px-5 py-8">
        <div
            class="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row"
        >
            <p>© {{ year }} OneClickTask</p>
            <nav aria-label="Rechtliches" class="flex flex-wrap gap-5">
                <Link
                    :href="privacyPolicy()"
                    class="hover:text-foreground hover:underline"
                >
                    Datenschutz
                </Link>
                <a
                    :href="`${repositoryUrl}/issues`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-foreground hover:underline"
                >
                    Kontakt &amp; Feedback
                </a>
                <a
                    :href="repositoryUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-foreground hover:underline"
                >
                    GitHub
                </a>
            </nav>
        </div>
    </footer>
</template>
