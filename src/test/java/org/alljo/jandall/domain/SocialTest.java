package org.alljo.jandall.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.alljo.jandall.web.rest.TestUtil;

public class SocialTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Social.class);
        Social social1 = new Social();
        social1.setId(1L);
        Social social2 = new Social();
        social2.setId(social1.getId());
        assertThat(social1).isEqualTo(social2);
        social2.setId(2L);
        assertThat(social1).isNotEqualTo(social2);
        social1.setId(null);
        assertThat(social1).isNotEqualTo(social2);
    }
}
