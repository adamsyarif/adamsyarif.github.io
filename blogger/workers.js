const _titles = {
  data: [
    'Web Belajar Pemrograman',
    'Belajar HTML',
    'Belajar CSS',
    'Belajar JavaScript'
  ],
  index: 0,
  start: function(){
    setInterval(()=>{
      postMessage({pointer: true});
    }, 500);
    this.repeat();
  },
  repeat: function(){
    let [i, w] = [0, ''];
    const a = this.data[this.index].split('');
    const x = setInterval(()=>{
      w += a[i];
      postMessage({text: w});
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
_titles.start();