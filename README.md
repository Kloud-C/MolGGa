# molgga (몰까)

무료 MBTI 테스트, 주말 이상형 월드컵, 동물상·테토/에겐·애착 유형·전생 콘텐츠를 제공하는 정적 웹사이트입니다.

## 언어별 페이지

- `/ko/`: 한국어
- `/en/`: 영어
- `/ja/`: 일본어
- `/zh/`: 중국어 간체

각 언어 폴더에는 홈, 테스트, 소개, 문의, 정책 페이지가 분리되어 있습니다. 상단 언어 선택 메뉴는 현재 페이지에서 언어를 즉시 바꾸고 주소의 언어 경로도 함께 갱신합니다.

## 프로젝트 구조

- `ko/`, `en/`, `ja/`, `zh/`: 언어별 HTML 페이지
- `assets/css/`: 공통 스타일시트
- `assets/js/`: 공통 동작, i18next 번역 연결, 퀴즈 데이터
- `ko.json`, `en.json`, `ja.json`, `zh.json`: 언어별 i18next 번역 리소스
- `image/`: 로고, OG 이미지, 테스트 결과 이미지
- `functions/`, `migrations/`: Cloudflare Pages 월드컵 랭킹 API와 D1 스키마
- `_redirects`: 루트 및 기존 주소를 한국어 경로로 연결
- `robots.txt`, `sitemap.xml`, `ads.txt`: 검색·광고 크롤러 파일
- `docs/site-quality-framework.md`, `docs/ui-guidelines.md`: 변경 우선순위, 페이지 구성 및 검토 기준

## 로컬에서 보기

저장소 루트에서 `python -m http.server 8000`을 실행한 뒤 브라우저에서 `http://localhost:8000/ko/`를 방문하세요. `file://`로 직접 열면 HTTP Backend가 번역 JSON을 불러오지 못합니다.

## 다국어 번역

브라우저에서는 i18next와 i18next HTTP Backend를 CDN으로 불러오고 저장소 루트의 JSON 파일에서 번역을 가져옵니다. 현재 완성된 언어는 한국어(`ko`), 영어(`en`), 일본어(`ja`), 중국어 간체(`zh`)입니다. 페이지 문구는 `data-i18n`, 문서 제목과 검색 설명은 `data-i18n` 및 `data-i18n-attr`로 연결합니다. 새 문구에는 `nav.contact`처럼 의미가 드러나는 키를 사용하고, 기존 문구의 한국어 문장 키는 이전 콘텐츠 호환을 위해 남겨 두었습니다.

새 언어를 추가할 때는 해당 언어의 JSON 번역을 먼저 완성한 다음 언어 선택기, 지원 언어 목록, 페이지 경로, 정적 SEO 메타데이터, canonical·hreflang·사이트맵을 함께 갱신하고 통합 점검을 실행합니다. 검토되지 않은 언어는 선택기에 추가하지 않습니다.

## 배포

Cloudflare Pages가 저장소 루트를 정적 사이트로 제공합니다. `main` 브랜치에 푸시하면 연결된 Pages 프로젝트가 자동 배포됩니다.

기존 루트 주소(`/worldcup.html` 등)는 `_redirects`를 통해 `/ko/worldcup` 같은 확장자 없는 주소로 이동합니다. 페이지의 canonical, 언어별 대체 주소, 사이트맵도 같은 공개 URL을 사용합니다.

## 월드컵 인기 랭킹 설정

월드컵은 공통 엔진(`assets/js/worldcup.js`)과 데이터 목록(`assets/js/worldcup-data.js`)을 사용합니다. 주말 취향 월드컵은 32개 활동 중 16개 또는 32개, 야식 월드컵은 50개 메뉴 중 16개 또는 32개를 무작위로 뽑습니다. 새 월드컵을 추가하거나 항목을 바꿀 때는 데이터 목록과 익명 랭킹 API 허용 목록(`functions/_shared/worldcup-config.js`)의 게임 ID, 대진 규모, 항목 ID를 함께 맞춰야 합니다. 허용 목록과 화면 데이터가 다르면 랭킹 저장 API가 요청을 거절합니다.

전체 방문자의 우승 메뉴 랭킹은 Cloudflare D1 데이터베이스 `molgga-worldcup-rankings`를 사용합니다. Pages 프로젝트 `moa`의 **Production → Settings → Bindings**에 `MOLGGA_DB`라는 이름으로 연결했고, `migrations/0001_worldcup_votes.sql` 스키마를 적용했습니다. 이 바인딩은 Pages Functions가 데이터베이스에 접근하도록 하며 다음 배포부터 적용됩니다.

```powershell
npx wrangler d1 execute molgga-worldcup-rankings --remote --file=migrations/0001_worldcup_votes.sql
```

데이터베이스가 연결되기 전에는 랭킹이 현재 탭에서 완주한 결과만 보여줍니다. 연결 후에는 완주 시 최종 우승 항목·대진 규모·일회성 임의 ID만 저장하며 선택 과정은 전송하지 않습니다. 저장 API는 허용된 게임·항목만 받고, 동일한 임의 ID의 중복 저장을 막으며, 요청의 `Origin`이 사이트와 일치해야 합니다. `Origin` 검사는 브라우저 교차 사이트 요청을 줄이는 장치이며 인증이나 봇 방지 기능은 아닙니다. 대량 투표 방지는 Cloudflare 대시보드의 WAF에서 `/api/worldcup-vote`의 POST 요청을 대상으로 Rate Limiting 규칙을 설정해야 합니다. 규칙을 적용하기 전 계정 요금제에서 해당 기능을 지원하는지 확인하고, 공유 네트워크 이용자가 불편을 겪지 않을 임계값을 선택하세요. [Cloudflare WAF Rate Limiting 안내](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/)를 참고할 수 있습니다. 이 프로젝트의 Cloudflare 계정 설정은 저장소에서 확인하거나 변경할 수 없으므로 배포 후 규칙을 직접 켜고 확인해야 합니다.

연동 상태를 로컬에서 점검하려면 저장소 루트에서 `node scripts/audit-integrations.mjs`와 `node scripts/audit-result-distributions.mjs`를 실행합니다. 첫 번째 점검은 공통 레지스트리와 실제 정의 데이터·네 언어 번역·이미지·페이지 경로를 대조하고 SEO 메타데이터, API, 랭킹 문서도 확인합니다. 두 번째는 퀴즈 응답 조합을 전수 조사하거나 고정 표본으로 실행해 결과별 출현 비율과 도달 가능성을 살핍니다.

공통 콘텐츠 메타데이터는 `assets/js/content-registry.js`에서 관리합니다. 홈의 검색·분류·정렬·보기 방식·시작 전 미리보기와 결과 후 추천은 이 레지스트리를 함께 읽습니다. 새 콘텐츠는 별도 홈 카드 HTML을 만들지 않고 레지스트리에 제목·설명 키, 이미지, 분류·태그, 공개 경로, 실제 등록일과 수치를 등록합니다. 네 언어 번역과 콘텐츠 데이터·페이지를 추가하고, 문항·후보 수와 예상 시간은 감사 스크립트에서 원본과 대조합니다. 공통 스타일이나 스크립트를 바꾸면 HTML의 캐시 토큰도 갱신합니다.

홈 콘텐츠 탐색은 검색·분류·기본/최신순 정렬·카드 보기 전환·즐겨찾기·최근 본 항목을 지원합니다. 최신순은 레지스트리에 기록한 실제 등록일을 사용합니다. `assets/js/content-activity.js`는 콘텐츠 ID와 열람 시각만 브라우저 `localStorage`에 보관하고, 즐겨찾기도 콘텐츠 ID만 저장합니다. 최근 기록은 홈에서 지울 수 있고 즐겨찾기는 카드의 별표로 해제할 수 있습니다. 답변·결과·개인정보는 저장하거나 서버로 보내지 않습니다. 신뢰할 수 있는 전체 콘텐츠 인기도 통계가 없어 인기순은 제공하지 않습니다.

사이트 변경 전후의 우선순위와 검토 순서는 [사이트 품질 프레임](docs/site-quality-framework.md)을 따릅니다. 페이지 레이아웃·문항·결과·모바일 UI는 [UI 가이드](docs/ui-guidelines.md)를 함께 확인합니다.

## 카카오톡 공유 설정

테스트 결과의 `카카오톡 공유` 버튼을 활성화하려면 Kakao Developers 앱의 JavaScript 키와 도메인을 설정합니다.

1. Kakao Developers에서 앱을 만든 뒤 **앱 설정 → 앱 키 → JavaScript 키**를 복사합니다.
2. **플랫폼 키 → JavaScript 키 → JavaScript SDK 도메인**에 `https://molgga.com`을 등록합니다.
3. **제품 링크 → 웹 도메인**에도 `https://molgga.com`을 등록합니다.
4. `assets/js/share-config.js`의 빈 문자열에 JavaScript 키를 입력합니다.

JavaScript 키는 브라우저에서 쓰는 공개 키입니다. 코드에서 숨기는 용도가 아니므로 Kakao Developers에서 허용 도메인을 제한하세요. Kakao Share는 별도 메시지 템플릿 없이 기본 피드 템플릿으로 결과 제목·설명·OG 이미지와 테스트 링크를 공유합니다.
