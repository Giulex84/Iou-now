# IOU

Simple IOU tracker built for the Pi Browser.  
Track who owes what in a clean dark UI.

## Features

- Add new IOUs with:
  - description
  - amount
  - person involved
  - direction (I owe / they owe me)
- Automatic totals:
  - **They owe me**
  - **I owe**
- Persistent storage on **Supabase**
- Delete IOUs from the history list
- Global currency switch:
  - € EUR
  - $ USD
  - π Pi

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/) for database
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Deployed on [Vercel](https://vercel.com/)

## Environment Variables

Create a `.env.local` file (or configure them on Vercel) with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PI_API_KEY=your_pi_api_key
