const _jumpTo = x =>{
  $('#inner-wrapper').animate({scrollTop:x}, 800);
  $('#title-nav').hide();
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
    (e.length > 0)? $('#search-result').html(RESULT.article(e)) : (()=>{
      const r = $('.search-result');
      r.hide();
      r.eq(1).show();
    })();
    $('#current-page').text(RESULT.page);
    $('#total-page').text(RESULT.pages());
    _jumpTo(0);
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

FEED.query = ()=>{
  const q = new URL(location.href).searchParams.get('q');
  $('#search-detail').text(' untuk kata kunci "'+ q +'"');
  APP.req(FEED.u2 +'?q='+ q +'&'+ FEED.u3 + 1000, RESULT.main);
};
FEED.label = ()=>{
  const p = new URL(location.href).pathname;
  const l = p.slice((p.lastIndexOf('/')+1), p.length);
  $('#search-detail').text(' untuk kategori "'+ l +'"');
  APP.req(FEED.u2 +'/-/'+ l +'?'+ FEED.u3 + 1000, RESULT.main);
};
FEED.related = ()=>{
  $('#section-name').text('Artikel terkait');
  const l = $('#article-label').val().split(',').filter(v => v.trim() != '');
  const r = Math.floor(Math.random() * l.length);
  APP.req(FEED.u2 +'/-/'+ l[r] +'?'+ FEED.u3 + 1000, RESULT.section);
};
FEED.newer = ()=>{
  $('#section-name').text('Artikel terbaru');
  APP.req(FEED.u2 +'?'+ FEED.u3 + 10, RESULT.section);
};

(()=>{
  (+$('#search-type').val() == 1)? FEED.query() : FEED.label();
  (+$('#section-type').val() == 1)? FEED.related() : FEED.newer();
  $('#article-body').on('select copy cut', APP.preventDefault);
  let n = '';
  $('h4 div').each(function(){
    n += '<button onclick="_jumpTo('+ (Math.round($(this).offset().top)-150) +')" class="w3-bar-item w3-button">'+ $(this).text() +'</button>';
  });
  $('#title-nav nav').html(n);
  const p = $('.preview');
  p.find('button').off('click');
  p.find('button.active').click(function(){
    const a = $(this).parent().parent();
    const b = a.find('button');
    const d = a.find('div');
    const i = b.index(this);
    b.removeClass('w3-border-blue');
    b.eq(i).addClass('w3-border-blue');
    d.hide();
    d.eq(i).show();
  });
  p.find('iframe').attr('srcdoc', function(){
    const a = $(this).parent().parent();
    if(a.find('button').eq(0).hasClass('active')){
      const c = a.find('code');
      return (c.eq(0).text() +'<style>html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}body{margin:0;padding:0}'+ c.eq(1).text() +'</style><script>'+ c.eq(2).text() +'</script>');
    }
    else $(this).remove();
  });
})();
