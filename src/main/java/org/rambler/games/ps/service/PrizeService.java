package org.rambler.games.ps.service;

/**
 * @author yuanzhou on 2017/12/19.
 */
public interface PrizeService {

    boolean lottery(int prizeId, String oid) throws Exception;
}
