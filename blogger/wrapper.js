RUN.titleNav = s =>{
  const t = $('#title-nav');
  if(s){
    let x1, x2, n = '';
    $('h4 div').each(function(){
      x1 = $('#inner-wrapper').scrollTop();
      x2 = $(this).offset().top;
      n += '<button onclick="RUN.jumpTo('+ (Math.round(x1 + x2)-150) +'); RUN.titleNav(false)" class="w3-bar-item w3-button">'+ $(this).text() +'</button>';
    });
    t.show().find('nav').html(n);
  }
  else t.hide();
};

$(document).ready(()=>{
  if($('h4 div').length == 0) $('.title-nav').eq(0).hide();
});
