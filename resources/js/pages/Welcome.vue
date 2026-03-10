<script setup lang="ts">
import { index as boardsIndex } from '@/actions/App/Http/Controllers/BoardController';
import { login, register } from '@/routes';
import { Head, Link } from '@inertiajs/vue3';
import { Clock3, Flag, Github, Hash, Zap } from 'lucide-vue-next';
import { onBeforeUnmount, onMounted } from 'vue';

withDefaults(
    defineProps<{
        canRegister: boolean;
    }>(),
    {
        canRegister: true,
    },
);

const features = [
    {
        title: 'Instant Task Creation',
        description:
            'The input field can act as search or create tasks instantly with a single Enter key press.',
        icon: Zap,
    },
    {
        title: 'One-Click Task Actions',
        description:
            'Set color, star, flag, status, backlog, and trash actions quickly without opening extra panels.',
        icon: Flag,
    },
    {
        title: 'Hashtag Filtering',
        description:
            'Hashtags are auto-detected so you can filter categories fast with one click.',
        icon: Hash,
    },
    {
        title: 'Quick Due Dates',
        description:
            'Use preset time options to assign deadlines immediately and keep momentum while planning.',
        icon: Clock3,
    },
];

const technologies = [
    { name: 'HTML5', icon: '/images/landing/tech/html5.svg' },
    { name: 'CSS3', icon: '/images/landing/tech/css.svg' },
    { name: 'JavaScript', icon: '/images/landing/tech/javascript.svg' },
    { name: 'Vue 3', icon: '/images/landing/tech/vuedotjs.svg' },
    { name: 'Laravel', icon: '/images/landing/tech/laravel.svg' },
    { name: 'Docker', icon: '/images/landing/tech/docker.svg' },
];

let heroObserver: IntersectionObserver | null = null;

onMounted(() => {
    if (typeof window === 'undefined') return;
    if (
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        document.querySelectorAll('.hero-reveal').forEach((el) => {
            el.classList.add('is-visible');
        });
        return;
    }

    heroObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    heroObserver?.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 },
    );

    document.querySelectorAll('.hero-reveal').forEach((el) => {
        heroObserver?.observe(el);
    });
});

onBeforeUnmount(() => {
    heroObserver?.disconnect();
    heroObserver = null;
});
</script>

<template>
    <Head title="Welcome" />

    <div
        class="bg-white min-h-screen text-[#1b1b18]"
        style="
            font-family:
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                'Segoe UI',
                Helvetica,
                Arial,
                sans-serif;
        "
    >
        <header
            class="sticky top-0 z-20 border-b border-[#7f477d24] bg-[#faf7ff]/85 px-5 py-4 backdrop-blur"
        >
            <nav
                class="mx-auto flex w-full max-w-6xl items-center justify-end gap-3"
            >
                <Link
                    v-if="$page.props.auth.user"
                    :href="boardsIndex()"
                    class="bg-white rounded-lg border border-[#7f477d59] px-4 py-2 text-sm font-semibold text-[#2e2039] transition hover:border-[#7f477da6]"
                >
                    Boards
                </Link>
                <template v-else>
                    <Link
                        :href="login()"
                        class="rounded-lg border border-transparent px-4 py-2 text-sm font-semibold text-[#2e2039] transition hover:border-[#7f477d59]"
                    >
                        Log in
                    </Link>
                    <Link
                        v-if="canRegister"
                        :href="register()"
                        class="bg-white rounded-lg border border-[#7f477d59] px-4 py-2 text-sm font-semibold text-[#2e2039] transition hover:border-[#7f477da6]"
                    >
                        Register
                    </Link>
                </template>
            </nav>
        </header>

        <section
            class="text-white relative overflow-hidden px-5 py-16 md:py-20"
            style="
                background-color: #ffffff;
                background-image:
                    url('/images/landing/alert.png'),
                    url('/images/landing/checklist.png'),
                    url('/images/landing/star.png'),
                    url('/images/landing/time.png'),
                    url('/images/landing/circle.png');
                background-repeat: no-repeat;
                background-size: 110px, 132px, 122px, 124px, 140px;
                background-position:
                    6% 14%,
                    92% 18%,
                    12% 78%,
                    88% 82%,
                    50% 10%;
            "
        >
            <div
                class="pointer-events-none absolute inset-0 opacity-70"
                style="
                    background-image:
                        repeating-linear-gradient(
                            0deg,
                            rgba(0, 0, 0, 0.12),
                            rgba(0, 0, 0, 0.12) 1px,
                            transparent 1px,
                            transparent 50px
                        ),
                        repeating-linear-gradient(
                            90deg,
                            rgba(0, 0, 0, 0.12),
                            rgba(0, 0, 0, 0.12) 1px,
                            transparent 1px,
                            transparent 50px
                        );
                "
            />
            <div class="relative mx-auto max-w-5xl text-center">
                <h1
                    class="hero-reveal text-[32px] leading-[1.18] font-bold tracking-tight text-[#434a56] md:text-[48px]"
                    style="animation-delay: 0.1s"
                >
                    <span class="text-[#ae6dab]">OCT – One Click Task:</span>
                    <span class="text-[#000000]"> Manage</span>
                    <span class="mt-1 block text-[#000000]"
                        >Everything with a Single Click</span
                    >
                </h1>
                <p
                    class="hero-reveal mx-auto mt-12 max-w-[560px] text-[15px] leading-5 text-[#374151]"
                    style="animation-delay: 0.25s"
                >
                    <strong>One Click Task </strong> is a new type of to-do list
                    application designed for efficiency and ease of use. Upon
                    login or page visit, the input field is immediately focused,
                    allowing users to quickly enter new tasks. The list of
                    current tasks can be filtered by hashtags with just a click,
                    making organization straightforward. Additionally, tasks
                    that cannot be immediately attended to can be paused or
                    postponed with a single click.
                </p>

                <div
                    class="mt-8 flex flex-wrap items-center justify-center gap-6"
                >
                    <a
                        href="https://github.com/mct-net/oneclicktask.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hero-reveal !text-white rounded-[8px] border border-[#7f477d] bg-[#7f477d] px-8 py-3 text-base font-semibold shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.24)]"
                        style="color: #ffffff; animation-delay: 0.4s"
                    >
                        GitHub
                    </a>
                    <Link
                        :href="$page.props.auth.user ? boardsIndex() : login()"
                        class="hero-reveal !text-white rounded-[8px] bg-[#ae6dab] px-8 py-3 text-base font-semibold shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#a45ba0] hover:shadow-[0_12px_24px_rgba(0,0,0,0.24)]"
                        style="color: #ffffff; animation-delay: 0.5s"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </section>

        <section
            class="relative min-h-screen"
            style="
                background-color: #e1e9ef;
                background-image:
                    url('/images/landing/alert.png'),
                    url('/images/landing/checklist.png'),
                    url('/images/landing/star.png'),
                    url('/images/landing/time.png'),
                    url('/images/landing/circle.png'),
                    url('/images/landing/alert.png'),
                    url('/images/landing/checklist.png'),
                    url('/images/landing/star.png'),
                    url('/images/landing/time.png'),
                    url('/images/landing/circle.png'),
                    url('/images/landing/alert.png'),
                    url('/images/landing/star.png');
                background-repeat: no-repeat;
                background-size:
                    110px, 132px, 122px, 124px, 140px, 84px, 96px, 90px, 88px,
                    100px, 72px, 76px;
                background-position:
                    8% 18%,
                    92% 20%,
                    12% 78%,
                    88% 80%,
                    50% 12%,
                    20% 40%,
                    78% 42%,
                    30% 12%,
                    70% 70%,
                    50% 90%,
                    6% 55%,
                    94% 60%;
            "
        >
            <img
                src="/images/landing/oct.png"
                alt="OCT app preview"
                class="absolute top-[40%] left-1/2 w-[min(85vw,1200px)] max-w-[98vw] -translate-x-1/2 -translate-y-1/2 rounded-[10px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
            />
        </section>

        <section
            class="px-5 py-16 md:py-20"
            style="
                background-color: #ffffff;
                background-image:
                    url('/images/landing/alert.png'),
                    url('/images/landing/checklist.png'),
                    url('/images/landing/star.png'),
                    url('/images/landing/time.png'),
                    url('/images/landing/circle.png');
                background-repeat: no-repeat;
                background-size: 98px, 124px, 112px, 114px, 132px;
                background-position:
                    4% 10%,
                    96% 16%,
                    8% 86%,
                    92% 88%,
                    50% 6%;
            "
        >
            <div
                class="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16"
            >
                <img
                    src="/images/landing/oct-hero-1.png"
                    alt="OCT dashboard"
                    class="hero-reveal w-full object-cover"
                    style="animation-delay: 0.1s"
                />

                <article
                    class="hero-reveal rounded-2xl border border-[#9b56981a] bg-[#f6f6f6] p-8 shadow-[0_4px_20px_rgba(174,109,171,0.08)] transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(174,109,171,0.12)]"
                    style="animation-delay: 0.25s"
                >
                    <h2
                        class="bg-gradient-to-r from-[#a45ba0] via-[#ae6dab] to-[#b87fb5] bg-clip-text text-center text-[32px] leading-tight font-bold text-transparent md:text-[48px]"
                    >
                        The Thinking Behind
                        <br />
                        One-Click Task
                    </h2>
                    <p
                        class="mt-4 text-justify text-[18px] leading-7 text-[#2a2430]"
                    >
                        <strong>OCT (One Click Task)</strong> was created to
                        address the slow and cluttered experience common in many
                        task management apps. Most tools require multiple steps
                        just to add or update tasks, which can be inefficient
                        for users who manage tasks throughout the day. OCT
                        focuses on speed and simplicity by offering a true
                        one-click workflow, allowing users to add and manage
                        tasks instantly without unnecessary steps or extra
                        navigation.
                    </p>
                </article>

                <article
                    class="hero-reveal rounded-2xl border border-[#9b56981a] bg-[#f6f6f6] p-8 shadow-[0_4px_20px_rgba(174,109,171,0.08)] transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(174,109,171,0.12)]"
                    style="animation-delay: 0.4s"
                >
                    <h2
                        class="bg-gradient-to-r from-[#a45ba0] via-[#ae6dab] to-[#b87fb5] bg-clip-text text-center text-[32px] leading-tight font-bold text-transparent md:text-[48px]"
                    >
                        The One-Click
                        <br />
                        Inspiration
                    </h2>
                    <p
                        class="mt-4 text-justify text-[18px] leading-7 text-[#2a2430]"
                    >
                        <strong>OCT</strong> was built to make task management
                        faster, simpler, and stress-free. Inspired by the idea
                        of <strong>“one click,”</strong> it removes clutter and
                        complexity so you can add, organize, and manage tasks
                        effortlessly without slowing you down.
                    </p>
                </article>

                <img
                    src="/images/landing/oct-hero-2.png"
                    alt="OCT task view"
                    class="hero-reveal w-full object-cover"
                    style="animation-delay: 0.55s"
                />
            </div>
        </section>

        <section
            class="relative overflow-hidden px-5 py-16 md:py-20"
            style="
                background-color: #ffffff;
                background-image:
                    url('/images/landing/alert.png'),
                    url('/images/landing/checklist.png'),
                    url('/images/landing/star.png'),
                    url('/images/landing/time.png'),
                    url('/images/landing/circle.png');
                background-repeat: no-repeat;
                background-size: 104px, 130px, 118px, 120px, 136px;
                background-position:
                    5% 20%,
                    95% 24%,
                    10% 72%,
                    90% 76%,
                    50% 12%;
            "
        >
            <div class="mx-auto w-full max-w-6xl">
                <div class="mx-auto max-w-3xl text-center">
                    <h2
                        class="hero-reveal bg-gradient-to-br from-[#9b5698] to-[#ae6dab] bg-clip-text text-[32px] font-extrabold text-transparent md:text-[48px]"
                        style="animation-delay: 0.1s"
                    >
                        Powerful Features
                        <span
                            class="mt-1 block text-[28px] text-[#7f477d] md:text-[48px]"
                            >Minimal Effort</span
                        >
                    </h2>
                    <p
                        class="hero-reveal mx-auto mt-3 max-w-xl leading-7 text-[#2a2430]"
                        style="animation-delay: 0.25s"
                    >
                        Everything you need to manage tasks efficiently without
                        clutter.
                    </p>
                </div>

                <div class="mt-8 grid gap-5 md:grid-cols-2">
                    <article
                        v-for="feature in features"
                        :key="feature.title"
                        class="hero-reveal rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                        :style="`animation-delay:${0.35 + features.indexOf(feature) * 0.1}s;`"
                    >
                        <div
                            class="h-full rounded-3xl border-2 border-dashed border-[#ae6dab57] bg-gradient-to-br from-[#ae6dab1f] to-[#a45ba01f] p-1"
                        >
                            <div
                                class="bg-white flex h-full flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center"
                            >
                                <div
                                    class="grid h-32 place-items-center rounded-xl bg-[#f6eef6] sm:w-44 sm:shrink-0"
                                >
                                    <span
                                        class="grid h-14 w-14 place-items-center rounded-full bg-[#9b56981f]"
                                    >
                                        <component
                                            :is="feature.icon"
                                            class="h-8 w-8 text-[#9b5698]"
                                        />
                                    </span>
                                </div>

                                <div class="flex flex-1 flex-col">
                                    <h3
                                        class="text-lg font-bold text-[#7f477d]"
                                    >
                                        {{ feature.title }}
                                    </h3>
                                    <p
                                        class="mt-1 text-sm leading-6 text-[#2a2430]"
                                    >
                                        {{ feature.description }}
                                    </p>
                                    <Link
                                        :href="
                                            $page.props.auth.user
                                                ? boardsIndex()
                                                : login()
                                        "
                                        class="!text-white mt-3 inline-block w-fit rounded bg-[#ae6dab] px-3 py-2 text-sm font-semibold transition hover:bg-[#a45ba0]"
                                        style="color: #ffffff"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="bg-white px-5 py-16" style="background-color: #ffffff">
            <h2
                class="bg-gradient-to-r from-[#a45ba0] via-[#ae6dab] to-[#b87fb5] bg-clip-text text-center text-[32px] font-extrabold text-transparent md:text-[48px]"
            >
                Powered by Modern Technologies
            </h2>
            <div
                class="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
            >
                <div
                    v-for="tech in technologies"
                    :key="tech.name"
                    class="grid min-h-24 place-items-center rounded-2xl border border-[#9b569838] bg-[#f6f6f6] px-4 text-sm font-bold shadow-[0_4px_20px_rgba(174,109,171,0.08)]"
                >
                    <div class="flex flex-col items-center gap-2">
                        <img
                            :src="tech.icon"
                            :alt="`${tech.name} logo`"
                            class="h-8 w-8"
                        />
                        <span>{{ tech.name }}</span>
                    </div>
                </div>
            </div>
        </section>

        <footer class="px-5 pt-8 pb-10">
            <div
                class="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 border-t border-[#e7e2ef] pt-6 text-sm text-[#5a4a68] md:flex-row"
            >
                <div class="text-center md:text-left">
                    <p class="font-semibold text-[#2e2039]">One Click Task</p>
                    <p class="text-xs">
                        © 2026 One Click Task. All rights reserved.
                    </p>
                </div>
                <div class="flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/privacy-policy"
                        class="font-medium text-[#7f477d] hover:underline"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/contact"
                        class="font-medium text-[#7f477d] hover:underline"
                    >
                        Contact
                    </Link>
                    <a
                        href="mailto:support@oneclicktask.com"
                        class="font-medium text-[#7f477d] hover:underline"
                    >
                    </a>
                    <a
                        href="https://github.com/mct-net/oneclicktask.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 rounded-full border border-[#7f477d3d] px-3 py-1 text-[#7f477d] transition hover:border-[#7f477d]"
                    >
                        <Github class="h-4 w-4" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
@keyframes heroReveal {
    from {
        opacity: 0;
        transform: translateY(18px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-reveal {
    opacity: 0;
    transform: translateY(18px);
}

.hero-reveal.is-visible {
    animation: heroReveal 0.75s ease-out forwards;
}
</style>
