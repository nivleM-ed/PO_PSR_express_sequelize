CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-------------------------CONSTRAINTS-------------------------------
----------------------------LEAVE----------------------------------
ALTER TABLE public."leave" 
ADD CONSTRAINT FK_LV_CREATE_USR FOREIGN KEY (user_id) REFERENCES public."Users" (id);

ALTER TABLE public."leave" 
ADD CONSTRAINT FK_LV_REPLACE_ID FOREIGN KEY (replace_id) REFERENCES public."Users" (id);

ALTER TABLE public."leave" 
ADD CONSTRAINT FK_LV_APPRV_USR FOREIGN KEY (approver_id) REFERENCES public."Users" (id);

------------------------------PSR----------------------------------
ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_CREATE_USR FOREIGN KEY (create_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_DEL_USR FOREIGN KEY (del_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_APPRV_USR FOREIGN KEY (approver_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_T2_USR FOREIGN KEY (t2_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_T3_USR FOREIGN KEY (t3_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_DECL_USR FOREIGN KEY (decline_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_DEP_ID FOREIGN KEY (department_id) REFERENCES public."department" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_BRANCH_ID FOREIGN KEY (branch_id) REFERENCES public."branch" (id);

ALTER TABLE public."psr" 
ADD UNIQUE (psr_no, department_id, branch_id);

-------------------------PURCHASE ORDER----------------------------
ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_CREATE_USR FOREIGN KEY (create_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_DEL_USR FOREIGN KEY (del_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_APPRV_USR FOREIGN KEY (approver_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_T2_USR FOREIGN KEY (t2_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_T3_USR FOREIGN KEY (t3_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_DECL_USR FOREIGN KEY (decline_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_DEP_ID FOREIGN KEY (department_id) REFERENCES public."department" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_BRANCH_ID FOREIGN KEY (branch_id) REFERENCES public."branch" (id);

ALTER TABLE public."purchase_order" 
ADD UNIQUE (po_no, department_id, branch_id);

-----------------------------USER----------------------------------

ALTER TABLE public."Users" 
ADD CONSTRAINT FK_USR_DEP_ID FOREIGN KEY (department_id) REFERENCES public."department" (id);

ALTER TABLE public."Users" 
ADD CONSTRAINT FK_USR_BRANCH_ID FOREIGN KEY (branch_id) REFERENCES public."branch" (id);


-------------------------------------------------------------------
-----------------------------SEQUENCE------------------------------
----------------------------LEAVE----------------------------------

------------------------------PSR----------------------------------
CREATE SEQUENCE public.psr_psr_no_seq
    INCREMENT 1
    START 10000
    MINVALUE 10000
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.psr_psr_no_seq
    OWNER TO "postgres";
	
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
    OWNER TO "postgres";
	
ALTER TABLE public."purchase_order"  
ALTER COLUMN po_no SET DEFAULT nextval('purchase_order_po_no_seq'::regclass);

-----------------------------USER----------------------------------



-----------------------------------------------------------------------------------------
----------------------------------------SET USERS----------------------------------------

--admin password--
INSERT INTO public."Users"(
	id, "createdAt", "updatedAt", username, firstname, lastname, password, email, t1, t2, t3, t4, is_admin)
	VALUES ('96a79aca-fc93-4dc5-911d-db71655d231c', '2019-11-09 22:26:26.695+08', '2019-11-09 22:26:26.695+08', 'admin', null, null, '$2b$08$XrJRsxRvTgxklZr9ov23leh0GkEIg5XJ08RFD/PIIEtqLKGQdQxQ2', null, false, false, false, false, true);
	
--usert1 password--
INSERT INTO public."Users"(
	id, "createdAt", "updatedAt", username, firstname, lastname, password, email, t1, t2, t3, t4, is_admin)
	VALUES ('5bf8419c-2b52-485c-b01e-ed82c89f069a', '2019-11-09 22:27:40.18+08', '2019-11-09 22:26:26.695+08', 'usert1', 'usert1_fn', 'ln', '$2b$08$E8jMVf.6YF7WtSbOlAkwoesBqvCmi/Vkrxo4aqF8v6ZuCcnVGLDWa', null, true, false, false, false, false);
	
--usert2 password--
INSERT INTO public."Users"(
	id, "createdAt", "updatedAt", username, firstname, lastname, password, email, t1, t2, t3, t4, is_admin)
	VALUES ('1b578a15-8c04-47f3-87de-cb7e4f06c281', '2019-11-09 22:27:24.151+08', '2019-11-09 22:26:26.695+08', 'usert2', 'usert2_fn', 'ln', '$2b$08$kc17ZDEraQefSpdSFg/ehu4/6A0zCJpqrnccxS8aWU5qDC8GQTTTi', null, false, true, false, false, false);
	
--usert3 password--
INSERT INTO public."Users"(
	id, "createdAt", "updatedAt", username, firstname, lastname, password, email, t1, t2, t3, t4, is_admin)
	VALUES ('21d2dc32-e99c-40c6-9143-32b02b93e7cd', '2019-11-09 22:27:32.422+08', '2019-11-09 22:26:26.695+08', 'usert3', 'usert3_fn', 'ln', '$2b$08$6xi2zB4CbZuttKaNLWOjGOc7XRu8S/8hKkFk.KnIFtPaur/qNRX/O', null, false, false, true, false, false);
	
--usert4 password--
INSERT INTO public."Users"(
	id, "createdAt", "updatedAt", username, firstname, lastname, password, email, t1, t2, t3, t4, is_admin)
	VALUES ('13aeef10-eb77-4d35-8dbb-4fc7ef84d25e', '2019-11-09 22:27:15.77+08', '2019-11-09 22:26:26.695+08', 'usert4', 'usert4_fn', 'ln', '$2b$08$vEEjBpbvcLN8BtcvzBcTPeROHSBh0w8Zwfba6ouBIKF4b0j4y7Kea', null, false, false, false, true, false);
	
-----------------------------------------------------------------------------------------
-- ADD NEW USER
CREATE OR REPLACE FUNCTION public.F_ADD_USR(
	IN in_username VARCHAR,
	IN in_password VARCHAR,
	IN in_firstname VARCHAR,
	IN in_lastname VARCHAR,
	IN in_email VARCHAR,
	IN in_department VARCHAR,
	IN in_branch VARCHAR,
	IN in_contact_no INTEGER,
	IN in_address_1 VARCHAR,
	IN in_address_2 VARCHAR,
	IN in_address_3 VARCHAR,
	IN in_address_4 VARCHAR,
	IN in_t1 BOOLEAN,
	IN in_t2 BOOLEAN,
	IN in_t3 BOOLEAN,
	IN in_t4 BOOLEAN,
	IN in_acct_t BOOLEAN,
	IN in_is_admin BOOLEAN
)
    RETURNS TABLE(
	id VARCHAR
	)
    LANGUAGE 'plpgsql'
AS $$
DECLARE
gen_id UUID;
dep_id VARCHAR;
branch_id VARCHAR;

BEGIN
	CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
	SELECT uuid_generate_v4() INTO gen_id;
	
	SELECT branch.id INTO branch_id 
	FROM public."branch" AS branch 
	WHERE branch.cd = in_branch;
	
	SELECT dep.id INTO dep_id 
	FROM public."department" AS dep 
	WHERE dep.cd = in_department;
	
	INSERT INTO public."Users"(
		id,
		"createdAt",
		"updatedAt",
		username,
		firstname,
		lastname,
		password,
		email,
		department_id,
		branch_id,
		contact_no,
		address_1,
		address_2,
		address_3,
		address_4,
		t1,
		t2,
		t3,
		t4,
		acct_t,
		is_admin
		)
	VALUES (
		gen_id,
		current_timestamp,
		current_timestamp,
		in_username,
		in_firstname,
		in_lastname,
		in_password,
		in_email,
		dep_id,
		branch_id,
		in_contact_no,
		in_address_1,
		in_address_2,
		in_address_3,
		in_address_4,
		in_t1,
		in_t2,
		in_t3,
		in_t4,
		in_acct_t,
		in_is_admin
		);
		
	RETURN QUERY
		SELECT users.id 
		FROM public."Users" AS users
		WHERE users.id = CAST(gen_id AS VARCHAR);
END;
$$;
--------------------------------------------------------------------------------
-- ADD NEW PSR
CREATE OR REPLACE FUNCTION public.F_ADD_PSR(
	IN in_purchase_class VARCHAR,
	IN in_purchase_typ VARCHAR,
	IN in_purchase_just VARCHAR,
	IN in_cost_typ VARCHAR,
	IN in_date_req DATE,
	IN in_project_title VARCHAR,
	IN in_vessel_code VARCHAR,
	IN in_delv VARCHAR,
	IN in_psr_desc JSON,
	IN in_department VARCHAR,
	IN in_branch VARCHAR,
	IN in_create_user VARCHAR
)
    RETURNS TABLE(
	id VARCHAR,
	psr_no VARCHAR
	)
    LANGUAGE 'plpgsql'
AS $$
DECLARE
gen_id UUID;
dep_id VARCHAR;
branch_id VARCHAR;

BEGIN
	CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
	SELECT uuid_generate_v4() INTO gen_id;
	
	SELECT branch.id INTO branch_id 
	FROM public."branch" AS branch 
	WHERE branch.cd = in_branch;
	
	SELECT dep.id INTO dep_id 
	FROM public."department" AS dep 
	WHERE dep.cd = in_department;
	
	INSERT INTO public."psr"(
		id,
		"createdAt",
		"updatedAt",
		purchase_class,
		purchase_typ,
		purchase_just,
		cost_typ,
		date_req,
		project_title,
		vessel_code,
		delv,
		department_id,
		branch_id,
		psr_desc,
		create_user
		)
	VALUES (
		gen_id,
		current_timestamp,
		current_timestamp,
		in_purchase_class,
		in_purchase_typ,
		in_purchase_just,
		in_cost_typ,
		in_date_req,
		in_project_title,
		in_vessel_code,
		in_delv,
		dep_id,
		branch_id,
		in_psr_desc,
		in_create_user
		);
		
	RETURN QUERY
		SELECT 
			inn.id,
			CAST(dep.cd||'/'||branch.cd||'/PSR/'||CAST(inn.psr_no AS VARCHAR) AS VARCHAR) AS psr_no
		FROM (
			SELECT 
				psr.id,
				psr.psr_no,
				psr.department_id,
				psr.branch_id
			FROM public."psr" AS psr
			WHERE psr.id = CAST(gen_id AS VARCHAR)
		) inn
		INNER JOIN public."department" AS dep
		ON dep.id = inn.department_id
		INNER JOIN public."branch" AS branch
		ON branch.id = inn.branch_id;
END;
$$;
------------------------------------------------------------
-- ADD NEW PO
CREATE OR REPLACE FUNCTION public.F_ADD_PO(
	IN in_po_ref VARCHAR,
	IN in_quotation VARCHAR,
	IN in_delv_due DATE,
	IN in_ship_mode VARCHAR,
	IN in_psr_id VARCHAR,
	IN in_cca_no VARCHAR,
	IN in_pay_mode VARCHAR,
	IN in_address_1 VARCHAR,
	IN in_address_2 VARCHAR,
	IN in_address_3 VARCHAR,
	IN in_address_4 VARCHAR,
	IN in_po_desc JSON,
	IN in_cl_name VARCHAR,
	IN in_cl_company VARCHAR,
	IN in_department VARCHAR,
	IN in_branch VARCHAR,
	IN in_create_user VARCHAR
)
    RETURNS TABLE(
	id VARCHAR,
	po_no VARCHAR
	)
    LANGUAGE 'plpgsql'
AS $$
DECLARE
gen_id UUID;
dep_id VARCHAR;
branch_id VARCHAR;

BEGIN
	CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
	SELECT uuid_generate_v4() INTO gen_id;
	
	SELECT branch.id INTO branch_id 
	FROM public."branch" AS branch 
	WHERE branch.cd = in_branch;
	
	SELECT dep.id INTO dep_id 
	FROM public."department" AS dep 
	WHERE dep.cd = in_department;
	
	INSERT INTO public."purchase_order"(
		id,
		"createdAt",
		"updatedAt",
		po_ref,
		quotation,
		delv_due,
		ship_mode,
		psr_id,
		cca_no,
		pay_mode,
		address_1,
		address_2,
		address_3,
		address_4,
		po_desc,
		cl_name,
		cl_company,
		department_id,
		branch_id,
		create_user
		)
	VALUES (
		gen_id,
		current_timestamp,
		current_timestamp,
		in_po_ref,
		in_quotation,
		in_delv_due,
		in_ship_mode,
		in_psr_id,
		in_cca_no,
		in_pay_mode,
		in_address_1,
		in_address_2,
		in_address_3,
		in_address_4,
		in_po_desc,
		in_cl_name,
		in_cl_company,
		dep_id,
		branch_id,
		in_create_user
		);
		
	RETURN QUERY
		SELECT 
			inn.id,
			CAST(dep.cd||'/'||branch.cd||'/PO/'||CAST(inn.po_no AS VARCHAR) AS VARCHAR) AS po_no
		FROM (
			SELECT 
				po.id,
				po.po_no,
				po.department_id,
				po.branch_id
			FROM public."purchase_order" AS po
			WHERE po.id = CAST(gen_id AS VARCHAR)
		) AS inn
		INNER JOIN public."department" AS dep
		ON dep.id = inn.department_id
		INNER JOIN public."branch" AS branch
		ON branch.id = inn.branch_id;
END;
$$;
------------------------------------------------------------
--DROP FUNCTION f_search_psr(integer,character varying,integer,integer,character varying,integer,integer);
-- find user based on name or date
CREATE OR REPLACE FUNCTION public.F_SEARCH_PSR(
	IN in_str INTEGER, -- input psr_no
	IN in_date VARCHAR,
	IN in_month INTEGER,
	IN in_year INTEGER,
	IN in_approve VARCHAR,
	IN in_department VARCHAR,
	IN in_branch VARCHAR,
	IN in_page INTEGER,
	IN in_limit INTEGER
)
    RETURNS TABLE(
	totalrecords INTEGER,
	id varchar, 
	psr_no varchar, 
	created_at date, 
	create_user varchar, 
	approve_user varchar,
	status boolean
	)
    LANGUAGE 'plpgsql'
AS $$
BEGIN
	IF in_approve IS null THEN
		IF in_date IS null and in_month IS null THEN
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.psr_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.psr_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						psr.id,
						CAST(dep.cd||'/'||branch.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = psr.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = psr.branch_id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND branch.cd = in_branch
					AND dep.cd = in_department
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
	
		ELSIF in_date IS null THEN
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.psr_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.psr_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						psr.id,
						CAST(dep.cd||'/'||branch.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = psr.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = psr.branch_id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND
					EXTRACT (MONTH FROM psr."createdAt") = in_month
					AND
					EXTRACT (YEAR FROM psr."createdAt") = in_year
					AND branch.cd = in_branch
					AND dep.cd = in_department
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
			
		ELSE -- find for date
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.psr_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.psr_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						psr.id,
						CAST(dep.cd||'/'||branch.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = psr.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = psr.branch_id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND
					to_date(in_date, 'YYYY-MM-DD') = psr."createdAt"
					AND branch.cd = in_branch
					AND dep.cd = in_department
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
			
		END IF;
		
	ELSE -- in_approve IS NOT NULL (only get with status true)
		IF in_date IS null and in_month IS null THEN
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.psr_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.psr_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						psr.id,
						CAST(dep.cd||'/'||branch.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = psr.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = psr.branch_id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND psr.status_t1_1 = true
					AND psr.status_t1_2 = true
					AND psr.status_2 = true
					AND branch.cd = in_branch
					AND dep.cd = in_department
					ORDER BY psr."createdAt" 
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
			
		ELSIF in_date IS null THEN
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.psr_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.psr_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						psr.id,
						CAST(dep.cd||'/'||branch.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = psr.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = psr.branch_id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND
					EXTRACT (MONTH FROM psr."createdAt") = in_month
					AND
					EXTRACT (YEAR FROM psr."createdAt") = in_year
					AND psr.status_t1_1 = true
					AND psr.status_t1_2 = true
					AND psr.status_2 = true
					AND branch.cd = in_branch
					AND dep.cd = in_department
					ORDER BY psr."createdAt" 
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
		ELSE -- find for date
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.psr_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.psr_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						psr.id,
						CAST(dep.cd||'/'||branch.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = psr.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = psr.branch_id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND to_date(in_date, 'YYYY-MM-DD') = psr."createdAt"
					AND psr.status_t1_1 = true
					AND psr.status_t1_2 = true
					AND psr.status_2 = true
					AND branch.cd = in_branch
					AND dep.cd = in_department
					ORDER BY psr."createdAt" 
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
		END IF;
	END IF;
END;
$$;
-----------------------------------------------------------------
--DROP FUNCTION f_search_po(integer,character varying,character varying,integer,integer,character varying,integer,integer);
-- find user based on name or date
CREATE OR REPLACE FUNCTION public.F_SEARCH_PO(
	IN in_str INTEGER, -- input po_no
	IN in_company VARCHAR,
	IN in_date VARCHAR,
	IN in_month INTEGER,
	IN in_year INTEGER,
	IN in_approve VARCHAR,
	IN in_department VARCHAR,
	IN in_branch VARCHAR,
	IN in_page INTEGER,
	IN in_limit INTEGER
)
    RETURNS TABLE(
	totalrecords INTEGER,
	id varchar, 
	po_no varchar, 
	created_at date, 
	create_user varchar, 
	approve_user varchar,
	status boolean
	)
    LANGUAGE 'plpgsql'
AS $$
BEGIN
	IF in_approve IS null THEN
		IF in_date IS null and in_month IS null THEN
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.po_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.po_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						po.id,
						CAST(dep.cd||'/'||branch.cd||'/PO/'||CAST(po.po_no AS VARCHAR) AS VARCHAR) AS po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					INNER JOIN public."department" AS dep
					ON dep.id = po.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = po.branch_id	
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND branch.cd = in_branch
					AND dep.cd = in_department
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
			
		ELSIF in_date IS null THEN
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.po_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.po_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						po.id,
						CAST(dep.cd||'/'||branch.cd||'/PO/'||CAST(po.po_no AS VARCHAR) AS VARCHAR) AS po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = po.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = po.branch_id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND
					EXTRACT (MONTH FROM po."createdAt") = in_month
					AND
					EXTRACT (YEAR FROM po."createdAt") = in_year
					AND branch.cd = in_branch
					AND dep.cd = in_department
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
			
		ELSE
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.po_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.po_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						po.id,
						CAST(dep.cd||'/'||branch.cd||'/PO/'||CAST(po.po_no AS VARCHAR) AS VARCHAR) AS po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = po.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = po.branch_id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND to_date(in_date, 'YYYY-MM-DD') = po."createdAt"
					AND branch.cd = in_branch
					AND dep.cd = in_department
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
		
		END IF;
	ELSE
		IF in_date IS null and in_month IS null THEN
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.po_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.po_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						po.id,
						CAST(dep.cd||'/'||branch.cd||'/PO/'||CAST(po.po_no AS VARCHAR) AS VARCHAR) AS po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = po.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = po.branch_id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND po.status_t1_1 = true
					AND po.status_t1_2 = true
					AND po.status_2 = true
					AND branch.cd = in_branch
					AND dep.cd = in_department
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
			
		ELSIF in_date IS null THEN
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.po_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					CAST(dep.cd||'/'||branch.cd||'/PO/'||CAST(po.po_no AS VARCHAR) AS VARCHAR) AS po_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						po.id,
						po.po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = po.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = po.branch_id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND
					EXTRACT (MONTH FROM po."createdAt") = in_month
					AND
					EXTRACT (YEAR FROM po."createdAt") = in_year
					AND po.status_t1_1 = true
					AND po.status_t1_2 = true
					AND po.status_2 = true
					AND branch.cd = in_branch
					AND dep.cd = in_department
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
			
		ELSE
			RETURN QUERY
			SELECT
				inn2.totalrecords,
				inn2.id,
				inn2.po_no,
				to_date(to_char(inn2.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				inn2.create_user,
				inn2.approve_user,
				CASE
					WHEN inn2.approve_user IS null THEN false
					WHEN inn2.approve_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT	
					inn.rn,
					inn.totalrecords,
					inn.id,
					inn.po_no,
					inn.created_at,
					inn.create_user,
					inn.approve_user
				FROM (
					SELECT 
						row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
						CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
						po.id,
						CAST(dep.cd||'/'||branch.cd||'/PO/'||CAST(po.po_no AS VARCHAR) AS VARCHAR) AS po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					INNER JOIN public."department" AS dep
					ON dep.id = po.department_id	
					INNER JOIN public."branch" AS branch
					ON branch.id = po.branch_id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND to_date(in_date, 'YYYY-MM-DD') = po."createdAt"
					AND po.status_t1_1 = true
					AND po.status_t1_2 = true
					AND po.status_2 = true
					AND branch.cd = in_branch
					AND dep.cd = in_department
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
	
		END IF;
	END IF;
END;
$$;	
----------------------------------------------------------
--DROP FUNCTION f_search_leave(character varying,character varying,integer,integer);
-- find user based on name or date
CREATE OR REPLACE FUNCTION public.F_SEARCH_LEAVE(
	IN in_str VARCHAR,
	IN in_date VARCHAR,
	IN in_page INTEGER,
	IN in_limit INTEGER
)
    RETURNS TABLE(
	totalrecords INTEGER,
	id uuid, 
	date_from date, 
	date_to date, 
	user_firstname varchar, 
	approver_firstname varchar, 
	status boolean 
	)
    LANGUAGE 'plpgsql'
AS $$
BEGIN
-- user did not key in date or name
	IF in_date IS null AND in_str IS null THEN 
		RETURN QUERY
		SELECT
			inn2.totalrecords,
			inn2.id,
			inn2.date_from,
			inn2.date_to,
			inn2.user_firstname,
			inn2.approver_firstname,
			inn2.status
		FROM (
			SELECT	
				inn.*
			FROM (
				SELECT 
					row_number() OVER (ORDER BY leave."createdAt" DESC) AS rn,
					CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
					leave.id, 
					leave.date_from, 
					leave.date_to,
					leave.status,
					leave."createdAt" AS created_at,
					myuser.firstname AS user_firstname,
					myuser2.firstname AS approver_firstname
				FROM public."leave" AS leave
				INNER JOIN public."Users" AS myuser 
				ON leave.user_id = myuser.id
				LEFT JOIN public."Users" AS myuser2
				ON leave.approver_id = myuser2.id
				WHERE leave.status = TRUE
				ORDER BY leave."createdAt" 
			) inn
			ORDER BY inn.created_at DESC
			OFFSET (in_page * in_limit) LIMIT in_limit
		) inn2
			;
			
-- user enter name and date		
	ELSE 
		RETURN QUERY
		SELECT
			inn2.totalrecords,
			inn2.id,
			inn2.date_from,
			inn2.date_to,
			inn2.user_firstname,
			inn2.approver_firstname,
			inn2.status
		FROM (
			SELECT	
				inn.*
			FROM (
				SELECT 
					row_number() OVER (ORDER BY leave."createdAt" DESC) AS rn,
					CAST(COUNT(*) OVER() AS INTEGER) AS totalrecords,
					leave.id, 
					leave.date_from, 
					leave.date_to,
					leave.status,
					leave."createdAt" AS created_at,
					myuser.firstname AS user_firstname,
					myuser2.firstname AS approver_firstname
				FROM public."leave" AS leave
				INNER JOIN public."Users" AS myuser 
				ON leave.user_id = myuser.id
				LEFT JOIN public."Users" AS myuser2
				ON leave.approver_id = myuser2.id
				WHERE leave.status = TRUE
				AND
				(
					(	to_date(in_date, 'YYYY-MM-DD') >= leave.date_from
				AND
					to_date(in_date, 'YYYY-MM-DD') <= leave.date_to 
					)
				OR in_date IS null
				)
				AND
				(
					( myuser.username = in_str OR myuser.firstname = in_str )
				OR in_str IS null
				)
				ORDER BY leave."createdAt" 
			) inn
			ORDER BY inn.created_at DESC
			OFFSET (in_page * in_limit) LIMIT in_limit
		) inn2
			;
			
	END IF;
END;
$$;

---------------------------------------------------------------
INSERT INTO public.branch(
	id, "createdAt", "updatedAt", cd, name, address_1, address_2, address_3, address_4)
	VALUES ('86875851-b63f-4394-9f9b-17e2bb9212a2', current_timestamp, current_timestamp, 'DJSB', 'Dinasti Jati Sdn Bhd', '', '', '', '');

INSERT INTO public.department(
	id, "createdAt", "updatedAt", cd, name)
	VALUES ('bd1aca92-38f4-4686-857c-72794c0ed9a1', current_timestamp, current_timestamp, 'ADM', 'Admin');

INSERT INTO public.department(
	id, "createdAt", "updatedAt", cd, name)
	VALUES ('2b2577e8-6d6c-4a25-a118-40b6d34b7036', current_timestamp, current_timestamp, 'TGD', 'Trading');
	
INSERT INTO public.department(
	id, "createdAt", "updatedAt", cd, name)
	VALUES ('335674af-a967-400a-a951-3dab399d191b', current_timestamp, current_timestamp, 'ACCT', 'Account');
	
INSERT INTO public.department(
	id, "createdAt", "updatedAt", cd, name)
	VALUES ('6d548329-953e-4970-91dc-4f0bed8a0fdb', current_timestamp, current_timestamp, 'CCT', 'Commercial & Contract');
	
INSERT INTO public.department(
	id, "createdAt", "updatedAt", cd, name)
	VALUES ('9422de2b-4e23-41b9-b237-13b64900b170', current_timestamp, current_timestamp, 'MAR', 'Marine');