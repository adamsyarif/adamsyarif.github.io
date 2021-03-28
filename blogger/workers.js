const TITLES = {
  data: [
    'Belajar HTML',
    'Belajar CSS',
    'Belajar JavaScript',
    'Web Belajar Pemrograman'
  ],
  index: 0,
  repeat: function(){
    let [i, w] = [0, ''];
    const a = this.data[this.index].split('');
    const x = setInterval(()=>{
      w += a[i];
      postMessage(w);
      i++;
      if(i >= a.length){
        clearInterval(x);
        setTimeout(()=>{
          this.index++;
          if(this.index >= this.data.length) this.index = 0;
          this.repeat();
        }, 2000);
      }
    }, 100);
  }
};
TITLES.repeat();
