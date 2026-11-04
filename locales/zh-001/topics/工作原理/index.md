---
peer: how-it-works
title: 工作原理
nav: 工作原理
order: 3
description: 用通俗的语言介绍患者管理系统的组成，以及它为什么把身份信息放在单独的服务中。
---

本页以非技术方式概述系统的主要组成部分。

## 提醒流程

1. 诊所预约一次就诊。
2. 系统安排提醒，并在每次发送前检查同意设置和免打扰时段。
3. 患者通过自己选择的语言和渠道收到消息。
4. 回复会更新预约，操作会被记录。
5. 如果没有回复，工作人员会收到一项电话联系任务。
6. 如果患者取消，号源可以提供给候补患者。

## 主要组件

| 部分 | 作用 | 构建技术 |
|---|---|---|
| [API](tree:patient-administration-system-with-rust) | 保存所有规则，并与其他医院系统通信 | Rust, Axum, SeaORM |
| [网页界面](tree:patient-administration-system-ui-with-svelte) | 工作人员和患者使用的界面 | SvelteKit, Svelte, Lily Design System |
| [运维仪表板](tree:patient-administration-system-frontend) | 面向运维人员的独立服务器渲染仪表板 | Rust, Loco |
| [开发环境](tree:podman) | 在你的电脑上运行配套服务 | PostgreSQL, Keycloak, Redis, Podman |

## 身份数据

本系统不保存姓名、地址或员工记录。它通过不透明的标识符引用每个人。

身份信息保存在另外两个服务中：`person-service` 负责患者，`worker-service` 负责工作人员。这种分离限制了本系统保存的个人数据。

## 集成

系统支持用于一般软件集成的 REST、用于健康数据交换的 FHIR R5，以及用于既有医院消息传递的 HL7 v2。

## 变更流程

每次行为变更都包含规格说明、代码和测试的修改，并一起提交。[阅读规格说明](repo:spec/index.md)。
