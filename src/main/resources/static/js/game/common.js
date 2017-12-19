// 获取屏幕倍数
var getPixelRatio = function(context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};

// 计算碰撞函数，默认矩形碰撞
function calculate (x1, y1, w1, h1, x2, y2, w2, h2) {
	var ax = x1 + w1 / 2,
		ay = y1 + h1 / 2,
		bx = x2 + w2 / 2,
		by = y2 + h2 / 2;
	var collX = false, collY = false;

	(Math.abs(bx - ax) < (w1 + w2) / 2) && (collX = true);
	(Math.abs(by - ay) < (h1 + h2) / 2) && (collY = true);

	return collX && collY;
}

// 预加载图片
function preLoadImgs(urls) {
	for(var i = 0; i < urls.length; i++) {
        var img = new Image();
        img.src = urls[i];
    }
}

// 从数组中随机取一个对象
function randArray(arr) {
	var num = arr.length;
	var index = Math.floor(Math.random() * num);

	return arr[index];
}

// 绘制红色方框，用于调试
function redBox(ctx, x, y, w, h) {
    ctx.strokeStyle="#f00";
    ctx.lineWidth=3;
    ctx.strokeRect(x, y, w, h);
}

// cover
function cover(w, h, w1, h1) {
	var rw = 0, rh = 0;
    var tw = w / w1;
    var th = h / h1;
    if (tw < th) {
    	rh = h1;
    	rw = w / h * h1;
    }else {
    	rh = w1 * h / w;
    	rw = w1;
    }
    rx = (w1 - rw) / 2;
    ry = (h1 - rh) / 2;

    return { x: rx, y: ry, w : rw, h: rh};
}


var GameLoader = function(){
    var loadedImages = 0;
    var numImages = 0;
    var imgLoading = new Image();
    var error = "";

    /*star
     *loading模块
     *实现图片的预加载，并显示进度条
     *参数：图片数组对象，加载完成的回调函数
     */
    this.loadImages = function(ctx, ratio, sources,callback) {
        var images = [];
        ctx.font = '14px bold';
        ctx.lineWidth = 84;
        imgLoading.src = "/images/game/loading.png";
        // get num of sources
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            images[src] = new Image();
            //把sources中的图片信息导入images数组
            images[src].src = sources[src];
            if (images[src].complete) {
                loadedImages++;
                drawLoading(ctx, ratio, callback);
                continue;
            }
            //当一张图片加载完成时执行
            images[src].onload = function () {
                loadedImages++;
                drawLoading(ctx, ratio, callback);
            };
            // 加载失败后重新加载
            images[src].onerror = function () {
                if (!images[src].errorTime) {
                    images[src].errorTime = 0;
                }
                error = "图片" + src + "加载失败，重试" + (++images[src].errorTime) + "次";
                images[src].src = sources[src] + "?r=" + Math.random();
            }
        }
        return images;
    }

    function drawLoading(ctx, ratio, callback){
        var centerX = canvas.width / 2 / ratio;
        var centerY = canvas.height / 2 / ratio;
        //重绘一个进度条
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText('加载进度:' + Math.floor(loadedImages / numImages * 100) + "% "+error, centerX, centerY);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.save();


        var lineX = centerX - 100, lineY = centerY - 30;
        var lineW = 200, lineH = 30;
        ctx.strokeStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(lineX, lineY);
        ctx.lineTo(lineX + lineW, lineY);
        ctx.lineWidth = lineH + (4 * ratio);
        ctx.stroke();
        ctx.strokeStyle = '#ffd742';
        ctx.beginPath();
        ctx.moveTo(lineX, lineY);
        ctx.lineTo(lineX + lineW, lineY);
        ctx.lineWidth = lineH;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(lineX, lineY);
        ctx.lineTo(loadedImages / numImages * lineW + lineX, lineY);
        ctx.lineWidth = lineH;
        ctx.strokeStyle = '#fff';
        ctx.lineCap = 'round';
        ctx.stroke();

        var imgSize = 31;
        ctx.drawImage(imgLoading,0,0, imgLoading.width, imgLoading.height, (loadedImages / numImages * lineW + lineX - imgSize / 2) * ratio, (lineY - imgSize / 2)*ratio, imgSize * ratio, imgSize * ratio);

        //当所有图片加载完成时，执行回调函数callback
        if (loadedImages >= numImages) {
            callback();
        }
    }

    return this;
}();
