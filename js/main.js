/* Rosas e Jardins — protótipo: interações da home */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Produtos do slider ---------- */
  var list = $('.js-products');
  if (list && window.PRODUCTS) {
    list.innerHTML = window.PRODUCTS.map(function (p) {
      return '<article class="c-card">' +
        '<a href="#" class="c-card__name c-card__link">' + p.name + '</a>' +
        '<div class="c-card__mediawrap">' +
          '<div class="c-media c-card__media" data-label="' + p.image.split('/').pop() + '">' +
            '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" width="330" height="440">' +
          '</div>' +
          '<button type="button" class="c-card__fav js-fav" aria-label="Adicionar ' + p.name + ' aos favoritos" aria-pressed="false">' +
            '<svg class="icon"><use href="#i-heart"/></svg></button>' +
        '</div>' +
        '<div class="c-card__meta">' +
          (p.badge ? '<span class="c-badge"><svg class="icon"><use href="#i-award"/></svg>' + p.badge + '</span>' : '') +
          '<p class="c-card__price">' + p.price + '</p>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ---------- Imagens/vídeos ausentes: mostra o nome do arquivo esperado ---------- */
  function markMissing(el) {
    var box = el.closest('.c-media');
    if (box) box.classList.add('is-missing'); else el.classList.add('is-missing');
    if (!box && !el.classList.contains('c-logo__img')) el.style.visibility = 'hidden';
  }
  $$('img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) markMissing(img);
    img.addEventListener('error', function () { markMissing(img); });
  });
  $$('video').forEach(function (v) {
    v.addEventListener('error', function () { markMissing(v); }, true);
    if (v.error || v.networkState === 3) markMissing(v);
    v.addEventListener('loadeddata', function () { var b = v.closest('.c-media'); if (b) b.classList.remove('is-missing'); });
  });

  /* ---------- Header: some ao descer, volta ao subir ---------- */
  var header = $('.js-header'), lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    var busy = header.querySelector('.is-open') || !$('.js-search').hidden;
    header.classList.toggle('is-hidden', y > lastY && y > 120 && !busy);
    lastY = y;
  }, { passive: true });

  /* ---------- Mega menu ---------- */
  var mega = $('.has-mega'), megaBtn = $('.js-mega-toggle'), megaTimer;
  function setMega(open) {
    clearTimeout(megaTimer);
    mega.classList.toggle('is-open', open);
    megaBtn.setAttribute('aria-expanded', open);
  }
  if (mega) {
    var canHover = window.matchMedia('(hover: hover)').matches;
    if (canHover) {
      mega.addEventListener('mouseenter', function () { setMega(true); });
      mega.addEventListener('mouseleave', function () { megaTimer = setTimeout(function () { setMega(false); }, 150); });
    }
    megaBtn.addEventListener('click', function () { setMega(!mega.classList.contains('is-open')); });
  }

  /* ---------- Busca ---------- */
  var search = $('.js-search');
  $$('.js-search-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      search.hidden = !search.hidden;
      $$('.js-search-toggle').forEach(function (x) { x.setAttribute('aria-expanded', !search.hidden); });
      if (!search.hidden) { setMega(false); $('.js-search-input').focus(); }
    });
  });

  /* ---------- Gaveta mobile ---------- */
  var drawer = $('.js-drawer');
  $$('.js-drawer-open').forEach(function (b) { b.addEventListener('click', function () { drawer.hidden = false; document.body.style.overflow = 'hidden'; }); });
  $$('.js-drawer-close').forEach(function (b) { b.addEventListener('click', closeDrawer); });
  function closeDrawer() { drawer.hidden = true; document.body.style.overflow = ''; }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setMega(false); search.hidden = true; closeDrawer(); closeCal();
  });

  /* ---------- Favoritos ---------- */
  document.addEventListener('click', function (e) {
    var f = e.target.closest('.js-fav');
    if (!f) return;
    e.preventDefault();
    var on = f.classList.toggle('is-active');
    f.setAttribute('aria-pressed', on);
  });

  /* ---------- Slider ---------- */
  $$('.js-slider').forEach(function (s) {
    var track = $('.js-slider-track', s), prev = $('.js-slider-prev', s), next = $('.js-slider-next', s);
    function step() { var c = track.firstElementChild; return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300; }
    function update() {
      prev.classList.toggle('is-disabled', track.scrollLeft < 4);
      next.classList.toggle('is-disabled', track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
    }
    prev.addEventListener('click', function () { track.scrollBy({ left: -step() }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step() }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ---------- Calendário de entrega ---------- */
  var cal = $('.js-calendar'), calBtn = $('.js-date-toggle');
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var view = new Date(today.getFullYear(), today.getMonth(), 1), selected = null;
  var months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  function renderCal() {
    $('.js-cal-month').textContent = months[view.getMonth()] + ' ' + view.getFullYear();
    var g = $('.js-cal-grid'), html = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(function (d) { return '<span>' + d + '</span>'; }).join('');
    for (var i = 0; i < view.getDay(); i++) html += '<i></i>';
    var days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (var d = 1; d <= days; d++) {
      var dt = new Date(view.getFullYear(), view.getMonth(), d);
      var sel = selected && dt.getTime() === selected.getTime();
      html += '<button type="button" data-d="' + d + '"' + (dt < today ? ' disabled' : '') + (sel ? ' class="is-selected"' : '') + '>' + d + '</button>';
    }
    g.innerHTML = html;
    $('.js-cal-prev').disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
  }
  function closeCal() { if (cal) { cal.hidden = true; calBtn.setAttribute('aria-expanded', 'false'); } }
  if (cal) {
    calBtn.addEventListener('click', function () { cal.hidden = !cal.hidden; calBtn.setAttribute('aria-expanded', !cal.hidden); if (!cal.hidden) renderCal(); });
    $('.js-cal-prev').addEventListener('click', function () { view.setMonth(view.getMonth() - 1); renderCal(); });
    $('.js-cal-next').addEventListener('click', function () { view.setMonth(view.getMonth() + 1); renderCal(); });
    $('.js-cal-grid').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-d]'); if (!b) return;
      selected = new Date(view.getFullYear(), view.getMonth(), +b.dataset.d);
      calBtn.textContent = selected.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
      closeCal();
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.js-date')) closeCal(); });
  }

  /* ---------- Mapa: zoom e arrastar ---------- */
  var map = $('.js-map');
  if (map) {
    var canvas = $('.js-map-canvas', map), z = 1, tx = 0, ty = 0;
    function clamp() {
      var w = map.clientWidth, h = map.clientHeight;
      tx = Math.min(0, Math.max(w - w * z, tx)); ty = Math.min(0, Math.max(h - h * z, ty));
      canvas.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + z + ')';
      $$('.c-map__pin', canvas).forEach(function (p) { p.style.scale = 1 / z; });
    }
    var focus = $('.c-map__pin--store', canvas);
    function zoom(f) {
      var w = map.clientWidth / 2, h = map.clientHeight / 2, nz = Math.min(4, Math.max(1, z * f));
      if (focus && f > 1) { var px = parseFloat(focus.style.left) / 100 * map.clientWidth, py = parseFloat(focus.style.top) / 100 * map.clientHeight;
        tx = w - px * nz; ty = h - py * nz; z = nz; clamp(); return; }
      tx = w - (w - tx) * nz / z; ty = h - (h - ty) * nz / z; z = nz; clamp();
    }
    $('.js-zoom-in', map).addEventListener('click', function () { zoom(1.5); });
    $('.js-zoom-out', map).addEventListener('click', function () { zoom(1 / 1.5); });
    var drag = null;
    map.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button') || z === 1) return;
      drag = { x: e.clientX - tx, y: e.clientY - ty }; map.classList.add('is-dragging'); map.setPointerCapture(e.pointerId);
    });
    map.addEventListener('pointermove', function (e) { if (!drag) return; tx = e.clientX - drag.x; ty = e.clientY - drag.y; clamp(); });
    map.addEventListener('pointerup', function () { drag = null; map.classList.remove('is-dragging'); });
    window.addEventListener('resize', clamp);
  }
})();
