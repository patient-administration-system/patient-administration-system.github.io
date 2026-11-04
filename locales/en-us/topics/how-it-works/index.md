---
title: How it works
nav: How it works
order: 3
description: A plain-language tour of how the Patient Administration System is put together, and why it keeps identity in a separate service.
---

This page gives a non-technical overview of the main components of the system.

## Reminder process

1. A clinic books an appointment.
2. The system plans the reminders, and checks consent and quiet hours before each one.
3. The patient gets a message in their chosen language and channel.
4. Their reply updates the appointment, and the action is recorded.
5. If there is no reply, a member of staff gets a task to phone.
6. If the patient cancels, the slot can be offered to someone on standby.

## Main components

| Part | What it does | Built with |
|---|---|---|
| [The API](tree:patient-administration-system-with-rust) | Holds every rule, and talks to other hospital systems | Rust, Axum, SeaORM |
| [The web interface](tree:patient-administration-system-ui-with-svelte) | What staff and patients use | SvelteKit, Svelte, Lily Design System |
| [The ops dashboard](tree:patient-administration-system-frontend) | A separate server-rendered dashboard for operators | Rust, Loco |
| [The development stack](tree:podman) | Runs the supporting services on your computer | PostgreSQL, Keycloak, Redis, Podman |

## Identity data

This system does not hold names, addresses or staff records. It refers to each person by an opaque identifier.

Identity details are held in two other services: `person-service` for patients and `worker-service` for staff. This separation limits the personal data held in this system.

## Integration

The system supports REST for general software integration, FHIR R5 for health data exchange, and HL7 v2 for established hospital messaging.

## Change process

Each change in behavior comprises a specification edit, a code edit and a test, submitted together. [Read the specification](repo:spec/index.md).
