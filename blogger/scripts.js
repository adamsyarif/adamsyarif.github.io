const RUN = {
  sectionFeed: ()=>{
    const t = +$('#section-type').val();
    if(t){
      const n = $('#section-name');
      if(t == 1){
        n.text('Artikel terkait');
        const l = $('#article-label').val().split(',').filter(v => v.trim() != '');
        const r = Math.floor(Math.random() * l.length);
        APP.req(FEED.u2 +'/-/'+ l[r] + FEED.u3(1000), RESULT.section);
      } else {
        n.text('Artikel terbaru');
        APP.req(FEED.u2 + FEED.u3(10), RESULT.section);
      }
    }
  },
  worker: ()=>{
    const u = (ENV.devMode ? '/scripts/' : ENV.repoUrl) +'workers.js';
    APP.worker(u, w =>{
      w.onmessage = e => $('.titles').find('b').text(e.data);
    });
  },
  displayMenu: ()=>{
    APP.data('menu', r =>{
      r.page_id = +$('#page-id').val();
      r.article_id = +$('#article-id').val();
      r.article = (index, data)=>{
        const x = (i, a)=> $('.article-nav').eq(i).show().find('a').attr('href', a.link).text(a.title);
        const p = data[index-1];
        const n = data[index+1];
        if(p && p.link != '#') x(0, p);
        if(n && n.link != '#') x(1, n);
      };
      r.list = function(data){
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
      r.docs = list => '<div class="w3-margin-left" style="display:none">'+ list +'</div>';
      r.folder = name => '<button class="w3-bar-item w3-button w3-hover-light-gray" onclick="RUN.toggleFolder(this)"><i class="fas fa-folder w3-text-yellow w3-margin-right"></i>'+ name +'</button>';
      r.folders = function(folders){
        let f = '';
        folders.forEach(folder =>{
          f += this.folder(folder.title);
          f += this.docs(this.list(folder.articles));
        });
        return f;
      };
      r.navigation = function(){
        let m2, m1 = '';
        Object.keys(this).forEach(key =>{
          if(this[key].title){
            m1 += this.folder(this[key].title);
            m2 = this[key].folders ? this.folders(this[key].folders) : this.list(this[key].pages);
            m1 += this.docs(m2);
          }
        });
        return m1;
      };
      $('#menubar').find('nav').html(r.navigation());
    });
  },
  domContent: ()=>{
    const h = new Date().getHours();
    $('#body').addClass(((h >= 5 && h <= 6) || (h >= 16 && h <= 17))? 'bg-sunny' : (h >= 7 && h <= 15)? 'bg-day' : 'bg-night');
    $('.what-time-is').text((h >= 3 && h <= 10)? 'pagi' : (h >= 11 && h <= 14)? 'siang' : (h >= 15 && h <= 17)? 'sore' : 'malam');
    $('.copyright-year').text(new Date().getFullYear());
    setTimeout(()=>{
      $('#body').fadeIn(1000);
    }, 100);
  },
  bindEvent: ()=>{
    if(!ENV.devMode) $('body').on('contextmenu', APP.preventDefault);
    $('#inner-wrapper').scroll(function(){
      const h = $(this).height();
      const s = $(this).scrollTop();
      $('.a-sh').each(function(){
        const t = $(this).offset().top;
        if(((h+s)-(s+t)) > 50){
          $(this).find('.a-left').addClass('w3-animate-left');
          $(this).find('.a-right').addClass('w3-animate-right');
          $(this).removeClass('a-hide');
        } else {
          $(this).find('.a-left, .a-right').removeClass('w3-animate-left w3-animate-right');
          $(this).addClass('a-hide');
        }
      });
    });
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
    $('[data-validation]').on('input', function(){
      $(this).val($(this).val().replace(new RegExp('[^'+ $(this).attr('data-validation') +']', 'gim'), ''));
    });
  },
  toggleFolder: f =>{
    $(f).find('i').toggleClass('fa-folder fa-folder-open');
    $(f).next().slideToggle();
  }
};

const FEED = {
  u1: ENV.blogUrl +'search',
  u2: ENV.blogUrl +'feeds/posts/default',
  u3: m => '?alt=json&max-results='+ m,
  search: ()=>{
    const s = $('#searchbar');
    (+$('[name=searchbar]:checked').val() == 1)? (()=>{
      const q = s.find(':text').val().trim();
      q ? location.assign(encodeURI(FEED.u1 +'?q='+ q)) : APP.toast('Kata kunci tidak boleh kosong');
    })() : location.assign(encodeURI(FEED.u1 +'/label/'+ s.find('select').val()));
  }
};

const RESULT = {
  section: d =>{
    const e = d.feed.entry.sort(()=> Math.random()-0.5).slice(0,5);
    $('#section-result').html(RESULT.article(e));
  },
  article: e =>{
    let a = '';
    e.forEach(d =>{
      a += '<table style="width:100%">'+
              '<tr>'+
                '<td style="vertical-align:top">'+
                  '<div class="thumbnail w3-card-2 w3-margin-right">'+
                    '<img src="'+ d.media$thumbnail.url +'"/>'+
                  '</div>'+
                '</td>'+
                '<td>'+
                  '<b class="w3-large w3-text-dark-gray">'+ d.title.$t +'</b>'+
                  '<div class="w3-small w3-justify">'+ d.summary.$t.slice(0,100) +'..</div>'+
                  '<p class="w3-right-align">'+
                    '<a class="w3-button w3-small w3-border w3-round-large" href="'+ d.link[2].href +'">Baca selengkapnya</a>'+
                  '</p>'+
                '</td>'+
              '</tr>'+
            '</table>';
    });
    return a;
  }
};

$(document).ready(()=>{
  RUN.sectionFeed();
  RUN.worker();
  RUN.displayMenu();
  RUN.domContent();
  RUN.bindEvent();
});
