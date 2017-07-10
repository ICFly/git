/**
 *
 * 图片压缩工具（通过分减小分辨率进行压缩）
 *
 * Copyright(c) 2016 Taoeer
 * Email: 719012229@qq.com
 * Github: github.com/taoeer
 *
 * options.img 图片,可以供canvas写入的元素
 * options.imgWidth
 * options.imgHeight
 * options.maxSize 最大高宽
 * options.quality 输出质量
 *
 */

function Impress(options) {
	let defaultSettings = {
		maxSize: 100,
		quality: 1
	};

	let settings = Object.assign({}, defaultSettings, options);

	Object.keys(settings).map((x) => {

		console.log(this);
		this[x] = settings[x];

	});

	// console.log(this)
}





Impress.prototype.run = function () {
	if (this.imgWidth <= this.maxSize && this.imgHeight <= this.maxSize) {
		return this.img.src;
	}

	let canvas = document.createElement('canvas');

	if (this.imgWidth > this.imgHeight) {
		canvas.width = this.maxSize;
		canvas.height = (this.maxSize*this.imgHeight)/this.imgWidth;
	} else {
		canvas.height = this.maxSize;
		canvas.width = (this.maxSize*this.imgWidth)/this.imgHeight;
	}

	let ctx = canvas.getContext('2d');
	ctx.fillStyle = "#fff";
  	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(this.img,0,0,canvas.width,canvas.height);
	return canvas.toDataURL('image/jpeg', this.quality);
}

export default Impress





//裁剪图片

// var img = new Image();
// img.src = require('../../assets/imgs/xhjy/banner_img1.jpg');

// setTimeout(function(){
// 	let canvas = document.createElement('canvas');
// 	let ctx = canvas.getContext('2d');
// 	ctx.fillStyle = "#fff";
// 	// ctx.fillRect(100, 100, 3000, 3000);
// 	ctx.drawImage(img,0,0,300,150);
// 	console.log(canvas.toDataURL('image/jpeg', 1));

// 	document.getElementById("img").setAttribute("src",canvas.toDataURL('image/jpeg', 1))
// },1000)
