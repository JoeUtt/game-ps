package org.rambler.games.ps.config;

/**
 * @author chenliang on 2017/6/7.
 */

//@Component
//@ConfigurationProperties(prefix = "faceplusplus.api")
public class FacePlusPlusProperties {

    private String url;
    private String key;
    private String secret;


    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }
}
