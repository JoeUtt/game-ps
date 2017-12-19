package org.rambler.games.ps.dao;

import org.apache.ibatis.annotations.*;
import org.rambler.games.ps.entity.GamePsNumberDO;
import org.rambler.games.ps.entity.GamePsUserDO;

/**
 * Created by liujun on 2017/6/7.
 */
@Mapper
public interface GamePsNumberMapper {



    @Update("update game_ps_number set user_num=user_num+1 where id=1")
    int updateUserNum();

    @Update("update game_ps_number set weixin_num=weixin_num+1 where id=1")
    int updateWeixinNum();

    @Update("update game_ps_number set qq_num=qq_num+1 where id=1")
    int updateQqNum();

    @Update("update game_ps_number set photo_num=photo_num+1 where id=1")
    int updatePhotoNum();

    @Select("select photo_num from game_ps_number where id=1")
    long countPhotoNum();

    @Select("select user_num from game_ps_number where id=1")
    long countUserNum();

    @Select("select * from game_ps_number where id=1")
    GamePsNumberDO get();
}
