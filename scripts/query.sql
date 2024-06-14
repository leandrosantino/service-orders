select
  prev.description,
  prev.excution,
  prev.frequency,
  prev.machineId,
  m.tag as machineName,
  n.name as nature
from (
	select distinct
    p.description,
    p.machineId,
    p.excution,
    p.frequency,
    p.natureId
 	from PreventiveAction as p
  order by p.frequency desc
) as prev
inner join Machine as m
on m.id = prev.machineId
inner join Nature as n
on n.id = prev.natureId
-- where prev.frequency = 24

-- group by prev.frequency