const _blogUrl = 'https://belajar-html-css-javascript.blogspot.com';
const _feedUrl = _blogUrl +'/feeds/posts/default';
const _titles = [
  'Web Belajar Pemrograman',
  'Belajar HTML',
  'Belajar CSS',
  'Belajar JavaScript'
];
let _n = 0;

hljs.initHighlightingOnLoad();

$(document).ready(()=>{
  $('.what-time-is').text(_whatTimeIs());
  $('.year').text(new Date().getFullYear());
  $('form').submit(_preventDefault).trigger('reset');
  $('input[name=option]').change(function(){
    const c = $('.search-content');
    c.hide();
    c.eq(+$(this).val()-1).show();
  });
  $('#post-body').on('contextmenu copy cut', _preventDefault);
  showTitle(_n);
});

function _preventDefault(e){
  e.preventDefault();
  return false;
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

function _validate(e, p){
  e.value = e.value.replace(p, '');
}

function _search(n){
  switch(n){
    case 1:
      _req(_feedUrl +'?alt=json&max-results=10', _sidebarPost);
    break;
    case 2:
      {
        const c = $('#post-label').val().split(',').filter(v => v.trim() != '');
        const r = Math.floor(Math.random() * c.length);
        _req(_feedUrl +'/-/'+ c[r] +'?alt=json&max-results=1000', _sidebarPost);
      }
    break;
    case 3:
      {
        const q = new URL(location.href).searchParams.get('q');
        _req(_feedUrl +'?q='+ q +'&alt=json&max-results=1000', (d)=>{
          _searchResult(d, 'kata kunci "'+ q +'"');
        });
      }
    break;
    case 4:
      {
        const p = new URL(location.href).pathname;
        const c = p.slice((p.lastIndexOf('/')+1), p.length);
        _req(_feedUrl +'/-/'+ c +'?alt=json&max-results=1000', (d)=>{
          _searchResult(d, 'kategori "'+ c +'"');
        });
      }
    break;
    case 5:
      $('#search-result').html(_notFound(false));
    break;
    default:
      {
        let u = _blogUrl +'/search';
        switch(+$('input[name=option]:checked').val()){
          case 1:
            {
              let q = $('#search-query').val().trim();
              if(!q) return _toast('Kata kunci tidak boleh kosong');
              u += '?q='+ q;
              location.assign(encodeURI(u));
            }
          break;
          case 2:
            {
              u += '/label/'+ $('#category-list').val();
              location.assign(encodeURI(u));
            }
          break;
          default: _toast('Pilih opsi');
        }
      }
  }
}

function _sidebarPost(d){
  let c = '';
  d.feed.category.forEach((v)=>{
    c += '<option value="'+ v.term +'">'+ v.term +'</option>';
  });
  $('#category-list').html(c);
  let e = d.feed.entry.sort(()=> Math.random() - 0.5).splice(0,5);
  $('#sidebar-post').html(_postList(e));
}

function _postList(e){
  let l = '';
  e.forEach((v)=>{
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

function _searchResult(d, n){
  _result.data = d.feed.entry ? d.feed.entry : [];
  $('#search-description').text('Ditemukan '+ _result.data.length +' hasil untuk '+ n);
  _result.load();
}

const _result = {
  data: [],
  page: 1,
  pages: function(){
    const p = Math.ceil(this.data.length/7);
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
    _loader(true);
    const e = [...this.data].splice((this.page-1)*7, 7);
    $('#search-result').html((e.length > 0)? _postList(e) : _notFound(true));
    $('#current-page').text(this.page);
    $('#total-page').text(this.pages());
    $('#inner-wrapper').animate({scrollTop: 0}, 800);
    setTimeout(_loader, 900);
  }
};

function _notFound(w){
  w = w ? ['artikel', 'search_result'] : ['halaman', '404_not_found'];
  return '<p class="w3-center"><b class="w3-large w3-text-dark-gray">Ups! '+ w[0] +' tidak ditemukan..</b></p>'+
          '<div><img src="https://adamsyarif.github.io/blogger/'+ w[1] +'.png"/></div>'+
          '<div class="w3-panel w3-pale-yellow w3-leftbar w3-border-khaki w3-text-dark-gray">'+
            '<p>Sepertinya '+ w[0] +' yang kamu cari belum ada, coba periksa kembali pencarianmu atau buka daftar menu untuk mencari artikel yang menarik untuk kamu baca.</p>'+
          '</div>';
}

function _sidebarMenu(n){
  $('.sidebar-btn').eq(n).find('i').toggleClass('fa-caret-down fa-caret-up');
  $('.menu-content').eq(n).slideToggle();
}

function _whatTimeIs(){
  const h = new Date().getHours();
  return (h > 2 && h < 11)? 'pagi' : (h > 10 && h < 15)? 'siang' : (h > 14 && h < 18)? 'sore' : 'malam';
}

function _copy(){
  document.getElementById('post-url').select();
  document.execCommand('copy');
  _toast('Teks telah disalin');
}

function rewriteTitle(){
  _n++;
  if(_n >= 4) _n = 0;
  showTitle(_n);
}

function showTitle(x){
  const a = _titles[x].split('');
  let n = 0;
  let w = '';
  const i = setInterval(()=>{
    w += a[n];
    document.getElementById('titles').textContent = w +'_';
    n++;
    if(n >= a.length){
      clearInterval(i);
      setTimeout(rewriteTitle, 2000);
    }
  }, 100);
}
