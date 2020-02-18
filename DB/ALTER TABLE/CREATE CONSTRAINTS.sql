----------------------------LEAVE----------------------------------
ALTER TABLE public."leave" 
ADD CONSTRAINT FK_LV_CREATE_USR FOREIGN KEY (user_id) REFERENCES public."Users" (id);

ALTER TABLE public."leave" 
ADD CONSTRAINT FK_LV_REPLACE_ID FOREIGN KEY (replace_id) REFERENCES public."Users" (id);

ALTER TABLE public."leave" 
ADD CONSTRAINT FK_LV_APPRV_USR FOREIGN KEY (approver_id) REFERENCES public."Users" (id);

------------------------------PSR----------------------------------
ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_CREATE_USR FOREIGN KEY (create_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_DEL_USR FOREIGN KEY (del_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_APPRV_USR FOREIGN KEY (approver_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_T2_USR FOREIGN KEY (t2_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_T3_USR FOREIGN KEY (t3_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_DECL_USR FOREIGN KEY (decline_user) REFERENCES public."Users" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_DEP_ID FOREIGN KEY (department_id) REFERENCES public."department" (id);

ALTER TABLE public."psr" 
ADD CONSTRAINT FK_PSR_BRANCH_ID FOREIGN KEY (branch_id) REFERENCES public."branch" (id);

ALTER TABLE public."psr" 
ADD UNIQUE (psr_no, department_id, branch_id);

-------------------------PURCHASE ORDER----------------------------
ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_CREATE_USR FOREIGN KEY (create_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_DEL_USR FOREIGN KEY (del_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_APPRV_USR FOREIGN KEY (approver_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_T2_USR FOREIGN KEY (t2_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_T3_USR FOREIGN KEY (t3_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_DECL_USR FOREIGN KEY (decline_user) REFERENCES public."Users" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_DEP_ID FOREIGN KEY (department_id) REFERENCES public."department" (id);

ALTER TABLE public."purchase_order" 
ADD CONSTRAINT FK_PO_BRANCH_ID FOREIGN KEY (branch_id) REFERENCES public."branch" (id);

ALTER TABLE public."purchase_order" 
ADD UNIQUE (po_no, department_id, branch_id);

-----------------------------USER----------------------------------

ALTER TABLE public."Users" 
ADD CONSTRAINT FK_USR_DEP_ID FOREIGN KEY (department_id) REFERENCES public."department" (id);

ALTER TABLE public."Users" 
ADD CONSTRAINT FK_USR_BRANCH_ID FOREIGN KEY (branch_id) REFERENCES public."branch" (id);