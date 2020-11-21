// https://belajar-html-css-javascript.blogspot.com/feeds/posts/default/-/HTML?q=3&alt=json&max-results=1000
// https://belajar-html-css-javascript.blogspot.com/feeds/posts/default?alt=json-in-script&start-index=1&max-results=1000&callback=xxx

const _REQ = [];
function _loader(s){
  const loader = $('#loader');
  if(s){
    if(_REQ.length == 0) loader.show();
    _REQ.push(1);
  } else {
    if(_REQ.length > 0) _REQ.pop();
    if(_REQ.length == 0) loader.hide();
  }
}

function _search(){
  _loader(true);
  setTimeout(()=>{
    _loader(false);
  }, 3000);
}

function _req(u, c){
  $.ajax({
    method: 'GET',
    url: u,
    beforeSend: ()=> _loader(true),
    complete: ()=> _loader(false)
  }).done(r => c(r)).fail((x, s, e)=>{
    _toast('Error, please check console for details');
    console.log(e);
  });
}

function _newPost(j){
  _loader(true);
  const p = [];
  const e = j.feed.entry;
  const x = (e.length >= 5)? 5 : e.length;
  for(let i = 0; i < x; i++){
    p.push(e[i]);
  }
  _postList(p);
  _loader(false);
}

function _relatedPost(j){
  _loader(true);
  const p = [];
  const e = j.feed.entry;
  const x = (e.length >= 5)? 5 : e.length;
  let r1, c, r2, f;
  while(p.length < x){
    r1 = Math.floor(Math.random() * e.length);
    c = $('#post-label').val().split(',').filter(v => v.trim() != '');
    r2 = Math.floor(Math.random() * c.length);
    if(e[r1].category.map(v => v.term).includes(c[r2])){
      if(p.length == 0) p.push(e[r1]);
      else {
        p.forEach((v)=>{
          f = (v.id.$t == e[r1].id.$t)? true : false;
        });
        if(!f) p.push(e[r1]);
      }
    }
  }
  _postList(p);
  _loader(false);
}

function _postList(p){
  let l = '';
  p.forEach((v)=>{
    l += '<table style="width:100%">'+
            '<tr>'+
              '<td>'+
                '<div class="thumbnail w3-card-2 w3-margin-right">'+
                  '<img src="'+ v.media$thumbnail.url +'"/>'+
                '</div>'+
              '</td>'+
              '<td>'+
                '<b class="w3-large w3-text-dark-gray">'+ v.title.$t +'</b>'+
                '<div class="w3-small" style="text-align:justify">'+ (v.summary.$t.slice(0, 100) +'..') +'</div>'+
                '<p class="w3-right-align">'+
                  '<a class="w3-button w3-border w3-small w3-round-large" href="'+ v.link[2].href +'">Baca selengkapnya</a>'+
                '</p>'+
              '</td>'+
            '</tr>'+
          '</table>';
  });
  $('#post-list').html(l);
}

function _sidebarMenu(e, i){
  $('.menu-content').eq(i).slideToggle();
  $(e).find('i').toggleClass('fa-caret-down fa-caret-up');
}
