const _menu = {
  html: [
    {
      name: 'Apa itu HTML ?',
      link: '#'
    },
    {
      name: 'HTML Attributes',
      link: '#'
    },
    {
      name: 'HTML Head and Body',
      link: '#'
    },
    {
      name: 'HTML Layout',
      link: '#'
    },
    {
      name: 'HTML Display',
      link: '#'
    }
  ],
  css: [
    {
      name: 'Apa itu CSS ?',
      link: '#'
    },
    {
      name: 'CSS Selectors',
      link: '#'
    },
    {
      name: 'CSS Units',
      link: '#'
    },
    {
      name: 'CSS Layout',
      link: '#'
    },
    {
      name: 'CSS Display',
      link: '#'
    },
    {
      name: 'CSS Position',
      link: '#'
    },
    {
      name: 'CSS Width and Height',
      link: '#'
    },
    {
      name: 'CSS Text',
      link: '#'
    },
    {
      name: 'CSS Colors',
      link: '#'
    },
    {
      name: 'CSS Effect',
      link: '#'
    },
    {
      name: 'CSS Animation',
      link: '#'
    }
  ],
  javascript: [
    {
      name: 'Apa itu JavaScript ?',
      link: '#'
    },
    {
      name: 'JavaScript Variables',
      link: '#'
    },
    {
      name: 'JavaScript Data types',
      link: '#'
    },
    {
      name: 'JavaScript Operators',
      link: '#'
    },
    {
      name: 'JavaScript Comparison and Conditions',
      link: '#'
    },
    {
      name: 'JavaScript Function',
      link: '#'
    },
    {
      name: 'JavaScript Async and Await',
      link: '#'
    },
    {
      name: 'JavaScript Promises',
      link: '#'
    },
    {
      name: 'JavaScript this Keyword',
      link: '#'
    },
    {
      name: 'JavaScript Class',
      link: '#'
    },
    {
      name: 'JavaScript Loop',
      link: '#'
    },
    {
      name: 'JavaScript Math',
      link: '#'
    },
    {
      name: 'JavaScript Date',
      link: '#'
    },
    {
      name: 'JavaScript Event listener',
      link: '#'
    },
    {
      name: 'JavaScript RegExp',
      link: '#'
    },
    {
      name: 'JavaScript Errors',
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
