(() => {
  const locale = (ko, en, ja, zh) => ({ ko, en, ja, zh });
  const image = (folder, id, extension = "webp") => `../image/worldcup/${folder}/${id}.${extension}`;
  const weekendActivities = {
    "movie-night": locale("좋아하는 영화 한 편과 간식을 곁들여 느긋하게 쉬어요.", "Unwind with a favorite movie and a snack.", "好きな映画とおやつで、ゆっくり過ごします。", "看一部喜欢的电影，配上零食慢慢放松。"),
    "new-restaurant": locale("새로운 메뉴를 맛보며 동네의 작은 발견을 즐겨요.", "Try a new dish and discover a neighborhood spot.", "新しいメニューを味わいながら、街の小さなお店を見つけます。", "尝尝新菜，也发现附近一家有趣的小店。"),
    "forest-walk": locale("천천히 걸으며 바깥 공기와 계절 풍경을 즐겨요.", "Take an easy walk and enjoy the fresh air and scenery.", "のんびり歩きながら、外の空気と季節の景色を楽しみます。", "慢慢散步，感受新鲜空气和季节风景。"),
    "favorite-hobby": locale("좋아하는 취미에 몰입하며 나만의 시간을 가져요.", "Make some time to get absorbed in a favorite hobby.", "好きな趣味にじっくり取り組む、自分だけの時間です。", "沉浸在喜欢的爱好里，享受自己的时间。"),
    "cafe-chat": locale("커피 한 잔을 두고 친구와 밀린 이야기를 나눠요.", "Catch up with a friend over a cup of coffee.", "コーヒーを飲みながら、友達と積もる話をします。", "和朋友喝杯咖啡，聊聊最近的近况。"),
    "short-drive": locale("가까운 풍경을 보러 잠깐 길을 나서 기분을 바꿔요.", "Take a short drive to a nearby view and reset your mood.", "近くの景色を見に少し出かけて、気分を切り替えます。", "开车去附近看看风景，换个心情。"),
    "cook-at-home": locale("먹고 싶은 메뉴를 직접 만들며 여유로운 시간을 보내요.", "Enjoy a slow afternoon making something you feel like eating.", "食べたいものを自分で作りながら、ゆったり過ごします。", "亲手做想吃的菜，享受悠闲时光。"),
    "light-exercise": locale("가볍게 몸을 움직여 기분 좋게 활력을 채워요.", "Stretch or move a little to feel refreshed.", "軽く体を動かして、気持ちよくリフレッシュします。", "轻轻活动一下身体，让自己恢复活力。")
  };
  const weekendNames = [
    ["movie-night", "집에서 좋아하는 영화 보기", "Watch a favorite movie at home", "家で好きな映画を見る", "在家看喜欢的电影"],
    ["new-restaurant", "동네의 새로운 맛집 가기", "Try a new neighborhood restaurant", "近所の新しいお店に行く", "去附近的新餐馆"],
    ["forest-walk", "공원이나 숲길 산책하기", "Walk in a park or forest", "公園や森の道を散歩する", "去公园或林间散步"],
    ["favorite-hobby", "취미 하나에 깊이 몰입하기", "Spend time on a favorite hobby", "好きな趣味にじっくり取り組む", "专注做一项喜欢的爱好"],
    ["cafe-chat", "친구와 카페에서 이야기하기", "Chat with a friend at a cafe", "友達とカフェでおしゃべりする", "和朋友在咖啡馆聊天"],
    ["short-drive", "가까운 곳으로 드라이브하기", "Take a short drive nearby", "近場へドライブする", "去附近兜风"],
    ["cook-at-home", "집에서 천천히 요리하기", "Take your time cooking at home", "家でゆっくり料理する", "在家慢慢做饭"],
    ["light-exercise", "가벼운 운동이나 스트레칭하기", "Do light exercise or stretch", "軽い運動やストレッチをする", "做些轻运动或拉伸"]
  ].map(([id, ko, en, ja, zh]) => ({
    id,
    name: locale(ko, en, ja, zh),
    detail: weekendActivities[id],
    image: image("weekend-activities", id, "jpg")
  }));

  const additionalWeekendNames = [
    ["bookstore", "동네 서점 둘러보기", "Browse a neighborhood bookstore", "街の本屋をのぞく", "逛逛附近的书店", "마음에 드는 책을 천천히 살펴보며 취향을 발견해요.", "Take your time browsing books and discover something new.", "気になる本をゆっくり眺めながら、新しい好みを見つけます。", "慢慢翻看喜欢的书，也许会发现新的兴趣。"],
    ["flea-market", "주말 플리마켓 구경하기", "Browse a weekend flea market", "週末のフリーマーケットを巡る", "逛周末跳蚤市场", "구경하다 보면 예상치 못한 물건을 만날지도 몰라요.", "See what unexpected finds turn up as you wander.", "歩いていると、思いがけない掘り出し物に出会えるかもしれません。", "边逛边看看，说不定会遇到意外的小惊喜。"],
    ["balcony-gardening", "베란다 식물 돌보기", "Care for balcony plants", "ベランダの植物を手入れする", "照料阳台上的植物", "식물에 물을 주고 잎을 정리하며 조용히 쉬어요.", "Water your plants and enjoy a quiet moment at home.", "植物に水をあげて葉を整えながら、静かな時間を過ごします。", "给植物浇浇水、整理叶片，在家享受片刻宁静。"],
    ["home-baking", "집에서 쿠키 굽기", "Bake cookies at home", "家でクッキーを焼く", "在家烤饼干", "고소한 냄새가 집 안에 퍼지는 시간을 즐겨요.", "Enjoy the warm smell of cookies baking in the oven.", "焼きたての甘い香りが広がる時間を楽しみます。", "享受饼干出炉时香气弥漫的时光。"],
    ["riverside-sketch", "강가에서 그림 그리기", "Sketch by the river", "川辺でスケッチする", "在河边画画", "천천히 풍경을 바라보며 손 가는 대로 그려봐요.", "Take in the view and draw whatever catches your eye.", "景色を眺めながら、心の向くままに描いてみます。", "静静欣赏风景，把眼前所见画下来。"],
    ["art-gallery", "작은 갤러리 전시 보기", "Visit a small art gallery", "小さなギャラリーを訪れる", "参观小型画廊", "마음에 남는 작품 앞에서 잠깐 발걸음을 멈춰요.", "Pause in front of the artwork that stays with you.", "心に残る作品の前で、少し足を止めてみます。", "在让自己驻足的作品前，多看一会儿。"],
    ["pottery-class", "도자기 만들기 체험하기", "Try a pottery class", "陶芸を体験する", "体验陶艺制作", "흙을 만지며 생각을 비우고 나만의 그릇을 만들어요.", "Work with clay, clear your mind, and make something of your own.", "土に触れて気持ちを整えながら、自分だけの器を作ります。", "揉揉陶土，放松心情，做一件属于自己的作品。"],
    ["board-games", "친구들과 보드게임 하기", "Play board games with friends", "友達とボードゲームをする", "和朋友玩桌游", "간식과 게임을 곁들여 웃고 떠들어요.", "Share snacks, friendly competition, and plenty of laughs.", "おやつを囲んでゲームをしながら、みんなで笑います。", "和朋友边吃零食边玩游戏，享受热闹时光。"],
    ["riverside-cycling", "강변 자전거 타기", "Ride along the riverside", "川沿いを自転車で走る", "沿着河边骑行", "바람을 맞으며 익숙한 길도 새롭게 둘러봐요.", "Feel the breeze and see a familiar path in a new way.", "風を感じながら、いつもの道を新鮮な気分で走ります。", "迎着微风骑行，用新的视角看看熟悉的路线。"],
    ["botanical-garden", "식물원 천천히 둘러보기", "Wander through a botanical garden", "植物園をゆっくり巡る", "慢慢逛逛植物园", "초록 사이를 걸으며 계절마다 다른 풍경을 만나요.", "Walk among the greenery and notice the changing seasons.", "緑の中を歩きながら、季節ごとの景色に出会います。", "漫步在绿意之间，感受不同季节的景致。"],
    ["beach-walk", "바닷가를 따라 걷기", "Walk along the beach", "海辺を歩く", "沿着海边散步", "파도 소리를 들으며 복잡한 마음을 잠시 내려놔요.", "Listen to the waves and let your thoughts settle.", "波の音を聞きながら、考えごとを少し休ませます。", "听着海浪声，让纷乱的思绪暂时歇一歇。"],
    ["park-picnic", "공원에서 피크닉 하기", "Have a picnic in the park", "公園でピクニックをする", "在公园野餐", "간단한 먹거리를 챙겨 나무 그늘에서 여유를 즐겨요.", "Bring a simple bite and relax under the trees.", "軽食を持って出かけ、木陰でのんびり過ごします。", "带上简单的食物，在树荫下悠闲地待一会儿。"],
    ["traditional-market", "전통시장 구경하기", "Explore a traditional market", "伝統市場を歩く", "逛逛传统市场", "시장 골목을 걸으며 눈에 띄는 간식과 물건을 찾아요.", "Stroll the market lanes and see what catches your eye.", "市場の路地を歩きながら、気になる食べ物や品物を探します。", "逛逛市场小巷，寻找吸引自己的小吃和物品。"],
    ["baseball-game", "야구 경기 직관하기", "Watch a baseball game", "野球を観戦する", "现场看一场棒球赛", "응원하는 팀과 함께 경기의 열기를 느껴봐요.", "Feel the energy of the game and cheer for your team.", "応援するチームと一緒に、試合の熱気を楽しみます。", "和支持的球队一起感受现场比赛的热情。"],
    ["museum-visit", "박물관 전시 둘러보기", "Explore a museum exhibition", "博物館の展示を巡る", "逛逛博物馆展览", "관심 가는 전시를 따라 천천히 새로운 이야기를 만나요.", "Follow an exhibit that interests you and discover its story.", "気になる展示をたどりながら、新しい物語に出会います。", "跟着感兴趣的展览慢慢走，发现新的故事。"],
    ["record-store", "레코드 가게에서 음악 찾기", "Browse music at a record shop", "レコード店で音楽を探す", "在唱片店寻找音乐", "앨범을 넘겨보다가 오늘의 플레이리스트를 발견해요.", "Flip through albums and find a new soundtrack for the day.", "アルバムを眺めながら、今日聴きたい音楽を見つけます。", "翻翻唱片，找到今天想听的音乐。"],
    ["photo-walk", "동네 골목 사진 찍기", "Take photos around the neighborhood", "街角の写真を撮りながら歩く", "在街区散步拍照", "평소 지나치던 골목에서 작은 장면을 찾아봐요.", "Look for small details on streets you usually pass by.", "いつも通る道で、ふと目に留まる景色を探します。", "在平时经过的街巷里，发现容易错过的小景色。"],
    ["weekend-brunch", "테라스에서 브런치 먹기", "Enjoy brunch on a patio", "テラスでブランチを楽しむ", "在露台享用早午餐", "햇살 좋은 자리에서 느긋하게 한 끼를 즐겨요.", "Take your time over a meal in a sunny spot.", "日当たりのいい席で、ゆっくり食事を楽しみます。", "找个阳光好的位置，慢慢享用一顿饭。"],
    ["library-reading", "도서관에서 책 읽기", "Read at the library", "図書館で本を読む", "在图书馆读书", "조용한 자리에서 책장을 넘기며 나만의 시간을 보내요.", "Settle into a quiet spot and spend time with a book.", "静かな席でページをめくり、自分だけの時間を過ごします。", "找个安静的位置，享受沉浸阅读的时光。"],
    ["dance-class", "가벼운 댄스 클래스 듣기", "Try a beginner dance class", "気軽なダンスレッスンに参加する", "体验轻松的舞蹈课", "음악에 맞춰 몸을 움직이며 기분을 환기해요.", "Move to the music and give yourself a refreshing reset.", "音楽に合わせて体を動かし、気分をリフレッシュします。", "跟着音乐活动身体，让心情焕然一新。"],
    ["craft-workshop", "공방에서 작은 소품 만들기", "Make something at a local workshop", "工房で小物を作る", "在手作工坊制作小物件", "손으로 하나씩 만들어 완성하는 즐거움을 느껴요.", "Enjoy making something by hand, one step at a time.", "手を動かしながら、少しずつ形にする楽しさを味わいます。", "亲手一步步制作，享受作品慢慢成形的乐趣。"],
    ["park-jog", "공원에서 천천히 달리기", "Go for an easy jog in the park", "公園でゆっくり走る", "在公园慢跑", "무리하지 않는 속도로 달리며 몸과 마음을 깨워요.", "Move at an easy pace and wake up your body and mind.", "無理のないペースで走り、心と体をすっきりさせます。", "用轻松的节奏跑一跑，唤醒身心活力。"],
    ["spa-relax", "따뜻한 스파에서 쉬기", "Relax in a warm spa lounge", "スパでゆっくりくつろぐ", "在温暖的休息空间放松", "따뜻하고 조용한 공간에서 긴장을 풀고 쉬어요.", "Unwind in a warm, quiet space and take a real break.", "温かく静かな空間で、緊張をほどいてひと休みします。", "在温暖安静的空间里放松下来，好好休息。"],
    ["nearby-train-trip", "기차 타고 근교 다녀오기", "Take a train to a nearby town", "電車で近くの街へ出かける", "坐火车去附近的小镇", "가까운 곳으로 잠시 떠나 낯선 거리를 걸어봐요.", "Take a short trip and wander somewhere a little unfamiliar.", "近くの街へ出かけて、いつもと違う道を歩いてみます。", "短途出行，去稍显陌生的街道走走看看。"]
  ].map(([id, ko, en, ja, zh, detailKo, detailEn, detailJa, detailZh]) => ({
    id,
    name: locale(ko, en, ja, zh),
    detail: locale(detailKo, detailEn, detailJa, detailZh),
    image: image("weekend-activities", id, "jpg")
  }));
  const generatedWeekendNames = [
    ["camping-trip", "캠핑 가서 하룻밤 보내기", "Spend a night camping", "キャンプで一泊する", "去露营住一晚", "친구와 텐트를 치고 자연 속에서 하룻밤 쉬어요.", "Share a relaxed night outdoors with a friend.", "友達とテントを張り、自然の中で一晩過ごします。", "和朋友搭起帐篷，在自然中度过轻松的一晚。"],
    ["live-concert", "라이브 공연 보러 가기", "See a live music show", "ライブを見に行く", "去看现场演出", "좋아하는 음악을 현장에서 듣고 공연의 열기를 즐겨요.", "Hear favorite music live and enjoy the energy of a show.", "好きな音楽を生で聴き、会場の熱気を楽しみます。", "现场聆听喜欢的音乐，感受演出的热烈气氛。"],
    ["karaoke-night", "노래방에서 신나게 노래하기", "Sing at a karaoke room", "カラオケで思いきり歌う", "去KTV唱歌", "아는 노래를 골라 친구와 번갈아 부르며 놀아요.", "Pick familiar songs and take turns singing with friends.", "知っている曲を選び、友達と交代で歌って楽しみます。", "选几首熟悉的歌，和朋友轮流唱着玩。"],
    ["bowling-night", "친구들과 볼링 치기", "Go bowling with friends", "友達とボウリングをする", "和朋友去打保龄球", "누가 더 많이 쓰러뜨릴지 가볍게 승부를 겨뤄요.", "See who can knock down the most pins in a friendly game.", "ピンを多く倒せるのは誰か、気軽に勝負します。", "轻松比一比，看谁能击倒更多球瓶。"],
    ["theme-park", "놀이공원에서 하루 보내기", "Spend a day at an amusement park", "遊園地で一日過ごす", "在游乐园玩一天", "좋아하는 놀이기구를 타며 하루 종일 들뜬 기분을 즐겨요.", "Fill the day with favorite rides and a little excitement.", "好きなアトラクションに乗って、一日わくわく過ごします。", "坐上喜欢的游乐设施，享受充满期待的一天。"],
    ["aquarium-visit", "아쿠아리움 구경하기", "Visit an aquarium", "水族館を見に行く", "去水族馆看看", "천천히 수조를 둘러보며 물속 풍경에 빠져들어요.", "Take your time watching the calm underwater scenes.", "水槽をゆっくり巡り、水の中の景色に浸ります。", "慢慢逛逛水族箱，沉浸在水下景色里。"],
    ["escape-room", "방탈출 게임 도전하기", "Try an escape room", "脱出ゲームに挑戦する", "挑战密室逃脱", "친구들과 단서를 맞춰가며 제한 시간 안에 문제를 풀어요.", "Work through clues with friends before time runs out.", "友達と手がかりをつなぎ、制限時間内に謎を解きます。", "和朋友一起拼凑线索，在时间结束前解开谜题。"],
    ["rooftop-sunset", "루프탑에서 노을 보기", "Watch the sunset from a rooftop", "屋上で夕日を眺める", "在屋顶看日落", "탁 트인 곳에서 저무는 하늘을 바라보며 쉬어요.", "Unwind while the sky changes color over the city.", "開放的な屋上で、暮れていく空を眺めながら休みます。", "在开阔的屋顶放松身心，看天空慢慢染上晚霞。"],
    ["food-festival", "야외 푸드 페스티벌 가기", "Visit an outdoor food festival", "屋外フードフェスに行く", "去户外美食节", "여러 가게를 둘러보며 눈에 띄는 먹거리를 맛봐요.", "Browse the stalls and try whatever catches your eye.", "いろいろな屋台を巡り、気になる食べ物を味わいます。", "逛逛不同摊位，尝尝吸引自己的美食。"],
    ["flower-arranging", "꽃꽂이 클래스 체험하기", "Try a flower-arranging class", "フラワーアレンジメントを体験する", "体验插花课程", "계절 꽃을 골라 나만의 작은 꽃다발이나 장식을 만들어요.", "Choose seasonal flowers and make an arrangement of your own.", "季節の花を選び、自分だけの小さなアレンジを作ります。", "挑选应季鲜花，制作一份属于自己的小花艺。"],
    ["ice-skating", "실내 스케이트장 가기", "Go ice skating", "アイススケートに行く", "去滑冰", "얼음 위를 천천히 미끄러지며 겨울 분위기를 즐겨요.", "Glide across the ice at your own pace and enjoy the rink.", "自分のペースで氷の上を滑り、リンクの雰囲気を楽しみます。", "按自己的节奏在冰面上滑行，感受滑冰场的乐趣。"],
    ["surfing-lesson", "서핑 배우러 가기", "Take a surfing lesson", "サーフィンを習う", "去学冲浪", "강습을 받으며 파도 위에 서는 순간에 도전해요.", "Learn the basics and try standing up on a gentle wave.", "レッスンを受けながら、波に乗ることに挑戦します。", "跟着教练学习基础，试着站上温和的浪头。"],
    ["movie-theater", "극장에서 영화 보기", "Watch a movie at the cinema", "映画館で映画を見る", "去电影院看电影", "큰 화면과 풍성한 사운드로 영화에 푹 빠져봐요.", "Settle in and enjoy a movie on the big screen.", "大きな画面と音響で、映画の世界に浸ります。", "坐下来享受大银幕和环绕音效带来的观影体验。"],
    ["volunteer-day", "동네 봉사활동 참여하기", "Volunteer in the neighborhood", "地域のボランティアに参加する", "参加社区志愿活动", "이웃과 함께 정원을 가꾸며 보람 있는 시간을 보내요.", "Spend a meaningful day helping with a local community project.", "地域の人と一緒に活動し、充実した時間を過ごします。", "和邻里一起参与社区活动，度过有意义的一天。"],
    ["ferry-ride", "유람선 타고 바람 쐬기", "Take a ferry ride", "フェリーに乗って風を感じる", "坐船吹吹海风", "배 위에서 시원한 바람과 물가 풍경을 즐겨요.", "Feel the breeze and take in the view from the water.", "船の上で風を感じながら、水辺の景色を楽しみます。", "坐在船上吹吹风，欣赏沿途的水岸风景。"],
    ["planetarium-show", "천문관에서 별 구경하기", "Visit a planetarium", "プラネタリウムで星空を見る", "去天文馆看星空", "돔을 가득 채운 별과 우주 영상을 천천히 감상해요.", "Look up and drift through a star-filled planetarium sky.", "ドームいっぱいに広がる星空や宇宙の映像を眺めます。", "抬头欣赏铺满穹顶的星空和宇宙影像。"],
    ["staycation", "호텔에서 여유롭게 쉬기", "Enjoy a relaxing hotel stay", "ホテルでゆっくり過ごす", "在酒店悠闲地休息", "익숙한 일상에서 벗어나 책을 읽고 느긋하게 쉬어요.", "Step away from routine and enjoy an unhurried hotel stay.", "いつもの生活を離れ、ホテルでのんびり過ごします。", "暂时离开日常，在酒店里悠闲地休息。"],
    ["climbing-gym", "실내 클라이밍 도전하기", "Try indoor climbing", "ボルダリングに挑戦する", "挑战室内攀岩", "쉬운 코스부터 차근차근 올라가며 새로운 재미를 찾아요.", "Try an easy route and enjoy finding your way up the wall.", "簡単なコースから登り、自分なりの楽しさを見つけます。", "从简单路线开始攀爬，发现向上挑战的乐趣。"]
  ].map(([id, ko, en, ja, zh, detailKo, detailEn, detailJa, detailZh]) => ({
    id,
    name: locale(ko, en, ja, zh),
    detail: locale(detailKo, detailEn, detailJa, detailZh),
    image: image("weekend-activities", id, "jpg")
  }));
  weekendNames.push(...additionalWeekendNames, ...generatedWeekendNames);

  const foodNames = [
    ["tteokbokki", "떡볶이", "Tteokbokki", "トッポッキ", "辣炒年糕"],
    ["fried-chicken", "배달 치킨", "Korean fried chicken", "韓国フライドチキン", "韩式炸鸡"],
    ["ramyeon", "라면", "Ramyeon", "ラーメン", "韩式拉面"],
    ["gimbap", "김밥", "Gimbap", "キンパ", "紫菜包饭"],
    ["kimchi-fried-rice", "김치볶음밥", "Kimchi fried rice", "キムチチャーハン", "泡菜炒饭"],
    ["korean-corn-dog", "한국식 핫도그", "Korean corn dog", "韓国式コーンドッグ", "韩式热狗"],
    ["fish-cake-soup", "어묵탕", "Fish cake soup", "おでんスープ", "鱼饼汤"],
    ["fried-mandu", "군만두", "Pan-fried dumplings", "焼き餃子", "煎饺"],
    ["kimchi-pancake", "김치전", "Kimchi pancake", "キムチチヂミ", "泡菜煎饼"],
    ["spicy-chicken-feet", "매운 닭발", "Spicy chicken feet", "辛い鶏足", "香辣鸡爪"],
    ["bossam", "보쌈", "Bossam pork wraps", "ポッサム", "韩式菜包肉"],
    ["jokbal", "족발", "Braised pig trotters", "豚足", "韩式酱猪蹄"],
    ["sundae", "순대", "Korean sundae", "韓国式スンデ", "韩式米肠"],
    ["budae-jjigae", "부대찌개", "Army stew", "プデチゲ", "部队锅"],
    ["pork-belly", "삼겹살", "Grilled pork belly", "サムギョプサル", "韩式烤五花肉"],
    ["dakgangjeong", "닭강정", "Sweet crispy chicken", "タッカンジョン", "韩式甜辣炸鸡"],
    ["japchae", "잡채", "Japchae noodles", "チャプチェ", "韩式杂菜"],
    ["tteok-skewers", "떡꼬치", "Rice cake skewers", "トッコチ", "韩式年糕串"],
    ["corn-cheese", "콘치즈", "Corn cheese", "コーンチーズ", "芝士玉米"],
    ["seafood-pancake", "해물파전", "Seafood scallion pancake", "海鮮ネギチヂミ", "海鲜葱饼"],
    ["stir-fried-squid", "오징어볶음", "Spicy stir-fried squid", "イカ炒め", "辣炒鱿鱼"],
    ["chicken-gizzard", "닭똥집볶음", "Stir-fried chicken gizzards", "砂肝炒め", "炒鸡胗"],
    ["fried-shrimp", "새우튀김", "Fried shrimp", "エビフライ", "炸虾"],
    ["squid-tempura", "오징어튀김", "Fried squid", "イカの天ぷら", "炸鱿鱼"],
    ["potato-pancake", "감자전", "Potato pancake", "ジャガイモチヂミ", "土豆煎饼"],
    ["gamjatang", "감자탕", "Pork bone stew", "カムジャタン", "土豆脊骨汤"],
    ["jjolmyeon", "쫄면", "Spicy chewy noodles", "チョルミョン", "韩式辣拌面"],
    ["jjajang-ramyeon", "짜장라면", "Black bean ramyeon", "ジャージャーラーメン", "韩式炸酱面"],
    ["bibim-myeon", "비빔면", "Spicy mixed noodles", "ビビン麺", "韩式拌面"],
    ["gomtang", "곰탕", "Korean beef soup", "コムタン", "韩式牛骨汤"],
    ["chicken-skewer", "닭꼬치", "Chicken skewers", "焼き鳥串", "韩式鸡肉串"],
    ["fish-cake-skewer", "어묵꼬치", "Fish cake skewers", "おでん串", "鱼饼串"],
    ["hotteok", "호떡", "Hotteok", "ホットク", "韩式糖饼"],
    ["bungeoppang", "붕어빵", "Bungeoppang", "たい焼き", "鲫鱼饼"],
    ["twisted-donut", "꽈배기", "Korean twisted doughnut", "韓国式ツイストドーナツ", "韩式麻花"],
    ["korean-pizza", "피자", "Pizza", "ピザ", "披萨"],
    ["cheese-balls", "치즈볼", "Cheese balls", "チーズボール", "芝士球"],
    ["sweet-potato-fries", "고구마스틱", "Sweet potato fries", "さつまいもスティック", "红薯条"],
    ["fruit-cup", "컵과일", "Fresh fruit cup", "カットフルーツ", "鲜切水果杯"],
    ["ice-cream", "아이스크림", "Ice cream", "アイスクリーム", "冰淇淋"],
    ["hamburger", "햄버거", "Hamburger", "ハンバーガー", "汉堡"],
    ["french-fries", "감자튀김", "French fries", "フライドポテト", "薯条"],
    ["nachos", "나초", "Nachos", "ナチョス", "玉米片"],
    ["cream-pasta", "크림파스타", "Cream pasta", "クリームパスタ", "奶油意面"],
    ["grilled-eel", "장어구이", "Grilled eel", "うなぎの蒲焼き", "烤鳗鱼"],
    ["egg-toast", "길거리 토스트", "Korean street toast", "韓国式トースト", "韩式街头吐司"],
    ["tuna-rice-ball", "참치마요 주먹밥", "Tuna mayo rice ball", "ツナマヨおにぎり", "金枪鱼蛋黄酱饭团"],
    ["fried-seaweed-roll", "김말이튀김", "Fried seaweed rolls", "春雨の海苔巻き揚げ", "炸紫菜卷"],
    ["spicy-pork", "제육볶음", "Spicy stir-fried pork", "豚肉の辛味炒め", "辣炒猪肉"],
    ["cup-ramyeon", "컵라면", "Cup ramyeon", "カップラーメン", "杯面"]
  ];
  const foodDetails = {
    "tteokbokki": locale("쫄깃한 떡에 매콤달콤한 양념이 배어드는 분식 대표 메뉴예요.", "Chewy rice cakes soak up a sweet and spicy sauce.", "もちもちの餅に甘辛いソースがよく絡む、韓国の定番屋台料理です。", "软糯年糕裹上甜辣酱汁，是经典韩式小吃。"),
    "fried-chicken": locale("바삭한 튀김옷과 촉촉한 살코기를 시원한 음료와 곁들이기 좋아요.", "Crisp coating and juicy chicken make a great match for a cold drink.", "カリッとした衣とジューシーな肉を、冷たい飲み物と一緒に楽しめます。", "酥脆外皮包着鲜嫩鸡肉，配一杯冰饮正合适。"),
    "ramyeon": locale("꼬들한 면발과 뜨끈한 국물이 늦은 밤 허기를 달래줘요.", "Springy noodles and steaming broth hit the spot late at night.", "歯ごたえのある麺と熱々のスープで、夜食にぴったりです。", "劲道的面条配上热乎乎的汤，深夜吃很满足。"),
    "gimbap": locale("김과 밥 안에 여러 재료를 넣어 한입씩 간편하게 먹어요.", "Rice, seaweed, and savory fillings come together in easy-to-eat slices.", "海苔とご飯に具材を巻いた、手軽に食べられる一品です。", "米饭和多种馅料卷入海苔中，切成小段方便入口。"),
    "kimchi-fried-rice": locale("잘 익은 김치의 감칠맛을 밥에 볶아 고소하게 즐기는 한 그릇이에요.", "Tangy aged kimchi is stir-fried with rice for a savory, comforting bowl.", "熟成キムチの旨みをご飯に絡めて炒めた、香ばしい一皿です。", "用熟成泡菜炒饭，酸香开胃又有饱足感。"),
    "korean-corn-dog": locale("쫀득한 반죽 속 소시지와 바삭한 겉면을 한 손에 즐겨요.", "A chewy batter and savory sausage make this an easy handheld snack.", "もちっとした生地とソーセージを、片手で気軽に楽しめます。", "外层酥脆、内里包着香肠，是方便拿着吃的小吃。"),
    "fish-cake-soup": locale("따뜻한 국물에 담긴 말랑한 어묵으로 속을 편하게 달래요.", "Tender fish cakes in warm broth make a soothing late-night snack.", "温かいだしに浸かった柔らかな練り物で、ほっと一息つけます。", "热汤里煮着软嫩鱼饼，暖胃又舒服。"),
    "fried-mandu": locale("노릇한 만두피 안에 고기와 채소의 육즙이 꽉 차 있어요.", "Golden dumpling wrappers hold a juicy mix of meat and vegetables.", "香ばしく焼いた皮の中に、肉や野菜の旨みが詰まっています。", "煎得金黄的饺子皮里，包着鲜香多汁的肉和蔬菜。"),
    "kimchi-pancake": locale("새콤한 김치와 바삭한 가장자리가 어우러지는 부침개예요.", "Tangy kimchi and crisp edges make every bite of this pancake satisfying.", "キムチの酸味とカリッとした端の食感が楽しめるチヂミです。", "泡菜的酸香搭配煎得酥脆的边缘，越嚼越香。"),
    "spicy-chicken-feet": locale("매콤한 양념과 쫄깃한 식감을 천천히 즐기는 야식이에요.", "Spicy sauce and chewy texture make this a slow, flavorful snack.", "辛い味付けと独特の歯ごたえを、ゆっくり味わう夜食です。", "香辣入味、口感弹韧，适合慢慢啃着享用。"),
    "bossam": locale("부드럽게 삶은 돼지고기를 김치나 쌈채소에 곁들여 먹어요.", "Tender boiled pork is delicious wrapped with kimchi or leafy greens.", "柔らかく茹でた豚肉を、キムチや葉野菜と一緒に包んで食べます。", "软嫩的白切猪肉搭配泡菜或生菜包着吃。"),
    "jokbal": locale("쫄깃한 껍질과 촉촉한 살코기를 새우젓에 곁들여요.", "Tender pork and pleasantly chewy skin pair well with salted shrimp.", "もちっとした皮としっとりした肉を、アミの塩辛と一緒に味わいます。", "弹韧的猪皮和软嫩肉块，配虾酱吃更提味。"),
    "sundae": locale("쫄깃한 순대를 소금이나 따뜻한 떡볶이 국물에 찍어 먹어요.", "Chewy Korean blood sausage is often dipped in salt or tteokbokki sauce.", "もちもちのスンデは、塩やトッポッキのソースにつけて食べます。", "弹韧的韩式米肠蘸盐或炒年糕酱汁都很美味。"),
    "budae-jjigae": locale("햄과 소시지, 김치가 얼큰한 국물에서 어우러지는 찌개예요.", "Ham, sausage, and kimchi simmer together in a hearty, spicy stew.", "ハムやソーセージ、キムチを辛みのあるスープで煮込んだ鍋料理です。", "火腿、香肠和泡菜在微辣汤底里煮成一锅暖心浓汤。"),
    "pork-belly": locale("불판에 구워 겉은 노릇하게, 속은 촉촉하게 즐기는 고기예요.", "Grilled until browned outside and juicy inside, pork belly is great with wraps.", "表面を香ばしく焼き、中はジューシーに仕上げた豚バラ肉です。", "五花肉在烤盘上煎得外焦里嫩，也适合搭配生菜包着吃。"),
    "dakgangjeong": locale("한입 크기 닭튀김에 달콤매콤한 소스가 코팅돼요.", "Bite-size fried chicken is coated in a glossy sweet-and-spicy sauce.", "一口サイズの唐揚げに、甘辛いソースを絡めた料理です。", "小块炸鸡裹上亮泽的甜辣酱汁，方便一口一个。"),
    "japchae": locale("쫄깃한 당면과 채소를 간장 양념에 볶아 달큰하게 즐겨요.", "Chewy glass noodles and vegetables are tossed in a gently sweet soy sauce.", "もちもちの春雨と野菜を、甘めの醤油だれで炒めています。", "劲道的粉丝和蔬菜拌炒酱油调味，咸香中带点甜。"),
    "tteok-skewers": locale("쫀득한 떡을 꼬치에 끼워 달콤한 양념과 함께 구워요.", "Chewy rice cakes are skewered, grilled, and brushed with sweet sauce.", "もちもちの餅を串に刺して焼き、甘いソースを絡めます。", "年糕串烤至微焦，再刷上甜酱，外香里糯。"),
    "corn-cheese": locale("톡톡 터지는 옥수수와 녹아내린 치즈를 따뜻하게 떠먹어요.", "Sweet corn and bubbling melted cheese are served warm by the spoonful.", "甘いコーンにとろけるチーズをのせ、熱々のうちにいただきます。", "香甜玉米铺上融化的芝士，趁热用勺子舀着吃。"),
    "seafood-pancake": locale("바삭한 파전 사이로 오징어와 새우의 감칠맛이 느껴져요.", "Crisp scallion pancake is dotted with savory squid and shrimp.", "カリッと焼いたネギの生地に、イカやエビの旨みが広がります。", "酥脆葱饼里夹着鱿鱼和虾，海鲜鲜味十足。"),
    "stir-fried-squid": locale("쫄깃한 오징어에 매콤한 양념과 채소를 함께 볶았어요.", "Chewy squid and vegetables are stir-fried in a lively spicy sauce.", "歯ごたえのあるイカと野菜を、ピリ辛のたれで炒めています。", "弹嫩鱿鱼和蔬菜一起用辣酱翻炒，香辣下饭。"),
    "chicken-gizzard": locale("오독하고 쫄깃한 닭근위를 마늘과 함께 볶아 고소해요.", "Chicken gizzards are stir-fried with garlic for a savory, chewy bite.", "コリコリした砂肝をニンニクと炒めた、香ばしいおつまみです。", "鸡胗与蒜片同炒，口感脆韧，蒜香浓郁。"),
    "fried-shrimp": locale("바삭한 튀김을 깨물면 통통한 새우의 단맛이 퍼져요.", "A crisp golden coating gives way to plump, naturally sweet shrimp.", "サクッとした衣の中から、ぷりっとしたエビの甘みが広がります。", "咬开酥脆外衣，鲜甜饱满的虾肉就在里面。"),
    "squid-tempura": locale("쫄깃한 오징어를 얇은 튀김옷으로 감싸 바삭하게 튀겼어요.", "Tender squid is wrapped in a light batter and fried until crisp.", "イカに薄い衣をつけてカリッと揚げた、食感のよい一品です。", "鱿鱼裹上薄薄的面衣炸至酥脆，外脆内弹。"),
    "potato-pancake": locale("간 감자를 노릇하게 부쳐 겉은 바삭하고 속은 쫀득해요.", "Grated potato is pan-fried until crisp outside and tender inside.", "すりおろしたジャガイモを焼き、外はカリッと中はもちっと仕上げます。", "土豆擦碎后煎至两面金黄，外脆内软糯。"),
    "gamjatang": locale("진한 돼지등뼈 국물에 우거지와 감자가 어우러져 든든해요.", "Pork bone broth, leafy greens, and potatoes make a hearty stew.", "濃厚な豚骨スープに葉野菜とジャガイモを合わせた、食べ応えのある鍋です。", "浓郁猪骨汤里煮着蔬菜和土豆，暖胃又顶饱。"),
    "jjolmyeon": locale("쫄깃한 면에 새콤매콤한 양념을 비벼 시원하게 먹어요.", "Chewy noodles are tossed in a cool, tangy, and spicy sauce.", "弾力のある麺に甘酸っぱく辛いたれを絡めて、さっぱり食べます。", "劲道面条拌上酸甜微辣的酱汁，清爽开胃。"),
    "jjajang-ramyeon": locale("고소한 짜장 소스가 면에 착 감기는 간편한 한 그릇이에요.", "A rich black bean sauce clings to the noodles in this quick, savory bowl.", "コクのあるジャージャーソースが麺によく絡む、手軽な一品です。", "浓香炸酱裹住每根面条，简单一碗就很满足。"),
    "bibim-myeon": locale("차갑게 비빈 면과 새콤달콤한 소스가 입맛을 깨워요.", "Chilled noodles in a sweet-and-tangy sauce make a refreshing spicy bite.", "冷たい麺に甘酸っぱいたれを絡めた、さっぱりした辛口メニューです。", "冰凉面条拌上酸甜酱汁，清爽又带点辣味。"),
    "gomtang": locale("오래 우린 맑고 담백한 소고기 국물로 속을 따뜻하게 채워요.", "A clear, gently savory beef broth makes a warming, simple meal.", "牛肉をじっくり煮込んだ、澄んだ優しい味わいのスープです。", "牛肉长时间熬出的清鲜汤底，喝起来温暖又舒服。"),
    "chicken-skewer": locale("불향 입힌 닭고기에 달콤짭짤한 소스를 발라 구운 꼬치예요.", "Grilled chicken skewers are brushed with a sweet, savory glaze.", "香ばしく焼いた鶏肉に、甘辛いたれを塗った串焼きです。", "鸡肉串烤出焦香，再刷上咸甜酱汁。"),
    "fish-cake-skewer": locale("따끈한 국물에 어묵 꼬치를 담가 한 장씩 즐겨요.", "Fish cakes on skewers soak up warm broth and are easy to enjoy one by one.", "温かいだしに浸した練り物を、串から一つずつ味わいます。", "鱼饼串浸在热汤里，拿起一串慢慢吃很惬意。"),
    "hotteok": locale("따뜻한 반죽 안에 녹은 흑설탕 시럽과 견과류가 들어 있어요.", "Warm dough gives way to melted brown sugar syrup and crunchy nuts.", "温かい生地の中に、とろけた黒糖シロップとナッツが入っています。", "热乎面饼里包着融化的红糖和坚果，香甜软糯。"),
    "bungeoppang": locale("바삭한 틀 안에 따끈한 팥소가 들어 있는 겨울 간식이에요.", "This crisp fish-shaped pastry hides a warm, sweet red bean filling.", "魚の形に焼いた香ばしい生地に、温かいあんこが入った冬のおやつです。", "鱼形外皮烤得香脆，里面是热乎乎的红豆馅，是经典冬日点心。"),
    "twisted-donut": locale("설탕을 묻힌 폭신쫄깃한 꽈배기를 커피와 곁들여요.", "A fluffy, chewy twisted doughnut is finished with a dusting of sugar.", "ふんわりもちっとした揚げ菓子に砂糖をまぶした、素朴なおやつです。", "蓬松有嚼劲的麻花裹上细砂糖，配咖啡正好。"),
    "korean-pizza": locale("바삭한 도우 위에 녹은 치즈와 토핑을 얹어 나눠 먹기 좋아요.", "Melted cheese and favorite toppings on crisp dough make an easy shareable meal.", "カリッとした生地にチーズと具材をのせた、みんなで分けやすい一品です。", "酥脆饼底铺上融化芝士和配料，适合切块分享。"),
    "cheese-balls": locale("바삭한 겉을 깨물면 안에서 따뜻한 치즈가 늘어나요.", "Bite through a crisp shell to find warm, stretchy cheese inside.", "カリッとした衣の中から、温かいチーズがとろりと伸びます。", "咬开酥脆外壳，里面的热芝士柔软拉丝。"),
    "sweet-potato-fries": locale("고구마의 자연스러운 단맛과 바삭한 가장자리가 잘 어울려요.", "Naturally sweet potato with crisp edges makes a simple, satisfying snack.", "さつまいもの自然な甘みと、カリッとした端の食感が楽しめます。", "红薯自带的香甜配上酥脆边缘，简单又好吃。"),
    "fruit-cup": locale("차갑고 산뜻한 여러 과일을 한 컵에 담아 가볍게 먹어요.", "A chilled mix of fresh fruit is a light, refreshing late-night choice.", "冷やしたいろいろな果物をカップに詰めた、さっぱりした一品です。", "一杯装着多种冰凉鲜果，清爽解腻又轻盈。"),
    "ice-cream": locale("차갑고 부드러운 한 스쿱으로 달콤하게 입가심해요.", "A cool, creamy scoop is an easy way to finish on something sweet.", "冷たくなめらかな一口で、甘く締めくくれます。", "来一勺冰凉绵密的冰淇淋，甜甜地结束夜宵。"),
    "hamburger": locale("패티와 채소, 소스를 번 사이에 담아 한입 가득 즐겨요.", "A juicy patty, crisp vegetables, and sauce are stacked between soft buns.", "ジューシーなパティと野菜、ソースをバンズで挟んだ定番です。", "多汁肉饼、爽脆蔬菜和酱汁夹在面包中，一口满足。"),
    "french-fries": locale("겉은 바삭하고 속은 포슬한 감자를 소스에 찍어 먹어요.", "Crisp outside and fluffy inside, fries are even better with a favorite dip.", "外はカリッと中はほくほくのポテトを、好みのソースにつけてどうぞ。", "薯条外脆内松软，蘸上喜欢的酱料更过瘾。"),
    "nachos": locale("바삭한 옥수수칩에 치즈 소스와 살사를 얹어 나눠 먹어요.", "Crunchy corn chips topped with cheese sauce and salsa are made for sharing.", "パリパリのチップスにチーズソースやサルサを添えて楽しみます。", "酥脆玉米片配芝士酱和莎莎酱，适合边聊边分享。"),
    "cream-pasta": locale("부드러운 크림 소스가 면에 감기는 고소한 파스타예요.", "Silky cream sauce coats the pasta for a rich, comforting bowl.", "なめらかなクリームソースが麺に絡む、コクのあるパスタです。", "顺滑奶油酱汁裹住面条，浓郁醇香又暖心。"),
    "grilled-eel": locale("윤기 나는 양념을 발라 구운 장어를 따뜻한 밥과 곁들여요.", "Glazed grilled eel pairs beautifully with a bowl of warm rice.", "照りのあるたれで焼いたうなぎを、温かいご飯と一緒に味わいます。", "烤鳗鱼刷上亮泽酱汁，配一碗热米饭很合适。"),
    "egg-toast": locale("달걀과 채소, 달콤짭짤한 소스를 식빵 사이에 넣은 길거리 간식이에요.", "Egg, vegetables, and sweet-savory sauce are tucked between slices of toast.", "卵や野菜、甘じょっぱいソースをパンで挟んだ韓国の屋台トーストです。", "吐司夹着鸡蛋、蔬菜和咸甜酱汁，是韩式街头小吃。"),
    "tuna-rice-ball": locale("참치마요 속을 밥으로 감싸 한 손에 들고 먹기 좋아요.", "A creamy tuna-mayo filling is wrapped in rice for an easy handheld bite.", "ツナマヨの具をご飯で包んだ、片手で食べやすいおにぎりです。", "米饭包住香浓的金枪鱼蛋黄酱馅，拿着吃很方便。"),
    "fried-seaweed-roll": locale("당면을 넣은 김말이에 튀김옷을 입혀 바삭하게 튀겼어요.", "Glass noodles wrapped in seaweed are battered and fried until crisp.", "春雨を海苔で巻き、衣をつけてカリッと揚げています。", "粉丝卷进紫菜后裹上面衣炸脆，蘸辣炒年糕酱汁也很搭。"),
    "spicy-pork": locale("돼지고기와 채소에 매콤한 양념이 배어 밥과 잘 어울려요.", "Pork and vegetables soak up a spicy sauce that pairs well with rice.", "豚肉と野菜に辛いたれが染み込み、ご飯が進む味わいです。", "猪肉和蔬菜裹满香辣酱汁，是很下饭的一道菜。"),
    "cup-ramyeon": locale("뜨거운 물만 부으면 꼬들한 면과 얼큰한 국물을 간편히 즐겨요.", "Just add hot water for springy noodles and savory broth in minutes.", "お湯を注ぐだけで、歯ごたえのある麺とスープを手軽に楽しめます。", "只需加入热水，几分钟就能吃到劲道面条和鲜香汤底。")
  };
  const lateNightFood = foodNames.map(([id, ko, en, ja, zh]) => ({
    id,
    name: locale(ko, en, ja, zh),
    detail: foodDetails[id],
    image: image("late-night-food", id)
  }));

  window.MOLGGA_WORLDCUPS = {
    weekend: {
      id: "weekend", page: "worldcup.html", title: locale("주말 취향 월드컵", "Weekend Preference World Cup", "週末の好みワールドカップ", "周末偏好世界杯"),
      availableBrackets: [16, 32], items: weekendNames
    },
    "late-night-food": {
      id: "late-night-food", page: "late-night-worldcup.html", title: locale("야식 이상형 월드컵", "Late-Night Food World Cup", "夜食ワールドカップ", "深夜美食世界杯"),
      availableBrackets: [16, 32], items: lateNightFood
    }
  };
})();
