RUN.codeEditor = ()=>{
  const t = $('#x-editor textarea');
  $('#x-frame').attr('srcdoc', ('<style>'+ t.eq(1).val() +'</style>'+ t.eq(0).val() +'<script>'+ t.eq(2).val() +'</script>'));
};

(()=>{
  const b = $('.x-btn');
  const t = $('#x-editor textarea');
  b.click(function(){
    const i = b.index(this);
    b.removeClass('w3-border-gray');
    b.eq(i).addClass('w3-border-gray');
    t.hide();
    t.eq(i).show();
  });
})();