---
peer: how-it-works
title: Sut mae'n gweithio
nav: Sut mae'n gweithio
order: 3
description: Taith mewn iaith glir o sut mae'r System Gweinyddu Cleifion wedi'i rhoi at ei gilydd, a pham mae'n cadw hunaniaeth mewn gwasanaeth ar wahân.
---

Mae'r dudalen hon yn rhoi trosolwg annhechnegol o brif gydrannau'r system.

## Y broses atgoffa

1. Mae clinig yn archebu apwyntiad.
2. Mae'r system yn cynllunio'r nodiadau atgoffa, ac yn gwirio caniatâd ac oriau tawel cyn pob un.
3. Mae'r claf yn cael neges yn yr iaith ac ar y sianel a ddewisodd.
4. Mae'r ateb yn diweddaru'r apwyntiad, a chaiff y weithred ei chofnodi.
5. Os nad oes ateb, mae aelod o staff yn cael tasg i ffonio.
6. Os yw'r claf yn canslo, gellir cynnig yr apwyntiad i rywun wrth gefn.

## Prif gydrannau

| Rhan | Beth mae'n ei wneud | Wedi'i hadeiladu gyda |
|---|---|---|
| [Yr API](tree:patient-administration-system-with-rust) | Yn dal pob rheol, ac yn siarad â systemau ysbyty eraill | Rust, Axum, SeaORM |
| [Y rhyngwyneb gwe](tree:patient-administration-system-ui-with-svelte) | Yr hyn y mae staff a chleifion yn ei ddefnyddio | SvelteKit, Svelte, Lily Design System |
| [Y dangosfwrdd gweithrediadau](tree:patient-administration-system-frontend) | Dangosfwrdd ar wahân i weithredwyr, wedi'i rendro ar y gweinydd | Rust, Loco |
| [Y pecyn datblygu](tree:podman) | Yn rhedeg y gwasanaethau ategol ar eich cyfrifiadur | PostgreSQL, Keycloak, Redis, Podman |

## Data hunaniaeth

Nid yw'r system hon yn dal enwau, cyfeiriadau na chofnodion staff. Mae'n cyfeirio at bob person drwy ddynodwr afloyw.

Cedwir manylion hunaniaeth mewn dau wasanaeth arall: `person-service` ar gyfer cleifion a `worker-service` ar gyfer staff. Mae'r gwahaniad hwn yn cyfyngu ar y data personol a gedwir yn y system hon.

## Integreiddio

Mae'r system yn cefnogi REST ar gyfer integreiddio meddalwedd cyffredinol, FHIR R5 ar gyfer cyfnewid data iechyd, a HL7 v2 ar gyfer negeseuon ysbyty sefydledig.

## Y broses newid

Mae pob newid ymddygiad yn cynnwys golygiad i'r fanyleb, golygiad i'r cod a phrawf, a gyflwynir gyda'i gilydd. [Darllen y fanyleb](repo:spec/index.md).
