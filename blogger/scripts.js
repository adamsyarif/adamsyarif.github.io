hljs.initHighlightingOnLoad();

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
  validate: (e, p)=>{
    $(e).val($(e).val().replace(p, ''));
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

const _menubar = e =>{
  $(e).find('i').toggleClass('fa-folder fa-folder-open');
  $(e).next().slideToggle();
};

const _categories = r =>{
  let l = '';
  r.feed.category.forEach(c =>{
    l += '<option value="'+ c.term +'">'+ c.term +'</option>';
  });
  $('#searchbar select').html(l);
};

$(document).ready(()=>{
  if(typeof(Worker) != 'undefined'){
    APP.worker(ENV.repoUrl +'workers.js', w =>{
      w.onmessage = e =>{
        const t = $('.titles');
        if(e.data.text) t.find('b').text(e.data.text);
        if(e.data.pointer) t.find('span').toggleClass('w3-text-white w3-text-gray');
      };
    });
  }
  $('body').on('contextmenu', APP.preventDefault);
  $('[data-onclick]').each(e =>{
    e.on('click', function(){
      eval($(this).attr('data-onclick'));
    });
  });
  $('form').submit(APP.preventDefault).trigger('reset');
  $(':radio').change(function(){
    $('[name='+ $(this).attr('name') +']').removeAttr('checked');
    $(this).attr('checked', true);
  });
  $('#searchbar :radio').change(function(){
    const s = $('#searchbar');
    s.find('section').hide();
    s.find('section:nth-of-type('+ $(this).val() +')').show();
  });
  $('.what-time-is').text(()=>{
    const h = new Date().getHours();
    return (h >= 3 && h <= 10)? 'pagi' : (h >= 11 && h <= 14)? 'siang' : (h >= 15 && h <= 17)? 'sore' : 'malam';
  });
  $('.copyright-year').text(new Date().getFullYear());
  setTimeout(()=>{
    $('#cover').fadeOut(1000, function(){
      $(this).remove();
    });
  }, 100);
});
