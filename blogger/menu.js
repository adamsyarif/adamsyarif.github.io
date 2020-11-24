const _menu = {
  html: [
    {
      name: 'Apa itu HTML ?',
      link: '#'
    },
    {
      name: 'HTML atributes',
      link: '#'
    },
    {
      name: 'HTML layouts',
      link: '#'
    },
    {
      name: 'HTML head dan body',
      link: '#'
    },
    {
      name: 'HTML display',
      link: '#'
    }
  ],
  css: [
    {
      name: 'Apa itu CSS ?',
      link: '#'
    },
    {
      name: 'CSS selectors',
      link: '#'
    },
    {
      name: 'CSS units',
      link: '#'
    },
    {
      name: 'CSS colors',
      link: '#'
    },
    {
      name: 'CSS text',
      link: '#'
    },
    {
      name: 'CSS margin dan padding',
      link: '#'
    },
    {
      name: 'CSS display',
      link: '#'
    },
    {
      name: 'CSS position',
      link: '#'
    },
    {
      name: 'CSS table',
      link: '#'
    },
    {
      name: 'CSS effect',
      link: '#'
    },
    {
      name: 'CSS animation',
      link: '#'
    }
  ],
  javascript: [
    {
      name: 'Apa itu JavaScript ?',
      link: '#'
    },
    {
      name: 'JavaScript variables',
      link: '#'
    },
    {
      name: 'JavaScript data type',
      link: '#'
    },
    {
      name: 'JavaScript operators',
      link: '#'
    },
    {
      name: 'JavaScript function',
      link: '#'
    },
    {
      name: 'JavaScript event listener',
      link: '#'
    },
    {
      name: 'JavaScript comparisons',
      link: '#'
    },
    {
      name: 'JavaScript conditions',
      link: '#'
    },
    {
      name: 'JavaScript loop',
      link: '#'
    },
    {
      name: 'JavaScript RegExp',
      link: '#'
    },
    {
      name: 'JavaScript errors',
      link: '#'
    },
    {
      name: 'JavaScript math',
      link: '#'
    },
    {
      name: 'JavaScript dates',
      link: '#'
    }
  ]
};

(()=>{
  let l;
  Object.keys(_menu).forEach((n, i)=>{
    l = '';
    _menu[n].forEach((m)=>{
      l += '<a href="'+ m.link +'" class="w3-bar-item w3-button">'+ m.name +'</a>';
    });
    $('.menu-content').eq(i).html(l);
  });
})();
