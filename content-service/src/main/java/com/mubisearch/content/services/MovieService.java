package com.mubisearch.content.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.mubisearch.content.controllers.dto.MovieDto;
import com.mubisearch.content.controllers.dto.MovieRequest;
import com.mubisearch.content.controllers.dto.SearchResponse;
import com.mubisearch.content.entities.*;
import com.mubisearch.content.repositories.ContentGenreRepository;
import com.mubisearch.content.repositories.MovieRepository;
import com.mubisearch.content.repositories.ReviewRepository;
import com.mubisearch.content.repositories.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MovieService extends BaseService<MovieDto> {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ContentGenreRepository contentGenreRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Value("${tmdb.api.url.search.movie.title}")
    private String apiUrl;

    @Value("${tmdb.api.url.search.movie.discover}")
    private String discoverUrl;

    @Cacheable(value = "movies")
    public List<MovieDto> getMovies(String title) {
        Map<String, String> params = Map.of("title", title);
        TypeReference<SearchResponse<MovieDto>> movieType = new TypeReference<>() {};
        SearchResponse<MovieDto> response = fetchData(apiUrl, params, movieType);
        if (response != null) {
            return response.getResults();
        }
        return List.of();
    }

    @Cacheable("moviesDiscover")
    public List<MovieDto> getMoviesDiscover() {
        log.info("Fetching movies from TMDB API");
        TypeReference<SearchResponse<MovieDto>> movieType = new TypeReference<>() {};
        SearchResponse<MovieDto> response = fetchData(discoverUrl, null, movieType);
        if (response != null) {
            log.info("Response from TMDB: {}", response);
            return response.getResults();
        }
        return List.of();
    }

//    @Cacheable(value = "movie", key = "#idExternal")
    public Optional<Movie> findByIdExternal(Long idExternal) {
        return movieRepository.findByIdExternal(idExternal);
    }

    @Transactional
    public Movie createMovie(MovieRequest movieRequest) {
        Movie movie = Movie.builder()
                .idExternal(movieRequest.idExternal())
                .title(movieRequest.title())
                .plot(movieRequest.plot())
                .posterPath(movieRequest.posterPath())
                .releaseDate(movieRequest.releaseDate())
                .originalTitle(movieRequest.originalTitle())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        movie = movieRepository.save(movie);

        Movie finalMovie = movie;

        if (movieRequest.genres() != null && !movieRequest.genres().isEmpty()) {
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
            contentGenreRepository.saveAll(contentGenres);
        }

        return movie;
    }

//    @CacheEvict(value = "movie", key = "#idExternal")
//    public Movie updateMovie(Long idExternal, MovieRequest movie) {
//        Movie entity = this.findByIdExternal(idExternal).orElse(null);
////        entity.set
//        if (entity == null) {
//            return null;
//        }
//
//         entity = Movie.builder()
//                .idExternal(movieRequest.idExternal())
//                .title(movieRequest.title())
//                .plot(movieRequest.plot())
//                .posterPath(movieRequest.posterPath())
//                .releaseDate(movieRequest.releaseDate())
//                .originalTitle(movieRequest.originalTitle())
//                .build();
//        movie = movieRepository.save(movie);
//
//        Movie finalMovie = movie;
//
//        if (movieRequest.genres() != null && !movieRequest.genres().isEmpty()) {
//            List<ContentGenre> contentGenres = movieRequest.genres().stream()
//                    .map(genre -> new ContentGenre(finalMovie, genre))
//                    .toList();
//            contentGenreRepository.saveAll(contentGenres);
//        }
//
////        if (movieRequest.votes() != null && !movieRequest.votes().isEmpty()) {
////            List<Vote> votes = movieRequest.votes().stream()
////                    .map(vote -> new Vote(idUser, finalMovie, vote.getScore()))
////                    .toList();
////            voteRepository.saveAll(votes);
////        }
////
////        if (movieRequest.reviews() != null && !movieRequest.reviews().isEmpty()) {
////            List<Review> reviews = movieRequest.reviews().stream()
////                    .map(review -> new Review(idUser, finalMovie, review.getText()))
////                    .toList();
////            reviewRepository.saveAll(reviews);
////        }
//
//        return movie;
//        return movieRepository.save(entity);
//    }

}
