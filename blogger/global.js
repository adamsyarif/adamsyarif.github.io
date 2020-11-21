const _blogUrl = 'https://belajar-html-css-javascript.blogspot.com';
const _REQ = [];

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

let _TOAST;
function _toast(m){
  if(_TOAST) clearTimeout(_TOAST);
  $('#toast-msg').text(m);
  const t = $('#toast');
  t.show();
  _TOAST = setTimeout(()=>{
    TOAST = null;
    t.hide();
  }, 3000);
}

function _postList(p){
  let l = '';
  if(p.length > 0){
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
  }
  else l = '<span class="w3-small w3-text-gray">Artikel tidak ditemukan.</span>';
  return l;
}

function _sidebarMenu(e, i){
  $('.menu-content').eq(i).slideToggle();
  $(e).find('i').toggleClass('fa-caret-down fa-caret-up');
}
