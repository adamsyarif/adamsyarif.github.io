const APP = {
  REQ: [],
  req: (u, c)=>{
    $.ajax({
      method: 'GET',
      url: u,
      beforeSend: ()=> APP.loader(true),
      complete: ()=> APP.loader(false)
    }).done(r => c(r)).fail((x, s, e)=>{
      e ? (()=>{
        APP.toast('Error, please check console for details');
        console.log(e);
      })() : APP.toast(s);
    });
  },
  loader: s =>{
    const l = $('#loader');
    if(s){
      if(typeof s == 'number'){
        l.show();
        setTimeout(()=>{
					l.hide();
				}, s);
      } else {
        if(APP.REQ.length == 0) l.show();
        APP.REQ.push(1);
      }
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
  data: (d, c)=>{
    const u = (ENV.devMode ? '/data/' : ENV.repoUrl)+ d +'.json';
    APP.req(u, r => c(r));
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

const RUN = {
  asideFeed: ()=>{
		switch(+$('#aside-type').val()){
			case 1:
				const l = $('#article-label').val().split(',').filter(v => v.trim() != '');
				const r = Math.floor(Math.random() * l.length);
				APP.req(FEED.u2 +'/-/'+ l[r] + FEED.u3(1000), RESULT.aside);
				break;
			case 2:
				APP.req(FEED.u2 + FEED.u3(10), RESULT.aside);
		}
  },
  workers: ()=>{
    const u = (ENV.devMode ? '/scripts/' : ENV.repoUrl) +'workers.js';
    APP.worker(u, w =>{
			setTimeout(()=>{
				w.onmessage = e => $('#title').find('b').text(e.data);
			}, 2000);
    });
  },
  displayMenu: ()=>{
    APP.data('menu', r =>{
      r.list = function(data){
        let c, l = '';
        data.forEach((i, x, d)=>{
          c = '';
          if((i.id == +$('#page-id').val()) || (i.id == +$('#article-id').val())) c = 'w3-light-gray w3-rightbar';
          l += '<a '+ ((i.link != '#')? ('href="'+ i.link +'"') : '') +' class="'+ c +' w3-bar-item w3-button w3-hover-light-gray"><i class="far fa-file-alt w3-margin-right"></i>'+ i.title + ((i.link != '#')? '' : ' <i class="w3-small w3-text-red">(draft)</i>') +'</a>';
        });
        return l;
      };
      r.lists = list => '<div class="w3-margin-left">'+ list +'</div>';
      r.docs = lists => '<details>'+ lists +'</details>';
      r.folder = name => '<summary class="w3-bar-item w3-button w3-hover-light-gray" onclick="$(this).find(\'i\').toggleClass(\'fa-folder fa-folder-open\')"><i class="fas fa-folder w3-text-yellow w3-margin-right"></i>'+ name +'</summary>';
      r.folders = function(folders){
        let f, d = '';
        folders.forEach(folder =>{
					f = this.folder(folder.title);
          f += this.lists(this.list(folder.articles));
					d += this.docs(f);
        });
        return d;
      };
      r.navigation = function(){
        let m, d = '';
        Object.keys(this).forEach(key =>{
          if(this[key].title){
            m = this.folder(this[key].title);
            m += this.lists(this[key].folders ? this.folders(this[key].folders) : this.list(this[key].pages));
						d += this.docs(m);
          }
        });
        return d;
      };
      $('#menubar').find('nav').html(r.navigation());
    });
  },
  domContent: ()=>{
    const d = new Date();
    const h = d.getHours();
    $('#body').addClass(((h >= 5 && h <= 6) || (h >= 16 && h <= 17))? 'bg-sunny' : (h >= 7 && h <= 15)? 'bg-day' : 'bg-night');
    $('.what-time-is').text((h >= 3 && h <= 10)? 'pagi' : (h >= 11 && h <= 14)? 'siang' : (h >= 15 && h <= 17)? 'sore' : 'malam');
    $('.copyright-year').text(d.getFullYear());
    setTimeout(()=>{
      $('#body').fadeIn(1000);
    }, 100);
  },
  bindEvent: ()=>{
    if(!ENV.devMode) $('body').on('contextmenu', APP.preventDefault);
    $('#body').scroll(function(){
      const h = $(this).height();
      const s = $(this).scrollTop();
      $('.a-sh').each(function(){
        const t = $(this).offset().top;
        if(((h+s)-(s+t)) > 50){
          $(this).removeClass('a-sh');
          $(this).find('.a-left').addClass('w3-animate-left');
          $(this).find('.a-right').addClass('w3-animate-right');
        }
      });
    });
    $('form').submit(APP.preventDefault).trigger('reset');
    $(':radio').change(function(){
      $('[name='+ $(this).attr('name') +']').removeAttr('checked');
      $(this).attr('checked', true);
    });
    $('#searchbar :radio').change(function(){
      const s = $(this).parent().parent().find('.searchbar');
      s.hide();
      s.eq(+$(this).val()).show();
    });
    $('[data-validation]').on('input', function(){
      $(this).val($(this).val().replace(new RegExp('[^'+ $(this).attr('data-validation') +']', 'gim'), ''));
    });
  },
  jumpTo: x =>{$('#body').animate({scrollTop:x}, 800)}
};

const FEED = {
  u1: ENV.blogUrl +'search',
  u2: ENV.blogUrl +'feeds/posts/default',
  u3: m => '?alt=json&max-results='+ m,
  search: ()=>{
    const s = $('#searchbar');
    if(+$('[name=searchbar]:checked').val() == 0){
      const q = s.find(':text').val().trim();
      q ? location.assign(encodeURI(FEED.u1 +'?q='+ q)) : APP.toast('Kata kunci tidak boleh kosong');
    }
		else location.assign(encodeURI(FEED.u1 +'/label/'+ s.find('select').val()));
  }
};

const RESULT = {
  aside: d =>{
    const e = d.feed.entry.sort(()=> Math.random()-0.5).slice(0,5);
    $('#aside-result').html(RESULT.article(e));
  },
  article: e =>{
    let a = '';
    e.forEach(d =>{
      a += '<table style="width:100%">'+
              '<tr>'+
                '<td rowspan="2" style="vertical-align:top">'+
                  '<div class="thumbnail w3-card-2 w3-margin-right">'+
                    '<img src="'+ d.media$thumbnail.url +'"/>'+
                  '</div>'+
                '</td>'+
                '<td>'+
                  '<b class="w3-large w3-text-dark-gray">'+ d.title.$t +'</b>'+
                  '<div class="w3-small w3-justify">'+ d.summary.$t.slice(0, 150) +'..</div>'+
                '</td>'+
              '</tr>'+
							'<tr>'+
								'<td class="w3-right-align">'+
									'<p><a class="w3-btn w3-small w3-border w3-round-large" href="'+ d.link[2].href +'">Baca selengkapnya</a></p>'+
								'</td>'+
							'</tr>'+
            '</table>';
    });
    return a;
  }
};

$(document).ready(()=>{
  RUN.asideFeed();
  RUN.workers();
  RUN.displayMenu();
  RUN.domContent();
  RUN.bindEvent();
});
