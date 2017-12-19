//package org.rambler.games.ps.controller;
//
//import com.google.gson.Gson;
//import com.megvii.cloud.http.CommonOperate;
//import com.megvii.cloud.http.Response;
//import com.qiniu.storage.UploadManager;
//import com.qiniu.storage.model.DefaultPutRet;
//import com.qiniu.util.Auth;
//import org.rambler.games.ps.config.FacePlusPlusProperties;
//import org.rambler.games.ps.config.QiNiuProperties;
//import org.rambler.games.ps.dao.GamePsNumberMapper;
//import org.rambler.games.ps.util.ImageUtils;
//import org.rambler.games.ps.vendor.vo.DetectResponse;
//import org.rambler.games.ps.vendor.vo.RectangleVO;
//import org.rambler.games.ps.vo.GenerateCertificateRequest;
//import org.rambler.infrastructure.ResponseResult;
//import org.rambler.infrastructure.util.Base64Utils;
//import org.rambler.infrastructure.util.BeanUtils;
//import org.rambler.infrastructure.util.IdGenerator;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import javax.annotation.Resource;
//import javax.crypto.Mac;
//import javax.imageio.ImageIO;
//import java.awt.*;
//import java.awt.image.BufferedImage;
//import java.io.*;
//import java.net.MalformedURLException;
//import java.net.URL;
//import java.net.URLConnection;
//
///**
// * @author chenliang on 2017/6/7.
// */
//@RestController
//@RequestMapping("face")
//public class FaceController {
//
//    private static final Logger logger = LoggerFactory.getLogger(FaceController.class);
//
//
//    @Resource
//    Gson gson;
//
//    @Resource
//    CommonOperate commonOperate;
//
//    @Autowired
//    private GamePsNumberMapper gamePsNumberMapper;
//
//    @Resource
//    QiNiuProperties qiNiuProperties;
//
//    @Resource
//    UploadManager uploadManager;
//
//
//    @Resource
//    Auth auth;
//
//    private byte[] httpDownload(String httpUrl){
//
//        URL url = null;
//        try {
//            url = new URL(httpUrl);
//        } catch (MalformedURLException e1) {
//            // TODO Auto-generated catch block
//            e1.printStackTrace();
//            return null;
//        }
//
//        try {
//            URLConnection conn = url.openConnection();
//            InputStream inputStream = conn.getInputStream();
//
//
//            byte[] buffer = new byte[1024];
//            int len = 0;
//            ByteArrayOutputStream bos = new ByteArrayOutputStream();
//            while((len = inputStream.read(buffer)) != -1) {
//                bos.write(buffer, 0, len);
//            }
//            bos.close();
//            return bos.toByteArray();
//        } catch (Exception e) {
//            return null;
//        }
//    }
//
//    @RequestMapping(path = "upload", method = RequestMethod.POST)
//    public ResponseResult uploadPhoto(@RequestParam("photo") String photo) throws IOException, FontFormatException {
//        String token = auth.uploadToken(qiNiuProperties.getBucketName());
//        com.qiniu.http.Response response = uploadManager.put(Base64Utils.decode(photo),String.valueOf(IdGenerator.generateId()), token);
//        byte[] data;
//        if (response.isOK()) {
//            DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
//            data = httpDownload(qiNiuProperties.getUrl() + putRet.key + "-crop");
//            if (data!=null) {
//                return ResponseResult.success(Base64Utils.encode(data));
//            }
//        }
//
////        long no = gamePsNumberMapper.countPhotoNum();
////        BufferedImage combineImg = ImageUtils.combineCert(photo,"张 三","华中科技大学",no);
////        ImageIO.write(combineImg, "png", new File("/Users/chenliang/Desktop/photo/cer_photo.png"));
//        return ResponseResult.success(photo);
////        try {
////            Response response = commonOperate.detectBase64(photo, 0, "none");
////            if (response.getStatus() == 200) {
////                DetectResponse result = gson.fromJson(new String(response.getContent()), DetectResponse.class);
////                if (result.getFaces().size() == 1) {
////                    RectangleVO rectangle = result.getFaces().get(0).getFaceRectangle();
////                    BufferedImage image = ImageUtils.crop(photo, rectangle.getLeft(), rectangle.getTop(), rectangle.getWidth(), rectangle.getHeight());
////                    final ByteArrayOutputStream os = new ByteArrayOutputStream();
////                    ImageIO.write(image, "jpg", os);
////                    String outString = Base64Utils.encode(os.toByteArray());
////                    return ResponseResult.success(outString);
////                } else {
////                    //多张脸
////                    return ResponseResult.error(-1, "无法识别头像,请上传头像");
////                }
////            } else {
////                return ResponseResult.error(-1, "上传失败");
////            }
////        } catch (Exception ex) {
////            logger.error("上传失败", ex);
////            return ResponseResult.error(-1, "上传失败");
////        }
//    }
//
//    @RequestMapping("generate")
//    public ResponseResult generate(@RequestBody GenerateCertificateRequest request) throws IOException, FontFormatException {
//        try{
//            gamePsNumberMapper.updatePhotoNum();
//        }catch (Exception e){
//            logger.error("增加用户完成生成图片次数服务异常",e);
//        }
//        long no = gamePsNumberMapper.countPhotoNum();
//        BufferedImage combineImg = ImageUtils.combineCert(request.getPhoto(),request.getName(),request.getSchool(),no);
//        final ByteArrayOutputStream os = new ByteArrayOutputStream();
//        ImageIO.write(combineImg, "jpg", os);
//        String outString = Base64Utils.encode(os.toByteArray());
//
//        return ResponseResult.success(outString);
//    }
//}
