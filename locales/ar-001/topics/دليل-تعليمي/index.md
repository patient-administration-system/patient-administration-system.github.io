---
peer: tutorial
title: الدليل التعليمي
nav: الدليل التعليمي
order: 5
description: دليل خطوة بخطوة لتشغيل نظام إدارة المرضى على جهازك، للمبتدئين الفضوليين والمطورين.
---

يشرح هذا الدليل طريقة تشغيل النظام على جهاز محلي. ويتطلب استخدام الطرفية، لكنه لا يتطلب معرفة بلغة Rust أو Svelte.

> هذا الإعداد مخصص للتقييم فقط. لا تستخدم بيانات مرضى حقيقية، فهو يستخدم كلمات مرور اختبارية معروفة علنًا.

## الخطوة 1: تثبيت الأدوات

الأدوات التالية مطلوبة:

- [Rust](https://www.rust-lang.org/tools/install)، لبناء واجهة برمجة التطبيقات. ويختار المشروع الإصدار المناسب لك.
- [Node 26 مع pnpm](https://pnpm.io/installation)، لتشغيل واجهة الويب.
- [Podman](https://podman.io/docs/installation)، لتشغيل قاعدة البيانات وخدمة تسجيل الدخول.

## الخطوة 2: الحصول على الشيفرة

افتح طرفية، ونزّل المشروع، ثم انتقل إلى مجلده:

```sh
git clone https://github.com/patient-administration-system/patient-administration-system.git
cd patient-administration-system
```

## الخطوة 3: تشغيل قاعدة البيانات وخدمة تسجيل الدخول

```sh
podman compose -f podman/compose.yml up -d
```

إذا كان أحد المنافذ مستخدمًا بالفعل، فاختر منافذ أخرى كما هو موضح، وغيّر أرقام المنافذ المقابلة في الخطوات اللاحقة:

```sh
PAS_PG_PORT=5442 PAS_KEYCLOAK_PORT=8190 podman compose -f podman/compose.yml up -d
```

## الخطوة 4: إعداد قاعدة البيانات

تُنشئ هذه الخطوة الجداول، وتضيف منشأة تجريبية واحدة وجناحًا واحدًا وغرفة واحدة وثلاثة أسرّة. ويؤدي التشغيل الأول إلى تنزيل التبعيات وتصريفها، وقد يستغرق ذلك بعض الوقت.

```sh
export DATABASE_URL=postgres://pas:pas_dev_password@localhost:5432/pas
cargo run -p patient-administration-system-migrations --bin pas-migrate -- up
cargo run -p patient-administration-system --bin pas-seed
```

## الخطوة 5: تشغيل خدمة الرموز

افتح **طرفية ثانية** في المجلد نفسه، واترك هذا الأمر قيد التشغيل:

```sh
sh scripts/dev-auth.sh
```

## الخطوة 6: تشغيل واجهة برمجة التطبيقات

شغّل ما يلي في الطرفية الأولى:

```sh
PAS_PASETO_KEYS_URL=http://127.0.0.1:8195/keys.json PAS_REQUIRE_AUTH=true \
  cargo run -p patient-administration-system --bin patient-administration-system
```

بعد بدء التشغيل، افتح <http://localhost:8080/api/health> في متصفح للتأكد من أنها تعمل. ويتطلب Swagger UI على `/swagger-ui/` رمزًا في هذا الوضع، ولذلك يُرجع 401.

## الخطوة 7: تشغيل واجهة الويب

افتح **طرفية ثالثة** في مجلد المشروع:

```sh
cd patient-administration-system-ui-with-svelte
cp .env.example .env
pnpm install && pnpm run dev
```

إذا اخترت منفذًا آخر لـ Keycloak في الخطوة 3، فغيّره أيضًا في `OIDC_ISSUER` داخل `.env`.

## الخطوة 8: تسجيل الدخول

افتح <http://localhost:5173> وسجّل الدخول باسم أحد المستخدمين الاختباريين:

| اسم المستخدم | كلمة المرور | الغرض |
|---|---|---|
| `admin` | `admin` | عرض الموظفين: الجدول والمواعيد وقوائم الانتظار |
| `patient` | `patient` | عرض المريض: المواعيد والرسائل |

يُطلب من المستخدم `admin` أيضًا إدخال رمز يُستخدم مرة واحدة، كما يُطلب من الموظفين. أضف مفتاح التطوير `JBSWY3DPEHPK3PXP` إلى تطبيق مصادقة، ثم أدخل الرمز الذي يعرضه.

**ستكون القوائم فارغة.** لا تحتوي البيانات التجريبية على أشخاص، لأن المرضى والموظفين محفوظون في `person-service` و`worker-service`، وهما مشروعان منفصلان.

## الخطوة 9: الإيقاف

اضغط `Ctrl` و`C` في كل طرفية لإيقاف البرامج، ثم أوقف الخدمات المساندة:

```sh
podman compose -f podman/compose.yml down
```

## الخطوات التالية

- [طريقة العمل](topic:how-it-works)
- [دليل التثبيت](repo:INSTALL.md)
- [دليل المساهمة](repo:CONTRIBUTING.md) و[قائمة العمل](repo:tasks.md)
- [متتبع المشكلات](https://github.com/patient-administration-system/patient-administration-system/issues)
