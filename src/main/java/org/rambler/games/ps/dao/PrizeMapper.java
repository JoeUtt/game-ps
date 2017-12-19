package org.rambler.games.ps.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * @author yuanzhou on 2017/12/19.
 */
@Mapper
public interface PrizeMapper {

    @Select("select count - lottery_count from prize where id = #{id}")
    int getPrizeCount(@Param("id") int id);

    @Update("update prize set lottery_count=lottery_count+1 where id = #{id} ")
    int updateLotteryCount(@Param("id") int id);
}
