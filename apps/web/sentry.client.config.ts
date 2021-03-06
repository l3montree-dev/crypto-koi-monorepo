// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: SENTRY_DSN,
    beforeSend(event: any) {
        // Modify the captured event
        if (event.user) {
            // Don't send user's personal data
            delete event.user.email
            delete event.user.ip_address
            delete event.user.username
            delete event.user.id
            delete event.dist
        }
        return event
    },
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
})
