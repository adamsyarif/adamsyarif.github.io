(()=>{
  const u = new URL(window.location.href);
  const q = u.searchParams.get('q');
  const c = u.searchParams.get('c');
  _searchResult(q, c);
})();
