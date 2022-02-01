--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5
-- Dumped by pg_dump version 13.5

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
-- Name: ingests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingests (
    id integer NOT NULL,
    folder character varying NOT NULL,
    job_id character varying NOT NULL,
    description character varying,
    active boolean,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    stopped_at timestamp without time zone,
    origin character varying DEFAULT 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'::character varying NOT NULL
);


ALTER TABLE public.ingests OWNER TO postgres;

--
-- Name: ingests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingests_id_seq OWNER TO postgres;

--
-- Name: ingests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingests_id_seq OWNED BY public.ingests.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: migrations_state; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations_state (
    key character varying NOT NULL,
    value text NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.migrations_state OWNER TO postgres;

--
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations (
    id integer NOT NULL,
    orgname character varying NOT NULL,
    address character varying,
    phone character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.organizations OWNER TO postgres;

--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organizations_id_seq OWNER TO postgres;

--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- Name: relays; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.relays (
    id integer NOT NULL,
    description character varying,
    active boolean,
    user_id integer NOT NULL,
    target_id integer NOT NULL,
    ingest_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    stopped_at timestamp without time zone,
    job_id character varying NOT NULL
);


ALTER TABLE public.relays OWNER TO postgres;

--
-- Name: relays_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relays_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relays_id_seq OWNER TO postgres;

--
-- Name: relays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relays_id_seq OWNED BY public.relays.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role_name character varying NOT NULL,
    role_description character varying
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: targets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.targets (
    id integer NOT NULL,
    server character varying NOT NULL,
    stream_key character varying NOT NULL,
    description character varying,
    public_url character varying,
    platform character varying,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.targets OWNER TO postgres;

--
-- Name: targets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.targets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.targets_id_seq OWNER TO postgres;

--
-- Name: targets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.targets_id_seq OWNED BY public.targets.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password_hash character varying NOT NULL,
    email character varying NOT NULL,
    full_name character varying,
    organization_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    role_id integer DEFAULT 3 NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: ingests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingests ALTER COLUMN id SET DEFAULT nextval('public.ingests_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- Name: relays id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays ALTER COLUMN id SET DEFAULT nextval('public.relays_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: targets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.targets ALTER COLUMN id SET DEFAULT nextval('public.targets_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ingests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingests (id, folder, job_id, description, active, user_id, created_at, stopped_at, origin) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, name, run_on) FROM stdin;
\.


--
-- Data for Name: migrations_state; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations_state (key, value, run_on) FROM stdin;
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT into public.organizations values (1, 'Demo Organization', '840 Middle Turnpike E', '8606494245', '2022-01-31 00:03:53.472877');
--COPY public.organizations (id, orgname, address, phone, created_at) FROM stdin;
--1       Demo Organization       840 Middle Turnpike E, Manchester, CT 06040     8606494245      2022-01-31 00:03:53.472877
--\.


--
-- Data for Name: relays; Type: TABLE DATA; Schema: public; Owner: postgres
--
--INSERT into public.relays values )
--COPY public.relays (id, description, active, user_id, target_id, ingest_id, created_at, stopped_at, job_id) FROM stdin;
--\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT into public.roles values (1, 'admin', 'Administrator'), (2, 'orgleader', 'Organization Manager'), (3, 'user', 'User');
--COPY public.roles (id, role_name, role_description) FROM stdin;
--1       admin   Administrator
--2       orgleader\n     Organization Manager
--3       user    User
--\.


--
-- Data for Name: targets; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT into public.targets values (1, 'rtmp://a.rtmp.youtube.com/live2', '4zz8-z91z-m1k7-5kth', 'YouTube Test', 'https://www.youtube.com/watch?v=E-chOPvxeB', 'youtube', 2, '2022-01-31 00:21:19.64061');
--COPY public.targets (id, server, stream_key, description, public_url, platform, user_id, created_at) FROM stdin;
--1       rtmp://a.rtmp.youtube.com/live2 4zz8-z91z-m1k7-5kth        YouTube Test    https://www.youtube.com/watch?v=E-chOPvxeB     youtube 2       2022-01-31 00:21:19.64061
--\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT into public.users values (2, 'demo', '$2b$10$UyC8tnAmno.fvOe8URTJSOiiXf5.lL.OXlotYhIUJyHCdgncMx4We', 'demo@demo.com', 'Demo User', 1, '2022-01-31 00:04:02.234686', 3);
--COPY public.users (id, username, password_hash, email, full_name, organization_id, created_at, role_id) FROM stdin;
--2       demo    $2b$10$UyC8tnAmno.fvOe8URTJSOiiXf5.lL.OXlotYhIUJyHCdgncMx4We    demo@demo.com   Demo User       1      2022-01-31 00:04:02.234686       3
--\.


--
-- Name: ingests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingests_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_id_seq', 1, false);


--
-- Name: relays_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relays_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: targets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.targets_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: ingests ingests_job_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingests
    ADD CONSTRAINT ingests_job_id_key UNIQUE (job_id);


--
-- Name: ingests ingests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingests
    ADD CONSTRAINT ingests_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: migrations_state migrations_state_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations_state
    ADD CONSTRAINT migrations_state_pkey PRIMARY KEY (key);


--
-- Name: organizations organizations_orgname_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_orgname_key UNIQUE (orgname);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: relays relays_job_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relays_job_id_key UNIQUE (job_id);


--
-- Name: relays relays_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relays_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: targets targets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.targets
    ADD CONSTRAINT targets_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: ingests ingests_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingests
    ADD CONSTRAINT ingests_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: relays relay_ingest_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relay_ingest_id_fk FOREIGN KEY (ingest_id) REFERENCES public.ingests(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: relays relay_target_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relay_target_id_fk FOREIGN KEY (target_id) REFERENCES public.targets(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: relays relay_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relay_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: targets targets_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.targets
    ADD CONSTRAINT targets_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: users users_organization_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: users users_role_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fk FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--