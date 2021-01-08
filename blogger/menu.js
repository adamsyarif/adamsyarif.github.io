const _menu = {
  html: [
    {
      id: 0,
      title: 'HTML 1',
      link: '/2021/01/html-1.html'
    },
    {
      id: 0,
      title: 'HTML 2',
      link: '/2021/01/html-2.html'
    },
    {
      id: 0,
      title: 'HTML 3',
      link: '/2021/01/html-3.html'
    },
    {
      id: 0,
      title: 'HTML 4',
      link: '/2021/01/html-4.html'
    },
    {
      id: 0,
      title: 'HTML 5',
      link: '/2021/01/html-5.html'
    },
    {
      id: 0,
      title: 'HTML 6',
      link: '/2021/01/html-6.html'
    },
    {
      id: 0,
      title: 'HTML 7',
      link: '/2021/01/html-7.html'
    },
    {
      id: 0,
      title: 'HTML 8',
      link: '/2021/01/html-8.html'
    },
    {
      id: 0,
      title: 'HTML 9',
      link: '/2021/01/html-9.html'
    },
    {
      id: 0,
      title: 'HTML 10',
      link: '/2021/01/html-10.html'
    }
  ],
  css: [
    {
      id: 0,
      title: 'CSS 1',
      link: '/2021/01/css-1.html'
    },
    {
      id: 0,
      title: 'CSS 2',
      link: '/2021/01/css-2.html'
    },
    {
      id: 0,
      title: 'CSS 3',
      link: '/2021/01/css-3.html'
    },
    {
      id: 0,
      title: 'CSS 4',
      link: '/2021/01/css-4.html'
    },
    {
      id: 0,
      title: 'CSS 5',
      link: '/2021/01/css-5.html'
    },
    {
      id: 0,
      title: 'CSS 6',
      link: '/2021/01/css-6.html'
    },
    {
      id: 0,
      title: 'CSS 7',
      link: '/2021/01/css-7.html'
    },
    {
      id: 0,
      title: 'CSS 8',
      link: '/2021/01/css-8.html'
    },
    {
      id: 0,
      title: 'CSS 9',
      link: '/2021/01/css-9.html'
    },
    {
      id: 0,
      title: 'CSS 10',
      link: '/2021/01/css-10.html'
    }
  ],
  javascript: [
    {
      id: 0,
      title: 'JavaScript 1',
      link: '/2021/01/javascript-1.html'
    },
    {
      id: 0,
      title: 'JavaScript 2',
      link: '/2021/01/javascript-2.html'
    },
    {
      id: 0,
      title: 'JavaScript 3',
      link: '/2021/01/javascript-3.html'
    },
    {
      id: 0,
      title: 'JavaScript 4',
      link: '/2021/01/javascript-4.html'
    },
    {
      id: 0,
      title: 'JavaScript 5',
      link: '/2021/01/javascript-5.html'
    },
    {
      id: 0,
      title: 'JavaScript 6',
      link: '/2021/01/javascript-6.html'
    },
    {
      id: 0,
      title: 'JavaScript 7',
      link: '/2021/01/javascript-7.html'
    },
    {
      id: 0,
      title: 'JavaScript 8',
      link: '/2021/01/javascript-8.html'
    },
    {
      id: 0,
      title: 'JavaScript 9',
      link: '/2021/01/javascript-9.html'
    },
    {
      id: 0,
      title: 'JavaScript 10',
      link: '/2021/01/javascript-10.html'
    }
  ]
};

(()=>{
  console.log(123);
  let l, s, next, x = $('#post-id').val();
  Object.keys(_menu).forEach((n, i)=>{
    l = '';
    _menu[n].forEach((m, ii, a)=>{
      s = '';
      if(m.id == x){
        next = a[ii+1];
        if(next) $('#next-post').show().find('a').attr('href', next.link).find('span').text(next.title);
        s = 'w3-green';
        _sidebarMenu(i);
      }
      l += '<a href="'+ m.link +'" class="'+ s +' w3-bar-item w3-button">'+ m.title +'</a>';
    });
    $('.menubar-content').eq(i).html(l);
    console.log(456);
  });
})();
