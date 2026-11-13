---
peer: path-to-production
title: Y llwybr at ddefnydd byw
description: Beth mae defnydd byw yn ei olygu i'r System Gweinyddu Cleifion, ac amcangyfrif gonest o ba mor bell y mae pob peth sydd ei angen o hyd wedi dod.
---

> **Rhaid peidio â defnyddio'r system hon gyda chleifion go iawn ar hyn o bryd.** Mae gan bob eitem isod amcangyfrif. Mae eitem ar 100% wedi'i gwneud, gyda thystiolaeth. Mae pob eitem arall ar agor o hyd.

## Beth mae defnydd byw yn ei olygu

Mae defnydd byw (neu "gynhyrchu") yn golygu un peth yma: mae sefydliad iechyd yn rhedeg y system ar gyfer gwasanaeth go iawn, yn cadw manylion cleifion go iawn, lle gall camgymeriad gyrraedd person.

Nid yw cael ei hadeiladu, ei phrofi a'i chyhoeddi yn ddefnydd byw. Nid yw arddangosiad ar ddata ffug yn ddefnydd byw chwaith.

Mae cyrraedd yno'n gofyn am fwy na chod. Mae angen clinigydd wedi'i enwi sy'n atebol am ddiogelwch, sail gyfreithiol ar gyfer y data, gwiriadau diogelwch allanol, negeseuon sy'n cyrraedd go iawn, a sefydliad sy'n rhedeg y system ac yn atebol amdani. Gwaith o'r math hwnnw yw'r rhan fwyaf o'r hyn sydd ar ôl.

## Sut i ddarllen yr amcangyfrifon

Barn yw pob ffigur, nid mesuriad: faint o'r gwaith sydd ei angen ar yr eitem honno sydd wedi'i wneud, o 0% (heb ddechrau) i 100% (wedi'i wneud, gyda thystiolaeth). Mae eitem sydd angen person neu barti allanol yn aros yn isel faint bynnag o god sydd o'i chwmpas.

Mae'r brif ystorfa yn rhoi'r rheswm dros bob ffigur yn [y llwybr at ddefnydd byw](repo:governance/path-to-production.md), ac mae'r [rhestr dasgau](repo:tasks.md) yn cynnwys y manylion.

## Diogelwch a sicrwydd

### Swyddog Diogelwch Clinigol ac achos diogelwch

{{readiness:clinical-safety}}

Mae'r log peryglon wedi'i ddrafftio ac mae profion yn gwirio ei reolau. Does neb wedi'i enwi'n Swyddog Diogelwch Clinigol, nid yw'r peryglon wedi'u sgorio, ac nid oes adroddiad achos diogelwch.

### Asesiad o'r effaith ar ddiogelu data

{{readiness:dpia}}

Mae asesiad drafft, llif data ac amserlen gadw yn bodoli. Nid oes Swyddog Diogelu Data wedi'u hadolygu.

### Prawf treiddio allanol

{{readiness:penetration-test}}

Mae'r prosiect yn profi ei benawdau diogelwch a'i reolau mynediad ei hun. Nid oes profwr allanol wedi edrych arno.

### Cyber Essentials a siarter y cyflenwyr

{{readiness:cyber-essentials}}

Nid oes cais wedi'i wneud am y naill na'r llall.

### Pecyn Cymorth Diogelu a Diogelwch Data

{{readiness:dspt}}

Mae hwn yn perthyn i'r sefydliad sy'n rhedeg y system, ac nid oes un eto.

## Hunaniaeth a mynediad

### Mewngofnodi aml-ffactor i staff

{{readiness:mfa}}

Mae'r drefn fewngofnodi a ddarperir yn gofyn i staff am god untro. Rhaid i wasanaeth mewngofnodi'r sefydliad ei hun wneud yr un peth.

### Mewngofnodi fesul defnyddiwr yn yr API

{{readiness:api-authentication}}

Wedi'i adeiladu a'i brofi, ac mae'r log archwilio yn cofnodi'r defnyddiwr a wiriwyd. Nid yw wedi'i droi ymlaen yn ddiofyn eto, ac nid oes storfa ddiogel i'r allwedd lofnodi.

### Mewngofnodi i ddangosfwrdd y gweithredwr

{{readiness:operator-sign-in}}

Nid oes modd mewngofnodi i ddangosfwrdd y gweithredwr eto. Mae angen penderfyniad yn gyntaf.

### Prawf o hunaniaeth claf

{{readiness:identity-proofing}}

Dim ond ar ôl i aelod o staff a enwir gofnodi prawf o hunaniaeth y mae cyfrif claf yn gweithio. Nid oes sgrin staff ar gyfer hyn eto, ac nid yw NHS login wedi'i gysylltu.

## Dibynadwyedd

### Copïau wrth gefn ac ymarfer adfer

{{readiness:backups}}

Mae ymarfer gwneud copi wrth gefn ac adfer yn rhedeg ar bob newid. Nid oes gan unrhyw wasanaeth byw gopïau wrth gefn eto.

### Rhybuddion pan fydd rhywbeth yn methu

{{readiness:alerting}}

Mae'r system yn adrodd y ffigurau i rybuddio arnynt, ac mae'r llyfr rhedeg yn eu henwi. Nid oes rhybudd wedi'i osod.

### Targed argaeledd

{{readiness:availability}}

Nid oes targed wedi'i osod.

## Negeseuon

### Caniatâd, optio allan ac oriau tawel

{{readiness:consent}}

Wedi'i adeiladu a'i brofi yn yr un man y mae pob neges yn mynd drwyddo. Nid yw'r geiriad wedi'i adolygu gyda chleifion.

### Derbynebau danfon ac ailgynigion

{{readiness:receipts}}

Mae ochr y system wedi'i hadeiladu a'i phrofi. Nid yw wedi'i rhoi ar brawf gyda chludwr go iawn.

### Cludwyr negeseuon go iawn

{{readiness:carriers}}

Byddai pob cludwr yn cysylltu ag un rhyngwyneb. Nid oes contract gyda chludwr, ac nid oes neges wedi'i hanfon drwy un go iawn.

## Pobl a chynnwys

### Cyfieithiadau wedi'u hadolygu

{{readiness:translations}}

Mae drafft ym mhob iaith rhyngwyneb. Nid oes siaradwr iaith gyntaf wedi adolygu'r un, a rhaid adolygu'r Gymraeg cyn i gleifion ei gweld.

### Hygyrchedd wedi'i wirio gan bobl

{{readiness:accessibility}}

Mae gwiriadau awtomatig yn rhedeg yn y profion porwr, ac mae datganiad wedi'i ddrafftio. Does neb wedi'i brofi â llaw, ac nid yw'r datganiad wedi'i gyhoeddi.

### Profi defnyddioldeb

{{readiness:usability}}

Does neb wedi profi'r system gyda chleifion na staff.

## Y gadwyn gyflenwi

### Gwirio dibyniaethau

{{readiness:dependency-checks}}

Wedi'i wneud: mae trwydded pob dibyniaeth a'r cyngor diogelwch hysbys amdani yn cael eu gwirio ar bob newid.

### Gwiriadau gofynnol cyn i newid gyrraedd

{{readiness:required-ci}}

Mae'r gwiriadau llawn yn rhedeg ar bob newid, ond nid oes dim eto'n atal newid sy'n eu methu rhag cyrraedd y brif gangen.

### Bil deunyddiau meddalwedd

{{readiness:sbom}}

Wedi'i wneud: daw pob rhyddhad gyda rhestr o bopeth sydd ynddo.
