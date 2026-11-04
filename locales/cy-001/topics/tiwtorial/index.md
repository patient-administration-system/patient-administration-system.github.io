---
peer: tutorial
title: Tiwtorial
nav: Tiwtorial
order: 5
description: Tiwtorial cam wrth gam ar gyfer rhedeg y System Gweinyddu Cleifion ar eich cyfrifiadur eich hun, i ddechreuwyr chwilfrydig a datblygwyr.
---

Mae'r tiwtorial hwn yn disgrifio sut i redeg y system ar gyfrifiadur lleol. Mae angen terfynell, ond nid oes angen gwybodaeth am Rust na Svelte.

> Ar gyfer gwerthuso yn unig y mae'r gosodiad hwn. Peidiwch â defnyddio data cleifion go iawn. Mae'n defnyddio cyfrineiriau prawf sy'n hysbys i'r cyhoedd.

## Cam 1: Gosod yr offer

Mae angen yr offer canlynol:

- [Rust](https://www.rust-lang.org/tools/install), sy'n adeiladu'r API. Mae'r prosiect yn dewis y fersiwn iawn i chi.
- [Node 26 gyda pnpm](https://pnpm.io/installation), sy'n rhedeg y rhyngwyneb gwe.
- [Podman](https://podman.io/docs/installation), sy'n rhedeg y gronfa ddata a'r gwasanaeth mewngofnodi.

## Cam 2: Cael y cod

Agorwch derfynell, yna lawrlwythwch y prosiect a mynd i'w ffolder:

```sh
git clone https://github.com/patient-administration-system/patient-administration-system.git
cd patient-administration-system
```

## Cam 3: Dechrau'r gronfa ddata a'r gwasanaeth mewngofnodi

```sh
podman compose -f podman/compose.yml up -d
```

Os yw porth eisoes yn cael ei ddefnyddio, dewiswch byrth eraill fel y dangosir, a newidiwch rifau'r pyrth yn y camau nesaf:

```sh
PAS_PG_PORT=5442 PAS_KEYCLOAK_PORT=8190 podman compose -f podman/compose.yml up -d
```

## Cam 4: Paratoi'r gronfa ddata

Mae hyn yn creu'r tablau, yna'n ychwanegu un cyfleuster enghreifftiol, un ward, un ystafell a thri gwely. Mae'r rhediad cyntaf yn lawrlwytho ac yn crynhoi dibyniaethau, a all gymryd peth amser.

```sh
export DATABASE_URL=postgres://pas:pas_dev_password@localhost:5432/pas
cargo run -p patient-administration-system-migrations --bin pas-migrate -- up
cargo run -p patient-administration-system --bin pas-seed
```

## Cam 5: Dechrau'r gwasanaeth tocynnau

Agorwch **ail derfynell** yn yr un ffolder. Gadewch hwn yn rhedeg:

```sh
sh scripts/dev-auth.sh
```

## Cam 6: Dechrau'r API

Ewch yn ôl i'ch terfynell gyntaf a rhedeg:

```sh
PAS_PASETO_KEYS_URL=http://127.0.0.1:8195/keys.json PAS_REQUIRE_AUTH=true \
  cargo run -p patient-administration-system
```

Pan fydd wedi dechrau, agorwch <http://localhost:8080/swagger-ui/> mewn porwr. Mae'r dudalen hon yn dogfennu'r API.

## Cam 7: Dechrau'r rhyngwyneb gwe

Agorwch **drydedd derfynell** yn ffolder y prosiect:

```sh
cd patient-administration-system-ui-with-svelte
cp .env.example .env
pnpm install && pnpm run dev
```

## Cam 8: Mewngofnodi

Agorwch <http://localhost:5173> a mewngofnodwch gydag un o'r defnyddwyr prawf:

| Enw defnyddiwr | Cyfrinair | Diben |
|---|---|---|
| `admin` | `admin` | Golwg staff: amserlen, apwyntiadau a rhestrau aros |
| `patient` | `patient` | Golwg claf: apwyntiadau a negeseuon |

**Bydd y rhestrau'n wag.** Nid oes pobl yn y data enghreifftiol, gan y cedwir cleifion a staff yn `person-service` a `worker-service`, sy'n brosiectau ar wahân.

## Cam 9: Cau i lawr

Pwyswch `Ctrl` ac `C` ym mhob terfynell i atal y rhaglenni, yna ataliwch y gwasanaethau ategol:

```sh
podman compose -f podman/compose.yml down
```

## Camau nesaf

- [Sut mae'n gweithio](topic:how-it-works)
- [Canllaw gosod](repo:INSTALL.md)
- [Canllaw cyfrannu](repo:CONTRIBUTING.md) a'r [ciw gwaith](repo:tasks.md)
- [Traciwr materion](https://github.com/patient-administration-system/patient-administration-system/issues)
