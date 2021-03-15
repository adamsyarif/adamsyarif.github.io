hljs.initHighlightingOnLoad();

const ENV = {};
ENV.repoUrl = 'https://adamsyarif.github.io/blogger/';
ENV.blogUrl = 'https://web-belajar-pemrograman.blogspot.com/';

const APP = {
  REQ: [],
  req: (u, c)=>{
    $.ajax({
      method: 'GET',
      url: u,
      beforeSend: ()=> APP.loader(true),
      complete: ()=> APP.loader(false)
    }).done(r => c(r)).fail((x, s, e)=>{
      e ? (
        APP.toast('Error, please check console for details'),
        console.log(e)
      ) : APP.toast(s);
    });
  },
  loader: s =>{
    const l = $('#loader');
    if(s){
      if(APP.REQ.length == 0) l.show();
      APP.REQ.push(1);
    } else {
      if(APP.REQ.length > 0) APP.REQ.pop();
      if(APP.REQ.length == 0) l.hide();
    }
  },
  TOAST: null,
  toast: m =>{
    if(APP.TOAST) clearTimeout(APP.TOAST);
    const t = $('#toast');
    t.show().find('div').text(m);
    APP.TOAST = setTimeout(()=>{
      APP.TOAST = null;
      t.hide();
    }, 3000);
  },
  worker: (u, c)=>{
    APP.req(u, r =>{
      const b = new Blob([r], {type:'application/javascript'});
      c(new Worker(URL.createObjectURL(b)));
    });
  },
  validate: (e, p)=>{
    $(e).val($(e).val().replace(p, ''));
  },
  copy: e =>{
    $(e).select();
    document.execCommand('copy');
    APP.toast('Teks telah disalin');
  },
  preventDefault: e =>{
    e.preventDefault();
    return false;
  }
};

const FEED = {
  u1: ENV.blogUrl +'feeds/posts/default',
  u2: ENV.blogUrl +'search',
  u3: 'alt=json&max-results=',
  query: ()=>{
    const q = new URL(location.href).searchParams.get('q');
    $('#search-detail').text(' untuk kata kunci "'+ q +'"');
    APP.req(FEED.u1 +'?q='+ q +'&'+ FEED.u3 + 1000, RESULT.main);
  },
  label: ()=>{
    const p = new URL(location.href).pathname;
    const l = p.slice((p.lastIndexOf('/')+1), p.length);
    $('#search-detail').text(' untuk kategori "'+ l +'"');
    APP.req(FEED.u1 +'/-/'+ l +'?'+ FEED.u3 + 1000, RESULT.main);
  },
  related: ()=>{
    $('#section-name').text('Artikel terkait');
    const l = $('#article-label').val().split(',').filter(v => v.trim() != '');
    const r = Math.floor(Math.random() * l.length);
    APP.req(FEED.u1 +'/-/'+ l[r] +'?'+ FEED.u3 + 1000, RESULT.section);
  },
  newer: ()=>{
    $('#section-name').text('Artikel terbaru');
    APP.req(FEED.u1 +'?'+ FEED.u3 + 10, RESULT.section);
  },
  search: ()=>{
    const s = $('#searchbar');
    (+$('[name=searchbar]:checked').val() == 1)? (
      const q = s.find(':text').val().trim(),
      q ? location.assign(encodeURI(FEED.u2 +'?q='+ q)) : APP.toast('Kata kunci tidak boleh kosong')
    ) : location.assign(encodeURI(FEED.u2 +'/label/'+ s.find('select').val()));
  }
};

const RESULT = {
  data: [],
  page: 1,
  pages: ()=>{
    const p = Math.ceil(RESULT.data.length/7);
    return (p > 0)? p : 1;
  },
  previous: ()=>{
    if(RESULT.page > 1){
      RESULT.page -= 1;
      RESULT.load();
    }
  },
  next: ()=>{
    if(RESULT.page < RESULT.pages()){
      RESULT.page += 1;
      RESULT.load();
    }
  },
  load: ()=>{
    APP.loader(true);
    const e = [...RESULT.data].splice(((RESULT.page-1)*7),7);
    (e.length > 0)? $('#search-result').html(RESULT.article(e)) : (
      const r = $('.search-result'),
      r.hide(),
      r.eq(1).show()
    );
    $('#current-page').text(RESULT.page);
    $('#total-page').text(RESULT.pages());
    _scrollTop();
    setTimeout(APP.loader, 900);
  },
  main: d =>{
    RESULT.data = d.feed.entry ? d.feed.entry : [];
    $('#search-total').text(RESULT.data.length);
    RESULT.load();
  },
  section: d =>{
    const e = d.feed.entry.sort(()=> Math.random()-0.5).slice(0,5);
    $('#section-result').html(RESULT.article(e));
  },
  article: e =>{
    let a = '';
    e.forEach(d =>{
      a += '<table style="width:100%">'+
              '<tr>'+
                '<td style="vertical-align:top">'+
                  '<div class="thumbnail w3-card-2 w3-margin-right">'+
                    '<img src="'+ d.media$thumbnail.url +'"/>'+
                  '</div>'+
                '</td>'+
                '<td>'+
                  '<b class="w3-large w3-text-dark-gray">'+ d.title.$t +'</b>'+
                  '<div class="w3-small w3-justify">'+ d.summary.$t.slice(0,100) +'..</div>'+
                  '<p class="w3-right-align">'+
                    '<a class="w3-button w3-small w3-border w3-round-large" href="'+ d.link[2].href +'">Baca selengkapnya</a>'+
                  '</p>'+
                '</td>'+
              '</tr>'+
            '</table>';
    });
    return a;
  }
};

const _categories = r =>{
  let l = '';
  r.feed.category.forEach(c =>{
    l += '<option value="'+ c.term +'">'+ c.term +'</option>';
  });
  $('#searchbar select').html(l);
};

const _menubar = e =>{
  $(e).find('i').toggleClass('fa-folder fa-folder-open');
  $(e).next().slideToggle();
};

const _scrollTop = ()=> $('#inner-wrapper').animate({scrollTop:0}, 800);

(()=>{
  if(typeof(Worker) != 'undefined'){
    APP.worker(ENV.repoUrl +'workers.js', w =>{
      w.onmessage = e =>{
        const t = $('.titles');
        if(e.data.text) t.find('b').text(e.data.text);
        if(e.data.pointer) t.find('span').toggleClass('w3-text-white w3-text-gray');
      };
    });
  }
  (+$('#search-type').val() == 1)? FEED.query() : FEED.label();
  (+$('#section-type').val() == 1)? FEED.related() : FEED.newer();
  $('body').on('contextmenu', APP.preventDefault);
  $('form').submit(APP.preventDefault).trigger('reset');
  $(':radio').change(function(){
    $('[name='+ $(this).attr('name') +']').removeAttr('checked');
    $(this).attr('checked', true);
  });
  $('#searchbar :radio').change(function(){
    const s = $('#searchbar');
    s.find('section').hide();
    s.find('section:nth-of-type('+ $(this).val() +')').show();
  });
  $('#article-body').on('select copy cut', APP.preventDefault);
  $('.what-time-is').text(()=>{
    const h = new Date().getHours();
    return (h >= 3 && h <= 10)? 'pagi' : (h >= 11 && h <= 14)? 'siang' : (h >= 15 && h <= 17)? 'sore' : 'malam';
  });
  $('.copyright-year').text(new Date().getFullYear());
  setTimeout(()=>{
    $('#cover').fadeOut(1000, function(){
      $(this).remove();
    });
  }, 100);
})();
