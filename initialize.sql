CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table public.constituents
(
    id      uuid default uuid_generate_v1() not null
        constraint constituents_pk
            primary key,
    email   text                            not null,
    name    text,
    address text,
    signup_time timestamptz not null
);

create index constituents_email_index
    on public.constituents (email);

create index constituents_name_index
    on public.constituents (name);

alter table public.constituents
    add constraint constituents_pk_2
        unique (email);