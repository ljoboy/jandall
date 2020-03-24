package org.alljo.jandall.web.rest;

import org.alljo.jandall.domain.Privacy;
import org.alljo.jandall.repository.PrivacyRepository;
import org.alljo.jandall.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.alljo.jandall.domain.Privacy}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrivacyResource {

    private final Logger log = LoggerFactory.getLogger(PrivacyResource.class);

    private static final String ENTITY_NAME = "privacy";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrivacyRepository privacyRepository;

    public PrivacyResource(PrivacyRepository privacyRepository) {
        this.privacyRepository = privacyRepository;
    }

    /**
     * {@code POST  /privacies} : Create a new privacy.
     *
     * @param privacy the privacy to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new privacy, or with status {@code 400 (Bad Request)} if the privacy has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/privacies")
    public ResponseEntity<Privacy> createPrivacy(@RequestBody Privacy privacy) throws URISyntaxException {
        log.debug("REST request to save Privacy : {}", privacy);
        if (privacy.getId() != null) {
            throw new BadRequestAlertException("A new privacy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Privacy result = privacyRepository.save(privacy);
        return ResponseEntity.created(new URI("/api/privacies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /privacies} : Updates an existing privacy.
     *
     * @param privacy the privacy to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated privacy,
     * or with status {@code 400 (Bad Request)} if the privacy is not valid,
     * or with status {@code 500 (Internal Server Error)} if the privacy couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/privacies")
    public ResponseEntity<Privacy> updatePrivacy(@RequestBody Privacy privacy) throws URISyntaxException {
        log.debug("REST request to update Privacy : {}", privacy);
        if (privacy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Privacy result = privacyRepository.save(privacy);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, privacy.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /privacies} : get all the privacies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of privacies in body.
     */
    @GetMapping("/privacies")
    public List<Privacy> getAllPrivacies() {
        log.debug("REST request to get all Privacies");
        return privacyRepository.findAll();
    }

    /**
     * {@code GET  /privacies/:id} : get the "id" privacy.
     *
     * @param id the id of the privacy to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the privacy, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/privacies/{id}")
    public ResponseEntity<Privacy> getPrivacy(@PathVariable Long id) {
        log.debug("REST request to get Privacy : {}", id);
        Optional<Privacy> privacy = privacyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(privacy);
    }

    /**
     * {@code DELETE  /privacies/:id} : delete the "id" privacy.
     *
     * @param id the id of the privacy to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/privacies/{id}")
    public ResponseEntity<Void> deletePrivacy(@PathVariable Long id) {
        log.debug("REST request to delete Privacy : {}", id);
        privacyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
