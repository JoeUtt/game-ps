package org.rambler.games.ps.db.migration;

import org.flywaydb.core.api.migration.spring.SpringJdbcMigration;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * Created by chenliang on 2017/2/10.
 */
public class V1_0_0_1496808749__Init implements SpringJdbcMigration {

    @Override
    public void migrate(JdbcTemplate jdbcTemplate) throws Exception {

        jdbcTemplate.execute("ALTER TABLE `game_ps_number` ADD COLUMN `weixin_num` bigint(20) DEFAULT 0 AFTER `photo_num`, ADD COLUMN `qq_num` bigint(20) DEFAULT 0 AFTER `weixin_num`;");
    }

}
