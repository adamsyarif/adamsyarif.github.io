const _menu = {
  html: [
    {
      id: 4399303728456275015,
      name: 'Apa itu HTML ?',
      link: '/2020/12/apa-itu-html.html'
    },
    {
      id: 7888608571628476824,
      name: 'HTML Attributes',
      link: '/2020/11/html-attributes.html'
    },
    {
      id: 4333501711927359046,
      name: 'HTML Head and Body',
      link: '/2020/11/html-head-and-body.html'
    },
    {
      id: 659855880949546929,
      name: 'HTML Layout',
      link: '/2020/11/html-layout.html'
    },
    {
      id: 2643188050306825353,
      name: 'HTML Display',
      link: '/2020/11/html-display.html'
    }
  ],
  css: [
    {
      id: 2972016429648288247,
      name: 'Apa itu CSS ?',
      link: '/2020/12/apa-itu-css.html'
    },
    {
      id: 1491101387658211260,
      name: 'CSS Selectors',
      link: '/2020/11/css-selectors.html'
    },
    {
      id: 8646267057938881343,
      name: 'CSS Units',
      link: '/2020/11/css-units.html'
    },
    {
      id: 3882183698891192549,
      name: 'CSS Layout',
      link: '/2020/11/css-layout.html'
    },
    {
      id: 892818747925627275,
      name: 'CSS Display',
      link: '/2020/11/css-display.html'
    },
    {
      id: 6298600439964084840,
      name: 'CSS Position',
      link: '/2020/11/css-position.html'
    },
    {
      id: 1374602737535412614,
      name: 'CSS Text',
      link: '/2020/11/css-text.html'
    },
    {
      id: 1008812938349504284,
      name: 'CSS Colors',
      link: '/2020/11/css-colors.html'
    },
    {
      id: 6181110356406152695,
      name: 'CSS Effect',
      link: '/2020/11/css-effect.html'
    },
    {
      id: 8945022256510799130,
      name: 'CSS Animation',
      link: '/2020/11/css-animation.html'
    }
  ],
  javascript: [
    {
      id: 5921124459974078627,
      name: 'Apa itu JavaScript ?',
      link: '/2020/12/apa-itu-javascript.html'
    },
    {
      id: 5654482686799684914,
      name: 'JavaScript Variables',
      link: '/2020/11/javascript-variables.html'
    },
    {
      id: 4090851026629334638,
      name: 'JavaScript Data types',
      link: '/2020/11/javascript-data-types.html'
    },
    {
      id: 3104696424489244361,
      name: 'JavaScript Operators',
      link: '/2020/11/javascript-operators.html'
    },
    {
      id: 5612245712293651737,
      name: 'JavaScript Comparison and Conditions',
      link: '/2020/11/javascript-comparison-and-conditions.html'
    },
    {
      id: 5474250890539883776,
      name: 'JavaScript Function',
      link: '/2020/11/javascript-function.html'
    },
    {
      id: 1989043964910531869,
      name: 'JavaScript Async and Await',
      link: '/2020/11/javascript-async-and-await.html'
    },
    {
      id: 5726443359569853224,
      name: 'JavaScript Promises',
      link: '/2020/11/javascript-promises.html'
    },
    {
      id: 8718410627563179637,
      name: 'JavaScript this Keyword',
      link: '/2020/11/javascript-this-keyword.html'
    },
    {
      id: 530437586833937029,
      name: 'JavaScript Class',
      link: '/2020/11/javascript-class.html'
    },
    {
      id: 2265176596142947677,
      name: 'JavaScript Loop',
      link: '/2020/11/javascript-loop.html'
    },
    {
      id: 8724253155128548012,
      name: 'JavaScript Math',
      link: '/2020/11/javascript-math.html'
    },
    {
      id: 7783484893767550398,
      name: 'JavaScript Date',
      link: '/2020/11/javascript-date.html'
    },
    {
      id: 4023070051762934749,
      name: 'JavaScript Event listener',
      link: '/2020/11/javascript-event-listener.html'
    },
    {
      id: 6037888841435560037,
      name: 'JavaScript RegExp',
      link: '/2020/11/javascript-regexp.html'
    },
    {
      id: 1206236644980774137,
      name: 'JavaScript Errors',
      link: '/2020/11/javascript-errors.html'
    }
  ]
};

(()=>{
  let l, s, next, x = +$('#post-id').val();
  Object.keys(_menu).forEach((n, i)=>{
    l = '';
    _menu[n].forEach((m, ii, a)=>{
      s = '';
      if(m.id == x){
        next = a[ii+1];
        if(next) $('#next-post').show().find('a').attr('href', next.link).find('span').text(next.name);
        s = 'w3-green';
        _sidebarMenu(i);
      }
      l += '<a href="'+ m.link +'" class="'+ s +' w3-bar-item w3-button">'+ m.name +'</a>';
    });
    $('.menu-content').eq(i).html(l);
  });
})();
