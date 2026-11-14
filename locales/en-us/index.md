---
title: Patient Administration System
primary: View features
secondary: Compare options
description: An open-source patient administration system for hospitals and clinics, covering appointments, reminders, waiting lists and access reporting.
headline: Open-source patient administration for hospitals and clinics
subheadline: Appointments, reminders, waiting lists and access reporting in one system.
introduction: Unread letters and unused appointment slots cost hospitals time and delay care. This system sends reminders in the patient's preferred language, accepts replies by text, link or keypad, passes unanswered reminders to staff for a phone call, and reports whether access differs between patient groups.
---

> **Current status:** built and tested, but not in use with real patients. Outstanding work is listed on the [safety and trust page](topic:trust).

## Intended users

### Patients

Reminders by text, WhatsApp, email or portal, with options to confirm, cancel or request another time. [View benefits](topic:benefits).

### Clinic and booking teams

Routine replies update the booking automatically. Staff receive a list of patients who need a phone call. [View features](topic:features).

### Health boards

Waiting list visibility, reuse of released slots, and access reporting that does not expose identities. [Compare options](topic:compare).

### Developers

Public source code, a written specification and {{count:Rust test functions (server, front-end, migrations)}} Rust tests. [Open the tutorial](topic:tutorial).

## Reminder process

1. **Reminder sent.** Reminders go out 7 days, 4 days, 3 days and 24 hours before the appointment, on the patient's chosen channel and language.
2. **Patient replies.** The patient confirms, cancels or requests another time by text, link or phone keypad.
3. **Staff follow-up.** If there is no reply, a member of staff is given a task to phone the patient.
4. **Slot reoffered.** A canceled slot is offered to a patient on standby.

## Further reading

- [Tutorial](topic:tutorial): running the system locally
- [Comparisons](topic:compare): alternatives, and the limitations of this project
- [How it works](topic:how-it-works): an overview of the design
