# 수납록 (SunapRok) 홈페이지

폐기물 처리장 수납관리 솔루션 **수납록**의 단일 페이지 랜딩 사이트.

## 기술

- 정적 HTML/CSS/JS (프레임워크 없음)
- 폰트: Google Fonts — Noto Sans KR + Inter
- 배포: Vercel (zero-config, 정적 자동 감지)

## 로컬 미리보기

```bash
# Python
python -m http.server 5173
# 또는 Node
npx serve .
```

`http://localhost:5173` 접속.

## 구조

```
webpage/
├── index.html        랜딩 페이지 본문 (Hero/Pain/기능/워크플로/신뢰/가격/FAQ/푸터)
├── privacy.html      개인정보처리방침
├── terms.html        이용약관
├── og-image.html     1200x630 OG 카드 (PNG 렌더링 원본)
├── og-image.png      소셜 공유 미리보기 이미지 (1200x630)
├── sitemap.xml       검색엔진 색인용
├── robots.txt        크롤러 정책 + sitemap 위치
├── styles.css        브랜드 컬러·반응형 레이아웃·.legal 토큰
├── script.js         FAQ 아코디언(단일 열기)
├── favicon.ico / favicon-*.png / apple-icon-180x180.png / android-icon-192x192.png  파비콘·로고 아이콘 패키지
└── README.md
```

## 배포

1. Vercel 대시보드 → "Add New… → Project"
2. GitHub repo `Hyunwook-Kim-WV/sunaprok_webpage` 임포트
3. Framework Preset: **Other** (정적이므로 빌드 명령 없음)
4. Deploy → `*.vercel.app` 자동 발급

도메인 확보 후 `sunaprok.kr` 을 Vercel Domains에 추가하면 됩니다.
도메인 확정 시 `sitemap.xml`의 `https://sunaprok.kr/` 호스트와 `robots.txt`의 Sitemap URL을 실제 도메인으로 일괄 치환하세요.

## MSI 릴리스 업로드

Hero CTA는 다음 영구 URL을 가리킵니다 (latest = 최신 release 자동 추종):

```
https://github.com/Hyunwook-Kim-WV/sunaprok_webpage/releases/latest/download/sunaprok_1.0.0_x64_ko-KR.msi
```

**중요**
- 본 저장소는 **Public** 이어야 합니다. Private이면 anonymous 다운로드가 404가 됩니다.
- 자산 파일명은 **반드시 `sunaprok_1.0.0_x64_ko-KR.msi`** 로 유지하세요 (한글 "수납록"만 영문 "sunaprok"으로 치환, 나머지 언더스코어 표기 유지). 새 버전(v1.0.1 등) 올릴 때도 같은 파일명 패턴을 유지하면 위 latest URL이 그대로 동작합니다.

### A. 웹 UI로 (처음 사용 권장)

1. 빌드된 MSI를 영문 슬러그로 복사 (한글 그대로 올리면 일부 환경에서 인코딩 문제):

   ```powershell
   Copy-Item "C:\Users\dygks\Documents\Dev\sunaprok\sunaprok\src-tauri\target\release\bundle\msi\수납록_1.0.0_x64_ko-KR.msi" "$env:USERPROFILE\Desktop\sunaprok_1.0.0_x64_ko-KR.msi"
   ```

2. 브라우저로 https://github.com/Hyunwook-Kim-WV/sunaprok_webpage/releases/new
3. Choose a tag → `v1.0.0` 타이핑 → "Create new tag: v1.0.0 on publish"
4. Title `수납록 v1.0.0` / 본문에 변경 요약
5. 회색 박스에 바탕화면 `.msi` 드래그 → 업로드 완료 대기
6. "Set as the latest release" 체크 확인 → **Publish release**

### B. gh CLI로 (재현·자동화에 유리)

```powershell
# 한 번만: GitHub CLI 설치
winget install --id GitHub.cli -e
gh auth login

# 매 릴리스
Copy-Item "C:\Users\dygks\Documents\Dev\sunaprok\sunaprok\src-tauri\target\release\bundle\msi\수납록_1.0.0_x64_ko-KR.msi" "$env:TEMP\sunaprok_1.0.0_x64_ko-KR.msi"
cd C:\Users\dygks\Documents\Dev\sunaprok\webpage
gh release create v1.0.0 "$env:TEMP\sunaprok_1.0.0_x64_ko-KR.msi" `
  --title "수납록 v1.0.0" `
  --notes "폐기물 처리장 통합 관리 v1.0.0 — 계근·청구·정산·입금·장부·라이선스·백업 전 기능."
```

> PowerShell에서 줄 이어붙임은 백슬래시 `\` 가 아니라 **백틱 `` ` ``** 입니다 (bash 명령을 그대로 붙이면 `/tmp` 경로 오류 + 인자 파싱 실패가 일어납니다).

### 검증

```powershell
# HTTP 200이 떠야 정상. 404면 (1) repo Private, (2) 파일명 불일치, (3) Set as latest 체크 풀림
Invoke-WebRequest -Method Head "https://github.com/Hyunwook-Kim-WV/sunaprok_webpage/releases/latest/download/sunaprok_1.0.0_x64_ko-KR.msi" -UseBasicParsing | Select-Object StatusCode
```

## OG 이미지 재생성 (필요 시)

`og-image.html`을 수정한 뒤 Windows에서 Edge headless로 PNG를 다시 생성합니다:

```powershell
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$out  = "$PWD\og-image.png"
$src  = "file:///$($PWD -replace '\\','/')/og-image.html"
& $edge --headless=old --disable-gpu --hide-scrollbars `
        --window-size=1200,630 --virtual-time-budget=10000 `
        --screenshot=$out $src
```

(Chrome `--headless`는 신규 모드에서 `--screenshot`를 지원하지 않는 경우가 있어 Edge `--headless=old`가 가장 안정적이었음.)

## TODO (다음 세션)

- [x] OG 이미지 (`og-image.png` 1200x630)
- [x] 이용약관 / 개인정보처리방침 작성
- [x] MSI 다운로드 페이지 또는 직링크 연결
- [x] sitemap.xml / robots.txt
- [ ] 실제 앱 스크린샷 11종 삽입 (브리프 14번)
- [ ] 5초 GIF: 계근 → SMS 자동 발송 데모
- [ ] 회사 정보 채우기 — 대표자, 사업장 주소, 정식 이메일
- [ ] Google Analytics 또는 Plausible 연동
- [x] GitHub Releases v1.0.0 MSI 업로드 (sunaprok_1.0.0_x64_ko-KR.msi)
- [ ] Vercel 도메인 `sunaprok.kr` 연결 + sitemap/robots 호스트 일괄 치환

## 브랜딩

Material Green (시드 #2E7D32)

```
900      #1B5E20
Primary  #2E7D32
600      #43A047
400      #66BB6A
50       #E8F5E9
Charcoal #2C2C2A
Red      #E24B4A
Amber    #EF9F27
```
