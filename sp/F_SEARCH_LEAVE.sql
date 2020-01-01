-- find user based on name or date
CREATE OR REPLACE FUNCTION public.F_SEARCH_LEAVE(
	IN in_str VARCHAR,
	IN in_date VARCHAR,
	IN in_page INTEGER,
	IN in_limit INTEGER
)
    RETURNS TABLE(
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
			inn.id,
			inn.date_from,
			inn.date_to,
			myuser.firstname AS user_firstname, 
			myuser2.firstname AS approver_firstname,
			inn.status
		FROM (
			SELECT
				row_number() OVER (ORDER BY leave."createdAt" DESC) AS rn,
				leave.id, 
				leave.date_from, 
				leave.date_to, 
				leave.user_id,
				leave.approver_id,
				leave.status
				FROM public."leave" AS leave 
				WHERE leave.status = TRUE
				ORDER BY leave."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.user_id = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_id = myuser2.id
			;
			
-- user enter name and date		
	ELSE 
		RETURN QUERY
		SELECT 
			inn.id,
			inn.date_from,
			inn.date_to,
			myuser.firstname AS user_firstname, 
			myuser2.firstname AS approver_firstname,
			inn.status
		FROM (
			SELECT
				row_number() OVER (ORDER BY leave."createdAt") AS rn,
				leave.id, 
				leave.date_from, 
				leave.date_to, 
				leave.user_id,
				leave.approver_id,
				leave.status
				FROM public."leave" AS leave 
				WHERE leave.status = TRUE
				AND
				(
					(	to_date(in_date, 'YYYY-MM-DD') >= leave.date_from
				AND
					to_date(in_date, 'YYYY-MM-DD') <= leave.date_to 
					)
				OR in_date IS null
				)
				ORDER BY leave."createdAt" DESC
				OFFSET (in_page * in_limit) LIMIT in_limit
			) AS inn
			INNER JOIN public."Users" AS myuser 
			ON inn.user_id = myuser.id
			LEFT JOIN public."Users" AS myuser2
			ON inn.approver_id = myuser2.id
			WHERE
			( myuser.username = in_str OR myuser.firstname = in_str OR inn.user_id = in_str )
			OR in_str IS null
			;
			
	END IF;
END;
$$;