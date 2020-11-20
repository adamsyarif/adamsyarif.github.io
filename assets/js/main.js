function randomPost(data){
  const a = [];
  let r, x, i;
  const d = data.feed.entry;
  while(a.length < 5){
    r = Math.floor(Math.random()*d.length);
    a.push(d[r]);
  }
  let l = '';
  a.forEach((v)=>{
    l += '<li>'+
            '<table class="w3-table">'+
              '<tr>'+
                '<td>'+
                  '<div class="thumbnail">'+
                    '<a href="'+ v.link[2].href +'">'+
                      '<img src="'+ v.media$thumbnail.url +'"/>'+
                    '</a>'+
                  '</div>'+
                '</td>'+
                '<td style="width:100%">'+
                  '<b class="w3-text-dark-gray">'+ v.title.$t +'</b><br/>'+
                  '<span class="w3-small">'+ v.summary.$t +'</span>'+
                '</td>'+
              '</tr>'+
            '</table>'+
         '</li>';
  });
  $('.random-post').html(l);
}
