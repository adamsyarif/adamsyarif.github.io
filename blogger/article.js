$(document).ready(()=>{
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
  p.find('iframe').attr('srcdoc', function(){
    const a = $(this).parent().parent();
    if(a.find('button').eq(0).hasClass('active')){
      const c = a.find('code');
      return (c.eq(0).text() +'<style>html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}body{margin:0;padding:0}'+ c.eq(1).text() +'</style><script>'+ c.eq(2).text() +'</script>');
    }
    else $(this).remove();
  });
  $('pre code').each(function(){
    hljs.highlightBlock(this);
  });
});
