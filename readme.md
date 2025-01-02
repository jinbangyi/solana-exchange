# Orderbook Management System

Using Next.js, Prisma, Postgres, Kafka, and Redis, create an orderbook management system containing the following features:

## Markets
- **Markets**: Return supported markets from Redis.

## Orders
- **Create Order**: Create a new order for a user.
- **Cancel Order**: Cancel a specific order.
- **Close Order**: If the order has been taken, then revert the order. If the last order is a buy, then sell the buy token; otherwise, sell the token.
- **Take Order**: Execute the order.

## Event System
- Subscribe to a Kafka topic that describes token price changes. When a new event is received, check if an order should be placed and determine the quantity.

## Crontab System
- Watch the token's price and trigger the order if it matches. Includes other crontab jobs.


```bash
npx @compodoc/compodoc -p tsconfig.json -s
```

## Development

```bash
# generate crud
nest g resource
```

## Feature

[ ] UserManagement
- [ ] user CRUD
- [ ] user login
- [ ] user jwt verify
- [ ] user apikey verify
- [ ] user manage apikey
  - [ ] user create an apikey
  - [ ] user regenerate an apikey

[ ] Order Management
- [ ] create order

[ ] Market Management
- [ ] market CRUD (keypair)

properties

```typescript
{
    e
}
```

- apikey CRUD

[ ] OrderBookManagement
- order CRUD


"Create a visual representation of an advanced API system architecture, focusing on key features such as API request logging, API key management, and rate limiting. The image should show:

API System Overview: Centralized server handling API requests with interconnected components like a request logger, database, and authentication system.

Request Log Storage: A database or log management system storing API request logs, with icons representing timestamps, status codes, and request details.

API Keys: Multiple API keys with distinct rate limits and expiration dates. Represent API keys in different forms:

API Key Generation & Regeneration: A process showing how API keys are generated and regenerated after expiration.
Rate Limits: Different rate limits associated with each API key, visualized as sliders or icons with limits (e.g., 100 requests/day).
Expiration Dates: API keys with expiration dates, shown as a countdown or calendar icon.
Read-Only & Read-Write Keys: Different keys with icons or labels indicating "read-only" and "read-write" permissions.
Authentication & Security: Secure connections with locks or shield icons indicating OAuth, JWT, or other authentication methods used for validating API keys.

Flow Representation: Use arrows to show how an API request passes through the system, from client to server, and how the system handles rate limiting, expiration checks, and logging.

Visual Design: Use a modern, clean tech design with a color palette of blue, white, and gray. The layout should be simple yet detailed enough to reflect the functionality of a scalable and secure API system.

The backend should using the nestjs framework"
