const _menu = {
  html: [
    {
      name: 'Apa itu HTML ?',
      link: '/2020/11/apa-itu-html.html'
    },
    {
      name: 'HTML Attributes',
      link: '/2020/11/html-attributes.html'
    },
    {
      name: 'HTML Head and Body',
      link: '/2020/11/html-head-and-body.html'
    },
    {
      name: 'HTML Layout',
      link: '/2020/11/html-layout.html'
    },
    {
      name: 'HTML Display',
      link: '/2020/11/html-display.html'
    }
  ],
  css: [
    {
      name: 'Apa itu CSS ?',
      link: '/2020/11/apa-itu-css_25.html'
    },
    {
      name: 'CSS Selectors',
      link: '/2020/11/css-selectors.html'
    },
    {
      name: 'CSS Units',
      link: '/2020/11/css-units.html'
    },
    {
      name: 'CSS Layout',
      link: '/2020/11/css-layout.html'
    },
    {
      name: 'CSS Display',
      link: '/2020/11/css-display.html'
    },
    {
      name: 'CSS Position',
      link: '/2020/11/css-position.html'
    },
    {
      name: 'CSS Width and Height',
      link: '/2020/11/css-width-and-height.html'
    },
    {
      name: 'CSS Text',
      link: '/2020/11/css-text.html'
    },
    {
      name: 'CSS Colors',
      link: '/2020/11/css-colors.html'
    },
    {
      name: 'CSS Effect',
      link: '/2020/11/css-effect.html'
    },
    {
      name: 'CSS Animation',
      link: '/2020/11/css-animation.html'
    }
  ],
  javascript: [
    {
      name: 'Apa itu JavaScript ?',
      link: '/2020/11/apa-itu-javascript.html'
    },
    {
      name: 'JavaScript Variables',
      link: '/2020/11/javascript-variables.html'
    },
    {
      name: 'JavaScript Data types',
      link: '/2020/11/javascript-data-types.html'
    },
    {
      name: 'JavaScript Operators',
      link: '/2020/11/javascript-operators.html'
    },
    {
      name: 'JavaScript Comparison and Conditions',
      link: '/2020/11/javascript-comparison-and-conditions.html'
    },
    {
      name: 'JavaScript Function',
      link: '/2020/11/javascript-function.html'
    },
    {
      name: 'JavaScript Async and Await',
      link: '/2020/11/javascript-async-and-await.html'
    },
    {
      name: 'JavaScript Promises',
      link: '/2020/11/javascript-promises.html'
    },
    {
      name: 'JavaScript this Keyword',
      link: '/2020/11/javascript-this-keyword.html'
    },
    {
      name: 'JavaScript Class',
      link: '/2020/11/javascript-class.html'
    },
    {
      name: 'JavaScript Loop',
      link: '/2020/11/javascript-loop.html'
    },
    {
      name: 'JavaScript Math',
      link: '/2020/11/javascript-math.html'
    },
    {
      name: 'JavaScript Date',
      link: '/2020/11/javascript-date.html'
    },
    {
      name: 'JavaScript Event listener',
      link: '/2020/11/javascript-event-listener.html'
    },
    {
      name: 'JavaScript RegExp',
      link: '/2020/11/javascript-regexp.html'
    },
    {
      name: 'JavaScript Errors',
      link: '/2020/11/javascript-errors.html'
    }
  ]
};

(()=>{
  let l;
  Object.keys(_menu).forEach((n, i)=>{
    l = '';
    _menu[n].forEach((m)=>{
      l += '<a href="'+ m.link +'" class="menu-'+ n +' w3-bar-item w3-button">'+ m.name +'</a>';
    });
    $('.menu-content').eq(i).html(l);
  });
})();

function _selectedMenu(n, i){
  $('.menu-'+ n).eq(i).addClass('w3-green');
}
