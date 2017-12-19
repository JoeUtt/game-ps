package org.rambler.games.ps.controller;

import org.rambler.games.ps.dao.GamePsNumberMapper;
import org.rambler.games.ps.dao.GamePsUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import org.rambler.infrastructure.ResponseResult;

/**
 * Created by liujun on 2017/6/7.
 */

@RestController
@RequestMapping("game")
public class GamePsUserController {

    private static final Logger logger = LoggerFactory.getLogger(GamePsUserController.class);
    @Autowired
    private GamePsUserMapper gamePsUserMapper;
    @Autowired
    private GamePsNumberMapper gamePsNumberMapper;

    /*@RequestMapping(path = "/user_num.htm", method = RequestMethod.GET)
    public HttpEntity userNum(@RequestParam("token") String token, Model model){
        try{
            int num = gamePsUserMapper.updateGameCount(token);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
    }*/

//    @RequestMapping(path = "/getUser", method = RequestMethod.GET)
//    public ResponseResult getUser(@RequestParam("token") String token, HttpServletRequest request, HttpServletResponse response){
//        try{
//            GamePsUserDO gamePsUserDO = gamePsUserMapper.getByToken(token);
//            return ResponseResult.success(gamePsUserDO);
//        }catch (Exception e){
//            logger.error("上传失败", e);
//        }
//        return ResponseResult.error(-1,"无效token","无效token");
//    }
//
//    @RequestMapping(path = "/user_num", method = RequestMethod.GET)
//    public ResponseResult userNumber(@RequestParam("browser") String browser){
//        try{
//            gamePsNumberMapper.updateUserNum();
//            switch (browser){
//                case "qq":
//                    gamePsNumberMapper.updateQqNum();
//                    break;
//                case "weixin":
//                    gamePsNumberMapper.updateWeixinNum();
//                    break;
//            }
//        }catch (Exception e){
//            return ResponseResult.error(-1,"增加用户完成游戏次数服务异常","增加用户完成游戏次数服务异常");
//        }
//        return ResponseResult.success();
//    };


}
