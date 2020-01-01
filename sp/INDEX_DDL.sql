CREATE INDEX IX_LEAVE_USRID ON PUBLIC."leave"(user_id, approver_id);
CREATE INDEX IX_LEAVE_DATE ON PUBLIC."leave"(date_from, date_to);