package org.rambler.games.ps.vendor.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * @author chenliang on 2017/6/8.
 */
public class DetectResponse {
    private String requestId;
    private List<FaceVO> faces = new ArrayList<>();
    private String imageId;
    private int timeUsed;
    private String errorMessage;


    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public List<FaceVO> getFaces() {
        return faces;
    }

    public void setFaces(List<FaceVO> faces) {
        this.faces = faces;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public int getTimeUsed() {
        return timeUsed;
    }

    public void setTimeUsed(int timeUsed) {
        this.timeUsed = timeUsed;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
