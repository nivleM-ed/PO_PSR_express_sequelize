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
END ; 
$$