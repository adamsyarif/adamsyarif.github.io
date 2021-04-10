(()=>{
  $('#article-body').on('select copy cut', APP.preventDefault);
  $('.preview').find('button.active').click(function(){
    const a = $(this).parent().parent();
    const b = a.find('button');
    const p = a.find('pre');
    const c = a.find('code');
    const i = b.index(this);
    if(i < 3){
      b.removeClass('w3-border-gray');
      b.eq(i).addClass('w3-border-gray');
      p.hide();
      p.eq(i).show();
    } else {
      const w = window.open('/p/code-editor.html');
      $(w).on('load', ()=>{
        [0,1,2].forEach(i =>{
          if(c.eq(i).text()) $(w.document).find('#x-editor textarea').eq(i).val(c.eq(i).text());
        });
        $(w.document).find('#x-frame').attr('srcdoc', ('<style>'+ c.eq(1).text() +'</style>'+ c.eq(0).text() +'<script>'+ c.eq(2).text() +'</script>'));
      });
    }
  });
  $('pre code').each(function(){
    hljs.highlightBlock(this);
  });
})();
