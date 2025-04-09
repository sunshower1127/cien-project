# 중앙대 동아리 Cien 키오스크 대쉬보드

- 날짜: 2025-03-01
- 개발환경: mac + bun + vite + vercel
- 스택: react + tailwind
- 설명: polling 형태로 일정 주기마다 백엔드에서 데이터 받아와서 화면에 보여줌

---

### 세부사항

- 1920 \* 1080 크기 화면 전용
- 동아리 디자이너분의 figma 디자인 그대로 구현
- 고양이가 동방에 있는 사람 수 만큼 화면에 등장함

---

### 실행방법

서버에 git 깔려있는지 체크

```shell
git --version
```

안깔려있으면 깔기

```shell
sudo apt-get install -y git
```

원하는 폴더에 프로젝트 클론(다운로드)

```shell
cd 원하는폴더
git clone https://github.com/sunshower1127/cien-project.git
```

폴더로 이동

```shell
cd cien-project
```

hosting 파일 실행권한 주기

```shell
sudo chmod +x ./hosting
```

프로그램 백그라운드에서 실행
& 원하는 포트번호 설정

```shell
nohup ./hosting --port 포트번호 &
```

이후에 서버에서 포트번호 포트포워딩해주고
라즈베리파이 firefox에서 `http://localhost:포트번호` 들어가주면 끝

---

나중에 프로세스 종료하는법

```shell
ps aux | grep hosting
```

해서 나온 프로세스의 ID를

```shell
kill 프로세스ID
```

해주면 종료됨
