package com.vishesh.SourceBox.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequest {

    private Long senderId;
    private String content;
    private Long projectId;

}

