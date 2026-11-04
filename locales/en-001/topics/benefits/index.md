---
title: Benefits
nav: Benefits
order: 1
description: How the Patient Administration System helps patients, clinic teams, health boards and developers.
---

Administrative failures have direct effects on patients. An unread letter can lead to a missed appointment, and a missed appointment can extend a wait.

This page lists intended benefits. The system has not been used with real patients, so no attendance or savings figures are quoted.

## For patients

### Language choice

Reminders are sent in English or Welsh. The staff and patient screens are available in ten languages.

### Replies update the booking

Patients can confirm, cancel or request another time from the message. A request for another time returns available alternatives.

### Control over contact

Opt-outs, quiet hours and consent are checked before each message is sent.

### Access to staff

A request for help, or a lack of reply, creates a task for a member of staff.

## For clinic and booking teams

### Less manual follow-up

Routine replies update the appointment automatically, and each action is recorded.

### Targeted call list

Staff time is directed to patients who have not been reached.

### Reuse of released slots

Cancelled slots can be offered to patients on standby.

### Cancellation reasons

The system records why a patient cancels, and can respond with another time, transport, or a video or phone visit.

## For health boards

### No software licence fee

The code is available under open-source licences. Hosting, support, messaging and assurance remain costs.

### Access reporting

Analytics show whether reminders perform equally across patient groups. Small groups are hidden and no identifiers are included.

### Standards-based integration

The system supports REST, FHIR R5 and HL7 v2, and the source code is public.

### Limits on scoring

No score may remove a slot from a patient. An automated test enforces this.

## For developers and IT teams

### Written specification

Each requirement is listed with the test that verifies it.

### Technology

A Rust API, a SvelteKit interface and automated accessibility checks.

### Misuse testing

Chaos tests send hostile input to every route and simulate failures in external services.

### Contributions

The [contribution guide](repo:CONTRIBUTING.md) describes how changes are made. The [tutorial](topic:tutorial) covers local setup.
