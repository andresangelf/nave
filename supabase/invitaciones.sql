-- Registro por invitación para Nave · Tareas del equipo
-- Ejecutar una vez en el SQL Editor del proyecto de Supabase (después del esquema base).
-- Cada persona recibe un enlace  https://<tu-sitio>/?registro=<token>  de un solo uso.

-- 1) El rol "fundador" puede editar, igual que admin y editor
alter table public.perfiles drop constraint if exists perfiles_rol_check;
alter table public.perfiles add constraint perfiles_rol_check
  check (rol in ('admin','editor','fundador','lector'));

do $$ declare t text; begin
  foreach t in array array['nave_areas','nave_eventos','nave_tareas','nave_tarea_miembros'] loop
    execute format('drop policy if exists %I on public.%I', t||'_write', t);
    execute format('create policy %I on public.%I for all
      using (public.mi_rol() in (''admin'',''editor'',''fundador''))
      with check (public.mi_rol() in (''admin'',''editor'',''fundador''))', t||'_write', t);
  end loop;
end $$;

-- 2) Invitaciones (sin políticas: solo se leen a través de las funciones de abajo)
create table if not exists public.nave_invitaciones (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  nombre text not null,
  rol text not null default 'lector' check (rol in ('admin','editor','fundador','lector')),
  token text not null unique default encode(gen_random_bytes(16), 'hex'),
  usada boolean not null default false,
  expira_en timestamptz not null default now() + interval '14 days',
  creado_en timestamptz not null default now()
);
alter table public.nave_invitaciones enable row level security;

-- 3) La página de registro consulta la invitación con su token
create or replace function public.nave_ver_invitacion(p_token text)
returns table (email text, nombre text, rol text)
language sql stable security definer set search_path = '' as $$
  select i.email, i.nombre, i.rol
  from public.nave_invitaciones i
  where i.token = p_token and not i.usada and i.expira_en > now()
$$;
revoke execute on function public.nave_ver_invitacion(text) from public;
grant execute on function public.nave_ver_invitacion(text) to anon, authenticated;

-- 4) Al crearse un usuario: si trae un token válido para su correo, recibe el rol invitado.
--    Sin invitación válida se mantiene el comportamiento anterior (el primero es admin, el resto lector).
create or replace function public.crear_perfil_nuevo_usuario() returns trigger
language plpgsql security definer set search_path = '' as $$
declare inv public.nave_invitaciones;
begin
  select * into inv from public.nave_invitaciones
   where token = new.raw_user_meta_data->>'invitacion'
     and lower(email) = lower(new.email)
     and not usada and expira_en > now()
   for update;
  if found then
    update public.nave_invitaciones set usada = true where id = inv.id;
    insert into public.perfiles (id, nombre_completo, rol) values (new.id, inv.nombre, inv.rol);
  else
    insert into public.perfiles (id, nombre_completo, rol)
    values (new.id,
            coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email, '@', 1)),
            case when (select count(*) from public.perfiles) = 0 then 'admin' else 'lector' end);
  end if;
  return new;
end $$;
