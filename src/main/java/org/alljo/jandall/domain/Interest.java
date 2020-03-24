package org.alljo.jandall.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Interest.
 */
@Entity
@Table(name = "interest")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Interest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "percentage")
    private Integer percentage;

    @ManyToOne
    @JsonIgnoreProperties("interests")
    private ExtraInfo extraInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Interest name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPercentage() {
        return percentage;
    }

    public Interest percentage(Integer percentage) {
        this.percentage = percentage;
        return this;
    }

    public void setPercentage(Integer percentage) {
        this.percentage = percentage;
    }

    public ExtraInfo getExtraInfo() {
        return extraInfo;
    }

    public Interest extraInfo(ExtraInfo extraInfo) {
        this.extraInfo = extraInfo;
        return this;
    }

    public void setExtraInfo(ExtraInfo extraInfo) {
        this.extraInfo = extraInfo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Interest)) {
            return false;
        }
        return id != null && id.equals(((Interest) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Interest{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", percentage=" + getPercentage() +
            "}";
    }
}
