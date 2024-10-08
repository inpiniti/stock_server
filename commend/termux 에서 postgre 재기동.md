1. **PostgreSQL 서버 중지**

```sh
pg_ctl -D $PREFIX/var/lib/postgresql stop
```

2. **PostgreSQL 서버 시작**

```sh
pg_ctl -D $PREFIX/var/lib/postgresql start
```

또는, 한 번에 재기동하려면 `restart` 옵션을 사용할 수 있습니다:

```sh
pg_ctl -D $PREFIX/var/lib/postgresql restart
```

이 명령들은 PostgreSQL 서버의 데이터 디렉토리가 `$PREFIX/var/lib/postgresql`에 있다고 가정합니다. 필요 시 자신의 데이터 디렉토리 경로로 변경하세요.

---

위 명령으로 restart가 되지 않는다면, 아래의 방법을 써서 강제 종료하는 방법이 있음

### 1. PostgreSQL 서버 강제 종료

```
pkill -SIGINT postgres
```

이 명령어는 PostgreSQL 프로세스를 식별하여 강제로 종료합니다. 필요한 경우 `SIGKILL` 신호를 사용할 수도 있지만, 이 경우 데이터 손상 및 복구가 어려울 수 있습니다.

```
pkill -SIGKILL postgres
```

### 2. PostgreSQL 서버 시작

강제 종료 이후에는 서버를 다시 시작해야 합니다.

```
pg_ctl -D $PREFIX/var/lib/postgresql start
```
