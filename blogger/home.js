const SLIDE = {
  index: 0,
  left: ()=>{
    if(SLIDE.index > 0){
      SLIDE.index -= 1;
      SLIDE.show();
    }
  },
  right: ()=>{
    if(SLIDE.index == 0){
      SLIDE.index += 1;
      SLIDE.show();
    }
  },
  show: ()=>{
    const s = $('.slides');
    s.addClass('w3-hide-small w3-hide-medium');
    s.eq(SLIDE.index).removeClass('w3-hide-small w3-hide-medium');
    $('#slides').find('.fa-circle').toggleClass('w3-text-blue w3-text-gray');
  }
};

$(document).ready(()=>{
  APP.data('testi', r =>{
    let t = '';
    r.data.sort(()=> Math.random()-0.5).slice(0,5).forEach(d =>{
      t += '<td class="w3-container w3-center" style="width:300px">'+
              '<p><img class="thumbnail w3-circle w3-card-2" src="'+ d.img +'"/></p>'+
              '<p>'+
                '<b class="w3-large w3-text-dark-gray">'+ d.name +'</b><br/>'+
                '<span class="w3-small w3-text-gray">'+ d.city +'</span>'+
              '</p>'+
              '<p><q><i>'+ d.msg +'</i></q></p>'+
            '</td>';
    });
    $('#testi').find('tr').html(t+t).css('animation', 'testi 40s linear infinite');
  });
});
