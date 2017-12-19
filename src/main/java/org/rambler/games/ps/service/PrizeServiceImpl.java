package org.rambler.games.ps.service;

import org.rambler.games.ps.dao.LotteryMapper;
import org.rambler.games.ps.dao.PrizeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author yuanzhou on 2017/12/19.
 */
@Service
public class PrizeServiceImpl implements PrizeService {
    @Autowired
    PrizeMapper prizeMapper;

    @Autowired
    LotteryMapper lotteryMapper;

    @Transactional
    public boolean lottery(int prizeId, String oid) throws Exception {
        boolean result = false;
        int updateResult = prizeMapper.updateLotteryCount(prizeId);
        if (updateResult > 0) {
            updateResult = lotteryMapper.insertLottery(oid,prizeId);
            if (updateResult > 0) {
                result = true;
            }
        } else {
            throw new Exception("奖品抽取数量修改失败");
        }
        return result;
    }

}
