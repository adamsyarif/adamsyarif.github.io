function randomPost(data){
  const a = [];
  const d = data.feed.entry;
  const s = (d.length >= 5)? 5 : d.length;
  let r, f;
  while(a.length < s){
    r = Math.floor(Math.random()*d.length);
    if(a.length == 0) a.push(d[r]);
    else {
      a.forEach((v)=>{
        f = (v.id.$t == d[r].id.$t)? true : false;
      });
      if(!f) a.push(d[r]);
    }
  }
  let l = '';
  a.forEach((v)=>{
    l += '<table style="width:100%">'+
          '<tr>'+
            '<td>'+
              '<div class="thumbnail w3-card-2 w3-margin-right">'+
                '<img src="'+ v.media$thumbnail.url +'"/>'+
              '</div>'+
            '</td>'+
            '<td style="width:100%">'+
              '<b class="w3-large w3-text-dark-gray">'+ v.title.$t +'</b>'+
              '<div class="w3-small" style="text-align:justify">'+ (v.summary.$t.slice(0, 100) +'..') +'</div>'+
              '<p class="w3-right-align">'+
                '<a class="w3-button w3-border w3-small w3-round-large" href="'+ v.link[2].href +'">Baca selengkapnya</a>'+
              '</p>'+
            '</td>'+
          '</tr>'+
        '</table>';
  });
  $('.random-post').html(l);
}
