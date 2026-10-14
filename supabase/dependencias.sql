-- Dependencias entre tareas para Nave · Tareas del equipo
-- Ejecutar una vez en el SQL Editor (después del esquema base).
-- "tarea_id depende de depende_de_id": la primera no debería empezar hasta que termine la segunda.
-- Hasta que se ejecute, el sitio sigue funcionando y simplemente oculta la sección de dependencias.

create table if not exists public.nave_tarea_dependencias (
  tarea_id uuid not null references public.nave_tareas(id) on delete cascade,
  depende_de_id uuid not null references public.nave_tareas(id) on delete cascade,
  creado_en timestamptz not null default now(),
  primary key (tarea_id, depende_de_id),
  check (tarea_id <> depende_de_id)
);
create index if not exists nave_dependencias_depende_idx on public.nave_tarea_dependencias(depende_de_id);

alter table public.nave_tarea_dependencias enable row level security;
drop policy if exists nave_dependencias_select on public.nave_tarea_dependencias;
drop policy if exists nave_dependencias_write on public.nave_tarea_dependencias;
create policy nave_dependencias_select on public.nave_tarea_dependencias
  for select using (auth.role() = 'authenticated');
create policy nave_dependencias_write on public.nave_tarea_dependencias for all
  using (public.mi_rol() in ('admin','editor','fundador'))
  with check (public.mi_rol() in ('admin','editor','fundador'));

-- Evita ciclos (A depende de B y B de A, o cadenas más largas que se cierran)
create or replace function public.nave_evitar_ciclo_dependencias() returns trigger
language plpgsql set search_path = '' as $$
begin
  if exists (
    with recursive arriba(id) as (
      select new.depende_de_id
      union
      select d.depende_de_id
      from public.nave_tarea_dependencias d join arriba on d.tarea_id = arriba.id
    )
    select 1 from arriba where id = new.tarea_id
  ) then
    raise exception 'Esa dependencia crearía un ciclo entre tareas' using errcode = '23514';
  end if;
  return new;
end $$;

drop trigger if exists nave_dependencias_sin_ciclos on public.nave_tarea_dependencias;
create trigger nave_dependencias_sin_ciclos
  before insert or update on public.nave_tarea_dependencias
  for each row execute function public.nave_evitar_ciclo_dependencias();
