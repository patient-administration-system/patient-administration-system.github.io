---
title: Path to production
description: What production means for the Patient Administration System, and an honest estimate of how far each thing it still needs has got.
---

> **This system must not be used with real patients at present.** Each item below has an estimate. An item at 100% is done, with evidence. Every other item is still open.

## What production means

Production means one thing here: a health organisation runs the system for a live service, holding real patients' details, where a mistake can reach a person.

Being built, tested and published is not production. Neither is a demonstration on made-up data.

Getting there takes more than code. It needs a named clinician accountable for safety, a legal basis for the data, outside security checks, messages that really arrive, and an organisation that runs the system and answers for it. Most of the remaining work is of that kind.

## How to read the estimates

Each figure is a judgement, not a measurement: how much of the work that item needs is done, from 0% (not started) to 100% (done, with evidence). An item that needs a person or an outside party stays low however much code surrounds it.

The main repository gives the reason for each figure in [the path to production](repo:governance/path-to-production.md), and the [task list](repo:tasks.md) holds the detail.

## Safety and assurance

### Clinical Safety Officer and safety case

{{readiness:clinical-safety}}

The hazard log is drafted and its rules are checked by tests. Nobody has been named as Clinical Safety Officer, the hazards are not scored, and there is no safety case report.

### Data protection impact assessment

{{readiness:dpia}}

A draft assessment, data flow and retention schedule exist. No Data Protection Officer has reviewed them.

### External penetration test

{{readiness:penetration-test}}

The project tests its own security headers and access rules. No outside tester has looked at it.

### Cyber Essentials and the supplier charter

{{readiness:cyber-essentials}}

Neither has been sought.

### Data Security and Protection Toolkit

{{readiness:dspt}}

This belongs to the organisation that runs the system, and there is none yet.

## Identity and access

### Multi-factor sign-in for staff

{{readiness:mfa}}

The supplied sign-in setup asks staff for a one-time code. An organisation's own sign-in service must do the same.

### Per-user sign-in at the API

{{readiness:api-authentication}}

Built and tested, and the audit log records the verified user. It is not yet switched on by default, and the signing key has no secure store.

### Sign-in for the operator dashboard

{{readiness:operator-sign-in}}

The operator dashboard has no sign-in yet. It needs a decision first.

### Proof of a patient's identity

{{readiness:identity-proofing}}

A patient's account works only after a named staff member records proof of identity. There is no staff screen for this yet, and NHS login is not connected.

## Reliability

### Backups and a restore drill

{{readiness:backups}}

A backup and restore drill runs on every change. No live service has backups yet.

### Alerts when something fails

{{readiness:alerting}}

The system reports the figures to alert on, and the runbook names them. No alert has been set up.

### Availability target

{{readiness:availability}}

No target has been set.

## Messaging

### Consent, opt-out and quiet hours

{{readiness:consent}}

Built and tested at the one point every message passes through. The wording has not been reviewed with patients.

### Delivery receipts and retries

{{readiness:receipts}}

The system's side is built and tested. It has not been tried with a real carrier.

### Real message carriers

{{readiness:carriers}}

Every carrier would plug into one interface. There is no carrier contract, and no message has been sent through a real one.

## People and content

### Reviewed translations

{{readiness:translations}}

Every interface language has a draft. No first-language speaker has reviewed one, and Welsh must be reviewed before patients see it.

### Accessibility checked by people

{{readiness:accessibility}}

Automated checks run in the browser tests, and a statement is drafted. Nobody has tested it by hand, and the statement is not published.

### Usability testing

{{readiness:usability}}

Nobody has tested the system with patients or staff.

## Supply chain

### Dependency checks

{{readiness:dependency-checks}}

Done: every dependency's licence and known advisories are checked on each change.

### Checks required before a change lands

{{readiness:required-ci}}

The full checks run on every change, but nothing yet stops a change that fails them from reaching the main branch.

### Software bill of materials

{{readiness:sbom}}

Done: each release comes with a list of everything it contains.
