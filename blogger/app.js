const APP = {
  REQ: [],
  req: (u, c)=>{
    $.ajax({
      method: 'GET',
      url: u,
      beforeSend: ()=> APP.loader(true),
      complete: ()=> APP.loader(false)
    }).done(r => c(r)).fail((x, s, e)=>{
      e ? (()=>{
        APP.toast('Error, please check console for details');
        console.log(e);
      })() : APP.toast(s);
    });
  },
  loader: s =>{
    const l = $('#loader');
    if(s){
      if(typeof s == 'number'){
        l.show();
        setTimeout(()=>{
          l.hide();
        }, s);
      } else {
        if(APP.REQ.length == 0) l.show();
        APP.REQ.push(1);
      }
    } else {
      if(APP.REQ.length > 0) APP.REQ.pop();
      if(APP.REQ.length == 0) l.hide();
    }
  },
  TOAST: null,
  toast: m =>{
    if(APP.TOAST) clearTimeout(APP.TOAST);
    const t = $('#toast');
    t.show().find('div').text(m);
    APP.TOAST = setTimeout(()=>{
      APP.TOAST = null;
      t.hide();
    }, 3000);
  },
  data: (d, c)=>{
    const u = (ENV.devMode ? '/data/' : ENV.repoUrl)+ d +'.json';
    APP.req(u, r => c(r));
  },
  worker: (u, c)=>{
    APP.req(u, r =>{
      const b = new Blob([r], {type:'application/javascript'});
      c(new Worker(URL.createObjectURL(b)));
    });
  },
  copy: e =>{
    $(e).select();
    document.execCommand('copy');
    APP.toast('Teks telah disalin');
  },
  preventDefault: e =>{
    e.preventDefault();
    return false;
  }
};
