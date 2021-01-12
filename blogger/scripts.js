const _repoUrl = 'https://adamsyarif.github.io/blogger';
const _blogUrl = 'web-belajar-pemrograman.blogspot.com';
const _feedUrl = 'https://'+ _blogUrl +'/feeds/posts/default';
const _titles = [
  'Web Belajar Pemrograman',
  'Belajar HTML',
  'Belajar CSS',
  'Belajar JavaScript'
];
const _REQ = [];
let _TOAST, _n = 0;

function _preventDefault(e){
  e.preventDefault();
  return false;
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

function _loader(s){
  const l = $('#loader');
  if(s){
    if(_REQ.length == 0) l.show();
    _REQ.push(1);
  } else {
    if(_REQ.length > 0) _REQ.pop();
    if(_REQ.length == 0) l.hide();
  }
}

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

function _validate(e, p){
  e.value = e.value.replace(p, '');
}

function _search(n){
  switch(n){
    case 1:
      $('#section-name').text('Terbaru');
      _req(_feedUrl +'?alt=json&max-results=10', _sectionPost);
    break;
    case 2:
      {
        $('#section-name').text('Terkait');
        const c = $('#post-label').val().split(',').filter(v => v.trim() != '');
        const r = Math.floor(Math.random() * c.length);
        _req(_feedUrl +'/-/'+ c[r] +'?alt=json&max-results=1000', _sectionPost);
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
      $('#search-result').html(_notFound(0));
    break;
    default:
      {
        let u = 'https://'+ _blogUrl +'/search';
        switch(+$('input[name=searchbar-option]:checked').val()){
          case 1:
            {
              const q = $('#searchbar-query').val().trim();
              if(!q) return _toast('Kata kunci tidak boleh kosong');
              u += '?q='+ q;
              location.assign(encodeURI(u));
            }
          break;
          case 2:
            {
              u += '/label/'+ $('#searchbar-category').val();
              location.assign(encodeURI(u));
            }
          break;
          default: _toast('Pilih opsi');
        }
      }
  }
}

function _sectionPost(d){
  let c = '';
  d.feed.category.forEach((v)=>{
    c += '<option value="'+ v.term +'">'+ v.term +'</option>';
  });
  $('#searchbar-category').html(c);
  const e = d.feed.entry.sort(()=>(Math.random()-0.5)).splice(0,5);
  $('#section-post').html(_postList(e));
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

const _result = {
  data: [],
  showing: 7,
  page: 1,
  pages: function(){
    const p = Math.ceil(this.data.length/this.showing);
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
    const e = [...this.data].splice((this.page-1) * this.showing, this.showing);
    $('#search-result').html((e.length > 0)? _postList(e) : _notFound(1));
    $('#current-page').text(this.page);
    $('#total-page').text(this.pages());
    _scrollTop();
    setTimeout(_loader, 900);
  }
};

function _scrollTop(){
  $('#inner-wrapper').animate({scrollTop:0}, 800);
}

function _searchResult(d, n){
  _result.data = d.feed.entry ? d.feed.entry : [];
  $('#search-total').text(_result.data.length);
  $('#search-name').text('untuk '+ n);
  _result.load();
}

function _notFound(n){
  const c = [{
    name: 'halaman', img: '404_not_found'
  },{
    name: 'artikel', img: 'search_result'
  }];
  return '<p class="w3-center"><b class="w3-large w3-text-dark-gray">Ups! '+ c[n].name +' tidak ditemukan..</b></p>'+
          '<div><img src="'+ _repoUrl +'/'+ c[n].img +'.jpg"/></div>'+
          '<div class="w3-panel w3-pale-yellow w3-leftbar w3-border-khaki w3-text-dark-gray">'+
            '<p>Sepertinya '+ c[n].name +' yang kamu cari belum ada, coba periksa kembali pencarianmu atau buka daftar menu untuk mencari artikel yang menarik untuk kamu baca.</p>'+
          '</div>';
}

function _showTitle(c){
  const a = _titles[_n].split('');
  let n = 0;
  let w = '';
  const i = setInterval(()=>{
    w += a[n];
    $('.titles').text(w);
    n++;
    if(n >= a.length){
      clearInterval(i);
      setTimeout(()=>{
        _n++;
        if(_n >= _titles.length) _n = 0;
        _showTitle();
      }, 2000);
    }
  }, 100);
  if(c) c();
}

function _menubar(n){
  $('.menubar-btn').eq(n).find('i').toggleClass('fa-caret-down fa-caret-up');
  $('.menubar-content').eq(n).slideToggle();
}

function _copy(){
  document.getElementById('post-url').select();
  document.execCommand('copy');
  _toast('Teks telah disalin');
}

hljs.initHighlightingOnLoad();

(()=>{
  if(location.hostname != _blogUrl) location.assign('https://'+ _blogUrl);
  const s1 = +$('#search-type').val();
  if(s1) _search(s1);
  const s2 = +$('#section-type').val();
  if(s2) _search(s2);
  $('.what-time-is').text(()=>{
    const h = new Date().getHours();
    return (h >= 3 && h <= 10)? 'pagi' : (h >= 11 && h <= 14)? 'siang' : (h >= 15 && h <= 17)? 'sore' : 'malam';
  });
  $('.year').text(new Date().getFullYear());
  $('form').submit(_preventDefault).trigger('reset');
  $('input[name=searchbar-option]').change(function(){
    const c = $('.searchbar-content');
    c.hide();
    c.eq(+$(this).val()-1).show();
  });
  $('#post-body').on('contextmenu copy cut', _preventDefault);
  _showTitle(()=>{
    setInterval(()=>{
      $('.text-pointer').toggleClass('w3-text-white w3-text-gray');
    }, 500);
  });
  setTimeout(()=>{
    $('#cover').fadeOut();
  }, 500);
})();
