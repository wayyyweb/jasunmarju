/* =========================================================================
   JASUN MARJU — MAIN.JS (Vanilla JS murni, tanpa framework)
   Semua efek gerak memakai opacity/transform saja agar tetap 60fps.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- 1. FADE-IN SAAT HALAMAN DIMUAT ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(function () {
      document.body.classList.add('is-loaded');
    });
  });

  /* ---------- 2. TRANSISI HALUS ANTAR HALAMAN (tanpa flash putih) ---------- */
  function isInternalNavLink(a) {
    if (!a || !a.getAttribute) return false;
    var href = a.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('#')) return false; // anchor di halaman yang sama
    if (a.target === '_blank') return false;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (a.hasAttribute('data-no-transition')) return false;
    try {
      var url = new URL(href, window.location.href);
      return url.origin === window.location.origin;
    } catch (e) {
      return false;
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!isInternalNavLink(a)) return;

    var url = new URL(a.getAttribute('href'), window.location.href);
    var samePageAnchor = url.pathname === window.location.pathname && url.hash;
    if (samePageAnchor) return; // biarkan native smooth-scroll bekerja

    e.preventDefault();
    document.body.classList.add('is-leaving');
    window.setTimeout(function () {
      window.location.href = a.getAttribute('href');
    }, 320);
  });

  /* ---------- 3. NAVBAR: efek scroll + menu mobile ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  onScroll();

  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
      var expanded = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      document.body.classList.remove('nav-open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.body.classList.remove('nav-open');
  });

  /* ---------- 4. TANDAI MENU AKTIF SESUAI HALAMAN ---------- */
  (function markActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a, .footer-nav a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var hrefPage = href.split('#')[0].split('/').pop() || 'index.html';
      if (hrefPage === path && !href.startsWith('#')) {
        a.classList.add('is-active');
      }
    });
  })();

  /* ---------- 5. SCROLL REVEAL (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 6. YOUTUBE LITE-EMBED (hemat performa) ---------- */
  document.querySelectorAll('.yt-lite').forEach(function (wrap) {
    wrap.addEventListener('click', function loadVideo() {
      var id = wrap.getAttribute('data-id');
      if (!id) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = wrap.getAttribute('data-title') || 'Video Jasun Marju';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
      wrap.removeEventListener('click', loadVideo);
    });
  });

  /* ---------- 7. SWIPER (video carousel) ---------- */
  if (window.Swiper) {
    var videoSwiperEl = document.querySelector('.videos-swiper');
    if (videoSwiperEl) {
      new Swiper(videoSwiperEl, {
        slidesPerView: 1.15,
        spaceBetween: 22,
        loop: false,
        speed: 500,
        navigation: {
          nextEl: videoSwiperEl.querySelector('.swiper-button-next'),
          prevEl: videoSwiperEl.querySelector('.swiper-button-prev'),
        },
        pagination: {
          el: videoSwiperEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
        breakpoints: {
          640: { slidesPerView: 1.6, spaceBetween: 24 },
          960: { slidesPerView: 2.3, spaceBetween: 26 },
          1280: { slidesPerView: 3, spaceBetween: 28 },
        },
      });
    }

    var videosPageSwiperEl = document.querySelector('.videos-page-swiper');
    if (videosPageSwiperEl) {
      new Swiper(videosPageSwiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        speed: 550,
        navigation: {
          nextEl: videosPageSwiperEl.querySelector('.swiper-button-next'),
          prevEl: videosPageSwiperEl.querySelector('.swiper-button-prev'),
        },
        pagination: {
          el: videosPageSwiperEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
      });
    }
  }

  /* ---------- 8. GLIGHTBOX (galeri foto) ---------- */
  if (window.GLightbox) {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true,
      closeButton: true,
    });
  }

  /* ---------- 9. MODAL BACA BERITA (news.html) ---------- */
  var modal = document.querySelector('.modal');
  if (modal) {
    var modalTitle = modal.querySelector('.modal__title');
    var modalMeta = modal.querySelector('.modal__meta');
    var modalBody = modal.querySelector('.modal__body');
    var modalClose = modal.querySelector('.modal__close');
    var modalBackdrop = modal.querySelector('.modal__backdrop');

    function openModal(source) {
      var title = source.getAttribute('data-title') || '';
      var meta = source.getAttribute('data-meta') || '';
      var bodyTemplate = document.getElementById(source.getAttribute('data-target'));
      if (modalTitle) modalTitle.textContent = title;
      if (modalMeta) modalMeta.textContent = meta;
      if (modalBody && bodyTemplate) modalBody.innerHTML = bodyTemplate.innerHTML;
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
    }
    function closeModal() {
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('[data-target]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(btn);
      });
    });
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }
})();
