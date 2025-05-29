# Avito Frontend Internship

## Требования

- Установлен [Docker](https://www.docker.com/)
- Docker Compose входит в состав Docker Desktop
- Папки проекта:
  - `client/` — React-приложение
  - `server/` — Backend API

---

### Запуск проекта с Docker Compose

1. Клонируйте репозиторий:

```bash
   git clone https://github.com/pinkpagejpeg/avito-tech-internship.git
   cd your-repository-name
```

2. Постройте и запустите проект:

```bash
    docker compose up --build
```

3. Откройте в браузере:

- Клиент: http://localhost:3000
- Сервер: http://localhost:8080

---

### Остановка проекта

Чтобы остановить и удалить контейнеры:
    
```bash
    docker compose down
```