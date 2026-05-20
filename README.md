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
├── favicon.svg       로고 (인라인 SVG와 동일)
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

Hero CTA는 다음 영구 URL을 가리킵니다:

```
https://github.com/Hyunwook-Kim-WV/sunaprok_webpage/releases/latest/download/sunaprok-1.0.0-x64-ko-KR.msi
```

`sunaprok` 본 저장소에서 빌드한 MSI를 영문 슬러그로 재명명한 뒤 본 저장소 Releases에 업로드합니다:

```bash
# 1) 본체 빌드 후 한글 파일명 → 영문 슬러그로 복사
cp "sunaprok/src-tauri/target/release/bundle/msi/수납록_1.0.0_x64_ko-KR.msi" \
   "/tmp/sunaprok-1.0.0-x64-ko-KR.msi"

# 2) 본 저장소(webpage)에서 릴리스 생성 + 자산 첨부
cd sunaprok_webpage
gh release create v1.0.0 /tmp/sunaprok-1.0.0-x64-ko-KR.msi \
  --title "수납록 v1.0.0" \
  --notes "폐기물 처리장 통합 관리 v1.0.0 — 계근·청구·정산·입금·장부·라이선스·백업 전 기능."
```

Releases 자산이 비어 있는 동안 다운로드 링크는 404를 반환하므로, 도메인 공개 전에 위 절차로 v1.0.0 자산 업로드를 먼저 끝내야 합니다.

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
- [ ] GitHub Releases에 실제 v1.0.0 MSI 업로드 (위 `gh release create` 절차)
- [ ] Vercel 도메인 `sunaprok.kr` 연결 + sitemap/robots 호스트 일괄 치환

## 브랜딩

```
Primary  #0F6E56
600      #1D9E75
400      #5DCAA5
50       #E1F5EE
Charcoal #2C2C2A
Red      #E24B4A
Amber    #EF9F27
```
