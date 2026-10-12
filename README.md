## Source

yt: https://youtu.be/K20Ej3iKLpw?si=ya95nr0ySfjVs-Zn
gh:

## Daily check:

1. 12-10-2026: https://youtu.be/K20Ej3iKLpw?si=e0vArgBlWGYpniMi&t=4489

## Used commands:

```
nest g module tickets
nest g controller tickets --no-spec
nest g service tickets --no-spec   
nest g interface tickets/ticket --flat

nest g class tickets/dto/create-ticket.dto --no-spec --flat
nest g class tickets/dto/filter-ticket-query.dto --no-spec --flat
nest g class tickets/dto/update-ticket.dto --no-spec --flat

npm install class-validator class-transformer
```