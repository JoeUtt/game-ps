
//获取该用户被录取的学校
var school;
var Orientation = null;
if(GetQueryString("school")){
    school = GetQueryString("school");
}
$('.upload-main').height($(document).height());
var imgWidthup = parseInt($(window).width() * 0.21);
var imgHeightup = parseInt(imgWidthup);
var uploadWidth = $(window).width()*0.54;
var uploadHeight = $(window).width()*0.64;
var creatPicHeight = $(window).width()*0.5;
$('.view').height(uploadHeight);
var photoPic;
var file_num=0;
localStorage.removeItem("photoPic");
var startX = 0,startY = 0,moveX = 0,moveY = 0,endX = 0,endY = 0,momentX = 0,momentY = 0;
var drawImage;
//设置画布的宽高
var canvasW = $(window).width()*0.54,
    canvasH = $(window).width()*0.64;
var forbidX,forbidY;
var sourceImgW,sourceImgH;
var ratio;
//选择本地图片并预览
(function($){
    $.fn.extend({
        aiiUpload:function(obj)
        {
            if(typeof obj !="object")
            {
                alert('参数错误');
                return;
            }
            var imageWidth,imageHeight;
            var base64;
            var fileInput=$(this);
            var fileInputId=fileInput.attr('id');
            createDoc('#'+fileInputId,obj.method,obj.action);
            $('#aii_file').change(function(){
                /*修复ios拍照,照片旋转的bug*/
                //获取照片方向角属性，用户旋转控制
                var canvas=document.getElementById('canvas');
                EXIF.getData(this.files[0], function() {
                    // alert(EXIF.pretty(this));
                    // alert(EXIF.getTag(this, 'Orientation'));
                    Orientation = EXIF.getTag(this, 'Orientation');
                    if(Orientation == 6){
                        //alert('需要顺时针（向左）90度旋转');
                        //rotateImg(this,'right',canvas);
                    }
                });
                 //alert(Orientation);
                if(test(this.value)==false){
                    layer.msg('请选择图片文件!', {icon: 7});
                    return;
                }
                $('#upload').css({"zIndex":99});
                $('.bottom-btn,.user-name').addClass("yx-none");
                $('.creat-pic-btn').removeClass("yx-none");
                moveX = 0;
                moveY = 0;
                var objUrl = getObjectURL(this.files[0]);
                if (objUrl){
                    $('.upload-btn').addClass("no-pic");
                    $('.uploadic').addClass("again-upload");
                    $('#canvas').addClass("canvas-pos");
                    imgBefore(objUrl,file_num);
                    render(objUrl,obj.max_h,obj.max_w,file_num);
                    file_num++;
                }

            });
        }
    });
    function createDoc(objID,form_method,form_action)
    {
        var element=$(objID);
        element.append('<div class="viewList"></div>').append('<div class="upload-pic" style="height: '+uploadHeight+'px"><div class="fitinput-file uploadic"><input type="file" id="aii_file" accept="image/*" /></div><div class="file_bg"></div></div>').append('<div id="aii_upload_form"></div>').append('<canvas id="canvas"></canvas>');
    }
    function test(value)
    {
        var regexp=new RegExp("(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$",'g');
        return regexp.test(value);
    }
    function render(src,MaximgW,MaximgH,idnum)
    {
        var image=new Image();
        image.onload=function()
        {
            var canvas=document.getElementById('canvas');
            if(image.width>image.height)
            {
                imageWidth=MaximgW;
                imageHeight=MaximgH*(image.height/image.width);
            }
            else if(image.width<image.height)
            {
                imageHeight=MaximgH;
                imageWidth=MaximgW*(image.width/image.height);
            }
            else
            {
                imageWidth=MaximgW;
                imageHeight=MaximgH;
            }
            drawImage = image;
            //在canvas上绘制上传的图片
            drawingImage(drawImage);
        }
        image.src=src;
    };
    //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
    //预览
    function imgBefore(objUrl,idnum)
    {
        var addElement='<div class="view" style="height: '+uploadHeight+'px"><img src="'+objUrl+'" id="aiiImg_'+idnum+'" idnum="'+idnum+'" class="waitpic" style="width:'+uploadWidth+'px;height:'+uploadHeight+'px" /></div>'
        $('.viewList').html(addElement);
        var img=$('#aiiImg_'+idnum);
        //预览图片居中 填满 代码

        img.load(function(){
            var imgw=img.width(),
                imgh=img.height();
            if(imgw>imgh)
            {
                img.css('height','100%');
                img.css('width','auto');
                img.css('marginLeft',-(img.width()-img.height())/2+'px');
            }
            else if(imgw<imgh)
            {
                img.css('width','100%');
                img.css('height','auto');
                img.css('marginTop',-(img.height()-img.width())/2+'px');
            }
        });
    }
    $('.view').height(uploadHeight);
})(jQuery);
function img_remove(element)
{
    var num=$(element).prev().attr('idnum');
    $(element).parent().remove();
    $('#f_'+num).remove();
    console.log('asdf');
}

$('#box').aiiUpload({
    method:'POST',
    action:'',
    max_h:600,
    max_w:600,
    subText:'上传图片',
    fileText:'选择图片'
});

//获取所有待上传的图片
filefrom = '';
$('.viewList img').each(function(i){
    filefrom += this.src+";";
});

//
function add_doc (base) {
    $('#aii_upload_form').html('<input type="hidden" name="img[]"  value="'+base+'"/>');
}


//图片截取
function cutImg() {
    var userPic = $('#aii_upload_form input').val();
    if(userPic){
        if(userPic[0] == ','){
            userPic = userPic.substring(1,userPic.Length);
            $('.creat-pic-btn').addClass("yx-none");
            $('.bottom-btn,.user-name').removeClass("yx-none");
            $('#canvas').removeClass("canvas-pos");
            $('#upload').css({"zIndex":-1});
            $('.viewList .view img').attr("src","data:image/jpg;base64,"+userPic);
            var img=$('.viewList .view img');
            $('.view').addClass('view-bg');
            $('.view').height('auto');
            photoPic = userPic;
            //预览图片居中 填满 代码
            img.load(function(){
                var imgw=img.width(),
                    imgh=img.height();
                console.log(imgw);
                console.log(imgh);

                if(imgw>imgh)
                {
                    img.css('height','100%');
                    img.css('width','auto');
                    img.css('marginLeft',-(img.width()-img.height())/2+'px');
                }
                else if(imgw<imgh)
                {
                    img.css('width','76%');
                    img.css('height','auto');
                    img.css({'marginTop':(img.height()-img.width())*1.5+'px','marginLeft':12+'%'});
                }
                else if(imgw==imgh)
                {
                    img.css('width','80%');
                    img.css('height','auto');
                    img.css({'marginTop':-(img.height()-img.width())/2+'px','marginLeft':10+'%'});
                }
            });
        }
    }else{
        layer.msg('请先添加照片!', {icon: 2});
    }
}

//上传用户选择的照片制作用户头像
function uploadPic() {
    var userPic = $('#aii_upload_form input').val();
    if(userPic){
        if(userPic[0] == ','){
            userPic = userPic.substring(1,userPic.Length);
        }
        layer.open({
            type: 1,
            title: false,
            closeBtn: false,
            area:'50%',               //宽度
            skin: 'layui-layer-nobg', //没有背景色
            content: $('.uploading'),
            offset:'auto',            //居中
            shade: [0.7, '#000'],     //遮罩层
            shift:0,                  //弹出方式
            shadeClose:false,          //点击遮罩层关闭
            scrollbar:false,
            success: function(){                    //弹出成功执行
                document.ontouchmove=function(){
                    return false;
                }
            },
            end:function(){                         //关闭时执行
                document.ontouchmove=function(){
                    return true;
                }
            }
        });
        $.ajax({
            type: 'POST',
            url: '/face/upload',
            dataType: 'json',
            data:{
                photo: userPic
            },
            success: function(data){
                layer.closeAll();
                if(data.code == 0){
                    $('.creat-pic-btn').addClass("yx-none");
                    $('.bottom-btn,.user-name').removeClass("yx-none");
                    $('#canvas').removeClass("canvas-pos");
                    $('.uploadic').addClass("yx-none");
                    $('.viewList .view img').attr("src","data:image/jpg;base64,"+data.data);
                    var img=$('.viewList .view img');
                    $('.view').addClass('view-bg');
                    $('.view').height('auto');
                    photoPic = data.data;
                    //预览图片居中 填满 代码
                    img.load(function(){
                        var imgw=img.width(),
                            imgh=img.height();
                        console.log(imgw);
                        console.log(imgh);

                        if(imgw>imgh)
                        {
                            img.css('height','100%');
                            img.css('width','auto');
                            img.css('marginLeft',-(img.width()-img.height())/2+'px');
                        }
                        else if(imgw<imgh)
                        {
                            img.css('width','76%');
                            img.css('height','auto');
                            img.css({'marginTop':(img.height()-img.width())*1.5+'px','marginLeft':12+'%'});
                        }
                        else if(imgw==imgh)
                        {
                            img.css('width','80%');
                            img.css('height','auto');
                            img.css({'marginTop':-(img.height()-img.width())/2+'px','marginLeft':10+'%'});
                        }
                    });
                }else if(data.code == -1){
                    layer.alert(data.error_description, {
                        skin: 'layui-layer-lan'
                        ,closeBtn: 0
                        ,anim: 4 //动画类型
                    });
                }
            },
            error: function(xhr, type){
                layer.closeAll();
                //layer.close(loadpic);
                layer.alert('提交失败！', {
                    skin: 'layui-layer-lan'
                    ,closeBtn: 0
                    ,anim: 4 //动画类型
                });

            }
        });
    }else{
        layer.msg('请先添加照片!', {icon: 2});
    }
}
//上传用户头像,用户选择的照片模板id,用户的昵称,学校姓名,证件照id,制作录取通知书
function uploadProfile() {
    var userName = $('.user-name input').val();
    var param = {};
    if(userName){
        var tempStr = "abcdefg子";
        var pattern_char = /[a-zA-Z]/g;
        var pattern_chin = /[\u4e00-\u9fa5]/g;
        var count_char = 0,count_chin = 0;
        if(userName.match(pattern_char)){
            count_char = Math.ceil(userName.match(pattern_char).length/2);
        }
        if(userName.match(pattern_chin)){
            count_chin = userName.match(pattern_chin).length;
        }
        var countNum = count_char + count_chin;
        if(countNum <= 5){
            param = {
                photo: photoPic,
                name: userName,
                school: school
            }
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area:'50%',               //宽度
                skin: 'layui-layer-nobg', //没有背景色
                content: $('.uploading'),
                offset:'auto',            //居中
                shade: [0.7, '#000'],     //遮罩层
                shift:0,                  //弹出方式
                shadeClose:false,          //点击遮罩层关闭
                scrollbar:false,
                success: function(){                    //弹出成功执行
                    document.ontouchmove=function(){
                        return false;
                    }
                },
                end:function(){                         //关闭时执行
                    document.ontouchmove=function(){
                        return true;
                    }
                }
            });
            $.ajax({
                type: 'POST',
                url: '/face/generate',
                dataType: 'json',
                contentType: 'application/json',
                data:JSON.stringify(param),
                success: function(data){
                    layer.closeAll();
                    localStorage.setItem("photoPic",data.data);
                    $("#page").submit();
                },
                error: function(xhr, type){
                    layer.closeAll();
                    layer.alert('提交失败！', {
                        skin: 'layui-layer-lan'
                        ,closeBtn: 0
                        ,anim: 4 //动画类型
                    });

                }
            });
        }else{
            layer.msg('姓名不超过5个字!', {icon: 2});
        }
    }else{
        layer.msg('请输入您的姓名!', {icon: 2});
    }
}


//对图片旋转处理
function rotateImg(img, direction,canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    var min_step = 0;
    var max_step = 3;
    //var img = document.getElementById(pid);
    if (img == null)return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    var height = img.height;
    var width = img.width;
    //var step = img.getAttribute('step');
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //img.setAttribute('step', step);
    /*var canvas = document.getElementById('pic_' + pid);
     if (canvas == null) {
     img.style.display = 'none';
     canvas = document.createElement('canvas');
     canvas.setAttribute('id', 'pic_' + pid);
     img.parentNode.appendChild(canvas);
     }  */
    //旋转角度以弧度值为参数
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    alert('step'+step);
    alert('step'+step);
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}

//限制输入字数
function chkmaxsms() {
    var str = event.target.value;
    var strlen = str.length;
    if(strlen>10)   {
        layer.msg('姓名不超过5个字!', {icon: 2});
        event.target.value = event.target.value.substr(0,5);
    }
}

//canvas绘制图片
function drawingImage(drawImage) {
    var canvasColumu = canvasW/canvasH, sourceColumu = drawImage.width/drawImage.height;
    var canvas=document.getElementById('canvas');
    if(Orientation == 6){
        //上下滑动
        if(1/sourceColumu < canvasColumu){
            sourceImgW = drawImage.height;
            sourceImgH = sourceImgW * canvasH / canvasW;
            forbidX = true;
            forbidY = false;
            moveX = 0;
        }
        //左右滑动
        else if(1/sourceColumu >= canvasColumu){
            sourceImgH = drawImage.width;
            sourceImgW = canvasW*drawImage.height / canvasH;
            forbidY = true;
            forbidX = false;
            moveY = 0;
        }
        canvas.width=canvasW;
        canvas.height=canvasH;
        var con=canvas.getContext('2d');
        ratio = getPixelRatio(con);
        con.clearRect(0,0,canvas.width,canvas.height);
        con.translate(canvasW / 2,canvasH /2);//将画布原点移动到画布的中心点
        con.rotate(90*Math.PI/180);
        var x = canvas.width/2; //画布宽度的一半
        var y = canvas.height/2;//画布高度的一半
        con.translate(- canvasH/2,-canvasW/2);//将画布原点移动左上角原点
        con.drawImage(drawImage,moveY,moveX,sourceImgH,sourceImgW,0,0,canvasH*ratio,canvasW*ratio);
    }else{
        if(sourceColumu < canvasColumu){
            sourceImgW = drawImage.width;
            sourceImgH = drawImage.width * canvasH / canvasW;
            forbidX = true;
            forbidY = false;
            moveX = 0;
        }else if(sourceColumu >= canvasColumu){
            sourceImgH = drawImage.height;
            sourceImgW = drawImage.height * canvasW / canvasH;
            forbidY = true;
            forbidX = false;
            moveY = 0;
        }
        canvas.width=canvasW;
        canvas.height=canvasH;
        var con=canvas.getContext('2d');
        ratio = getPixelRatio(con);
        con.clearRect(0,0,canvas.width,canvas.height);
        // con.drawImage(image,0,0,imageWidth,imageHeight);
        //console.log(moveX,moveY);
        con.drawImage(drawImage,moveX,moveY,sourceImgW,sourceImgH,0,0,canvasW*ratio,canvasH*ratio);
    }
    base64=canvas.toDataURL('image/jpeg',0.5).substr(22);
    add_doc(base64);
}

//触摸事件
function load (){
    //绑定触摸事件
    var touchDom=document.getElementById('upload');
    touchDom.addEventListener('touchstart',touch, false);
    touchDom.addEventListener('touchmove',touch, false);
    touchDom.addEventListener('touchend',touch, false);

    function touch (event){
        var event = event || window.event;

        var oInp = document.getElementById("inp");
        switch(event.type){
            case "touchstart":
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
                //oInp.innerHTML = "Touch started (" + moveX + "," +moveY + ")";
                drawingImage(drawImage);
                break;
            case "touchend":
                // startX = event.changedTouches[0].clientX;
                // startY = event.changedTouches[0].clientY;
                // endX = event.changedTouches[0].clientX;
                // endY = event.changedTouches[0].clientY;
                // moveX = endX - startX;
                // moveY = endY - startY;
                //  console.log(moveX,moveY);
                // oInp.innerHTML = "<br/>Touch end (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
                // drawingImage(drawImage);
                break;
            case "touchmove":
                event.preventDefault();
                endX = event.touches[0].clientX;
                endY = event.touches[0].clientY;
                momentX = startX - endX;
                momentY = startY - endY;
                //横轴禁止滚动
                if(forbidX){
                    moveY += momentY;
                    if(moveY <= 0){
                        moveY = 0;
                    }
                    if(Orientation == 6){
                        if(moveY + sourceImgH > drawImage.width){
                            moveY = drawImage.width - sourceImgH;
                        }
                    }else{
                        if( moveY + sourceImgH > drawImage.height){
                            moveY = drawImage.height - sourceImgH;
                        }
                    }
                }
                //纵轴禁止滚动
                else if(forbidY){
                    moveX += momentX;
                    if(moveX <= 0){
                        moveX = 0;
                    }
                    if(Orientation == 6){
                        if(moveX + sourceImgW > drawImage.height){
                            moveX = drawImage.height - sourceImgW;
                        }
                    }else{
                        if( moveX + sourceImgW > drawImage.width){
                            moveX = drawImage.width - sourceImgW;
                        }
                    }
                }
                //oInp.innerHTML = "<br/>Touch moved (" + moveX + "," + moveY + ")";
                drawingImage(drawImage);
                break;
        }

    }
}
window.addEventListener('load',load, false);
