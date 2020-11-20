function randomPost(data){
  const a = [];
  let r, x;
  const d = data.feed.entry;
  while(a.length < 5){
    r = Math.floor(Math.random()*d.length);
    a.push(d[r]);
  }
  let l = '';
  a.forEach((v)=>{
    '<table class="w3-table">'+
      '<tr>'+
        '<td>'+
          '<div class="thumbnail w3-card-2">'+
            '<a href="'+ v.link[2].href +'">'+
              '<img src="'+ v.media$thumbnail.url +'"/>'+
            '</a>'+
          '</div>'+
        '</td>'+
        '<td style="width:100%">'+
          '<b class="w3-text-dark-gray">'+ v.title.$t +'</b>'+
          '<div style="text-align:justify">'+
            '<a href="'+ v.link[2].href +'">'+
              '<span class="w3-small">'+ (v.summary.$t.slice(0, 100) +'..') +'</span>'+
            '</a>'+
          '</div>'+
        '</td>'+
      '</tr>'+
    '</table>';
  });
  $('.random-post').html(l);
}
