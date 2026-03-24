# Wander Themes

Color system engine and template builder for short-term rental direct booking sites, built on the Wander Design System.

## Setup

This project uses the private `@wandercom/design-system-web` package from GitHub Packages. You need an `NPM_TOKEN` to install dependencies.

1. Create a GitHub personal access token with `read:packages` scope
2. Set it as an environment variable:

```bash
export NPM_TOKEN=your_github_token_here
```

3. Install and run:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the template builder.

## Pages

- `/` — Template builder with 3 site templates, 5 color sub-themes, 12 color presets, and 10 font pairings
- `/color` — Color system configurator with ramp visualization, token inspector, and Figma export
- `/type` — Typography/font pairing picker

## Deploy on Vercel

Add `NPM_TOKEN` as an environment variable in your Vercel project settings (Settings > Environment Variables). Apply to Production, Preview, and Development.
