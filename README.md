This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Unorganized Steps

- after deploying the SST stack (or maybe before?), load your Config.Secrets from your .env file:
  `npx sst secrets load .env`

## Errors

- There was an error related to @aws-cdk modules while spinning up the SST stack.
  Can't remember exactly what the error was, but the solution was to downgrade the sst package version to 2.39.2. We should be able to revert to the latest after the bug is fixed.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [SST](https://sst.dev) - Build modern full-stack applications on AWS
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [D3 Charts](https://d3js.org) - The JavaScript library for bespoke data visualization
