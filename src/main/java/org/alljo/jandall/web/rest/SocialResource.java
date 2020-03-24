package org.alljo.jandall.web.rest;

import org.alljo.jandall.domain.Social;
import org.alljo.jandall.repository.SocialRepository;
import org.alljo.jandall.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.alljo.jandall.domain.Social}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SocialResource {

    private final Logger log = LoggerFactory.getLogger(SocialResource.class);

    private static final String ENTITY_NAME = "social";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SocialRepository socialRepository;

    public SocialResource(SocialRepository socialRepository) {
        this.socialRepository = socialRepository;
    }

    /**
     * {@code POST  /socials} : Create a new social.
     *
     * @param social the social to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new social, or with status {@code 400 (Bad Request)} if the social has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/socials")
    public ResponseEntity<Social> createSocial(@Valid @RequestBody Social social) throws URISyntaxException {
        log.debug("REST request to save Social : {}", social);
        if (social.getId() != null) {
            throw new BadRequestAlertException("A new social cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Social result = socialRepository.save(social);
        return ResponseEntity.created(new URI("/api/socials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /socials} : Updates an existing social.
     *
     * @param social the social to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated social,
     * or with status {@code 400 (Bad Request)} if the social is not valid,
     * or with status {@code 500 (Internal Server Error)} if the social couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/socials")
    public ResponseEntity<Social> updateSocial(@Valid @RequestBody Social social) throws URISyntaxException {
        log.debug("REST request to update Social : {}", social);
        if (social.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Social result = socialRepository.save(social);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, social.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /socials} : get all the socials.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of socials in body.
     */
    @GetMapping("/socials")
    public List<Social> getAllSocials() {
        log.debug("REST request to get all Socials");
        return socialRepository.findAll();
    }

    /**
     * {@code GET  /socials/:id} : get the "id" social.
     *
     * @param id the id of the social to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the social, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/socials/{id}")
    public ResponseEntity<Social> getSocial(@PathVariable Long id) {
        log.debug("REST request to get Social : {}", id);
        Optional<Social> social = socialRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(social);
    }

    /**
     * {@code DELETE  /socials/:id} : delete the "id" social.
     *
     * @param id the id of the social to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/socials/{id}")
    public ResponseEntity<Void> deleteSocial(@PathVariable Long id) {
        log.debug("REST request to delete Social : {}", id);
        socialRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
