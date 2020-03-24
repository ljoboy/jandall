package org.alljo.jandall.web.rest;

import org.alljo.jandall.JandallApp;
import org.alljo.jandall.domain.Privacy;
import org.alljo.jandall.repository.PrivacyRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PrivacyResource} REST controller.
 */
@SpringBootTest(classes = JandallApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PrivacyResourceIT {

    private static final Boolean DEFAULT_BDATE = false;
    private static final Boolean UPDATED_BDATE = true;

    private static final Boolean DEFAULT_YEAR = false;
    private static final Boolean UPDATED_YEAR = true;

    @Autowired
    private PrivacyRepository privacyRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrivacyMockMvc;

    private Privacy privacy;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Privacy createEntity(EntityManager em) {
        Privacy privacy = new Privacy()
            .bdate(DEFAULT_BDATE)
            .year(DEFAULT_YEAR);
        return privacy;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Privacy createUpdatedEntity(EntityManager em) {
        Privacy privacy = new Privacy()
            .bdate(UPDATED_BDATE)
            .year(UPDATED_YEAR);
        return privacy;
    }

    @BeforeEach
    public void initTest() {
        privacy = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrivacy() throws Exception {
        int databaseSizeBeforeCreate = privacyRepository.findAll().size();

        // Create the Privacy
        restPrivacyMockMvc.perform(post("/api/privacies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(privacy)))
            .andExpect(status().isCreated());

        // Validate the Privacy in the database
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeCreate + 1);
        Privacy testPrivacy = privacyList.get(privacyList.size() - 1);
        assertThat(testPrivacy.isBdate()).isEqualTo(DEFAULT_BDATE);
        assertThat(testPrivacy.isYear()).isEqualTo(DEFAULT_YEAR);
    }

    @Test
    @Transactional
    public void createPrivacyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = privacyRepository.findAll().size();

        // Create the Privacy with an existing ID
        privacy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrivacyMockMvc.perform(post("/api/privacies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(privacy)))
            .andExpect(status().isBadRequest());

        // Validate the Privacy in the database
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPrivacies() throws Exception {
        // Initialize the database
        privacyRepository.saveAndFlush(privacy);

        // Get all the privacyList
        restPrivacyMockMvc.perform(get("/api/privacies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(privacy.getId().intValue())))
            .andExpect(jsonPath("$.[*].bdate").value(hasItem(DEFAULT_BDATE.booleanValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPrivacy() throws Exception {
        // Initialize the database
        privacyRepository.saveAndFlush(privacy);

        // Get the privacy
        restPrivacyMockMvc.perform(get("/api/privacies/{id}", privacy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(privacy.getId().intValue()))
            .andExpect(jsonPath("$.bdate").value(DEFAULT_BDATE.booleanValue()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPrivacy() throws Exception {
        // Get the privacy
        restPrivacyMockMvc.perform(get("/api/privacies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrivacy() throws Exception {
        // Initialize the database
        privacyRepository.saveAndFlush(privacy);

        int databaseSizeBeforeUpdate = privacyRepository.findAll().size();

        // Update the privacy
        Privacy updatedPrivacy = privacyRepository.findById(privacy.getId()).get();
        // Disconnect from session so that the updates on updatedPrivacy are not directly saved in db
        em.detach(updatedPrivacy);
        updatedPrivacy
            .bdate(UPDATED_BDATE)
            .year(UPDATED_YEAR);

        restPrivacyMockMvc.perform(put("/api/privacies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrivacy)))
            .andExpect(status().isOk());

        // Validate the Privacy in the database
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeUpdate);
        Privacy testPrivacy = privacyList.get(privacyList.size() - 1);
        assertThat(testPrivacy.isBdate()).isEqualTo(UPDATED_BDATE);
        assertThat(testPrivacy.isYear()).isEqualTo(UPDATED_YEAR);
    }

    @Test
    @Transactional
    public void updateNonExistingPrivacy() throws Exception {
        int databaseSizeBeforeUpdate = privacyRepository.findAll().size();

        // Create the Privacy

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrivacyMockMvc.perform(put("/api/privacies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(privacy)))
            .andExpect(status().isBadRequest());

        // Validate the Privacy in the database
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrivacy() throws Exception {
        // Initialize the database
        privacyRepository.saveAndFlush(privacy);

        int databaseSizeBeforeDelete = privacyRepository.findAll().size();

        // Delete the privacy
        restPrivacyMockMvc.perform(delete("/api/privacies/{id}", privacy.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Privacy> privacyList = privacyRepository.findAll();
        assertThat(privacyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
