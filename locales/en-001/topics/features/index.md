---
title: Features
nav: Features
order: 2
description: What the Patient Administration System does, from escalating reminders and two-way replies to waiting lists, virtual visits and fairness measures.
---

The system looks after the administrative side of care. It holds no diagnoses, prescriptions or vital signs.

## Patient communication

### Escalating reminders

Reminders at 7 days, 4 days, 3 days and 24 hours, by text, WhatsApp, email or the portal, in English or Welsh.

### Two-way replies

Confirm, cancel, ask for another time or ask for help, by text, a single-use link or a voice keypad. Every action is recorded and safe to repeat.

### Consent controls

Opt-outs, quiet hours and consent are enforced at the one point every message passes through.

### Staff follow-up

A patient who does not reply is passed to a member of staff to phone. On urgent pathways, a cancellation is held for a person to review.

## Clinic operations

### Appointments and schedules

Calendars for staff, and a page where patients can see their own appointments and messages.

### Waiting lists and RTT clocks

Referral-to-treatment clocks, and "still needed?" checks for people who have waited a long time.

### Standby offers

Released slots are offered to patients on standby.

### Virtual visits and transport

Video or phone visits with a phone fallback, and transport requests through a provider interface.

## Reporting

### Privacy-safe analytics

A feed that hides small cells, holds no identifiers and limits queries. Read [what this does not prevent](repo:governance/analytics-differencing.md).

### Wording experiments

Comparison of message wording to establish which is most effective.

### Deprivation lookup

A postcode-based lookup, supplied by the health board, for looking at results by deprivation.

### Optional no-show score

Off until named people approve it. It is shown as a band with reasons, used only to add a phone call, and rolled out one clinic at a time. [Read the model](repo:governance/noshow-model.md).

## Platform

### Accessible

WCAG 2.2 AA checks on every change, with keyboard and 320-pixel reflow tests.

### Languages

Ten languages in the interface. The translations are first drafts awaiting review by fluent speakers.

### Integration

REST, FHIR R5 and HL7 v2, over HTTP and MLLP.

### Secure sign-in

Keycloak sign-in, with one-time codes for staff.
