(()=>{
  const u = new URL(window.location.href);
  const c = u.searchParams.get('c');
  const q = u.searchParams.get('q');
  _req(_blogUrl +'/feeds/posts/default'+ (c ? ('/-/'+ c +'?') : '?') + (q ? ('q='+ q +'&') : '') +'alt=json&max-results=1000', (j)=>{
    _loader(true);
    const p = [];
    if(j.feed.entry){
      const e = j.feed.entry;
      const x = (e.length >= 7)? 7 : e.length;
      for(let i = 0; i < x; i++){
        p.push(e[i]);
      }
    }
    $('#search-result').html(_postList(p));
    _loader(false);
  });
})();
