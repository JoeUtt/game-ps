package org.rambler.games.ps.controller;

import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.result.WxMpOAuth2AccessToken;
import me.chanjar.weixin.mp.bean.result.WxMpUser;
import org.rambler.games.ps.dao.GamePsUserMapper;
import org.rambler.games.ps.entity.GamePsUserDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by liujun on 2017/6/7.
 */

@Controller
@RequestMapping(path = "/wx")
public class WxController {
    @Autowired
    private WxMpService wxMpService;
    @Autowired
    private GamePsUserMapper gamePsUserMapper;

    @RequestMapping(path = "/callback.htm", method = RequestMethod.GET)
    public String test(Model model, HttpServletRequest request,HttpServletResponse response){
        try {
            String code = request.getParameter("code");
            WxMpOAuth2AccessToken wxMpOAuth2AccessToken = wxMpService.oauth2getAccessToken(code);
            WxMpUser wxMpUser = wxMpService.oauth2getUserInfo(wxMpOAuth2AccessToken, null);
            GamePsUserDO gamePsUserDO = gamePsUserMapper.getByOpenid(wxMpUser.getOpenId());
            if (gamePsUserDO==null){
                gamePsUserDO = new GamePsUserDO();
                gamePsUserDO.setNickName(wxMpUser.getNickname());
                gamePsUserDO.setHeadimgurl(wxMpUser.getHeadImgUrl());
                gamePsUserDO.setOpenid(wxMpUser.getOpenId());
                gamePsUserDO.setSex(wxMpUser.getSex());
                gamePsUserDO.setToken(wxMpOAuth2AccessToken.getAccessToken());
                int num = gamePsUserMapper.insertGamePsUserDO(gamePsUserDO);
                System.out.println(num);
            }else{
                gamePsUserMapper.updateToken(gamePsUserDO.getOpenid(),wxMpOAuth2AccessToken.getAccessToken());
            }
            model.addAttribute("token",wxMpOAuth2AccessToken.getAccessToken());
        } catch (WxErrorException e) {
            e.printStackTrace();
        }catch (Exception e) {
            e.printStackTrace();
        }
        return "game";
    }
}
