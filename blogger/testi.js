const _testi = [
  {
    img: 'images/user.jpg',
    name: 'Annisa Putri',
    city: 'Bandung, Jawa Barat.',
    msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel urna justo. Suspendisse semper, nisi sed dictum fermentum, sapien quam euismod urna, at vulputate augue lacus eu risus.'
  },
  {
    img: 'images/user.jpg',
    name: 'Faizal Azmi',
    city: 'Semarang, Jawa Tengah.',
    msg: 'Sed augue ante, venenatis ut nisi eu, volutpat commodo dui. In non varius nulla. Proin ornare nibhnec massa ornare placerat. Proin ut laoreet risus. Vivamus et maximus sapien. Vestibulum faucibus.'
  },
  {
    img: 'images/user.jpg',
    name: 'Aryani Agista',
    city: 'Surabaya, Jawa Timur.',
    msg: 'non lorem venenatis luctus. Aliquam nec quam felis. Phasellus sit amet velit vitae velit faucibus consectetur mattis sit amet libero. Pellentesque habitant morbi tristique senectus et netus et.'
  },
  {
    img: 'images/user.jpg',
    name: 'Rosyid Trianggana',
    city: 'Banjarmasin, Kalimantan Selatan.',
    msg: 'malesuada fames ac turpis egestas. Proin pretium ante in ex sodales, nec sollicitudin nisl lacinia. Praesent aliquam viverra justo. Praesent porta nulla ut lectus dapibus gravida in quis leo.'
  },
  {
    img: 'images/user.jpg',
    name: 'Heni Marsyanti',
    city: 'Pekanbaru, Riau.',
    msg: 'Etiam luctus tortor ac bibendum viverra. Nunc ullamcorper dictum tincidunt. Sed ullamcorper efficitur ante, vel pharetra augue bibendum a. Integer imperdiet tempus libero non viverra. In id.'
  },
  {
    img: 'images/user.jpg',
    name: 'Ryan Pradita',
    city: 'Makassar, Sulawesi Selatan.',
    msg: 'Nullam ullamcorper rutrum sapien, et tempor diam tempor sed. Maecenas nec eleifend velit, at viverra neque. Cras elit justo, hendrerit id gravida eget, tempus eu tortor. Vestibulum quis lorem.'
  },
  {
    img: 'images/user.jpg',
    name: 'Fitri Utami',
    city: 'Kendari, Sulawesi Tenggara.',
    msg: 'in leo aliquet aliquet. Mauris imperdiet elit et lacus eleifend, et facilisis quam tempor. Ut odioligula, vehicula quis sem ac, gravida lobortis arcu. Nulla facilisi. Phasellus non sodales dolor.'
  },
  {
    img: 'images/user.jpg',
    name: 'Arief Pratama',
    city: 'Medan, Sumatera Utara.',
    msg: 'Pellentesque maximus ex vitae tellus condimentum faucibus. Vivamus et sapien dignissim, bibendum tellus id, mattis arcu. In et diam id neque rhoncus sodales. In hac habitasse platea dictumst.'
  },
  {
    img: 'images/user.jpg',
    name: 'Nurul Alfiani',
    city: 'Palembang, Sumatera Selatan.',
    msg: 'Aliquam ac enim quis felis sollicitudin tincidunt. Fusce laoreet varius est. Duis eleifend, urnased convallis egestas, metus purus interdum ligula, at viverra purus risus sed nisi. Vestibulum.'
  },
  {
    img: 'images/user.jpg',
    name: 'Aditya Mahendra',
    city: 'Jakarta Selatan, DKI Jakarta.',
    msg: 'enim nibh, egestas accumsan facilisis fringilla, elementum in velit. Maecenas suscipit odio lectus, vel suscipit metus finibus vehicula. Pellentesque vitae lorem sit amet ex facilisis auctor. Cras.'
  }
];

(()=>{
  let t = '';
  _testi.sort(()=> Math.random()-0.5).slice(0,5).forEach((v)=>{
    t += '<td class="w3-container w3-center" style="width:300px">'+
            '<p><img class="thumbnail w3-circle w3-card-2" src="'+ v.img +'"/></p>'+
            '<p>'+
              '<b class="w3-large w3-text-dark-gray">'+ v.name +'</b><br/>'+
              '<span class="w3-small w3-text-gray">'+ v.city +'</span>'+
            '</p>'+
            '<p><q><i>'+ v.msg +'</i></q></p>'+
          '</td>';
  });
  $('#testi table').html('<tr>'+ (t+t) +'</tr>').css('animation', 'testi 40s linear infinite');
})();
