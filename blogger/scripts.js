const ENV = {};
ENV.repoUrl = 'https://adamsyarif.github.io/blogger/';
ENV.blogUrl = 'https://web-belajar-pemrograman.blogspot.com/';

const APP = {
  REQ: [],
  req: (u, c)=>{
    $.ajax({
      method: 'GET',
      url: u,
      beforeSend: ()=> APP.loader(true),
      complete: ()=> APP.loader(false)
    }).done(r => c(r)).fail((x, s, e)=>{
      e ? (
        APP.toast('Error, please check console for details'),
        console.log(e)
      ) : APP.toast(s);
    });
  },
  loader: s =>{
    const l = $('#loader');
    if(s){
      if(APP.REQ.length == 0) l.show();
      APP.REQ.push(1);
    } else {
      if(APP.REQ.length > 0) APP.REQ.pop();
      if(APP.REQ.length == 0) l.hide();
    }
  },
  TOAST: null,
  toast: m =>{
    if(APP.TOAST) clearTimeout(APP.TOAST);
    const t = $('#toast');
    t.show().find('div').text(m);
    APP.TOAST = setTimeout(()=>{
      APP.TOAST = null;
      t.hide();
    }, 3000);
  },
  worker: (u, c)=>{
    APP.req(u, r =>{
      const b = new Blob([r], {type:'application/javascript'});
      c(new Worker(URL.createObjectURL(b)));
    });
  },
  copy: e =>{
    $(e).select();
    document.execCommand('copy');
    APP.toast('Teks telah disalin');
  },
  preventDefault: e =>{
    e.preventDefault();
    return false;
  }
};

const FEED = {
  u1: ENV.blogUrl +'search',
  u2: ENV.blogUrl +'feeds/posts/default',
  u3: 'alt=json&max-results=',
  search: ()=>{
    const s = $('#searchbar');
    (+$('[name=searchbar]:checked').val() == 1)? (()=>{
      const q = s.find(':text').val().trim();
      q ? location.assign(encodeURI(FEED.u1 +'?q='+ q)) : APP.toast('Kata kunci tidak boleh kosong');
    })() : location.assign(encodeURI(FEED.u1 +'/label/'+ s.find('select').val()));
  }
};

const RUN = {
  displayMenu: ()=>{
    MENU.page_id = +$('#page-id').val();
    MENU.article_id = +$('#article-id').val();
    MENU.article = (index, data)=>{
      const x = (i, a)=> $('.article-nav').eq(i).show().find('a').attr('href', a.link).text(a.title);
      const p = data[index-1];
      const n = data[index+1];
      if(p && p.link != '#') x(0, p);
      if(n && n.link != '#') x(1, n);
    };
    MENU.list = function(data){
      let c, l = '';
      data.forEach((i, x, d)=>{
        c = '';
        if((i.id == this.page_id) || (i.id == this.article_id)){
          c = 'w3-light-gray w3-rightbar';
          (i.id == this.page_id)? this.page(x, d) : this.article(x, d);
        }
        l += '<a '+ ((i.link != '#')? ('href="'+ i.link +'"') : '') +' class="'+ c +' w3-bar-item w3-button w3-hover-light-gray"><i class="far fa-file-alt w3-margin-right"></i>'+ i.title + ((i.link != '#')? '' : ' <sup class="w3-text-red">(<i>draft</i>)</sup>') +'</a>';
      });
      return l;
    };
    MENU.docs = list => '<div class="w3-margin-left" style="display:none">'+ list +'</div>';
    MENU.folder = name => '<button class="w3-bar-item w3-button w3-hover-light-gray" onclick="RUN.toggleFolder(this)"><i class="fas fa-folder w3-text-yellow w3-margin-right"></i>'+ name +'</button>';
    MENU.folders = function(folders){
      let f = '';
      folders.forEach(folder =>{
        f += this.folder(folder.title);
        f += this.docs(this.list(folder.articles));
      });
      return f;
    };
    MENU.navigation = function(){
      let m2, m1 = '';
      Object.keys(this).forEach(key =>{
        if(this[key].title){
          m1 += this.folder(this[key].title);
          m2 = (this[key].folders)? this.folders(this[key].folders) : this.list(this[key].pages);
          m1 += this.docs(m2);
        }
      });
      return m1;
    };
    $('#menubar').find('nav').html(MENU.navigation());
  },
  toggleFolder: e =>{
    $(e).find('i').toggleClass('fa-folder fa-folder-open');
    $(e).next().slideToggle();
  }
};

$(document).ready(()=>{
  /* Start workers */

  if(typeof(Worker) != 'undefined'){
    APP.worker(ENV.repoUrl +'workers.js', w =>{
      $(w).on('message', (e =>{
        const t = $('.titles');
        if(e.data.text) t.find('b').text(e.data.text);
        if(e.data.pointer) t.find('span').toggleClass('w3-text-white w3-text-gray');
      });
    });
  }

  /* DOM content */

  RUN.displayMenu();
  $('.what-time-is').text(()=>{
    const h = new Date().getHours();
    return (h >= 3 && h <= 10)? 'pagi' : (h >= 11 && h <= 14)? 'siang' : (h >= 15 && h <= 17)? 'sore' : 'malam';
  });
  $('.copyright-year').text(new Date().getFullYear());
  /*
  setTimeout(()=>{
    $('#cover').fadeOut(1000, function(){
      $(this).remove();
    });
  }, 100);
  */

  /* Event listener */

  //$('body').on('contextmenu', APP.preventDefault);
  $('form').submit(APP.preventDefault).trigger('reset');
  $(':radio').change(function(){
    $('[name='+ $(this).attr('name') +']').removeAttr('checked');
    $(this).attr('checked', true);
  });
  $('#searchbar :radio').change(function(){
    const s = $(this).parent().parent().find('.section');
    s.hide();
    s.eq(+$(this).val()-1).show();
  });
  $('[data-validation]').input(function(){
    $(this).val($(this).val().replace('/[^'+ $(this).attr('data-validation') +']/gi', ''));
  });
});
