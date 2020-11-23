const _blogUrl = 'https://belajar-html-css-javascript.blogspot.com';
const _feedUrl = _blogUrl +'/feeds/posts/default';
const _REQ = [];

hljs.initHighlightingOnLoad();

$(document).ready(()=>{
  $('.what-time-is').text(_whatTimeIs());
  $('form').submit((e)=>{
    e.preventDefault();
    return false;
  }).trigger('reset');
  $('input[name=search]').change(function(){
    const c = $('.search-content');
    c.hide();
    c.eq(+$(this).val()-1).show();
  });
});

$(document).on('contextmenu copy cut', function(e){
  e.preventDefault();
  return false;
});

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

function _category(c){
  let l = '';
  if(c && c.length > 0){
    c.forEach((v)=>{
      l += '<option value="'+ v.term +'">'+ v.term +'</option>';
    });
  }
  else l = '<option value="none">- Pilih -</option>';
  $('#category-list').html(l);
}

function _validate(e, p){
  e.value = e.value.replace(p, '');
}

function _search(){
  let q, c, u = _blogUrl +'/search';
  switch(+$('input[name=search]:checked').val()){
    case 1:
      q = $('#search-query').val().trim();
      if(q == '') return _toast('Kata kunci tidak boleh kosong');
      u += '?q='+ q;
    break;
    case 2:
      c = $('#category-list').val();
      if(c == 'none') return _toast('Maaf, kategori belum tersedia');
      u += '/label/'+ c;
    break;
    default: return _toast('Pilih opsi');
  }
  window.location.assign(encodeURI(u));
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
                  '<div class="w3-small w3-justify">'+ v.summary.$t.slice(0, 100) +'..</div>'+
                  '<p class="w3-right-align">'+
                    '<a class="w3-button w3-border w3-small w3-round-large" href="'+ v.link[2].href +'">Baca selengkapnya</a>'+
                  '</p>'+
                '</td>'+
              '</tr>'+
            '</table>';
    });
  }
  else l = _notFound(true);
  return l;
}

function _notFound(n){
  n = n ? ['artikel', 'search_result'] : ['halaman', '404_not_found'];
  return '<p><b class="w3-text-orange w3-large">Hasil pencarian</b></p>'+
          '<p class="w3-center">'+
            '<b class="w3-large w3-text-dark-gray">Ups! '+ n[0] +' tidak ditemukan..</b>'+
            '<div><img src="https://adamsyarif.github.io/blogger/'+ n[1] +'.png"/></div>'+
          '</p>'+
          '<div class="w3-panel w3-pale-yellow w3-leftbar w3-border-khaki w3-text-dark-gray">'+
            '<p>Sepertinya '+ n[0] +' yang kamu cari belum ada, coba periksa kembali pencarianmu atau buka daftar menu untuk mencari Artikel yang menarik untuk kamu baca..</p>'+
          '</div>';
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

function _sidebarMenu(e, i){
  $('.menu-content').eq(i).slideToggle();
  $(e).find('i').toggleClass('fa-caret-down fa-caret-up');
}

function _whatTimeIs(){
  let h = new Date().getHours();
  return (h > 2 && h < 11)? 'pagi' : (h > 10 && h < 15)? 'siang' : (h > 14 && h < 18)? 'sore' : 'malam';
}
