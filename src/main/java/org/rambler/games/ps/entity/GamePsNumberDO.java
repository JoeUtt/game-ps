package org.rambler.games.ps.entity;

/**
 * Created by liujun on 2017/6/9.
 */
public class GamePsNumberDO {

    private Long id;

    private Long userNum;

    private Long photoNum;

    private Long weixinNum;

    private Long qqNum;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserNum() {
        return userNum;
    }

    public void setUserNum(Long userNum) {
        this.userNum = userNum;
    }

    public Long getPhotoNum() {
        return photoNum;
    }

    public void setPhotoNum(Long photoNum) {
        this.photoNum = photoNum;
    }

    public Long getWeixinNum() {
        return weixinNum;
    }

    public void setWeixinNum(Long weixinNum) {
        this.weixinNum = weixinNum;
    }

    public Long getQqNum() {
        return qqNum;
    }

    public void setQqNum(Long qqNum) {
        this.qqNum = qqNum;
    }
}
