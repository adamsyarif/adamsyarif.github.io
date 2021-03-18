RUN.titleNav = s =>{
  const t = $('#title-nav');
  if(s){
    let x1, x2, n = '';
    $('h4 div').each(function(){
      x1 = $('#inner-wrapper').scrollTop();
      x2 = $(this).offset().top;
      n += '<button onclick="RUN.jumpTo('+ (Math.round(x1 + x2)-150) +')" class="w3-bar-item w3-button">'+ $(this).text() +'</button>';
    });
    t.show().find('nav').html(n);
  }
  else t.hide();
};

RUN.jumpTo = x =>{
  $('#inner-wrapper').animate({scrollTop:x}, 800);
  RUN.titleNav(false);
};

RUN.mainFeed = ()=>{
  const t = +$('#search-type').val();
  if(t){
    const d = $('#search-details').find('span').eq(1);
    if(t == 1){
      d.text('kata kunci "'+ q +'"');
      FEED.query();
    } else {
      d.text('kategori "'+ l +'"');
      FEED.label();
    }
  }
};

FEED.query = ()=>{
  const q = new URL(location.href).searchParams.get('q');
  APP.req(FEED.u2 + FEED.u3(1000) +'&q='+ q, RESULT.main);
};
FEED.label = ()=>{
  const p = new URL(location.href).pathname;
  const l = p.slice((p.lastIndexOf('/')+1), p.length);
  APP.req(FEED.u2 +'/-/'+ l + FEED.u3(1000), RESULT.main);
};

RESULT.main = d =>{
  RESULT.data = d.feed.entry ? d.feed.entry : [];
  $('#search-details').find('span').eq(0).text(RESULT.data.length);
  RESULT.load();
};
RESULT.data = [];
RESULT.page = 1;
RESULT.pages = ()=>{
  const p = Math.ceil(RESULT.data.length/7);
  return (p > 0)? p : 1;
};
RESULT.previous = ()=>{
  if(RESULT.page > 1){
    RESULT.page -= 1;
    RESULT.load();
  }
};
RESULT.next = ()=>{
  if(RESULT.page < RESULT.pages()){
    RESULT.page += 1;
    RESULT.load();
  }
};
RESULT.load = ()=>{
  APP.loader(900);
  const e = [...RESULT.data].splice(((RESULT.page-1)*7),7);
  (e.length > 0)? $('#search-result').html(RESULT.article(e)) : (()=>{
    const r = $('.search-result');
    r.hide();
    r.eq(1).show();
  })();
  const p = $('#search-pages').find('span');
  p.eq(0).text(RESULT.page);
  p.eq(1).text(RESULT.pages());
  RUN.jumpTo(0);
};

$(document).ready(()=>{
  RUN.mainFeed();
  $('#article-body').on('select copy cut', APP.preventDefault);
  const p = $('.preview');
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
});
