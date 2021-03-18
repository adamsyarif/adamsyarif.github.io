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
