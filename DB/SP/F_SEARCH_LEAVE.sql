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