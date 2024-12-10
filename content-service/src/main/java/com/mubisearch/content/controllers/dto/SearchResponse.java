package com.mubisearch.content.controllers.dto;

import lombok.Data;

import java.util.List;

@Data
public class SearchResponse<T> {
    private int page;
    private List<T> results;
    private int total_results;
    private int total_pages;
}
