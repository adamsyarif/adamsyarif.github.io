(()=>{
  const menu = {
    m1: {
      title: 'Materi dasar',
      content: [
        {
          title: 'HTML',
          content: [
            {
              id: 1,
              title: 'Apa itu HTML?',
              link: '#'
            }
          ]
        },{
          title: 'CSS',
          content: [
            {
              id: 1,
              title: 'Apa itu CSS?',
              link: '#'
            }
          ]
        },{
          title: 'JavaScript',
          content: [
            {
              id: 1,
              title: 'Apa itu JavaScript?',
              link: '#'
            }
          ]
        }
      ]
    },
    m2: {
      title: 'Materi lanjutan',
      content: [
        {
          title: 'HTML',
          content: [
            {
              id: 1,
              title: 'Apa itu HTML?',
              link: '#'
            }
          ]
        },{
          title: 'CSS',
          content: [
            {
              id: 1,
              title: 'Apa itu CSS?',
              link: '#'
            }
          ]
        },{
          title: 'JavaScript',
          content: [
            {
              id: 1,
              title: 'Apa itu JavaScript?',
              link: '#'
            }
          ]
        }
      ]
    },
    m3: {
      title: 'Referensi',
      content: [
        {
          title: 'HTML',
          content: [
            {
              id: 1,
              title: 'Apa itu HTML?',
              link: '#'
            }
          ]
        },{
          title: 'CSS',
          content: [
            {
              id: 1,
              title: 'Apa itu CSS?',
              link: '#'
            }
          ]
        },{
          title: 'JavaScript',
          content: [
            {
              id: 1,
              title: 'Apa itu JavaScript?',
              link: '#'
            }
          ]
        }
      ]
    }
  };
  const b = x => '<button class="w3-bar-item w3-button w3-hover-light-gray" onclick="_menubar(this)"><i class="fas fa-folder w3-text-yellow w3-margin-right"></i>'+ x +'</button>';
  const d = x => '<div class="w3-margin-left" style="display:none">'+ x +'</div>';
  let l, m2, m1 = '';
  Object.keys(menu).forEach((k)=>{
    m1 += b(menu[k].title);
    m2 = '';
    menu[k].content.forEach((s)=>{
      m2 += b(s.title);
      l = '';
      s.content.forEach((a)=>{
        l += '<a href="'+ a.link +'" class="w3-bar-item w3-button w3-hover-light-gray"><i class="far fa-file-alt w3-margin-right"></i>'+ a.title +'</a>';
      });
      m2 += d(l);
    });
    m1 += d(m2);
  });
  $('#menubar nav').html(m1);
})();
