const _blogUrl = 'https://belajar-html-css-javascript.blogspot.com';
const _feedUrl = _blogUrl +'/feeds/posts/default';

hljs.initHighlightingOnLoad();

$(document).ready(()=>{
  $('.what-time-is').text(_whatTimeIs());
  $('form').submit(_preventDefault).trigger('reset');
  $('input[name=option]').change(function(){
    const c = $('.search-content');
    c.hide();
    c.eq(+$(this).val()-1).show();
  });
});

$('#post-body').on('contextmenu copy cut', _preventDefault);

function _preventDefault(e){
  e.preventDefault();
  return false;
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

function _validate(e, p){
  e.value = e.value.replace(p, '');
}

function _search(n){
  switch(n){
    case 1:
      _req(_feedUrl +'?alt=json&max-results=10', _sidebarPost);
    break;
    case 2:
      (()=>{
        const c = $('#post-label').val().split(',').filter(v => v.trim() != '');
        const r = Math.floor(Math.random() * c.length);
        _req(_feedUrl +'/-/'+ c[r] +'?alt=json&max-results=1000', _sidebarPost);
      })();
    break;
    case 3:
      (()=>{
        const q = new URL(location.href).searchParams.get('q');
        _req(_feedUrl +'?q='+ q +'&alt=json&max-results=1000', _searchResult);
      })();
    break;
    case 4:
      (()=>{
        const p = new URL(location.href).pathname;
        const c = p.slice((p.lastIndexOf('/')+1), p.length);
        _req(_feedUrl +'/-/'+ c +'?alt=json&max-results=1000', _searchResult);
      })();
    break;
    case 5:
      $('#search-result').html(_notFound(false));
    break;
    default:
      (()=>{
        let u = _blogUrl +'/search';
        switch(+$('input[name=option]:checked').val()){
          case 1:
            (()=>{
              let q = $('#search-query').val().trim();
              if(!q) return _toast('Kata kunci tidak boleh kosong');
              u += '?q='+ q;
            })();
          break;
          case 2:
            u += '/label/'+ $('#category-list').val();
          break;
          default: return _toast('Pilih opsi');
        }
        location.assign(encodeURI(u));
      })();
  }
}

function _sidebarPost(d){
  let c = '';
  d.feed.category.forEach((v)=>{
    c += '<option value="'+ v.term +'">'+ v.term +'</option>';
  });
  $('#category-list').html(c);
  $('#sidebar-post').html(_postList(_randomize(d.feed.entry)));
}

function _searchResult(d){
  const p = [];
  if(d.feed.entry){
    const e = d.feed.entry;
    const x = (e.length >= 7)? 7 : e.length;
    for(let i = 0; i < x; i++){
      p.push(e[i]);
    }
  }
  $('#search-result').html((p.length > 0)? _postList(p) : _notFound(true));
}

function _randomize(e){
  const p = [];
  const x = (e.length >= 5)? 5 : e.length;
  let r, f;
  while(p.length < x){
    r = Math.floor(Math.random() * e.length);
    if(p.length == 0) p.push(e[r]);
    else {
      f = false;
      p.forEach((v)=>{
        if(v.id.$t == e[r].id.$t) f = true;
      });
      if(!f) p.push(e[r]);
    }
  }
  return p;
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
                '<div class="w3-small w3-justify">'+ v.summary.$t.slice(0, 100) +'..</div>'+
                '<p class="w3-right-align">'+
                  '<a class="w3-button w3-border w3-small w3-round-large" href="'+ v.link[2].href +'">Baca selengkapnya</a>'+
                '</p>'+
              '</td>'+
            '</tr>'+
          '</table>';
  });
  return l;
}

function _notFound(n){
  n = n ? ['artikel', 'search_result'] : ['halaman', '404_not_found'];
  return '<p class="w3-center">'+
            '<b class="w3-large w3-text-dark-gray">Ups! '+ n[0] +' tidak ditemukan..</b>'+
            '<div><img src="https://adamsyarif.github.io/blogger/'+ n[1] +'.png"/></div>'+
          '</p>'+
          '<div class="w3-panel w3-pale-yellow w3-leftbar w3-border-khaki w3-text-dark-gray">'+
            '<p>Sepertinya '+ n[0] +' yang kamu cari belum ada, coba periksa kembali pencarianmu atau buka daftar menu untuk mencari Artikel yang menarik untuk kamu baca..</p>'+
          '</div>';
}

function _sidebarMenu(e, i){
  $('.menu-content').eq(i).slideToggle();
  $(e).find('i').toggleClass('fa-caret-down fa-caret-up');
}

function _whatTimeIs(){
  let h = new Date().getHours();
  return (h > 2 && h < 11)? 'pagi' : (h > 10 && h < 15)? 'siang' : (h > 14 && h < 18)? 'sore' : 'malam';
}

function _copy(){
  document.getElementById('post-url').select();
  document.execCommand('copy');
  _toast('Teks telah disalin');
}
