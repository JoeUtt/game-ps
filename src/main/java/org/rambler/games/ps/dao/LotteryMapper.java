package org.rambler.games.ps.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * @author yuanzhou on 2017/12/19.
 */
@Mapper
public interface LotteryMapper {
    @Select("select id from lottery where oid = #{oid}")
    Integer getLottery(@Param("oid") String oid);

    @Insert("insert into lottery(oid, prize_id) values(#{oid}, #{prizeId})")
    int insertLottery(@Param("oid") String oid, @Param("prizeId")int prizeId);
}
