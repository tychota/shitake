# Shitkake

## 🎉Context

I work as an architect at [BAM](https://www.bam.tech/).

I'm currently staffed as the architect for the frontend part on a dating app that use a lot of CQRS / hexagonal architecture for the backend.

Last week, I had to estimate and sale a project that would need such an architecture.

I realised that while I would do personally it either akka stream or elixir with commanded, no one in my company would be able to work on it (we are specialists of JS, and we do a bit of php/python).

Thus I create this test project to battle test [Nest](https://docs.nestjs.com/) and standardise some good practices.

**This repo is a demo.**
It is **not used in production**, it will be updated a bit, documented a bit but won't be use in reality.

**What will be used will be closed source** but may serve to update this repo.

## 🏆Goals

- ✅testability
- 🔒security
- 📖readability
- 🖼separation of concern
- 🏆standardisation
- 📈performance / scalability

## ⚠️When not use this

Everytime, except if:

- you need CQRS-ES
- you need microservice
- you need to do it in node
- you love typescript
- you are ok to read a repo with little to no doc (so far)

## 🛣Roadmap / starmap

### Planned for really near future

- [ ] 12 factor config
- [ ] AuthGuard with JWT
- [ ] Unit Test

### Probably just after

- [ ] E2E Test
- [ ] Better linter
- [ ] Task inter microservice: so far with Celery (python) and RabbitMQ
- [ ] Document:
  - Why CQRS? Short term Pro? Short term Cons? Maintainability ? Links to learn more.
  - Why Onion architecture? Short term Pro? Short term Cons? Maintainability ? Links to learn more.
  - Why GRQC? Short term Pro? Short term Cons? Maintainability ? Links to learn more.
  - Why Celery/RabbitMQ? Short term Pro? Short term Cons? Maintainability ? Links to learn more.
  - How to create new µService/Query/Command ? Step by step.

### Possibly in the future

- [ ] Deploying on kubernetes with helm
- [ ] CI with docker
- [ ] CD (green/blue deployment, [Terminus](https://docs.nestjs.com/recipes/terminus))
- [ ] Improve dev server to auto restart
- [ ] Invest [citus](https://www.citusdata.com/) for eventStore scalling and/or snapshot from https://dev.to/kspeakman/event-storage-in-postgres-4dk2
- [ ] analytics with InfluxDB/Graphana

### Unlikely but maybe

- [ ] tracing
- [ ] service mesh

### I would dream of it but lets be realistic

- [ ] a celery like framework base on RabbitMQ

## 📜 Licence

MIT

If you like it, let's have a beer when you are in Paris.
