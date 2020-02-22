-- ADD NEW USER
CREATE OR REPLACE FUNCTION public.F_ADD_USR(
	IN in_username VARCHAR,
	IN in_password VARCHAR,
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