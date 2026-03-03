<script setup lang="ts">
import AppLogoIcon from '@/components/core/AppLogoIcon.vue';
import { home } from '@/routes';
import { Head, Link } from '@inertiajs/vue3';

defineProps<{
    appName: string;
    lastUpdated: string;
}>();
</script>

<template>
    <Head title="Privacy Policy" />
    <div class="min-h-svh bg-background">
        <div class="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-16">
            <div class="mb-8 flex items-center gap-3">
                <Link :href="home()" class="flex items-center gap-2">
                    <AppLogoIcon class="size-8 fill-current text-foreground" />
                </Link>
                <span class="text-sm text-muted-foreground">
                    <Link
                        :href="home()"
                        class="hover:text-foreground hover:underline"
                    >
                        &larr; Back to home
                    </Link>
                </span>
            </div>

            <article class="prose prose-neutral dark:prose-invert max-w-none">
                <h1 class="text-3xl font-bold tracking-tight">
                    Privacy Policy
                </h1>
                <p class="text-muted-foreground">
                    Last updated: {{ lastUpdated }}
                </p>

                <section>
                    <h2>1. Who we are</h2>
                    <p>
                        {{ appName }} ("<strong>we</strong>",
                        "<strong>us</strong>", "<strong>our</strong>") is
                        operated by <strong>[Your Company Name]</strong>,
                        registered in <strong>[Country]</strong>. We are the
                        data controller for the personal data we process through
                        this application.
                    </p>
                    <p>
                        If you have questions about how we handle your data, you
                        can reach our Data Protection Officer at
                        <strong>[privacy@yourdomain.com]</strong>.
                    </p>
                </section>

                <section>
                    <h2>2. What data we collect</h2>
                    <p>
                        We collect the following categories of personal data
                        when you use our service:
                    </p>

                    <h3>2.1 Account data</h3>
                    <ul>
                        <li>
                            <strong>Name</strong> &mdash; to identify you within
                            boards and to other team members.
                        </li>
                        <li>
                            <strong>Email address</strong> &mdash; for
                            authentication, password resets, and email
                            verification.
                        </li>
                        <li>
                            <strong>Password</strong> &mdash; stored as a
                            one-way hash (bcrypt); we never store or see your
                            plain-text password.
                        </li>
                    </ul>

                    <h3>2.2 Two-factor authentication data</h3>
                    <p>
                        If you enable two-factor authentication (2FA), we store
                        an encrypted TOTP secret and recovery codes. These are
                        used solely for securing your account and are never
                        shared.
                    </p>

                    <h3>2.3 Content you create</h3>
                    <ul>
                        <li>
                            Tasks, comments, tags, and file attachments you
                            create within boards.
                        </li>
                        <li>
                            Board membership information (which boards you
                            belong to and your role).
                        </li>
                    </ul>

                    <h3>2.4 Technical data</h3>
                    <ul>
                        <li>
                            <strong>IP address</strong> and
                            <strong>user agent</strong> &mdash; collected
                            automatically as part of session management.
                        </li>
                        <li>
                            <strong>Session data</strong> &mdash; used to keep
                            you logged in and to protect against cross-site
                            request forgery.
                        </li>
                    </ul>

                    <h3>2.5 Analytics data (opt-in only)</h3>
                    <p>
                        If you explicitly consent, we collect anonymous usage
                        data through <strong>PostHog</strong> to improve the
                        product. This includes:
                    </p>
                    <ul>
                        <li>Page views and navigation patterns.</li>
                        <li>
                            Feature usage events (e.g., tasks created, status
                            changes) &mdash; without the content of your tasks.
                        </li>
                    </ul>
                    <p>
                        Analytics is <strong>disabled by default</strong>. You
                        must opt in through your
                        <strong>Settings &gt; Analytics</strong> page. No
                        session recordings are made. You can opt out at any time
                        from the same settings page.
                    </p>
                </section>

                <section>
                    <h2>3. How we use your data</h2>
                    <p>We process your personal data for these purposes:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Purpose</th>
                                <th>Legal basis (GDPR Art. 6)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Providing the task management service
                                    (boards, tasks, comments)
                                </td>
                                <td>
                                    Performance of a contract (Art. 6(1)(b))
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Authentication, email verification, and
                                    account security (incl. 2FA)
                                </td>
                                <td>
                                    Performance of a contract (Art. 6(1)(b))
                                </td>
                            </tr>
                            <tr>
                                <td>Session management and CSRF protection</td>
                                <td>
                                    Legitimate interest in security (Art.
                                    6(1)(f))
                                </td>
                            </tr>
                            <tr>
                                <td>Anonymous product analytics</td>
                                <td>Your consent (Art. 6(1)(a))</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section>
                    <h2>4. Who we share your data with</h2>
                    <p>
                        Your personal data is shared only with the following
                        recipients, and only to the extent necessary:
                    </p>
                    <ul>
                        <li>
                            <strong>Board members</strong> &mdash; your name and
                            email are visible to other members of the same
                            board, so you can collaborate on tasks.
                        </li>
                        <li>
                            <strong>PostHog</strong> (analytics processor)
                            &mdash; only if you have opted in. PostHog processes
                            usage events on our behalf. See
                            <a
                                href="https://posthog.com/privacy"
                                target="_blank"
                                rel="noopener"
                                >PostHog's privacy policy</a
                            >.
                        </li>
                    </ul>
                    <p>We do not sell your personal data to third parties.</p>
                </section>

                <section>
                    <h2>5. International data transfers</h2>
                    <p>
                        If you have opted in to analytics, your usage data is
                        processed by PostHog. PostHog offers both EU and US
                        hosting. We use
                        <strong>[EU / US]</strong> hosting. Where data is
                        transferred outside the EEA, appropriate safeguards are
                        in place (Standard Contractual Clauses or an adequacy
                        decision).
                    </p>
                </section>

                <section>
                    <h2>6. How long we keep your data</h2>
                    <ul>
                        <li>
                            <strong>Account data</strong> &mdash; retained for
                            as long as your account is active. If you delete
                            your account, your personal data is removed within
                            30 days.
                        </li>
                        <li>
                            <strong>Session data</strong> &mdash; automatically
                            expires after 120 minutes of inactivity.
                        </li>
                        <li>
                            <strong>Analytics data</strong> &mdash; retained by
                            PostHog according to their data retention policy. No
                            analytics data is collected unless you opt in.
                        </li>
                        <li>
                            <strong>File attachments</strong> &mdash; retained
                            until you or a board admin deletes them, or until
                            your account is deleted.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>7. Cookies and local storage</h2>
                    <p>We use the following cookies and local storage:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Purpose</th>
                                <th>Type</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Session cookie</td>
                                <td>
                                    Keeps you logged in and provides CSRF
                                    protection
                                </td>
                                <td>Essential</td>
                                <td>120 minutes</td>
                            </tr>
                            <tr>
                                <td><code>appearance</code></td>
                                <td>
                                    Stores your theme preference (light / dark /
                                    system)
                                </td>
                                <td>Functional</td>
                                <td>Persistent</td>
                            </tr>
                            <tr>
                                <td><code>sidebar_state</code></td>
                                <td>
                                    Remembers whether the sidebar is open or
                                    closed
                                </td>
                                <td>Functional</td>
                                <td>Persistent</td>
                            </tr>
                            <tr>
                                <td>PostHog cookies</td>
                                <td>Analytics tracking (opt-in only)</td>
                                <td>Analytics</td>
                                <td>Varies</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        Essential and functional cookies do not require consent
                        as they are strictly necessary for the service to
                        function. Analytics cookies are only set if you opt in.
                    </p>
                </section>

                <section>
                    <h2>8. Your rights</h2>
                    <p>
                        Under the GDPR, you have the following rights regarding
                        your personal data:
                    </p>
                    <ul>
                        <li>
                            <strong>Access</strong> &mdash; request a copy of
                            the personal data we hold about you.
                        </li>
                        <li>
                            <strong>Rectification</strong> &mdash; correct
                            inaccurate data. You can update your name, email,
                            and password directly from your
                            <strong>Settings &gt; Profile</strong> page.
                        </li>
                        <li>
                            <strong>Erasure</strong> &mdash; request deletion of
                            your personal data.
                        </li>
                        <li>
                            <strong>Restriction</strong> &mdash; request that we
                            limit processing of your data.
                        </li>
                        <li>
                            <strong>Portability</strong> &mdash; receive your
                            data in a structured, machine-readable format.
                        </li>
                        <li>
                            <strong>Objection</strong> &mdash; object to
                            processing based on legitimate interests.
                        </li>
                        <li>
                            <strong>Withdraw consent</strong> &mdash; for
                            analytics, you can withdraw consent at any time via
                            <strong>Settings &gt; Analytics</strong>. This does
                            not affect the lawfulness of processing before
                            withdrawal.
                        </li>
                    </ul>
                    <p>
                        To exercise any of these rights, contact us at
                        <strong>[privacy@yourdomain.com]</strong>. We will
                        respond within one month.
                    </p>
                </section>

                <section>
                    <h2>9. Automated decision-making</h2>
                    <p>
                        We do not use automated decision-making or profiling
                        that produces legal effects or similarly significant
                        effects on you.
                    </p>
                </section>

                <section>
                    <h2>10. Data security</h2>
                    <p>
                        We implement appropriate technical and organizational
                        measures to protect your personal data, including:
                    </p>
                    <ul>
                        <li>Passwords are hashed using bcrypt.</li>
                        <li>
                            Two-factor authentication secrets are encrypted at
                            rest.
                        </li>
                        <li>
                            Session cookies are HTTP-only and use SameSite
                            protection.
                        </li>
                        <li>CSRF tokens protect against cross-site attacks.</li>
                        <li>
                            Rate limiting is applied to authentication endpoints
                            (5 requests per minute).
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>11. Complaints</h2>
                    <p>
                        If you believe we are not handling your data correctly,
                        you have the right to lodge a complaint with your local
                        data protection supervisory authority. You can find your
                        authority at
                        <a
                            href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                            target="_blank"
                            rel="noopener"
                            >edpb.europa.eu</a
                        >.
                    </p>
                </section>

                <section>
                    <h2>12. Changes to this policy</h2>
                    <p>
                        We may update this privacy policy from time to time. We
                        will notify you of significant changes by email or
                        through an in-app notification. The "Last updated" date
                        at the top of this page indicates when this policy was
                        last revised.
                    </p>
                </section>

                <section>
                    <h2>13. Contact us</h2>
                    <p>
                        For any privacy-related questions or to exercise your
                        data protection rights, contact us at:
                    </p>
                    <ul>
                        <li>
                            Email:
                            <strong>[privacy@yourdomain.com]</strong>
                        </li>
                        <li>Address: <strong>[Your postal address]</strong></li>
                    </ul>
                </section>
            </article>
        </div>
    </div>
</template>

<style scoped>
/* stylelint-disable-next-line */
@reference "../../css/app.css";

.prose h2 {
    @apply mt-10 mb-4 text-xl font-semibold tracking-tight;
}
.prose h3 {
    @apply mt-6 mb-2 text-base font-semibold;
}
.prose p {
    @apply mb-4 leading-relaxed text-muted-foreground;
}
.prose ul {
    @apply mb-4 list-disc space-y-1 pl-6 text-muted-foreground;
}
.prose table {
    @apply mb-4 w-full text-sm;
}
.prose thead {
    @apply border-b;
}
.prose th {
    @apply px-3 py-2 text-left font-medium;
}
.prose td {
    @apply border-b px-3 py-2 text-muted-foreground;
}
.prose a {
    @apply text-primary underline underline-offset-4 hover:text-primary/80;
}
.prose strong {
    @apply font-semibold text-foreground;
}
.prose code {
    @apply rounded bg-muted px-1.5 py-0.5 text-sm;
}
.prose section {
    @apply mb-2;
}
</style>
