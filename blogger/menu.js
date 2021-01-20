const _menu1 = {
  html: [
    {
      id: 4399303728456275015,
      name: 'Apa itu HTML ?',
      link: '/2021/01/apa-itu-html.html'
    },
    {
      id: 7888608571628476824,
      name: 'HTML Attributes',
      link: '/2021/01/html-attributes.html'
    },
    {
      id: 4333501711927359046,
      name: 'HTML Head and Body',
      link: '/2021/01/html-head-and-body.html'
    },
    {
      id: 659855880949546929,
      name: 'HTML Layout',
      link: '/2021/01/html-layout.html'
    },
    {
      id: 2643188050306825353,
      name: 'HTML Display',
      link: '/2021/01/html-display.html'
    }
  ],
  css: [
    {
      id: 2972016429648288247,
      name: 'Apa itu CSS ?',
      link: '/2021/01/apa-itu-css_25.html'
    },
    {
      id: 1491101387658211260,
      name: 'CSS Selectors',
      link: '/2021/01/css-selectors.html'
    },
    {
      id: 8646267057938881343,
      name: 'CSS Units',
      link: '/2021/01/css-units.html'
    },
    {
      id: 3882183698891192549,
      name: 'CSS Layout',
      link: '/2021/01/css-layout.html'
    },
    {
      id: 892818747925627275,
      name: 'CSS Display',
      link: '/2021/01/css-display.html'
    },
    {
      id: 6298600439964084840,
      name: 'CSS Position',
      link: '/2021/01/css-position.html'
    },
    {
      id: 328380100033177187,
      name: 'CSS Width and Height',
      link: '/2021/01/css-width-and-height.html'
    },
    {
      id: 1374602737535412614,
      name: 'CSS Text',
      link: '/2021/01/css-text.html'
    },
    {
      id: 1008812938349504284,
      name: 'CSS Colors',
      link: '/2021/01/css-colors.html'
    },
    {
      id: 6181110356406152695,
      name: 'CSS Effect',
      link: '/2021/01/css-effect.html'
    },
    {
      id: 8945022256510799130,
      name: 'CSS Animation',
      link: '/2021/01/css-animation.html'
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
      name: 'JavaScript Variable',
      link: '/2021/01/javascript-variable.html'
    },
    {
      id: 4090851026629334638,
      name: 'JavaScript Data type',
      link: '/2021/01/javascript-data-type.html'
    },
    {
      id: 3104696424489244361,
      name: 'JavaScript Operator',
      link: '/2021/01/javascript-operator.html'
    },
    {
      id: 5612245712293651737,
      name: 'JavaScript Conditional statement',
      link: '/2021/01/javascript-conditional-statement.html'
    },
    {
      id: 5474250890539883776,
      name: 'JavaScript Function',
      link: '/2021/01/javascript-function.html'
    },
    {
      id: 4023070051762934749,
      name: 'JavaScript Event listener',
      link: '/2021/01/javascript-event-listener.html'
    },
    {
      id: 2265176596142947677,
      name: 'JavaScript Loop',
      link: '/2021/01/javascript-loop.html'
    },
    {
      id: 8724253155128548012,
      name: 'JavaScript Math',
      link: '/2021/01/javascript-math.html'
    },
    {
      id: 7783484893767550398,
      name: 'JavaScript Date',
      link: '/2021/01/javascript-date.html'
    },
    {
      id: 1206236644980774137,
      name: 'JavaScript Try Catch',
      link: '/2021/01/javascript-try-catch.html'
    }
  ]
};

const _menu2 = {
  html: [
    {
      id: 4399303728456275015,
      name: 'Apa itu HTML ?',
      link: '/2021/01/apa-itu-html.html'
    }
  ],
  css: [
    {
      id: 2972016429648288247,
      name: 'Apa itu CSS ?',
      link: '/2021/01/apa-itu-css_25.html'
    }
  ],
  javascript: [
    {
      id: 5921124459974078627,
      name: 'JavaScript Promise',
      link: '/2021/01/javascript-promise.html'
    },
    {
      id: 1989043964910531869,
      name: 'JavaScript Async Await',
      link: '/2021/01/javascript-async-await.html'
    },
    {
      id: 8718410627563179637,
      name: 'JavaScript this Keyword',
      link: '/2021/01/javascript-this-keyword.html'
    },
    {
      id: 8718410627563179637,
      name: 'JavaScript Arrow function',
      link: '/2021/01/javascript-arrow-function.html'
    },
    {
      id: 530437586833937029,
      name: 'JavaScript Class',
      link: '/2021/01/javascript-class.html'
    },
    {
      id: 6037888841435560037,
      name: 'JavaScript RegExp',
      link: '/2021/01/javascript-regexp.html'
    }
  ]
};

(()=>{
  const list = (k)=>{
    let c, n, l = '';
    const id = $('#post-id').val();
    const next = $('#next-post');
    k.forEach((m, i, a)=>{
      c = '';
      if(m.id == id){
        n = a[i+1];
        if(n) next.show().find('a').attr('href', n.link).find('span').text(n.name);
        c = 'w3-green';
      }
      l += '<a href="'+ m.link +'" class="'+ c +' w3-bar-item w3-button">'+ m.name +'</a>';
    });
    return l;
  };
  const x = $('.menubar-content');
  Object.keys(_menu1).forEach((k, i)=>{
    x.eq(i).html(list(_menu1[k]));
    x.eq(i+3).html(list(_menu2[k]));
  });
})();
