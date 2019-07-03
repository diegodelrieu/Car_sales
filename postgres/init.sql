CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE public.cars (
    id integer NOT NULL,
    "purchase_date" character varying(30),
    "first_name" character varying(30),
    "last_name" character varying(30),
    "age" character varying,
    "car_brand" public.citext,
    "km_year" integer
);

CREATE INDEX index_km_year
ON cars (km_year);

CREATE INDEX index_purchase_date
ON cars (purchase_date);

CREATE INDEX index_car_brand
ON cars (car_brand);

CREATE SEQUENCE public.cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;

ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);

COPY cars("purchase_date", "first_name", "last_name", "age", "car_brand", "km_year") FROM '/data/car_sales.csv' DELIMITERS ';' CSV HEADER;
