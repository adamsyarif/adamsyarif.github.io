const _menu = {
  html: [
    {
      name: 'Belajar HTML 1',
      link: '#'
    },
    {
      name: 'Belajar HTML 2',
      link: '#'
    },
    {
      name: 'Belajar HTML 3',
      link: '#'
    },
    {
      name: 'Belajar HTML 4',
      link: '#'
    },
    {
      name: 'Belajar HTML 5',
      link: '#'
    }
  ],
  css: [
    {
      name: 'Belajar CSS 1',
      link: '#'
    },
    {
      name: 'Belajar CSS 2',
      link: '#'
    },
    {
      name: 'Belajar CSS 3',
      link: '#'
    },
    {
      name: 'Belajar CSS 4',
      link: '#'
    },
    {
      name: 'Belajar CSS 5',
      link: '#'
    }
  ],
  javascript: [
    {
      name: 'Belajar JavaScript 1',
      link: '#'
    },
    {
      name: 'Belajar JavaScript 2',
      link: '#'
    },
    {
      name: 'Belajar JavaScript 3',
      link: '#'
    },
    {
      name: 'Belajar JavaScript 4',
      link: '#'
    },
    {
      name: 'Belajar JavaScript 5',
      link: '#'
    }
  ]
};

(()=>{
  const m = $('.menu-content');
  const b = v => '<a href="'+ v.link +'" class="w3-bar-item w3-button">'+ v.name +'</a>';
  let l = '';
  _menu.html.forEach(v => l += b(v));
  m.eq(0).html(l);
  l = '';
  _menu.css.forEach(v => l += b(v));
  m.eq(1).html(l);
  l = '';
  _menu.javascript.forEach(v => l += b(v));
  m.eq(2).html(l);
})();