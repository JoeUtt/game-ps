package org.rambler.games.ps.util;



import org.springframework.core.io.ClassPathResource;
import org.springframework.util.Base64Utils;

import java.awt.*;
import java.awt.image.*;
import java.io.ByteArrayInputStream;
import javax.imageio.ImageIO;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;

/**
 * @author chenliang on 2017/6/8.
 */
public class ImageUtils {


    public static BufferedImage crop(String imageBase64,int cropX, int cropY, int targetWidth, int targetHeight) throws IOException {

        BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(Base64Utils.decodeFromString(imageBase64)));
        //剪裁图片
        ImageFilter filter = new CropImageFilter(cropX, cropY, targetWidth, targetHeight);
        Image cropped = Toolkit.getDefaultToolkit().createImage(new FilteredImageSource(bufferedImage.getSource(), filter));
        //Polygon

        //渲染新图片
        BufferedImage image = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics g = image.getGraphics();
        g.drawImage(cropped, 0, 0, null);

        g.dispose();
        return image;
    }


    public static BufferedImage combineCert(String photo,String name,String school,long no) throws IOException, FontFormatException {
        BufferedImage photoImage = ImageIO.read(new ByteArrayInputStream(Base64Utils.decodeFromString(photo)));

        InputStream in = new ClassPathResource("/static/images/cert/1.png").getInputStream();

        BufferedImage bgImage = ImageIO.read(in);
        BufferedImage image = new BufferedImage(bgImage.getWidth(), bgImage.getHeight(), BufferedImage.TYPE_INT_RGB);
        Graphics g = image.getGraphics();
        g.drawImage(bgImage, 0, 0, null);
        g.drawImage(photoImage.getScaledInstance(152, 181, Image.SCALE_SMOOTH), 75, 195, null);


        Font font = Font.createFont(Font.TRUETYPE_FONT,new ClassPathResource("/static/font/fzkt.TTF").getInputStream());

        //姓名
        BufferedImage imageName = new BufferedImage(160, 40, BufferedImage.TYPE_INT_ARGB);
        Graphics2D gName = (Graphics2D) imageName.getGraphics();
        // 抗锯齿
        gName.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        gName.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        gName.fillRect(0, 0, 160, 30);
        gName.setFont(font.deriveFont(Font.PLAIN, 30f));
        gName.setColor(new Color(new BigInteger("32", 16).intValue(), new BigInteger("32", 16).intValue(), new BigInteger("32", 16).intValue()));

        gName.drawString(name, 0, 30);
        gName.dispose();

        g.drawImage(imageName, 275, 215, null);

        //学校
        BufferedImage schoolName = new BufferedImage(300, 40, BufferedImage.TYPE_INT_ARGB);
        Graphics2D gSchool = (Graphics2D) schoolName.getGraphics();
        // 抗锯齿
        gSchool.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        gSchool.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        gSchool.fillRect(0, 0, 250, 40);
        gSchool.setFont(font.deriveFont(Font.PLAIN, 36f));
        gSchool.setColor(new Color(new BigInteger("e8", 16).intValue(), new BigInteger("13", 16).intValue(), new BigInteger("13", 16).intValue()));
        switch (school.length()) {
            case 3:
                gSchool.drawString(school, 70, 30);
                break;
            case 4:
                gSchool.drawString(school, 60, 30);
                break;
            case 5:
                gSchool.drawString(school, 50, 30);
                break;
            case 6:
                gSchool.drawString(school, 40, 30);
                break;
            case 7:
                gSchool.drawString(school, 10, 30);
                break;
            default:
                gSchool.drawString(school, 0, 30);
                break;
        }

        gSchool.dispose();
        g.drawImage(schoolName, 330, 280, null);

        //学号
        BufferedImage noName= new BufferedImage(155, 25, BufferedImage.TYPE_INT_ARGB);
        Graphics2D gNoSchool = (Graphics2D) noName.getGraphics();
        // 抗锯齿
        gNoSchool.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        gNoSchool.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        gNoSchool.fillRect(0, 0, 155, 30);
        gNoSchool.setFont(font.deriveFont(Font.PLAIN, 22f));
//        gNoSchool.setColor(new Color(new BigInteger("e8", 16).intValue(), new BigInteger("13", 16).intValue(), new BigInteger("13", 16).intValue()));
        gNoSchool.setColor(Color.black);
        gNoSchool.drawString("No."+String.format("%09d", no), 0, 20);
        gNoSchool.dispose();

        g.drawImage(noName, 75, 380, null);

        g.dispose();
        return image;
    }



}
