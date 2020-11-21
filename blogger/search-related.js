(()=>{
  let c = $('#post-label').val().split(',').filter(v => v.trim() != '');
  let r = Math.floor(Math.random() * c.length);
  _req(_blogUrl +'/feeds/posts/default/-/'+ c[r] +'?alt=json&max-results=1000', (j)=>{
    _loader(true);
    const p = [];
    const e = j.feed.entry;
    const x = (e.length >= 5)? 5 : e.length;
    let f;
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
    $('#sidebar-post').html(_postList(p));
    _loader(false);
  });
})();
