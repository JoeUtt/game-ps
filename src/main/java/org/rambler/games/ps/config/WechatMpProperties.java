package org.rambler.games.ps.config;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class WechatMpProperties {
    /**
     * 设置微信公众号的appid
     */

    @Value("${wx.appId:''}")
    private String appId;

    /**
     * 设置微信公众号的app secret
     */
    @Value("${wx.secret:''}")
    private String secret;

    /**
     * 设置微信公众号的token
     */
    @Value("${wx.token:''}")
    private String token;

    /**
     * 设置微信公众号的EncodingAESKey
     */
    @Value("${wx.aesKey:''}")
    private String aesKey;

    @Value("${wx.authoUrl:''}")
    private String authoUrl;

    @Value("${wx.wxCallbackUrl:''}")
    private String wxCallbackUrl;

    @Value("${wx.epAuthUrl:''}")
    private String epAuthUrl;

    public String getAppId() {
        return this.appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getSecret() {
        return this.secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getAesKey() {
        return this.aesKey;
    }

    public void setAesKey(String aesKey) {
        this.aesKey = aesKey;
    }

    public String getAuthoUrl() {
        return authoUrl;
    }

    public void setAuthoUrl(String authoUrl) {
        this.authoUrl = authoUrl;
    }

    public String getWxCallbackUrl() {
        return wxCallbackUrl;
    }

    public void setWxCallbackUrl(String wxCallbackUrl) {
        this.wxCallbackUrl = wxCallbackUrl;
    }

    public String getEpAuthUrl() {
        return epAuthUrl;
    }

    public void setEpAuthUrl(String epAuthUrl) {
        this.epAuthUrl = epAuthUrl;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this,
            ToStringStyle.MULTI_LINE_STYLE);
    }
}
