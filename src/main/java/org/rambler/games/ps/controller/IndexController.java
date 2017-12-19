package org.rambler.games.ps.controller;

import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.mp.api.WxMpService;
import org.rambler.games.ps.config.WechatMpProperties;
import org.rambler.games.ps.dao.GamePsNumberMapper;
import org.rambler.games.ps.dao.GamePsUserMapper;
import org.rambler.games.ps.entity.GamePsNumberDO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by liujun on 2017/6/8.
 */
@Controller
public class IndexController {

    private static final Logger logger = LoggerFactory.getLogger(IndexController.class);

    @Autowired
    private WxMpService wxMpService;
    @Autowired
    private WechatMpProperties properties;
    @Autowired
    private GamePsUserMapper gamePsUserMapper;
    @Autowired
    private GamePsNumberMapper gamePsNumberMapper;

    @RequestMapping(path = "/index.htm", method = RequestMethod.GET)
    public String index(Model model,HttpServletRequest request, HttpServletResponse response){
        return "index";
    }

    @RequestMapping(path = "/select.htm", method = RequestMethod.POST)
    public String select(Model model,HttpServletRequest request, HttpServletResponse response){
        return "select";
    }

    @RequestMapping(path = "/upload_pic.htm", method = RequestMethod.POST)
    public String uploadPic(Model model){
        return "upload_pic";
    }

    @RequestMapping(path = "/graduate_photo.htm", method = RequestMethod.POST)
    public String graduatePhoto(Model model){
        return "graduate_photo";
    }


    
    @RequestMapping(path = "/game.htm", method = RequestMethod.POST)
    public String game(Model model){
        return "game";
    }

    @RequestMapping(path = "/autho.htm", method = RequestMethod.GET)
    public void autho(Model model, HttpServletResponse response){
        try {
            response.sendRedirect(getWxAouthUrl());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(path = "/total", method = RequestMethod.GET)
    @ResponseBody
    public String total() {
        int userCount = gamePsUserMapper.getCount();
        GamePsNumberDO data = gamePsNumberMapper.get();

        return String.format("游戏%d次(其中QQ%d次、微信%d次)，毕业照%d张，微信授权%d人", data.getUserNum(), data.getQqNum(), data.getWeixinNum(), data.getPhotoNum(), userCount);
    }

    public String getWxAouthUrl() {
        String url = wxMpService.oauth2buildAuthorizationUrl(properties.getAuthoUrl()+properties.getWxCallbackUrl(), WxConsts.OAUTH2_SCOPE_USER_INFO, null);
        return url;
    }
}
