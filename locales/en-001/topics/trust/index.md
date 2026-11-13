---
title: Safety and trust
nav: Safety and trust
order: 6
description: What is finished, what is still open, the safety rules the tests enforce, and how AI was used to build the Patient Administration System.
---

This page sets out the current status of the project, the safety rules enforced by tests, and the use of AI in its development.

> **This system must not be used with real patients at present.** The [path to production](topic:path-to-production) explains what production means, with an estimate for each thing still needed.

## Current status

The software is built and tested. The work queue has {{count:Tasks open}} open tasks. The main outstanding items require people or outside parties:

- A named Clinical Safety Officer (DCB0129)
- DPIA sign-off
- Real carrier contracts
- An external penetration test
- Usability testing with patients and staff
- Fluent review of the translations

Figures on this site come from [the repository's generated status](repo:spec/14-implementation-status.md), last retrieved on {{date}}.

## Rules enforced by tests

### Support only

No score may reduce what a patient is offered, reorder or withhold a slot, overbook, or delay a contact.

### Contact after a missed appointment

A missed appointment triggers contact, never discharge. Urgent-pathway services hold a cancellation for a person to review.

### Consent

Opt-outs and quiet hours are enforced at the one point every message passes through.

### Privacy-safe analytics

Small cells are hidden, with no identifiers and a daily query budget. Read [what this does not prevent](repo:governance/analytics-differencing.md).

### Gated features stay off

A gated feature does nothing until a switch is set and named people have approved it.

### Safe reply links

Links are single-use, with hashed tokens. Opening a link reads data; only a form post changes anything.

## How AI was used

Much of the repository was written with an AI assistant, Anthropic's Claude, at the maintainer's direction. That includes code, tests, specifications, governance drafts and translations.

- Human review is not complete. Nobody has independently audited the code or documents.
- Every translation other than English is an AI draft that no first-language speaker has reviewed.
- Governance documents are drafts from the code. They are not clinical, legal or privacy advice.
- The software contains no machine-learning model and makes no automated decision about a patient.

[Read the full AI statement](repo:AI_STATEMENT.md).

## Frequently asked questions

### Is this an NHS product?

No. It is an open-source project designed for the NHS in Wales. This is not an official NHS website.

### Can my organisation use it?

The licences permit it, but the system is not ready for real patients. See the [path to production](topic:path-to-production).

### Does it store medical records?

No. It is administrative only.

### How do I report a security problem?

See the [security policy](repo:SECURITY.md).

## Governance documents

These are drafts and self-assessments, not sign-offs.

- [Clinical safety](repo:governance/clinical-safety.md)
- [Data protection impact assessment](repo:governance/dpia.md)
- [Accessibility statement](repo:governance/accessibility-statement.md)
- [NHS DTAC self-assessment](tree:docs/united-kingdom)
- [Everything else in governance](repo:governance/README.md)
