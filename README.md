/app
/(marketing) # public pages, RSC by default
/(dashboard)
interviews/
page.tsx # list
new/page.tsx # create
[id]/page.tsx # detail
sessions/[id]/page.tsx
feedback/[sessionId]/page.tsx
api/ # route handlers for webhooks only (if needed)

/features
interviews/ # feature vertical
components/ # client components only
server/ # server actions, queries (RSC)
hooks/
schema.ts # zod DTOs
index.ts
sessions/
feedback/
auth/

/core # shared infra (small, stable)
db/ # Supabase client, SQL tags, migrations glue
vapi/ # SDK client, workflow helpers, webhook verifiers
llm/ # Gemini clients, prompt templates
analytics/ # telemetry helpers
security/ # RLS helper, redaction, consent utilities
config/ # env parsing (zod), constants

/ui # design system primitives (shadcn/ui wrappers)
form/
table/
badge/
skeleton/

/lib # small pure helpers (date, string, audio)
