hljs.initHighlightingOnLoad();

const ENV = {};
ENV.repoUrl = 'https://adamsyarif.github.io/blogger/';
ENV.blogUrl = 'https://web-belajar-pemrograman.blogspot.com/';

const APP = {
  REQ: [],
  req: function(u, c){
    $.ajax({
      method: 'GET',
      url: u,
      beforeSend: ()=> this.loader(true),
      complete: ()=> this.loader(false)
    }).done(r => c(r)).fail((x, s, e)=>{
      e ? (
        this.toast('Error, please check console for details'),
        console.log(e)
      ) : this.toast(s);
    });
  },
  loader: function(s){
    const l = $('#loader');
    if(s){
      if(this.REQ.length == 0) l.show();
      this.REQ.push(1);
    } else {
      if(this.REQ.length > 0) this.REQ.pop();
      if(this.REQ.length == 0) l.hide();
    }
  },
  TOAST: null,
  toast: function(m){
    if(this.TOAST) clearTimeout(this.TOAST);
    const t = $('#toast');
    t.show().find('div').text(m);
    this.TOAST = setTimeout(()=>{
      this.TOAST = null;
      t.hide();
    }, 3000);
  },
  worker: function(u, c){
    this.req(u, (r)=>{
      const b = new Blob([r], {type:'application/javascript'});
      const o = URL.createObjectURL(b);
      const w = new Worker(o);
      c(w);
    });
  },
  validate: (e, p)=>{
    $(e).val($(e).val().replace(p, ''));
  },
  copy: function(e){
    $(e).select();
    document.execCommand('copy');
    this.toast('Teks telah disalin');
  },
  preventDefault: (e)=>{
    e.preventDefault();
    return false;
  }
};

const _search = (i)=>{
  const f = ENV.blogUrl +'feeds/posts/default';
  const s = ENV.blogUrl +'search';
  const r1 = (n, u, m)=>{
    $('#search-detail').text('untuk '+ n);
    APP.req(u +'alt=json&max-results='+ m, _result.main);
  };
  const r2 = (n, u, m)=>{
    $('#section-name').text(n);
    APP.req(u +'alt=json&max-results='+ m, _result.section);
  };
  switch(i){
    case 1:
      {
        const q = new URL(location.href).searchParams.get('q');
        r1('kata kunci "'+ q +'"', f +'?q='+ q +'&', 1000);
      }
    break;
    case 2:
      {
        const p = new URL(location.href).pathname;
        const c = p.slice((p.lastIndexOf('/')+1), p.length);
        r1('kategori "'+ c +'"', f +'/-/'+ c +'?', 1000);
      }
    break;
    case 3:
      {
        const l = $('#article-label').val().split(',').filter(v => v.trim() != '');
        const r = Math.floor(Math.random() * l.length);
        r2('Artikel terkait', f +'/-/'+ l[r] +'?', 1000);
      }
    break;
    case 4:
      r2('Artikel terbaru', f +'?', 10);
    break;
    default:
      {
        const e = $('#searchbar');
        switch(+$('[name=searchbar]:checked').val()){
          case 1:
            {
              const q = e.find(':text').val().trim();
              q ? location.assign(encodeURI(s +'?q='+ q)) : APP.toast('Kata kunci tidak boleh kosong');
            }
          break;
          case 2:
            location.assign(encodeURI(s +'/label/'+ e.find('select').val()));
          break;
          default: APP.toast('Pilih opsi pencarian');
        }
      }
  }
};

var _result = {
  data: [],
  show: 7,
  page: 1,
  pages: function(){
    const p = Math.ceil(this.data.length/this.show);
    return (p > 0)? p : 1;
  },
  previous: function(){
    if(this.page > 1){
      this.page -= 1;
      this.load();
    }
  },
  next: function(){
    if(this.page < this.pages()){
      this.page += 1;
      this.load();
    }
  },
  load: function(){
    APP.loader(true);
    const e = this.data.slice((this.page-1) * this.show, this.show);
    (e.length > 0)? $('#search-result').html(this.articleList(e)) : this.notFound();
    $('#current-page').text(this.page);
    $('#total-page').text(this.pages());
    _scrollTop();
    setTimeout(APP.loader, 900);
  },
  main: function(d){
    console.log(this);
    this.data = d.feed.entry ? d.feed.entry : [];
    $('#search-total').text(this.data.length);
    this.load();
  },
  section: function(d){
    const e = d.feed.entry.sort(()=> Math.random()-0.5).slice(0,5);
    $('#section-result').html(this.articleList(e));
  },
  articleList: (e)=>{
    let a = '';
    e.forEach((d)=>{
      a += '<table style="width:100%">'+
              '<tr>'+
                '<td style="vertical-align:top">'+
                  '<div class="thumbnail w3-card-2 w3-margin-right">'+
                    '<img src="'+ d.media$thumbnail.url +'"/>'+
                  '</div>'+
                '</td>'+
                '<td>'+
                  '<b class="w3-large w3-text-dark-gray">'+ d.title.$t +'</b>'+
                  '<div class="w3-small w3-justify">'+ d.summary.$t.slice(0, 100) +'..</div>'+
                  '<p class="w3-right-align">'+
                    '<a class="w3-button w3-small w3-border w3-round-large" href="'+ d.link[2].href +'">Baca selengkapnya</a>'+
                  '</p>'+
                '</td>'+
              '</tr>'+
            '</table>';
    });
    return a;
  },
  notFound: ()=>{
    const e = $('.search-result');
    e.hide();
    e.eq(1).show();
  }
};

const _menubar = (e)=>{
  $(e).find('i').toggleClass('fa-folder fa-folder-open');
  $(e).next().slideToggle();
};

const _scrollTop = ()=> $('#inner-wrapper').animate({scrollTop:0}, 800);

(()=>{
  APP.req(ENV.blogUrl +'feeds/posts/default?alt=json&max-results=1', (r)=>{
    let l = '';
    r.feed.category.forEach((c)=>{
      l += '<option value="'+ c.term +'">'+ c.term +'</option>';
    });
    $('#searchbar select').html(l);
  });
  if(typeof(Worker) != 'undefined'){
    APP.worker(ENV.repoUrl +'workers.js', (w)=>{
      w.onmessage = (e)=>{
        const t = $('.titles');
        if(e.data.text) t.find('b').text(e.data.text);
        if(e.data.pointer) t.find('span').toggleClass('w3-text-white w3-text-gray');
      };
    });
  }
  const s1 = +$('#search-type').val();
  if(s1) _search(s1);
  const s2 = +$('#section-type').val();
  if(s2) _search(s2);
  $('body').on('contextmenu', APP.preventDefault);
  $('form').submit(APP.preventDefault).trigger('reset');
  $(':radio').change(function(){
    $('[name='+ $(this).attr('name') +']').removeAttr('checked');
    $(this).attr('checked', true);
  });
  $('#searchbar :radio').change(function(){
    const e = $('#searchbar');
    e.find('section').hide();
    e.find('section:nth-of-type('+ $(this).val() +')').show();
  });
  $('#inner-wrapper').scroll(function(){
    const s = $('#article-scroll').parent();
    if(s.length > 0) ($('#article-body').position().top < 0)? s.show() : s.fadeOut();
    const n = $('.article-nav');
    if(n.length > 0) ((n.eq(1).position().top - $(this).height()) > 0)? n.eq(0).show() : n.eq(0).fadeOut();
  });
  $('#article-body').on('select copy cut', APP.preventDefault);
  $('.what-time-is').text(()=>{
    const h = new Date().getHours();
    const c = ((h >= 5 && h <= 6) || (h >= 16 && h <= 17))? '#ff9800' : (h >= 7 && h <= 15)? '#2196F3' : '#616161';
    return (h >= 3 && h <= 10)? 'pagi' : (h >= 11 && h <= 14)? 'siang' : (h >= 15 && h <= 17)? 'sore' : 'malam';
  });
  $('.copyright-year').text(new Date().getFullYear());
  setTimeout(()=>{
    $('#cover').fadeOut(1000, function(){
      $(this).remove();
    });
  }, 100);
})();
