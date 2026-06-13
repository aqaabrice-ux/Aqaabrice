
var IMGS = {
  Supreme:     'images/Supreme.webp',
  Riwaiti:     'images/Riwaiti.webp',
  Premium:     'images/Premium.webp',
  Classic:     'images/Classic.webp',
  Yadgar:      'images/Yadgar.webp',
  Short_Grain: 'images/Short_Grain.webp',
  Daaghi:      'images/Daaghi.webp',
  B1:          'images/B1.webp',
  B2:          'images/B2.webp',
  Sella_gold:  'images/Sella_gold.webp',
  silver_sella:'images/silver_sella.webp'
};

var CAT_LABEL = { basmati:'Basmati Rice', 'brown-rice':'Brown Rice', sella:'Sella Rice', 'chai-patti':'Chai Patti' };
var CAT_FEATURES = {
  basmati:     ['Extra-long aromatic grain','Perfect for biryani & pulao','Rich fragrance when cooked','Sourced from premium fields'],
  'brown-rice':['Whole grain with bran intact','High in fibre & nutrients','Nutty flavour & texture','Great for healthy meals'],
  sella:       ['Parboiled for extra nutrition','Non-sticky golden grains','Long shelf life','Ideal for large gatherings'],
  'chai-patti':['Fresh aromatic leaves','Rich bold flavour','Perfect for doodh pati','Traditional Pakistani blend'],
};

var RICE_PH = '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="32" rx="14" ry="22" fill="#c9960c" opacity=".4"/><ellipse cx="32" cy="32" rx="8" ry="14" fill="#c9960c" opacity=".5"/><circle cx="32" cy="32" r="4" fill="#8B0000" opacity=".4"/></svg>';
var CHAI_PH = '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 20h32l-4 24H20L16 20z" fill="#8B0000" opacity=".35"/><path d="M44 28c4 0 8 2 8 6s-4 6-8 6" stroke="#8B0000" stroke-width="2.5" fill="none" opacity=".5"/></svg>';

var products = [
  {id:1,  name:'Royal Diamond',     sub:'1121 Steamed Basmati Rice',  cat:'basmati',    price:400, img:IMGS.Supreme,      badge:'Premium'},
  {id:2,  name:'Riwaiti',           sub:'Traditional Basmati Rice',   cat:'basmati',    price:380, img:IMGS.Riwaiti,      badge:'Premium'},
  {id:3,  name:'Premium',           sub:'Long Grain Basmati',         cat:'basmati',    price:360, img:IMGS.Premium,      badge:'Premium'},
  {id:4,  name:'Classic',           sub:'Classic Basmati Rice',       cat:'basmati',    price:330, img:IMGS.Classic,      badge:null},
  {id:5,  name:'Yadgaar',           sub:'Heritage Basmati Blend',     cat:'basmati',    price:300, img:IMGS.Yadgar,       badge:null},
  {id:6,  name:'Short Grain',       sub:'Premium Short Grain Rice',   cat:'basmati',    price:270, img:IMGS.Short_Grain,  badge:null},
  {id:7,  name:'Daaghi',            sub:'Perfect for Biryani',        cat:'basmati',    price:280, img:IMGS.Daaghi,       badge:'Biryani'},
  {id:8,  name:'B-1',               sub:'Whole Grain Rice',           cat:'basmati',    price:230, img:IMGS.B1,           badge:null},
  {id:9,  name:'B-2',               sub:'Fine Grain Rice',            cat:'basmati',    price:180, img:IMGS.B2,           badge:null},
  {id:10, name:'Sella Gold',        sub:'Golden Sella Basmati',       cat:'sella',      price:380, img:IMGS.Sella_gold,   badge:'Gold'},
  {id:11, name:'Sella Silver',      sub:'Silver Sella Basmati',       cat:'sella',      price:350, img:IMGS.silver_sella, badge:null},
  {id:12, name:'Chai Patti Classic',sub:'Aromatic Tea Leaves',        cat:'chai-patti', price:250, img:null,              badge:'Aromatic'},
  {id:13, name:'Chai Patti Premium',sub:'Premium Blend Tea Leaves',   cat:'chai-patti', price:350, img:null,              badge:'Premium'},
];

var cart = [];
var currentDetailId = null;
var detailFromPage  = 'products';

/* ── HELPERS ── */
function ph(cat){ return cat==='chai-patti' ? CHAI_PH : RICE_PH; }
function catLabel(cat){ return CAT_LABEL[cat]||cat; }
function getP(id){ for(var i=0;i<products.length;i++) if(products[i].id===id) return products[i]; return null; }

/* ── BUILD CARD ── */
function buildCard(p, mini){
  var mw = mini ? 'min-width:260px;' : '';
  var imgH = p.img
    ? '<img src="'+p.img+'" alt="'+p.name+'" style="width:100%;height:100%;object-fit:contain;background:#f8f3ec;display:block;transition:transform .5s ease;">'
    : '<div class="prod-img-ph">'+ph(p.cat)+'</div>';
  var bH = p.badge ? '<span class="prod-badge">'+p.badge+'</span>' : '';
  return '<div class="prod-card" id="card-'+p.id+'" style="'+mw+'" onclick="openDetail('+p.id+')">'
    +'<div class="prod-img">'+imgH+bH+'</div>'
    +'<div class="prod-body">'
      +'<div class="prod-category">'+catLabel(p.cat)+'</div>'
      +'<div class="prod-name">'+p.name+'</div>'
      +'<div class="prod-subtitle">'+p.sub+'</div>'
      +'<div class="prod-price">Rs. '+p.price.toLocaleString()+' <span>/ kg</span></div>'
      +'<button class="view-detail-btn" onclick="event.stopPropagation();openDetail('+p.id+')">'
        +'View Details'
        +' <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
      +'</button>'
    +'</div>'
  +'</div>';
}

/* ── RENDER ── */
function renderProducts(list){
  var g = document.getElementById('products-grid');
  g.innerHTML = list.length ? list.map(function(p){return buildCard(p,false);}).join('') : '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#7a6060">No products found.</div>';
}
function renderFeatured(){
  document.getElementById('home-featured').innerHTML = products.filter(function(p){return p.cat==='basmati';}).slice(0,5).map(function(p){return buildCard(p,true);}).join('');
}

/* ── QTY (product grid) ── */
function cQty(id,d){
  var inp=document.getElementById('qty-'+id); if(!inp) return;
  var p=getP(id); var v=Math.max(1,(parseInt(inp.value)||1)+d);
  inp.value=v;
  document.getElementById('total-'+id).textContent='Rs. '+(v*p.price).toLocaleString();
}
function uTotal(id,price){
  var inp=document.getElementById('qty-'+id); var v=Math.max(1,parseInt(inp.value)||1);
  inp.value=v; document.getElementById('total-'+id).textContent='Rs. '+(v*price).toLocaleString();
}

/* ── CART ── */
function addToCart(id){
  var p=getP(id);
  var qEl=document.getElementById('qty-'+id);
  var qty=Math.max(1,parseInt(qEl?qEl.value:1)||1);
  var ex=null; for(var i=0;i<cart.length;i++) if(cart[i].id===id){ex=cart[i];break;}
  if(ex){ex.qty+=qty;ex.total=ex.qty*p.price;}
  else cart.push({id:p.id,name:p.name,img:p.img,cat:p.cat,price:p.price,qty:qty,total:qty*p.price});
  updateCartUI(); showToast('Added: '+p.name); openCart();
}
function removeFromCart(id){ cart=cart.filter(function(x){return x.id!==id;}); updateCartUI(); }
function updateCartUI(){
  var total=0,count=0;
  for(var i=0;i<cart.length;i++){total+=cart[i].total;count+=cart[i].qty;}
  var cEl=document.getElementById('cart-count');
  cEl.textContent=count; cEl.classList.toggle('show',count>0);
  document.getElementById('cart-total').textContent='Rs. '+total.toLocaleString();
  var iEl=document.getElementById('cart-items');
  if(!cart.length){iEl.innerHTML='<div class="cart-empty"><div class="big-icon">🛒</div><p>Your cart is empty.<br/>Add some products to get started!</p></div>';return;}
  iEl.innerHTML=cart.map(function(item){
    var t=item.img?'<img src="'+item.img+'" class="cart-thumb" alt="'+item.name+'">'
      :'<div class="cart-thumb-ph"></div>';
    return '<div class="cart-item">'+t
      +'<div class="cart-item-info">'
        +'<div class="cart-item-name">'+item.name+'</div>'
        +'<div class="cart-item-meta">'+item.qty+' kg &times; Rs. '+item.price.toLocaleString()+'</div>'
        +'<div class="cart-item-price">Rs. '+item.total.toLocaleString()+'</div>'
      +'</div>'
      +'<button class="cart-item-remove" onclick="removeFromCart('+item.id+')">&#x2715;</button>'
    +'</div>';
  }).join('');
}
function openCart(){document.getElementById('cart-overlay').classList.add('open');document.getElementById('cart-sidebar').classList.add('open');}
function closeCart(){document.getElementById('cart-overlay').classList.remove('open');document.getElementById('cart-sidebar').classList.remove('open');}

/* ── CHECKOUT ── */
function openCheckout(){
  if(!cart.length){showToast('Cart is empty!');return;}
  closeCart();
  var total=0; for(var i=0;i<cart.length;i++) total+=cart[i].total;
  var rows=cart.map(function(i){return '<div class="row"><span>'+i.name+' ('+i.qty+'kg)</span><span>Rs. '+i.total.toLocaleString()+'</span></div>';}).join('');
  document.getElementById('modal-summary').innerHTML=rows+'<div class="row total"><span>Total</span><span>Rs. '+total.toLocaleString()+'</span></div>';
  document.getElementById('checkout-modal').classList.add('open');
}
function closeCheckout(){document.getElementById('checkout-modal').classList.remove('open');}
function placeOrder(){
  var name=document.getElementById('cust-name').value.trim();
  var phone=document.getElementById('cust-phone').value.trim();
  var addr=document.getElementById('cust-address').value.trim();
  if(!name||!phone||!addr){showToast('Please fill all required fields.');return;}
  var total=0; for(var i=0;i<cart.length;i++) total+=cart[i].total;
  var lines=cart.map(function(i){return i.name+' ('+i.qty+'kg)=Rs.'+i.total;}).join('%0A');
  var msg='Hello! Order:%0A%0AName: '+encodeURIComponent(name)+'%0APhone: '+encodeURIComponent(phone)+'%0AAddress: '+encodeURIComponent(addr)+'%0A%0A'+lines+'%0A%0ATotal: Rs.'+total+'%0APayment: COD';
  window.open('https://wa.me/923222442014?text='+msg,'_blank');
  closeCheckout(); cart=[]; updateCartUI();
  ['cust-name','cust-phone','cust-address'].forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('success-modal').classList.add('open');
}
function closeSuccess(){document.getElementById('success-modal').classList.remove('open');showPage('home');}

/* ── FILTER ── */
function filterCat(cat,btn){
  document.querySelectorAll('.cat-tab').forEach(function(t){t.classList.remove('active');});
  if(btn) btn.classList.add('active');
  else document.querySelectorAll('.cat-tab').forEach(function(t){
    var oc=t.getAttribute('onclick')||'';
    if(oc.indexOf("'"+cat+"'")!==-1||( cat==='all'&&oc.indexOf("'all'")!==-1)) t.classList.add('active');
  });
  renderProducts(cat==='all'?products:products.filter(function(p){return p.cat===cat;}));
}
function navToCategory(cat){
  showPage('products');
  setTimeout(function(){
    document.querySelectorAll('.cat-tab').forEach(function(t){t.classList.remove('active');});
    document.querySelectorAll('.cat-tab').forEach(function(t){
      var oc=t.getAttribute('onclick')||'';
      if(oc.indexOf("'"+cat+"'")!==-1) t.classList.add('active');
    });
    renderProducts(products.filter(function(p){return p.cat===cat;}));
  },100);
}

/* ── DETAIL PAGE ── */
function openDetail(id){
  var p=getP(id); if(!p) return;
  currentDetailId=id;
  var active=document.querySelector('.page.active');
  detailFromPage=active?active.id.replace('page-',''):'products';

  // Image
  var imgEl=document.getElementById('d-img');
  imgEl.innerHTML=p.img
    ?'<img src="'+p.img+'" alt="'+p.name+'" style="width:100%;height:100%;object-fit:cover;display:block;">'
    :'<div class="detail-img-ph">'+ph(p.cat)+'</div>';

  // Badges
  var b='<span class="dbadge gold">'+catLabel(p.cat)+'</span>';
  if(p.badge) b+=' <span class="dbadge">'+p.badge+'</span>';
  document.getElementById('d-badges').innerHTML=b;

  document.getElementById('d-cat').textContent=catLabel(p.cat);
  document.getElementById('d-name').textContent=p.name;
  document.getElementById('d-sub').textContent=p.sub;
  document.getElementById('d-price').innerHTML='Rs. '+p.price.toLocaleString()+'<span> / kg</span>';

  // Features
  var feats=CAT_FEATURES[p.cat]||['Premium quality','100% pure','Hygienically packed','Fast delivery'];
  document.getElementById('d-features').innerHTML=feats.map(function(f){return '<li>'+f+'</li>';}).join('');

  // Qty
  document.getElementById('d-qty').value=1;
  document.getElementById('d-total').textContent='Rs. '+p.price.toLocaleString();

  // WA link
  document.getElementById('d-wa').href='https://wa.me/923222442014?text='+encodeURIComponent('Hello! I want to order '+p.name+' ('+p.sub+'). Price: Rs.'+p.price+'/kg. Please confirm.');

  // Related
  var related=products.filter(function(x){return x.cat===p.cat&&x.id!==p.id;}).slice(0,4);
  document.getElementById('d-related').innerHTML=related.length
    ? related.map(function(rp){
        var ri=rp.img?'<img src="'+rp.img+'" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s;">':'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#fff5e6,#ffe0b2);">'+ph(rp.cat)+'</div>';
        var rb=rp.badge?'<span class="prod-badge">'+rp.badge+'</span>':'';
        return '<div class="rel-card" onclick="openDetail('+rp.id+')">'
          +'<div class="rel-card-img" style="position:relative;">'+ri+rb+'</div>'
          +'<div class="rel-card-body">'
            +'<div class="rel-card-cat">'+catLabel(rp.cat)+'</div>'
            +'<div class="rel-card-name">'+rp.name+'</div>'
            +'<div class="rel-card-price">Rs. '+rp.price.toLocaleString()+' <span>/kg</span></div>'
          +'</div></div>';
      }).join('')
    : '<p style="color:#7a6060;font-size:.9rem">No related products.</p>';

  // Navigate
  document.querySelectorAll('.page').forEach(function(pg){pg.classList.remove('active');});
  document.querySelectorAll('.nav-center a').forEach(function(a){a.classList.remove('active');});
  document.getElementById('page-detail').classList.add('active');
  var nEl=document.getElementById('nav-products');
  if(nEl) nEl.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function dChangeQty(d){
  var inp=document.getElementById('d-qty'); var p=getP(currentDetailId); if(!p||!inp) return;
  var v=Math.max(1,(parseInt(inp.value)||1)+d);
  inp.value=v; document.getElementById('d-total').textContent='Rs. '+(v*p.price).toLocaleString();
}
function dUpdateTotal(){
  var inp=document.getElementById('d-qty'); var p=getP(currentDetailId); if(!p) return;
  var v=Math.max(1,parseInt(inp.value)||1);
  inp.value=v; document.getElementById('d-total').textContent='Rs. '+(v*p.price).toLocaleString();
}
function dAddToCart(){
  if(!currentDetailId) return;
  var p=getP(currentDetailId);
  var qty=Math.max(1,parseInt(document.getElementById('d-qty').value)||1);
  var ex=null; for(var i=0;i<cart.length;i++) if(cart[i].id===p.id){ex=cart[i];break;}
  if(ex){ex.qty+=qty;ex.total=ex.qty*p.price;}
  else cart.push({id:p.id,name:p.name,img:p.img,cat:p.cat,price:p.price,qty:qty,total:qty*p.price});
  updateCartUI(); showToast('Added: '+p.name+' ('+qty+'kg)'); openCart();
}

function goBackFromDetail(){
  var target=detailFromPage==='home'?'home':'products';
  showPage(target);
}

/* ── NAV & SEARCH ── */
function showPage(page){
  document.querySelectorAll('.page').forEach(function(pg){pg.classList.remove('active');});
  document.querySelectorAll('.nav-center a').forEach(function(a){a.classList.remove('active');});
  document.getElementById('page-'+page).classList.add('active');
  var n=document.getElementById('nav-'+page); if(n) n.classList.add('active');
  if(page==='products') renderProducts(products);
  window.scrollTo({top:0,behavior:'smooth'});
}
function handleSearch(q){
  var el=document.getElementById('search-results');
  if(!q.trim()){el.classList.remove('show');return;}
  var res=products.filter(function(p){return p.name.toLowerCase().indexOf(q.toLowerCase())!==-1||p.sub.toLowerCase().indexOf(q.toLowerCase())!==-1;});
  if(!res.length){el.innerHTML='<div style="padding:16px;text-align:center;color:#7a6060;font-size:.88rem">No products found</div>';el.classList.add('show');return;}
  el.innerHTML=res.map(function(p){
    var t=p.img?'<img src="'+p.img+'" class="sr-thumb" alt="'+p.name+'">'
      :'<div class="sr-thumb-ph"></div>';
    return '<div class="sr-item" onclick="srGo('+p.id+')">'+t
      +'<div><div class="sr-name">'+p.name+'</div><div class="sr-cat">'+p.sub+'</div></div>'
      +'<span class="sr-price">Rs. '+p.price+'/kg</span></div>';
  }).join('');
  el.classList.add('show');
}
function closeSearch(){document.getElementById('search-results').classList.remove('show');document.getElementById('search-input').value='';}
function srGo(id){closeSearch();openDetail(id);}
function showToast(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},2800);}


// ── CAROUSEL ─────────────────────────────────────────────────
var carouselIdx = 0;
var carouselTotal = 3;
var carouselTimer = null;
var carouselInterval = 4000;
var carouselProgressTimer = null;

function carouselGoTo(idx) {
  carouselIdx = idx;
  document.getElementById('carouselTrack').style.transform = 'translateX(-' + (idx * 100) + '%)';
  document.querySelectorAll('.cdot').forEach(function(d, i){ d.classList.toggle('active', i === idx); });
  carouselResetProgress();
}

function carouselMove(dir) {
  var next = (carouselIdx + dir + carouselTotal) % carouselTotal;
  carouselGoTo(next);
  carouselResetAutoplay();
}

function carouselResetProgress() {
  var bar = document.getElementById('carouselProgress');
  bar.style.transition = 'none';
  bar.style.width = '0%';
  setTimeout(function(){
    bar.style.transition = 'width ' + carouselInterval + 'ms linear';
    bar.style.width = '100%';
  }, 30);
}

function carouselResetAutoplay() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(function(){
    carouselGoTo((carouselIdx + 1) % carouselTotal);
  }, carouselInterval);
  carouselResetProgress();
}

// Touch/swipe support
var carouselTouchX = 0;
var carouselEl = document.getElementById('heroCarousel');
if (carouselEl) {
  carouselEl.addEventListener('touchstart', function(e){ carouselTouchX = e.touches[0].clientX; }, {passive:true});
  carouselEl.addEventListener('touchend', function(e){
    var dx = e.changedTouches[0].clientX - carouselTouchX;
    if (Math.abs(dx) > 50) { carouselMove(dx < 0 ? 1 : -1); }
  }, {passive:true});
}

// Start autoplay
carouselResetAutoplay();


// ── MOBILE MENU ───────────────────────────────────────────────
function toggleMobileMenu(){
  var hb = document.getElementById('hamburger');
  var mm = document.getElementById('mobile-menu');
  var ov = document.getElementById('mob-overlay');
  hb.classList.toggle('open');
  mm.classList.toggle('open');
  ov.classList.toggle('open');
}
function closeMobileMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('mob-overlay').classList.remove('open');
}

/* ── INIT ── */
renderProducts(products);
renderFeatured();
