--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5
-- Dumped by pg_dump version 13.3

-- Started on 2022-04-21 03:43:03

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
-- TOC entry 200 (class 1259 OID 16385)
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
-- TOC entry 201 (class 1259 OID 16393)
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
-- TOC entry 3108 (class 0 OID 0)
-- Dependencies: 201
-- Name: ingests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingests_id_seq OWNED BY public.ingests.id;


--
-- TOC entry 202 (class 1259 OID 16395)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16398)
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
-- TOC entry 3109 (class 0 OID 0)
-- Dependencies: 203
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 204 (class 1259 OID 16400)
-- Name: migrations_state; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations_state (
    key character varying NOT NULL,
    value text NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.migrations_state OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16406)
-- Name: monitor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.monitor (
    id integer NOT NULL,
    name character varying,
    url character varying,
    source character varying,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.monitor OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16413)
-- Name: monitor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.monitor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.monitor_id_seq OWNER TO postgres;

--
-- TOC entry 3110 (class 0 OID 0)
-- Dependencies: 206
-- Name: monitor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.monitor_id_seq OWNED BY public.monitor.id;


--
-- TOC entry 207 (class 1259 OID 16415)
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
-- TOC entry 208 (class 1259 OID 16422)
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
-- TOC entry 3111 (class 0 OID 0)
-- Dependencies: 208
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- TOC entry 209 (class 1259 OID 16424)
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
-- TOC entry 210 (class 1259 OID 16431)
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
-- TOC entry 3112 (class 0 OID 0)
-- Dependencies: 210
-- Name: relays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relays_id_seq OWNED BY public.relays.id;


--
-- TOC entry 211 (class 1259 OID 16433)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role_name character varying NOT NULL,
    role_description character varying
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16439)
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
-- TOC entry 3113 (class 0 OID 0)
-- Dependencies: 212
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 213 (class 1259 OID 16441)
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
-- TOC entry 214 (class 1259 OID 16448)
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
-- TOC entry 3114 (class 0 OID 0)
-- Dependencies: 214
-- Name: targets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.targets_id_seq OWNED BY public.targets.id;


--
-- TOC entry 215 (class 1259 OID 16450)
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
-- TOC entry 216 (class 1259 OID 16458)
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
-- TOC entry 3115 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2908 (class 2604 OID 16460)
-- Name: ingests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingests ALTER COLUMN id SET DEFAULT nextval('public.ingests_id_seq'::regclass);


--
-- TOC entry 2909 (class 2604 OID 16461)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 2911 (class 2604 OID 16462)
-- Name: monitor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitor ALTER COLUMN id SET DEFAULT nextval('public.monitor_id_seq'::regclass);


--
-- TOC entry 2913 (class 2604 OID 16463)
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- TOC entry 2915 (class 2604 OID 16464)
-- Name: relays id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays ALTER COLUMN id SET DEFAULT nextval('public.relays_id_seq'::regclass);


--
-- TOC entry 2916 (class 2604 OID 16465)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 2918 (class 2604 OID 16466)
-- Name: targets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.targets ALTER COLUMN id SET DEFAULT nextval('public.targets_id_seq'::regclass);


--
-- TOC entry 2921 (class 2604 OID 16467)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3086 (class 0 OID 16385)
-- Dependencies: 200
-- Data for Name: ingests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingests (id, folder, job_id, description, active, user_id, created_at, stopped_at, origin) FROM stdin;
\.


--
-- TOC entry 3088 (class 0 OID 16395)
-- Dependencies: 202
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, name, run_on) FROM stdin;
1	/20211004005938-add-organizations	2022-04-21 03:12:09.158
2	/20211005231337-add-users	2022-04-21 03:12:09.181
3	/20211005235309-unique-orgname-and-username	2022-04-21 03:12:09.195
4	/20211006001901-add-ingests	2022-04-21 03:12:09.227
5	/20211006002447-add-targets	2022-04-21 03:12:09.246
6	/20211006004018-add-relays	2022-04-21 03:12:09.27
7	/20211007002313-delete-duplicate-fks	2022-04-21 03:12:09.277
8	/20211007012557-delete-target-duplicate-fk	2022-04-21 03:12:09.289
9	/20211007233325-add-relay-job-id	2022-04-21 03:12:09.307
10	/20211019232358-add-roles	2022-04-21 03:12:09.322
11	/20211020235155-roles-delete-full-name	2022-04-21 03:12:09.328
12	/20211020235444-users-add-roles-fk	2022-04-21 03:12:09.335
13	/20211024192040-add-origin-to-ingests	2022-04-21 03:12:09.34
14	/20220420232546-add-monitor	2022-04-21 03:12:09.358
\.


--
-- TOC entry 3090 (class 0 OID 16400)
-- Dependencies: 204
-- Data for Name: migrations_state; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations_state (key, value, run_on) FROM stdin;
\.


--
-- TOC entry 3091 (class 0 OID 16406)
-- Dependencies: 205
-- Data for Name: monitor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.monitor (id, name, url, source, user_id, created_at) FROM stdin;
\.


--
-- TOC entry 3093 (class 0 OID 16415)
-- Dependencies: 207
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organizations (id, orgname, address, phone, created_at) FROM stdin;
1	Demo Organization	840 Middle Turnpike E	8606495245	2022-01-31 00:03:53.472877
\.


--
-- TOC entry 3095 (class 0 OID 16424)
-- Dependencies: 209
-- Data for Name: relays; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.relays (id, description, active, user_id, target_id, ingest_id, created_at, stopped_at, job_id) FROM stdin;
\.


--
-- TOC entry 3097 (class 0 OID 16433)
-- Dependencies: 211
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, role_name, role_description) FROM stdin;
1	admin	Administrator
2	orgleader	Organization Manager
3	user	User
\.


--
-- TOC entry 3099 (class 0 OID 16441)
-- Dependencies: 213
-- Data for Name: targets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.targets (id, server, stream_key, description, public_url, platform, user_id, created_at) FROM stdin;
1	rtmp://stream1.kroket.demo.arturobracero.com:1936/show/	test	Test 1	https://player1.kroket.demo.arturobracero.com/player.html	custom	2	2022-01-31 00:21:19.64061
2	rtmp://stream2.kroket.demo.arturobracero.com:1937/show/	test	Test 2	https://player2.kroket.demo.arturobracero.com/player.html	custom	2	2022-01-31 00:21:19.64061
\.


--
-- TOC entry 3101 (class 0 OID 16450)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password_hash, email, full_name, organization_id, created_at, role_id) FROM stdin;
2	demo	$2b$10$UyC8tnAmno.fvOe8URTJSOiiXf5.lL.OXlotYhIUJyHCdgncMx4We	demo@demo.com	Demo User	1	2022-01-31 00:04:02.234686	3
\.


--
-- TOC entry 3116 (class 0 OID 0)
-- Dependencies: 201
-- Name: ingests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingests_id_seq', 1, false);


--
-- TOC entry 3117 (class 0 OID 0)
-- Dependencies: 203
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 14, true);


--
-- TOC entry 3118 (class 0 OID 0)
-- Dependencies: 206
-- Name: monitor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.monitor_id_seq', 1, false);


--
-- TOC entry 3119 (class 0 OID 0)
-- Dependencies: 208
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_id_seq', 1, false);


--
-- TOC entry 3120 (class 0 OID 0)
-- Dependencies: 210
-- Name: relays_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relays_id_seq', 1, false);


--
-- TOC entry 3121 (class 0 OID 0)
-- Dependencies: 212
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 3122 (class 0 OID 0)
-- Dependencies: 214
-- Name: targets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.targets_id_seq', 1, false);


--
-- TOC entry 3123 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 2923 (class 2606 OID 16469)
-- Name: ingests ingests_job_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingests
    ADD CONSTRAINT ingests_job_id_key UNIQUE (job_id);


--
-- TOC entry 2925 (class 2606 OID 16471)
-- Name: ingests ingests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingests
    ADD CONSTRAINT ingests_pkey PRIMARY KEY (id);


--
-- TOC entry 2927 (class 2606 OID 16473)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 2929 (class 2606 OID 16475)
-- Name: migrations_state migrations_state_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations_state
    ADD CONSTRAINT migrations_state_pkey PRIMARY KEY (key);


--
-- TOC entry 2931 (class 2606 OID 16477)
-- Name: monitor monitor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitor
    ADD CONSTRAINT monitor_pkey PRIMARY KEY (id);


--
-- TOC entry 2933 (class 2606 OID 16479)
-- Name: organizations organizations_orgname_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_orgname_key UNIQUE (orgname);


--
-- TOC entry 2935 (class 2606 OID 16481)
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- TOC entry 2937 (class 2606 OID 16483)
-- Name: relays relays_job_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relays_job_id_key UNIQUE (job_id);


--
-- TOC entry 2939 (class 2606 OID 16485)
-- Name: relays relays_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relays_pkey PRIMARY KEY (id);


--
-- TOC entry 2941 (class 2606 OID 16487)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2943 (class 2606 OID 16489)
-- Name: targets targets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.targets
    ADD CONSTRAINT targets_pkey PRIMARY KEY (id);


--
-- TOC entry 2945 (class 2606 OID 16491)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2947 (class 2606 OID 16493)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2948 (class 2606 OID 16494)
-- Name: ingests ingests_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingests
    ADD CONSTRAINT ingests_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 2949 (class 2606 OID 16499)
-- Name: monitor monitor_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitor
    ADD CONSTRAINT monitor_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 2950 (class 2606 OID 16504)
-- Name: relays relay_ingest_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relay_ingest_id_fk FOREIGN KEY (ingest_id) REFERENCES public.ingests(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 2951 (class 2606 OID 16509)
-- Name: relays relay_target_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relay_target_id_fk FOREIGN KEY (target_id) REFERENCES public.targets(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 2952 (class 2606 OID 16514)
-- Name: relays relay_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relays
    ADD CONSTRAINT relay_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 2953 (class 2606 OID 16519)
-- Name: targets targets_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.targets
    ADD CONSTRAINT targets_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 2954 (class 2606 OID 16524)
-- Name: users users_organization_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_organization_id_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 2955 (class 2606 OID 16529)
-- Name: users users_role_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fk FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE CASCADE;


-- Completed on 2022-04-21 03:43:04

--
-- PostgreSQL database dump complete
--

