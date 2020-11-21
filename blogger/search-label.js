(()=>{
  const p = new URL(window.location.href).pathname;
  const c = p.slice((p.lastIndexOf('/')+1), p.length);
  _req(_feedUrl +'/-/'+ c +'?alt=json&max-results=1000', (j)=>{
    const p = [];
    if(j.feed.entry){
      const e = j.feed.entry;
      const x = (e.length >= 7)? 7 : e.length;
      for(let i = 0; i < x; i++){
        p.push(e[i]);
      }
    }
    $('#search-result').html(_postList(p));
  });
})();
