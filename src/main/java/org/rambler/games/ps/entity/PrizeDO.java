package org.rambler.games.ps.entity;

/**
 * @author yuanzhou on 2017/12/18.
 */
public class PrizeDO {
    private int id;
    private String name;
    private String pic;
    private int count;
    private int lotteryCount;
    private int weight;
    private String code;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getLotteryCount() {
        return lotteryCount;
    }

    public void setLotteryCount(int lotteryCount) {
        this.lotteryCount = lotteryCount;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
