package org.alljo.jandall.web.rest;

import org.alljo.jandall.JandallApp;
import org.alljo.jandall.domain.ExtraInfo;
import org.alljo.jandall.repository.ExtraInfoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ExtraInfoResource} REST controller.
 */
@SpringBootTest(classes = JandallApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ExtraInfoResourceIT {

    private static final LocalDate DEFAULT_BDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BDATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_OCCUPATION = "AAAAAAAAAA";
    private static final String UPDATED_OCCUPATION = "BBBBBBBBBB";

    private static final String DEFAULT_BIO = "AAAAAAAAAA";
    private static final String UPDATED_BIO = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCE = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE = "+799491 4 17";
    private static final String UPDATED_MOBILE = "+6 8 8 405 4 4 60 0";

    private static final byte[] DEFAULT_IMG = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMG = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMG_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMG_CONTENT_TYPE = "image/png";

    @Autowired
    private ExtraInfoRepository extraInfoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExtraInfoMockMvc;

    private ExtraInfo extraInfo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtraInfo createEntity(EntityManager em) {
        ExtraInfo extraInfo = new ExtraInfo()
            .bdate(DEFAULT_BDATE)
            .occupation(DEFAULT_OCCUPATION)
            .bio(DEFAULT_BIO)
            .country(DEFAULT_COUNTRY)
            .province(DEFAULT_PROVINCE)
            .city(DEFAULT_CITY)
            .address(DEFAULT_ADDRESS)
            .title(DEFAULT_TITLE)
            .mobile(DEFAULT_MOBILE)
            .img(DEFAULT_IMG)
            .imgContentType(DEFAULT_IMG_CONTENT_TYPE);
        return extraInfo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtraInfo createUpdatedEntity(EntityManager em) {
        ExtraInfo extraInfo = new ExtraInfo()
            .bdate(UPDATED_BDATE)
            .occupation(UPDATED_OCCUPATION)
            .bio(UPDATED_BIO)
            .country(UPDATED_COUNTRY)
            .province(UPDATED_PROVINCE)
            .city(UPDATED_CITY)
            .address(UPDATED_ADDRESS)
            .title(UPDATED_TITLE)
            .mobile(UPDATED_MOBILE)
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE);
        return extraInfo;
    }

    @BeforeEach
    public void initTest() {
        extraInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createExtraInfo() throws Exception {
        int databaseSizeBeforeCreate = extraInfoRepository.findAll().size();

        // Create the ExtraInfo
        restExtraInfoMockMvc.perform(post("/api/extra-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(extraInfo)))
            .andExpect(status().isCreated());

        // Validate the ExtraInfo in the database
        List<ExtraInfo> extraInfoList = extraInfoRepository.findAll();
        assertThat(extraInfoList).hasSize(databaseSizeBeforeCreate + 1);
        ExtraInfo testExtraInfo = extraInfoList.get(extraInfoList.size() - 1);
        assertThat(testExtraInfo.getBdate()).isEqualTo(DEFAULT_BDATE);
        assertThat(testExtraInfo.getOccupation()).isEqualTo(DEFAULT_OCCUPATION);
        assertThat(testExtraInfo.getBio()).isEqualTo(DEFAULT_BIO);
        assertThat(testExtraInfo.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testExtraInfo.getProvince()).isEqualTo(DEFAULT_PROVINCE);
        assertThat(testExtraInfo.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testExtraInfo.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testExtraInfo.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testExtraInfo.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testExtraInfo.getImg()).isEqualTo(DEFAULT_IMG);
        assertThat(testExtraInfo.getImgContentType()).isEqualTo(DEFAULT_IMG_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createExtraInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = extraInfoRepository.findAll().size();

        // Create the ExtraInfo with an existing ID
        extraInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtraInfoMockMvc.perform(post("/api/extra-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(extraInfo)))
            .andExpect(status().isBadRequest());

        // Validate the ExtraInfo in the database
        List<ExtraInfo> extraInfoList = extraInfoRepository.findAll();
        assertThat(extraInfoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExtraInfos() throws Exception {
        // Initialize the database
        extraInfoRepository.saveAndFlush(extraInfo);

        // Get all the extraInfoList
        restExtraInfoMockMvc.perform(get("/api/extra-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extraInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].bdate").value(hasItem(DEFAULT_BDATE.toString())))
            .andExpect(jsonPath("$.[*].occupation").value(hasItem(DEFAULT_OCCUPATION)))
            .andExpect(jsonPath("$.[*].bio").value(hasItem(DEFAULT_BIO)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].province").value(hasItem(DEFAULT_PROVINCE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE)))
            .andExpect(jsonPath("$.[*].imgContentType").value(hasItem(DEFAULT_IMG_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].img").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMG))));
    }
    
    @Test
    @Transactional
    public void getExtraInfo() throws Exception {
        // Initialize the database
        extraInfoRepository.saveAndFlush(extraInfo);

        // Get the extraInfo
        restExtraInfoMockMvc.perform(get("/api/extra-infos/{id}", extraInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(extraInfo.getId().intValue()))
            .andExpect(jsonPath("$.bdate").value(DEFAULT_BDATE.toString()))
            .andExpect(jsonPath("$.occupation").value(DEFAULT_OCCUPATION))
            .andExpect(jsonPath("$.bio").value(DEFAULT_BIO))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.province").value(DEFAULT_PROVINCE))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE))
            .andExpect(jsonPath("$.imgContentType").value(DEFAULT_IMG_CONTENT_TYPE))
            .andExpect(jsonPath("$.img").value(Base64Utils.encodeToString(DEFAULT_IMG)));
    }

    @Test
    @Transactional
    public void getNonExistingExtraInfo() throws Exception {
        // Get the extraInfo
        restExtraInfoMockMvc.perform(get("/api/extra-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExtraInfo() throws Exception {
        // Initialize the database
        extraInfoRepository.saveAndFlush(extraInfo);

        int databaseSizeBeforeUpdate = extraInfoRepository.findAll().size();

        // Update the extraInfo
        ExtraInfo updatedExtraInfo = extraInfoRepository.findById(extraInfo.getId()).get();
        // Disconnect from session so that the updates on updatedExtraInfo are not directly saved in db
        em.detach(updatedExtraInfo);
        updatedExtraInfo
            .bdate(UPDATED_BDATE)
            .occupation(UPDATED_OCCUPATION)
            .bio(UPDATED_BIO)
            .country(UPDATED_COUNTRY)
            .province(UPDATED_PROVINCE)
            .city(UPDATED_CITY)
            .address(UPDATED_ADDRESS)
            .title(UPDATED_TITLE)
            .mobile(UPDATED_MOBILE)
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE);

        restExtraInfoMockMvc.perform(put("/api/extra-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExtraInfo)))
            .andExpect(status().isOk());

        // Validate the ExtraInfo in the database
        List<ExtraInfo> extraInfoList = extraInfoRepository.findAll();
        assertThat(extraInfoList).hasSize(databaseSizeBeforeUpdate);
        ExtraInfo testExtraInfo = extraInfoList.get(extraInfoList.size() - 1);
        assertThat(testExtraInfo.getBdate()).isEqualTo(UPDATED_BDATE);
        assertThat(testExtraInfo.getOccupation()).isEqualTo(UPDATED_OCCUPATION);
        assertThat(testExtraInfo.getBio()).isEqualTo(UPDATED_BIO);
        assertThat(testExtraInfo.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testExtraInfo.getProvince()).isEqualTo(UPDATED_PROVINCE);
        assertThat(testExtraInfo.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testExtraInfo.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testExtraInfo.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testExtraInfo.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testExtraInfo.getImg()).isEqualTo(UPDATED_IMG);
        assertThat(testExtraInfo.getImgContentType()).isEqualTo(UPDATED_IMG_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingExtraInfo() throws Exception {
        int databaseSizeBeforeUpdate = extraInfoRepository.findAll().size();

        // Create the ExtraInfo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtraInfoMockMvc.perform(put("/api/extra-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(extraInfo)))
            .andExpect(status().isBadRequest());

        // Validate the ExtraInfo in the database
        List<ExtraInfo> extraInfoList = extraInfoRepository.findAll();
        assertThat(extraInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExtraInfo() throws Exception {
        // Initialize the database
        extraInfoRepository.saveAndFlush(extraInfo);

        int databaseSizeBeforeDelete = extraInfoRepository.findAll().size();

        // Delete the extraInfo
        restExtraInfoMockMvc.perform(delete("/api/extra-infos/{id}", extraInfo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExtraInfo> extraInfoList = extraInfoRepository.findAll();
        assertThat(extraInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
