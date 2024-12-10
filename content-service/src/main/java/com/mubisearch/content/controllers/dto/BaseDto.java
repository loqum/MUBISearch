package com.mubisearch.content.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
public class BaseDto<T> {
    private Boolean success;
    private List<T> data;
}
