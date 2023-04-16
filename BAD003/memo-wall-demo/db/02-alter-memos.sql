alter table memos
add column user_id integer references users(id);

delete from memos where user_id is null;

alter table memos
alter column user_id
set not null;

alter table memos
alter column image type varchar(40);
