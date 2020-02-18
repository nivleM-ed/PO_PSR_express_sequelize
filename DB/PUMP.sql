DO
$$

DECLARE
   counter INTEGER := 0 ;
   id_1 VARCHAR := '724d9187-e82a-40b6-aea0-71dc84552a28';
BEGIN
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   LOOP 
      EXIT WHEN counter = 50 ; 
      counter := counter + 1 ; 
      INSERT INTO psr(id,"createdAt","updatedAt",psr_desc,create_user) 
	  values 
	  (uuid_generate_v4(),current_timestamp,current_timestamp,'[{ "index": 1, "description": "Engine Oil", "quantity": "99", "unitPrice": "125" }, { "index": 2, "description": "Gear Oil", "quantity": "100", "unitPrice": "100" }, { "index": 3, "description": "Crude Oil", "quantity": "12", "unitPrice": "70" }]',id_1 );
	  
	  INSERT INTO purchase_order(id,"createdAt","updatedAt",po_desc,create_user) 
	  values
	  (uuid_generate_v4(),current_timestamp,current_timestamp,'[{ "index": 1, "description": "Engine Oil", "quantity": "99", "unitPrice": "125" }, { "index": 2, "description": "Gear Oil", "quantity": "100", "unitPrice": "100" }, { "index": 3, "description": "Crude Oil", "quantity": "12", "unitPrice": "70" }]',id_1 );
	  
	  INSERT INTO leave(id, "createdAt", "updatedAt", user_id, date_from, date_to, reason, status) 
	  values 
	  (uuid_generate_v4(), current_timestamp, current_timestamp,id_1, current_date+(counter*30), current_date+(counter*30)+1, 'reason '||counter, TRUE);
   END LOOP ; 
   
   INSERT INTO public.branch(
	id, "createdAt", "updatedAt", cd, name, address_1, address_2, address_3, address_4)
	VALUES ('86875851-b63f-4394-9f9b-17e2bb9212a2', current_timestamp, current_timestamp, 'DJSB', 'Dinasti Jati Sdn Bhd', '', '', '', '');
	
	INSERT INTO public.department(
	id, "createdAt", "updatedAt", cd, name)
	VALUES ('bd1aca92-38f4-4686-857c-72794c0ed9a1', current_timestamp, current_timestamp, 'ADM', 'Admin');
	
	INSERT INTO public.department(
		id, "createdAt", "updatedAt", cd, name)
		VALUES ('2b2577e8-6d6c-4a25-a118-40b6d34b7036', current_timestamp, current_timestamp, 'TGD', 'Trading');
		
	INSERT INTO public.department(
		id, "createdAt", "updatedAt", cd, name)
		VALUES ('335674af-a967-400a-a951-3dab399d191b', current_timestamp, current_timestamp, 'ACCT', 'Account');
		
	INSERT INTO public.department(
		id, "createdAt", "updatedAt", cd, name)
		VALUES ('6d548329-953e-4970-91dc-4f0bed8a0fdb', current_timestamp, current_timestamp, 'CCT', 'Commercial & Contract');
		
	INSERT INTO public.department(
		id, "createdAt", "updatedAt", cd, name)
		VALUES ('9422de2b-4e23-41b9-b237-13b64900b170', current_timestamp, current_timestamp, 'MAR', 'Marine');
END ; 
$$

