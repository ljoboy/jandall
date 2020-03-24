package org.alljo.jandall.web.rest;

import org.alljo.jandall.JandallApp;
import org.alljo.jandall.domain.Team;
import org.alljo.jandall.repository.TeamRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TeamResource} REST controller.
 */
@SpringBootTest(classes = JandallApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class TeamResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ABOUT = "AAAAAAAAAA";
    private static final String UPDATED_ABOUT = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMG = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMG = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMG_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMG_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCE = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final Long DEFAULT_LONGITUDE = 1L;
    private static final Long UPDATED_LONGITUDE = 2L;

    private static final Long DEFAULT_LATITUDE = 1L;
    private static final Long UPDATED_LATITUDE = 2L;

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TeamRepository teamRepository;

    @Mock
    private TeamRepository teamRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTeamMockMvc;

    private Team team;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Team createEntity(EntityManager em) {
        Team team = new Team()
            .name(DEFAULT_NAME)
            .about(DEFAULT_ABOUT)
            .img(DEFAULT_IMG)
            .imgContentType(DEFAULT_IMG_CONTENT_TYPE)
            .country(DEFAULT_COUNTRY)
            .province(DEFAULT_PROVINCE)
            .city(DEFAULT_CITY)
            .address(DEFAULT_ADDRESS)
            .longitude(DEFAULT_LONGITUDE)
            .latitude(DEFAULT_LATITUDE)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return team;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Team createUpdatedEntity(EntityManager em) {
        Team team = new Team()
            .name(UPDATED_NAME)
            .about(UPDATED_ABOUT)
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE)
            .country(UPDATED_COUNTRY)
            .province(UPDATED_PROVINCE)
            .city(UPDATED_CITY)
            .address(UPDATED_ADDRESS)
            .longitude(UPDATED_LONGITUDE)
            .latitude(UPDATED_LATITUDE)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return team;
    }

    @BeforeEach
    public void initTest() {
        team = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeam() throws Exception {
        int databaseSizeBeforeCreate = teamRepository.findAll().size();

        // Create the Team
        restTeamMockMvc.perform(post("/api/teams")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(team)))
            .andExpect(status().isCreated());

        // Validate the Team in the database
        List<Team> teamList = teamRepository.findAll();
        assertThat(teamList).hasSize(databaseSizeBeforeCreate + 1);
        Team testTeam = teamList.get(teamList.size() - 1);
        assertThat(testTeam.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTeam.getAbout()).isEqualTo(DEFAULT_ABOUT);
        assertThat(testTeam.getImg()).isEqualTo(DEFAULT_IMG);
        assertThat(testTeam.getImgContentType()).isEqualTo(DEFAULT_IMG_CONTENT_TYPE);
        assertThat(testTeam.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testTeam.getProvince()).isEqualTo(DEFAULT_PROVINCE);
        assertThat(testTeam.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testTeam.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testTeam.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testTeam.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testTeam.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testTeam.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);
        assertThat(testTeam.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testTeam.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createTeamWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teamRepository.findAll().size();

        // Create the Team with an existing ID
        team.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeamMockMvc.perform(post("/api/teams")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(team)))
            .andExpect(status().isBadRequest());

        // Validate the Team in the database
        List<Team> teamList = teamRepository.findAll();
        assertThat(teamList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTeams() throws Exception {
        // Initialize the database
        teamRepository.saveAndFlush(team);

        // Get all the teamList
        restTeamMockMvc.perform(get("/api/teams?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(team.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].about").value(hasItem(DEFAULT_ABOUT)))
            .andExpect(jsonPath("$.[*].imgContentType").value(hasItem(DEFAULT_IMG_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].img").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMG))))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].province").value(hasItem(DEFAULT_PROVINCE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.intValue())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.intValue())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTeamsWithEagerRelationshipsIsEnabled() throws Exception {
        TeamResource teamResource = new TeamResource(teamRepositoryMock);
        when(teamRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTeamMockMvc.perform(get("/api/teams?eagerload=true"))
            .andExpect(status().isOk());

        verify(teamRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTeamsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TeamResource teamResource = new TeamResource(teamRepositoryMock);
        when(teamRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTeamMockMvc.perform(get("/api/teams?eagerload=true"))
            .andExpect(status().isOk());

        verify(teamRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTeam() throws Exception {
        // Initialize the database
        teamRepository.saveAndFlush(team);

        // Get the team
        restTeamMockMvc.perform(get("/api/teams/{id}", team.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(team.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.about").value(DEFAULT_ABOUT))
            .andExpect(jsonPath("$.imgContentType").value(DEFAULT_IMG_CONTENT_TYPE))
            .andExpect(jsonPath("$.img").value(Base64Utils.encodeToString(DEFAULT_IMG)))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.province").value(DEFAULT_PROVINCE))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.intValue()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.intValue()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTeam() throws Exception {
        // Get the team
        restTeamMockMvc.perform(get("/api/teams/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeam() throws Exception {
        // Initialize the database
        teamRepository.saveAndFlush(team);

        int databaseSizeBeforeUpdate = teamRepository.findAll().size();

        // Update the team
        Team updatedTeam = teamRepository.findById(team.getId()).get();
        // Disconnect from session so that the updates on updatedTeam are not directly saved in db
        em.detach(updatedTeam);
        updatedTeam
            .name(UPDATED_NAME)
            .about(UPDATED_ABOUT)
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE)
            .country(UPDATED_COUNTRY)
            .province(UPDATED_PROVINCE)
            .city(UPDATED_CITY)
            .address(UPDATED_ADDRESS)
            .longitude(UPDATED_LONGITUDE)
            .latitude(UPDATED_LATITUDE)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restTeamMockMvc.perform(put("/api/teams")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeam)))
            .andExpect(status().isOk());

        // Validate the Team in the database
        List<Team> teamList = teamRepository.findAll();
        assertThat(teamList).hasSize(databaseSizeBeforeUpdate);
        Team testTeam = teamList.get(teamList.size() - 1);
        assertThat(testTeam.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTeam.getAbout()).isEqualTo(UPDATED_ABOUT);
        assertThat(testTeam.getImg()).isEqualTo(UPDATED_IMG);
        assertThat(testTeam.getImgContentType()).isEqualTo(UPDATED_IMG_CONTENT_TYPE);
        assertThat(testTeam.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testTeam.getProvince()).isEqualTo(UPDATED_PROVINCE);
        assertThat(testTeam.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testTeam.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testTeam.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testTeam.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testTeam.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testTeam.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);
        assertThat(testTeam.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTeam.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingTeam() throws Exception {
        int databaseSizeBeforeUpdate = teamRepository.findAll().size();

        // Create the Team

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeamMockMvc.perform(put("/api/teams")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(team)))
            .andExpect(status().isBadRequest());

        // Validate the Team in the database
        List<Team> teamList = teamRepository.findAll();
        assertThat(teamList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeam() throws Exception {
        // Initialize the database
        teamRepository.saveAndFlush(team);

        int databaseSizeBeforeDelete = teamRepository.findAll().size();

        // Delete the team
        restTeamMockMvc.perform(delete("/api/teams/{id}", team.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Team> teamList = teamRepository.findAll();
        assertThat(teamList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
