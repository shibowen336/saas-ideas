# SaaS Idea Validator

SEO-focused Next.js marketing site and MVP validation tool for founders exploring SaaS ideas.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local content system for blog posts, examples, FAQs, and programmatic pages
- JSON-LD schema helpers

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```

## Commercial Email Capture

The waitlist / save-report form is wired for Loops in production.

Set these environment variables locally or in Vercel:

```bash
LOOPS_API_KEY=...
LOOPS_WAITLIST_LIST_ID=...
LOOPS_WAITLIST_USER_GROUP=Website leads
LOOPS_SOURCE_PREFIX=saas-ideas
LOOPS_REPORT_TRANSACTIONAL_ID=...
```

Notes:

- `LOOPS_API_KEY` is required in production.
- `LOOPS_WAITLIST_LIST_ID` is optional but recommended if you want all form signups added to a specific Loops mailing list.
- `LOOPS_WAITLIST_USER_GROUP` defaults to `Website leads`.
- `LOOPS_SOURCE_PREFIX` helps keep signup sources grouped in Loops, for example `saas-ideas:tool-page-zh`.
- `LOOPS_REPORT_TRANSACTIONAL_ID` is required if you want the report page to email the actual report to the user.

If `LOOPS_API_KEY` is missing in local development, the project falls back to local file storage for testing.

### Report email template

The report page now uses a dedicated `/api/report-email` endpoint and expects a published Loops transactional email template.

Suggested data variables used by the code:

- `reportTitle`
- `idea`
- `targetCustomer`
- `overallScore`
- `verdict`
- `recommendation`
- `confidenceLabel`
- `executiveSummary`
- `scoreLines`
- `wedge`
- `nextSteps`
- `risks`
- `positioning`
- `headline`
- `reportUrl`
