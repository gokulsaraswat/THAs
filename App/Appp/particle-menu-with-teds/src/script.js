// Opts

var accuracy = 5 // The lower the more accurate but slows down pc
var total = accuracy * 200

canvas = document.getElementById('main');
ctx = canvas.getContext('2d')

int = 0;

create_canvas = function(canvas_id, url) {
  var t = this;
  this.canvas_name = document.getElementById(canvas_id);
  this.canvas_ctx = this.canvas_name.getContext('2d');
  this.url = url;
  this.canvas_image = new Image();
  this.canvas_image.src = this.url + '?' + new Date().getTime();
  this.canvas_image.setAttribute('crossOrigin', '');
  this.pixel_data = new Array();
  this.canvas_image.onload = function() {
    console.log(int)
    int++;
    if(int == 4){
       $('.l').fadeOut(100);
      setTimeout(function(){
        $('.bar').fadeIn(200);
      },100)
     
    }
    
    t.canvas_ctx.drawImage(t.canvas_image, 0, 0, t.canvas_ctx.canvas.width, t.canvas_ctx.canvas.height); // Change
    get_image_data(t.canvas_ctx, t.pixel_data);
  }
  this.animate_to_image = function(){
    
    if(this.pixel_data.length == 0){
      setTimeout(function(){
        t.animate_to_image();
        
      }, 500);
    }
    
    for (i in pixels) {
      pixels[i].resetPixel();      
    }

    for (i in t.pixel_data) {
      if(pixels[i]){
        pixels[i].x = t.pixel_data[i].x;
        pixels[i].y = t.pixel_data[i].y;
        pixels[i].r = t.pixel_data[i].r;
        pixels[i].g = t.pixel_data[i].g;
        pixels[i].b = t.pixel_data[i].b;
        pixels[i].a = t.pixel_data[i].a;
        pixels[i].size = t.pixel_data[i].size;
      } 
    }
    
    animate(pixels);
  }
}

var def = new create_canvas('def','https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/morph1.png');
var statistics = new create_canvas('statistics','https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/morph2.png');
var security = new create_canvas('security','https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/morph3.png');
var notifications = new create_canvas('notifications','https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/morph4.png');
var users = new create_canvas('users','https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/morph5.png');

def.animate_to_image();

function get_image_data(obj, arr) {
  for (var x = 0; x < obj.canvas.width; x += accuracy) {
    for (var y = 0; y < obj.canvas.height; y += accuracy) {
      var pix = obj.getImageData(x, y, 1, 1).data;
      var r = pix[0];
      var g = pix[1];
      var b = pix[2];
      var a = pix[3]
      var pixel_data = {
        x: x ,
        y: y ,
        r: r,
        g: g,
        b: b,
        a:a,
        size:2
      }
     // console.log(pixel_data);
      if (pixel_data.r != 0 && pixel_data.g != 0 && pixel_data.b != 0) {
        arr.push(pixel_data);
      }
    }
  }
}

// Create pixel
var pixel = function() {
  this.from_x = ctx.canvas.width / 2;
  this.from_y = ctx.canvas.width / 2;
  this.from_r = Math.floor(Math.random() * 255);
  this.from_g = Math.floor(Math.random() * 255);
  this.from_b = Math.floor(Math.random() * 255);
  this.x = 0;
  this.y = 0;
  this.size = 4;
  this.r = Math.floor(Math.random() * 255);
  this.g = Math.floor(Math.random() * 255);
  this.b = Math.floor(Math.random() * 255);
  this.resetPixel = function(){
    this.x = ctx.canvas.width / 2;
    this.y = ctx.canvas.height / 2;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.size = 0;
  }
}

// Create pixel array
var pixels = [];
for(var i = 0; i < total; i++){
  pixels.push(new pixel()) 
}

// Animate pixels
function animate(obj) {
  if(obj){
    obj.sort(function() { return 0.5 - Math.random() });
    for (var i in obj) {
    TweenLite.fromTo(obj[i], 1.78, {
      r: obj[i].from_r,
      g: obj[i].from_g,
      b: obj[i].from_b,
      a: obj[i].from_a,
      x: obj[i].from_x,
      y: obj[i].from_y,
      //ease: Elastic.easeOut.config(1.2, 0.3)
    }, {
      x: obj[i].x,
      y: obj[i].y,
      r: obj[i].r,
      g: obj[i].g,
      a: obj[i].a,
      b: obj[i].b,
      ease: Elastic.easeOut.config(1.2, .35),
      onUpdate: drawImage,
      onUpdateParams: [obj[i], i],
      delay:.0002 * i
    });
  }
  }
  
}


// Draw
function drawImage(obj, index) {
  
  if (index == 0) {
    //ctx.clearRect(0, 0, 500, 500);
  }
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.size, 0, 2 * Math.PI, false);
  ctx.shadowColor = 'rgba(' + Math.floor(obj.r) + ',' + Math.floor(obj.g) + ',' + Math.floor(obj.b) + ',' + Math.floor(obj.a) + ')';
      //ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
  ctx.fillStyle = 'rgba(' + Math.floor(obj.r) + ',' + Math.floor(obj.g) + ',' + Math.floor(obj.b) + ',' + Math.floor(obj.a) + ')';
  ctx.lineWidth = 2;
  ctx.fill();
  obj.from_x = obj.x;
  obj.from_y = obj.y;
  obj.from_r = obj.r;
  obj.from_g = obj.g;
  obj.from_b = obj.b;
  obj.from_a = obj.a;
  
}


$('.bar_item').mouseenter(function() {
  ctx.clearRect(0, 0, 500, 500);
  var t = $(this).data('canvas');
  var c = $(this).data('color')
  eval(t).animate_to_image();
  TweenLite.to('.overlay', 1, {backgroundColor:c, opacity: 1, backgroundPosition: Math.random() * 600 + 100 + "px " + Math.random() * 600 + 100 + "px", ease:Power3.easeOut});
  TweenLite.fromTo('.buy',.14,{right:'-20px',opacity:1},{right:'-100px',opacity:0})
  setTimeout(function(){
    TweenLite.fromTo('.buy',.14,{right:'-100px',opacity:0},{right:'-20px',opacity:1})
  },140)
})

$('.bar_item').mouseout(function() {
 // def.animate_to_image();
})