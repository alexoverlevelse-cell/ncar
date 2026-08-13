-- Шаблон для выдачи прав администратора.
--
-- Скопировать, подставить реальные Telegram ID и имена, выполнить в SQL-редакторе
-- Supabase. Сам файл с реальными ID в репозиторий не коммитить — он публичный.
--
-- Узнать свой Telegram ID можно, написав боту @userinfobot.

insert into allowed_publishers (telegram_id, name, is_active, is_admin)
values
  (000000000, 'Имя админа 1', true, true),
  (000000000, 'Имя админа 2', true, true),
  (000000000, 'Имя админа 3', true, true)
on conflict (telegram_id) do update
  set is_admin = excluded.is_admin,
      is_active = excluded.is_active,
      name = excluded.name;
