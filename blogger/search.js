RESULT.search = d =>{
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
  const t = +$('#search-type').val();
  const d = $('#search-details').find('span').eq(1);
  if(t == 1){
    const q = new URL(location.href).searchParams.get('q');
    d.text('kata kunci "'+ q +'"');
    APP.req(FEED.u2 + FEED.u3(1000) +'&q='+ q, RESULT.search);
  } else {
    const p = new URL(location.href).pathname;
    const l = p.slice((p.lastIndexOf('/')+1), p.length);
    d.text('kategori "'+ l +'"');
    APP.req(FEED.u2 +'/-/'+ l + FEED.u3(1000), RESULT.search);
  }
}); 
