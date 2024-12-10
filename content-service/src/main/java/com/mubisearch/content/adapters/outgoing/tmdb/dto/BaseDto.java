package com.mubisearch.content.adapters.outgoing.tmdb.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
public class BaseDto<T> {
    private Boolean success;
    private List<T> data;
}
