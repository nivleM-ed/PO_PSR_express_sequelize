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
				inn.id,
				inn.psr_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
					psr.id,
					psr.psr_no,
					psr."createdAt" AS created_at,
					psr.create_user,
					psr.approver_user
				FROM public."psr" AS psr
				WHERE psr.psr_no = in_str OR in_str IS null 
				ORDER BY psr."createdAt" DESC
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
				inn.psr_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
					psr.id,
					psr.psr_no,
					psr."createdAt" AS created_at,
					psr.create_user,
					psr.approver_user
				FROM public."psr" AS psr
				WHERE
				EXTRACT (MONTH FROM psr."createdAt") = in_month
				AND
				EXTRACT (YEAR FROM psr."createdAt") = in_year
				AND
				( psr.psr_no = in_str OR in_str IS null )
				ORDER BY psr."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
			
		ELSE -- find for date
			RETURN QUERY
			SELECT
				inn.id,
				inn.psr_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
					psr.id,
					psr.psr_no,
					psr."createdAt" AS created_at,
					psr.create_user,
					psr.approver_user
				FROM public."psr" AS psr
				WHERE to_date(in_date, 'YYYY-MM-DD') = psr."createdAt"
				AND
				( psr_no = in_str OR in_str IS null )
				ORDER BY psr."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
			
		END IF;
		
	ELSE -- in_approve IS NOT NULL (only get with status true)
		IF in_date IS null and in_month IS null THEN
			RETURN QUERY
			SELECT
				inn.id,
				inn.psr_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
					psr.id,
					psr.psr_no,
					psr."createdAt" AS created_at,
					psr.create_user,
					psr.approver_user
				FROM public."psr" AS psr
				WHERE psr.psr_no = in_str OR in_str IS null 
				AND psr.status_t1_1 = true
				AND psr.status_t1_2 = true
				AND psr.status_2 = true
				ORDER BY psr."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			INNER JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
			
		ELSIF in_date IS null THEN
			RETURN QUERY
			SELECT
				inn.id,
				inn.psr_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
					psr.id,
					psr.psr_no,
					psr."createdAt" AS created_at,
					psr.create_user,
					psr.approver_user
				FROM public."psr" AS psr
				WHERE
				EXTRACT (MONTH FROM psr."createdAt") = in_month
				AND
				EXTRACT (YEAR FROM psr."createdAt") = in_year
				AND
				( psr.psr_no = in_str OR in_str IS null )
				AND psr.status_t1_1 = true
				AND psr.status_t1_2 = true
				AND psr.status_2 = true
				ORDER BY psr."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			INNER JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
		ELSE -- find for date
			RETURN QUERY
			SELECT
				inn.id,
				inn.psr_no,
				to_date(to_char(inn.created_at, 'YYYY-MM-DD'),'YYYY-MM-DD'),
				myuser.firstname AS create_user,
				myuser2.firstname AS approve_user,
				CASE
					WHEN inn.approver_user IS null THEN false
					WHEN inn.approver_user IS NOT null THEN true
				END AS status
			FROM (
				SELECT
					row_number() OVER (ORDER BY psr."createdAt" DESC) AS rn,
					psr.id,
					psr.psr_no,
					psr."createdAt" AS created_at,
					psr.create_user,
					psr.approver_user
				FROM public."psr" AS psr
				WHERE to_date(in_date, 'YYYY-MM-DD') = psr."createdAt"
				AND ( psr.psr_no = in_str OR in_str IS null )
				AND psr.status_t1_1 = true
				AND psr.status_t1_2 = true
				AND psr.status_2 = true
				ORDER BY psr."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.create_user = myuser.id
			INNER JOIN public."Users" AS myuser2
			ON inn.approver_user = myuser2.id
			;
		END IF;
	END IF;
END;
$$;