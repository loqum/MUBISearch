package com.mubisearch.content.services;

import com.mubisearch.content.controllers.dto.MovieRequest;
import com.mubisearch.content.entities.ContentGenre;
import com.mubisearch.content.entities.Genre;
import com.mubisearch.content.entities.Movie;
import com.mubisearch.content.repositories.ContentGenreRepository;
import com.mubisearch.content.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ContentGenreRepository contentGenreRepository;

    public Optional<Movie> findById(Long id) {
        return movieRepository.findById(id);
    }

    @Transactional
    public Movie createMovie(MovieRequest movieRequest) {
        Movie movie = Movie.builder()
                .id(movieRequest.id())
                .title(movieRequest.title())
                .plot(movieRequest.plot())
                .posterPath(movieRequest.posterPath())
                .backdropPath(movieRequest.backdropPath())
                .releaseDate(movieRequest.releaseDate())
                .originalTitle(movieRequest.originalTitle())
                .averageScore(BigDecimal.ZERO)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        try {
            movie = movieRepository.save(movie);
        } catch (Exception e) {
            throw new RuntimeException("Error saving movie: " + e.getMessage(), e);
        }

        if (movieRequest.genres() != null && !movieRequest.genres().isEmpty()) {
            Movie finalMovie = movie;
            List<ContentGenre> contentGenres = movieRequest.genres().keySet().stream()
                    .map(id -> {
                        Genre genre = Genre.valueOfId(id);
                        if (genre != null) {
                            return new ContentGenre(finalMovie, genre);
                        } else {
                            throw new IllegalArgumentException("Genre not found for ID: " + id);
                        }
                    })
                    .toList();
            try {
                contentGenreRepository.saveAll(contentGenres);
            } catch (Exception e) {
                throw new RuntimeException("Error saving content genres: " + e.getMessage(), e);
            }
        }

        return movie;
    }
}
