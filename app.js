/* ════════════════════════════════════════════════════════
   SILLAGE — Maison de Parfum
   Data source: parfumes.json (single source of truth).
   Loading order: fetch → XMLHttpRequest → friendly notice.
   ════════════════════════════════════════════════════════ */
let PERFUMES = [];

function __loadPerfumes(){
  return new Promise((resolve, reject) => {
    fetch('parfumes.json')
      .then(r => { if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(resolve)
      .catch(() => {
        /* some browsers allow XHR where fetch is blocked on file:// */
        try {
          const x = new XMLHttpRequest();
          x.open('GET', 'parfumes.json', true);
          x.onload  = () => { try { resolve(JSON.parse(x.responseText)); } catch(e){ reject(e); } };
          x.onerror = () => reject(new Error('xhr'));
          x.send();
        } catch(e){ reject(e); }
      });
  });
}

function __dataNotice(){
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#0b0910;color:#f4ecdd;display:flex;align-items:center;justify-content:center;padding:30px;text-align:center;font-family:Jost,sans-serif';
  d.innerHTML = `<div style="max-width:560px">
    <div style="font-family:'Cormorant Garamond',serif;font-size:2rem;color:#d4af6f;margin-bottom:16px">SILLAGE</div>
    <p style="line-height:1.8;margin-bottom:10px">Կայքը չկարողացավ կարդալ <b>parfumes.json</b> ֆայլը։ Որոշ browser-ներ (Chrome) արգելում են դա, երբ էջը բացված է ուղղակի ֆայլից։</p>
    <p style="line-height:1.8;color:#a99e8c;font-size:.9rem">Լուծում՝ բացիր թղթապանակը VS Code-ում և միացրու <b>Live Server</b>-ը, կամ թերմինալում գրիր <b>npx serve</b> / <b>python -m http.server</b>։ Firefox-ում սովորաբար աշխատում է նաև կրկնակի սեղմումով։<br><br>Open the folder with any local server (VS Code Live Server, npx serve) — or use Firefox.</p>
  </div>`;
  document.body.appendChild(d);
  const l = document.getElementById('loader'); if (l) l.classList.add('hide');
}

function __startSillage(){
/* To use your own PNG images: replace the "image" value of any perfume
   with a local path, e.g. "images/1.png". If an image fails to load,
   an elegant placeholder bottle is shown automatically. */

/* ════════════════ I18N ════════════════ */
const I18N = {
en:{
  logoSub:"maison de parfum",
  navCollection:"Collection",navPhilosophy:"Philosophy",navInspiration:"Inspiration",navContact:"Contact",
  heroEyebrow:"The art of leaving a trace",
  heroTitle:'Every scent is a <em>memory</em><br>waiting to be born',
  heroSub:"A curated universe of 200 legendary fragrances — from Tom Ford's dark orchids to Creed's mountain air. Find the one that speaks your name.",
  heroCta1:"Explore the collection",heroCta2:"Our philosophy",
  statFrag:"Fragrances",statBrands:"Maisons",statFam:"Scent families",scroll:"Scroll",
  colEyebrow:"The collection",
  colTitle:'Two hundred ways<br>to be <em>unforgettable</em>',
  colSub:"Search by name, note or maison. Filter by family and price. Hover over any bottle — it will turn for you.",
  searchPh:"Search by name, brand or note…",
  allBrands:"All maisons",allCats:"All",
  sortFeatured:"Featured",sortPriceAsc:"Price: low → high",sortPriceDesc:"Price: high → low",sortRating:"Top rated",sortName:"Name A–Z",
  priceUpTo:"Price up to",reset:"Reset filters",loadMore:"Show more",
  found:n=>`${n} fragrance${n===1?'':'s'} found`,
  emptyTitle:"Nothing matches your search",emptySub:"Try a different note, brand or a wider price range.",
  cat:{floral:"Floral",woody:"Woody",oriental:"Oriental",fresh:"Fresh",gourmand:"Gourmand"},
  badgeBest:"Bestseller",badgeNew:"New",
  addToCart:"Add to cart",added:"Added to your selection ✦",notes:"Olfactory notes",chooseSize:"Choose size",reviews:"reviews",
  favAdd:"Saved to favorites ♥",favDel:"Removed from favorites",
  cartTitle:"Your selection",total:"Total",checkout:"Proceed to checkout",
  cartEmpty:"Your selection is empty.<br>Let a fragrance choose you.",
  favTitle:"Favorites",favEmpty:"No favorites yet.<br>Tap the heart on any bottle you love.",
  checkoutMsg:"Thank you! This is a demo boutique — no payment was made ✦",
  philoEyebrow:"Philosophy",
  philoTitle:'Perfume is the most <em>intimate</em> form of memory',
  philoP1:"Sillage — the French word for the scented trail a person leaves behind. It is what remains of you in a room after you have gone. We believe choosing a fragrance is choosing how you will be remembered.",
  philoP2:"Every bottle in this collection was selected by hand — icons that defined eras, and quiet masterpieces known only to those who seek them.",
  pt1b:"Curated, not collected",pt1s:"200 fragrances chosen for character, not popularity.",
  pt2b:"Five scent families",pt2s:"Floral, woody, oriental, fresh and gourmand — mapped for easy discovery.",
  pt3b:"Notes laid bare",pt3s:"Every pyramid revealed: top, heart and base, so you know what you wear.",
  bigQuote:"You are never fully dressed without a trace of scent in the air behind you.",
  footAbout:"A curated universe of legendary fragrances. Born from the belief that a scent is the most honest autobiography.",
  footNav:"Navigation",footFam:"Families",footNews:"Newsletter",nlBtn:"Join",nlPh:"your@email.com",
  nlNote:"One letter a month. Only new arrivals and stories worth telling.",
  nlOk:"Welcome to the inner circle ✦",nlErr:"Please enter a valid email",
  copy:"© 2026 SILLAGE · Maison de Parfum. All rights reserved.",
  madeWith:"Crafted with patience & bergamot",
  quotes:[
    {t:"A woman who doesn't wear perfume has no future.",a:"Coco Chanel"},
    {t:"Perfume is the art that makes memory speak.",a:"Francis Kurkdjian"},
    {t:"Smell is a word, perfume is literature.",a:"Jean-Claude Ellena"},
    {t:"Long after one has forgotten what a woman wore, the memory of her perfume lingers.",a:"Christian Dior"},
    {t:"Wear fragrance like armor — invisible, but undeniable.",a:"SILLAGE"}
  ]
},
ru:{
  logoSub:"дом парфюмерии",
  navCollection:"Коллекция",navPhilosophy:"Философия",navInspiration:"Вдохновение",navContact:"Контакты",
  heroEyebrow:"Искусство оставлять след",
  heroTitle:'Каждый аромат — это <em>память</em>,<br>ждущая своего рождения',
  heroSub:"Кураторская вселенная из 200 легендарных ароматов — от тёмных орхидей Tom Ford до горного воздуха Creed. Найдите тот, что произносит ваше имя.",
  heroCta1:"Открыть коллекцию",heroCta2:"Наша философия",
  statFrag:"Ароматов",statBrands:"Домов",statFam:"Семейств",scroll:"Листайте",
  colEyebrow:"Коллекция",
  colTitle:'Двести способов<br>быть <em>незабываемым</em>',
  colSub:"Ищите по имени, ноте или дому. Фильтруйте по семейству и цене. Наведите курсор на флакон — он повернётся к вам.",
  searchPh:"Поиск по названию, бренду или ноте…",
  allBrands:"Все дома",allCats:"Все",
  sortFeatured:"Рекомендуемые",sortPriceAsc:"Цена: по возрастанию",sortPriceDesc:"Цена: по убыванию",sortRating:"По рейтингу",sortName:"Имя А–Я",
  priceUpTo:"Цена до",reset:"Сбросить фильтры",loadMore:"Показать ещё",
  found:n=>`Найдено ароматов: ${n}`,
  emptyTitle:"Ничего не найдено",emptySub:"Попробуйте другую ноту, бренд или расширьте диапазон цен.",
  cat:{floral:"Цветочные",woody:"Древесные",oriental:"Восточные",fresh:"Свежие",gourmand:"Гурманские"},
  badgeBest:"Бестселлер",badgeNew:"Новинка",
  addToCart:"В корзину",added:"Добавлено в вашу подборку ✦",notes:"Ольфакторные ноты",chooseSize:"Выберите объём",reviews:"отзывов",
  favAdd:"Сохранено в избранном ♥",favDel:"Удалено из избранного",
  cartTitle:"Ваш выбор",total:"Итого",checkout:"Оформить заказ",
  cartEmpty:"Ваша подборка пуста.<br>Позвольте аромату выбрать вас.",
  favTitle:"Избранное",favEmpty:"Пока пусто.<br>Нажмите на сердце у флакона, который полюбили.",
  checkoutMsg:"Спасибо! Это демо-бутик — оплата не производилась ✦",
  philoEyebrow:"Философия",
  philoTitle:'Парфюм — самая <em>интимная</em> форма памяти',
  philoP1:"Sillage — французское слово, означающее ароматный шлейф, который человек оставляет за собой. Это то, что остаётся от вас в комнате после вашего ухода. Мы верим: выбрать аромат — значит выбрать, каким вас запомнят.",
  philoP2:"Каждый флакон этой коллекции отобран вручную — иконы, определившие эпохи, и тихие шедевры, известные лишь тем, кто ищет.",
  pt1b:"Кураторский отбор",pt1s:"200 ароматов, выбранных за характер, а не за популярность.",
  pt2b:"Пять семейств",pt2s:"Цветочные, древесные, восточные, свежие и гурманские — для лёгкого поиска.",
  pt3b:"Ноты без секретов",pt3s:"Каждая пирамида раскрыта: верх, сердце и база — вы знаете, что носите.",
  bigQuote:"Вы никогда не одеты полностью, если за вами не тянется след аромата.",
  footAbout:"Кураторская вселенная легендарных ароматов. Рождена из веры в то, что запах — самая честная автобиография.",
  footNav:"Навигация",footFam:"Семейства",footNews:"Рассылка",nlBtn:"Подписаться",nlPh:"ваш@email.com",
  nlNote:"Одно письмо в месяц. Только новинки и истории, достойные рассказа.",
  nlOk:"Добро пожаловать в близкий круг ✦",nlErr:"Введите корректный email",
  copy:"© 2026 SILLAGE · Дом парфюмерии. Все права защищены.",
  madeWith:"Создано с терпением и бергамотом",
  quotes:[
    {t:"Женщина, которая не пользуется духами, не имеет будущего.",a:"Коко Шанель"},
    {t:"Парфюмерия — искусство, заставляющее память говорить.",a:"Франсис Куркджян"},
    {t:"Запах — это слово, парфюм — это литература.",a:"Жан-Клод Эллена"},
    {t:"Давно забыто, во что была одета женщина, но память о её духах живёт.",a:"Кристиан Диор"},
    {t:"Носите аромат как доспехи — невидимые, но неоспоримые.",a:"SILLAGE"}
  ]
},
hy:{
  logoSub:"օծանելիքի տուն",
  navCollection:"Հավաքածու",navPhilosophy:"Փիլիսոփայություն",navInspiration:"Ոգեշնչում",navContact:"Կապ",
  heroEyebrow:"Հետք թողնելու արվեստը",
  heroTitle:'Ամեն բույր <em>հիշողություն</em> է,<br>որ սպասում է իր ծնունդին',
  heroSub:"200 լեգենդար օծանելիքների ընտրված տիեզերք՝ Tom Ford-ի մուգ խոլորձներից մինչև Creed-ի լեռնային օդը։ Գտի՛ր այն մեկը, որն արտասանում է քո անունը։",
  heroCta1:"Բացահայտել հավաքածուն",heroCta2:"Մեր փիլիսոփայությունը",
  statFrag:"Օծանելիք",statBrands:"Տուն",statFam:"Բուրմունքի ընտանիք",scroll:"Թերթիր",
  colEyebrow:"Հավաքածուն",
  colTitle:'Երկու հարյուր եղանակ՝<br><em>անմոռանալի</em> լինելու',
  colSub:"Փնտրիր ըստ անվան, նոտայի կամ բրենդի։ Զտիր ըստ ընտանիքի և գնի։ Մկնիկը պահիր շշի վրա՝ այն կպտտվի քեզ համար։",
  searchPh:"Որոնում՝ անուն, բրենդ կամ նոտա…",
  allBrands:"Բոլոր տները",allCats:"Բոլորը",
  sortFeatured:"Առաջարկվող",sortPriceAsc:"Գին՝ աճման կարգով",sortPriceDesc:"Գին՝ նվազման կարգով",sortRating:"Բարձր վարկանիշ",sortName:"Անուն Ա–Ֆ",
  priceUpTo:"Գինը մինչև",reset:"Մաքրել զտիչները",loadMore:"Ցույց տալ ավելին",
  found:n=>`Գտնվել է ${n} օծանելիք`,
  emptyTitle:"Ոչինչ չի գտնվել",emptySub:"Փորձիր այլ նոտա, բրենդ կամ ընդլայնիր գնային միջակայքը։",
  cat:{floral:"Ծաղկային",woody:"Փայտային",oriental:"Արևելյան",fresh:"Թարմ",gourmand:"Գուրմանական"},
  badgeBest:"Բեսթսելեր",badgeNew:"Նորույթ",
  addToCart:"Ավելացնել զամբյուղ",added:"Ավելացվեց քո ընտրանուն ✦",notes:"Բուրմունքի նոտաներ",chooseSize:"Ընտրիր ծավալը",reviews:"կարծիք",
  favAdd:"Պահվեց ընտրյալներում ♥",favDel:"Հեռացվեց ընտրյալներից",
  cartTitle:"Քո ընտրությունը",total:"Ընդամենը",checkout:"Ձևակերպել պատվերը",
  cartEmpty:"Քո ընտրանին դատարկ է։<br>Թույլ տուր, որ բույրը քեզ ընտրի։",
  favTitle:"Ընտրյալներ",favEmpty:"Դեռ դատարկ է։<br>Սեղմիր սիրտը այն շշի վրա, որը սիրեցիր։",
  checkoutMsg:"Շնորհակալություն։ Սա դեմո խանութ է՝ վճարում չի կատարվել ✦",
  philoEyebrow:"Փիլիսոփայություն",
  philoTitle:'Օծանելիքը հիշողության ամենա<em>մտերիմ</em> ձևն է',
  philoP1:"Sillage՝ ֆրանսերեն բառ, որը նշանակում է մարդու թողած բուրավետ հետքը։ Դա այն է, ինչ մնում է քեզնից սենյակում՝ քո հեռանալուց հետո։ Մենք հավատում ենք՝ բույր ընտրելը նշանակում է ընտրել, թե ինչպես քեզ կհիշեն։",
  philoP2:"Այս հավաքածուի յուրաքանչյուր շիշ ընտրված է ձեռքով՝ դարաշրջաններ սահմանած խորհրդանիշներ և լուռ գլուխգործոցներ, որոնք հայտնի են միայն փնտրողներին։",
  pt1b:"Ընտրված, ոչ թե հավաքված",pt1s:"200 օծանելիք՝ ընտրված բնավորության, ոչ թե հանրաճանաչության համար։",
  pt2b:"Հինգ բուրմունքի ընտանիք",pt2s:"Ծաղկային, փայտային, արևելյան, թարմ և գուրմանական՝ հեշտ որոնման համար։",
  pt3b:"Բաց նոտաներ",pt3s:"Ամեն բուրգ բացահայտված է՝ վերև, սիրտ և հիմք, որ իմանաս՝ ինչ ես կրում։",
  bigQuote:"Դու երբեք լիովին հագնված չես, եթե քո հետևից օդում բույրի հետք չի մնում։",
  footAbout:"Լեգենդար օծանելիքների ընտրված տիեզերք։ Ծնված այն հավատից, որ բույրը ամենաանկեղծ ինքնակենսագրությունն է։",
  footNav:"Նավիգացիա",footFam:"Ընտանիքներ",footNews:"Տեղեկագիր",nlBtn:"Միանալ",nlPh:"քո@email.com",
  nlNote:"Ամսական մեկ նամակ։ Միայն նորույթներ և պատմելու արժանի պատմություններ։",
  nlOk:"Բարի գալուստ ներքին շրջանակ ✦",nlErr:"Մուտքագրիր վավեր email",
  copy:"© 2026 SILLAGE · Օծանելիքի տուն։ Բոլոր իրավունքները պաշտպանված են։",
  madeWith:"Ստեղծված է համբերությամբ և բերգամոտով",
  quotes:[
    {t:"Կինը, որն օծանելիք չի օգտագործում, ապագա չունի։",a:"Կոկո Շանել"},
    {t:"Օծանելիքը արվեստ է, որը ստիպում է հիշողությանը խոսել։",a:"Ֆրանսիս Կուրկջյան"},
    {t:"Բույրը բառ է, օծանելիքը՝ գրականություն։",a:"Ժան-Կլոդ Էլենա"},
    {t:"Վաղուց մոռացված է, թե ինչ էր հագել կինը, բայց նրա օծանելիքի հիշողությունը ապրում է։",a:"Քրիստիան Դիոր"},
    {t:"Կրիր բույրը որպես զրահ՝ անտեսանելի, բայց անհերքելի։",a:"SILLAGE"}
  ]
}};

let lang = 'hy';
const PMIN = Math.min(...PERFUMES.map(p=>p.price));
const PMAX = Math.max(...PERFUMES.map(p=>p.price));
let state = { search:'', cat:'all', brand:'all', maxPrice:PMAX, sort:'featured', shown:24 };
(function(){  /* retune the slider to the real price range */
  const r = document.getElementById('priceRange');
  r.min = PMIN; r.max = PMAX; r.value = PMAX; r.step = 1000;
  document.getElementById('priceVal').textContent = PMAX.toLocaleString('de-DE') + ' դ.';
})();
let cart = [];     // {id, size, qty}
let favs = new Set();
const $ = s => document.querySelector(s);
const T = () => I18N[lang];
const fmt = n => n.toLocaleString('de-DE') + ' դ.';   /* 110000 → "110.000 դ." */

/* ════════════════ PLACEHOLDER BOTTLE (for missing PNGs) ════════════════ */
function placeholderSVG(p){
  const initial = (p.brand||'?').charAt(0);
  return `<svg viewBox="0 0 170 225" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="pg${p.id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="rgba(240,220,174,.22)"/><stop offset="1" stop-color="rgba(212,175,111,.06)"/>
    </linearGradient></defs>
    <rect x="55" y="14" width="60" height="26" rx="6" fill="rgba(212,175,111,.6)"/>
    <rect x="47" y="42" width="76" height="20" rx="5" fill="none" stroke="#d4af6f" stroke-width="1.3" opacity=".7"/>
    <rect x="32" y="64" width="106" height="148" rx="16" fill="url(#pg${p.id})" stroke="#d4af6f" stroke-width="1.4"/>
    <rect x="44" y="130" width="82" height="70" rx="9" fill="rgba(179,116,58,.3)"/>
    <text x="85" y="112" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="34" fill="#f0dcae" font-style="italic">${initial}</text>
    <text x="85" y="178" text-anchor="middle" font-family="Jost,sans-serif" font-size="9" letter-spacing="3" fill="#d4af6f">${(p.name||'').slice(0,16).toUpperCase()}</text>
  </svg>`;
}
/* ── image engine: fimgs.net blocks hotlinking, so every image tries
      1) the original URL → 2) images.weserv.nl proxy → 3) elegant placeholder ── */
const IMG_PROXY = u =>
  'https://images.weserv.nl/?url=' + encodeURIComponent(String(u).replace(/^https?:\/\//,'')) + '&w=720&fit=inside&il';
window.imgError = function(el){
  const orig = el.dataset.src || '';
  if (el.dataset.stage !== 'proxy' && orig){
    el.dataset.stage = 'proxy';
    el.src = IMG_PROXY(orig);
    return;
  }
  el.style.display = 'none';
  const ph = el.nextElementSibling;
  if (ph) ph.style.display = 'flex';
};
window.imgLoaded = function(el){ el.classList.add('img-loaded'); };
function bottleHTML(p){
  const isPng = /\.png(\?.*)?$/i.test(p.image||'');
  return `<img src="${p.image||''}" data-src="${p.image||''}" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer"
    class="fade-img ${isPng?'':'framed'}"
    onload="imgLoaded(this)" onerror="imgError(this)">
  <div class="ph" style="display:${p.image?'none':'flex'}">${placeholderSVG(p)}</div>`;
}

/* ════════════════ I18N APPLY ════════════════ */
function applyLang(){
  const t = T();
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{ const v=t[el.dataset.i18n]; if(typeof v==='string') el.textContent=v; });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{ const v=t[el.dataset.i18nHtml]; if(typeof v==='string') el.innerHTML=v; });
  $('#searchInput').placeholder = t.searchPh;
  $('#nlInput').placeholder = t.nlPh;
  document.querySelectorAll('.lang-switch button').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  buildSelects(); buildChips(); buildFootFamilies(); renderQuote(true); render(); renderCart(); renderFavs();
}

/* ════════════════ BUILD CONTROLS ════════════════ */
const CATS = [...new Set(PERFUMES.map(p => p.category))];
const BRANDS = [...new Set(PERFUMES.map(p=>p.brand))].sort();

function buildSelects(){
  const t=T();
  $('#brandSelect').innerHTML = `<option value="all">${t.allBrands}</option>` + BRANDS.map(b=>`<option value="${b}" ${state.brand===b?'selected':''}>${b}</option>`).join('');
  const sorts=[['featured',t.sortFeatured],['priceAsc',t.sortPriceAsc],['priceDesc',t.sortPriceDesc],['rating',t.sortRating],['name',t.sortName]];
  $('#sortSelect').innerHTML = sorts.map(([v,l])=>`<option value="${v}" ${state.sort===v?'selected':''}>${l}</option>`).join('');
}
function buildChips(){
  const t=T();
  $('#catChips').innerHTML = [`<button class="chip ${state.cat==='all'?'active':''}" data-cat="all">${t.allCats}</button>`]
    .concat(CATS.map(c=>`<button class="chip ${state.cat===c?'active':''}" data-cat="${c}">${t.cat[c]}</button>`)).join('');
  document.querySelectorAll('#catChips .chip').forEach(ch=>ch.addEventListener('click',()=>{
    state.cat=ch.dataset.cat; state.shown=24; buildChips(); render();
  }));
}
function buildFootFamilies(){
  const t=T();
  $('#footFamilies').innerHTML = CATS.map(c=>`<li><a href="#collection" data-cat-link="${c}">${t.cat[c]}</a></li>`).join('');
  document.querySelectorAll('[data-cat-link]').forEach(a=>a.addEventListener('click',()=>{
    state.cat=a.dataset.catLink; state.shown=24; buildChips(); render();
  }));
}

/* ════════════════ FILTER + RENDER GRID ════════════════ */
function filtered(){
  const q = state.search.trim().toLowerCase();
  let list = PERFUMES.filter(p=>{
    if(state.cat!=='all' && p.category!==state.cat) return false;
    if(state.brand!=='all' && p.brand!==state.brand) return false;
    if(p.price>state.maxPrice) return false;
    if(q){
      const hay = (p.name+' '+p.brand+' '+(p.tagline||'')+' '+(p.notes||[]).join(' ')).toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  });
  switch(state.sort){
    case 'priceAsc': list.sort((a,b)=>a.price-b.price); break;
    case 'priceDesc': list.sort((a,b)=>b.price-a.price); break;
    case 'rating': list.sort((a,b)=>b.rating-a.rating||b.reviews-a.reviews); break;
    case 'name': list.sort((a,b)=>a.name.localeCompare(b.name)); break;
    default: list.sort((a,b)=>(b.badge==='best')-(a.badge==='best')||(b.badge==='new')-(a.badge==='new')||b.reviews-a.reviews);
  }
  return list;
}
function starStr(r){ const f=Math.round(r); return '★'.repeat(f)+'☆'.repeat(5-f); }

function cardHTML(p,i){
  const t=T();
  const badge = p.badge ? `<span class="badge ${p.badge}">${p.badge==='best'?t.badgeBest:t.badgeNew}</span>` : '';
  return `<article class="card" data-id="${p.id}" style="animation-delay:${Math.min(i,10)*0.05}s">
    ${badge}
    <button class="fav-btn ${favs.has(p.id)?'on':''}" data-fav="${p.id}" aria-label="favorite">
      <svg viewBox="0 0 24 24" fill="${favs.has(p.id)?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
    </button>
    <div class="stage"><div class="bottle">${bottleHTML(p)}</div></div>
    <div class="shine"></div>
    <div class="card-brand">${p.brand}</div>
    <h3 class="card-name">${p.name}</h3>
    <p class="card-tag">${p.tagline}</p>
    ${p.notes.length ? `<div class="card-notes">${p.notes.slice(0,3).map(n=>`<span class="note-pill">${n}</span>`).join('')}</div>` : ''}
    <div class="card-foot">
      <div>
        <div class="price">${fmt(p.price)}</div>
        <div class="rating">${p.rating ? `<span class="star">★</span>${p.rating} · ${p.reviews.toLocaleString()}` : `<span class="star">✦</span>${p.volume||p.category}`}</div>
      </div>
      <button class="add-btn" data-add="${p.id}">${t.addToCart}</button>
    </div>
  </article>`;
}

function render(){
  const t=T(), list=filtered(), grid=$('#grid');
  $('#resultCount').textContent = t.found(list.length);
  if(!list.length){
    grid.innerHTML = `<div class="empty"><span class="em-icon">✦</span><h3 style="font-family:var(--serif);font-size:1.6rem;margin-bottom:10px">${t.emptyTitle}</h3><p>${t.emptySub}</p></div>`;
    $('#loadMore').style.display='none'; return;
  }
  grid.innerHTML = list.slice(0,state.shown).map(cardHTML).join('');
  $('#loadMore').style.display = list.length>state.shown ? '' : 'none';
  bindCards();
}
function bindCards(){
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
    card.addEventListener('click',e=>{
      if(e.target.closest('[data-add]')||e.target.closest('[data-fav]')) return;
      openModal(+card.dataset.id);
    });
  });
  document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(+b.dataset.add)));
  document.querySelectorAll('[data-fav]').forEach(b=>b.addEventListener('click',()=>toggleFav(+b.dataset.fav)));
}

/* ════════════════ MODAL ════════════════ */
let modalSize = null;
function openModal(id){
  const p = PERFUMES.find(x=>x.id===id); if(!p) return;
  const t=T();
  modalSize = p.sizes[Math.min(1,p.sizes.length-1)];
  $('#modalBottle').innerHTML = bottleHTML(p);
  $('#modalInfo').innerHTML = `
    <div class="card-brand">${p.brand} · ${t.cat[p.category]}</div>
    <h2 class="modal-name">${p.name}</h2>
    ${p.rating ? `<div class="modal-rating"><span class="stars">${starStr(p.rating)}</span> ${p.rating} · ${p.reviews.toLocaleString()} ${t.reviews}</div>` : (p.volume ? `<div class="modal-rating"><span class="stars">✦</span> ${p.volume}</div>` : '')}
    <p class="modal-desc">${p.description}</p>
    ${p.notes.length ? `<div class="modal-h">${t.notes}</div>
    <div class="modal-notes">${p.notes.map(n=>`<span class="note-pill">${n}</span>`).join('')}</div>` : ''}
    <div class="modal-h">${t.chooseSize}</div>
    <div class="sizes">${p.sizes.map(s=>`<button class="size-btn ${s===modalSize?'active':''}" data-size="${s}">${s}</button>`).join('')}</div>
    <div class="modal-buy">
      <div class="modal-price">${fmt(p.price)}</div>
      <button class="btn btn-gold" id="modalAdd">${t.addToCart}</button>
    </div>`;
  document.querySelectorAll('.size-btn').forEach(b=>b.addEventListener('click',()=>{
    modalSize=b.dataset.size;
    document.querySelectorAll('.size-btn').forEach(x=>x.classList.toggle('active',x.dataset.size===modalSize));
  }));
  $('#modalAdd').addEventListener('click',()=>{ addToCart(p.id,modalSize); closeModal(); });
  $('#modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){ $('#modalOverlay').classList.remove('open'); document.body.style.overflow=''; }
$('#modalClose').addEventListener('click',closeModal);
$('#modalOverlay').addEventListener('click',e=>{ if(e.target.id==='modalOverlay') closeModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeModal(); closeDrawers(); }});

/* ════════════════ CART & FAVORITES ════════════════ */
function addToCart(id,size){
  const p=PERFUMES.find(x=>x.id===id); if(!p) return;
  size = size || p.sizes[Math.min(1,p.sizes.length-1)];
  const ex = cart.find(c=>c.id===id&&c.size===size);
  if(ex) ex.qty++; else cart.push({id,size,qty:1});
  updateCounts(); renderCart(); toast(T().added);
}
function toggleFav(id){
  const btns=document.querySelectorAll(`[data-fav="${id}"]`);
  if(favs.has(id)){ favs.delete(id); toast(T().favDel); }
  else{ favs.add(id); toast(T().favAdd); }
  btns.forEach(b=>{ b.classList.toggle('on',favs.has(id)); b.querySelector('svg').setAttribute('fill',favs.has(id)?'currentColor':'none'); });
  updateCounts(); renderFavs();
}
function updateCounts(){
  const cq = cart.reduce((s,c)=>s+c.qty,0);
  $('#cartCount').textContent=cq; $('#cartCount').classList.toggle('on',cq>0);
  $('#favCount').textContent=favs.size; $('#favCount').classList.toggle('on',favs.size>0);
}
function renderCart(){
  const t=T(), body=$('#cartBody');
  if(!cart.length){ body.innerHTML=`<div class="drawer-empty"><span class="em-icon">✦</span>${t.cartEmpty}</div>`; $('#cartTotal').textContent=fmt(0); return; }
  body.innerHTML = cart.map((c,i)=>{
    const p=PERFUMES.find(x=>x.id===c.id);
    return `<div class="drawer-item">
      <div style="width:60px;height:76px">${bottleHTML(p)}</div>
      <div class="di-info">
        <div class="di-name">${p.name}</div>
        <div class="di-meta">${p.brand} · ${c.size}</div>
        <div class="qty"><button data-q="-1" data-i="${i}">−</button><span>${c.qty}</span><button data-q="1" data-i="${i}">+</button></div>
      </div>
      <div style="text-align:right">
        <div class="di-price">${fmt(p.price*c.qty)}</div>
        <button class="di-remove" data-del="${i}">✕</button>
      </div>
    </div>`;
  }).join('');
  $('#cartTotal').textContent = fmt(cart.reduce((s,c)=>s+PERFUMES.find(p=>p.id===c.id).price*c.qty,0));
  body.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>{
    const c=cart[+b.dataset.i]; c.qty+=+b.dataset.q;
    if(c.qty<1) cart.splice(+b.dataset.i,1);
    updateCounts(); renderCart();
  }));
  body.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>{ cart.splice(+b.dataset.del,1); updateCounts(); renderCart(); }));
}
function renderFavs(){
  const t=T(), body=$('#favBody');
  if(!favs.size){ body.innerHTML=`<div class="drawer-empty"><span class="em-icon">♥</span>${t.favEmpty}</div>`; return; }
  body.innerHTML = [...favs].map(id=>{
    const p=PERFUMES.find(x=>x.id===id);
    return `<div class="drawer-item">
      <div style="width:60px;height:76px">${bottleHTML(p)}</div>
      <div class="di-info"><div class="di-name">${p.name}</div><div class="di-meta">${p.brand} · ${fmt(p.price)}</div></div>
      <button class="add-btn" data-add2="${p.id}">＋</button>
      <button class="di-remove" data-unfav="${p.id}">✕</button>
    </div>`;
  }).join('');
  body.querySelectorAll('[data-add2]').forEach(b=>b.addEventListener('click',()=>addToCart(+b.dataset.add2)));
  body.querySelectorAll('[data-unfav]').forEach(b=>b.addEventListener('click',()=>toggleFav(+b.dataset.unfav)));
}

/* drawers */
function openDrawer(which){ $('#drawerOverlay').classList.add('open'); $(which).classList.add('open'); document.body.style.overflow='hidden'; }
function closeDrawers(){ $('#drawerOverlay').classList.remove('open'); $('#cartDrawer').classList.remove('open'); $('#favDrawer').classList.remove('open'); document.body.style.overflow=''; }
$('#cartOpen').addEventListener('click',()=>openDrawer('#cartDrawer'));
$('#favOpen').addEventListener('click',()=>openDrawer('#favDrawer'));
$('#cartClose').addEventListener('click',closeDrawers);
$('#favClose').addEventListener('click',closeDrawers);
$('#drawerOverlay').addEventListener('click',closeDrawers);
$('#checkoutBtn').addEventListener('click',()=>{ if(cart.length){ toast(T().checkoutMsg); cart=[]; updateCounts(); renderCart(); }});

/* ════════════════ TOOLBAR EVENTS ════════════════ */
let searchTimer;
$('#searchInput').addEventListener('input',e=>{
  clearTimeout(searchTimer);
  searchTimer=setTimeout(()=>{ state.search=e.target.value; state.shown=24; render(); },220);
});
$('#brandSelect').addEventListener('change',e=>{ state.brand=e.target.value; state.shown=24; render(); });
$('#sortSelect').addEventListener('change',e=>{ state.sort=e.target.value; render(); });
$('#priceRange').addEventListener('input',e=>{
  state.maxPrice=+e.target.value;
  $('#priceVal').textContent=fmt(state.maxPrice);
  const pct=((state.maxPrice-PMIN)/(PMAX-PMIN))*100;
  e.target.style.setProperty('--fill',pct+'%');
  state.shown=24; render();
});
$('#resetBtn').addEventListener('click',()=>{
  state={search:'',cat:'all',brand:'all',maxPrice:PMAX,sort:'featured',shown:24};
  $('#searchInput').value=''; $('#priceRange').value=PMAX; $('#priceVal').textContent=fmt(PMAX);
  $('#priceRange').style.setProperty('--fill','100%');
  buildSelects(); buildChips(); render();
});
$('#loadMore').addEventListener('click',()=>{ state.shown+=24; render(); });

/* ════════════════ QUOTES ROTATOR ════════════════ */
let qIndex=0, qTimer;
function renderQuoteDots(){
  $('#quoteDots').innerHTML = T().quotes.map((_,i)=>`<button class="${i===qIndex?'active':''}" data-qi="${i}" aria-label="quote ${i+1}"></button>`).join('');
  document.querySelectorAll('[data-qi]').forEach(b=>b.addEventListener('click',()=>{ qIndex=+b.dataset.qi; renderQuote(true); resetQTimer(); }));
}
function renderQuote(instant){
  const q=T().quotes[qIndex % T().quotes.length];
  const txt=$('#quoteText'), au=$('#quoteAuthor');
  const set=()=>{ txt.textContent=q.t; au.textContent='— '+q.a; txt.classList.remove('quote-fade'); au.classList.remove('quote-fade'); renderQuoteDots(); };
  if(instant){ set(); return; }
  txt.classList.add('quote-fade'); au.classList.add('quote-fade');
  setTimeout(set,600);
}
function resetQTimer(){ clearInterval(qTimer); qTimer=setInterval(()=>{ qIndex=(qIndex+1)%T().quotes.length; renderQuote(); },7000); }
resetQTimer();

/* ════════════════ MARQUEE ════════════════ */
(function(){
  const seq = BRANDS.map(b=>`<span>${b}</span>`).join('');
  $('#marqueeTrack').innerHTML = seq+seq;
})();

/* ════════════════ NAV / SCROLL FX ════════════════ */
window.addEventListener('scroll',()=>{
  $('#nav').classList.toggle('scrolled',scrollY>50);
  $('#toTop').classList.toggle('show',scrollY>800);
},{passive:true});
$('#toTop').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

/* reveal observer */
const hasIO = typeof IntersectionObserver !== 'undefined';
const obs = hasIO ? new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target);} }),{threshold:.12}) : null;
document.querySelectorAll('.reveal').forEach(el=>{ if(obs) obs.observe(el); else el.classList.add('in'); });

/* counters */
const cObs = hasIO ? new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return;
  const el=e.target, end=+el.dataset.count, dur=1600, t0=performance.now();
  (function tick(t){ const p=Math.min((t-t0)/dur,1); el.textContent=Math.round(end*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(tick); })(t0);
  cObs.unobserve(el);
}),{threshold:.6}) : null;
document.querySelectorAll('[data-count]').forEach(el=>{ if(cObs) cObs.observe(el); else el.textContent=el.dataset.count; });

/* cursor glow */
const glow=$('#cursorGlow');
window.addEventListener('mousemove',e=>{ glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; },{passive:true});

/* ════════════════ SMOKE PARTICLES (hero) ════════════════ */
(function(){
  const cv=$('#smoke');
  /* enforce full-hero coverage no matter what (works even if a CSS rule is ignored) */
  cv.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;display:block;pointer-events:none;z-index:0';
  if(!cv.getContext) return;
  let ctx=null; try{ ctx=cv.getContext('2d'); }catch(e){}
  if(!ctx) return;
  let W=0,H=0,parts=[];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size(){
    const hero=cv.parentElement;
    const w=Math.max(hero.clientWidth, window.innerWidth||0);
    const h=Math.max(hero.clientHeight, window.innerHeight||0);
    if(w&&h){ W=cv.width=w; H=cv.height=h; }
  }
  size();
  addEventListener('resize',size);
  window.addEventListener('load',size);
  setTimeout(size,400); setTimeout(size,1500);
  function spawn(){ return { x:Math.random()*W, y:H+30, r:30+Math.random()*70, vy:.25+Math.random()*.5, vx:(Math.random()-.5)*.3, a:0, max:.05+Math.random()*.06, life:0 }; }
  for(let i=0;i<26;i++){ const p=spawn(); p.y=Math.random()*H; parts.push(p); }
  let seeded = W>0;
  function frame(){
    if(!W||!H){ if(!reduced) requestAnimationFrame(frame); return; }
    if(!seeded){ parts=parts.map(()=>{ const p=spawn(); p.y=Math.random()*H; return p; }); seeded=true; }
    ctx.clearRect(0,0,W,H);
    parts.forEach(p=>{
      p.y-=p.vy; p.x+=p.vx+Math.sin(p.life*.01)*.2; p.life++;
      p.a = p.y>H*.5 ? Math.min(p.a+.0015,p.max) : Math.max(p.a-.0012,0);
      if(p.y<-p.r||p.a<=0&&p.life>200) Object.assign(p,spawn());
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      g.addColorStop(0,`rgba(212,175,111,${p.a})`); g.addColorStop(1,'rgba(212,175,111,0)');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fill();
    });
    if(!reduced) requestAnimationFrame(frame);
  }
  frame();
})();

/* ════════════════ NEWSLETTER / TOAST ════════════════ */
let toastTimer;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2600); }
$('#nlBtn').addEventListener('click',()=>{
  const v=$('#nlInput').value.trim();
  if(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){ toast(T().nlOk); $('#nlInput').value=''; } else toast(T().nlErr);
});

/* lang switch */
document.querySelectorAll('.lang-switch button').forEach(b=>b.addEventListener('click',()=>{ lang=b.dataset.lang; applyLang(); }));

/* ════════════════ INIT ════════════════ */
applyLang();
window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('hide'),700));
setTimeout(()=>$('#loader').classList.add('hide'),3200);

/* ════════════════════════════════════════════════
   V2 — SPOTLIGHT · QUIZ · TESTIMONIALS · FAQ · CONTACT
   ════════════════════════════════════════════════ */
const I18N_X = {
en:{
  navSpotlight:"Of the week",navQuiz:"Scent quiz",navFaq:"FAQ",
  ben1b:"100% authentic",ben1s:"Every bottle sourced directly from the maison or its official distributor.",
  ben2b:"Free delivery",ben2s:"Across Yerevan within 24 hours. Worldwide shipping available.",
  ben3b:"Free samples",ben3s:"Two complimentary 2ml samples with every order — discover before you commit.",
  ben4b:"Gift wrapping",ben4s:"Signature gold box, silk ribbon and a handwritten note — on the house.",
  spotLabel:"Fragrance of the week",spotPriceL:"Price",spotRatingL:"Rating",spotReviewsL:"Reviews",spotView:"View details",
  quizEyebrow:"Scent quiz",quizTitle:'Let the fragrance<br><em>find you</em>',
  quizSub:"Four questions. Thirty seconds. Three perfumes chosen for who you are.",
  quizQ:[
    {q:"When will this fragrance live its best life?",o:[["☀","Daytime, in the open air","day"],["🌙","Evenings and candlelight","evening"],["▦","At work, quietly confident","office"],["✦","Special occasions only","special"]]},
    {q:"Close your eyes. Where are you?",o:[["❀","A blooming garden after rain","floral"],["♣","A deep cedar forest","woody"],["🍰","A patisserie in Paris","gourmand"],["≈","A cliff above the sea","fresh"],["♨","A spice market at dusk","oriental"]]},
    {q:"How loudly should it speak?",o:[["·","A whisper — only for those close","light"],["••","A clear voice in the room","medium"],["●●●","An entrance people remember","strong"]]},
    {q:"And the budget?",o:[["I","Up to $120","120"],["II","$120 – $250","250"],["III","The sky is the limit","9999"]]}
  ],
  quizResEyebrow:"Your matches",quizResTitle:"These three were made for you",
  quizMatch:"match",quizRestart:"Take the quiz again",
  testiEyebrow:"Voices",testiTitle:'What our guests<br><em>remember</em>',
  testi:[
    {n:"Mariam H.",r:"Loyal guest since 2024",t:"I came for one bottle and left understanding myself better. The quiz matched me with Délina — I've worn nothing else since."},
    {n:"Davit S.",r:"Collector",t:"Finally a boutique that treats perfume as literature, not merchandise. The descriptions alone are worth the visit."},
    {n:"Anna K.",r:"First-time buyer",t:"The gift wrapping made my mother cry before she even opened the bottle. That gold box is a memory in itself."}
  ],
  faqEyebrow:"Questions",faqTitle:'Everything you<br>wanted to <em>ask</em>',
  faq:[
    {q:"Are all fragrances original?",a:"Yes — every bottle comes directly from the maison or its official regional distributor, with batch codes intact. We provide authenticity verification on request."},
    {q:"How long does delivery take?",a:"Yerevan — within 24 hours, free of charge. Regions of Armenia — 2–3 days. International shipping is calculated at checkout and typically takes 5–10 days."},
    {q:"Can I try before buying?",a:"Of course. Every order ships with two complimentary 2ml samples of your choice. In the boutique you can test anything from the collection — our consultants will guide you."},
    {q:"What if the fragrance doesn't suit me?",a:"Unopened bottles can be returned within 14 days for a full refund. If a sealed fragrance disappointed you, we'll help you choose again — with a 15% courtesy discount."},
    {q:"Do you offer gift cards?",a:"Yes — digital and physical gift cards from $50 to $500, wrapped in our signature gold envelope. The recipient can also book a private scent consultation."}
  ],
  conEyebrow:"Contact",conTitle:'Come closer —<br>we don\'t <em>bite</em>, we spritz',
  conAddrL:"Boutique",conAddr:"Northern Avenue 5, Yerevan, Armenia",conHours:"Mon–Sun · 10:00 — 21:00",
  conPhoneL:"Phone",conPhoneS:"Also on Telegram & WhatsApp",
  conMailL:"Email",conMailS:"We reply within one working day",
  fName:"Name",fMail:"Email",fSubj:"Subject",fMsg:"Message",fSend:"Send message",
  fNamePh:"Your name",fMailPh:"your@email.com",fSubjPh:"How can we help?",fMsgPh:"Tell us everything…",
  fOk:"Message sent — thank you ✦ We'll reply soon.",fErr:"Please fill in your name, a valid email and a message."
},
ru:{
  navSpotlight:"Аромат недели",navQuiz:"Квиз",navFaq:"Вопросы",
  ben1b:"100% оригинал",ben1s:"Каждый флакон — напрямую от дома или официального дистрибьютора.",
  ben2b:"Бесплатная доставка",ben2s:"По Еревану — в течение 24 часов. Доставляем по всему миру.",
  ben3b:"Пробники в подарок",ben3s:"Два семпла по 2 мл к каждому заказу — узнайте аромат до покупки.",
  ben4b:"Подарочная упаковка",ben4s:"Фирменная золотая коробка, шёлковая лента и рукописная записка — бесплатно.",
  spotLabel:"Аромат недели",spotPriceL:"Цена",spotRatingL:"Рейтинг",spotReviewsL:"Отзывов",spotView:"Подробнее",
  quizEyebrow:"Парфюмерный квиз",quizTitle:'Пусть аромат<br><em>найдёт вас</em>',
  quizSub:"Четыре вопроса. Тридцать секунд. Три аромата, выбранные под ваш характер.",
  quizQ:[
    {q:"Когда этот аромат будет жить своей лучшей жизнью?",o:[["☀","Днём, на открытом воздухе","day"],["🌙","Вечером, при свечах","evening"],["▦","На работе, тихо и уверенно","office"],["✦","Только по особым случаям","special"]]},
    {q:"Закройте глаза. Где вы?",o:[["❀","Цветущий сад после дождя","floral"],["♣","Глубокий кедровый лес","woody"],["🍰","Кондитерская в Париже","gourmand"],["≈","Скала над морем","fresh"],["♨","Рынок специй на закате","oriental"]]},
    {q:"Насколько громко он должен звучать?",o:[["·","Шёпот — только для близких","light"],["••","Ясный голос в комнате","medium"],["●●●","Выход, который запомнят","strong"]]},
    {q:"И бюджет?",o:[["I","До $120","120"],["II","$120 – $250","250"],["III","Без ограничений","9999"]]}
  ],
  quizResEyebrow:"Ваши совпадения",quizResTitle:"Эти три созданы для вас",
  quizMatch:"совпадение",quizRestart:"Пройти квиз заново",
  testiEyebrow:"Голоса",testiTitle:'Что запоминают<br>наши <em>гости</em>',
  testi:[
    {n:"Мариам А.",r:"Постоянный гость с 2024",t:"Пришла за одним флаконом, а ушла, лучше понимая себя. Квиз подобрал мне Délina — с тех пор не ношу ничего другого."},
    {n:"Давид С.",r:"Коллекционер",t:"Наконец-то бутик, где парфюм — это литература, а не товар. Одни описания стоят визита."},
    {n:"Анна К.",r:"Первая покупка",t:"Подарочная упаковка растрогала маму до слёз ещё до того, как она открыла флакон. Эта золотая коробка — память сама по себе."}
  ],
  faqEyebrow:"Вопросы",faqTitle:'Всё, что вы<br>хотели <em>спросить</em>',
  faq:[
    {q:"Все ароматы оригинальные?",a:"Да — каждый флакон поступает напрямую от дома или официального регионального дистрибьютора, с батч-кодами. По запросу предоставим проверку подлинности."},
    {q:"Сколько занимает доставка?",a:"По Еревану — до 24 часов, бесплатно. По регионам Армении — 2–3 дня. Международная доставка рассчитывается при оформлении и занимает 5–10 дней."},
    {q:"Можно ли попробовать до покупки?",a:"Конечно. К каждому заказу — два семпла по 2 мл на ваш выбор. В бутике можно протестировать всё из коллекции — консультанты помогут."},
    {q:"А если аромат не подойдёт?",a:"Невскрытые флаконы принимаем обратно в течение 14 дней с полным возвратом. Если запечатанный аромат разочаровал — поможем выбрать заново со скидкой 15%."},
    {q:"Есть ли подарочные карты?",a:"Да — цифровые и физические карты от $50 до $500 в фирменном золотом конверте. Получатель также может записаться на личную парфюмерную консультацию."}
  ],
  conEyebrow:"Контакты",conTitle:'Подойдите ближе —<br>мы не <em>кусаемся</em>, мы благоухаем',
  conAddrL:"Бутик",conAddr:"Северный проспект 5, Ереван, Армения",conHours:"Пн–Вс · 10:00 — 21:00",
  conPhoneL:"Телефон",conPhoneS:"Также в Telegram и WhatsApp",
  conMailL:"Email",conMailS:"Отвечаем в течение рабочего дня",
  fName:"Имя",fMail:"Email",fSubj:"Тема",fMsg:"Сообщение",fSend:"Отправить",
  fNamePh:"Ваше имя",fMailPh:"ваш@email.com",fSubjPh:"Чем можем помочь?",fMsgPh:"Расскажите всё…",
  fOk:"Сообщение отправлено — спасибо ✦ Скоро ответим.",fErr:"Заполните имя, корректный email и сообщение."
},
hy:{
  navSpotlight:"Շաբաթվա բույրը",navQuiz:"Բույրի թեստ",navFaq:"Հարցեր",
  ben1b:"100% օրիգինալ",ben1s:"Ամեն շիշ՝ ուղիղ բրենդից կամ պաշտոնական ներկայացուցչից։",
  ben2b:"Անվճար առաքում",ben2s:"Երևանով՝ 24 ժամում։ Առաքում ենք ամբողջ աշխարհով։",
  ben3b:"Նվեր փորձանմուշներ",ben3s:"Ամեն պատվերի հետ՝ երկու 2մլ semple՝ ծանոթացիր բույրին նախքան գնելը։",
  ben4b:"Նվեր փաթեթավորում",ben4s:"Ֆիրմային ոսկե տուփ, մետաքսե ժապավեն և ձեռագիր նամակ՝ անվճար։",
  spotLabel:"Շաբաթվա բույրը",spotPriceL:"Գին",spotRatingL:"Վարկանիշ",spotReviewsL:"Կարծիք",spotView:"Մանրամասն",
  quizEyebrow:"Բույրի թեստ",quizTitle:'Թող բույրը<br><em>գտնի քեզ</em>',
  quizSub:"Չորս հարց։ Երեսուն վայրկյան։ Երեք օծանելիք՝ ընտրված հենց քեզ համար։",
  quizQ:[
    {q:"Ե՞րբ է այս բույրը ապրելու իր լավագույն կյանքը։",o:[["☀","Ցերեկը, բաց երկնքի տակ","day"],["🌙","Երեկոյան, մոմերի լույսի ներքո","evening"],["▦","Աշխատավայրում՝ լուռ վստահությամբ","office"],["✦","Միայն հատուկ առիթներով","special"]]},
    {q:"Փակիր աչքերդ։ Որտե՞ղ ես։",o:[["❀","Ծաղկած այգում՝ անձրևից հետո","floral"],["♣","Խորը մայրու անտառում","woody"],["🍰","Փարիզյան հրուշակեղենի սրահում","gourmand"],["≈","Ծովի վրա բարձրացող ժայռին","fresh"],["♨","Համեմունքների շուկայում՝ մայրամուտին","oriental"]]},
    {q:"Որքա՞ն բարձր պիտի այն խոսի։",o:[["·","Շշուկ՝ միայն մտերիմների համար","light"],["••","Հստակ ձայն սենյակում","medium"],["●●●","Մուտք, որը կհիշեն","strong"]]},
    {q:"Իսկ բյուջե՞ն։",o:[["I","Մինչև $120","120"],["II","$120 – $250","250"],["III","Սահման չկա","9999"]]}
  ],
  quizResEyebrow:"Քո համընկնումները",quizResTitle:"Այս երեքը ստեղծված են քեզ համար",
  quizMatch:"համընկնում",quizRestart:"Անցնել թեստը նորից",
  testiEyebrow:"Ձայներ",testiTitle:'Ինչ են հիշում<br>մեր <em>հյուրերը</em>',
  testi:[
    {n:"Մարիամ Հ.",r:"Մշտական հյուր 2024-ից",t:"Եկա մեկ շշի համար, հեռացա՝ ինձ ավելի լավ հասկանալով։ Թեստն ինձ ընտրեց Délina-ն, և այդ օրվանից ուրիշ ոչինչ չեմ կրում։"},
    {n:"Դավիթ Ս.",r:"Կոլեկցիոներ",t:"Վերջապես մի խանութ, որտեղ օծանելիքը գրականություն է, ոչ թե ապրանք։ Միայն նկարագրությունները արժեն այցելությունը։"},
    {n:"Աննա Կ.",r:"Առաջին գնում",t:"Նվեր փաթեթավորումը մայրիկիս հուզեց մինչև արցունքներ՝ դեռ շիշը չբացած։ Այդ ոսկե տուփը ինքնին հիշողություն է։"}
  ],
  faqEyebrow:"Հարցեր",faqTitle:'Այն ամենը, ինչ<br>ուզում էիր <em>հարցնել</em>',
  faq:[
    {q:"Բոլոր օծանելիքները օրիգինա՞լ են։",a:"Այո — ամեն շիշ գալիս է ուղիղ բրենդից կամ պաշտոնական տարածաշրջանային ներկայացուցչից՝ batch կոդերով։ Ցանկության դեպքում կտրամադրենք իսկության ստուգում։"},
    {q:"Որքա՞ն է տևում առաքումը։",a:"Երևանով՝ մինչև 24 ժամ, անվճար։ Մարզերով՝ 2–3 օր։ Միջազգային առաքումը հաշվարկվում է պատվերի ձևակերպման ժամանակ և տևում է 5–10 օր։"},
    {q:"Կարելի՞ է փորձել գնելուց առաջ։",a:"Իհարկե։ Ամեն պատվերի հետ՝ քո ընտրությամբ երկու 2մլ semple։ Խանութում կարող ես փորձել հավաքածուի ցանկացած բույր՝ խորհրդատուները կօգնեն։"},
    {q:"Իսկ եթե բույրը ինձ չսազի՞։",a:"Չբացված շշերը հետ ենք ընդունում 14 օրվա ընթացքում՝ լրիվ վերադարձով։ Եթե բույրը հիասթափեցրեց՝ կօգնենք նորից ընտրել՝ 15% զեղչով։"},
    {q:"Ունե՞ք նվեր-քարտեր։",a:"Այո — թվային և ֆիզիկական քարտեր $50-ից $500՝ ֆիրմային ոսկե ծրարով։ Ստացողը կարող է նաև գրանցվել անհատական բուրմունքի խորհրդատվության։"}
  ],
  conEyebrow:"Կապ",conTitle:'Մոտեցիր —<br>մենք չենք <em>կծում</em>, մենք բուրում ենք',
  conAddrL:"Խանութ-սրահ",conAddr:"Հյուսիսային պողոտա 5, Երևան, Հայաստան",conHours:"Երկ–Կիր · 10:00 — 21:00",
  conPhoneL:"Հեռախոս",conPhoneS:"Նաև Telegram և WhatsApp",
  conMailL:"Email",conMailS:"Պատասխանում ենք մեկ աշխատանքային օրում",
  fName:"Անուն",fMail:"Email",fSubj:"Թեմա",fMsg:"Հաղորդագրություն",fSend:"Ուղարկել",
  fNamePh:"Քո անունը",fMailPh:"քո@email.com",fSubjPh:"Ինչո՞վ կարող ենք օգնել",fMsgPh:"Պատմիր ամեն ինչ…",
  fOk:"Հաղորդագրությունն ուղարկվեց — շնորհակալություն ✦ Շուտով կպատասխանենք։",fErr:"Լրացրու անունը, վավեր email-ը և հաղորդագրությունը։"
}};
Object.keys(I18N_X).forEach(l=>Object.assign(I18N[l],I18N_X[l]));

/* ---------- spotlight: deterministic weekly pick from bestsellers ---------- */
const SPOT = (function(){
  const pool = PERFUMES.filter(p=>p.badge==='best');
  const list = pool.length ? pool : PERFUMES;
  const week = Math.floor((Date.now()/864e5)/7);
  return list[week % list.length];
})();
function renderSpotlight(){
  $('#spotBottle').innerHTML = bottleHTML(SPOT);
  $('#spotBrand').textContent = SPOT.brand;
  $('#spotName').textContent = SPOT.name;
  $('#spotDesc').textContent = SPOT.description;
  $('#spotPrice').textContent = fmt(SPOT.price);
  $('#spotRating').textContent = SPOT.rating ? (SPOT.rating+' ★') : (SPOT.volume || '✦');
  $('#spotReviews').textContent = SPOT.reviews ? SPOT.reviews.toLocaleString() : T().cat[SPOT.category] || SPOT.category;
}
$('#spotView').addEventListener('click',()=>openModal(SPOT.id));
$('#spotAdd').addEventListener('click',()=>addToCart(SPOT.id));

/* ---------- scent quiz ---------- */
let quizStep=0, quizAns=[];
const OCC_MAP={day:['fresh','floral'],evening:['oriental','woody'],office:['woody','fresh'],special:['gourmand','oriental']};
const INT_MAP={light:['fresh','floral'],medium:[],strong:['oriental','woody','gourmand']};
function renderQuiz(){
  const t=T(), w=$('#quizWrap');
  if(quizStep<t.quizQ.length){
    const q=t.quizQ[quizStep];
    w.innerHTML=`<div class="quiz-progress">${t.quizQ.map((_,i)=>`<i class="${i<quizStep?'done':''}"></i>`).join('')}</div>
      <div class="quiz-step">
        <div class="quiz-q">${quizStep+1}. ${q.q}</div>
        <div class="quiz-opts">${q.o.map(o=>`<button class="quiz-opt" data-v="${o[2]}"><span class="q-emoji">${o[0]}</span>${o[1]}</button>`).join('')}</div>
      </div>`;
    w.querySelectorAll('.quiz-opt').forEach(b=>b.addEventListener('click',()=>{ quizAns[quizStep]=b.dataset.v; quizStep++; renderQuiz(); }));
  } else {
    const [occ,mood,inten,budget]=quizAns;
    const maxP=+budget;
    let scored=PERFUMES.filter(p=>p.price<=maxP).map(p=>{
      let s=0;
      if(p.category===mood) s+=4;
      if((OCC_MAP[occ]||[]).includes(p.category)) s+=2;
      if((INT_MAP[inten]||[]).includes(p.category)) s+=1;
      s+=p.rating/5;
      return {p,s};
    }).sort((a,b)=>b.s-a.s||b.p.reviews-a.p.reviews).slice(0,3);
    if(!scored.length) scored=PERFUMES.slice().sort((a,b)=>b.rating-a.rating).slice(0,3).map(p=>({p,s:3}));
    const maxS=scored[0].s;
    const t2=T();
    $('#quizWrap').innerHTML=`<div class="quiz-results">
      <div class="quiz-res-head"><div class="qr-eyebrow">✦ ${t2.quizResEyebrow}</div><h3>${t2.quizResTitle}</h3></div>
      <div class="quiz-res-grid">${scored.map(({p,s})=>`
        <div class="quiz-res-card" data-qid="${p.id}">
          <div class="qb"><div class="bottle">${bottleHTML(p)}</div></div>
          <div class="qbr">${p.brand}</div>
          <div class="qn">${p.name}</div>
          <div class="qp">${fmt(p.price)}</div>
          <span class="quiz-match">${Math.round(70+(s/maxS)*29)}% ${t2.quizMatch}</span>
        </div>`).join('')}</div>
      <div class="quiz-restart"><button class="btn btn-ghost" id="quizRestart">${t2.quizRestart}</button></div>
    </div>`;
    document.querySelectorAll('[data-qid]').forEach(c=>c.addEventListener('click',()=>openModal(+c.dataset.qid)));
    $('#quizRestart').addEventListener('click',()=>{ quizStep=0; quizAns=[]; renderQuiz(); });
  }
}

/* ---------- testimonials ---------- */
function renderTesti(){
  $('#testiWrap').innerHTML = T().testi.map(x=>`
    <div class="testi">
      <span class="t-mark">“</span>
      <div class="t-stars">★★★★★</div>
      <p>${x.t}</p>
      <div class="t-person"><div class="t-ava">${x.n.charAt(0)}</div><div><b>${x.n}</b><span>${x.r}</span></div></div>
    </div>`).join('');
}

/* ---------- FAQ ---------- */
function renderFaq(){
  $('#faqWrap').innerHTML = T().faq.map((f,i)=>`
    <div class="faq">
      <button class="faq-q" data-fq="${i}">${f.q}<span class="fx">＋</span></button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`).join('');
  document.querySelectorAll('.faq-q').forEach(b=>b.addEventListener('click',()=>{
    const item=b.parentElement, a=item.querySelector('.faq-a'), open=item.classList.contains('open');
    document.querySelectorAll('.faq').forEach(f=>{ f.classList.remove('open'); f.querySelector('.faq-a').style.maxHeight=null; });
    if(!open){ item.classList.add('open'); a.style.maxHeight=a.scrollHeight+'px'; }
  }));
}

/* ---------- contact form ---------- */
function applyFormPh(){
  const t=T();
  $('#cfName').placeholder=t.fNamePh; $('#cfMail').placeholder=t.fMailPh;
  $('#cfSubj').placeholder=t.fSubjPh; $('#cfMsg').placeholder=t.fMsgPh;
}
$('#cfSend').addEventListener('click',()=>{
  const t=T(), n=$('#cfName').value.trim(), m=$('#cfMail').value.trim(), msg=$('#cfMsg').value.trim();
  if(!n || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m) || !msg){ toast(t.fErr); return; }
  toast(t.fOk);
  ['#cfName','#cfMail','#cfSubj','#cfMsg'].forEach(s=>$(s).value='');
});

/* ---------- burger / mobile menu ---------- */
const burger=$('#burger'), mMenu=$('#mobileMenu');
burger.addEventListener('click',()=>{
  const open=mMenu.classList.toggle('open');
  burger.classList.toggle('open',open);
  document.body.style.overflow=open?'hidden':'';
});
mMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mMenu.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow='';
}));

/* ---------- hook everything into language switching ---------- */
function renderExtras(){ renderSpotlight(); renderQuiz(); renderTesti(); renderFaq(); applyFormPh(); }
const _origApplyLang = applyLang;
applyLang = function(){ _origApplyLang(); renderExtras(); };

/* observe new reveal elements & run first paint */
document.querySelectorAll('.reveal:not(.in)').forEach(el=>{ if(typeof obs!=='undefined'&&obs) obs.observe(el); else el.classList.add('in'); });
applyLang();

/* ════════════════════════════════════════════════
   V3 — DAY/NIGHT MODE · HEADER SEARCH
   ════════════════════════════════════════════════ */
const I18N_X3 = {
  en:{navSearchPh:"Search 200 fragrances…",nsAll:n=>`Show all ${n} results`,nsEmpty:"Nothing found — try another note or brand",themeDay:"Day mode",themeNight:"Night mode"},
  ru:{navSearchPh:"Поиск среди 200 ароматов…",nsAll:n=>`Показать все ${n} результатов`,nsEmpty:"Ничего не найдено — попробуйте другую ноту или бренд",themeDay:"Дневной режим",themeNight:"Ночной режим"},
  hy:{navSearchPh:"Որոնում 200 օծանելիքների մեջ…",nsAll:n=>`Ցույց տալ բոլոր ${n} արդյունքները`,nsEmpty:"Ոչինչ չգտնվեց — փորձիր այլ նոտա կամ բրենդ",themeDay:"Ցերեկային ռեժիմ",themeNight:"Գիշերային ռեժիմ"}
};
Object.keys(I18N_X3).forEach(l=>Object.assign(I18N[l],I18N_X3[l]));

/* ---------- day / night mode ---------- */
const themeBtn = $('#themeToggle');
function setTheme(light){
  document.body.classList.toggle('light', light);
  themeBtn.setAttribute('aria-label', light ? T().themeNight : T().themeDay);
}
themeBtn.addEventListener('click', ()=> setTheme(!document.body.classList.contains('light')));
/* follow the device preference on first load */
setTheme(window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches);

/* ---------- header live search ---------- */
const nsInput = $('#navSearchInput'), nsResults = $('#nsResults');
let nsTimer, nsSel = -1, nsItems = [];

function nsQuery(q){
  q = q.trim().toLowerCase();
  if(!q) return [];
  return PERFUMES
    .map(p=>{
      const name=p.name.toLowerCase(), brand=p.brand.toLowerCase();
      let s=-1;
      if(name.startsWith(q)) s=4;
      else if(name.includes(q)) s=3;
      else if(brand.startsWith(q)) s=2;
      else if(brand.includes(q)) s=1;
      else if(p.notes.join(' ').toLowerCase().includes(q)) s=0;
      return {p,s};
    })
    .filter(x=>x.s>=0)
    .sort((a,b)=>b.s-a.s||b.p.reviews-a.p.reviews)
    .map(x=>x.p);
}
function nsRender(){
  const t=T(), q=nsInput.value;
  const list=nsQuery(q);
  nsSel=-1;
  if(!q.trim()){ nsResults.classList.remove('open'); nsResults.innerHTML=''; return; }
  if(!list.length){
    nsResults.innerHTML=`<div class="ns-empty">${t.nsEmpty}</div>`;
    nsResults.classList.add('open'); nsItems=[]; return;
  }
  const top=list.slice(0,6);
  nsResults.innerHTML = top.map(p=>`
    <div class="ns-item" data-ns="${p.id}">
      <div class="ns-thumb">${bottleHTML(p)}</div>
      <div><b>${p.name}</b><small>${p.brand}</small></div>
      <span class="ns-price">${fmt(p.price)}</span>
    </div>`).join('')
    + (list.length>6 ? `<button class="ns-all" id="nsAll">${t.nsAll(list.length)}</button>` : '');
  nsResults.classList.add('open');
  nsItems=[...nsResults.querySelectorAll('.ns-item')];
  nsItems.forEach(it=>it.addEventListener('click',()=>{ openModal(+it.dataset.ns); nsClose(); }));
  const all=$('#nsAll');
  if(all) all.addEventListener('click', nsGoAll);
}
function nsGoAll(){
  state.search=nsInput.value; state.shown=24;
  $('#searchInput').value=nsInput.value;
  render(); nsClose();
  const col=document.getElementById('collection'); if(col.scrollIntoView) col.scrollIntoView({behavior:'smooth'});
}
function nsClose(){ nsResults.classList.remove('open'); nsInput.blur(); }
nsInput.addEventListener('input',()=>{ clearTimeout(nsTimer); nsTimer=setTimeout(nsRender,180); });
nsInput.addEventListener('focus',()=>{ if(nsInput.value.trim()) nsRender(); });
nsInput.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ nsClose(); return; }
  if(e.key==='Enter'){
    if(nsSel>=0 && nsItems[nsSel]) nsItems[nsSel].click();
    else nsGoAll();
    return;
  }
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){
    e.preventDefault();
    if(!nsItems.length) return;
    nsSel = e.key==='ArrowDown' ? (nsSel+1)%nsItems.length : (nsSel-1+nsItems.length)%nsItems.length;
    nsItems.forEach((it,i)=>it.classList.toggle('sel',i===nsSel));
    if(nsItems[nsSel].scrollIntoView) nsItems[nsSel].scrollIntoView({block:'nearest'});
  }
});
document.addEventListener('click',e=>{ if(!e.target.closest('#navSearch')) nsResults.classList.remove('open'); });
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); nsInput.focus(); }
});

/* hook placeholder + aria into language switching */
function applyV3Lang(){
  nsInput.placeholder = T().navSearchPh;
  themeBtn.setAttribute('aria-label', document.body.classList.contains('light') ? T().themeNight : T().themeDay);
}
const _applyLangV2 = applyLang;
applyLang = function(){ _applyLangV2(); applyV3Lang(); };
applyV3Lang();


/* ════════════════════════════════════════════════
   CINEMA · PYRAMID · SIMILAR · RECENTLY VIEWED
   ════════════════════════════════════════════════ */
const I18N_X4 = {
en:{
  cnT1:"Unwrap the silence", cnT2:"Set the spirit free", cnT3:"Become unforgettable",
  cnBtn:"Discover this fragrance",
  pyrTitle:"Olfactory pyramid", pyrTop:"Top notes", pyrHeart:"Heart notes", pyrBase:"Base notes",
  simTitle:"You may also like",
  rvEyebrow:"Your trail", rvTitle:'Recently <em>viewed</em>'
},
ru:{
  cnT1:"Разверни тишину", cnT2:"Выпусти дух на свободу", cnT3:"Стань незабываемым",
  cnBtn:"Узнать этот аромат",
  pyrTitle:"Ольфакторная пирамида", pyrTop:"Верхние ноты", pyrHeart:"Ноты сердца", pyrBase:"Базовые ноты",
  simTitle:"Вам также может понравиться",
  rvEyebrow:"Ваш след", rvTitle:'Недавно <em>просмотренные</em>'
},
hy:{
  cnT1:"Բացիր լռությունը", cnT2:"Ազատ արձակիր ոգին", cnT3:"Դարձիր անմոռանալի",
  cnBtn:"Բացահայտել այս բույրը",
  pyrTitle:"Բուրմունքի բուրգ", pyrTop:"Վերին նոտաներ", pyrHeart:"Սրտի նոտաներ", pyrBase:"Բազային նոտաներ",
  simTitle:"Քեզ կարող է դուր գալ նաև",
  rvEyebrow:"Քո հետքը", rvTitle:'Վերջերս <em>դիտվածներ</em>'
}};
Object.keys(I18N_X4).forEach(l=>Object.assign(I18N[l], I18N_X4[l]));

/* ════════ CINEMA — scroll-driven unboxing with inertia ════════ */
(function(){
  const cinema = document.getElementById('cinema');
  if (!cinema) return;
  const hero = PERFUMES.find(p => /black orchid/i.test(p.name||''))
            || PERFUMES.find(p => /\.png(\?.*)?$/i.test(p.image||''))
            || PERFUMES[0];
  const img = document.getElementById('cnBottle');
  img.src = hero.image; img.dataset.src = hero.image; img.alt = hero.name;
  img.classList.add('fade-img');
  if (!/\.png(\?.*)?$/i.test(hero.image||'')) img.classList.add('framed');
  img.onload  = function(){ window.imgLoaded(this); };
  img.onerror = function(){ window.imgError(this); };
  document.getElementById('cnFBrand').textContent = hero.brand || '';
  document.getElementById('cnFName').textContent  = hero.name  || '';
  /* the box wears the hero's own livery */
  const shortName = (hero.name||'').replace(new RegExp('^'+(hero.brand||'').replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s*[—–-]\\s*','i'),'');
  const setTxt = (id,v)=>{ const el=document.getElementById(id); if(el&&v) el.textContent=v; };
  setTxt('cnBoxBrand', (hero.brand||'').toUpperCase());
  setTxt('cnLidBrand', (hero.brand||'').toUpperCase());
  setTxt('cnBoxName', shortName.toUpperCase());
  setTxt('cnBoxVol', 'EAU DE PARFUM' + (hero.volume ? ' · ' + hero.volume : ''));
  document.getElementById('cnFBtn').addEventListener('click', ()=> openModal(hero.id));

  /* ── three families of spray particles ── */
  const sprayEl = document.getElementById('cnSpray');
  const PARTS = [];
  const mkPart = (type) => {
    let el, dx, dy, delay, extra = {};
    const cone = (-90 + (Math.random()*96 - 48)) * Math.PI/180;   /* upward cone */
    if (type === 'drop'){                                          /* fine golden mist */
      el = document.createElement('i'); el.className = 'cn-drop';
      const d = 70 + Math.random()*230, s = 2.5 + Math.random()*6;
      el.style.width = el.style.height = s + 'px';
      dx = Math.cos(cone)*d; dy = Math.sin(cone)*d; delay = Math.random()*0.3;
    } else if (type === 'spark'){                                  /* twinkling stars */
      el = document.createElement('i'); el.className = 'cn-spark';
      el.textContent = '✦';
      el.style.fontSize = (7 + Math.random()*9) + 'px';
      const d = 110 + Math.random()*260;
      dx = Math.cos(cone)*d; dy = Math.sin(cone)*d; delay = Math.random()*0.42;
      extra.rot = (Math.random()*2-1) * 260;
    } else {                                                       /* thin light streaks */
      el = document.createElement('i'); el.className = 'cn-streak';
      const d = 130 + Math.random()*180;
      dx = Math.cos(cone)*d; dy = Math.sin(cone)*d; delay = Math.random()*0.18;
      extra.ang = Math.atan2(dy, dx) * 180/Math.PI + 90;
      el.style.transform = `rotate(${extra.ang}deg)`;
    }
    sprayEl.appendChild(el);
    PARTS.push({ el, dx, dy, delay, type, ...extra });
  };
  for (let i=0;i<30;i++) mkPart('drop');
  for (let i=0;i<16;i++) mkPart('spark');
  for (let i=0;i<7;i++)  mkPart('streak');

  const clamp01 = v => Math.max(0, Math.min(1, v));
  const seg = (p,a,b) => clamp01((p-a)/(b-a));
  const easeOut = t => 1 - Math.pow(1-t, 3);
  const easeInOut = t => t<.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;
  const reducedMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function cnApply(p){
    const lid  = document.getElementById('cnLid');
    const box  = document.getElementById('cnBox');
    const wrap = document.getElementById('cnBottleWrap');
    const glow = document.getElementById('cnGlow');
    const mist = document.getElementById('cnMist');
    const haze = document.getElementById('cnHaze');
    const word = document.querySelector('.cinema-bgword');
    const bar  = document.getElementById('cnProgressBar');

    /* 1 ─ the lid lifts away */
    const t1 = easeOut(seg(p, 0.02, 0.28));
    lid.style.transform = `translate(${70*t1}px, ${-180*t1}px) rotate(${-24*t1}deg)`;
    lid.style.opacity   = 1 - seg(p, 0.32, 0.48);

    /* 2 ─ the bottle rises, large and luminous */
    const t2 = easeInOut(seg(p, 0.16, 0.54));
    wrap.style.opacity   = seg(p, 0.14, 0.28);
    let bottleT = `translateX(-50%) translateY(${150 - 290*t2}px) scale(${0.68 + 0.4*t2}) rotate(${(1-t2)*-4}deg)`;
    glow.style.opacity   = t2;
    glow.style.transform = `translateX(-50%) scaleX(${0.4 + 0.9*t2})`;

    /* the box bows out */
    const t3 = seg(p, 0.38, 0.66);
    box.style.opacity   = 1 - t3;
    box.style.transform = `translateX(-50%) translateY(${60*t3}px) scale(${1 - 0.14*t3})`;

    /* 3 ─ the spray */
    const t4 = seg(p, 0.58, 0.95);
    PARTS.forEach(pt => {
      const lt = clamp01((t4 - pt.delay) / (1 - pt.delay));
      const e  = easeOut(lt);
      const fall = 46 * e * e;                       /* gentle gravity arc */
      const o  = Math.sin(lt * Math.PI);
      if (pt.type === 'spark'){
        pt.el.style.transform = `translate(${pt.dx*e}px, ${pt.dy*e - 30*e + fall*0.5}px) rotate(${pt.rot*e}deg) scale(${0.4 + e})`;
        pt.el.style.opacity = o;
      } else if (pt.type === 'streak'){
        pt.el.style.transform = `translate(${pt.dx*e*0.92}px, ${pt.dy*e*0.92}px) rotate(${pt.ang}deg) scaleY(${0.2 + 1.4*o})`;
        pt.el.style.opacity = o * 0.75;
      } else {
        pt.el.style.transform = `translate(${pt.dx*e}px, ${pt.dy*e - 26*e + fall}px) scale(${0.5 + e*1.1})`;
        pt.el.style.opacity = o * 0.95;
      }
    });
    mist.style.opacity   = Math.sin(t4 * Math.PI) * 0.9;
    mist.style.transform = `translate(-50%,-34%) scale(${0.25 + 1.25*easeOut(t4)})`;
    haze.style.opacity   = Math.sin(clamp01(t4*1.15) * Math.PI) * 0.5;
    haze.style.transform = `translate(-50%,-20%) scale(${0.4 + 1.7*easeOut(t4)}) rotate(${30*t4}deg)`;

    /* the bottle breathes upward while spraying, with a tiny recoil */
    if (t4 > 0){
      const recoil = Math.sin(Math.min(t4*3,1) * Math.PI) * 5;
      bottleT = `translateX(-50%) translateY(${-140 - 30*t4 + recoil}px) scale(1.08) rotate(${-2.4*Math.sin(t4*Math.PI)}deg)`;
    }
    wrap.style.transform = bottleT;

    /* captions */
    [['cnC1',0.04,0.17,0.32],['cnC2',0.30,0.45,0.60],['cnC3',0.56,0.72,0.88]].forEach(([id,a,m,b])=>{
      const el = document.getElementById(id);
      el.style.opacity   = Math.min(seg(p,a,m), 1 - seg(p, b-0.06, b));
      el.style.transform = `translateY(${(1-seg(p,a,m))*28}px)`;
    });

    /* finale */
    const t5 = seg(p, 0.84, 0.97);
    const fin = document.getElementById('cnFinale');
    fin.style.opacity   = t5;
    fin.style.transform = `translateX(-50%) translateY(${(1-easeOut(t5))*28}px)`;
    fin.style.pointerEvents = t5 > .5 ? 'auto' : 'none';

    word.style.transform = `translate(-50%,-50%) translateY(${(p-.5)*-70}px)`;
    if (bar) bar.style.transform = `scaleY(${p})`;
  }

  let cnTarget = 0, cnCur = 0;
  function onScroll(){
    const total = cinema.offsetHeight - window.innerHeight;
    cnTarget = clamp01(-cinema.getBoundingClientRect().top / Math.max(total, 1));
  }
  function loop(){
    cnCur += (cnTarget - cnCur) * 0.085;              /* inertia: the scene glides after the scroll */
    if (Math.abs(cnTarget - cnCur) < 0.0004) cnCur = cnTarget;
    cnApply(cnCur);
    requestAnimationFrame(loop);
  }
  if (reducedMotion){ cnApply(1); return; }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); loop();
})();

/* ════════ NOTES PYRAMID + SIMILAR — inside the product modal ════════ */
function splitNotes(notes){
  const n = notes || [];
  if (n.length < 3) return [n, [], []];
  const a = Math.ceil(n.length/3), b = Math.ceil(n.length*2/3);
  return [n.slice(0,a), n.slice(a,b), n.slice(b)];
}
function similarTo(p){
  return PERFUMES
    .filter(x => x.id !== p.id)
    .map(x => {
      let s = 0;
      if (x.category === p.category) s += 3;
      s += (x.notes||[]).filter(n => (p.notes||[]).includes(n)).length * 2;
      if (Math.abs(x.price - p.price) < 60) s += 1;
      return { x, s };
    })
    .sort((a,b)=> b.s-a.s || (b.x.rating||0)-(a.x.rating||0))
    .slice(0,4).map(o=>o.x);
}
function enrichModal(id){
  const p = PERFUMES.find(x=>x.id===id); if (!p) return;
  const t = T();
  const info = document.getElementById('modalInfo');
  if (!info || info.querySelector('.pyr')) return;
  const [top, heart, base] = splitNotes(p.notes);
  const hasNotes = (p.notes||[]).length > 0;
  const block = document.createElement('div');
  block.innerHTML = `
    ${hasNotes ? `<div class="pyr">
      <div class="modal-h">◆ ${t.pyrTitle}</div>
      ${top.length   ? `<div class="pyr-layer"><b>${t.pyrTop}</b><span>${top.join(' · ')}</span></div>` : ''}
      ${heart.length ? `<div class="pyr-layer"><b>${t.pyrHeart}</b><span>${heart.join(' · ')}</span></div>` : ''}
      ${base.length  ? `<div class="pyr-layer"><b>${t.pyrBase}</b><span>${base.join(' · ')}</span></div>` : ''}
    </div>` : ''}
    <div class="sim">
      <div class="modal-h">✦ ${t.simTitle}</div>
      <div class="sim-grid">${similarTo(p).map(x=>`
        <div class="sim-card" data-sid="${x.id}">
          <div class="sim-img">${bottleHTML(x)}</div>
          <div class="sim-name">${x.name}</div>
          <div class="sim-price">${fmt(x.price)}</div>
        </div>`).join('')}</div>
    </div>`;
  info.appendChild(block);
  block.querySelectorAll('[data-sid]').forEach(c => c.addEventListener('click', e => {
    e.stopPropagation(); openModal(+c.dataset.sid);
  }));
}

/* ════════ RECENTLY VIEWED (in-session) ════════ */
let rvList = [];
function rvPush(id){
  rvList = [id, ...rvList.filter(x=>x!==id)].slice(0,8);
  rvRender();
}
function rvRender(){
  const sec = document.getElementById('recentSec');
  const strip = document.getElementById('rvStrip');
  if (!sec || !strip) return;
  const items = rvList.map(id => PERFUMES.find(p=>p.id===id)).filter(Boolean);
  if (!items.length){ sec.style.display = 'none'; return; }
  sec.style.display = '';
  strip.innerHTML = items.map(p=>`
    <div class="rv-card" data-rid="${p.id}">
      <div class="rv-img">${bottleHTML(p)}</div>
      <div class="rv-name">${p.name}</div>
      <div class="rv-price">${fmt(p.price)}</div>
    </div>`).join('');
  strip.querySelectorAll('[data-rid]').forEach(c => c.addEventListener('click', ()=> openModal(+c.dataset.rid)));
}

/* hooks */
const _openModalX = openModal;
openModal = function(id){ _openModalX(id); enrichModal(id); rvPush(id); };
const _applyLangX = applyLang;
applyLang = function(){ _applyLangX(); rvRender(); };
applyLang();


/* ════════ ADAPTATION TO THE NEW CATALOG (105 items · AMD · hy categories) ════════ */
(function(){
  /* category labels in 3 languages */
  const CAT_L = {
    en:{ kanaci:"For her", txamardu:"For him", unisex:"Unisex" },
    ru:{ kanaci:"Женские", txamardu:"Мужские", unisex:"Унисекс" },
    hy:{ kanaci:"Կանացի", txamardu:"Տղամարդու", unisex:"Ունիսեքս" }
  };
  Object.keys(CAT_L).forEach(l => { I18N[l].cat = Object.assign({}, I18N[l].cat, CAT_L[l]); });
  Object.assign(I18N.en, { statFam:"Categories" });
  Object.assign(I18N.ru, { statFam:"Категории" });
  Object.assign(I18N.hy, { statFam:"Կատեգորիա" });

  /* hero stats reflect the real catalog */
  const stats = document.querySelectorAll('.hero-stats [data-count]');
  if (stats[0]) stats[0].dataset.count = PERFUMES.length;
  if (stats[1]) stats[1].dataset.count = new Set(PERFUMES.map(p=>p.brand)).size;
  if (stats[2]) stats[2].dataset.count = new Set(PERFUMES.map(p=>p.category)).size;

  /* quiz rebuilt for this catalog: for whom · character (matched in name/tagline) · budget */
  const QZ = {
    en:[
      {q:"Who will wear this fragrance?",o:[["♀","For her","kanaci"],["♂","For him","txamardu"],["◇","For anyone — unisex","unisex"],["✦","Surprise me","any"]]},
      {q:"What character should it have?",o:[["≈","Fresh & airy","fresh"],["✧","Sweet & cozy","sweet"],["●","Dark & intense","intense"],["❀","Classic & elegant","classic"]]},
      {q:"And the budget?",o:[["I","Up to 40.000 դ.","40000"],["II","40.000 – 90.000 դ.","90000"],["III","The sky is the limit","99999999"]]}
    ],
    ru:[
      {q:"Кто будет носить этот аромат?",o:[["♀","Для неё","kanaci"],["♂","Для него","txamardu"],["◇","Для всех — унисекс","unisex"],["✦","Удивите меня","any"]]},
      {q:"Какой у него характер?",o:[["≈","Свежий и лёгкий","fresh"],["✧","Сладкий и уютный","sweet"],["●","Тёмный и интенсивный","intense"],["❀","Классика и элегантность","classic"]]},
      {q:"И бюджет?",o:[["I","До 40.000 դ.","40000"],["II","40.000 – 90.000 դ.","90000"],["III","Без ограничений","99999999"]]}
    ],
    hy:[
      {q:"Ո՞վ է կրելու այս բույրը։",o:[["♀","Նրա համար","kanaci"],["♂","Նրա համար (տղ.)","txamardu"],["◇","Բոլորի համար՝ ունիսեքս","unisex"],["✦","Զարմացրու ինձ","any"]]},
      {q:"Ի՞նչ բնավորություն պիտի ունենա։",o:[["≈","Թարմ ու օդային","fresh"],["✧","Քաղցր ու հարմարավետ","sweet"],["●","Մուգ ու ինտենսիվ","intense"],["❀","Դասական ու էլեգանտ","classic"]]},
      {q:"Իսկ բյուջե՞ն։",o:[["I","Մինչև 40.000 դ.","40000"],["II","40.000 – 90.000 դ.","90000"],["III","Սահման չկա","99999999"]]}
    ]
  };
  I18N.en.quizQ = QZ.en; I18N.ru.quizQ = QZ.ru; I18N.hy.quizQ = QZ.hy;

  const STYLE_RX = {
    fresh:   /fresh|aqua|acqua|sport|cool|blue|bleu|marine|sauvage|cologne|թարմ|օդային|ծով/i,
    sweet:   /vanil|sweet|gourmand|candy|sugar|honey|tobacco vanille|cherry|chocolat|քաղցր|վանիլ/i,
    intense: /intense|extreme|noir|oud|night|nuit|black|dark|leather|absolu|ինտենսիվ|մուգ|կաշ/i,
    classic: /n°|no\.|original|edp|eau de parfum|classic|iconic|դասական|էլեգանտ|հավերժ/i
  };

  renderQuiz = function(){
    const t = T(), w = $('#quizWrap');
    if (!w) return;
    if (quizStep < t.quizQ.length) {
      const q = t.quizQ[quizStep];
      w.innerHTML = `<div class="quiz-progress">${t.quizQ.map((_,i)=>`<i class="${i<quizStep?'done':''}"></i>`).join('')}</div>
        <div class="quiz-step">
          <div class="quiz-q">${quizStep+1}. ${q.q}</div>
          <div class="quiz-opts">${q.o.map(o=>`<button class="quiz-opt" data-v="${o[2]}"><span class="q-emoji">${o[0]}</span>${o[1]}</button>`).join('')}</div>
        </div>`;
      w.querySelectorAll('.quiz-opt').forEach(b=>b.addEventListener('click',()=>{ quizAns[quizStep]=b.dataset.v; quizStep++; renderQuiz(); }));
      return;
    }
    const [who, style, budget] = quizAns;
    const rx = STYLE_RX[style];
    let scored = PERFUMES.filter(p => p.price <= +budget).map(p => {
      let s = 0;
      if (who !== 'any' && p.category === who) s += 4;
      if (who === 'any') s += 1;
      if (rx && rx.test(p.name + ' ' + (p.tagline||''))) s += 3;
      return { p, s };
    }).sort((a,b)=> b.s - a.s || a.p.price - b.p.price).slice(0, 3);
    if (!scored.length) scored = PERFUMES.slice(0,3).map(p=>({p,s:3}));
    const maxS = Math.max(scored[0].s, 1);
    const t2 = T();
    w.innerHTML = `<div class="quiz-results">
      <div class="quiz-res-head"><div class="qr-eyebrow">✦ ${t2.quizResEyebrow}</div><h3>${t2.quizResTitle}</h3></div>
      <div class="quiz-res-grid">${scored.map(({p,s})=>`
        <div class="quiz-res-card" data-qid="${p.id}">
          <div class="qb"><div class="bottle">${bottleHTML(p)}</div></div>
          <div class="qbr">${p.brand}</div>
          <div class="qn">${p.name}</div>
          <div class="qp">${fmt(p.price)}</div>
          <span class="quiz-match">${Math.round(68 + (s/maxS)*31)}% ${t2.quizMatch}</span>
        </div>`).join('')}</div>
      <div class="quiz-restart"><button class="btn btn-ghost" id="quizRestart">${t2.quizRestart}</button></div>
    </div>`;
    w.querySelectorAll('[data-qid]').forEach(c=>c.addEventListener('click',()=>openModal(+c.dataset.qid)));
    $('#quizRestart').addEventListener('click',()=>{ quizStep=0; quizAns=[]; renderQuiz(); });
  };

  applyLang();   /* repaint with the adapted labels, chips, quiz and stats */
})();

} /* ── end __startSillage ── */

function __normalize(list){
  return list.map(p => {
    const num = parseInt(String(p.price).replace(/[^\d]/g,''), 10) || 0;
    return Object.assign({}, p, {
      price: num,                                  /* numeric for sorting/cart math */
      priceLabel: String(p.price).trim(),
      notes: Array.isArray(p.notes) ? p.notes : [],
      sizes: Array.isArray(p.sizes) && p.sizes.length ? p.sizes : (p.volume ? [p.volume] : []),
      rating: (typeof p.rating === 'number') ? p.rating : null,
      reviews: (typeof p.reviews === 'number') ? p.reviews : 0,
      badge: p.badge || '',
      description: p.description || p.tagline || ''
    });
  });
}
__loadPerfumes()
  .then(data => { PERFUMES = __normalize(data); __startSillage(); })
  .catch(err => { console.error('Could not load parfumes.json:', err); __dataNotice(); });
