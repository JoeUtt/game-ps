package org.rambler.games.ps.vo;

/**
 * @author chenliang on 2017/6/8.
 */
public class GenerateCertificateRequest {
    private String photo;
    private int photoTemplateId;
    private String name;
    private String school;
    private int certificateTemplateId;


    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public int getPhotoTemplateId() {
        return photoTemplateId;
    }

    public void setPhotoTemplateId(int photoTemplateId) {
        this.photoTemplateId = photoTemplateId;
    }

    public int getCertificateTemplateId() {
        return certificateTemplateId;
    }

    public void setCertificateTemplateId(int certificateTemplateId) {
        this.certificateTemplateId = certificateTemplateId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }
}
