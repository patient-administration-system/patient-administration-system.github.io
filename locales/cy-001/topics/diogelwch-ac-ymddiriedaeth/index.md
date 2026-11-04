---
peer: trust
title: Diogelwch ac ymddiriedaeth
nav: Diogelwch ac ymddiriedaeth
order: 6
description: Beth sydd wedi'i orffen, beth sydd ar agor o hyd, y rheolau diogelwch y mae'r profion yn eu gorfodi, a sut y defnyddiwyd AI i adeiladu'r System Gweinyddu Cleifion.
---

Mae'r dudalen hon yn nodi statws presennol y prosiect, y rheolau diogelwch a orfodir gan brofion, a'r defnydd o AI wrth ei ddatblygu.

> **Rhaid peidio â defnyddio'r system hon gyda chleifion go iawn ar hyn o bryd.** Gweler y [rhestr wirio parodrwydd](repo:governance/production-readiness.md). Mae eitem heb ei thicio yn golygu nad yw'r gwaith wedi'i wneud.

## Statws presennol

Mae'r feddalwedd wedi'i hadeiladu a'i phrofi. Mae gan y ciw gwaith {{count:Tasks open}} o dasgau agored. Mae angen pobl neu bartïon allanol ar gyfer y prif eitemau sy'n weddill:

- Swyddog Diogelwch Clinigol a enwir (DCB0129)
- Cymeradwyo'r DPIA
- Contractau cludwyr go iawn
- Prawf treiddio allanol
- Profi defnyddioldeb gyda chleifion a staff
- Adolygiad o'r cyfieithiadau gan siaradwyr rhugl

Daw'r ffigurau ar y wefan hon o [statws cynhyrchiedig yr ystorfa](repo:spec/14-implementation-status.md), a nôlwyd ddiwethaf ar {{date}}.

## Rheolau a orfodir gan brofion

### Er cymorth yn unig

Ni chaiff unrhyw sgôr leihau'r hyn a gynigir i glaf, aildrefnu na dal apwyntiad yn ôl, gorarchebu, nac oedi cyswllt.

### Cyswllt ar ôl colli apwyntiad

Mae colli apwyntiad yn sbarduno cyswllt, nid rhyddhau. Mae gwasanaethau llwybr brys yn dal canslo i berson ei adolygu.

### Caniatâd

Caiff optio allan ac oriau tawel eu gorfodi yn yr un pwynt y mae pob neges yn mynd drwyddo.

### Dadansoddeg sy'n diogelu preifatrwydd

Caiff celloedd bach eu cuddio, heb ddynodwyr a chyda chyllideb ymholiadau ddyddiol. Darllenwch [beth nad yw hyn yn ei atal](repo:governance/analytics-differencing.md).

### Mae nodweddion dan reolaeth yn aros i ffwrdd

Nid yw nodwedd dan reolaeth yn gwneud dim nes bod switsh wedi'i osod a phobl a enwir wedi'i chymeradwyo.

### Dolenni ateb diogel

Mae dolenni'n rhai un defnydd, gyda thocynnau wedi'u stwnsio. Mae agor dolen yn darllen data; dim ond postio ffurflen sy'n newid unrhyw beth.

## Sut y defnyddiwyd AI

Ysgrifennwyd llawer o'r ystorfa gyda chynorthwyydd AI, Claude gan Anthropic, dan gyfarwyddyd y cynhaliwr. Mae hynny'n cynnwys cod, profion, manylebau, drafftiau llywodraethu a chyfieithiadau.

- Nid yw adolygiad dynol wedi'i gwblhau. Nid oes neb wedi archwilio'r cod na'r dogfennau'n annibynnol.
- Drafft AI yw pob cyfieithiad heblaw'r Saesneg, ac nid oes siaradwr iaith gyntaf wedi'i adolygu.
- Drafftiau o'r cod yw'r dogfennau llywodraethu. Nid ydynt yn gyngor clinigol, cyfreithiol na phreifatrwydd.
- Nid yw'r feddalwedd yn cynnwys model dysgu peirianyddol ac nid yw'n gwneud unrhyw benderfyniad awtomatig am glaf.

[Darllen y datganiad AI llawn](repo:AI_STATEMENT.md).

## Cwestiynau cyffredin

### Ai cynnyrch y GIG yw hwn?

Nage. Prosiect cod agored ydyw, wedi'i gynllunio ar gyfer y GIG yng Nghymru. Nid yw hon yn wefan swyddogol y GIG.

### A all fy sefydliad ei ddefnyddio?

Mae'r trwyddedau'n caniatáu hynny, ond nid yw'r system yn barod ar gyfer cleifion go iawn. Gweler y [rhestr wirio parodrwydd](repo:governance/production-readiness.md).

### A yw'n storio cofnodion meddygol?

Nac ydy. Gweinyddol yn unig ydyw.

### Sut mae rhoi gwybod am broblem ddiogelwch?

Gweler y [polisi diogelwch](repo:SECURITY.md).

## Dogfennau llywodraethu

Drafftiau a hunanasesiadau yw'r rhain, nid cymeradwyaethau.

- [Diogelwch clinigol](repo:governance/clinical-safety.md)
- [Asesiad o'r effaith ar ddiogelu data](repo:governance/dpia.md)
- [Datganiad hygyrchedd](repo:governance/accessibility-statement.md)
- [Hunanasesiad DTAC y GIG](tree:docs/united-kingdom)
- [Popeth arall am lywodraethu](repo:governance/README.md)
