-- ADD NEW PO
CREATE OR REPLACE FUNCTION public.F_ADD_PO(
	IN in_po_ref VARCHAR,
	IN in_quotation VARCHAR,
	IN in_delv_due DATE,
	IN in_ship_mode VARCHAR,
	IN in_psr_id VARCHAR,
	IN in_cca_no VARCHAR,
	IN in_pay_mode VARCHAR,
	IN in_address_1 VARCHAR,
	IN in_address_2 VARCHAR,
	IN in_address_3 VARCHAR,
	IN in_address_4 VARCHAR,
	IN in_po_desc JSON,
	IN in_cl_name VARCHAR,
	IN in_cl_company VARCHAR,
	IN in_department VARCHAR,
	IN in_branch VARCHAR,
	IN in_create_user VARCHAR
)
    RETURNS TABLE(
	id VARCHAR,
	po_no VARCHAR
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
	
	INSERT INTO public."purchase_order"(
		id,
		"createdAt",
		"updatedAt",
		po_ref,
		quotation,
		delv_due,
		ship_mode,
		psr_id,
		cca_no,
		pay_mode,
		address_1,
		address_2,
		address_3,
		address_4,
		po_desc,
		cl_name,
		cl_company,
		department_id,
		branch_id,
		create_user
		)
	VALUES (
		gen_id,
		current_timestamp,
		current_timestamp,
		in_po_ref,
		in_quotation,
		in_delv_due,
		in_ship_mode,
		in_psr_id,
		in_cca_no,
		in_pay_mode,
		in_address_1,
		in_address_2,
		in_address_3,
		in_address_4,
		in_po_desc,
		in_cl_name,
		in_cl_company,
		dep_id,
		branch_id,
		in_create_user
		);
		
	RETURN QUERY
		SELECT 
			inn.id,
			CAST(branch.cd||'/'||dep.cd||'/PO/'||CAST(inn.po_no AS VARCHAR) AS VARCHAR) AS po_no
		FROM (
			SELECT 
				po.id,
				po.po_no,
				po.department_id,
				po.branch_id
			FROM public."purchase_order" AS po
			WHERE po.id = CAST(gen_id AS VARCHAR)
		) AS inn
		INNER JOIN public."department" AS dep
		ON dep.id = inn.department_id
		INNER JOIN public."branch" AS branch
		ON branch.id = inn.branch_id;
END;
$$;