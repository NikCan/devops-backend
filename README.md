# DevOps Backend Service (NestJS)

Бэкенд-сервис для управления списком задач (Todo App), разработанный на **NestJS** с поддержкой **PostgreSQL**, сбором метрик **Prometheus**, пробами готовности/живучести для **Kubernetes** и настроенными **CI/CD** пайплайнами.

---

## 🛠 Стек технологий

* **Фреймворк:** [NestJS](https://nestjs.com/) (v11) / Node.js 24+
* **База данных & ORM:** PostgreSQL + [TypeORM](https://typeorm.io/)
* **Мониторинг & Метрики:** Prometheus ([prom-client](https://github.com/siimon/prom-client))
* **Контейнеризация & Оркестрация:** Docker (Multi-stage), Kubernetes, Helm, ArgoCD
* **Тестирование & Безопасность:** Jest, ESLint, Prettier, Semgrep, Trivy, Gitleaks

---

## 📋 API Эндпоинты

### Основные операции (CRUD Todo)
| Метод | Путь | Описание | Тело запроса / Параметры |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/todos` | Получить список всех задач | — |
| `POST` | `/api/todos` | Создать новую задачу | `{"title": "string"}` |
| `PATCH` | `/api/todos/:id` | Переключить статус выполнения | URL param `id` |
| `DELETE` | `/api/todos/:id` | Удалить задачу | URL param `id` |

### Системные и Observability эндпоинты
| Метод | Путь | Описание |
| :--- | :--- | :--- |
| `GET` | `/health` | Kubernetes Liveness Probe (с имитацией времени прогрева) |
| `GET` | `/ready` | Kubernetes Readiness Probe (с имитацией временной потери готовности) |
| `GET` | `/metrics` | Метрики приложения в формате Prometheus |
| `GET` | `/` | Проверка доступности (Hello World) |

---

## ⚙️ Переменные окружения

Создайте файл `.env` в корне проекта (на основе `.env.example`):

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

| Переменная | Описание | По умолчанию |
| :--- | :--- | :--- |
| `PORT` | Порт HTTP-сервера | `3000` |
| `DATABASE_URL` | Строка подключения к PostgreSQL | — |

---

## 🚀 Быстрый старт

### 1. Локальный запуск

```bash
# Установка зависимостей
yarn install

# Запуск в режиме разработки (watch mode)
yarn start:dev

# Сборка проекта
yarn build

# Запуск production сборки
yarn start:prod
```

### 2. Запуск через Docker

```bash
# Сборка Docker-образа
docker build -t devops-backend .

# Запуск контейнера
docker run -p 3000:3000 --env-file .env devops-backend
```

---

## 🧪 Тестирование и проверки

```bash
# Запуск unit-тестов
yarn test

# Запуск e2e-тестов
yarn test:e2e

# Проверка линтером и форматирование
yarn lint
yarn format
```
