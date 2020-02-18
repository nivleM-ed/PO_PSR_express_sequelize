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
	po_no integer, 
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