# منصة ناصر للمدونات

<div align="center">

**تطبيق مدونات حديث متكامل (Full‑Stack) بهندسة احترافية وتجربة تطوير مريحة.**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-6DB33F?logo=spring)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## فهرس المحتويات

- [نظرة عامة](#نظرة-عامة)
- [الميزات الأساسية](#الميزات-الأساسية)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [معمارية النظام](#معمارية-النظام)
- [البدء السريع](#البدء-السريع)
- [تفاصيل الـ Backend](#تفاصيل-ال-backend)
- [تفاصيل الـ Frontend](#تفاصيل-ال-frontend)
- [المساهمة](#المساهمة)
- [الترخيص](#الترخيص)

---

## نظرة عامة

**منصة ناصر للمدونات (Nasser Blog Platform)** هي نظام تدوين متكامل وغني بالميزات يتيح للكتّاب إنشاء وتحرير ونشر المقالات مع دعم كامل للتصنيفات (Categories) والوسوم (Tags). يعتمد المشروع على معمارية منفصلة (Decoupled Architecture) تجمع بين REST API قوية مبنية بـ Spring Boot وواجهة أمامية تفاعلية مبنية بـ React (SPA)، ليوفّر تجربة سلسة وآمنة وقابلة للتوسّع لكل من القرّاء والمؤلفين.

سواء كنت تستعرض المقالات المنشورة، أو تدير المسودات (Drafts)، أو تنظّم المحتوى باستخدام التصنيفات والوسوم، فإن المنصة توفّر واجهات برمجية نظيفة، ومصادقة مبنية على JWT، وواجهة مستخدم مصقولة.

---

## الميزات الأساسية

| الميزة | الوصف |
|--------|-------|
| **تسجيل الدخول والمصادقة** | تسجيل وتسجيل دخول آمن باستخدام JWT؛ مصادقة عديمة الحالة (Stateless) بدون جلسات |
| **إدارة المقالات** | إنشاء وقراءة وتحديث وحذف المقالات مع دعم حالتي المسودة/المنشور |
| **نظام التصنيفات والوسوم** | تنظيم المحتوى عبر التصنيفات (Categories) والوسوم (Tags) مع إمكانيات التصفية |
| **التصفية والبحث** | تصفية المقالات حسب التصنيف أو الوسم عبر بارامترات الاستعلام |
| **إدارة المسودات** | مساحة خاصة للمسودات لكل مؤلف مُصادق عليه |
| **مسارات محمية** | حماية لمسارات إنشاء/تعديل المقالات وإدارة التصنيفات والوسوم |
| **واجهة متجاوبة** | واجهة مستخدم مبنية بـ Tailwind CSS مع حركات سلسة عبر Framer Motion |
| **واجهات REST منظمة** | واجهات REST موحّدة ومُسجّلة بإصدار (`/api/v1/`) |
| **مرونة قاعدة البيانات** | H2 لبيئة التطوير، وPostgreSQL (مثل Supabase) للإنتاج |

---

## التقنيات المستخدمة

### Backend

| التقنية | الغرض |
|---------|-------|
| **Java 21** | لغة التشغيل والميزات الحديثة |
| **Spring Boot 4.0.1** | إطار العمل الأساسي للتطبيق |
| **Spring Web MVC** | طبقة REST API |
| **Spring Data JPA** | الوصول للبيانات وطبقة الـ ORM |
| **Spring Security** | المصادقة والصلاحيات |
| **Hibernate** | تنفيذ JPA |
| **PostgreSQL** | قاعدة بيانات الإنتاج (مع دعم Supabase) |
| **H2** | قاعدة بيانات داخل الذاكرة لبيئة التطوير |
| **JJWT (0.11.5)** | إنشاء والتحقق من الـ JWT |
| **MapStruct 1.6.3** | تحويل الكيانات إلى DTO والعكس |
| **Lombok 1.18.36** | تقليل الشيفرة المتكررة (Boilerplate) |
| **Maven** | إدارة البناء والاعتمادات |

### Frontend

| التقنية | الغرض |
|---------|-------|
| **React 19** | مكتبة بناء واجهات المستخدم |
| **TypeScript 5.7** | أمان الأنواع وتحسين تجربة التطوير |
| **Vite 6** | أداة بناء وخادم تطوير سريع |
| **Tailwind CSS 4** | نظام تنسيق مبني على المرافق (Utility‑first) |
| **Zustand 5** | إدارة الحالة في الواجهة الأمامية |
| **React Router 7** | إدارة التوجيه (Routing) في الواجهة الأمامية |
| **Axios** | عميل HTTP مع Interceptors للـ JWT |
| **Framer Motion 12** | الرسوم والحركات الانتقالية |
| **React Icons 5** | مكتبة أيقونات جاهزة |

---

## معمارية النظام

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React + Vite)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Zustand    │  │ React Router │  │ Axios API    │  │ Tailwind +   │ │
│  │   Stores     │  │ (Routes)     │  │ Client       │  │ Framer       │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────────────────────────┬────────────────────────────────┘
                                         │ HTTP + JWT (Bearer)
                                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Spring Boot)                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Controllers  │──│   Services   │──│  Repositories│──│  Entities    │ │
│  │ (REST API)   │  │ (Business)   │  │ (JPA)        │  │ (JPA)        │ │
│  └──────┬───────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                                                               │
│  ┌──────┴───────┐  ┌──────────────┐                                     │
│  │ JWT Filter   │  │ CORS Config  │                                     │
│  │ + Security   │  │              │                                     │
│  └──────────────┘  └──────────────┘                                     │
└────────────────────────────────────────┬────────────────────────────────┘
                                         │ JDBC
                                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     DATABASE (PostgreSQL / H2)                         │
│  users | posts | categories | tags | post_tags                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**نظرة عامة على نموذج البيانات**

- **User**: يمثّل المستخدم/المؤلف، يحتوي على البريد الإلكتروني وكلمة المرور والاسم الأول والأخير، وعلاقة واحد إلى متعدد مع المقالات.
- **Post**: يمثّل المقال، يحتوي على العنوان والمحتوى والحالة (DRAFT / PUBLISHED) ووقت القراءة والتصنيف والوسوم والتواريخ.
- **Category**: تصنيف للمحتوى، يحتوي على الاسم والوصف لتنظيم المقالات.
- **Tag**: وسم للمحتوى؛ يرتبط بعلاقة متعدد إلى متعدد مع المقالات عبر جدول ربط `post_tags`.

---

## البدء السريع

### المتطلبات المسبقة

- **Node.js** إصدار 18 أو أعلى مع **npm**
- **Java 21** (يفضّل OpenJDK)
- **Maven** 3.6 أو أعلى
- **PostgreSQL** (أو استخدام H2 للتطوير بتعديل الإعدادات)

### 1. استنساخ المستودع

```bash
git clone <repository-url>
cd nasser-blog
```

### 2. إعداد الـ Backend

```bash
cd Backend/blog-platform
```

قم بإنشاء أو تحديث ملف `src/main/resources/application.properties` بإعداداتك الخاصة. يُفضّل استخدام متغيرات البيئة للبيانات الحساسة:

```properties
# قاعدة البيانات (مثال لـ PostgreSQL محلي)
spring.datasource.url=jdbc:postgresql://localhost:5432/blog_db
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:your_password}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

# JWT (استخدم قيمة سرية طويلة وعشوائية في بيئة الإنتاج)
jwt.secret=${JWT_SECRET:your-256-bit-secret-key-at-least-32-bytes-long}
```

للتطوير باستخدام H2 يمكنك استخدام إعدادات مثل:

```properties
spring.datasource.url=jdbc:h2:mem:blogdb
spring.datasource.driver-class-name=org.h2.Driver
spring.h2.console.enabled=true
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

لتشغيل الـ Backend:

```bash
./mvnw spring-boot:run
```

ستكون واجهات الـ API متاحة على: `http://localhost:8080`.

### 3. إعداد الـ Frontend

```bash
cd Frontend
npm install
npm run dev
```

ستعمل الواجهة على `http://localhost:5173` (المنفذ الافتراضي لـ Vite).

**ضبط عنوان الـ API الأساسي:** الواجهة الأمامية تستخدم `http://localhost:8080` افتراضيًا (انظر `src/api/axiosInstance.ts`). عدّل القيمة `BASE_URL` إذا كان الـ Backend يعمل على عنوان مختلف.

### 4. إعداد CORS

تم ضبط الـ Backend ليسمح بالوصول من `http://localhost:5173` بشكل افتراضي. إذا استخدمت نطاقًا مختلفًا للواجهة الأمامية، حدّث الإعداد في `CorsSecurityConfig.java`.

---

## تفاصيل الـ Backend

### هيكل المشروع

```
Backend/blog-platform/
├── src/main/java/com/nasser/blog/blog_platform/
│   ├── BlogPlatformApplication.java
│   ├── config/
│   │   ├── CorsSecurityConfig.java      # إعداد CORS
│   │   └── SecurityConfig.java          # إعدادات الأمان وفلتر JWT
│   ├── controllers/
│   │   ├── AuthController.java          # /api/v1/auth (تسجيل الدخول والتسجيل)
│   │   ├── CategoryController.java      # /api/v1/categories
│   │   ├── ErrorController.java         # معالجة الأخطاء العامة
│   │   ├── PostController.java          # /api/v1/posts
│   │   └── TagController.java           # /api/v1/tags
│   ├── domain/
│   │   ├── entities/                    # الكيانات (Post, User, Category, Tag)
│   │   ├── dtos/                        # كائنات نقل البيانات (DTO)
│   │   └── PostStatus.java              # enum لحالة المقال (DRAFT, PUBLISHED)
│   ├── mappers/                         # محوّلات MapStruct
│   ├── repositories/                    # مستودعات Spring Data JPA
│   ├── security/
│   │   ├── BlogUserDetailsService.java
│   │   └── JwtAuthenticationFilter.java
│   └── services/                        # منطق الأعمال (Business Logic)
└── src/main/resources/
    └── application.properties
```

### واجهات الـ API

| الطريقة | المسار | يحتاج مصادقة؟ | الوصف |
|---------|--------|---------------|-------|
| POST | `/api/v1/auth/login` | لا | مصادقة المستخدم وإرجاع JWT |
| POST | `/api/v1/auth/register` | لا | تسجيل مستخدم جديد وإرجاع JWT |
| GET | `/api/v1/posts` | لا | عرض المقالات (مع دعم `?categoryId=` و `?tagId=` للتصفية) |
| GET | `/api/v1/posts/{id}` | لا | عرض مقال واحد بالتفصيل |
| GET | `/api/v1/posts/drafts` | نعم | عرض مسودات المستخدم الحالي |
| POST | `/api/v1/posts` | نعم | إنشاء مقال جديد |
| PUT | `/api/v1/posts/{id}` | نعم | تعديل مقال |
| DELETE | `/api/v1/posts/{id}` | نعم | حذف مقال |
| GET | `/api/v1/categories` | لا | عرض كل التصنيفات |
| POST | `/api/v1/categories` | نعم | إنشاء تصنيف جديد |
| DELETE | `/api/v1/categories/{id}` | نعم | حذف تصنيف |
| GET | `/api/v1/tags` | لا | عرض كل الوسوم |
| POST | `/api/v1/tags` | نعم | إنشاء وسوم (مجموعة دفعة واحدة) |
| DELETE | `/api/v1/tags/{id}` | نعم | حذف وسم |

**المصادقة:** للمسارات المحمية يجب إرسال الهيدر:

```http
Authorization: Bearer <token>
```

### نموذج الأمان

- مصادقة عديمة الحالة (Stateless) باستخدام JWT.
- المسارات المفتوحة: مسارات المصادقة، وطلبات GET للمقالات والتصنيفات والوسوم.
- المسارات المحمية: إنشاء/تعديل/حذف المقالات، إدارة المسودات، التصنيفات، والوسوم.
- يقوم `JwtAuthenticationFilter` بالتحقق من التوكن وضبط `userId` في سياق الطلب للاستخدام داخل الخدمات.

---

## تفاصيل الـ Frontend

### هيكل المشروع

```
Frontend/
├── src/
│   ├── api/                    # طبقة استهلاك الـ API
│   │   ├── axiosInstance.ts    # إعداد Axios + JWT Interceptor
│   │   ├── authApi.ts
│   │   ├── categoryApi.ts
│   │   ├── postApi.ts
│   │   ├── responseType.ts
│   │   └── tagApi.ts
│   ├── components/
│   │   ├── CreateCategoryCard.tsx
│   │   ├── CreateTagsCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LoginFormCard.tsx
│   │   ├── PostCard.tsx
│   │   └── RegisterFormCard.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PostDetails.tsx
│   │   ├── LoginRegisterPage.tsx
│   │   ├── CreatePost.tsx
│   │   ├── UpdatePost.tsx
│   │   ├── MyDraft.tsx
│   │   ├── CategoriesAndTagsPage.tsx
│   │   └── NotFound.tsx
│   ├── routes/
│   │   ├── AppRoutes.tsx       # تعريف المسارات
│   │   ├── ProtectedRoute.tsx  # تغليف المسارات التي تحتاج مصادقة
│   │   └── PublicRoute.tsx     # تغليف المسارات العامة (مثل صفحة الدخول)
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── homeStore.ts
│   │   ├── PostDetailsStore.ts
│   │   ├── postFormStore.ts
│   │   ├── taxonomyStore.ts
│   │   └── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.ts
```

### المسارات (Routes)

| المسار | مستوى الوصول | الصفحة |
|--------|--------------|--------|
| `/` | عام | الصفحة الرئيسية (قائمة المقالات) |
| `/posts/:id` | عام | تفاصيل مقال محدّد |
| `/login` | للزوار فقط | صفحة تسجيل الدخول/التسجيل |
| `/create-post` | يتطلب مصادقة | إنشاء مقال جديد |
| `/update-post/:id` | يتطلب مصادقة | تعديل مقال |
| `/my-drafts` | يتطلب مصادقة | قائمة مسودات المستخدم |
| `/categories-tags` | يتطلب مصادقة | إدارة التصنيفات والوسوم |
| `*` | عام | صفحة 404 (غير موجود) |

### إدارة الحالة باستخدام Zustand

- **authStore**: تخزين التوكن، معرّف المستخدم، ودوال تسجيل الدخول/التسجيل/تسجيل الخروج، مع مزامنة مع `localStorage`.
- **homeStore**: إدارة بيانات الصفحة الرئيسية (المقالات، الفلاتر، إلخ).
- **PostDetailsStore**: إدارة حالة عرض مقال واحد.
- **postFormStore**: حالة نماذج إنشاء/تعديل المقال.
- **taxonomyStore**: إدارة التصنيفات (Categories) والوسوم (Tags).

### أوامر npm

| السكربت | الأمر | الوصف |
|---------|-------|-------|
| `dev` | `npm run dev` | تشغيل خادم التطوير Vite |
| `build` | `npm run build` | بناء نسخة الإنتاج (TypeScript + Vite) |
| `preview` | `npm run preview` | معاينة نسخة الإنتاج محليًا |
| `lint` | `npm run lint` | تشغيل ESLint لفحص الشيفرة |

---

## المساهمة

يسعدنا استقبال المساهمات على المشروع. يُفضَّل اتباع الخطوات التالية:

1. قم بعمل Fork للمستودع.
2. أنشئ فرعًا جديدًا للميزة (`git checkout -b feature/amazing-feature`).
3. نفّذ تعديلاتك ثم قم بعمل Commit مناسب (`git commit -m 'Add amazing feature'`).
4. ادفع الفرع إلى GitHub (`git push origin feature/amazing-feature`).
5. افتح Pull Request مع وصف واضح لما قمت به.

**ملاحظة:** يُستحسن التأكد من مرور الكود على الاختبارات وفحص الـ Lint قبل إرسال الطلب.

---

## الترخيص

هذا المشروع متاح وفقًا لنوع الترخيص المحدد في المستودع. يرجى الرجوع إلى ملف الترخيص (License) في المشروع لمعرفة التفاصيل.

---

<div align="center">

**منصة ناصر للمدونات — مبنية باستخدام Spring Boot و React**

</div>

