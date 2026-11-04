---
peer: tutorial
title: 教程
nav: 教程
order: 5
description: 在你自己的电脑上运行患者管理系统的分步教程，适合好奇的初学者和开发者。
---

本教程说明如何在本地电脑上运行本系统。需要使用终端，但不需要了解 Rust 或 Svelte。

> 此设置仅用于评估。请勿使用真实患者数据。它使用公开的测试密码。

## 第 1 步：安装工具

需要以下工具：

- [Rust](https://www.rust-lang.org/tools/install)，用于构建 API。项目会自动选择正确的版本。
- [Node 26 和 pnpm](https://pnpm.io/installation)，用于运行网页界面。
- [Podman](https://podman.io/docs/installation)，用于运行数据库和登录服务。

## 第 2 步：获取代码

打开终端，下载项目并进入其文件夹：

```sh
git clone https://github.com/patient-administration-system/patient-administration-system.git
cd patient-administration-system
```

## 第 3 步：启动数据库和登录服务

```sh
podman compose -f podman/compose.yml up -d
```

如果端口已被占用，请按如下方式选择其他端口，并修改后续步骤中相应的端口号：

```sh
PAS_PG_PORT=5442 PAS_KEYCLOAK_PORT=8190 podman compose -f podman/compose.yml up -d
```

## 第 4 步：设置数据库

这一步会创建数据表，然后添加一个演示机构、一个病区、一个房间和三张床位。首次运行需要下载并编译依赖项，可能需要一些时间。

```sh
export DATABASE_URL=postgres://pas:pas_dev_password@localhost:5432/pas
cargo run -p patient-administration-system-migrations --bin pas-migrate -- up
cargo run -p patient-administration-system --bin pas-seed
```

## 第 5 步：启动令牌服务

在同一文件夹中打开**第二个终端**，并让它保持运行：

```sh
sh scripts/dev-auth.sh
```

## 第 6 步：启动 API

回到第一个终端并运行：

```sh
PAS_PASETO_KEYS_URL=http://127.0.0.1:8195/keys.json PAS_REQUIRE_AUTH=true \
  cargo run -p patient-administration-system
```

启动后，在浏览器中打开 <http://localhost:8080/swagger-ui/>。此页面提供 API 文档。

## 第 7 步：启动网页界面

在项目文件夹中打开**第三个终端**：

```sh
cd patient-administration-system-ui-with-svelte
cp .env.example .env
pnpm install && pnpm run dev
```

## 第 8 步：登录

打开 <http://localhost:5173>，使用其中一个测试用户登录：

| 用户名 | 密码 | 用途 |
|---|---|---|
| `admin` | `admin` | 工作人员视图：排班、预约和候诊名单 |
| `patient` | `patient` | 患者视图：预约和消息 |

**列表将为空。** 演示数据中没有人员，因为患者和工作人员保存在 `person-service` 和 `worker-service` 中，它们是独立的项目。

## 第 9 步：关闭

在每个终端中按 `Ctrl` 和 `C` 停止程序，然后停止配套服务：

```sh
podman compose -f podman/compose.yml down
```

## 后续步骤

- [工作原理](topic:how-it-works)
- [安装指南](repo:INSTALL.md)
- [贡献指南](repo:CONTRIBUTING.md)和[工作队列](repo:tasks.md)
- [问题跟踪](https://github.com/patient-administration-system/patient-administration-system/issues)
