function showPost(j){
  relatedPost(j);
  newPost(j);
}

function relatedPost(j){
  const p = [];
  const e = j.feed.entry;
  if(e.length > 0){
    const x = (e.length >= 5)? 5 : e.length;
    let r1, c, r2, f;
    while(p.length < x){
      r1 = Math.floor(Math.random() * e.length);
      c = $('#post-label').val().split(',');
      r2 = Math.floor(Math.random() * c.length);
      if(e[r1].category.map(v => v.term).includes(c[r2])){
        if(p.length == 0) p.push(e[r1]);
        else {
          p.forEach((v)=>{
            f = (v.id.$t == e[r1].id.$t)? true : false;
          });
          if(!f) p.push(e[r1]);
        }
      }
    }
  }
  $('#related-post').html(postList(p));
}

function newPost(j){
  const p = [];
  const e = j.feed.entry;
  if(e.length > 0){
    const x = (e.length >= 5)? 5 : e.length;
    let r, f;
    while(p.length < x){
      r = Math.floor(Math.random() * e.length);
      if(p.length == 0) p.push(e[r]);
      else {
        p.forEach((v)=>{
          f = (v.id.$t == e[r].id.$t)? true : false;
        });
        if(!f) p.push(e[r]);
      }
    }
  }
  $('#new-post').html(postList(p));
}

function postList(p){
  let l = '';
  if(p.length > 0){
    p.forEach((v)=>{
      l += '<table style="width:100%">'+
              '<tr>'+
                '<td>'+
                  '<div class="thumbnail w3-card-2 w3-margin-right">'+
                    '<img src="'+ v.media$thumbnail.url +'"/>'+
                  '</div>'+
                '</td>'+
                '<td>'+
                  '<b class="w3-large w3-text-dark-gray">'+ v.title.$t +'</b>'+
                  '<div class="w3-small" style="text-align:justify">'+ (v.summary.$t.slice(0, 100) +'..') +'</div>'+
                  '<p class="w3-right-align">'+
                    '<a class="w3-button w3-border w3-small w3-round-large" href="'+ v.link[2].href +'">Baca selengkapnya</a>'+
                  '</p>'+
                '</td>'+
              '</tr>'+
            '</table>';
    });
  }
  else l = '<span class="w3-text-gray">Belum ada artikel</span>';
  return l;
}
