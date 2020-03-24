package org.alljo.jandall.web.rest;

import org.alljo.jandall.JandallApp;
import org.alljo.jandall.domain.Social;
import org.alljo.jandall.repository.SocialRepository;

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
 * Integration tests for the {@link SocialResource} REST controller.
 */
@SpringBootTest(classes = JandallApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class SocialResourceIT {

    private static final String DEFAULT_FACEBOOK = "AAAAAAAAAA";
    private static final String UPDATED_FACEBOOK = "BBBBBBBBBB";

    private static final String DEFAULT_TWITTER = "AAAAAAAAAA";
    private static final String UPDATED_TWITTER = "BBBBBBBBBB";

    private static final String DEFAULT_LINKED_IN = "AAAAAAAAAA";
    private static final String UPDATED_LINKED_IN = "BBBBBBBBBB";

    private static final String DEFAULT_INSTAGRAM = "AAAAAAAAAA";
    private static final String UPDATED_INSTAGRAM = "BBBBBBBBBB";

    private static final String DEFAULT_GITHUB = "AAAAAAAAAA";
    private static final String UPDATED_GITHUB = "BBBBBBBBBB";

    private static final String DEFAULT_GITLAB = "AAAAAAAAAA";
    private static final String UPDATED_GITLAB = "BBBBBBBBBB";

    private static final String DEFAULT_FLICKR = "AAAAAAAAAA";
    private static final String UPDATED_FLICKR = "BBBBBBBBBB";

    private static final String DEFAULT_GMAIL = "s5gp.0.d.l@googlemail.com";
    private static final String UPDATED_GMAIL = "e.54.q.bx@gmail.com";

    private static final String DEFAULT_EMAIL = "zkQ69@k.mV.iLjSFN.D.OV.hFJ5.uA";
    private static final String UPDATED_EMAIL = "PaCDV@Z.-FP.FFyg.i.iSZJ.b6ROU.FJ";

    private static final String DEFAULT_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE = "BBBBBBBBBB";

    @Autowired
    private SocialRepository socialRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSocialMockMvc;

    private Social social;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Social createEntity(EntityManager em) {
        Social social = new Social()
            .facebook(DEFAULT_FACEBOOK)
            .twitter(DEFAULT_TWITTER)
            .linkedIn(DEFAULT_LINKED_IN)
            .instagram(DEFAULT_INSTAGRAM)
            .github(DEFAULT_GITHUB)
            .gitlab(DEFAULT_GITLAB)
            .flickr(DEFAULT_FLICKR)
            .gmail(DEFAULT_GMAIL)
            .email(DEFAULT_EMAIL)
            .website(DEFAULT_WEBSITE);
        return social;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Social createUpdatedEntity(EntityManager em) {
        Social social = new Social()
            .facebook(UPDATED_FACEBOOK)
            .twitter(UPDATED_TWITTER)
            .linkedIn(UPDATED_LINKED_IN)
            .instagram(UPDATED_INSTAGRAM)
            .github(UPDATED_GITHUB)
            .gitlab(UPDATED_GITLAB)
            .flickr(UPDATED_FLICKR)
            .gmail(UPDATED_GMAIL)
            .email(UPDATED_EMAIL)
            .website(UPDATED_WEBSITE);
        return social;
    }

    @BeforeEach
    public void initTest() {
        social = createEntity(em);
    }

    @Test
    @Transactional
    public void createSocial() throws Exception {
        int databaseSizeBeforeCreate = socialRepository.findAll().size();

        // Create the Social
        restSocialMockMvc.perform(post("/api/socials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(social)))
            .andExpect(status().isCreated());

        // Validate the Social in the database
        List<Social> socialList = socialRepository.findAll();
        assertThat(socialList).hasSize(databaseSizeBeforeCreate + 1);
        Social testSocial = socialList.get(socialList.size() - 1);
        assertThat(testSocial.getFacebook()).isEqualTo(DEFAULT_FACEBOOK);
        assertThat(testSocial.getTwitter()).isEqualTo(DEFAULT_TWITTER);
        assertThat(testSocial.getLinkedIn()).isEqualTo(DEFAULT_LINKED_IN);
        assertThat(testSocial.getInstagram()).isEqualTo(DEFAULT_INSTAGRAM);
        assertThat(testSocial.getGithub()).isEqualTo(DEFAULT_GITHUB);
        assertThat(testSocial.getGitlab()).isEqualTo(DEFAULT_GITLAB);
        assertThat(testSocial.getFlickr()).isEqualTo(DEFAULT_FLICKR);
        assertThat(testSocial.getGmail()).isEqualTo(DEFAULT_GMAIL);
        assertThat(testSocial.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSocial.getWebsite()).isEqualTo(DEFAULT_WEBSITE);
    }

    @Test
    @Transactional
    public void createSocialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = socialRepository.findAll().size();

        // Create the Social with an existing ID
        social.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSocialMockMvc.perform(post("/api/socials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(social)))
            .andExpect(status().isBadRequest());

        // Validate the Social in the database
        List<Social> socialList = socialRepository.findAll();
        assertThat(socialList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSocials() throws Exception {
        // Initialize the database
        socialRepository.saveAndFlush(social);

        // Get all the socialList
        restSocialMockMvc.perform(get("/api/socials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(social.getId().intValue())))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK)))
            .andExpect(jsonPath("$.[*].twitter").value(hasItem(DEFAULT_TWITTER)))
            .andExpect(jsonPath("$.[*].linkedIn").value(hasItem(DEFAULT_LINKED_IN)))
            .andExpect(jsonPath("$.[*].instagram").value(hasItem(DEFAULT_INSTAGRAM)))
            .andExpect(jsonPath("$.[*].github").value(hasItem(DEFAULT_GITHUB)))
            .andExpect(jsonPath("$.[*].gitlab").value(hasItem(DEFAULT_GITLAB)))
            .andExpect(jsonPath("$.[*].flickr").value(hasItem(DEFAULT_FLICKR)))
            .andExpect(jsonPath("$.[*].gmail").value(hasItem(DEFAULT_GMAIL)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE)));
    }
    
    @Test
    @Transactional
    public void getSocial() throws Exception {
        // Initialize the database
        socialRepository.saveAndFlush(social);

        // Get the social
        restSocialMockMvc.perform(get("/api/socials/{id}", social.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(social.getId().intValue()))
            .andExpect(jsonPath("$.facebook").value(DEFAULT_FACEBOOK))
            .andExpect(jsonPath("$.twitter").value(DEFAULT_TWITTER))
            .andExpect(jsonPath("$.linkedIn").value(DEFAULT_LINKED_IN))
            .andExpect(jsonPath("$.instagram").value(DEFAULT_INSTAGRAM))
            .andExpect(jsonPath("$.github").value(DEFAULT_GITHUB))
            .andExpect(jsonPath("$.gitlab").value(DEFAULT_GITLAB))
            .andExpect(jsonPath("$.flickr").value(DEFAULT_FLICKR))
            .andExpect(jsonPath("$.gmail").value(DEFAULT_GMAIL))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE));
    }

    @Test
    @Transactional
    public void getNonExistingSocial() throws Exception {
        // Get the social
        restSocialMockMvc.perform(get("/api/socials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSocial() throws Exception {
        // Initialize the database
        socialRepository.saveAndFlush(social);

        int databaseSizeBeforeUpdate = socialRepository.findAll().size();

        // Update the social
        Social updatedSocial = socialRepository.findById(social.getId()).get();
        // Disconnect from session so that the updates on updatedSocial are not directly saved in db
        em.detach(updatedSocial);
        updatedSocial
            .facebook(UPDATED_FACEBOOK)
            .twitter(UPDATED_TWITTER)
            .linkedIn(UPDATED_LINKED_IN)
            .instagram(UPDATED_INSTAGRAM)
            .github(UPDATED_GITHUB)
            .gitlab(UPDATED_GITLAB)
            .flickr(UPDATED_FLICKR)
            .gmail(UPDATED_GMAIL)
            .email(UPDATED_EMAIL)
            .website(UPDATED_WEBSITE);

        restSocialMockMvc.perform(put("/api/socials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSocial)))
            .andExpect(status().isOk());

        // Validate the Social in the database
        List<Social> socialList = socialRepository.findAll();
        assertThat(socialList).hasSize(databaseSizeBeforeUpdate);
        Social testSocial = socialList.get(socialList.size() - 1);
        assertThat(testSocial.getFacebook()).isEqualTo(UPDATED_FACEBOOK);
        assertThat(testSocial.getTwitter()).isEqualTo(UPDATED_TWITTER);
        assertThat(testSocial.getLinkedIn()).isEqualTo(UPDATED_LINKED_IN);
        assertThat(testSocial.getInstagram()).isEqualTo(UPDATED_INSTAGRAM);
        assertThat(testSocial.getGithub()).isEqualTo(UPDATED_GITHUB);
        assertThat(testSocial.getGitlab()).isEqualTo(UPDATED_GITLAB);
        assertThat(testSocial.getFlickr()).isEqualTo(UPDATED_FLICKR);
        assertThat(testSocial.getGmail()).isEqualTo(UPDATED_GMAIL);
        assertThat(testSocial.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSocial.getWebsite()).isEqualTo(UPDATED_WEBSITE);
    }

    @Test
    @Transactional
    public void updateNonExistingSocial() throws Exception {
        int databaseSizeBeforeUpdate = socialRepository.findAll().size();

        // Create the Social

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSocialMockMvc.perform(put("/api/socials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(social)))
            .andExpect(status().isBadRequest());

        // Validate the Social in the database
        List<Social> socialList = socialRepository.findAll();
        assertThat(socialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSocial() throws Exception {
        // Initialize the database
        socialRepository.saveAndFlush(social);

        int databaseSizeBeforeDelete = socialRepository.findAll().size();

        // Delete the social
        restSocialMockMvc.perform(delete("/api/socials/{id}", social.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Social> socialList = socialRepository.findAll();
        assertThat(socialList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
