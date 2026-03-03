<script setup lang="ts">
import { Button } from '@/components/core/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/core/ui/dialog';
import { useAnalytics } from '@/composables/useAnalytics';
import { update } from '@/routes/analytics';
import type { AppPageProps } from '@/types';
import { usePage } from '@inertiajs/vue3';
import axios from 'axios';
import { Heart } from 'lucide-vue-next';
import { ref } from 'vue';

const page = usePage<AppPageProps>();

const open = ref(page.props.auth?.user?.analytics_consent === null);

const { optIn, optOut } = useAnalytics();

function persist(consent: boolean) {
    axios.patch(update().url, { analytics_consent: consent });
}

function dismiss() {
    open.value = false;
}

function accept() {
    optIn();
    persist(true);
    dismiss();
}

function decline() {
    optOut();
    persist(false);
    dismiss();
}
</script>

<template>
    <Dialog v-model:open="open">
        <DialogContent
            @escape-key-down.prevent
            @pointer-down-outside.prevent
            @interact-outside.prevent
        >
            <DialogHeader>
                <DialogTitle> A small favor </DialogTitle>
                <DialogDescription>
                    We'd love to learn how you use the app so we can keep making
                    it better for you. We only collect anonymous usage data —
                    never your personal content.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" @click="decline">
                    Maybe later
                </Button>
                <Button @click="accept">
                    <Heart class="size-4 text-(--red-500)" />
                    Happy to help
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
