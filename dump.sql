--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    original_url text NOT NULL,
    short_code character varying(10) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    userid integer,
    visit_count integer DEFAULT 0
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255),
    created_at timestamp without time zone,
    visit_count integer DEFAULT 0
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES (3, 'https://www.example.com', '5Fhilush', '2023-08-02 16:21:20.865', NULL, 0);
INSERT INTO public.links VALUES (7, 'https://www.example.com', '5tEF1cyw', '2023-08-02 16:39:50.396', NULL, 0);
INSERT INTO public.links VALUES (8, 'https://www.example.com', 'p4lhJRmb', '2023-08-02 16:44:33.859', NULL, 0);
INSERT INTO public.links VALUES (9, 'https://www.example.com', 'zS79nIZb', '2023-08-03 16:53:42.371', NULL, 0);
INSERT INTO public.links VALUES (10, 'https://www.example.com', 'GILgTgGI', '2023-08-03 19:34:02.785', NULL, 0);
INSERT INTO public.links VALUES (11, 'https://www.example.com', 'JovNdvLc', '2023-08-03 19:38:44.803', NULL, 0);
INSERT INTO public.links VALUES (12, 'https://www.example.com', 'jTp3bzpx', '2023-08-03 19:38:57.751', NULL, 0);
INSERT INTO public.links VALUES (13, 'https://www.example.com', 'Hmk5p_4k', '2023-08-03 20:08:01.813', NULL, 0);
INSERT INTO public.links VALUES (14, 'https://www.example.com', '6cGlWX1j', '2023-08-03 20:56:19.965', NULL, 0);
INSERT INTO public.links VALUES (15, 'https://www.example.com', 'zlrGTPUE', '2023-08-03 20:56:20.652', NULL, 0);
INSERT INTO public.links VALUES (16, 'https://www.example.com', 'bDA38ml-', '2023-08-03 20:56:21.148', NULL, 0);
INSERT INTO public.links VALUES (17, 'https://www.example.com', 'ZkVMFvOJ', '2023-08-03 20:56:21.592', NULL, 0);
INSERT INTO public.links VALUES (18, 'https://www.example.com', 'OYwh8ynl', '2023-08-03 21:11:46.179', NULL, 0);
INSERT INTO public.links VALUES (19, 'https://www.example.com', 'WscKahio', '2023-08-03 21:16:06.275', 4, 0);
INSERT INTO public.links VALUES (20, 'https://www.example.com', 'vPqHkvKw', '2023-08-03 21:16:35.884', 4, 0);
INSERT INTO public.links VALUES (21, 'https://www.example.com', 'wvJiUE-q', '2023-08-03 21:16:36.491', 4, 0);
INSERT INTO public.links VALUES (22, 'https://www.example.com', 'IBacdMyb', '2023-08-03 21:16:48.016', 4, 0);
INSERT INTO public.links VALUES (23, 'https://www.google.com', '0wyJDd5u', '2023-08-03 21:17:00.612', 4, 0);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'Kaio@driven.com.br', '$2b$10$ieEL4jSfXLgyQs77octN3.qek1AN3YzNJijgpejvYqpsfHdSC8nO.', 'Kaio', NULL, 0);
INSERT INTO public.users VALUES (3, 'Klber.Nogueira@yahoo.com', '$2b$10$/50MOAQrLmBE/mDqZzvoSuffolOTosim7uEDxW0bSXLGwdn5CJagy', 'Ladislau Xavier', NULL, 0);
INSERT INTO public.users VALUES (4, 'prodvictorkaio@gmail.com', '$2b$10$qNyYAw9xu8203xVjKLR1JuG32QZ80rFQ6DGVwoRsz8BeejjsVTnBq', 'Kaio', NULL, 0);


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 23, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: links links_short_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_short_code_key UNIQUE (short_code);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: links links_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--