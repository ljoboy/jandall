package org.alljo.jandall.web.rest;

import org.alljo.jandall.domain.ExtraInfo;
import org.alljo.jandall.repository.ExtraInfoRepository;
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
 * REST controller for managing {@link org.alljo.jandall.domain.ExtraInfo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExtraInfoResource {

    private final Logger log = LoggerFactory.getLogger(ExtraInfoResource.class);

    private static final String ENTITY_NAME = "extraInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtraInfoRepository extraInfoRepository;

    public ExtraInfoResource(ExtraInfoRepository extraInfoRepository) {
        this.extraInfoRepository = extraInfoRepository;
    }

    /**
     * {@code POST  /extra-infos} : Create a new extraInfo.
     *
     * @param extraInfo the extraInfo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extraInfo, or with status {@code 400 (Bad Request)} if the extraInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extra-infos")
    public ResponseEntity<ExtraInfo> createExtraInfo(@Valid @RequestBody ExtraInfo extraInfo) throws URISyntaxException {
        log.debug("REST request to save ExtraInfo : {}", extraInfo);
        if (extraInfo.getId() != null) {
            throw new BadRequestAlertException("A new extraInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtraInfo result = extraInfoRepository.save(extraInfo);
        return ResponseEntity.created(new URI("/api/extra-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extra-infos} : Updates an existing extraInfo.
     *
     * @param extraInfo the extraInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extraInfo,
     * or with status {@code 400 (Bad Request)} if the extraInfo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extraInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extra-infos")
    public ResponseEntity<ExtraInfo> updateExtraInfo(@Valid @RequestBody ExtraInfo extraInfo) throws URISyntaxException {
        log.debug("REST request to update ExtraInfo : {}", extraInfo);
        if (extraInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExtraInfo result = extraInfoRepository.save(extraInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extraInfo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /extra-infos} : get all the extraInfos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extraInfos in body.
     */
    @GetMapping("/extra-infos")
    public List<ExtraInfo> getAllExtraInfos() {
        log.debug("REST request to get all ExtraInfos");
        return extraInfoRepository.findAll();
    }

    /**
     * {@code GET  /extra-infos/:id} : get the "id" extraInfo.
     *
     * @param id the id of the extraInfo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extraInfo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extra-infos/{id}")
    public ResponseEntity<ExtraInfo> getExtraInfo(@PathVariable Long id) {
        log.debug("REST request to get ExtraInfo : {}", id);
        Optional<ExtraInfo> extraInfo = extraInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(extraInfo);
    }

    /**
     * {@code DELETE  /extra-infos/:id} : delete the "id" extraInfo.
     *
     * @param id the id of the extraInfo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extra-infos/{id}")
    public ResponseEntity<Void> deleteExtraInfo(@PathVariable Long id) {
        log.debug("REST request to delete ExtraInfo : {}", id);
        extraInfoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
