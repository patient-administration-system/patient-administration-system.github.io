---
peer: tutorial
title: ट्यूटोरियल
nav: ट्यूटोरियल
order: 5
description: रोगी प्रशासन प्रणाली को अपने कंप्यूटर पर चलाने का चरण-दर-चरण ट्यूटोरियल, जिज्ञासु शुरुआती लोगों और डेवलपरों के लिए।
---

यह ट्यूटोरियल बताता है कि प्रणाली को स्थानीय कंप्यूटर पर कैसे चलाएँ। इसके लिए टर्मिनल चाहिए, लेकिन Rust या Svelte का ज्ञान ज़रूरी नहीं है।

> यह सेटअप केवल मूल्यांकन के लिए है। वास्तविक रोगी डेटा का उपयोग न करें। इसमें सार्वजनिक रूप से ज्ञात परीक्षण पासवर्ड इस्तेमाल होते हैं।

## चरण 1: उपकरण इंस्टॉल करें

ये उपकरण आवश्यक हैं:

- [Rust](https://www.rust-lang.org/tools/install), जो API बनाता है। परियोजना आपके लिए सही संस्करण चुन लेती है।
- [Node 26 और pnpm](https://pnpm.io/installation), जो वेब इंटरफ़ेस चलाते हैं।
- [Podman](https://podman.io/docs/installation), जो डेटाबेस और साइन-इन सेवा चलाता है।

## चरण 2: कोड प्राप्त करें

टर्मिनल खोलें, परियोजना डाउनलोड करें और उसके फ़ोल्डर में जाएँ:

```sh
git clone https://github.com/patient-administration-system/patient-administration-system.git
cd patient-administration-system
```

## चरण 3: डेटाबेस और साइन-इन सेवा शुरू करें

```sh
podman compose -f podman/compose.yml up -d
```

यदि कोई पोर्ट पहले से उपयोग में है, तो नीचे दिखाए अनुसार दूसरे पोर्ट चुनें, और आगे के चरणों में संबंधित पोर्ट नंबर बदलें:

```sh
PAS_PG_PORT=5442 PAS_KEYCLOAK_PORT=8190 podman compose -f podman/compose.yml up -d
```

## चरण 4: डेटाबेस तैयार करें

इससे तालिकाएँ बनती हैं और एक डेमो सुविधा, एक वार्ड, एक कमरा और तीन बिस्तर जुड़ते हैं। पहली बार चलाने पर निर्भरताएँ डाउनलोड और कंपाइल होती हैं, जिसमें कुछ समय लग सकता है।

```sh
export DATABASE_URL=postgres://pas:pas_dev_password@localhost:5432/pas
cargo run -p patient-administration-system-migrations --bin pas-migrate -- up
cargo run -p patient-administration-system --bin pas-seed
```

## चरण 5: टोकन सेवा शुरू करें

उसी फ़ोल्डर में **दूसरा टर्मिनल** खोलें और यह कमांड चलती रहने दें:

```sh
sh scripts/dev-auth.sh
```

## चरण 6: API शुरू करें

पहले टर्मिनल में चलाएँ:

```sh
PAS_PASETO_KEYS_URL=http://127.0.0.1:8195/keys.json PAS_REQUIRE_AUTH=true \
  cargo run -p patient-administration-system --bin patient-administration-system
```

शुरू होने के बाद, यह पुष्टि करने के लिए ब्राउज़र में <http://localhost:8080/api/health> खोलें कि यह चल रहा है। इस मोड में `/swagger-ui/` पर Swagger UI को टोकन चाहिए, इसलिए यह 401 लौटाता है।

## चरण 7: वेब इंटरफ़ेस शुरू करें

परियोजना के फ़ोल्डर में **तीसरा टर्मिनल** खोलें:

```sh
cd patient-administration-system-ui-with-svelte
cp .env.example .env
pnpm install && pnpm run dev
```

## चरण 8: साइन इन करें

<http://localhost:5173> खोलें और किसी परीक्षण उपयोगकर्ता के रूप में साइन इन करें:

| उपयोगकर्ता नाम | पासवर्ड | उद्देश्य |
|---|---|---|
| `admin` | `admin` | कर्मचारी दृश्य: समय-सारिणी, अपॉइंटमेंट और प्रतीक्षा सूचियाँ |
| `patient` | `patient` | रोगी दृश्य: अपॉइंटमेंट और संदेश |

**सूचियाँ खाली होंगी।** डेमो डेटा में कोई व्यक्ति नहीं है, क्योंकि रोगी और कर्मचारी `person-service` और `worker-service` में रखे जाते हैं, जो अलग परियोजनाएँ हैं।

## चरण 9: बंद करें

प्रोग्राम रोकने के लिए हर टर्मिनल में `Ctrl` और `C` दबाएँ, फिर सहायक सेवाएँ रोकें:

```sh
podman compose -f podman/compose.yml down
```

## अगले कदम

- [यह कैसे काम करता है](topic:how-it-works)
- [इंस्टॉल मार्गदर्शिका](repo:INSTALL.md)
- [योगदान मार्गदर्शिका](repo:CONTRIBUTING.md) और [कार्य सूची](repo:tasks.md)
- [समस्या ट्रैकर](https://github.com/patient-administration-system/patient-administration-system/issues)
