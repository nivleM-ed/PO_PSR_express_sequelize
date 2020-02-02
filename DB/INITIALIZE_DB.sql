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
	VALUES ('13aeef10-eb77-4d35-8dbb-4fc7ef84d25e', '2019-11-09 22:27:15.77+08', '2019-11-09 22:26:26.695+08', 'usert4', 'usert4_fn', 'ln', '$2b$08$vEEjBpbvcLN8BtcvzBcTPeROHSBh0w8Zwfba6ouBIKF4b0j4y7Kea', null, false, true, false, true, false);
	
-----------------------------------------------------------------------------------------
DROP FUNCTION f_search_leave(character varying,character varying,integer,integer);
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
-----------------------------------------------------------------------------------------
DROP FUNCTION f_search_po(integer,character varying,character varying,integer,integer,character varying,integer,integer);
-- find user based on name or date
CREATE OR REPLACE FUNCTION public.F_SEARCH_PO(
	IN in_str INTEGER, -- input po_no
	IN in_company VARCHAR,
	IN in_date VARCHAR,
	IN in_month INTEGER,
	IN in_year INTEGER,
	IN in_approve VARCHAR,
	IN in_page INTEGER,
	IN in_limit INTEGER
)
    RETURNS TABLE(
	totalrecords INTEGER,
	id varchar, 
	po_no INTEGER, 
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
						po.po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
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
						po.po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND
					EXTRACT (MONTH FROM po."createdAt") = in_month
					AND
					EXTRACT (YEAR FROM po."createdAt") = in_year
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
						po.po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND to_date(in_date, 'YYYY-MM-DD') = po."createdAt"
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
						po.po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND po.status_t1_1 = true
					AND po.status_t1_2 = true
					AND po.status_2 = true
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
						po.po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND
					EXTRACT (MONTH FROM po."createdAt") = in_month
					AND
					EXTRACT (YEAR FROM po."createdAt") = in_year
					AND po.status_t1_1 = true
					AND po.status_t1_2 = true
					AND po.status_2 = true
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
						po.po_no,
						po."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."purchase_order" AS po
					INNER JOIN public."Users" AS myuser 
					ON po.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON po.approver_user = myuser2.id
					WHERE ( po.po_no = in_str OR in_str IS null )
					AND	( po.cl_company = in_company OR in_company IS null )
					AND to_date(in_date, 'YYYY-MM-DD') = po."createdAt"
					AND po.status_t1_1 = true
					AND po.status_t1_2 = true
					AND po.status_2 = true
				) inn
				ORDER BY inn.created_at DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) inn2
			;
	
		END IF;
	END IF;
END;
$$;	
-----------------------------------------------------------------------------------------
DROP FUNCTION f_search_psr(integer,character varying,integer,integer,character varying,integer,integer);
-- find user based on name or date
CREATE OR REPLACE FUNCTION public.F_SEARCH_PSR(
	IN in_str INTEGER, -- input psr_no
	IN in_date VARCHAR,
	IN in_month INTEGER,
	IN in_year INTEGER,
	IN in_approve VARCHAR,
	IN in_page INTEGER,
	IN in_limit INTEGER
)
    RETURNS TABLE(
	totalrecords INTEGER,
	id varchar, 
	psr_no INTEGER, 
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
						psr.psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
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
						psr.psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND
					EXTRACT (MONTH FROM psr."createdAt") = in_month
					AND
					EXTRACT (YEAR FROM psr."createdAt") = in_year
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
						psr.psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND
					to_date(in_date, 'YYYY-MM-DD') = psr."createdAt"
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
						psr.psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND psr.status_t1_1 = true
					AND psr.status_t1_2 = true
					AND psr.status_2 = true
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
						psr.psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND
					EXTRACT (MONTH FROM psr."createdAt") = in_month
					AND
					EXTRACT (YEAR FROM psr."createdAt") = in_year
					AND psr.status_t1_1 = true
					AND psr.status_t1_2 = true
					AND psr.status_2 = true
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
						psr.psr_no,
						psr."createdAt" AS created_at,
						myuser.firstname AS create_user,
						myuser2.firstname AS approve_user
					FROM public."psr" AS psr
					INNER JOIN public."Users" AS myuser 
					ON psr.create_user = myuser.id
					LEFT JOIN public."Users" AS myuser2
					ON psr.approver_user = myuser2.id
					WHERE ( psr.psr_no = in_str OR in_str IS null )
					AND to_date(in_date, 'YYYY-MM-DD') = psr."createdAt"
					AND psr.status_t1_1 = true
					AND psr.status_t1_2 = true
					AND psr.status_2 = true
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
-----------------------------------------------------------------------------------------
