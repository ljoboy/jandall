package org.alljo.jandall.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.alljo.jandall.web.rest.TestUtil;

public class ExtraInfoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtraInfo.class);
        ExtraInfo extraInfo1 = new ExtraInfo();
        extraInfo1.setId(1L);
        ExtraInfo extraInfo2 = new ExtraInfo();
        extraInfo2.setId(extraInfo1.getId());
        assertThat(extraInfo1).isEqualTo(extraInfo2);
        extraInfo2.setId(2L);
        assertThat(extraInfo1).isNotEqualTo(extraInfo2);
        extraInfo1.setId(null);
        assertThat(extraInfo1).isNotEqualTo(extraInfo2);
    }
}
