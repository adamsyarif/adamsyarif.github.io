window.onload = ()=>{
  $('#article-body').on('select copy cut', APP.preventDefault);
  const p = $('.preview');
  p.find('button.active').click(function(){
    const a = $(this).parent().parent();
    const b = a.find('button');
    const d = a.find('div');
    const i = b.index(this);
    b.removeClass('w3-border-blue');
    b.eq(i).addClass('w3-border-blue');
    d.hide();
    d.eq(i).show();
  });
  const t = $('#i-template').html();
  p.find('iframe').attr('srcdoc', function(){
    const a = $(this).parent().parent();
    if(a.find('button').eq(0).hasClass('active')){
      const c = a.find('code');
      return t.replace('{HTML}', c.eq(0).text()).replace('{CSS}', c.eq(1).text()).replace('{JS}', c.eq(2).text());
    }
    else $(this).remove();
  });
  $('pre code').each(function(){
    hljs.highlightBlock(this);
  });
};
