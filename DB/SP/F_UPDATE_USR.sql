-- Update user
CREATE OR REPLACE FUNCTION public.F_UPDATE_USR(
	IN in_id VARCHAR,
	IN in_username VARCHAR,
	IN in_firstname VARCHAR,
	IN in_lastname VARCHAR,
	IN in_email VARCHAR,
	IN in_department VARCHAR,
	IN in_branch VARCHAR,
	IN in_contact_no VARCHAR,
	IN in_address_1 VARCHAR,
	IN in_address_2 VARCHAR,
	IN in_address_3 VARCHAR,
	IN in_address_4 VARCHAR,
	IN in_acct_t BOOLEAN,
	IN in_t1 BOOLEAN,
	IN in_t2 BOOLEAN,
	IN in_t3 BOOLEAN,
	IN in_t4 BOOLEAN,
	IN in_is_admin BOOLEAN,
	IN in_update_typ BOOLEAN --true if admin_update
)
    RETURNS TABLE(
	id VARCHAR,
	username VARCHAR,
	firstname VARCHAR,
	lastname VARCHAR,
	email VARCHAR,
	department VARCHAR,
	branch VARCHAR,
	contact_no VARCHAR,
	address_1 VARCHAR,
	address_2 VARCHAR,
	address_3 VARCHAR,
	address_4 VARCHAR,
	acct_t BOOLEAN,
	t1 BOOLEAN,
	t2 BOOLEAN,
	t3 BOOLEAN,
	t4 BOOLEAN,
	is_admin BOOLEAN
	)
    LANGUAGE 'plpgsql'
AS $$
DECLARE
in_dep_id VARCHAR;
in_branch_id VARCHAR;

BEGIN
	SELECT dep.id INTO in_dep_id 
	FROM public."department" AS dep 
	WHERE dep.cd = in_department;

	SELECT branch.id INTO in_branch_id 
	FROM public."branch" AS branch 
	WHERE branch.cd = in_branch;	
	
	IF in_update_typ THEN 
		UPDATE public."Users" SET
			"updatedAt" = current_timestamp,
			username = in_username,
			firstname = in_firstname,
			lastname = in_lastname,
			email = in_email,
			department_id = in_dep_id,
			branch_id = in_branch_id,
			contact_no = in_contact_no,
			address_1 = in_address_1,
			address_2 = in_address_2,
			address_3 = in_address_3,
			address_4 = in_address_4,
			acct_t = in_acct_t,
			t1 = in_t1,
			t2 = in_t2,
			t3 = in_t3,
			t4 = in_t4,
			is_admin = in_is_admin
		WHERE public."Users".id = in_id;
	ELSE 
		UPDATE public."Users" SET
			"updatedAt" = current_timestamp,
			firstname = in_firstname,
			lastname = in_lastname,
			email = in_email,
			contact_no = in_contact_no,
			address_1 = in_address_1,
			address_2 = in_address_2,
			address_3 = in_address_3,
			address_4 = in_address_4
		WHERE public."Users".id = in_id;
	END IF;
	
	RETURN QUERY
		SELECT
			users.id,
			users.username,
			users.firstname,
			users.lastname,
			users.email,
			dep.cd as department,
			branch.cd as branch,
			users.contact_no,
			users.address_1,
			users.address_2,
			users.address_3,
			users.address_4,
			users.acct_t,
			users.t1,
			users.t2,
			users.t3,
			users.t4,
			users.is_admin
		FROM public."Users" AS users 
		INNER JOIN public."department" AS dep
		ON dep.id = users.department_id
		INNER JOIN public."branch" AS branch
		ON branch.id = users.branch_id
		WHERE users.id = in_id;	
END;
$$;