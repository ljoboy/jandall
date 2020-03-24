package org.alljo.jandall.web.rest;

import org.alljo.jandall.JandallApp;
import org.alljo.jandall.domain.Interest;
import org.alljo.jandall.repository.InterestRepository;

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
 * Integration tests for the {@link InterestResource} REST controller.
 */
@SpringBootTest(classes = JandallApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class InterestResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PERCENTAGE = 1;
    private static final Integer UPDATED_PERCENTAGE = 2;

    @Autowired
    private InterestRepository interestRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInterestMockMvc;

    private Interest interest;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Interest createEntity(EntityManager em) {
        Interest interest = new Interest()
            .name(DEFAULT_NAME)
            .percentage(DEFAULT_PERCENTAGE);
        return interest;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Interest createUpdatedEntity(EntityManager em) {
        Interest interest = new Interest()
            .name(UPDATED_NAME)
            .percentage(UPDATED_PERCENTAGE);
        return interest;
    }

    @BeforeEach
    public void initTest() {
        interest = createEntity(em);
    }

    @Test
    @Transactional
    public void createInterest() throws Exception {
        int databaseSizeBeforeCreate = interestRepository.findAll().size();

        // Create the Interest
        restInterestMockMvc.perform(post("/api/interests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(interest)))
            .andExpect(status().isCreated());

        // Validate the Interest in the database
        List<Interest> interestList = interestRepository.findAll();
        assertThat(interestList).hasSize(databaseSizeBeforeCreate + 1);
        Interest testInterest = interestList.get(interestList.size() - 1);
        assertThat(testInterest.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testInterest.getPercentage()).isEqualTo(DEFAULT_PERCENTAGE);
    }

    @Test
    @Transactional
    public void createInterestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interestRepository.findAll().size();

        // Create the Interest with an existing ID
        interest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInterestMockMvc.perform(post("/api/interests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(interest)))
            .andExpect(status().isBadRequest());

        // Validate the Interest in the database
        List<Interest> interestList = interestRepository.findAll();
        assertThat(interestList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = interestRepository.findAll().size();
        // set the field null
        interest.setName(null);

        // Create the Interest, which fails.

        restInterestMockMvc.perform(post("/api/interests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(interest)))
            .andExpect(status().isBadRequest());

        List<Interest> interestList = interestRepository.findAll();
        assertThat(interestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInterests() throws Exception {
        // Initialize the database
        interestRepository.saveAndFlush(interest);

        // Get all the interestList
        restInterestMockMvc.perform(get("/api/interests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interest.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].percentage").value(hasItem(DEFAULT_PERCENTAGE)));
    }
    
    @Test
    @Transactional
    public void getInterest() throws Exception {
        // Initialize the database
        interestRepository.saveAndFlush(interest);

        // Get the interest
        restInterestMockMvc.perform(get("/api/interests/{id}", interest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(interest.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.percentage").value(DEFAULT_PERCENTAGE));
    }

    @Test
    @Transactional
    public void getNonExistingInterest() throws Exception {
        // Get the interest
        restInterestMockMvc.perform(get("/api/interests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInterest() throws Exception {
        // Initialize the database
        interestRepository.saveAndFlush(interest);

        int databaseSizeBeforeUpdate = interestRepository.findAll().size();

        // Update the interest
        Interest updatedInterest = interestRepository.findById(interest.getId()).get();
        // Disconnect from session so that the updates on updatedInterest are not directly saved in db
        em.detach(updatedInterest);
        updatedInterest
            .name(UPDATED_NAME)
            .percentage(UPDATED_PERCENTAGE);

        restInterestMockMvc.perform(put("/api/interests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInterest)))
            .andExpect(status().isOk());

        // Validate the Interest in the database
        List<Interest> interestList = interestRepository.findAll();
        assertThat(interestList).hasSize(databaseSizeBeforeUpdate);
        Interest testInterest = interestList.get(interestList.size() - 1);
        assertThat(testInterest.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testInterest.getPercentage()).isEqualTo(UPDATED_PERCENTAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingInterest() throws Exception {
        int databaseSizeBeforeUpdate = interestRepository.findAll().size();

        // Create the Interest

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInterestMockMvc.perform(put("/api/interests")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(interest)))
            .andExpect(status().isBadRequest());

        // Validate the Interest in the database
        List<Interest> interestList = interestRepository.findAll();
        assertThat(interestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInterest() throws Exception {
        // Initialize the database
        interestRepository.saveAndFlush(interest);

        int databaseSizeBeforeDelete = interestRepository.findAll().size();

        // Delete the interest
        restInterestMockMvc.perform(delete("/api/interests/{id}", interest.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Interest> interestList = interestRepository.findAll();
        assertThat(interestList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
