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
				inn.id,
				inn.po_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
					po.id,
					po.po_no,
					po."createdAt" AS created_at,
					po.create_user,
					po.approver_user
				FROM public."purchase_order" AS po
				WHERE ( po.po_no = in_str OR in_str IS null )
				AND	( po.cl_company = in_company OR in_company IS null )
				ORDER BY po."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
			
		ELSIF in_date IS null THEN
			RETURN QUERY
			SELECT	
				inn.id,
				inn.po_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
					po.id,
					po.po_no,
					po."createdAt" AS created_at,
					po.create_user,
					po.approver_user
				FROM public."purchase_order" AS po
				WHERE ( po.po_no = in_str OR in_str IS null )
				AND	( po.cl_company = in_company OR in_company IS null )
				AND
				EXTRACT (MONTH FROM po."createdAt") = in_month
				AND
				EXTRACT (YEAR FROM po."createdAt") = in_year
				ORDER BY po."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
			
		ELSE
			RETURN QUERY
			SELECT	
				inn.id,
				inn.po_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
					po.id,
					po.po_no,
					po."createdAt" AS created_at,
					po.create_user,
					po.approver_user
				FROM public."purchase_order" AS po
				WHERE ( po.po_no = in_str OR in_str IS null )
				AND	( po.cl_company = in_company OR in_company IS null )
				AND to_date(in_date, 'YYYY-MM-DD') = po."createdAt"
				ORDER BY po."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
		
		END IF;
	ELSE
		IF in_date IS null and in_month IS null THEN
			RETURN QUERY
			SELECT
				inn.id,
				inn.po_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
					po.id,
					po.po_no,
					po."createdAt" AS created_at,
					po.create_user,
					po.approver_user
				FROM public."purchase_order" AS po
				WHERE ( po.po_no = in_str OR in_str IS null )
				AND	( po.cl_company = in_company OR in_company IS null )
				AND po.status_t1_1 = true
				AND po.status_t1_2 = true
				AND po.status_2 = true
				ORDER BY po."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
			
		ELSIF in_date IS null THEN
			RETURN QUERY
			SELECT	
				inn.id,
				inn.po_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
					po.id,
					po.po_no,
					po."createdAt" AS created_at,
					po.create_user,
					po.approver_user
				FROM public."purchase_order" AS po
				WHERE ( po.po_no = in_str OR in_str IS null )
				AND	( po.cl_company = in_company OR in_company IS null )
				AND
				EXTRACT (MONTH FROM po."createdAt") = in_month
				AND
				EXTRACT (YEAR FROM po."createdAt") = in_year
				AND po.status_t1_1 = true
				AND po.status_t1_2 = true
				AND po.status_2 = true
				ORDER BY po."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
			
		ELSE
			RETURN QUERY
			SELECT	
				inn.id,
				inn.po_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY po."createdAt" DESC) AS rn,
					po.id,
					po.po_no,
					po."createdAt" AS created_at,
					po.create_user,
					po.approver_user
				FROM public."purchase_order" AS po
				WHERE ( po.po_no = in_str OR in_str IS null )
				AND	( po.cl_company = in_company OR in_company IS null )
				AND to_date(in_date, 'YYYY-MM-DD') = po."createdAt"
				AND po.status_t1_1 = true
				AND po.status_t1_2 = true
				AND po.status_2 = true
				ORDER BY po."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
	
		END IF;
	END IF;
END;
$$;	