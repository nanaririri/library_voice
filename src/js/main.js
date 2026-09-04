/* ============================= DATA ============================= */
const CITIES = ['서울 성동구 성수동','경기 파주시 문발동','인천 남동구 남동공단','경기 김포시 대곶면','서울 강서구 마곡동','경기 이천시 마장면','충남 아산시 배방읍','경기 용인시 기흥구','서울 금천구 가산동','경기 화성시 향남읍','경기 광주시 오포읍','전북 완주군 봉동읍'];
const TIER_LABEL = {1:{txt:'저가형', won:1}, 2:{txt:'중가형', won:2}, 3:{txt:'고가형', won:3}};
const REP_PRODUCTS = ['공기청정기','환기장치','우드 실링팬','인테리어 조명','무드등','식물재배기','스마트 도어락','제습기','블라인드','붙박이 수납장'];
const CEO_NAMES = ['김민준','이서연','박도윤','최지우','정하은','강시우','조서준','윤지안','장하윤','임은우','한재원','오수아'];
const BUSINESS_TYPES = ['제조','유통'];
const MANUFACTURE_COUNTRIES = ['국산','중국','이태리'];
const AREA_CODES = ['02','031','032','041','051','053','062','063'];
function genPhone(idx){
  const area = AREA_CODES[idx % AREA_CODES.length];
  const midLen = area==='02' ? 4 : 3;
  const mid = String(1000 + (idx*13 % 9000)).slice(0, midLen);
  const last = 1000 + (idx*37 % 9000);
  return `${area}-${mid}-${last}`;
}
let _cityIdx = 0;
function pickProducts(){
  const start = _cityIdx % REP_PRODUCTS.length;
  const idxs = [start, (start+3)%REP_PRODUCTS.length, (start+6)%REP_PRODUCTS.length];
  return idxs.map(i=>REP_PRODUCTS[i]).join(', ');
}
function co(name, slug, tier){
  const city = CITIES[_cityIdx % CITIES.length]; _cityIdx++;
  return {
    name, tier, slug,
    homepage: `https://www.${slug}.co.kr`,
    address: `${city} ${20 + (_cityIdx*7 % 60)}-${3 + (_cityIdx*3 % 20)} 자재유통센터`,
    catalog: `${slug}_catalog_2026.pdf`,
    repProducts: pickProducts(),
    businessType: BUSINESS_TYPES[_cityIdx % BUSINESS_TYPES.length],
    manufactureCountry: MANUFACTURE_COUNTRIES[_cityIdx % MANUFACTURE_COUNTRIES.length],
    ceoName: CEO_NAMES[_cityIdx % CEO_NAMES.length],
    phone: genPhone(_cityIdx),
    email: `contact@${slug}.co.kr`
  };
}
const LOGO_IMAGE_OVERRIDES = {
  '부림테크': 'https://raw.githubusercontent.com/nanaririri/ai/main/burim_logo.png'
};
function companyLogo(name, size){
  const override = LOGO_IMAGE_OVERRIDES[name];
  const initial = name.trim().charAt(0);
  if(override){
    const maxW = size*2.3;
    return `<div class="shrink-0 flex items-center justify-center rounded-sm overflow-hidden" style="max-width:${maxW}px; max-height:${size}px;"><img src="${override}" alt="${name}" style="max-width:${maxW}px; max-height:${size}px; width:auto; height:auto;" class="object-contain" loading="lazy" onerror="this.outerHTML='<div class=&quot;font-display font-700&quot; style=&quot;color:var(--ink); font-size:${Math.round(size*0.42)}px;&quot;>${initial}</div>'"/></div>`;
  }
  return `<div class="shrink-0 flex items-center justify-center rounded-sm font-display font-700" style="width:${size*2.3}px; height:${size}px; background:#EEEEEE; color:var(--ink); font-size:${Math.round(size*0.42)}px;">${initial}</div>`;
}

const DATA = {
  interior: {
    key:'interior', label:'인테리어', eyebrow:'INTERIOR MATERIALS',
    desc:'원자재부터 창호, 커튼까지, 실내 공간을 완성하는 마감재를 모았습니다.',
    subs:[
      {id:'raw-material', name:'원자재·부자재', icon:'raw-material', groups:[
        {name:'보드', companies:[
          co('한솔보드','hansol-board',1), co('성창보드','sungchang-board',2)
        ]},
        {name:'앳지', companies:[
          co('삼정엣지테크','samjeong-edgetech',1), co('코리아엣지밴드','korea-edgeband',2)
        ]},
      ]},
      {id:'furniture-living', name:'가구·리빙', icon:'living', groups:[
        {name:'가구부품 및 하드웨어', companies:[
          co('하펠레코리아','hafele-korea',3), co('블룸코리아','blum-korea',3), co('삼익하드웨어','samik-hardware',2), co('리바트','livart',3), co('일룸','iloom',2), co('데스커','desker',2)
        ]},
        {name:'소품', companies:[
          co('AGO','ago',3), co('필립스조명코리아','philips-lighting-korea',3), co('코펜하겐라이팅','copenhagen-lighting',2), co('자코모패브릭','giacomo-fabric',2), co('92 scent','92-scent',2)
        ]},
      ]},
      {id:'kitchen', name:'주방', icon:'kitchen', groups:[
        {name:'주방가구', companies:[
          co('한샘키친바흐','hanssem-kitchenbach',3), co('에넥스','enex-kitchen',2), co('넵스키친','neps-kitchen',2)
        ]},
        {name:'상품', companies:[
          co('키친아트코리아','kitchenart-korea',2), co('한샘리빙웨어','hanssem-livingware',1)
        ]},
        {name:'주방기기', companies:[
          co('인스밸리','insvalley',2), co('신일키친','shinil-kitchen',1), co('하츠주방기기','haatz-kitchen',2)
        ]},
      ]},
      {id:'bath', name:'바스', icon:'bath', groups:[
        {name:'위생도기', companies:[
          co('대림바스','daelim-bath',3), co('계림도자기','gyerim-ceramic',2), co('아메리칸스탠다드코리아','as-korea-bath',3)
        ]},
        {name:'수전/ACC', companies:[
          co('대림수전','daelim-faucet',2), co('아메리칸스탠다드수전','as-faucet',2)
        ]},
        {name:'욕실가구', companies:[
          co('이누스','inus-bath',2), co('로얄앤컴퍼니','royal-company-bath',2)
        ]},
        {name:'천장/기기', companies:[
          co('훌라스마트팬','hula-smartfan',2), co('경동나비엔환기','kyungdong-navien-vent',3)
        ]},
        {name:'샤워시설', companies:[
          co('신영샤워부스','sinyoung-shower',1), co('한샤워시스템','han-shower-system',2)
        ]},
        {name:'시공자재', companies:[
          co('바스코리아자재','bath-korea-materials',1), co('욕실시공자재센터','bathroom-construction-materials',2)
        ]},
      ]},
      {id:'door', name:'도어·중문', icon:'door', groups:[
        {name:'도어', companies:[
          co('예림도어시스템','yerim-door',2), co('우드플러스도어','woodplus-door',2), co('세이프도어코리아','safedoor-korea',3), co('테크슬라이딩도어','tech-slidingdoor',2), co('금강방화도어','geumgang-firedoor',3)
        ]},
        {name:'중문', companies:[
          co('부림테크','burim-tech',3), co('현대중문시스템','hyundai-jungmun',2)
        ]},
        {name:'하드웨어', companies:[
          co('삼익도어하드웨어','samik-door-hardware',2), co('코리아도어힌지','korea-door-hinge',1)
        ]},
      ]},
      {id:'floor', name:'바닥재', icon:'floor', groups:[
        {name:'강마루', companies:[
          co('동화마루','donghwa-floor',2), co('구정마루','gujeong-floor',2), co('한솔마루','hansol-floor',1)
        ]},
        {name:'원목마루', companies:[
          co('한솔원목마루','hansol-solidwood-floor',2)
        ]},
        {name:'타일', companies:[
          co('LX데코타일','lx-decotile',2), co('삼정타일','samjeong-tile',2), co('지엔플로어','gn-floor',1)
        ]},
        {name:'장판', companies:[
          co('LG지분장판','lg-jibun-vinyl',2), co('한화장판','hanwha-vinyl-flooring',2)
        ]},
        {name:'계단재', companies:[
          co('스텝우드','stepwood-stair',1)
        ]},
        {name:'카페트', companies:[
          co('코리아카페트','korea-carpet',2)
        ]},
        {name:'보드', companies:[
          co('마루보드코리아','floorboard-korea',1)
        ]},
      ]},
      {id:'stone', name:'석재', icon:'stone', groups:[
        {name:'세라믹', companies:[
          co('아주스톤','aju-stone',2), co('세라스톤','cerastone',2)
        ]},
        {name:'타일', companies:[
          co('유송타일','yusong-tile',2), co('스톤타일플러스','stonetile-plus',2)
        ]},
        {name:'E스톤', companies:[
          co('엘지하이막','lg-himacs',3), co('삼성스타론','samsung-staron',3)
        ]},
        {name:'MMA', companies:[
          co('듀폰코리안스톤','dupont-koreanstone',2), co('MMA스톤코리아','mma-stone-korea',2)
        ]},
      ]},
      {id:'wall', name:'벽장재', icon:'wall', groups:[
        {name:'벽지', companies:[
          co('신한벽지','shinhan-wallpaper',1), co('LG하우시스벽지','lghausys-wallpaper',2), co('개나리벽지','gaenari-wallpaper',1)
        ]},
        {name:'필름', companies:[
          co('LX인테리어필름','lx-interior-film',2), co('현대필름','hyundai-film',1)
        ]},
        {name:'월패널', companies:[
          co('미가월패널','miga-wallpanel',2), co('포스코휴먼스','posco-humans',3), co('우드메탈월','woodmetal-wall',2), co('소노바닥재월','sono-wallpanel',2), co('한글라스인테리어','hanglass-interior',3)
        ]},
      ]},
      {id:'window-int', name:'창호', icon:'window', groups:[
        {name:'시스템창호', companies:[
          co('영림임업창호','yeonglim-window',2), co('이건창호인테리어','leegun-window-interior',3), co('필로브창호','pillobe-window',2)
        ]},
      ]},
      {id:'curtain', name:'커튼', icon:'curtain', groups:[
        {name:'커튼', companies:[
          co('한섬커튼','hansum-curtain',2), co('코리아블라인드앤커튼','korea-blind-curtain',1)
        ]},
      ]},
      {id:'office', name:'오피스', icon:'office', groups:[
        {name:'가구부품 및 하드웨어', companies:[
          co('퍼시스오피스퍼니처','fursys-office',3), co('시디즈오피스','sidiz-office',2)
        ]},
      ]},
      {id:'installation', name:'시공', icon:'construction-service', groups:[
        {name:'가구시공', companies:[
          co('가구시공전문코리아','furniture-install-korea',2), co('한샘가구시공','hanssem-furniture-install',2)
        ]},
        {name:'주방시공', companies:[
          co('주방시공마스터','kitchen-install-master',2), co('한샘키친시공','hanssem-kitchen-install',2)
        ]},
        {name:'바스시공', companies:[
          co('바스시공프로','bath-install-pro',2), co('욕실시공센터','bathroom-install-center',1)
        ]},
        {name:'오피스시공', companies:[
          co('오피스인테리어시공','office-interior-install',2), co('사무공간시공','office-space-install',2)
        ]},
        {name:'기본공사', companies:[
          co('기본공사전문업체','basic-construction-specialist',2), co('종합인테리어공사','general-interior-construction',2)
        ]},
        {name:'철거', companies:[
          co('철거전문코리아','demolition-korea',2), co('클린철거서비스','clean-demolition-service',1)
        ]},
      ]},
    ]
  },
  construction: {
    key:'construction', label:'건축', eyebrow:'CONSTRUCTION MATERIALS',
    desc:'건물의 얼굴을 완성하는 외장 마감재부터 시공까지, 건축 전반의 기자재를 소개합니다.',
    subs:[
      {id:'construction-work', name:'건축시공', icon:'construction-work', groups:[
        {name:'단열재', companies:[
          co('경질우레탄단열재코리아','urethane-insulation-korea',2), co('케이씨씨외단열','kcc-insulation',3)
        ]},
        {name:'도료', companies:[
          co('삼화페인트외장','samhwa-paint-exterior',2)
        ]},
        {name:'방수재', companies:[
          co('코리아방수시스템','korea-waterproofing',2)
        ]},
        {name:'복합코팅', companies:[
          co('한화복합코팅','hanwha-composite-coating',2)
        ]},
        {name:'블록', companies:[
          co('한일시멘트블록','hanil-cement-block',2)
        ]},
        {name:'흡음재', companies:[
          co('일흥건영','ilheung-geonyeong',2)
        ]},
        {name:'유리', companies:[
          co('한글라스','hanglass-glass',3), co('KCC글라스','kcc-glass',3)
        ]},
      ]},
      {id:'outdoor-floor', name:'야외 바닥재', icon:'outdoor-floor', groups:[
        {name:'바닥재', companies:[
          co('웨스턴레드시더데크','western-redcedar-deck',3), co('이지우드데크','easywood-deck',1), co('서울데크마루','seoul-deck-maru',2), co('컴포시텍','composytec',2), co('그린데크컴포지트','greendeck-composite',1), co('에코우드컴포지트','ecowood-composite',2)
        ]},
      ]},
      {id:'facade', name:'외장재', icon:'facade', groups:[
        {name:'외장재', companies:[
          co('스타코코리아','stucco-korea',2), co('징크코리아','zinc-korea',3), co('알루코사이딩','alco-siding',2), co('동양강판외장재','dongyang-steel-exterior',2), co('알코텍','alcotec-acm',2), co('케이에이엘','kal-acm',2), co('대신ACM','daesin-acm',1), co('이건창호','leegun-window',3), co('LX하우시스시스템창호','lxhausys-window',3), co('영림임업외부창호','yeonglim-exterior-window',2), co('알루텍커튼월','alutec-curtainwall',3), co('한화L&C커튼월','hanwha-lnc-curtainwall',3), co('신성이엔지커튼월','sinsung-eng-curtainwall',2)
        ]},
      ]},
      {id:'sculpture', name:'조형물', icon:'sculpture', groups:[
        {name:'조형물', companies:[
          co('아트스케이프조형','artscape-sculpture',2), co('코리아조형디자인','korea-sculpture-design',1)
        ]},
      ]},
      {id:'outdoor-furniture', name:'야외가구', icon:'outdoor', groups:[
        {name:'야외가구', companies:[
          co('아웃도어리빙웍스','outdoor-living-works',2), co('그린파고라','green-pergola',2), co('테라스퍼니처코리아','terrace-furniture-korea',3)
        ]},
      ]},
      {id:'architecture-design', name:'건축설계', icon:'architecture-design', groups:[
        {name:'건축설계', companies:[
          co('SITE LESS','site-less',3), co('건축설계스튜디오104','studio104-architecture',3)
        ]},
      ]},
      {id:'modular-house', name:'모듈러하우스', icon:'modular-house', groups:[
        {name:'모듈러하우스', companies:[
          co('그린모듈러하우스','green-modular-house',2), co('스마트모듈러코리아','smart-modular-korea',2)
        ]},
      ]},
      {id:'construction-service', name:'시공', icon:'construction-service', groups:[
        {name:'시공', companies:[
          co('한빛종합건설','hanbit-construction',2), co('대성시공','daesung-construction',1)
        ]},
      ]},
      {id:'etc', name:'기타', icon:'wall', groups:[
        {name:'기타', companies:[
          co('워크업','workup',2), co('종합자재상사','general-materials-trading',1)
        ]},
      ]},
    ]
  }
};

/* ============================= COMPANY DATA OVERRIDES ============================= */
const COMPANY_OVERRIDES = {
  '부림테크': {repProducts:'자기부상중문', address:'경기도 남양주시 진접읍 경복대로 512번길 15-1', homepage:'http://www.boolimtech.com/default/mp1/mp1_sub6.php?sub=06'},
  '유송타일': {repProducts:'빅슬랩 타일 수입 업체', address:'서울특별시 강남구 논현로127길 7', homepage:'https://www.usong.co.kr/'},
  '아주스톤': {repProducts:'천연석 수입 및 시공 납품', address:'경상북도 경산시 와촌면 불굴사길 34', homepage:'https://www.ajustone.com/'},
  '포스코휴먼스': {repProducts:'클리닝', address:'경상북도 포항시 남구 동해안로6213번길 15-1 포스코휴먼스', homepage:'https://www.poscohumans.com/kr/main.do'},
  '일흥건영': {repProducts:'흡음 기능 패널', address:'경기도 파주시 탄현면 축현산단로 88-25', homepage:'https://ganet.co.kr/'},
  '미가월패널': {repProducts:'월패널, 루버, 몰딩류 업체', address:'경기도 파주시 월롱면 휴암로 117번길 45', homepage:'https://www.migaworld.com/'},
  'AGO': {repProducts:'펜던트 조명', address:'서울특별시 중구 산림동 을지로 157', homepage:'https://agolighting.com/#/main'},
  '92 scent': {repProducts:'감성 디퓨저, 캔들', address:'경기 평택시 장안웃길 56 206호 BI-004호', homepage:'https://92scent.com/'},
  'SITE LESS': {repProducts:'건축, 도시전략, 인테리어, 전시, 공간브랜딩', address:'경기도 평택시 장안웃길 56 206호 BI-004호', homepage:'https://sitelessgroup.com/'},
  '워크업': {repProducts:'워크웨어(작업복): 선풍기 조끼, 방풍 자켓, 안전 조끼 등', address:'경기도 포천시 호국로 56', homepage:'https://www.workupkorea.com/'},
};
Object.values(DATA).forEach(main=>{
  main.subs.forEach(sub=>{
    sub.groups.forEach(group=>{
      group.companies.forEach(c=>{
        const ov = COMPANY_OVERRIDES[c.name];
        if(ov){
          if(ov.repProducts) c.repProducts = ov.repProducts;
          if(ov.address) c.address = ov.address;
          if(ov.homepage) c.homepage = ov.homepage;
        }
        c.registered = !!ov;
      });
    });
  });
});

/* ============================= ICONS ============================= */
const ICONS = {
  door: `<rect x="6" y="3" width="12" height="18" rx="0.5"/><circle cx="14.5" cy="12" r="0.6" fill="currentColor" stroke="none"/><line x1="3" y1="21" x2="21" y2="21"/>`,
  floor: `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><line x1="8" y1="3" x2="8" y2="9"/><line x1="16" y1="9" x2="16" y2="15"/><line x1="6" y1="15" x2="6" y2="21"/>`,
  bath: `<path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3z"/><path d="M4 12V8a2 2 0 0 1 2-2"/><line x1="8" y1="4" x2="8" y2="7"/><line x1="3" y1="20" x2="3" y2="21.5"/><line x1="21" y1="20" x2="21" y2="21.5"/>`,
  stone: `<path d="M12 2l8 5-2 13H6L4 7z"/><line x1="12" y1="2" x2="12" y2="20"/><line x1="6" y1="9" x2="18" y2="9"/>`,
  wall: `<rect x="3" y="3" width="18" height="18" rx="0.5"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="15" x2="15" y2="21"/>`,
  kitchen: `<path d="M4 21V9a2 2 0 0 1 2-2h1"/><rect x="7" y="7" width="14" height="4" rx="0.5"/><line x1="9" y1="14" x2="9" y2="21"/><line x1="14" y1="14" x2="14" y2="21"/><line x1="19" y1="14" x2="19" y2="21"/><line x1="4" y1="21" x2="21" y2="21"/>`,
  living: `<path d="M4 12v6h16v-6"/><path d="M4 12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2"/><line x1="4" y1="15" x2="4" y2="18"/><line x1="20" y1="15" x2="20" y2="18"/><line x1="6" y1="10" x2="6" y2="6"/><line x1="18" y1="10" x2="18" y2="6"/>`,
  window: `<rect x="3" y="3" width="18" height="18" rx="0.5"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/>`,
  facade: `<rect x="3" y="4" width="18" height="4"/><rect x="3" y="10" width="18" height="4"/><rect x="3" y="16" width="18" height="4"/>`,
  outdoor: `<path d="M12 2c3 3 5 6 5 9a5 5 0 0 1-10 0c0-3 2-6 5-9z"/><line x1="12" y1="15" x2="12" y2="22"/>`,
  composite: `<path d="M12 3l9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 16l9 4 9-4"/>`,
  'raw-material': `<rect x="4" y="6" width="16" height="12" rx="0.5"/><line x1="4" y1="10.5" x2="20" y2="10.5"/><line x1="4" y1="14.5" x2="20" y2="14.5"/>`,
  office: `<rect x="9" y="4" width="6" height="8" rx="0.5"/><line x1="12" y1="12" x2="12" y2="14.5"/><line x1="3" y1="14.5" x2="21" y2="14.5"/><line x1="6" y1="16.5" x2="6" y2="20"/><line x1="18" y1="16.5" x2="18" y2="20"/><line x1="4" y1="20" x2="20" y2="20"/>`,
  curtain: `<line x1="4" y1="3" x2="4" y2="21"/><line x1="20" y1="3" x2="20" y2="21"/><path d="M8 3c0 4.5 2 4.5 2 9s-2 4.5-2 9"/><path d="M14 3c0 4.5 2 4.5 2 9s-2 4.5-2 9"/>`,
  sculpture: `<path d="M12 2c2 2.4 4 5.4 4 8.2a4 4 0 0 1-8 0c0-2.8 2-5.8 4-8.2z"/><line x1="12" y1="14.2" x2="12" y2="18"/><line x1="8.5" y1="21" x2="15.5" y2="21"/>`,
  'architecture-design': `<rect x="3" y="3" width="18" height="18" rx="0.5"/><line x1="7.5" y1="7" x2="7.5" y2="17"/><line x1="7.5" y1="7" x2="17" y2="7"/><line x1="7.5" y1="12" x2="13" y2="12"/>`,
  'construction-work': `<path d="M6 21V10l6-6 6 6v11"/><line x1="3" y1="21" x2="21" y2="21"/><line x1="9" y1="21" x2="9" y2="14"/><line x1="15" y1="21" x2="15" y2="14"/>`,
  'construction-service': `<path d="M14.5 6.5a3.5 3.5 0 0 1-4.7 4.7L5 16l3 3 4.8-4.8a3.5 3.5 0 0 1 4.7-4.7l-2.3 2.3-2-2z"/>`,
  'outdoor-floor': `<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12.5" x2="21" y2="12.5"/><line x1="3" y1="18" x2="21" y2="18"/><path d="M12 2c2.4 2.4 4 5 4 7.2"/>`,
};
function icon(key, cls){
  return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${ICONS[key]||ICONS.wall}</svg>`;
}
function handleSubImgError(imgEl, iconKey){
  const wrap = imgEl.parentElement;
  if(!wrap) return;
  wrap.innerHTML = `<div class="w-full h-full flex items-center justify-center" style="color:var(--accent)">${icon(iconKey,'w-6 h-6')}</div>`;
}
// 모듈 스크립트는 최상위 함수를 전역에 노출하지 않으므로, HTML의 인라인 onerror="handleSubImgError(...)"에서
// 호출할 수 있도록 명시적으로 window에 등록합니다.
window.handleSubImgError = handleSubImgError;

/* material-swatch style gradients standing in for product photography */
const SWATCHES = [
  'linear-gradient(150deg,#dbe4ff,#a9bcff)',
  'linear-gradient(150deg,#e6e6e6,#bdbdbd)',
  'linear-gradient(150deg,#e2e9ff,#8fa3f2)',
  'linear-gradient(150deg,#ececec,#c8c8c8)',
  'linear-gradient(150deg,#dee6ff,#9fb0e8)',
  'linear-gradient(150deg,#eaeaea,#c2c2c2)',
];
function swatch(i){ return SWATCHES[i % SWATCHES.length]; }

/* 취급 제품 카드에 표시할 예시 스펙(용도/소재/색상/규격/무게) — 프로토타입 더미 데이터 */
const PRODUCT_PURPOSES = ['실내 마감재','실외 마감재','주거공간용','상업공간용','리모델링용','신축 시공용'];
const PRODUCT_MATERIALS = ['원목','합성수지(PVC)','알루미늄','스틸','세라믹','강화유리','천연석','MDF','패브릭'];
const PRODUCT_COLORS = ['화이트','베이지','그레이','블랙','우드톤','아이보리','네이비','그린'];
function productSpecs(i){
  return {
    purpose: PRODUCT_PURPOSES[i % PRODUCT_PURPOSES.length],
    material: PRODUCT_MATERIALS[i % PRODUCT_MATERIALS.length],
    color: PRODUCT_COLORS[i % PRODUCT_COLORS.length],
    size: `W${800 + (i*37 % 400)} x H${2000 + (i*53 % 300)} x D${30 + (i*13 % 40)}mm`,
    weight: `${(2 + (i*7 % 40)/10).toFixed(1)}kg`
  };
}

/* generic product line-up per subcategory (dummy prototype data) */
const PRODUCT_TEMPLATES = {
  'door': ['화이트 무늬목 도어','블랙 프레임 도어','방음 도어','슬라이딩 폴딩도어'],
  'floor': ['오크 강마루','헤링본 마루','대리석 데코타일','SPC 바닥재'],
  'bath': ['월행어 양변기','세라믹 세면기','프리스탠딩 욕조','스퀘어 샤워부스'],
  'stone': ['카라라 대리석 슬라브','트래버틴 타일','인조대리석 상판','현무암 판석'],
  'wall': ['합지 벽지','친환경 실크벽지','우드슬랫 벽패널','메탈릭 벽패널'],
  'kitchen': ['ㄱ자 주방가구','아일랜드 식탁형 키친','언더씽크 수전','빌트인 인덕션'],
  'living': ['모듈러 소파','원목 다이닝 테이블','펜던트 조명','리넨 커튼 패브릭'],
  'window-int': ['3연동 중문','스윙 도어형 중문','유리 파티션','알루미늄 프레임 창호'],
  'facade': ['스타코 마감 시스템','알루미늄 징크 사이딩','단열 드라이비트','컬러강판 외장재'],
  'outdoor': ['천연목 데크재','합성목 데크타일','야외 파고라 세트','알루미늄 야외가구'],
  'composite': ['ACM 알루미늄 복합패널','컴포지트 우드데크','방화 인증 복합패널','논슬립 복합바닥재'],
  'window-ext': ['시스템 삼중창호','커튼월 유닛','로이유리 시스템창','슬라이딩 시스템도어'],
};
function getProducts(subId){
  const names = PRODUCT_TEMPLATES[subId] || ['대표 제품 A','대표 제품 B','대표 제품 C','대표 제품 D'];
  return names.map((n,i)=>({ name:n, bg: swatch(i) }));
}

/* per-company real product photos (overrides the generic swatch thumbnails) */
const PRODUCT_IMAGE_OVERRIDES = {
  '부림테크': [
    { name:'자기부상중문', img:'https://raw.githubusercontent.com/nanaririri/ai/main/burim01.JPG' },
    { name:'자기부상중문', img:'https://raw.githubusercontent.com/nanaririri/ai/main/burim02.JPG' },
    { name:'자기부상중문', img:'https://raw.githubusercontent.com/nanaririri/ai/main/burim03.JPG' },
    { name:'자기부상중문', img:'https://raw.githubusercontent.com/nanaririri/ai/main/burim04.JPG' },
  ],
  '유송타일': [
    { name:'유송타일', img:'https://raw.githubusercontent.com/nanaririri/ai/main/yu01.jpg' },
    { name:'유송타일', img:'https://raw.githubusercontent.com/nanaririri/ai/main/yu02.png' },
    { name:'유송타일', img:'https://raw.githubusercontent.com/nanaririri/ai/main/yu03.jpg' },
    { name:'유송타일', img:'https://raw.githubusercontent.com/nanaririri/ai/main/yu04.jpg' },
  ],
  '아주스톤': [
    { name:'아주스톤', img:'https://raw.githubusercontent.com/nanaririri/ai/main/aju01.JPG' },
    { name:'아주스톤', img:'https://raw.githubusercontent.com/nanaririri/ai/main/aju02.JPG' },
    { name:'아주스톤', img:'https://raw.githubusercontent.com/nanaririri/ai/main/aju03.JPG' },
    { name:'아주스톤', img:'https://raw.githubusercontent.com/nanaririri/ai/main/aju04.JPG' },
  ],
  '포스코휴먼스': [
    { name:'포스코휴먼스', img:'https://raw.githubusercontent.com/nanaririri/ai/main/pos01.JPG' },
    { name:'포스코휴먼스', img:'https://raw.githubusercontent.com/nanaririri/ai/main/pos02.JPG' },
    { name:'포스코휴먼스', img:'https://raw.githubusercontent.com/nanaririri/ai/main/pos03.JPG' },
    { name:'포스코휴먼스', img:'https://raw.githubusercontent.com/nanaririri/ai/main/pos04.JPG' },
  ],
  '일흥건영': [
    { name:'일흥건영', img:'https://raw.githubusercontent.com/nanaririri/ai/main/il01.JPG' },
    { name:'일흥건영', img:'https://raw.githubusercontent.com/nanaririri/ai/main/il02.JPG' },
    { name:'일흥건영', img:'https://raw.githubusercontent.com/nanaririri/ai/main/il03.JPG' },
    { name:'일흥건영', img:'https://raw.githubusercontent.com/nanaririri/ai/main/il04.JPG' },
  ],
  '미가월패널': [
    { name:'미가월패널', img:'https://raw.githubusercontent.com/nanaririri/ai/main/mi01.JPG' },
    { name:'미가월패널', img:'https://raw.githubusercontent.com/nanaririri/ai/main/mi02.JPG' },
    { name:'미가월패널', img:'https://raw.githubusercontent.com/nanaririri/ai/main/mi03.JPG' },
    { name:'미가월패널', img:'https://raw.githubusercontent.com/nanaririri/ai/main/mi04.JPG' },
  ],
  'AGO': [
    { name:'AGO', img:'https://raw.githubusercontent.com/nanaririri/ai/main/ago01.JPG' },
    { name:'AGO', img:'https://raw.githubusercontent.com/nanaririri/ai/main/ago02.jpg' },
    { name:'AGO', img:'https://raw.githubusercontent.com/nanaririri/ai/main/ago03.JPG' },
    { name:'AGO', img:'https://raw.githubusercontent.com/nanaririri/ai/main/ago04.JPG' },
  ],
  '92 scent': [
    { name:'92 scent', img:'https://raw.githubusercontent.com/nanaririri/ai/main/sc01.JPG' },
    { name:'92 scent', img:'https://raw.githubusercontent.com/nanaririri/ai/main/sc02.JPG' },
    { name:'92 scent', img:'https://raw.githubusercontent.com/nanaririri/ai/main/sc03.JPG' },
    { name:'92 scent', img:'https://raw.githubusercontent.com/nanaririri/ai/main/sc04.JPG' },
  ],
  'SITE LESS': [
    { name:'SITE LESS', img:'https://raw.githubusercontent.com/nanaririri/ai/main/site01.JPG' },
    { name:'SITE LESS', img:'https://raw.githubusercontent.com/nanaririri/ai/main/site02.JPG' },
    { name:'SITE LESS', img:'https://raw.githubusercontent.com/nanaririri/ai/main/site03.JPG' },
    { name:'SITE LESS', img:'https://raw.githubusercontent.com/nanaririri/ai/main/site04.JPG' },
  ],
  '워크업': [
    { name:'워크업', img:'https://raw.githubusercontent.com/nanaririri/ai/main/wo01.JPG' },
    { name:'워크업', img:'https://raw.githubusercontent.com/nanaririri/ai/main/wo02.JPG' },
    { name:'워크업', img:'https://raw.githubusercontent.com/nanaririri/ai/main/wo03.JPG' },
    { name:'워크업', img:'https://raw.githubusercontent.com/nanaririri/ai/main/wo04.JPG' },
  ],
};

/* ============================= SEARCH ============================= */
function performSearch(query){
  const box = document.getElementById('search-results');
  const clearBtn = document.getElementById('search-clear');
  if(!box) return;
  const q = query.trim().toLowerCase();
  if(clearBtn) clearBtn.classList.toggle('hidden', q.length===0);

  if(!q){ box.classList.add('hidden'); box.innerHTML=''; return; }

  const results = [];
  Object.values(DATA).forEach(main=>{
    main.subs.forEach(sub=>{
      if(sub.name.toLowerCase().includes(q)){
        results.push({type:'sub', mainKey:main.key, subId:sub.id, title:sub.name, subtitle:`${main.label} 카테고리`});
      }
      sub.groups.forEach(group=>{
        group.companies.forEach(c=>{
          if(c.name.toLowerCase().includes(q)){
            results.push({type:'company', mainKey:main.key, subId:sub.id, name:c.name, title:c.name, subtitle:`${main.label} · ${sub.name}`});
          } else if(c.repProducts && c.repProducts.toLowerCase().includes(q)){
            results.push({type:'company', mainKey:main.key, subId:sub.id, name:c.name, title:c.name, subtitle:`${main.label} · ${sub.name} · ${c.repProducts}`});
          }
        });
      });
    });
  });

  if(results.length===0){
    box.innerHTML = `<div class="px-5 py-4 text-sm" style="color:var(--ink-soft)">검색 결과가 없습니다</div>`;
    box.classList.remove('hidden');
    return;
  }

  box.innerHTML = results.slice(0,8).map(r=>`
    <button data-action="search-select" data-type="${r.type}" data-main="${r.mainKey}" data-sub="${r.subId}" ${r.type==='company'?`data-name="${encodeURIComponent(r.name)}"`:''} class="w-full text-left flex items-center justify-between gap-3 px-5 py-3.5 border-b last:border-b-0 transition-colors" style="border-color:var(--border)" onmouseover="this.style.background='var(--bg)'" onmouseout="this.style.background='transparent'">
      <div class="min-w-0">
        <div class="text-sm font-medium truncate" style="color:var(--ink)">${r.title}</div>
        <div class="text-xs mt-0.5" style="color:var(--gray)">${r.subtitle}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0" style="color:var(--gray)"><path d="M9 6l6 6-6 6"/></svg>
    </button>
  `).join('');
  box.classList.remove('hidden');
}
function clearSearch(){
  const input = document.getElementById('search-input');
  const box = document.getElementById('search-results');
  if(input) input.value = '';
  if(box){ box.classList.add('hidden'); box.innerHTML=''; }
  const clearBtn = document.getElementById('search-clear');
  if(clearBtn) clearBtn.classList.add('hidden');
}

/* ============================= VOICE SEARCH (음성 검색) ============================= */
function getSpeechRecognitionCtor(){
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

let voiceRecognition = null;
let voiceListening = false;

function setVoiceStatus(text){
  const status = document.getElementById('voice-status');
  if(status) status.textContent = text || '';
}

// 기존 검색 결과 드롭다운(#search-results)을 그대로 재사용해 안내/오류 메시지를 표시합니다.
function showSearchMessage(message){
  const box = document.getElementById('search-results');
  if(!box) return;
  box.innerHTML = `<div class="px-5 py-4 text-sm" style="color:var(--ink-soft)">${message}</div>`;
  box.classList.remove('hidden');
}

// 음성 인식 결과를 기존 검색창에 반영하고, 기존 검색 로직(performSearch)을 그대로 실행합니다.
function setSearchQueryFromVoice(text){
  const input = document.getElementById('search-input');
  if(input) input.value = text;
  performSearch(text);
}

function setMicVisualState(uiState){
  const micBtn = document.getElementById('search-mic');
  if(!micBtn) return;
  micBtn.classList.remove('voice-mic-listening','voice-mic-error');
  if(uiState==='listening') micBtn.classList.add('voice-mic-listening');
  if(uiState==='error') micBtn.classList.add('voice-mic-error');
  micBtn.setAttribute('aria-pressed', uiState==='listening' ? 'true' : 'false');
}

// 브라우저가 SpeechRecognition을 지원하지 않으면 마이크 버튼을 숨겨 기존 검색 기능에 영향을 주지 않습니다.
function initVoiceSearchButton(){
  const micBtn = document.getElementById('search-mic');
  if(!micBtn) return;
  if(getSpeechRecognitionCtor()){
    micBtn.classList.remove('hidden');
  } else {
    micBtn.classList.add('hidden');
    micBtn.disabled = true;
  }
}

function stopVoiceSearch(){
  if(voiceRecognition){
    try{ voiceRecognition.abort(); }catch(e){}
  }
  voiceRecognition = null;
  voiceListening = false;
  setMicVisualState('idle');
}

function startVoiceSearch(){
  const SR = getSpeechRecognitionCtor();
  if(!SR){
    showSearchMessage('현재 브라우저에서는 음성 검색을 지원하지 않습니다.');
    return;
  }

  // 이미 듣고 있는 중이면 버튼을 다시 눌러 취소할 수 있도록 처리합니다.
  if(voiceListening){
    stopVoiceSearch();
    setVoiceStatus('음성 검색이 취소되었습니다.');
    return;
  }

  let recognition;
  try{
    recognition = new SR();
  }catch(e){
    showSearchMessage('음성 인식을 시작할 수 없습니다.');
    return;
  }
  voiceRecognition = recognition;

  recognition.lang = 'ko-KR';
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = ()=>{
    voiceListening = true;
    setMicVisualState('listening');
    setVoiceStatus('음성 입력을 듣고 있습니다.');
  };

  recognition.onresult = (e)=>{
    let finalTranscript = '';
    let interimTranscript = '';
    for(let i=e.resultIndex; i<e.results.length; i++){
      const transcript = e.results[i][0].transcript;
      if(e.results[i].isFinal) finalTranscript += transcript;
      else interimTranscript += transcript;
    }
    if(finalTranscript){
      setSearchQueryFromVoice(finalTranscript.trim());
    } else if(interimTranscript){
      setSearchQueryFromVoice(interimTranscript);
    }
  };

  recognition.onerror = (e)=>{
    let msg = '음성 인식 중 오류가 발생했습니다.';
    if(e.error==='not-allowed' || e.error==='permission-denied' || e.error==='service-not-allowed'){
      msg = '마이크 사용 권한이 필요합니다.';
    } else if(e.error==='no-speech'){
      msg = '음성이 인식되지 않았습니다. 다시 시도해주세요.';
    } else if(e.error==='network'){
      msg = '네트워크 오류로 음성 검색을 사용할 수 없습니다.';
    } else if(e.error==='aborted'){
      msg = '';
    }
    if(msg) showSearchMessage(msg);
    setVoiceStatus(msg || '음성 검색이 취소되었습니다.');
    setMicVisualState('error');
    setTimeout(()=>{ setMicVisualState('idle'); }, 600);
  };

  recognition.onend = ()=>{
    voiceListening = false;
    voiceRecognition = null;
    setMicVisualState('idle');
  };

  try{
    recognition.start();
  }catch(e){
    voiceRecognition = null;
    setMicVisualState('error');
    showSearchMessage('음성 인식을 시작할 수 없습니다.');
    setTimeout(()=>{ setMicVisualState('idle'); }, 600);
  }
}

/* ============================= LISTMAP ============================= */
function renderListMap(filterQuery){
  const body = document.getElementById('listmap-body');
  if(!body) return;
  const q = (filterQuery || '').trim().toLowerCase();

  let total = 0;
  let html = '';

  Object.values(DATA).forEach(main=>{
    let mainHtml = '';
    main.subs.forEach(sub=>{
      let subHtml = '';
      sub.groups.forEach(group=>{
        const companies = group.companies.filter(c=> !q || c.name.toLowerCase().includes(q) || (c.repProducts && c.repProducts.toLowerCase().includes(q)));
        if(companies.length===0) return;
        total += companies.length;
        subHtml += `
          <div class="mb-3">
            <p class="text-[11.5px] font-medium mb-2" style="color:var(--gray)">${group.name}</p>
            <div class="flex flex-wrap gap-2">
              ${companies.map(c=>`<button data-action="listmap-select" data-main="${main.key}" data-sub="${sub.id}" data-name="${encodeURIComponent(c.name)}" class="listmap-chip">${c.name}</button>`).join('')}
            </div>
          </div>`;
      });
      if(subHtml){
        mainHtml += `
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-3">
              <h4 class="font-semibold text-sm" style="color:var(--ink)">${sub.name}</h4>
            </div>
            ${subHtml}
          </div>`;
      }
    });
    if(mainHtml){
      html += `
        <div class="mb-9">
          <div class="flex items-baseline gap-2 mb-4 pb-2 border-b" style="border-color:var(--border)">
            <h3 class="font-display font-700 text-xl tracking-tight" style="color:var(--ink)">${main.label}</h3>
          </div>
          ${mainHtml}
        </div>`;
    }
  });

  if(!html){
    body.innerHTML = `<div class="text-sm py-12 text-center" style="color:var(--ink-soft)">일치하는 업체가 없습니다</div>`;
    return;
  }

  body.innerHTML = `<p class="font-mono text-[11px] mb-6" style="color:var(--gray)">총 ${total}개 업체</p>` + html;
}
function showListMapUI(){
  document.getElementById('listmap-root').classList.remove('listmap-hidden');
  const filterInput = document.getElementById('listmap-filter');
  if(filterInput) filterInput.value = '';
  renderListMap('');
}
function hideListMapUI(){
  document.getElementById('listmap-root').classList.add('listmap-hidden');
}
function openListMap(){
  listmapOpen = true;
  showListMapUI();
  pushHistoryState();
}
function closeListMap(){
  if(!listmapOpen) return;
  listmapOpen = false;
  hideListMapUI();
  pushHistoryState();
}

/* ============================= STATE ============================= */
const state = { step:1, mainKey:null, subId:null, filter:'ALL' };

const STAGES = [
  {n:'01', label:'분야 선택'},
  {n:'02', label:'카테고리'},
  {n:'03', label:'업체 리스트'},
  {n:'04', label:'상세 정보'},
];

/* ============================= HELPERS ============================= */
function getMain(){ return state.mainKey ? DATA[state.mainKey] : null; }
function getSub(){
  const m = getMain();
  if(!m) return null;
  return m.subs.find(s=>s.id===state.subId) || null;
}
function wonDots(tier){
  let out = '';
  for(let i=1;i<=3;i++){ out += `<span class="won-dot ${i<=tier?'on':''}"></span>`; }
  return out;
}

/* ============================= RENDER: RAIL ============================= */
function renderRail(){
  const desktop = document.getElementById('rail-desktop');
  const mobile = document.getElementById('rail-mobile');

  let d = '';
  STAGES.forEach((s, i)=>{
    const idx = i+1;
    const status = idx < state.step ? 'done' : (idx === state.step ? 'current' : '');
    const clickable = idx <= state.step;
    d += `
      <div class="rail-item ${status} flex flex-col items-center ${clickable?'cursor-pointer':'cursor-default'}" ${clickable?`data-action="goto-step" data-step="${idx}"`:''}>
        <div class="rail-num font-display font-700 text-[11px] mb-1.5" style="color:var(--gray)">${s.n}</div>
        <div class="rail-dot"></div>
        ${idx < STAGES.length ? `<div class="rail-line" style="height:52px; margin:6px 0;"></div>` : ''}
      </div>`;
  });
  desktop.innerHTML = d;

  desktop.querySelectorAll('.rail-item').forEach((el,i)=>{
    el.title = STAGES[i].label;
  });

  let m = `<div class="flex items-center gap-2 pb-1 overflow-x-auto">`;
  STAGES.forEach((s,i)=>{
    const idx = i+1;
    const status = idx < state.step ? 'done' : (idx === state.step ? 'current' : '');
    const clickable = idx <= state.step;
    m += `
      <div class="rail-item ${status} flex items-center gap-1.5 shrink-0 ${clickable?'cursor-pointer':''}" ${clickable?`data-action="goto-step" data-step="${idx}"`:''}>
        <div class="rail-dot"></div>
        <span class="font-mono text-[10px]" style="color:${idx===state.step?'var(--accent-2)':'var(--gray)'}">${s.n} ${s.label}</span>
      </div>
      ${idx<STAGES.length?`<div style="width:16px;height:1px;background:var(--border)"></div>`:''}
    `;
  });
  m += `</div>`;
  mobile.innerHTML = m;
}

/* ============================= RENDER: BREADCRUMB ============================= */
function renderBreadcrumb(){
  const el = document.getElementById('breadcrumb');
  const parts = [{label:'전체', step:1}];
  const m = getMain();
  if(m) parts.push({label:m.label, step:2});
  const s = getSub();
  if(s) parts.push({label:s.name, step:3});
  if(state.step===3 && state.filter !== 'ALL') parts.push({label:state.filter, step:3});

  let html = '';
  parts.forEach((p,i)=>{
    const last = i===parts.length-1;
    html += `<button class="crumb-btn font-medium ${last?'':'underline-offset-2'}" data-action="goto-step" data-step="${p.step}" style="${last?'color:var(--ink); pointer-events:none;':''}">${p.label}</button>`;
    if(!last) html += `<span style="color:var(--gray)">›</span>`;
  });

  const backHtml = state.step>1 ? `
    <button data-action="back" class="flex items-center gap-1 mr-2 font-semibold px-2.5 py-1 rounded-full" style="color:var(--accent); background:var(--accent-soft)">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 18l-6-6 6-6"/></svg>
      이전
    </button>` : '';

  el.innerHTML = backHtml + html;
}

/* ============================= RENDER: STEP 1 ============================= */
/* ============================= SUB CATEGORY IMAGES ============================= */
const SUB_IMAGES = {
  'door': 'https://raw.githubusercontent.com/nanaririri/ai/main/door.JPG',
  'floor': 'https://raw.githubusercontent.com/nanaririri/ai/main/floor.JPG',
  'bath': 'https://raw.githubusercontent.com/nanaririri/ai/main/bath.JPG',
  'stone': 'https://raw.githubusercontent.com/nanaririri/ai/main/rock.JPG',
  'wall': 'https://raw.githubusercontent.com/nanaririri/ai/main/wall.JPG',
  'kitchen': 'https://raw.githubusercontent.com/nanaririri/ai/main/kitchen.JPG',
  'furniture-living': 'https://raw.githubusercontent.com/nanaririri/ai/main/living.JPG',
  'window-int': 'https://raw.githubusercontent.com/nanaririri/ai/main/window.JPG',
  'facade': 'https://raw.githubusercontent.com/nanaririri/ai/main/material.jpg',
  'outdoor-furniture': 'https://raw.githubusercontent.com/nanaririri/ai/main/outdoor.JPG',
  'modular-house': 'https://raw.githubusercontent.com/nanaririri/ai/main/com.JPG',
};

function stepOneHTML(){
  return `
  <div class="fade-up">
    <div class="mb-8 md:mb-10">
      <h1 class="font-display font-900 text-[13vw] sm:text-6xl md:text-7xl leading-[0.92] tracking-tight" style="color:var(--ink)">
        공간을 만드는<br/><span class="block mt-[16px]">자재를 찾아보세요</span>
      </h1>
      <p class="mt-5 text-[15px] md:text-base max-w-md" style="color:var(--ink-soft)">
        인테리어 마감재부터 건축 기자재까지, 분야를 선택하고 원하는 업체 정보를 확인하세요.
      </p>
    </div>

    <div class="relative max-w-xl mb-10 md:mb-14">
      <div class="flex items-center gap-3 rounded-full pl-5 pr-2 py-2 border" style="border-color:var(--border); background:var(--surface)">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gray); flex-shrink:0"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="search-input" type="text" autocomplete="off" placeholder="업체명, 카테고리 또는 대표제품을 검색해보세요.(예: 도어, 한솔도어)" class="flex-1 outline-none text-sm bg-transparent py-1.5" style="color:var(--ink)" />
        <button id="search-clear" data-action="search-clear" class="hidden shrink-0 mr-1" style="color:var(--gray)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <button type="button" id="search-mic" data-action="voice-search" aria-label="음성 검색" aria-pressed="false" class="voice-mic-btn hidden">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        </button>
        <button type="button" data-action="search-submit" aria-label="검색" class="shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold" style="background:var(--ink); color:#fff">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          검색
        </button>
      </div>
      <div id="search-results" class="hidden absolute left-0 right-0 mt-2 z-20 rounded-sm border shadow-lg overflow-hidden max-h-80 overflow-y-auto" style="border-color:var(--border); background:var(--surface)"></div>
      <span id="voice-status" class="sr-only" aria-live="polite"></span>
    </div>

    <div class="grid sm:grid-cols-2 gap-5 md:gap-6 stagger">
      ${heroCard('interior')}
      ${heroCard('construction')}
    </div>
  </div>`;
}

function heroCard(key){
  const d = DATA[key];
  const bgUrl = key==='interior'
    ? 'https://raw.githubusercontent.com/nanaririri/ai/main/01.png'
    : 'https://raw.githubusercontent.com/nanaririri/ai/main/02.JPG';
  return `
  <button data-action="select-main" data-key="${key}" class="hero-card group text-left rounded-sm p-7 md:p-9 flex flex-col justify-end min-h-[280px] md:min-h-[340px]">
    <div class="hero-bg" style="background-image:url('${bgUrl}')"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h2 class="font-display font-700 text-4xl md:text-5xl tracking-tight mb-3" style="color:#fff">${d.label}</h2>
      <p class="text-sm max-w-xs" style="color:rgba(255,255,255,.85)">${d.desc}</p>
      <div class="mt-6 flex items-center gap-2 text-sm font-semibold" style="color:#fff">
        카테고리 보기
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </div>
    </div>
  </button>`;
}

/* ============================= RENDER: STEP 2 ============================= */
function stepTwoHTML(){
  const m = getMain();
  return `
  <div class="fade-up">
    <h2 class="font-display font-900 text-4xl md:text-5xl tracking-tight mb-2" style="color:var(--ink)">${m.label}</h2>
    <p class="text-sm mb-9" style="color:var(--ink-soft)">${m.desc} · 세부 카테고리를 선택하세요</p>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 stagger">
      ${m.subs.map(s=>`
        <button data-action="select-sub" data-key="${s.id}" class="sub-card group rounded-sm overflow-hidden flex flex-col items-start text-left">
          <div class="w-full aspect-[16/9] overflow-hidden" style="background:var(--accent-soft)">
            <img src="${SUB_IMAGES[s.id] || ''}" alt="${s.name}" class="w-full h-full object-cover" loading="lazy" onerror="handleSubImgError(this,'${s.icon}')" />
          </div>
          <div class="p-5">
            <div class="font-display font-700 text-xl tracking-tight mb-1" style="color:var(--ink)">${s.name}</div>
            <div class="font-mono text-[11px]" style="color:var(--gray)">${s.groups.reduce((n,g)=>n+g.companies.length,0)}개 업체</div>
          </div>
        </button>
      `).join('')}
    </div>
  </div>`;
}

/* ============================= RENDER: STEP 3 ============================= */
function stepThreeHTML(){
  const m = getMain();
  const s = getSub();
  const groups = s.groups;
  const activeGroups = state.filter === 'ALL' ? groups : groups.filter(g=>g.name===state.filter);

  return `
  <div class="fade-up">
    <div class="flex items-center gap-3 mb-2">
      <h2 class="font-display font-900 text-3xl md:text-4xl tracking-tight" style="color:var(--ink)">${m.label} &gt; ${s.name}</h2>
    </div>
    <p class="text-sm mb-7" style="color:var(--ink-soft)">소분류를 선택해 업체를 필터링하세요</p>

    <!-- filter tabs -->
    <div class="flex gap-2 overflow-x-auto pb-1 mb-8">
      <button data-action="filter" data-key="ALL" class="tab-btn ${state.filter==='ALL'?'active':''} px-4 py-2 rounded-full text-sm font-medium">전체</button>
      ${groups.map(g=>`<button data-action="filter" data-key="${g.name}" class="tab-btn ${state.filter===g.name?'active':''} px-4 py-2 rounded-full text-sm font-medium">${g.name}</button>`).join('')}
    </div>

    <div class="space-y-10">
      ${activeGroups.map(g=>`
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="w-1.5 h-1.5 rounded-full" style="background:var(--accent-2)"></span>
            <h3 class="font-semibold text-[15px]" style="color:var(--ink)">${g.name}</h3>
            <span class="font-mono text-[11px]" style="color:var(--gray)">(${g.companies.length})</span>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${g.companies.map(c=>companyCard(c)).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function companyCard(c){
  const t = TIER_LABEL[c.tier];
  return `
  <div data-action="open-company" data-name="${encodeURIComponent(c.name)}" class="co-card rounded-sm p-5">
    <div class="flex items-start justify-between gap-2 mb-1">
      <div class="flex flex-col items-start gap-2">
        ${companyLogo(c.name, 36)}
        <div class="font-semibold text-lg" style="color:var(--ink)">${c.name}</div>
      </div>
      <div class="flex items-center gap-1.5 shrink-0 mt-1.5" title="${t.txt}">
        ${wonDots(t.won)}
        <span class="font-mono text-[10px]" style="color:var(--gray)">${t.txt}</span>
      </div>
    </div>
    <div class="text-xs mb-2" style="color:var(--gray)">${c.address}</div>
    <div class="text-xs mb-4" style="color:var(--ink-soft)">${c.repProducts}</div>
    <div class="flex items-center gap-1.5 text-xs font-semibold" style="color:var(--accent)">
      상세 정보 보기
    </div>
  </div>`;
}

/* ============================= RENDER: MODAL (STEP 4) ============================= */
function findCompanyAnywhere(name){
  for(const mainKey of Object.keys(DATA)){
    const main = DATA[mainKey];
    for(const sub of main.subs){
      for(const g of sub.groups){
        const f = g.companies.find(x=>x.name===name);
        if(f) return { company:f, mainKey, subId:sub.id, sub };
      }
    }
  }
  return null;
}
function showCompanyModalUI(name){
  let s = getSub();
  let company = null;
  if(s){
    s.groups.forEach(g=>{ const f = g.companies.find(x=>x.name===name); if(f) company = f; });
  }
  if(!company){
    // fallback: state.subId may not match this company yet (e.g. history restore race) —
    // locate it anywhere in the data and self-correct the active category before rendering.
    const found = findCompanyAnywhere(name);
    if(found){
      state.mainKey = found.mainKey;
      state.subId = found.subId;
      company = found.company;
      s = found.sub;
    }
  }
  if(!company){
    console.warn('[modal] company not found:', name);
    return;
  }

  const t = TIER_LABEL[company.tier];
  const products = PRODUCT_IMAGE_OVERRIDES[company.name] || getProducts(s.id);
  const hasRealPhotos = !!PRODUCT_IMAGE_OVERRIDES[company.name];

  document.getElementById('modal-body').innerHTML = `
    <div class="p-6 md:p-7">
      <div class="flex items-start justify-between mb-6">
        <div class="flex flex-col items-start gap-2">
          ${companyLogo(company.name, 44)}
          <h3 class="font-display font-700 text-2xl tracking-tight" style="color:var(--ink)">${company.name}</h3>
        </div>
        <button data-action="close-modal" class="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style="background:var(--accent-soft); color:var(--accent)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="grid lg:grid-cols-2 gap-6 mb-6">
        <div class="rounded-sm border overflow-hidden" style="border-color:var(--border)">
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">브랜드명</span>
            <span class="text-sm font-semibold" style="color:var(--ink)">${company.name}</span>
          </div>
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">주소</span>
            <span class="text-sm text-right max-w-[65%]" style="color:var(--ink)">${company.address}</span>
          </div>
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">업체 등록 여부</span>
            <span class="flex items-center gap-1.5 text-sm font-semibold" style="color:${company.registered ? 'var(--accent)' : 'var(--gray)'}">
              <span class="w-1.5 h-1.5 rounded-full" style="background:${company.registered ? 'var(--accent)' : 'var(--gray)'}"></span>
              ${company.registered ? '등록' : '미등록'}
            </span>
          </div>
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">가격대</span>
            <span class="flex items-center gap-1.5 text-sm font-semibold" style="color:var(--ink)">
              ${wonDots(t.won)}
              ${t.txt}
            </span>
          </div>
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">대표제품</span>
            <span class="text-sm text-right max-w-[65%]" style="color:var(--ink)">${company.repProducts}</span>
          </div>
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">업태</span>
            <span class="text-sm font-semibold" style="color:var(--ink)">${company.businessType}</span>
          </div>
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">제조국</span>
            <span class="text-sm font-semibold" style="color:var(--ink)">${company.manufactureCountry}</span>
          </div>
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">대표자</span>
            <span class="text-sm font-semibold" style="color:var(--ink)">${company.ceoName}</span>
          </div>
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">대표전화</span>
            <a href="tel:${company.phone.replace(/-/g,'')}" class="text-sm font-semibold" style="color:var(--accent)">${company.phone}</a>
          </div>
          <div class="info-row flex items-center justify-between px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide" style="color:var(--gray)">E-mail</span>
            <a href="mailto:${company.email}" class="text-sm font-semibold truncate max-w-[65%]" style="color:var(--accent)">${company.email}</a>
          </div>
          <div class="info-row flex items-center justify-between gap-3 px-4 py-3.5">
            <span class="text-xs font-mono tracking-wide shrink-0" style="color:var(--gray)">홈페이지</span>
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-sm truncate max-w-[140px] sm:max-w-[180px]" style="color:var(--ink)" title="${company.homepage}">${company.homepage.replace(/^https?:\/\//,'')}</span>
              <button type="button" data-action="copy-url" data-url="${encodeURIComponent(company.homepage)}" class="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style="background:var(--accent-soft); color:var(--accent)" title="URL 복사">
                <svg data-copy-icon width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
              <a href="${company.homepage}" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full shrink-0" style="background:var(--accent); color:#fff">
                방문하기
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M8 7h9v9"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div>
          <p class="text-xs font-mono tracking-wide mb-3" style="color:var(--gray)">취급 제품</p>
          <div class="grid grid-cols-2 gap-3">
            ${products.map((p,i)=>{
              const spec = productSpecs(i);
              return `
              <div>
                <div class="product-thumb rounded-sm flex items-center justify-center" style="${hasRealPhotos ? '' : `background:${p.bg}`}">
                  ${hasRealPhotos
                    ? `<img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover" />`
                    : `<div style="color:rgba(24,23,15,.55); width:34px; height:34px;">${icon(s.icon,'w-full h-full')}</div>`
                  }
                </div>
                <div class="mt-2 space-y-0.5 text-[11px] leading-snug" style="color:var(--ink-soft)">
                  <div><span class="font-mono" style="color:var(--gray)">용도</span> ${spec.purpose}</div>
                  <div><span class="font-mono" style="color:var(--gray)">소재</span> ${spec.material}</div>
                  <div><span class="font-mono" style="color:var(--gray)">색상</span> ${spec.color}</div>
                  <div><span class="font-mono" style="color:var(--gray)">규격</span> ${spec.size}</div>
                  <div><span class="font-mono" style="color:var(--gray)">무게</span> ${spec.weight}</div>
                </div>
              </div>
            `;}).join('')}
          </div>
        </div>
      </div>

      <button data-action="download-catalog" data-name="${encodeURIComponent(company.name)}" class="w-full flex items-center justify-center gap-2 rounded-sm py-3.5 font-semibold text-sm" style="background:var(--ink); color:#fff">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>
        카탈로그 다운로드
      </button>
    </div>
  `;
  document.getElementById('modal-root').classList.remove('modal-hidden');
}
function hideModalUI(){
  document.getElementById('modal-root').classList.add('modal-hidden');
}
function openCompanyModal(name){
  modalCompanyName = name;
  showCompanyModalUI(name);
  pushHistoryState();
}
function closeModal(){
  if(!modalCompanyName) return;
  modalCompanyName = null;
  hideModalUI();
  pushHistoryState();
}
function copyUrl(url, btn){
  const finish = ()=>{
    if(!btn) return;
    const icon = btn.querySelector('[data-copy-icon]');
    if(!icon) return;
    const original = icon.outerHTML;
    icon.outerHTML = '<svg data-copy-icon width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>';
    setTimeout(()=>{
      const cur = btn.querySelector('[data-copy-icon]');
      if(cur) cur.outerHTML = original;
    }, 1200);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(finish).catch(finish);
  } else {
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta);
    ta.select();
    try{ document.execCommand('copy'); }catch(e){}
    document.body.removeChild(ta);
    finish();
  }
}
/* ============================= CATALOG FILE OVERRIDES ============================= */
const CATALOG_FILE_OVERRIDES = {
  '부림테크': 'https://raw.githubusercontent.com/nanaririri/ai/main/burim_catal.pdf',
};

function downloadCatalog(name){
  const s = getSub();
  let company = null;
  s.groups.forEach(g=>{ const f = g.companies.find(x=>x.name===name); if(f) company = f; });
  if(!company) return;

  const fileUrl = CATALOG_FILE_OVERRIDES[company.name];
  if(fileUrl){
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileUrl.split('/').pop();
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    return;
  }

  const t = TIER_LABEL[company.tier];
  const content =
`MATERIAL INDEX — 자재 카탈로그 (프로토타입 더미 파일)
------------------------------------------------
브랜드명   : ${company.name}
홈페이지   : ${company.homepage}
주소       : ${company.address}
가격대     : ${t.txt}
업태       : ${company.businessType}
제조국     : ${company.manufactureCountry}
대표자     : ${company.ceoName}
대표전화   : ${company.phone}
E-mail     : ${company.email}
------------------------------------------------
본 파일은 프로토타입 데모용으로 생성된 더미 카탈로그입니다.`;
  const blob = new Blob([content], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = company.catalog;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================= MAIN RENDER / TRANSITIONS ============================= */
function render(){
  // 검색창이 있는 1단계를 벗어나면 진행 중인 음성 인식을 정리합니다.
  if(state.step!==1) stopVoiceSearch();
  renderRail();
  renderBreadcrumb();
  let html = '';
  if(state.step===1) html = stepOneHTML();
  else if(state.step===2) html = stepTwoHTML();
  else if(state.step===3) html = stepThreeHTML();
  document.getElementById('stage').innerHTML = html;
  if(state.step===1) initVoiceSearchButton();
}

function transitionTo(fn, after){
  const stage = document.getElementById('stage');
  stage.classList.remove('stage-in');
  stage.classList.add('stage-out');
  setTimeout(()=>{
    fn();
    render();
    pushHistoryState();
    requestAnimationFrame(()=>{
      stage.classList.remove('stage-out');
      stage.classList.add('stage-in');
      if(after) after();
    });
    window.scrollTo({top:0, behavior:'smooth'});
  }, 220);
}

/* ============================= HISTORY / BACK BUTTON SUPPORT ============================= */
let modalCompanyName = null;
let listmapOpen = false;
let isRestoringHistory = false;
let suppressPush = false;

function snapshotState(){
  return {
    step: state.step,
    mainKey: state.mainKey,
    subId: state.subId,
    filter: state.filter,
    modalCompanyName: modalCompanyName,
    listmapOpen: listmapOpen
  };
}

function pushHistoryState(){
  if(isRestoringHistory || suppressPush) return;
  history.pushState(snapshotState(), '');
}

function applyHistoryState(s){
  isRestoringHistory = true;
  s = s || { step:1, mainKey:null, subId:null, filter:'ALL', modalCompanyName:null, listmapOpen:false };
  state.step = s.step || 1;
  state.mainKey = s.mainKey || null;
  state.subId = s.subId || null;
  state.filter = s.filter || 'ALL';
  render();

  if(s.modalCompanyName){
    modalCompanyName = s.modalCompanyName;
    showCompanyModalUI(modalCompanyName);
  } else {
    modalCompanyName = null;
    hideModalUI();
  }

  if(s.listmapOpen){
    listmapOpen = true;
    showListMapUI();
  } else {
    listmapOpen = false;
    hideListMapUI();
  }
  isRestoringHistory = false;
}

window.addEventListener('popstate', (e)=>{
  applyHistoryState(e.state);
});

/* ============================= EVENTS ============================= */
document.addEventListener('click', (e)=>{
  const el = e.target.closest('[data-action]');
  if(!el) return;
  const action = el.dataset.action;

  if(action==='select-main'){
    transitionTo(()=>{ state.mainKey = el.dataset.key; state.step = 2; state.subId=null; state.filter='ALL'; });
  }
  else if(action==='select-sub'){
    transitionTo(()=>{ state.subId = el.dataset.key; state.step = 3; state.filter='ALL'; });
  }
  else if(action==='filter'){
    state.filter = el.dataset.key;
    render();
    pushHistoryState();
  }
  else if(action==='open-company'){
    openCompanyModal(decodeURIComponent(el.dataset.name));
  }
  else if(action==='close-modal'){
    closeModal();
  }
  else if(action==='download-catalog'){
    downloadCatalog(decodeURIComponent(el.dataset.name));
  }
  else if(action==='copy-url'){
    copyUrl(decodeURIComponent(el.dataset.url), el);
  }
  else if(action==='back'){
    transitionTo(()=>{ state.step = Math.max(1, state.step-1); });
  }
  else if(action==='goto-step'){
    const target = parseInt(el.dataset.step,10);
    if(target < state.step){
      transitionTo(()=>{ state.step = target; });
    }
  }
  else if(action==='reset'){
    transitionTo(()=>{ state.step=1; state.mainKey=null; state.subId=null; state.filter='ALL'; });
  }
  else if(action==='search-select'){
    const type = el.dataset.type;
    const mainKey = el.dataset.main;
    const subId = el.dataset.sub;
    if(type==='sub'){
      transitionTo(()=>{ state.mainKey=mainKey; state.subId=subId; state.step=3; state.filter='ALL'; });
    } else if(type==='company'){
      const companyName = decodeURIComponent(el.dataset.name);
      suppressPush = true;
      transitionTo(
        ()=>{ state.mainKey=mainKey; state.subId=subId; state.step=3; state.filter='ALL'; },
        ()=>{ suppressPush = false; openCompanyModal(companyName); }
      );
    }
  }
  else if(action==='search-clear'){
    clearSearch();
  }
  else if(action==='search-submit'){
    const input = document.getElementById('search-input');
    if(input) performSearch(input.value);
  }
  else if(action==='voice-search'){
    startVoiceSearch();
  }
  else if(action==='open-listmap'){
    openListMap();
  }
  else if(action==='close-listmap'){
    closeListMap();
  }
  else if(action==='listmap-select'){
    const mainKey = el.dataset.main;
    const subId = el.dataset.sub;
    const companyName = decodeURIComponent(el.dataset.name);
    suppressPush = true;
    closeListMap();
    transitionTo(
      ()=>{ state.mainKey=mainKey; state.subId=subId; state.step=3; state.filter='ALL'; },
      ()=>{ suppressPush = false; openCompanyModal(companyName); }
    );
  }
});

document.addEventListener('input', (e)=>{
  if(e.target && e.target.id==='search-input'){
    performSearch(e.target.value);
  }
  if(e.target && e.target.id==='listmap-filter'){
    renderListMap(e.target.value);
  }
});

document.addEventListener('keydown', (e)=>{
  if(e.key==='Enter' && e.target && e.target.id==='search-input'){
    performSearch(e.target.value);
  }
});

document.addEventListener('click', (e)=>{
  const box = document.getElementById('search-results');
  const input = document.getElementById('search-input');
  if(box && !box.classList.contains('hidden')){
    if(input && !input.contains(e.target) && !box.contains(e.target)){
      box.classList.add('hidden');
    }
  }
});

document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape'){
    closeModal();
    closeListMap();
    stopVoiceSearch();
    const box = document.getElementById('search-results');
    if(box) box.classList.add('hidden');
  }
});

/* ============================= INIT ============================= */
render();
history.replaceState(snapshotState(), '');
