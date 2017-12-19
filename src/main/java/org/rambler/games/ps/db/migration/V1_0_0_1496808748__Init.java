package org.rambler.games.ps.db.migration;

import org.flywaydb.core.api.migration.spring.SpringJdbcMigration;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Created by chenliang on 2017/2/10.
 */
public class V1_0_0_1496808748__Init implements SpringJdbcMigration {

    @Override
    public void migrate(JdbcTemplate jdbcTemplate) throws Exception {

        jdbcTemplate.execute("CREATE TABLE `game_ps_user` (" +
                "`id`  bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID' ," +
                "`openid`  varchar(50) NULL COMMENT '用户唯一标识' ," +
                "`nick_name`  varchar(50) NULL COMMENT ' 用户昵称 ' ," +
                "`sex`  varchar(10) NULL ," +
                "`headimgurl`  varchar(500) NULL COMMENT '用户头像' ," +
                "`privilege`  varchar(200) NULL COMMENT '用户特权信息' ," +
                "`token`  varchar(200) NULL COMMENT '微信token' ," +
                "`game_count` int(20) NULL DEFAULT 0 COMMENT '完成游戏次数',"+
                "PRIMARY KEY (`id`)" +
                ");");

        jdbcTemplate.execute("CREATE TABLE `game_ps_number` (" +
                "`id`  bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID' ," +
                "`user_num`  bigint(20) NULL COMMENT '用户完成游戏次数' ," +
                "`photo_num`  bigint(20) NULL COMMENT ' 用户生成图片次数 ' ," +
                "PRIMARY KEY (`id`)" +
                ");");

        jdbcTemplate.execute("INSERT INTO game_ps_number(id,user_num,photo_num) VALUES(1,0,0);");
    }

}
