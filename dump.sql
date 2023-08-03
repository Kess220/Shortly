CREATE TABLE public.links ( id integer NOT NULL, original_url text NOT NULL, short_code character varying(10) NOT NULL, created_at timestamp without time zone NOT NULL, userid integer);
ALTER TABLE public.links OWNER TO postgres;

CREATE SEQUENCE public.links_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.links_id_seq OWNER TO postgres;
ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;

CREATE TABLE public.users ( id integer NOT NULL, email character varying(255) NOT NULL, password character varying(255) NOT NULL, name character varying(255));
ALTER TABLE public.users OWNER TO postgres;

CREATE SEQUENCE public.users_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER TABLE public.users_id_seq OWNER TO postgres;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

COPY public.links (id, original_url, short_code, created_at, userid) FROM stdin;
3	https://www.example.com	5Fhilush	2023-08-02 16:21:20.865	\N
7	https://www.example.com	5tEF1cyw	2023-08-02 16:39:50.396	\N
8	https://www.example.com	p4lhJRmb	2023-08-02 16:44:33.859	\N
\.

COPY public.users (id, email, password, name) FROM stdin;
2	Kaio@driven.com.br	$2b$10$ieEL4jSfXLgyQs77octN3.qek1AN3YzNJijgpejvYqpsfHdSC8nO.Kaio.
\.

ALTER TABLE ONLY public.links ADD CONSTRAINT links_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.links ADD CONSTRAINT links_short_code_key UNIQUE (short_code);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.links ADD CONSTRAINT links_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);
