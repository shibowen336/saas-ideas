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

## Report Email Delivery

The report page can email the generated validation report through Loops in production.

Set these environment variables locally or in Vercel:

```bash
LOOPS_API_KEY=...
LOOPS_REPORT_TRANSACTIONAL_ID=...
```

Notes:

- `LOOPS_API_KEY` is required in production.
- `LOOPS_REPORT_TRANSACTIONAL_ID` is required if you want the report page to email the actual report to the user.

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
