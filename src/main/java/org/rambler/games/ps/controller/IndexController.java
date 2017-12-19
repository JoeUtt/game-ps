package org.rambler.games.ps.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.mp.api.WxMpService;
import org.rambler.games.ps.config.WechatMpProperties;
import org.rambler.games.ps.dao.GamePsNumberMapper;
import org.rambler.games.ps.dao.GamePsUserMapper;
import org.rambler.games.ps.dao.LotteryMapper;
import org.rambler.games.ps.dao.PrizeMapper;
import org.rambler.games.ps.entity.GamePsNumberDO;
import org.rambler.games.ps.entity.PrizeDO;
import org.rambler.games.ps.service.PrizeService;
import org.rambler.games.ps.util.HttpUtils;
import org.rambler.games.ps.util.LotteryUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Created by liujun on 2017/6/8.
 */
@Controller
public class IndexController {

    private static final Logger logger = LoggerFactory.getLogger(IndexController.class);

    @Autowired
    WxMpService wxMpService;
    @Autowired
    WechatMpProperties properties;
    @Autowired
    GamePsUserMapper gamePsUserMapper;
    @Autowired
    GamePsNumberMapper gamePsNumberMapper;
    @Autowired
    PrizeMapper prizeMapper;
    @Autowired
    LotteryMapper lotteryMapper;
    @Autowired
    PrizeService prizeService;

    @RequestMapping(path = "/home", method = RequestMethod.GET)
    public void home(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect(properties.getEpAuthUrl());
    }

    @RequestMapping(path = "/index.htm", method = RequestMethod.GET)
    public String index(Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String oid = request.getParameter("oid");

        if (StringUtils.isEmpty(oid)) {
            return "home";
        } else {
            //是否绑定EP用户
            model.addAttribute("isVip", checkVIP(oid));

            Integer lotteryId = lotteryMapper.getLottery(oid);
            //是否抽过奖
            model.addAttribute("hasLottery", !StringUtils.isEmpty(lotteryId));
            return "index";
        }
    }

    @RequestMapping(path = "/select.htm", method = RequestMethod.POST)
    public String select(Model model, HttpServletRequest request, HttpServletResponse response) {
        return "select";
    }

    @RequestMapping(path = "/game.htm", method = RequestMethod.POST)
    public String game(Model model) {
        return "game";
    }

    @RequestMapping(path = "/autho.htm", method = RequestMethod.GET)
    public void autho(Model model, HttpServletResponse response) {
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
        String url = wxMpService.oauth2buildAuthorizationUrl(properties.getAuthoUrl() + properties.getWxCallbackUrl(), WxConsts.OAUTH2_SCOPE_USER_INFO, null);
        return url;
    }


    @RequestMapping(path = "/lottery.htm", method = RequestMethod.GET)
    public String lottery(Model model,String oid) throws Exception {
        if (!StringUtils.isEmpty(oid)) {
            if (checkVIP(oid)) {
                Integer lotteryId = lotteryMapper.getLottery(oid);
                if (StringUtils.isEmpty(lotteryId)) {
                    LotteryUtils a = new LotteryUtils();
                    int[] result = new int[5];
                    List<PrizeDO> prizes = new ArrayList<>();

                    PrizeDO p1 = new PrizeDO();
                    p1.setName("1699元羊绒围巾");
                    p1.setWeight(1);//奖品的权重设置成1
                    prizes.add(p1);

                    PrizeDO p2 = new PrizeDO();
                    p2.setName("银杏胸针");
                    p2.setWeight(7);//奖品的权重设置成2
                    prizes.add(p2);

                    PrizeDO p3 = new PrizeDO();
                    p3.setName("大衣胸针");
                    p3.setWeight(20);
                    prizes.add(p3);

                    PrizeDO p4 = new PrizeDO();
                    p4.setName("小熊毛巾");
                    p4.setWeight(1000);
                    prizes.add(p4);

                    PrizeDO p5 = new PrizeDO();
                    p5.setName("88元圣诞礼券");
                    p5.setWeight(100000);
                    prizes.add(p5);

                    int count = 0;
                    while (count == 0) {
                        int selected = a.getPrizeIndex(prizes);
                        count = prizeMapper.getPrizeCount(selected);
                        if (count > 0) {
                            boolean isOk = prizeService.lottery(selected, oid);
                            if (isOk) {
                                model.addAttribute("pic", prizes.get(selected).getPic());
                                model.addAttribute("name", prizes.get(selected).getName());
                                model.addAttribute("pic", prizes.get(selected).getPic());
                                break;
                            }
                        }
                    }

//                    System.out.println("抽奖开始");
//                    for (int i = 0; i < 1; i++)// 打印1000000个测试概率的准确性
//                    {
//                        int selected = a.getPrizeIndex(prizes);
//                        if (selected < 4) {
//                            System.out.println("第" + i + "次抽中的奖品为：" + prizes.get(selected).getName());
//                        }
//                        result[selected]++;
//                    }
//                    System.out.println("抽奖结束");
//                    System.out.println("每种奖品抽到的数量为：");
//                    System.out.println("一等奖：" + result[0]);
//                    System.out.println("二等奖：" + result[1]);
//                    System.out.println("三等奖：" + result[2]);
//                    System.out.println("四等奖：" + result[3]);
//                    System.out.println("五等奖：" + result[4]);
                }
            }
            return "lottery";
        } else {
            return "home";
        }
    }

    private boolean checkVIP(String oid) {
        try {
            String strUrl = "http://o2o.elegant-prosper.com/CommonInterface/CommonInterface/CheckVIP?sid=cfe404ea-fe5b-4a85-87f0-b2701929462c&oid=" +
                    oid + "&UserName=EPh5Act&PassWord=a85c29b87e8ae18fc44b50a873dada77&DepotId=E0009837";
            String vipResult = HttpUtils.sendPost(strUrl, "");
            JSONObject jsonObject = JSON.parseObject(vipResult);
            return Objects.equals(jsonObject.get("result"), 0);
        } catch (Exception ex) {
            return false;
        }
    }
}
