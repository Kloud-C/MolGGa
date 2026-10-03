# 결과 이미지

퀴즈 결과 이미지는 결과 이름과 파일명을 연결해 사용합니다. 이미지를 교체할 때는 브라우저·CDN 캐시를 피하도록 버전이 포함된 새 파일명을 만들고, 콘텐츠 데이터·탐색 카드·안내 문서의 경로를 함께 갱신합니다.

## 동물상 이미지

`animal image/동물상 테스트：강아지.jpg`처럼 결과별 JPG가 들어 있습니다.

## MBTI 이미지

`MBTI image/MBTI：ISFJ.jpg`처럼 유형 이름과 확장자를 유지해 16개 이미지를 저장합니다. PNG 업로드는 PNG 확장자를 그대로 사용합니다.

파일명에는 Windows에서 사용할 수 없는 ASCII 콜론(`:`) 대신 전각 콜론(`：`)을 썼습니다. 화면에는 유형에 맞는 로컬 이미지가 표시됩니다.

동물상과 성격 유형 이미지는 결과 유형에 맞춰 준비한 로컬 에셋입니다. 교체할 때는 결과 유형과 파일 이름이 일치하는지 확인해 주세요.

## 주말 취향 월드컵 이미지

`worldcup/weekend-activities` 폴더에는 주말 취향 월드컵의 50개 선택지 이미지가 있습니다. 50개 후보 중 16개 또는 32개를 무작위로 뽑아 대진을 구성하며, 한 게임 안에서 같은 항목은 중복되지 않습니다. `assets/js/worldcup-data.js`에서 항목과 파일 경로를 관리하며, 이미지를 교체할 때는 선택지 ID와 같은 파일명을 유지해 주세요. 이미지는 활동에 맞춰 직접 생성한 실사풍 이미지입니다.

- `movie-night.jpg` — 집에서 영화를 보며 쉬는 장면
- `new-restaurant.jpg` — 동네 식당에서 식사하는 장면
- `forest-walk.jpg` — 숲길을 걷는 장면
- `favorite-hobby.jpg` — 집에서 스케치하는 장면
- `cafe-chat.jpg` — 카페에서 친구와 대화하는 장면
- `short-drive.jpg` — 근교 전망대에 차를 세우고 풍경을 보는 장면
- `cook-at-home.jpg` — 집 주방에서 채소를 손질하는 장면
- `light-exercise.jpg` — 집에서 가볍게 스트레칭하는 장면
- `bookstore.jpg` — 동네 서점에서 책을 고르는 장면
- `flea-market.jpg` — 야외 주말 플리마켓을 둘러보는 장면
- `balcony-gardening.jpg` — 베란다 식물을 돌보는 장면
- `home-baking.jpg` — 집에서 쿠키를 굽는 장면
- `riverside-sketch.jpg` — 강가에 앉아 그림을 그리는 장면
- `art-gallery.jpg` — 작은 갤러리 전시를 보는 장면
- `pottery-class.jpg` — 공방에서 도자기를 만드는 장면
- `board-games.jpg` — 친구들과 보드게임을 하는 장면
- `riverside-cycling.jpg` — 강변 자전거길을 달리는 장면
- `botanical-garden.jpg` — 식물원을 천천히 둘러보는 장면
- `beach-walk.jpg` — 바닷가를 걷는 장면
- `park-picnic.jpg` — 공원 나무 그늘에서 피크닉하는 장면
- `traditional-market.jpg` — 전통시장을 구경하는 장면
- `baseball-game.jpg` — 관중석에서 야구를 보는 장면
- `museum-visit.jpg` — 박물관 전시를 관람하는 장면
- `record-store.jpg` — 레코드 가게에서 앨범을 고르는 장면
- `photo-walk.jpg` — 동네 골목을 산책하며 사진 찍는 장면
- `weekend-brunch.jpg` — 햇살 좋은 테라스에서 브런치하는 장면
- `library-reading.jpg` — 도서관에서 책을 읽는 장면
- `dance-class.jpg` — 초보 댄스 수업에 참여하는 장면
- `craft-workshop.jpg` — 공방에서 작은 소품을 만드는 장면
- `park-jog.jpg` — 공원에서 가볍게 달리는 장면
- `spa-relax.jpg` — 따뜻하고 조용한 휴식 공간에서 쉬는 장면
- `nearby-train-trip.jpg` — 근교행 기차에 앉아 창밖을 보는 장면
- `camping-trip.jpg` — 친구와 숲속 캠핑장에서 쉬는 장면
- `live-concert.jpg` — 라이브 공연을 즐기는 장면
- `karaoke-night.jpg` — 친구와 노래방에서 노래하는 장면
- `bowling-night.jpg` — 볼링장에서 친구들과 게임하는 장면
- `theme-park.jpg` — 놀이공원을 둘러보는 장면
- `aquarium-visit.jpg` — 아쿠아리움 수조를 바라보는 장면
- `escape-room.jpg` — 친구들과 방탈출 단서를 푸는 장면
- `rooftop-sunset.jpg` — 루프탑에서 도시의 노을을 보는 장면
- `food-festival.jpg` — 야외 음식 축제를 둘러보는 장면
- `flower-arranging.jpg` — 꽃꽂이 수업에서 꽃을 다듬는 장면
- `ice-skating.jpg` — 실내 링크에서 스케이트를 타는 장면
- `surfing-lesson.jpg` — 해변에서 서핑 강습을 받는 장면
- `movie-theater.jpg` — 극장에서 친구와 영화를 보는 장면
- `volunteer-day.jpg` — 동네 정원에서 봉사활동을 하는 장면
- `ferry-ride.jpg` — 유람선에서 바닷바람을 쐬는 장면
- `planetarium-show.jpg` — 천문관에서 별 영상을 보는 장면
- `staycation.jpg` — 호텔 방에서 여유롭게 쉬는 장면
- `climbing-gym.jpg` — 실내 암벽장에서 클라이밍하는 장면

## 한 달 살기 월드컵 이미지

`worldcup/month-stay/`에는 한 달 살기 월드컵의 후보 50곳에 각각 대응하는 JPG가 있습니다. 파일명은 `assets/js/worldcup-data.js`의 항목 ID와 일치해야 합니다. 누락된 후보를 위해 추가한 38개 이미지는 위치별 생활 공간과 주변 풍경을 담은 실사풍 장면으로 생성한 뒤 800×600 JPG로 저장했습니다. 게임을 위한 상상 속 장면이며 실제 숙소 사진이나 예약 추천은 아닙니다.

## 테토/에겐 결과 이미지

`tests/teto-egen` 폴더의 결과 ID별 JPG를 사용합니다. `assets/js/teto-egen-data.js`의 각 프로필 `image` 경로와 파일 이름을 맞춰 주세요. 테토 네 유형은 결단력·보호 본능·쿨한 독립성·직설적인 표현이 인물의 자세와 행동에서 강하게 보이도록 합니다. 에겐 네 유형은 다정함·공감·자유로움·밝은 분위기가 표정과 주변 장면에서 느껴지도록 합니다. 모두 실사 사진처럼 표현하고, 여덟 결과는 서로 다른 인물과 장소를 사용합니다.

- `teto-leader-v20260927-6.jpg` — 팀을 이끄는 터프하고 단호한 리더
- `teto-guard-v20260927-6.jpg` — 비 오는 날 친구를 챙기는 든든한 보호자
- `teto-cool-v20260927-6.jpg` — 자기 페이스를 지키는 차분하고 도회적인 사람
- `teto-bold-v20260927-6.jpg` — 마음을 숨기지 않고 직접 표현하는 사람
- `egen-care-v20260927-6.jpg` — 지친 친구를 담요와 차로 살피는 다정한 사람
- `egen-empathy-v20260927-6.jpg` — 친구의 이야기를 깊이 듣고 마음을 헤아리는 사람
- `egen-free-v20260927-6.jpg` — 바닷바람을 즐기며 혼자 걷는 자유로운 사람
- `egen-mood-v20260927-6.jpg` — 모임을 밝게 만드는 활기찬 분위기 메이커

## 애착 유형 결과 이미지

`tests/attachment-style` 폴더에는 `secure.jpg`, `avoidant.jpg`, `anxious.jpg`, `fearful.jpg`가 있습니다. 각 파일은 `assets/js/attachment-data.js`의 결과 프로필에 연결되어 있습니다. 인물의 성격이나 관계 유형을 단정하는 연출은 피하고, 일상적인 장면을 담았습니다.

## 메인 카드 이미지

`home-categories`에는 주말 월드컵, 야식 월드컵, 동물상, MBTI, 테토/에겐, 애착 유형, 전생, 소비 습관, 판타지 직업 테스트의 카드 이미지가 있습니다. 친구 여행 역할과 연애 스타일 카드는 각 테스트의 결과 이미지를 사용하고, 판타지 마을 가게 이야기와 밤기차 이야기 카드는 각각 `tests/fantasy-shop/start.webp`, `tests/night-train/start.webp`을 사용합니다. 모든 언어 홈 페이지가 같은 에셋을 공유합니다.

`fantasy-class.jpg`는 판타지 직업 테스트의 홈 카드용 모험가 장비 사진입니다.

## 결과 설명 아이콘

`result-icons`는 MBTI, 동물상, 애착 유형, 소비 습관 결과의 상세 설명 제목에 쓰는 공통 아이콘입니다. 장식용 이미지에는 대체 텍스트를 비워 화면 읽기에서 중복되지 않게 합니다.

## 동물상 생성 이미지

`tests/animal-test`의 `dog.jpg`, `cat.jpg`, `fox.jpg`, `otter.jpg`, `deer.jpg`, `bear.jpg`가 동물상 테스트 결과 사진입니다. 각 결과 프로필은 해당 동물 사진을 직접 연결합니다.

## 전생 결과 이미지

전생 결과 이미지는 `past-life/generated/<캐릭터 ID>.jpg`로 보관합니다. 인물 역할(상인, 안내자, 약초꾼, 음식 감별사, 악사 등)은 사람 인물이 장면 안에 분명히 보이도록 합니다. 결과가 동물이나 판타지 생물인 경우 해당 캐릭터를 주 피사체로 표현합니다. 실사풍에 절제된 판타지 분위기를 적용하고 이미지의 인물·배경과 제목·설명이 서로 맞는지 함께 확인합니다.

## 친구 여행 역할 테스트 이미지

`tests/travel-role-test`에는 8개 결과를 위한 생성 이미지가 있습니다. `assets/js/travel-role-data.js`에서 결과 프로필 ID와 파일 경로를 관리합니다. 각 사진은 여행 총무, 길잡이, 맛집 탐험, 사진 담당, 분위기 메이커, 정산 담당, 케어 담당, 즉흥 코스 개척자 역할을 장면과 행동으로 표현합니다. 상세한 파일명 매핑과 교체 기준은 [`tests/travel-role-test/README.md`](tests/travel-role-test/README.md)를 확인하세요.

## 취미 찾기 결과 만화

`tests/hobby-discovery/`에는 결과 문구의 취미와 첫 시도 예시에 맞춘 900×900 JPG 2×2 네 컷 카툰이 있습니다. 가볍고 밝은 색면과 둥근 윤곽선을 사용하고, 인물·배경·색 팔레트는 결과마다 구분합니다. 휴식 취향 만화의 인물과 초록·크림 중심 구성을 되풀이하지 않습니다.

| 파일 | 장면 |
| --- | --- |
| `maker-v20261003-1.jpg` | 짧은 보라색 머리 여성이 골판지를 접어 작은 책상 정리함을 만들고 펜을 넣습니다. |
| `grower-v20261003-1.jpg` | 여성이 작은 컵에 씨앗을 심고 햇빛 아래 싹이 자라는 모습을 지켜봅니다. |
| `flavor-v20261003-1.jpg` | 남성이 베리를 요구르트에 섞어 맛보며 간단한 간식 조합을 시험합니다. |
| `observer-v20261003-1.jpg` | 남성이 움직이는 구름을 알아채고 모양을 스케치북에 기록합니다. |
| `puzzler-v20261003-1.jpg` | 여성이 도형 배열 퍼즐을 만들고 친구가 규칙을 찾아 완성합니다. |

게시 전 다섯 그림을 각각 확대해 네 컷 순서, 결과 문구와 첫 시도 내용의 일치, 인물의 연속성을 확인합니다. 팔과 손의 개수, 손목과 팔의 연결, 소품을 쥐는 방향, 컷 경계 잘림도 직접 검사합니다. 손가락을 복잡하게 그리거나 여러 인물이 손을 맞대는 장면은 피하고, 작은 썸네일에서도 흐름이 읽히도록 소품을 줄입니다. 대사·말풍선·캡션·로고·읽을 수 있는 글자는 넣지 않습니다.

## 판타지 직업 테스트 이미지

`tests/fantasy-class`에는 각 직업 결과에 맞춘 실사풍 이미지가 있습니다. `assets/js/fantasy-class-data.js`에서 프로필 ID와 파일 경로를 연결합니다.

- `warrior.jpg` — 검을 들고 마을 입구에서 훈련을 마친 전사
- `knight.jpg` — 숲속 야영지를 방패로 지키는 기사
- `mage.jpg` — 마법서와 고대 유적을 살피는 마법사
- `priest.jpg` — 야영지에서 다친 여행자를 치료하는 사제
- `ranger.jpg` — 숲길에서 흔적을 살피는 레인저
- `rogue.jpg` — 오래된 상자의 자물쇠를 조사하는 도적
- `merchant.jpg` — 마을 시장에서 장부와 물자를 살피는 상인
- `bard.jpg` — 여관에서 류트를 연주하며 이야기를 들려주는 음유시인

## 판타지 마을 가게 이야기 이미지

`tests/fantasy-shop`에는 시작 장면 1장, 선택 장면 8장, 가게 결과 6장의 WebP 일러스트가 있습니다. `assets/js/fantasy-shop-data.js`가 파일 경로와 대체 텍스트 키를 관리합니다. 모든 그림은 따뜻한 색감의 2D 판타지 마을 배경으로 제작했으며 1600×900 크기로 최적화했습니다. 자세한 파일 목록과 장면 설명은 [`tests/fantasy-shop/README.md`](tests/fantasy-shop/README.md)를 확인해 주세요.

## 심야 기차 이야기 이미지

`tests/night-train`에는 시작 장면 1장, 선택 장면 8장, 도착역 결과 6장의 1600×900 WebP 일러스트가 있습니다. 스토리 장면은 차분한 흑백 연필·잉크 스케치로, 여섯 역의 결과 장면은 역마다 분위기가 다른 절제된 컬러 동화풍으로 제작했습니다. 경로와 대체 텍스트 키는 `assets/js/night-train-data.js`에서 관리합니다. 자세한 파일 목록은 [`tests/night-train/README.md`](tests/night-train/README.md)를 확인해 주세요.

## 연애 스타일 테스트 이미지

`tests/romance-style`에는 12개 연애 스타일 결과를 위한 생성 실사풍 이미지가 있습니다. 모바일 전송량을 줄이도록 900×1125 JPEG로 최적화했습니다. `assets/js/romance-style-data.js`의 결과 프로필 ID와 파일 경로를 맞춰 관리합니다. 각 결과 이미지와 장면 설명의 대응은 [`tests/romance-style/README.md`](tests/romance-style/README.md)에서 확인할 수 있습니다.

## 휴식 취향 테스트 이미지

`tests/rest-style`에는 다섯 휴식 유형의 결과를 설명하는 2×2 네 컷 카툰 PNG가 있습니다. 조용히 쉬기, 가볍게 움직이기, 가까운 사람과 이야기하기, 취미에 몰입하기, 새로운 장소를 둘러보기의 장면 변화를 간결하게 담습니다. 각 파일은 `assets/js/rest-style-data.js`의 프로필 이미지 경로와 연결되며, 결과 카드와 콘텐츠 탐색 카드에서 함께 사용합니다. 글자나 말풍선 없이 표정과 행동으로 뜻을 전달하는 단순한 초록·크림색 카툰 스타일입니다.

## 한 달 살기 월드컵 이미지

`worldcup/month-stay`에는 후보별 생활 공간과 주변 풍경을 함께 보여주는 생성 이미지 50장이 있습니다. 파일은 800×600 JPEG이며 `assets/js/worldcup-data.js`의 후보 ID와 같은 이름을 사용합니다. 특정 예약 숙소를 나타내지 않는 콘셉트 이미지입니다. 파일명과 후보 이름의 대응은 [`worldcup/month-stay/README.md`](worldcup/month-stay/README.md)를 확인하세요.
