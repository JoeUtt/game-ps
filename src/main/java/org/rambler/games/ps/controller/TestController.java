package org.rambler.games.ps.controller;

import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.mp.api.WxMpService;
import org.rambler.games.ps.dao.GamePsUserMapper;
import org.rambler.games.ps.entity.GamePsUserDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by liujun on 2017/6/7.
 */
@Controller
@RequestMapping(path = "/test")
public class TestController {

    @Autowired
    private GamePsUserMapper gamePsUserMapper;
    @Autowired
    private WxMpService wxMpService;



    @RequestMapping(path = "/test.htm", method = RequestMethod.GET)
    public String test(Model model){
        return "test";
    }

    @RequestMapping(path = "/ouath", method = RequestMethod.GET)
    public void ouath(){
       String url =  wxMpService.oauth2buildAuthorizationUrl("http://qa.api.mengbuy.com/test/test",WxConsts.OAUTH2_SCOPE_USER_INFO, null);
    }
}
