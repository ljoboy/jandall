package org.alljo.jandall.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.alljo.jandall.web.rest.TestUtil;

public class PrivacyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Privacy.class);
        Privacy privacy1 = new Privacy();
        privacy1.setId(1L);
        Privacy privacy2 = new Privacy();
        privacy2.setId(privacy1.getId());
        assertThat(privacy1).isEqualTo(privacy2);
        privacy2.setId(2L);
        assertThat(privacy1).isNotEqualTo(privacy2);
        privacy1.setId(null);
        assertThat(privacy1).isNotEqualTo(privacy2);
    }
}
