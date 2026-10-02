# 장면 선택형 스토리 콘텐츠 작성 템플릿

판타지 마을 가게 이야기처럼 장면을 보고 선택하며 짧은 이야기를 이어가는 콘텐츠를 만들 때 사용합니다. 전용 게임 엔진을 새로 만들지 않고 `assets/js/archetype-test.js`의 공통 `storyMode`를 재사용합니다.

## 적용 범위

- 이야기의 선택과 결과를 즐기는 가벼운 콘텐츠에 사용합니다. 성격 진단, 운명 예측, 전문 조언처럼 표현하지 않습니다.
- 화폐·재고·전투 같은 별도 게임 시스템은 콘텐츠 기획에 포함하지 않습니다. 필요해지면 구현 범위를 별도로 검토합니다.
- 현재 공통 렌더러는 시작 화면, 장면 진행 표시, 선택 반응, 이전 장면으로 돌아가기, 결과 표시를 지원합니다. 선택 뒤에는 자동으로 다음 장면으로 이동합니다.
- 별도 분기 문장을 만들 수 있다고 가정하지 않습니다. 이전 선택을 바꿔도 뒤 장면에서 자연스럽게 이어지도록, 모든 후속 상황은 어떤 선택을 했어도 참인 내용으로 씁니다.

## 판타지 가게를 기준으로 본 구조

현재 판타지 가게가 재사용할 기준 사례입니다. 새 콘텐츠는 주제와 데이터를 바꾸고, `archetype-test.js`의 공통 화면 흐름을 사용합니다.

- 판타지 가게는 시작 장면 1개, 선택 장면 8개, 장면당 선택지 4개, 결과 6개입니다. 이는 기준 사례의 수치이며 새 콘텐츠의 고정 규칙은 아닙니다.
- 장면·선택지·결과 수는 이야기 길이와 결과를 구분하는 데 필요한 정도에 맞춰 자율적으로 정합니다. 기획에서 수를 정하지 않았다면 선택 장면 8개, 장면당 선택지 4개, 결과 6개를 기본 제안값으로 사용하고, 주제에 맞게 조정합니다.
- 첫 장면의 선택은 가게 위치를 정하고 결과 이름에 반영합니다. 나머지 선택은 점수로 결과 업종을 정합니다.
- 각 선택 반응은 다음 장면 위쪽에 표시됩니다. 마지막 선택의 반응은 결과 이미지와 소개 다음, 결과 설명 앞에 표시됩니다.
- 현재 엔진은 선택에 따라 문장이나 장면을 분기하지 않습니다. 이전 장면으로 돌아가 답을 바꿀 수 있으므로 뒤의 상황은 어느 경로에서도 사실이어야 합니다.
- 시작·장면·결과 이미지는 `image/tests/[story-id]/`의 정적 파일입니다. 답변은 브라우저 메모리에서만 계산하고 서버에 보내지 않습니다.

화면 흐름은 다음과 같습니다.

```text
시작 소개
  → 진행 표시
  → 직전 선택 반응 (첫 장면에는 없음)
  → 현재 장면 이미지 → 제목 → 상황 → 질문 → 선택지
  → 선택 즉시 다음 장면
  → 마지막 선택은 결과 이미지·이름·한 줄 소개 → 마지막 반응 → 설명·상세 카드
```

이 흐름과 상호작용은 공통 렌더러가 맡습니다. 새 콘텐츠마다 별도 버튼, 팝업, 페이지 전환 코드를 만들지 않습니다.

## 1. 기획 요약

| 항목 | 작성 내용 |
| --- | --- |
| 콘텐츠 ID | 영문 소문자 하이픈 슬러그: `[story-id]` |
| 한 줄 주제 | `[예: 판타지 마을에서 나는 어떤 가게를 열까?]` |
| 이용자가 하는 일 | `[어떤 장면을 보고 무엇을 선택하는가]` |
| 이야기의 끝 | `[선택이 어떤 결과를 정하는가]` |
| 장면 수 / 선택 수 | `[장면 수] / [장면당 선택 수]` |
| 결과 수 | `[결과 수]` |
| 이번 범위에서 제외 | `[별도 경제 시스템, 전투 등]` |

장면 수, 장면당 선택지 수, 결과 수는 콘텐츠에 맞춰 자유롭게 정합니다. 수를 따로 정하지 않은 기획은 선택 장면 8개·장면당 선택지 4개·결과 6개를 기본 제안값으로 삼고, 이야기 흐름과 결과 구분에 맞춰 늘리거나 줄입니다. 기획에서 지정한 수가 있으면 그 값을 우선합니다.

기획을 확정하기 전에 각 결과를 실제 선택으로 구분할 수 있는지 확인합니다. 결과 수를 맞추려고 무작위 결과를 넣거나 점수 분포를 억지로 평탄화하지 않습니다.

## 2. 시작 화면 원고

- 짧은 분류 라벨: `[홈 카드에 쓸 간결한 주제]`
- 제목: `[이용자가 경험할 일을 질문으로 표현]`
- 도입 문장: `[현재 상황과 선택의 맥락을 간단히 소개]`
- 시작 버튼: `[이야기를 시작하는 짧은 행동 문구]`
- 시작 이미지: `[파일 경로]`
- 이미지 대체 텍스트: `[그림에서 중요한 장소와 사물]`
- 검색 설명과 공유 제목·설명: 각각 별도 문구로 작성하고 모든 언어에서 의미가 일치하는지 확인합니다.

도입 문구에는 질문 수나 예상 시간을 반복하지 않습니다. 진행에 필요한 숫자는 공통 카드와 진행 표시가 제공합니다.

## 3. 장면 원고

다음 양식을 장면마다 복사해 채웁니다. 장면 수와 선택 수는 콘텐츠에 맞게 정하되, 해당 콘텐츠 안에서는 일관되게 유지합니다.

### 장면 `[번호]` — `[짧은 장면 제목]`

- 상황: `[선택 전에 누구나 처한 상황. 특정 답변을 이미 골랐다고 가정하지 않기]`
- 질문: `[지금 할 선택을 묻는 한 문장]`
- 장면 이미지: `[정적 에셋 경로]`
- 이미지 대체 텍스트: `[장면의 장소, 인물, 중요한 사물]`

| 선택 | 이용자가 고르는 내용 | 선택 직후 반응 | 결과 연결 |
| --- | --- | --- | --- |
| A | `[선택 문구]` | `[선택한 뒤 장면에서 일어나는 짧은 변화]` | `[주 결과 2점, 보조 결과 1점 등]` |
| B | `[선택 문구]` | `[선택한 뒤 장면에서 일어나는 짧은 변화]` | `[주 결과와 선택적 보조 결과]` |
| C | `[선택 문구]` | `[선택한 뒤 장면에서 일어나는 짧은 변화]` | `[주 결과와 선택적 보조 결과]` |
| D | `[선택 문구]` | `[선택한 뒤 장면에서 일어나는 짧은 변화]` | `[주 결과와 선택적 보조 결과]` |

#### 장면 작성 기준

- 코드의 `questions` 배열 한 항목이 이야기 장면 하나입니다. 별도의 `scenes` 배열을 만들지 않습니다.
- 시작 카드 제목이 페이지 제목과 같으면 `showStartTitle: false`로 중복 표시를 줄입니다. 페이지의 주 제목은 계속 유지합니다.
- 화면 순서는 진행 상황, 직전 선택의 반응, 현재 장면 이미지, 제목과 상황, 질문, 선택지입니다. 장면 제목은 상황·질문과 구분되는 맥락을 줄 때 사용합니다. 반응 문장은 고른 답을 그대로 되풀이하지 않고 그 선택으로 달라진 장면을 보여줍니다.
- 선택을 누르면 다음 장면으로 자동 이동합니다. 마지막 장면의 반응은 결과 카드의 결과 설명 앞에 표시됩니다. 별도 팝업이나 수동 계속 버튼은 추가하지 않습니다.
- 선택지 번호는 공통 화면이 `01`, `02`처럼 표시하므로 선택 문구에 `A.`, `01`, `•`를 중복해서 넣지 않습니다.
- 이전 장면에서 답을 바꿀 수 있으므로, 바꾼 답의 반응과 최종 점수가 함께 갱신되는지 확인합니다.
- 후속 장면에서 실제로 선택하지 않은 행동을 했다고 서술하지 않습니다. 조건에 따라 다른 문장이 필요하면 기존 렌더러가 지원하는지 먼저 확인하고, 지원되지 않으면 모든 경로에 맞는 문장으로 고칩니다.
- 첫 장면 선택에 따라 결과 이름을 바꾸려면 선택지의 `locationId`, `story.locations`, `story.resultNameTemplate` 연결을 사용합니다. 이름 틀에는 `{{result}}`를 사용하고, 위치를 쓰지 않는 콘텐츠는 `{{result}}`만 두고 위치 필드를 생략합니다. 임의의 상태 변수를 렌더러가 지원한다고 가정하지 않습니다.

## 4. 결과 원고

결과마다 다음 항목을 작성합니다.

### 결과 `[result-id]` — `[결과 이름]`

- 결과 이미지: `[파일 경로]`
- 결과 이미지 대체 텍스트: `[이미지와 결과 이름에 맞는 설명 키]`
- 한 줄 소개: `[결과를 구분해 주는 짧은 문구]`
- 결과 설명: `[화면에서 보여줄 문장들을 일반 문장으로 작성]`
- 공유 설명: `[공유 카드용 자연스러운 별도 문단]`
- 상세 카드 1 — 제목: `[예: 주요 상품]` / 내용: `[구체적 정보]`
- 상세 카드 2 — 제목: `[예: 단골손님]` / 내용: `[구체적 정보]`
- 상세 카드 3 — 제목: `[예: 가게 풍경]` / 내용: `[구체적 정보]`

결과 설명은 공통 렌더러가 문장별 글머리표로 보여주므로 원고에 `•`나 `○`를 넣지 않습니다. 상세 카드와 공유 설명에도 글머리표를 넣지 않습니다. 결과 이름·이미지·한 줄 소개·설명은 같은 가게나 역할을 묘사해야 합니다.

## 5. 구현 연결

### 데이터 파일

`assets/js/[story-id]-data.js`에 공통 아키타입 형식으로 등록합니다.

```js
window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};
window.MOA_ARCHETYPE_TESTS["[story-id]"] = {
  storyMode: true,
  title: "story.[story-id].title",
  sharePrompt: "story.[story-id].sharePrompt",
  estimatedMinutes: 3, // must match content-registry metrics
  resultLabel: "story.[story-id].resultLabel",
  url: "https://molgga.com/[story-route].html",
  story: {
    // showStartTitle: false, // optional: omit the start-card heading when it repeats the page heading; defaults to true
    startTitle: "story.[story-id].startTitle", // required unless showStartTitle is false; omit with its locale keys when hidden
    intro: ["story.[story-id].intro.1"],
    startButton: "story.[story-id].startButton",
    startImage: "../image/tests/[story-id]/start.webp",
    startImageAlt: "story.[story-id].startImageAlt",
    previousButton: "story.[story-id].previousButton",
    resultNameTemplate: "story.[story-id].resultNameTemplate", // use {{result}}, optionally with {{location}}
    resultImageAlt: "story.[story-id].resultImageAlt", // fallback when a profile has no imageAlt
    locations: { "[location-id]": "story.[story-id].location.[location-id]" } // omit when location is not used
  },
  questions: [
    {
      title: "story.[story-id].scene.1.title",
      situation: "story.[story-id].scene.1.situation",
      prompt: "story.[story-id].scene.1.prompt",
      image: "../image/tests/[story-id]/scene-01.webp",
      imageAlt: "story.[story-id].scene.1.imageAlt",
      choices: [
        {
          text: "story.[story-id].scene.1.choice.a",
          reaction: "story.[story-id].scene.1.reaction.a",
          locationId: "[location-id]", // optional; include when the opening choice sets a result location
          scores: [{ id: "[result-id]", weight: 2 }]
        }
      ]
    }
  ],
  profiles: {
    "[result-id]": {
      name: "story.[story-id].result.[result-id].name",
      imageFile: "../image/tests/[story-id]/[result-id].webp",
      color: "#658352",
      imageAlt: "story.[story-id].result.[result-id].imageAlt",
      catchphrase: "story.[story-id].result.[result-id].catchphrase",
      description: "story.[story-id].result.[result-id].description",
      shareDescription: "story.[story-id].result.[result-id].shareDescription",
      details: [
        { title: "story.[story-id].detail.offering", text: "story.[story-id].result.[result-id].offering" }
      ]
    }
  }
};
```

위 코드는 필드 모양을 보여주는 참고 틀입니다. `estimatedMinutes`는 콘텐츠 레지스트리의 예상 시간과 통합 점검에서 비교하므로 두 값을 맞춥니다. `resultLabel`은 결과 카드의 제목이므로 새 콘텐츠 전용 번역 키를 둡니다. `eyebrow`는 페이지 HTML에서 표시하는 안내 라벨이며 공통 렌더러가 자동으로 그리지 않습니다.

각 `profile`에는 결과 이름, 이미지 경로, 강조 색, 한 줄 소개, 결과 설명, 공유 설명을 작성합니다. 이야기 결과가 기본 궁합 카드로 대체되지 않도록 `details`를 비우지 말고 최소 한 개 이상의 상세 카드를 둡니다. 각 상세 카드에는 번역 키인 `title`과 `text`가 필요하며, `icon`은 기존 `image/result-icons/` 아이콘을 사용할 때만 지정합니다. 프로필의 `imageAlt`는 선택 항목이고, 생략하면 `story.resultImageAlt`를 사용합니다.

`story.startTitle`은 시작 카드의 제목이고, 페이지 주 제목과 같다면 `story.showStartTitle: false`로 카드 안의 중복 `<h2>`만 감춥니다. 이 경우 `startTitle` 필드와 네 언어의 해당 번역 키도 함께 생략합니다. 페이지의 주 제목과 시작 설명·버튼, 서로 다른 장면 제목은 유지합니다. `questions`는 하나 이상의 장면을 순서대로 담습니다. 각 장면에는 `title`, `situation`, `prompt`, `image`, `imageAlt`, 두 개 이상의 `choices`가 필요합니다. 각 선택에는 `text`, `reaction`, 등록된 결과 ID를 가리키는 양수 점수 `scores`가 필요합니다. `resultNameTemplate`은 네 언어 모두 `{{result}}`를 포함해야 합니다. `{{location}}`을 쓰면 첫 장면의 모든 선택지에 등록된 `locationId`와 위치 번역 키가 있어야 합니다.

여러 결과로 연결할 때는 `scores: [{ id, weight }]`를 사용하고 연결한 모든 ID가 `profiles`에 있는지 확인합니다. 결과는 누적 점수가 가장 높은 유형으로 정해집니다. 동점은 같은 답변에서 항상 같은 결과가 나오도록 처리되며 무작위 결과를 넣지 않습니다.

### 페이지와 공통 콘텐츠 목록

- `ko/[story-route].html`, `en/`, `ja/`, `zh/`에 같은 구조의 페이지를 둡니다. 페이지에는 `data-archetype-test="[story-id]"` 루트와 진행 표시·장면·이전 버튼·결과 마운트 지점을 두고, 번역 리소스 로드 뒤 데이터 파일과 `archetype-test.js`를 기존 순서로 불러옵니다.
- `assets/js/content-registry.js`에 실제 `createdAt`, 짧은 카드 라벨, 제목·설명 번역 키, 썸네일, 페이지, 소스 ID, 검증한 문항·선택지·결과 수와 예상 시간을 등록합니다.
- 콘텐츠 시작 집계 허용 목록인 `functions/_shared/content-start-config.js`에도 콘텐츠 ID를 추가합니다.
- `scripts/audit-integrations.mjs`의 `archetypeFiles` 목록에 새 데이터 파일을 등록합니다. 이 감사는 등록된 데이터, 네 언어의 페이지·번역, 이미지와 장면 구조를 함께 확인합니다.
- 페이지의 title·description·canonical·hreflang·OG URL, `sitemap.xml`, 공개 경로 연결을 기존 페이지와 맞춥니다. 홈 카드는 레지스트리에서 자동 생성되므로 언어별 HTML에 중복 카드를 만들지 않습니다.

## 6. 이미지 준비

- 시작 이미지 1장, 장면별 이미지 1장, 결과별 이미지 1장을 준비합니다. 모든 장면 이미지를 한꺼번에 처음 내려받지 않고 기존 로더의 다음 장면 미리 불러오기를 사용합니다.
- 같은 이야기 안에서는 계절·건축·색감·반복 인물의 외형을 일관되게 유지합니다. 선택 전 이미지는 중립적으로 그리고 아직 일어나지 않은 결과를 확정해 표현하지 않습니다.
- 이미지에 글자·로고·버튼을 넣지 않습니다. 핵심 인물과 사물은 모바일 크롭 가장자리를 피합니다.
- `image/tests/[story-id]/`에 정적 이미지로 저장하고, 이미지 폴더의 README와 `image/README.md`에 파일명·장면·결과 대응을 기록합니다. 런타임에 이미지를 생성하지 않습니다.
- 각 이미지에 현지화된 짧은 대체 텍스트 키를 연결합니다. 이미지 로딩에 실패해도 상황 설명과 선택지는 계속 사용할 수 있어야 합니다.

## 7. 네 언어 문구 작성

1. 먼저 `ko.json`에 새 원고를 의미별 키로 나눠 작성합니다. 새 문구에 문장 전체를 키로 쓰지 않습니다.
2. 같은 키를 `en.json`, `ja.json`, `zh.json`에 추가합니다. 직역보다 자연스러운 표현을 사용하되, 행동·인물·시점·조건·결과는 원문과 같게 유지합니다.
3. 시작 화면, 모든 장면 제목·상황·질문·선택·반응, 대체 텍스트, 결과 설명, 상세 카드, 공유 문구와 SEO 메타데이터를 빠짐없이 번역합니다.
4. 비한국어 페이지의 HTML에 번역되지 않은 한국어가 남지 않았는지 확인합니다. 값이 비었거나 키 이름 자체가 화면에 노출되는 경우도 검사합니다.
5. 가장 긴 번역을 기준으로 제목, 선택지, 버튼과 결과 카드가 좁은 화면에서 잘리거나 넘치지 않는지 확인합니다.

## 8. 완료 점검

- [ ] 데이터 장면 수·선택지 수·결과 수·예상 시간이 원고와 콘텐츠 레지스트리 지표에 일치한다.
- [ ] 모든 점수 ID가 등록된 결과를 가리키고, 여섯/전체 결과가 의미 있는 응답으로 나올 수 있다.
- [ ] 무작위 결과 없이 같은 응답은 같은 결과를 낸다. 점수 연결이나 가중치를 바꾼 경우에만 `node scripts/audit-result-distributions.mjs`로 도달 가능성과 분포를 살펴본다.
- [ ] 네 언어에서 키 수와 페이지 구조가 맞고, 원문과 번역의 행동·시점·인물·조건이 일치한다.
- [ ] 이전 장면으로 돌아가 선택을 바꾸면 반응과 결과가 갱신되고, 뒤 장면이 그 선택과 모순되지 않는다.
- [ ] 시작, 초반·중간·마지막 장면, 마지막 선택의 반응, 결과, 다시 하기, 공유가 동작한다.
- [ ] 시작/장면/결과 이미지가 맞는 파일로 연결되고 대체 텍스트와 로딩 실패 동작이 있다.
- [ ] 좁은 휴대전화, 일반 휴대전화, 태블릿, 데스크톱에서 선택지와 버튼이 잘 보이고 눌린다.
- [ ] 변경한 공통 스크립트의 캐시 버전을 모든 호출 페이지에서 갱신했다.
- [ ] `node scripts/audit-integrations.mjs`, `node scripts/audit-result-distributions.mjs`, `git diff --check`가 통과한다.
