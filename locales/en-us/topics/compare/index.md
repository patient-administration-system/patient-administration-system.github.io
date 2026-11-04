---
title: How it compares
nav: Compare
order: 4
description: An honest comparison of this project with commercial hospital systems, reminder-only services and spreadsheets, including where it falls short.
---

This page compares this project with three other types of system, based on typical characteristics. Pages for named products are listed below. Details should be confirmed with suppliers.

> The main difference is maturity: the alternatives are in live use, and this project is not. It is not ready for use with real patients.

## Summary

| | This project | Large commercial system | Reminder-only service | Spreadsheets and phone calls |
|---|---|---|---|---|
| **In use with real patients** | Not yet | Yes | Yes | Yes |
| **Safety and security assurance** | Not yet complete | Usually in place | Usually in place | Depends on local practice |
| **Support contract** | None yet | Yes | Yes | None |
| **Software license fee** | None | Usually | Usually | None or low |
| **Can read and change the code** | Yes | Usually not | Usually not | Not applicable |
| **Reminders that escalate to a person** | Yes | Varies | Varies | By hand |
| **Patient replies change the booking** | Yes | Varies | Varies | By hand |
| **Fairness measures built in** | Yes | Varies | Rarely | By hand |
| **Holds clinical records** | No, by design | Often | No | No |
| **Waiting lists and RTT clocks** | Yes | Yes | No | By hand |

## Named products

Each page lists the public sources used.

- [Epic](topic:compare/epic), a large electronic record system
- [Nervecentre](topic:compare/nervecentre), a cloud electronic record system
- [Oracle Health](topic:compare/oracle-health), a large electronic record system
- [System C CareFlow](topic:compare/system-c), an electronic record system built for the NHS
- [Dedalus ORBIS](topic:compare/dedalus), a patient administration system and electronic record
- [WelshPAS](topic:compare/welshpas), the patient administration system most hospitals in Wales use
- [DrDoctor](topic:compare/drdoctor), a patient communication platform
- [OpenMRS](topic:compare/openmrs), an open-source medical record
- [OpenEMR](topic:compare/openemr), an open-source record and practice management system

## Suitability

### A large commercial system

Suitable where a proven, supported system with a clinical record and an accountable supplier is required.

### A reminder-only service

Adds reminders to existing systems at low effort. It does not usually change waiting list or staff task processes.

### Spreadsheets and phone calls

Workable for a small service. It scales poorly and makes access difficult to measure.

### This project

Relevant to organizations that want to review the code, influence its design, research access, or contribute. It is not suitable for live use.

## Out of scope

- It is not a clinical record. It holds no diagnoses, prescriptions or vital signs.
- It does not decide anything about a patient automatically.
- It does not overbook, and no score can take a slot away from anyone.
- It does not hold identities. It needs `person-service` and `worker-service` alongside it.

## Next steps

The [tutorial](topic:tutorial) covers local setup, and the [safety and trust page](topic:trust) lists outstanding work.
