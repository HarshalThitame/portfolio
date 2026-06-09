# Supabase Admin CMS Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor and run `supabase/schema.sql`.
3. Enable Email + Password auth in Supabase Auth.
4. Create the first admin user in Supabase Auth with `harshal.dev.work@gmail.com`.
5. Add the user to `admin_users`:

```sql
insert into public.admin_users (user_id, email, role, status)
select id, email, 'owner', 'active'
from auth.users
where email = 'harshal.dev.work@gmail.com'
on conflict (email) do update
set user_id = excluded.user_id,
    role = 'owner',
    status = 'active';
```

6. Add these environment variables locally and on Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://harshaldevwork.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=harshal.dev.work@gmail.com
NEXT_PUBLIC_WHATSAPP_NUMBER=919623023477
CONTACT_TO_EMAIL=harshal.dev.work@gmail.com
RESEND_API_KEY=
CONTACT_FROM_EMAIL="Harshal Portfolio <your-verified-sender@yourdomain.com>"
```

7. Visit `/admin/login` and sign in with the approved admin user.

The service role key is used only on the server for contact form writes, lead creation, and analytics event ingestion. Do not expose it in client-side code.
