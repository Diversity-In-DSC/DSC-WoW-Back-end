# DSC WoW - Backend

### Getting Started

```bash
git clone https://github.com/Diversity-In-DSC/DSC-WoW-Backend.git

cd DSC-WoW-Backend

npm i

npm start

```

### Public APIs

1. api/user/register

Content-Type: application/json

```
{
  "username": "test",
  "email": "test@test.com",
}
```

2. api/contactus

Content-Type: application/json

```
{
  "username": "test",
  "email": "test@test.com",
  "subject": "test",
  "message": "test"
}
```

### Requirements

1. `config.json` in project root directory : firebase service account
