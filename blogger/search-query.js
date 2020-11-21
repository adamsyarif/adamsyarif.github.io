(()=>{
  const q = new URL(window.location.href).searchParams.get('q');
  _req(_feedUrl +'?q='+ q +'&alt=json&max-results=1000', (j)=>{
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
