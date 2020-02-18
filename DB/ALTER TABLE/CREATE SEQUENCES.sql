----------------------------LEAVE----------------------------------

------------------------------PSR----------------------------------
CREATE SEQUENCE public.psr_psr_no_seq
    INCREMENT 1
    START 10000
    MINVALUE 10000
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.psr_psr_no_seq
    OWNER TO "nivleM";
	
ALTER TABLE public."psr"  
ALTER COLUMN psr_no SET DEFAULT nextval('psr_psr_no_seq'::regclass);

-------------------------PURCHASE ORDER----------------------------
CREATE SEQUENCE public.purchase_order_po_no_seq
    INCREMENT 1
    START 10000
    MINVALUE 10000
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.purchase_order_po_no_seq
    OWNER TO "nivleM";
	
ALTER TABLE public."purchase_order"  
ALTER COLUMN po_no SET DEFAULT nextval('purchase_order_po_no_seq'::regclass);

-----------------------------USER----------------------------------