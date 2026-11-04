---
peer: compare
title: Sut mae'n cymharu
nav: Cymharu
order: 4
description: Cymhariaeth onest o'r prosiect hwn â systemau ysbyty masnachol, gwasanaethau atgoffa yn unig a thaenlenni, gan gynnwys ble mae'n brin.
---

Mae'r dudalen hon yn cymharu'r prosiect hwn â thri **math** arall o system, ar sail nodweddion nodweddiadol. Rhestrir tudalennau ar gyfer cynhyrchion a enwir isod. Dylid cadarnhau'r manylion gyda chyflenwyr.

> Aeddfedrwydd yw'r prif wahaniaeth: mae'r dewisiadau eraill mewn defnydd byw, ac nid yw'r prosiect hwn. Nid yw'n barod i'w ddefnyddio gyda chleifion go iawn.

## Crynodeb

| | Y prosiect hwn | System fasnachol fawr | Gwasanaeth atgoffa yn unig | Taenlenni a galwadau ffôn |
|---|---|---|---|---|
| **Yn cael ei defnyddio gyda chleifion go iawn** | Ddim eto | Ydy | Ydy | Ydy |
| **Sicrwydd diogelwch** | Heb ei gwblhau | Yn ei le fel arfer | Yn ei le fel arfer | Yn dibynnu ar arfer lleol |
| **Contract cymorth** | Dim eto | Oes | Oes | Dim |
| **Ffi trwydded meddalwedd** | Dim | Fel arfer | Fel arfer | Dim neu isel |
| **Gallu darllen a newid y cod** | Ydy | Fel arfer ddim | Fel arfer ddim | Amherthnasol |
| **Nodiadau atgoffa sy'n uwchgyfeirio at berson** | Ydy | Amrywio | Amrywio | Â llaw |
| **Atebion cleifion yn newid yr archeb** | Ydy | Amrywio | Amrywio | Â llaw |
| **Mesurau tegwch adeiledig** | Ydy | Amrywio | Anaml | Â llaw |
| **Yn dal cofnodion clinigol** | Nac ydy, yn fwriadol | Yn aml | Nac ydy | Nac ydy |
| **Rhestrau aros a chlociau RTT** | Ydy | Ydy | Nac ydy | Â llaw |

## Cynhyrchion a enwir

Mae pob tudalen yn rhestru'r ffynonellau cyhoeddus a ddefnyddiwyd.

- [Epic](topic:compare/epic), system cofnodion electronig fawr
- [Nervecentre](topic:compare/nervecentre), system cofnodion electronig yn y cwmwl
- [Oracle Health](topic:compare/oracle-health), system cofnodion electronig fawr
- [System C CareFlow](topic:compare/system-c), system cofnodion electronig wedi'i hadeiladu ar gyfer y GIG
- [Dedalus ORBIS](topic:compare/dedalus), system gweinyddu cleifion a chofnod electronig
- [WelshPAS](topic:compare/welshpas), y system gweinyddu cleifion a ddefnyddir gan y rhan fwyaf o ysbytai Cymru
- [DrDoctor](topic:compare/drdoctor), platfform cyfathrebu â chleifion
- [OpenMRS](topic:compare/openmrs), cofnod meddygol cod agored
- [OpenEMR](topic:compare/openemr), system cod agored ar gyfer cofnodion a rheoli practis

## Addasrwydd

### System fasnachol fawr

Addas lle mae angen system brofedig â chymorth, gyda chofnod clinigol a chyflenwr atebol.

### Gwasanaeth atgoffa yn unig

Yn ychwanegu nodiadau atgoffa at systemau presennol heb lawer o ymdrech. Fel arfer nid yw'n newid prosesau rhestrau aros na thasgau staff.

### Taenlenni a galwadau ffôn

Ymarferol i wasanaeth bach. Mae'n ymdopi'n wael â thwf ac yn ei gwneud yn anodd mesur mynediad.

### Y prosiect hwn

Perthnasol i sefydliadau sydd am adolygu'r cod, dylanwadu ar ei ddyluniad, ymchwilio i fynediad, neu gyfrannu. Nid yw'n addas ar gyfer defnydd byw.

## Y tu allan i'r cwmpas

- Nid cofnod clinigol ydyw. Nid yw'n dal diagnosisau, presgripsiynau nac arwyddion hanfodol.
- Nid yw'n penderfynu dim am glaf yn awtomatig.
- Nid yw'n gorarchebu, ac ni all unrhyw sgôr gymryd apwyntiad oddi ar neb.
- Nid yw'n dal hunaniaethau. Mae angen `person-service` a `worker-service` wrth ei hochr.

## Camau nesaf

Mae'r [tiwtorial](topic:tutorial) yn cwmpasu gosod lleol, ac mae'r [dudalen diogelwch ac ymddiriedaeth](topic:trust) yn rhestru'r gwaith sy'n weddill.
