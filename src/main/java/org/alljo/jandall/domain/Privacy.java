package org.alljo.jandall.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Privacy.
 */
@Entity
@Table(name = "privacy")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Privacy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "bdate")
    private Boolean bdate;

    @Column(name = "year")
    private Boolean year;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isBdate() {
        return bdate;
    }

    public Privacy bdate(Boolean bdate) {
        this.bdate = bdate;
        return this;
    }

    public void setBdate(Boolean bdate) {
        this.bdate = bdate;
    }

    public Boolean isYear() {
        return year;
    }

    public Privacy year(Boolean year) {
        this.year = year;
        return this;
    }

    public void setYear(Boolean year) {
        this.year = year;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Privacy)) {
            return false;
        }
        return id != null && id.equals(((Privacy) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Privacy{" +
            "id=" + getId() +
            ", bdate='" + isBdate() + "'" +
            ", year='" + isYear() + "'" +
            "}";
    }
}
