# docs

steps to init the repo running env

```bash
# require install docker
docker-compose up -d

source .env

# init db
pnpm create:migration init
pnpm migrate
```

`init.sql`

```sql
-- create a new user
INSERT INTO User (
    uuid,
    name,
    password,
    salt,
    status,
    createdAt,
    updatedAt
  )
VALUES (
    'uuid:text',
    'name:text',
    'password:text',
    'salt:text',
    'active',
  );
```
