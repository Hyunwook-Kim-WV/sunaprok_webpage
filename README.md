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
├── styles.css        브랜드 컬러·반응형 레이아웃
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

## TODO (다음 세션)

- [ ] 실제 앱 스크린샷 11종 삽입 (브리프 14번)
- [ ] 5초 GIF: 계근 → SMS 자동 발송 데모
- [ ] OG 이미지 (`og-image.png` 1200x630)
- [ ] 이용약관 / 개인정보처리방침 작성
- [ ] MSI 다운로드 페이지 또는 직링크 연결
- [ ] 회사 정보 채우기 — 대표자, 사업장 주소, 정식 이메일
- [ ] Google Analytics 또는 Plausible 연동
- [ ] sitemap.xml / robots.txt

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
