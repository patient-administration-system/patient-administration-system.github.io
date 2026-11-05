---
title: Tutorial
nav: Tutorial
order: 5
description: A step-by-step tutorial for running the Patient Administration System on your own computer, for curious beginners and developers.
---

This tutorial describes how to run the system on a local computer. It requires a terminal, but no knowledge of Rust or Svelte.

> This setup is for evaluation only. Do not use real patient data. It uses publicly known test passwords.

## Step 1: Install the tools

The following tools are required:

- [Rust](https://www.rust-lang.org/tools/install), which builds the API. The project picks the right version for you.
- [Node 26 with pnpm](https://pnpm.io/installation), which runs the web interface.
- [Podman](https://podman.io/docs/installation), which runs the database and sign-in service.

## Step 2: Get the code

Open a terminal, download the project and change to its folder:

```sh
git clone https://github.com/patient-administration-system/patient-administration-system.git
cd patient-administration-system
```

## Step 3: Start the database and sign-in service

```sh
podman compose -f podman/compose.yml up -d
```

If a port is already in use, choose other ports as shown, and change the matching port numbers in later steps:

```sh
PAS_PG_PORT=5442 PAS_KEYCLOAK_PORT=8190 podman compose -f podman/compose.yml up -d
```

## Step 4: Set up the database

This creates the tables and adds one demo facility, one ward, one room and three beds. The first run downloads and compiles dependencies, which can take some time.

```sh
export DATABASE_URL=postgres://pas:pas_dev_password@localhost:5432/pas
cargo run -p patient-administration-system-migrations --bin pas-migrate -- up
cargo run -p patient-administration-system --bin pas-seed
```

## Step 5: Start the token service

Open a **second terminal** in the same folder and leave this command running:

```sh
sh scripts/dev-auth.sh
```

## Step 6: Start the API

In the first terminal, run:

```sh
PAS_PASETO_KEYS_URL=http://127.0.0.1:8195/keys.json PAS_REQUIRE_AUTH=true \
  cargo run -p patient-administration-system --bin patient-administration-system
```

When it has started, open <http://localhost:8080/api/health> in a browser to confirm that it is running. Swagger UI at `/swagger-ui/` requires a token in this mode, so it returns 401.

## Step 7: Start the web interface

Open a **third terminal** in the project folder:

```sh
cd patient-administration-system-ui-with-svelte
cp .env.example .env
pnpm install && pnpm run dev
```

If you chose another Keycloak port in step 3, change it in `OIDC_ISSUER` in `.env` too.

## Step 8: Sign in

Open <http://localhost:5173> and sign in as one of the test users:

| Username | Password | Purpose |
|---|---|---|
| `admin` | `admin` | Staff view: schedule, appointments and waiting lists |
| `patient` | `patient` | Patient view: appointments and messages |

The `admin` user is also asked for a one-time code, as staff are. Add the development key `JBSWY3DPEHPK3PXP` to an authenticator app, and enter the code it shows.

**The lists will be empty.** The demo data contains no people, because patients and staff are held in `person-service` and `worker-service`, which are separate projects.

## Step 9: Shut down

Press `Ctrl` and `C` in each terminal to stop the programs, then stop the supporting services:

```sh
podman compose -f podman/compose.yml down
```

## Next steps

- [How it works](topic:how-it-works)
- [Install guide](repo:INSTALL.md)
- [Contribution guide](repo:CONTRIBUTING.md) and [work queue](repo:tasks.md)
- [Issue tracker](https://github.com/patient-administration-system/patient-administration-system/issues)
