package org.rambler.games.ps.dao;

import org.apache.ibatis.annotations.*;
import org.rambler.games.ps.entity.GamePsUserDO;

/**
 * Created by liujun on 2017/6/7.
 */
@Mapper
public interface GamePsUserMapper {

    @Select("SELECT * FROM game_ps_user WHERE openid = #{openid}")
    GamePsUserDO getByOpenid(@Param("openid") String openid);

    @Insert("INSERT INTO game_ps_user(openid,sex,headimgurl,token) VALUES(#{openid},#{sex},#{headimgurl},#{token})")
    int insertGamePsUserDO(GamePsUserDO gamePsUserDO);

    @Update("update game_ps_user set token=#{token} where openid=#{openid}")
    int updateToken(@Param("openid")String openid,@Param("token")String token);


    @Update("update game_ps_user set game_count=game_count+1 where token=#{token}")
    int updateGameCount(@Param("token")String token);

    @Select("SELECT * FROM game_ps_user WHERE token = #{token}")
    GamePsUserDO getByToken(@Param("token") String token);

    @Select("SELECT COUNT(*) FROM game_ps_user")
    int getCount();
}
