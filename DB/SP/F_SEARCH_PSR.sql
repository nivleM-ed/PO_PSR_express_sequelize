--DROP FUNCTION f_search_psr(integer,character varying,integer,integer,character varying,integer,integer);
-- find user based on name or date
CREATE OR REPLACE FUNCTION public.F_SEARCH_PSR(
	IN in_str INTEGER, -- input psr_no
	IN in_date VARCHAR,
	IN in_month INTEGER,
	IN in_year INTEGER,
	IN in_approve BOOLEAN,
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
	IF in_approve IS false THEN
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
						CAST(branch.cd||'/'||dep.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
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
					AND ( branch.cd = in_branch OR in_branch IS null )
					AND ( dep.cd = in_department OR in_department IS null )
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
						CAST(branch.cd||'/'||dep.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
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
					AND ( branch.cd = in_branch OR in_branch IS null )
					AND ( dep.cd = in_department OR in_department IS null )
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
						CAST(branch.cd||'/'||dep.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
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
					to_char(psr."createdAt", 'YYYY-MM-DD') = in_date
					AND ( branch.cd = in_branch OR in_branch IS null )
					AND ( dep.cd = in_department OR in_department IS null )
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
						CAST(branch.cd||'/'||dep.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
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
					AND psr.status_t2 = true
					AND ( branch.cd = in_branch OR in_branch IS null )
					AND ( dep.cd = in_department OR in_department IS null )
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
						CAST(branch.cd||'/'||dep.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
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
					AND psr.status_t2 = true
					AND ( branch.cd = in_branch OR in_branch IS null )
					AND ( dep.cd = in_department OR in_department IS null )
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
						CAST(branch.cd||'/'||dep.cd||'/PSR/'||CAST(psr.psr_no AS VARCHAR) AS VARCHAR) AS psr_no,
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
					AND to_char(psr."createdAt", 'YYYY-MM-DD') = in_date
					AND psr.status_t1_1 = true
					AND psr.status_t1_2 = true
					AND psr.status_t2 = true
					AND ( branch.cd = in_branch OR in_branch IS null )
					AND ( dep.cd = in_department OR in_department IS null )
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