document.querySelector('body').addEventListener('touchstart', function (ev) {
    event.preventDefault();
});

$(document).ready(function(){
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
    var ctx = canvas.getContext('2d');
    var ratio = getPixelRatio(ctx);

    var GameStatus = {
        Ready: 0,
        Playing: 1,
        End: 2
    }
    var Game = {
        imgServer:"",
        images:{
            xx:"/images/game/xx.png",
            ml:"/images/game/ml.png",
            xr:"/images/game/xr.png",
            ready_bg:"/images/game/yxsm.png",
            bg:"/images/game/bg.png",
            bg_top:"/images/game/bg_top.png",
            pointEl:"/images/game/point.png",
            timeEl:"/images/game/time.png",
            add:"/images/game/add.png",
            minus:"/images/game/minus.png",
            b1:"/images/game/b1.png",
            b2:"/images/game/b2.png",
            b3:"/images/game/b3.png",
            b4:"/images/game/b4.png",
            b5:"/images/game/b5.png",
            b6:"/images/game/b6.png",
            b7:"/images/game/b7.png",
            b8:"/images/game/w.png",
            b9:"/images/game/x1.png",
            b10:"/images/game/x2.png",
            b11:"/images/game/x3.png",
            b12:"/images/game/x4.png",
            b13:"/images/game/x5.png",
            b14:"/images/game/x6.png",
            b15:"/images/game/x7.png",
            b16:"/images/game/xh.png",
            b17:"/images/game/ld.png",

            n0:"/images/game/0.png",
            n1:"/images/game/1.png",
            n2:"/images/game/2.png",
            n3:"/images/game/3.png",
            n4:"/images/game/4.png",
            n5:"/images/game/5.png",
            n6:"/images/game/6.png",
            n7:"/images/game/7.png",
            n8:"/images/game/8.png",
            n9:"/images/game/9.png",

            zf:"/images/game/zjf.png",
            f1:"/images/game/jf-b.png",
            f2:"/images/game/jf-x.png",
            f3:"/images/game/jf-qt.png",

            ready1:"/images/game/ready1.png",
            ready2:"/images/game/ready2.png",
            ready3:"/images/game/ready3.png",
            readygo:"/images/game/go.png",

            box1_1:"/images/game/box1_1.png",
            // box1_2:"/images/game/box1_2.png",
            box1_3:"/images/game/box1_3.png",
            // box1_4:"/images/game/box1_4.png",
            box1_5:"/images/game/box1_5.png",
            // box1_6:"/images/game/box1_6.png",
            box1_7:"/images/game/box1_7.png",

            box2_1:"/images/game/box2_1.png",
            box2_2:"/images/game/box2_2.png",

            sc_bdqn:"/images/game/sc_bdqn.png",
            sc_bjdx:"/images/game/sc_bjdx.png",
            sc_fddx:"/images/game/sc_fddx.png",
            sc_hfdx:"/images/game/sc_hfdx.png",
            sc_hzkjdx:"/images/game/sc_hzkjdx.png",
            sc_jqdx:"/images/game/sc_jqdx.png",
            sc_no:"/images/game/sc_no.png",
            sc_qhdx:"/images/game/sc_qhdx.png",
            sc_sdlx:"/images/game/sc_sdlx.png",
            sc_whdx:"/images/game/sc_whdx.png",
            sc_xdf:"/images/game/sc_xdf.png",
            sc_yldx:"/images/game/sc_yldx.png",
            sc_jld:"/images/game/sc_jld.png",
            sc_ly:"/images/game/sc_ly.png",
            sc_mf:"/images/game/sc_mf.png",
            sc_rz:"/images/game/sc_rz.png",
            sc_sls:"/images/game/sc_sls.png",
            sc_xtc:"/images/game/sc_xtc.png",

            p0:"/images/game/p0.png",
            p1:"/images/game/p1.png",
            p2:"/images/game/p2.png",
            p3:"/images/game/p3.png",
            p4:"/images/game/p4.png",
            p5:"/images/game/p5.png",
            p6:"/images/game/p6.png",
            p7:"/images/game/p7.png",
            p8:"/images/game/p8.png",
            p9:"/images/game/p9.png",
            // pt:"/images/game/pt.png",

            add10:"/images/game/add10.png",
            add20:"/images/game/add20.png",
            add30:"/images/game/add30.png",
            add40:"/images/game/add40.png",
            add50:"/images/game/add50.png",
            minus10:"/images/game/minus10.png",
            minus20:"/images/game/minus20.png",
            minus30:"/images/game/minus30.png",
            minus40:"/images/game/minus40.png",
            minus50:"/images/game/minus50.png",
        },
        imgs:{},
        maxSpeed:10*ratio,
        topRatio:1,
        requestId:0,
        audio:false,
        y:0,
        time:1,
        totalTime: 1,
        timeX:500,
        timeY:20,
        timer: null,
        point: 0,
        pointX: 80,
        status: GameStatus.Ready,
        points:[],
        playerConfig: {
            x: (canvas.width - 100 * ratio) / 2,
            y: canvas.height - 100 * ratio,
            w: 74 * ratio,
            h: 110 * ratio,
            img: new Image()
        },
        boxConfig: {
            x: 0,
            y: 0,
            w: 50 * ratio,
            h: 50 * ratio,
            speed: 4 * ratio,
            box1: {
                img: undefined,
                type: 0,
                point: [10]
            },
            box2: {
                img: undefined,
                type: 1,
                point: [-10,-20,-30,-40,-50]
            }
        },
        school: {
            level0:[{id:"sc_sls", name:"嵩山少林寺"}, {id:"sc_jld", name:"加利顿大学"}, {id:"sc_ly", name:"农药开黑学院"}],
            level1:[{id:"sc_sdlx", name:"山东蓝翔"},{id:"sc_xdf", name:"新东方"},{id:"sc_bdqn",name:"北大青鸟"}, {id:"sc_mf", name:"霍格沃茨魔法学校"}, {id:"sc_rz", name:"木叶村忍者学校"}, {id:"sc_xtc", name:"X天才青少年学校"}],
            level2:[{id:"sc_fddx", name:"复旦大学"},{id:"sc_yldx", name:"耶鲁大学"},{id:"sc_whdx", name:"武汉大学"},{id:"sc_hzkjdx",name:"华中科技大学"}],
            level3:[{id:"sc_hfdx", name:"哈佛大学"},{id:"sc_jqdx", name:"剑桥大学"},{id:"sc_bjdx", name:"北京大学"},{id:"sc_qhdx", name:"清华大学"}],
        },
        schoolName: null
    }

    var Bird = function (param) {
        this.x = param.x || 0;
        this.y = param.y || 0;
        this.w = param.w;
        this.h = param.h;
        this.yDir = param.yDir || 1;
        this.img = param.img;

        return this;
    }

    Bird.prototype.draw = function () {
        if (this.img) {
            ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.w, this.h);
        }
        return this;
    };

    Bird.prototype.init = function () {
        this.y = canvas.height - this.h - 20;
        this.draw();
        return this;
    }

    Bird.prototype.take = function (box) {
        // 随机分数
        var point = 0;
        // if(Game.time >= 20){
        //     point = randArray([box.point[0], box.point[1]]);
        // }else {
        //     point = randArray(box.point);
        // }

        Game.point += 10;
        if (Game.point < 750) {

            // 显示加减分
            // var altPoint = new AlertPoint({
            //     x: box.x,
            //     y: box.y,
            //     w: 48 * ratio,
            //     h: 21 * ratio,
            //     exp: 1
            // });
            // eval("altPoint.img = box.type == 0 ? Game.imgs.add"+ point + " : Game.imgs.minus"+ Math.abs(point) + ";");
            // Game.points.push(altPoint);
            // altPoint.hide();

            // 将box放置最顶上
            // var firstY = -box.h;
            // for (var i = 0; i < pipe1.obj.length; i++) {
            //     temp = pipe1.obj[i];
            //     if (temp.y < firstY) {
            //         firstY = temp.y;
            //     }
            // }

            box.y = 0;
            pipe1.rand(box);
        } else {
            Game.point = 750;
            stop();
        }
    }

    var Box = function () {
        this.x = Game.boxConfig.x;
        this.y = Game.boxConfig.y;
        this.w = Game.boxConfig.w;
        this.h = Game.boxConfig.h;
        this.img = Game.boxConfig.box1.img;
        this.type = Game.boxConfig.box1.type;
        this.speed = Game.boxConfig.speed;
        this.visible = true;

        return this;
    };

    Box.prototype.draw = function () {
        ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.w, this.h);
        // var bg_top = Game.imgs.bg_top;
        // ctx.drawImage(bg_top, 0, 0, bg_top.width, bg_top.height, 0, 0, canvas.width, Game.y);
    };

    var pipe = function (maxNum) {
        this.x = 0;
        this.y = 0;
        var boxList = [];
        var boxW = Game.boxConfig.w,
            boxH = Game.boxConfig.h;
        var boxTmp = new Box();
        var _maxNum = maxNum || Math.ceil(canvas.width / boxW);

        for (var i = 1; i <= _maxNum; i++) {
            boxTmp = new Box();
            boxTmp.y = -(i * boxH * 2) + Game.y;
            boxList.push(this.rand(boxTmp));
        }

        this.obj = boxList;
        this.boxW = boxW;
        return this;
    };

    pipe.prototype.draw = function () {
        var box;
        for (var i = 0; i < this.obj.length; i++) {
            box = this.obj[i];
            if (box.visible) {
                box.draw();
            }
        }
        return this;
    };

    // 随机位置和类型
    pipe.prototype.rand = function (box) {
        if (Math.floor(Math.random() * 100) > 50) {
            var randomImg = randArray([1,2,16,3,4,16,5,6,16,7,17,16]);
            eval("var _img = Game.imgs.b"+randomImg);

        } else {
            var randomImg = randArray([8,9,16,10,11,16,12,13,16,14,15,16,17]);
            eval("var _img = Game.imgs.b"+randomImg);

            // box.type = Game.boxConfig.box2.type;
            // box.img = _img;
            // box.point = Game.boxConfig.box2.point;
            // if(box.img.width > 0 && box.img.height > 0){
            //     box.w = box.img.width / box.img.height * box.h;
            // }
            // console.log(box);
        }
        // console.log(randomImg);

        box.type = Game.boxConfig.box1.type;
        box.img = _img;
        box.point = Game.boxConfig.box1.point;
        if(box.img.width > 0 && box.img.height > 0){
            box.w = box.img.width / box.img.height * box.h;
        }

        w = canvas.width - box.w;
        var randX = Math.floor(Math.random() * w);
        box.x = randX;

        return box;
    };

    pipe.prototype.move = function () {
        for (var i = 0; i < this.obj.length; i++) {
            var box = this.obj[i];
            box.y += box.speed;
            if (box.y > canvas.height - box.h) {
                box.y = 0;
                this.obj[i] = this.rand(box);
            }
        }

        this.draw();
        return this;
    };

    pipe.prototype.changeSpeed = function () {
        var _speed = ratio;
        if(Game.time >= 20){
            _speed = 5 * ratio;
        }
        else if (Game.time >= 10){
            _speed = 7 * ratio;
        }
        else{
            _speed = 9 * ratio;
        }

        for (var i = 0; i < this.obj.length; i++) {
            this.obj[i].speed = _speed;
            // if (Game.maxSpeed > this.obj[i].speed) {
            //     this.obj[i].speed += ratio;
            // }
        }
    }

    var AlertPoint = function(param){
        this.x = param.x;
        this.y = param.y;
        this.w = param.w;
        this.h = param.h;
        this.img = param.img;
        this.exp = param.exp;
        this.timer = null;

        return this;
    }

    AlertPoint.prototype.draw = function(){
        if(this.exp > 0){
            ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.w, this.h);
        }
    }

    AlertPoint.prototype.hide = function(){
        this.timer = window.setInterval(function(){
            if(this.exp > 0){
                this.exp--;
            }else{
                if(this.timer) {
                    clearInterval(this.timer);
                }
            }
        }.bind(this), 1000);
    }

    /**********************************************************************/
    var bird, pipe1;

    // 碰撞函数
    function collision(player, pipe) {
        var birdx = player.x,
            birdy = player.y + (player.h / 2),
            birdw = player.w,
            birdh = player.h / 2;
        var boxes = pipe.obj;
        var box;
        for (var i = 0; i < boxes.length; i++) {
            box = boxes[i];
            var collUp = calculate(birdx, birdy, birdw, birdh, box.x, 0, box.w, box.y + box.h);
            if (collUp) {
                player.take(box);
            }
        }
    }

    function render() {
        if (Game.status === GameStatus.Playing) {
            gameDraw();

            // 检测碰撞
            collision(bird, pipe1);
            Game.requestId = window.requestAnimationFrame(render);
            //console.log(requestId);
        }
    }

    function gameDraw() {
        var canvasH = canvas.height - Game.y;
        var bg = Game.imgs.bg;
        var size = cover(canvas.width, canvasH, bg.width, bg.height);

        // 绘制背景图
        ctx.drawImage(bg, size.x, 0, size.w, size.h, 0, Game.y, canvas.width, canvasH);
        bird.init();
        pipe1.move();
        for(var i = 0; i< Game.points.length; i++) {
            var temp = Game.points[i];
            temp.draw();
        }

        // 绘制左上角分数
        var timeW = 41 * ratio, timeH = 38 * ratio, pointW = 54 * ratio, pointH = 20 * ratio;
        // var timeEl = Game.imgs.timeEl;
        // var pointEl = Game.imgs.pointEl;

        var zjf = Game.imgs.zf;
        var jf1 = Game.imgs.f1;
        var jf2 = Game.imgs.f2;
        var jf3 = Game.imgs.f3;

        var h =  45*ratio;
        var h1 = 20*ratio;
        var h2 = 15*ratio;
        var h3 = 13*ratio;

        ctx.drawImage(jf1, 0, 0, jf1.width, jf1.height, 20 / Game.topRatio, (80 - (pointH / Game.topRatio)) / 2, pointW / Game.topRatio, h1 / Game.topRatio);
        ctx.drawImage(jf2, 0, 0, jf2.width, jf2.height, 20 / Game.topRatio, (200 - (pointH / Game.topRatio)) / 2, pointW / Game.topRatio, h2 / Game.topRatio);
        ctx.drawImage(jf3, 0, 0, jf3.width, jf3.height, 20 / Game.topRatio, (320 - (pointH / Game.topRatio)) / 2, pointW / Game.topRatio, h3 / Game.topRatio);
        ctx.drawImage(zjf, 0, 0, zjf.width, zjf.height, 5, (400 - (pointH / Game.topRatio)) / 2, (pointW + 70) / Game.topRatio, h / Game.topRatio);


        createNumber(1, Game.point, 55, true);
        //绘制时间
        createNumber(2, Game.time, canvas.width - 100);
        // createNumber(2, Game.time, (Game.timeX+timeW) / Game.topRatio+ (30*ratio));
        // 重置宽度
        if(bird.img.width > 0 && bird.img.height > 0) {
            bird.w = bird.img.width / bird.img.height * bird.h;
        }
    }

    // 绑定鼠标事件
    canvas.ontouchmove = function (event) {
        if (Game.status === GameStatus.Playing) {
            var touch = event.targetTouches[0];
            var x = touch.pageX * ratio - (bird.w / 2);

            if (x + bird.w > canvas.width) {
                x = canvas.width - bird.w;
            }
            else if (x < 0){
                x = 0;
            }

            bird.x = x;
            bird.draw();
        }
    }

    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return "ml"; //返回参数值
    }
    function ready() {
        var ready = 1, countSeconds = 3;
        var role = getUrlParam("role");
        eval("var player = Game.imgs." + role);
        Game.playerConfig.img = player;
        // start();
        var ready_bg = Game.imgs.ready_bg;

        var readyInterval = setInterval(function () {
            var img = ready;
            if(ready == 0){
                img = "go"
            }
            if (ready < 0) {
                start();
                clearInterval(readyInterval);
                return;
            }

            var size = cover(canvas.width, canvas.height, ready_bg.width, ready_bg.height);
            ctx.drawImage(ready_bg, size.x, size.y, size.w, size.h, 0, 0, canvas.width, canvas.height);

            eval("var temp = Game.imgs.ready" + img);
            var h = 78 * ratio;
            var w = temp.width / temp.height * h;
            var x = (canvas.width - w) / 2;
            var y = (canvas.height - h) / 2;
            ctx.drawImage(temp, 0, 0, temp.width, temp.height, x, y, w, h);
            music.style.display = 'block';
            ready--;
        }, 1000);
    }

    function start() {
        bird = new Bird(Game.playerConfig);
        pipe1 = new pipe(5);

        // var bg_top = Game.imgs.bg_top;
        // 计算图片和画布比例
        // Game.topRatio = bg_top.width / canvas.width;
        // Game.y = bg_top.height / bg_top.width * canvas.width;

        if(Game.audio) {
            audio_bg.currentTime = 0;
            audio_bg.play();
        }
        Game.status = GameStatus.Playing;
        Game.requestId = window.requestAnimationFrame(render);
        Game.time = Game.totalTime;
        Game.timer = setInterval(function () {
            Game.time--;
            // pipe1.changeSpeed();

            if (Game.time <= 0) {
                stop();
            }
        }, 1000)
        // console.log(requestId);
    }

    function stop() {
        if(Game.status != GameStatus.End) {
            Game.status = GameStatus.End;
            gameDraw();
            if (Game.requestId) {
                window.cancelAnimationFrame(Game.requestId);
            }
            createEndPage(Game.point);
            if (Game.timer) {
                clearInterval(Game.timer);
            }
            audio_bg.pause();
            // music.style.display = 'none';
            game_end_bg.style.display = "block";
            game_end.style.display = "block";

            Game.points = [];

            var param = "unknow";
            if(browser.isQQ()){
                param = "qq"
            }else if(browser.isWeiXin()){
                param = "weixin"
            }
            $.get("/game/user_num?browser="+param);
        }
    }

    function createEndPage(point) {
        var imgTxtEnd = document.getElementById("txt_end");
        imgTxtEnd.src = Game.imgServer + "/images/game/txt_end.png";
        var endPoint = document.getElementById("end_point");
        endPoint.innerHTML = '';
        var imgTxtLottery = document.getElementById("txt_lottery");
        imgTxtLottery.src = Game.imgServer + "/images/game/txt_lottery.png";
        var endLottery = document.getElementById("end_lottery");
        endLottery.innerHTML = '';
        var lottery = document.getElementById("lottery");
        lottery.src = Game.imgServer + "/images/game/lottery.png";

        // var school;
        // if (point >= 650) {
        //     school = randArray(Game.school.level3);
        // }
        // else if (point >= 450) {
        //     school = randArray(Game.school.level2);
        // }
        // else if (point >= 100) {
        //     school = randArray(Game.school.level1);
        // }
        // else {
        //     school = randArray(Game.school.level0);
        // }
        //
        // var imgSC = document.getElementById("sc");
        // eval("imgSC.src =  Game.images."+school.id+";");
        // Game.schoolName = school.name;

        btn_end.style.display = "inline";

        var points = point.toString().split('');
        for (var i = 0; i < points.length; i++) {
            var _img = document.createElement('img');
            _img.src = Game.imgServer + "/images/game/p" + points[i] + ".png";
            endPoint.appendChild(_img);
        }
        var _img = document.createElement('img');
        _img.src = Game.imgServer + "/images/game/pt.png";
        endPoint.appendChild(_img);
    }

    function restart() {
        Game.point = 0;

        for(var i = 0; i< pipe1.obj.length; i++) {
            temp = pipe1.obj[i];
            temp.y = -(i * temp.h * 2 + temp.h);
            temp.speed = Game.boxConfig.speed;
        }

        game_end_bg.style.display = "none";
        game_end.style.display = "none";
        ready();
        // start();
    }

    function createNumber(type, point, x, showAdd){
        var points = []
        if(point > 0 && showAdd){
            points = ("+" + point).split('');
        }else {
            points = point.toString().split('');
        }

        for(var i = 0; i < points.length; i++){
            var tmp;
            var h = 30*ratio;
            var y = (200 - h) / 2;
            // if(points[i] === "-" ){
            //     tmp = Game.imgs.minus;
            // }
            // else if(points[i] === "+"){
            //     tmp = Game.imgs.add;
            // }
            // else if(points[i] === "s"){
            //     tmp = Game.imgs.s;
            // }
            if (points[i] !== "-" && points[i] !== "+" && points[i] !== "s") {
                if (type && type === 1) {
                    eval("tmp = Game.imgs.n" + points[i]);
                    y = 260;
                } else {
                    eval("tmp = Game.imgs.p" + points[i]);
                }
                var w = tmp.width / tmp.height * h;
                ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, x, y, w, h);
                x += w-30;
            }
        }
    }

    function loading() {
        Game.imgs = GameLoader.loadImages(ctx, ratio, Game.images, ready);
        // Game.imgs = GameLoader.loadImages(ctx, ratio, Game.images, start)
    }

    btn_restart.ontouchstart = restart;
    play_audio.ontouchstart = function(){
        Game.audio = !Game.audio;
        console.log("play_audio: ",this);
        if(Game.audio) {
            this.className = "voice rotate-start";
            audio_bg.play();
        }else{
            this.className = "voice voice-stop";
            audio_bg.pause();
            audio_bg.currentTime = 0;
        }
    }
    btn_end.ontouchstart = function(){
        // page.action = "/upload_pic.htm?school="+Game.schoolName;
        // page.submit();
        //window.location.href ="/upload_pic.htm?school="+Game.schoolName;
    }

    loading();
});