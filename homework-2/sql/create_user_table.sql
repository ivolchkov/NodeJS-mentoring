CREATE TABLE IF NOT EXISTS public.Users
(
    uuid uuid NOT NULL,
    login character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean NOT NULL DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (uuid),
    CONSTRAINT users_login_key UNIQUE (login)
)

TABLESPACE pg_default;

ALTER TABLE public.Users
    OWNER to root;
