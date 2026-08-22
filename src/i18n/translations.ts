import { LanguageCode } from './types';

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Top Bar & View Switcher
    'view.label': 'View',
    'view.mobile': 'Mobile',
    'view.desktop': 'Desktop',
    'view.switchToMobile': 'Switch to Mobile View',
    'view.switchToDesktop': 'Switch to Desktop View',
    'scheduler.label': '30s Auto Scheduler',
    'scheduler.synced': 'Synced',
    'scheduler.paused': 'Paused',
    'scheduler.refresh': 'Refresh',
    'language.label': 'Language',
    'language.detected': 'Auto-detected system language',

    // Navigation
    'nav.parks': 'Parks',
    'nav.map': 'Map',
    'nav.radar': 'Live Radar',
    'nav.alerts': 'Alerts',
    'nav.community': 'Talk to us',
    'nav.dataSource': 'Data Source',
    'nav.search': 'Search parks...',
    'nav.pass': 'Digital Pass',
    'nav.notifications': 'Notifications',

    // Hero & Weather Card
    'hero.feelsLike': 'Feels',
    'hero.high': 'H',
    'hero.low': 'L',
    'hero.rainRisk': 'Rain Risk',
    'hero.uvIndex': 'UV Index',
    'hero.humidity': 'Humidity',
    'hero.wind': 'Wind',
    'hero.gpsLocate': 'Locate Nearest Park via GPS',
    'hero.addToFav': 'Add to Favorites',
    'hero.favorited': 'Favorited',
    'hero.runningTrail': 'Trail',
    'hero.digitalPass': 'Digital Pass',

    // Heat Stress & Indices
    'heatStress.title': 'Tropical Heat Stress (TP-HSI)',
    'heatStress.moderate': 'Moderate Heat Stress',
    'heatStress.low': 'Low Heat Stress',
    'heatStress.high': 'High Heat Stress',
    'heatStress.extreme': 'Extreme Heat Stress',
    'heatStress.advice': 'Stay hydrated with regular shade breaks.',

    // Forecasts & Trends
    'forecast.hourly': 'Hourly Forecast (Today)',
    'forecast.rainTrend': 'Rain Probability Trend',
    'forecast.4h': '4-Hour',
    'forecast.12h': '12-Hour',
    'forecast.mssFeed': 'MSS Radar feed',

    // Transport & Parking
    'transport.title': 'Live Transport & Parking',
    'transport.agency': 'LTA DataMall v3',
    'transport.busArrivals': 'Bus Arrivals',
    'transport.carparkLots': 'Carpark Lots',
    'transport.mrtStation': 'MRT Station',
    'transport.away': 'away',
    'transport.arriving': 'Arr',
    'transport.minWalk': 'min walk',
    'transport.openLot': 'Open Lot',

    // Visit Planning & Nearby
    'plan.bestVisitingWindow': 'Best Visiting Window',
    'plan.button': 'Plan Trip',
    'plan.saveShortcut': 'Save App Shortcut',
    'nearby.title': 'Nearby Singapore Parks',
    'nearby.fullMap': 'Full Map →',
    'alerts.title': 'Recent Park Alerts',
    'alerts.viewAll': 'View all alerts →',
    'alerts.noAlerts': 'All clear. No weather advisories.',

    // Footer & Legal
    'footer.copyright': '© 2026 SG ParkWeather. Nature-inspired meteorological data.',
    'footer.privacy': 'AdSense & Privacy Policy',
    'cookie.consentText': 'We use cookies and Google AdSense to personalize content and analyze traffic in accordance with PDPA and Google policies.',
    'cookie.acceptAll': 'Accept All',
    'cookie.essentialOnly': 'Essential Only',
    'cookie.learnMore': 'Privacy Policy'
  },
  zh: {
    // Top Bar & View Switcher
    'view.label': '视图',
    'view.mobile': '手机版',
    'view.desktop': '桌面版',
    'view.switchToMobile': '切换至手机版视图',
    'view.switchToDesktop': '切换至电脑桌面版',
    'scheduler.label': '30秒自动调度',
    'scheduler.synced': '已同步',
    'scheduler.paused': '已暂停',
    'scheduler.refresh': '刷新',
    'language.label': '语言',
    'language.detected': '已自动匹配系统语言',

    // Navigation
    'nav.parks': '公园',
    'nav.map': '地图',
    'nav.radar': '实时雷达',
    'nav.alerts': '天气警报',
    'nav.community': '联系我们',
    'nav.dataSource': '数据源',
    'nav.search': '搜索新加坡公园...',
    'nav.pass': '数字通行证',
    'nav.notifications': '通知提醒',

    // Hero & Weather Card
    'hero.feelsLike': '体感',
    'hero.high': '最高',
    'hero.low': '最低',
    'hero.rainRisk': '降雨概率',
    'hero.uvIndex': '紫外线指数',
    'hero.humidity': '湿度',
    'hero.wind': '风速',
    'hero.gpsLocate': 'GPS 定位最近公园',
    'hero.addToFav': '收藏公园',
    'hero.favorited': '已收藏',
    'hero.runningTrail': '步道',
    'hero.digitalPass': '数字通行证',

    // Heat Stress & Indices
    'heatStress.title': '热带热应激指数 (TP-HSI)',
    'heatStress.moderate': '中度热应激',
    'heatStress.low': '低度热应激',
    'heatStress.high': '高度热应激',
    'heatStress.extreme': '极高热应激',
    'heatStress.advice': '请及时补充水分并多在树荫下休息。',

    // Forecasts & Trends
    'forecast.hourly': '今日每小时预报',
    'forecast.rainTrend': '降雨概率趋势',
    'forecast.4h': '4小时',
    'forecast.12h': '12小时',
    'forecast.mssFeed': '气象局 MSS 实时雷达',

    // Transport & Parking
    'transport.title': '实时交通与停车场',
    'transport.agency': '陆路交通局 LTA DataMall v3',
    'transport.busArrivals': '巴士到站时间',
    'transport.carparkLots': '停车位余量',
    'transport.mrtStation': '地铁站 (MRT)',
    'transport.away': '距离',
    'transport.arriving': '进站中',
    'transport.minWalk': '分钟步行',
    'transport.openLot': '开放车位',

    // Visit Planning & Nearby
    'plan.bestVisitingWindow': '最佳游览时间',
    'plan.button': '规划行程',
    'plan.saveShortcut': '添加到主屏幕',
    'nearby.title': '附近新加坡公园',
    'nearby.fullMap': '查看完整地图 →',
    'alerts.title': '近期公园天气预警',
    'alerts.viewAll': '查看所有警报 →',
    'alerts.noAlerts': '天气良好，目前无预警。',

    // Footer & Legal
    'footer.copyright': '© 2026 SG ParkWeather 新加坡公园天气与气象数据。',
    'footer.privacy': 'Google AdSense 与隐私政策',
    'cookie.consentText': '我们使用 Cookie 与 Google AdSense 来优化内容展示与流量分析，严格遵循新加坡 PDPA 与政策要求。',
    'cookie.acceptAll': '全部接受',
    'cookie.essentialOnly': '仅必要',
    'cookie.learnMore': '隐私政策'
  },
  ms: {
    // Top Bar & View Switcher
    'view.label': 'Paparan',
    'view.mobile': 'Mudah Alih',
    'view.desktop': 'Desktop',
    'view.switchToMobile': 'Tukar ke Paparan Mudah Alih',
    'view.switchToDesktop': 'Tukar ke Paparan Desktop',
    'scheduler.label': 'Penjadual Auto 30s',
    'scheduler.synced': 'Diselaraskan',
    'scheduler.paused': 'Dijeda',
    'scheduler.refresh': 'Segarkan',
    'language.label': 'Bahasa',
    'language.detected': 'Bahasa sistem dikesan secara automatik',

    // Navigation
    'nav.parks': 'Taman',
    'nav.map': 'Peta',
    'nav.radar': 'Radar Langsung',
    'nav.alerts': 'Amaran',
    'nav.community': 'Hubungi Kami',
    'nav.dataSource': 'Sumber Data',
    'nav.search': 'Cari taman...',
    'nav.pass': 'Pas Digital',
    'nav.notifications': 'Pemberitahuan',

    // Hero & Weather Card
    'hero.feelsLike': 'Terasa',
    'hero.high': 'Tinggi',
    'hero.low': 'Rendah',
    'hero.rainRisk': 'Risiko Hujan',
    'hero.uvIndex': 'Indeks UV',
    'hero.humidity': 'Kelembapan',
    'hero.wind': 'Angin',
    'hero.gpsLocate': 'Kesan Taman Terdekat melalui GPS',
    'hero.addToFav': 'Tambah ke Kegemaran',
    'hero.favorited': 'Digemari',
    'hero.runningTrail': 'Laluan',
    'hero.digitalPass': 'Pas Digital',

    // Heat Stress & Indices
    'heatStress.title': 'Indeks Tekanan Haba Tropika (TP-HSI)',
    'heatStress.moderate': 'Tekanan Haba Sederhana',
    'heatStress.low': 'Tekanan Haba Rendah',
    'heatStress.high': 'Tekanan Haba Tinggi',
    'heatStress.extreme': 'Tekanan Haba Melampau',
    'heatStress.advice': 'Kekal terhidrasi dan berehat di tempat teduh.',

    // Forecasts & Trends
    'forecast.hourly': 'Ramalan Sejam (Hari Ini)',
    'forecast.rainTrend': 'Aliran Kebarangkalian Hujan',
    'forecast.4h': '4-Jam',
    'forecast.12h': '12-Jam',
    'forecast.mssFeed': 'Suapan Radar MSS',

    // Transport & Parking
    'transport.title': 'Pengangkutan & Tempat Letak Kereta',
    'transport.agency': 'LTA DataMall v3',
    'transport.busArrivals': 'Ketibaan Bas',
    'transport.carparkLots': 'Kekosongan Tempat Letak Kereta',
    'transport.mrtStation': 'Stesen MRT',
    'transport.away': 'jauh',
    'transport.arriving': 'Tiba',
    'transport.minWalk': 'min jalan',
    'transport.openLot': 'Lot Terbuka',

    // Visit Planning & Nearby
    'plan.bestVisitingWindow': 'Waktu Lawatan Terbaik',
    'plan.button': 'Rancang Lawatan',
    'plan.saveShortcut': 'Simpan Pintasan Aplikasi',
    'nearby.title': 'Taman Singapura Berdekatan',
    'nearby.fullMap': 'Peta Penuh →',
    'alerts.title': 'Amaran Cuaca Taman Terkini',
    'alerts.viewAll': 'Lihat semua amaran →',
    'alerts.noAlerts': 'Semua keadaan baik. Tiada nasihat cuaca aktif.',

    // Footer & Legal
    'footer.copyright': '© 2026 SG ParkWeather. Data meteorologi taman Singapura.',
    'footer.privacy': 'Dasar Privasi & AdSense',
    'cookie.consentText': 'Kami menggunakan kuki dan Google AdSense untuk memperibadikan kandungan mengikut PDPA Singapura.',
    'cookie.acceptAll': 'Terima Semua',
    'cookie.essentialOnly': 'Penting Sahaja',
    'cookie.learnMore': 'Dasar Privasi'
  },
  ta: {
    // Top Bar & View Switcher
    'view.label': 'காட்சி',
    'view.mobile': 'மொபைல்',
    'view.desktop': 'டெஸ்க்டாப்',
    'view.switchToMobile': 'மொபைல் காட்சிக்கு மாறவும்',
    'view.switchToDesktop': 'டெஸ்க்டாப் காட்சிக்கு மாறவும்',
    'scheduler.label': '30 வினாடி தானியங்கி அட்டவணை',
    'scheduler.synced': 'ஒத்திசைக்கப்பட்டது',
    'scheduler.paused': 'இடைநிறுத்தப்பட்டது',
    'scheduler.refresh': 'புதுப்பி',
    'language.label': 'மொழி',
    'language.detected': 'கணினி மொழி தானாகக் கண்டறியப்பட்டது',

    // Navigation
    'nav.parks': 'பூங்காக்கள்',
    'nav.map': 'வரைபடம்',
    'nav.radar': 'நேரலை ரேடார்',
    'nav.alerts': 'எச்சரிக்கைகள்',
    'nav.community': 'எங்களுடன் பேசுங்கள்',
    'nav.dataSource': 'தரவு ஆதாரம்',
    'nav.search': 'பூங்காக்களைத் தேடுங்கள்...',
    'nav.pass': 'டிஜிட்டல் பாஸ்',
    'nav.notifications': 'அறிவிப்புகள்',

    // Hero & Weather Card
    'hero.feelsLike': 'உணரப்படும் வெப்பநிலை',
    'hero.high': 'அதிகபட்சம்',
    'hero.low': 'குறைந்தபட்சம்',
    'hero.rainRisk': 'மழை ஆபத்து',
    'hero.uvIndex': 'புற ஊதா குறியீடு (UV)',
    'hero.humidity': 'ஈரப்பதம்',
    'hero.wind': 'காற்று',
    'hero.gpsLocate': 'ஜிபிஎஸ் மூலம் அருகிலுள்ள பூங்காவைக் கண்டறியவும்',
    'hero.addToFav': 'விருப்பங்களில் சேர்க்கவும்',
    'hero.favorited': 'விருப்பமானது',
    'hero.runningTrail': 'பாதை',
    'hero.digitalPass': 'டிஜிட்டல் பாஸ்',

    // Heat Stress & Indices
    'heatStress.title': 'வெப்பமண்டல வெப்ப அழுத்தக் குறியீடு (TP-HSI)',
    'heatStress.moderate': 'மிதமான வெப்ப அழுத்தம்',
    'heatStress.low': 'குறைந்த வெப்ப அழுத்தம்',
    'heatStress.high': 'அதிக வெப்ப அழுத்தம்',
    'heatStress.extreme': 'தீவிர வெப்ப அழுத்தம்',
    'heatStress.advice': 'போதுமான தண்ணீர் அருந்தி, நிழலில் ஓய்வெடுக்கவும்.',

    // Forecasts & Trends
    'forecast.hourly': 'மணிநேர முன்னறிவிப்பு (இன்று)',
    'forecast.rainTrend': 'மழை சாத்தியக்கூறு போக்கு',
    'forecast.4h': '4 மணிநேரம்',
    'forecast.12h': '12 மணிநேரம்',
    'forecast.mssFeed': 'MSS நேரலை ரேடார்',

    // Transport & Parking
    'transport.title': 'நேரலை போக்குவரத்து & பார்க்கிங்',
    'transport.agency': 'LTA DataMall v3',
    'transport.busArrivals': 'பஸ் வருகைகள்',
    'transport.carparkLots': 'கார் நிறுத்துமிடம்',
    'transport.mrtStation': 'MRT ரயில் நிலையம்',
    'transport.away': 'தொலைவில்',
    'transport.arriving': 'வருகிறது',
    'transport.minWalk': 'நிமிட நடை',
    'transport.openLot': 'திறந்த இடம்',

    // Visit Planning & Nearby
    'plan.bestVisitingWindow': 'பார்வையிட சிறந்த நேரம்',
    'plan.button': 'பயணத்தைத் திட்டமிடு',
    'plan.saveShortcut': 'குறுக்குவழியைச் சேமிக்கவும்',
    'nearby.title': 'அருகிலுள்ள சிங்கப்பூர் பூங்காக்கள்',
    'nearby.fullMap': 'முழு வரைபடம் →',
    'alerts.title': 'சமீபத்திய பூங்கா எச்சரிக்கைகள்',
    'alerts.viewAll': 'அனைத்து எச்சரிக்கைகளையும் காண்க →',
    'alerts.noAlerts': 'வானிலை சீராக உள்ளது. எச்சரிக்கைகள் இல்லை.',

    // Footer & Legal
    'footer.copyright': '© 2026 SG ParkWeather. சிங்கப்பூர் பூங்கா வானிலை தரவு.',
    'footer.privacy': 'AdSense & தனியுரிமைக் கொள்கை',
    'cookie.consentText': 'சிங்கப்பூர் PDPA விதிகளுக்கு ஏற்ப குக்கீகள் மற்றும் Google AdSense ஐப் பயன்படுத்துகிறோம்.',
    'cookie.acceptAll': 'அனைத்தையும் ஏற்கவும்',
    'cookie.essentialOnly': 'அவசியம் மட்டும்',
    'cookie.learnMore': 'தனியுரிமைக் கொள்கை'
  },
  ko: {
    // Top Bar & View Switcher
    'view.label': '보기 모드',
    'view.mobile': '모바일',
    'view.desktop': '데스크톱',
    'view.switchToMobile': '모바일 뷰로 전환',
    'view.switchToDesktop': '데스크톱 뷰로 전환',
    'scheduler.label': '30초 자동 동기화',
    'scheduler.synced': '동기화됨',
    'scheduler.paused': '일시중지',
    'scheduler.refresh': '새로고침',
    'language.label': '언어',
    'language.detected': '시스템 언어가 자동으로 감지되었습니다',

    // Navigation
    'nav.parks': '공원',
    'nav.map': '지도',
    'nav.radar': '실시간 레이더',
    'nav.alerts': '날씨 경보',
    'nav.community': '문의 및 소통',
    'nav.dataSource': '데이터 출처',
    'nav.search': '공원 검색...',
    'nav.pass': '디지털 패스',
    'nav.notifications': '알림',

    // Hero & Weather Card
    'hero.feelsLike': '체감',
    'hero.high': '최고',
    'hero.low': '최저',
    'hero.rainRisk': '강수 확률',
    'hero.uvIndex': '자외선 지수 (UV)',
    'hero.humidity': '습도',
    'hero.wind': '풍속',
    'hero.gpsLocate': 'GPS로 가장 가까운 공원 찾기',
    'hero.addToFav': '즐겨찾기 추가',
    'hero.favorited': '즐겨찾기됨',
    'hero.runningTrail': '코스',
    'hero.digitalPass': '디지털 패스',

    // Heat Stress & Indices
    'heatStress.title': '열대 온열 스트레스 지수 (TP-HSI)',
    'heatStress.moderate': '보통 열 스트레스',
    'heatStress.low': '낮은 열 스트레스',
    'heatStress.high': '높은 열 스트레스',
    'heatStress.extreme': '매우 높은 열 스트레스',
    'heatStress.advice': '충분한 수분을 섭취하고 그늘에서 휴식을 취하세요.',

    // Forecasts & Trends
    'forecast.hourly': '오늘 시간별 예보',
    'forecast.rainTrend': '강수 확률 추이',
    'forecast.4h': '4시간',
    'forecast.12h': '12시간',
    'forecast.mssFeed': '싱가포르 기상청(MSS) 실시간 레이더',

    // Transport & Parking
    'transport.title': '실시간 교통 및 주차 정보',
    'transport.agency': 'LTA DataMall v3',
    'transport.busArrivals': '버스 도착 정보',
    'transport.carparkLots': '주차장 잔여 대수',
    'transport.mrtStation': '지하철(MRT) 역',
    'transport.away': '거리',
    'transport.arriving': '도착',
    'transport.minWalk': '분 도보',
    'transport.openLot': '주차 가능',

    // Visit Planning & Nearby
    'plan.bestVisitingWindow': '방문하기 가장 좋은 시간',
    'plan.button': '방문 계획',
    'plan.saveShortcut': '홈 화면 바로가기 추가',
    'nearby.title': '주변 싱가포르 공원',
    'nearby.fullMap': '전체 지도 보기 →',
    'alerts.title': '최근 공원 날씨 경보',
    'alerts.viewAll': '모든 경보 보기 →',
    'alerts.noAlerts': '현재 기상 특보가 없습니다. 안전합니다.',

    // Footer & Legal
    'footer.copyright': '© 2026 SG ParkWeather. 싱가포르 공원 실시간 기상 데이터.',
    'footer.privacy': 'Google AdSense 및 개인정보 처리방침',
    'cookie.consentText': '싱가포르 PDPA 및 정책을 준수하여 맞춤형 콘텐츠와 분석을 위해 쿠키를 사용합니다.',
    'cookie.acceptAll': '모두 허용',
    'cookie.essentialOnly': '필수 항목만',
    'cookie.learnMore': '개인정보 처리방침'
  },
  ja: {
    // Top Bar & View Switcher
    'view.label': '表示モード',
    'view.mobile': 'モバイル',
    'view.desktop': 'デスクトップ',
    'view.switchToMobile': 'モバイル表示に切り替え',
    'view.switchToDesktop': 'デスクトップ表示に切り替え',
    'scheduler.label': '30秒自動更新',
    'scheduler.synced': '同期済み',
    'scheduler.paused': '一時停止中',
    'scheduler.refresh': '更新',
    'language.label': '言語',
    'language.detected': 'システム言語を自動検出しました',

    // Navigation
    'nav.parks': '公園',
    'nav.map': 'マップ',
    'nav.radar': 'リアルタイム雨雲レーダー',
    'nav.alerts': '気象警報',
    'nav.community': 'お問い合わせ',
    'nav.dataSource': 'データソース',
    'nav.search': '公園を検索...',
    'nav.pass': 'デジタルパス',
    'nav.notifications': '通知',

    // Hero & Weather Card
    'hero.feelsLike': '体感温度',
    'hero.high': '最高',
    'hero.low': '最低',
    'hero.rainRisk': '降雨確率',
    'hero.uvIndex': 'UV指数',
    'hero.humidity': '湿度',
    'hero.wind': '風速',
    'hero.gpsLocate': 'GPSで最寄りの公園を特定',
    'hero.addToFav': 'お気に入りに追加',
    'hero.favorited': 'お気に入り済み',
    'hero.runningTrail': 'コース',
    'hero.digitalPass': 'デジタルパス',

    // Heat Stress & Indices
    'heatStress.title': '熱帯熱ストレス指数 (TP-HSI)',
    'heatStress.moderate': '中程度の熱ストレス',
    'heatStress.low': '低い熱ストレス',
    'heatStress.high': '高い熱ストレス',
    'heatStress.extreme': '極めて高い熱ストレス',
    'heatStress.advice': 'こまめな水分補給と木陰での休憩をおすすめします。',

    // Forecasts & Trends
    'forecast.hourly': '本日の1時間毎天気予報',
    'forecast.rainTrend': '降水確率の推移',
    'forecast.4h': '4時間',
    'forecast.12h': '12時間',
    'forecast.mssFeed': 'シンガポール気象局 (MSS) レーダー',

    // Transport & Parking
    'transport.title': 'リアルタイム交通・駐車場情報',
    'transport.agency': 'LTA DataMall v3',
    'transport.busArrivals': 'バス到着時刻',
    'transport.carparkLots': '駐車場空き台数',
    'transport.mrtStation': '最寄りMRT駅',
    'transport.away': '離れています',
    'transport.arriving': 'まもなく到着',
    'transport.minWalk': '分 徒歩',
    'transport.openLot': '空きあり',

    // Visit Planning & Nearby
    'plan.bestVisitingWindow': 'おすすめ訪問時間帯',
    'plan.button': '散策プラン',
    'plan.saveShortcut': 'ホーム画面に追加',
    'nearby.title': '周辺のシンガポール公園',
    'nearby.fullMap': 'マップ全体を見る →',
    'alerts.title': '最新の気象警報・アドバイザリー',
    'alerts.viewAll': 'すべての警報を見る →',
    'alerts.noAlerts': '現在、気象注意報はありません。',

    // Footer & Legal
    'footer.copyright': '© 2026 SG ParkWeather. シンガポールの自然公園気象情報。',
    'footer.privacy': 'Google AdSense & プライバシーポリシー',
    'cookie.consentText': 'シンガポールPDPAおよびGoogleポリシーに基づき、コンテンツの最適化にCookieを使用します。',
    'cookie.acceptAll': 'すべて同意',
    'cookie.essentialOnly': '必須のみ',
    'cookie.learnMore': 'プライバシーポリシー'
  }
};
