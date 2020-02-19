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
			CAST(branch.cd||'/'||dep.cd||'/PSR/'||CAST(inn.psr_no AS VARCHAR) AS VARCHAR) AS psr_no
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