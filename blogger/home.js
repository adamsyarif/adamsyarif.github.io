const SLIDE = {
  index: 0,
  left: ()=>{
    if(SLIDE.index > 0){
      SLIDE.index -= 1;
      SLIDE.show();
    }
  },
  right: ()=>{
    if(SLIDE.index == 0){
      SLIDE.index += 1;
      SLIDE.show();
    }
  },
  show: ()=>{
    const s = $('.slide');
    s.addClass('w3-hide-small w3-hide-medium');
    s.eq(SLIDE.index).removeClass('w3-hide-small w3-hide-medium');
  }
};

$(document).ready(()=>{
  APP.data('testi', r =>{
    let t = '';
    r.data.sort(()=> Math.random()-0.5).slice(0,5).forEach(d =>{
      t += '<td class="w3-container">'+
              '<p><img class="thumbnail w3-circle w3-card-2" src="'+ d.img +'"/></p>'+
              '<p>'+
                '<b class="w3-large w3-text-dark-gray">'+ d.name +'</b><br/>'+
                '<span class="w3-small w3-text-gray">'+ d.city +'</span>'+
              '</p>'+
              '<p><q><i>'+ d.msg +'</i></q></p>'+
            '</td>';
    });
    $('#testi table').html('<tr>'+ (t+t) +'</tr>').css('animation', 'testi 40s linear infinite');
  });
  const c = $('.code');
  c.eq(0).find('code').text('\n function tambah(a, b){\n   return a + b;\n }\n function kurang(a, b){\n   return a - b;\n }\n\n console.log(tambah(1, 2));\n console.log(kurang(9, 4));\n ');
  c.eq(1).find('code').text('\n body {\n   background-color: blue;\n }\n h1 {\n   text-align: center;\n }\n p {\n   font-size: 20px;\n }\n ');
  c.eq(2).find('code').text('\n <html>\n   <head>\n     <title>Nama web</title>\n   </head>\n   <body>\n     <h1>Judul artikel</h1>\n     <p>Paragraf</p>\n   </body>\n </html>\n ');
  c.click(function(){
    const r = e =>{
      if($(e).hasClass('code1')) $(e).removeClass('code1').addClass('code2');
      else if($(e).hasClass('code2')) $(e).removeClass('code2').addClass('code3');
      else $(e).removeClass('code3').addClass('code1');
    };
    r('.code.html');
    r('.code.css');
    r('.code.javascript');
  });
  $('pre code').each(function(){
    hljs.highlightBlock(this);
  });
});
