package org.alljo.jandall.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Social.
 */
@Entity
@Table(name = "social")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Social implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "twitter")
    private String twitter;

    @Column(name = "linked_in")
    private String linkedIn;

    @Column(name = "instagram")
    private String instagram;

    @Column(name = "github")
    private String github;

    @Column(name = "gitlab")
    private String gitlab;

    @Column(name = "flickr")
    private String flickr;

    @Pattern(regexp = "^[a-z0-9](\\.?[a-z0-9]){5,}@g(oogle)?mail\\.com$")
    @Column(name = "gmail")
    private String gmail;

    @Pattern(regexp = "[\\w-]+@([\\w-]+\\.)+[\\w-]+")
    @Column(name = "email")
    private String email;

    @Column(name = "website")
    private String website;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFacebook() {
        return facebook;
    }

    public Social facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getTwitter() {
        return twitter;
    }

    public Social twitter(String twitter) {
        this.twitter = twitter;
        return this;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getLinkedIn() {
        return linkedIn;
    }

    public Social linkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
        return this;
    }

    public void setLinkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
    }

    public String getInstagram() {
        return instagram;
    }

    public Social instagram(String instagram) {
        this.instagram = instagram;
        return this;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getGithub() {
        return github;
    }

    public Social github(String github) {
        this.github = github;
        return this;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getGitlab() {
        return gitlab;
    }

    public Social gitlab(String gitlab) {
        this.gitlab = gitlab;
        return this;
    }

    public void setGitlab(String gitlab) {
        this.gitlab = gitlab;
    }

    public String getFlickr() {
        return flickr;
    }

    public Social flickr(String flickr) {
        this.flickr = flickr;
        return this;
    }

    public void setFlickr(String flickr) {
        this.flickr = flickr;
    }

    public String getGmail() {
        return gmail;
    }

    public Social gmail(String gmail) {
        this.gmail = gmail;
        return this;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getEmail() {
        return email;
    }

    public Social email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public Social website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Social)) {
            return false;
        }
        return id != null && id.equals(((Social) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Social{" +
            "id=" + getId() +
            ", facebook='" + getFacebook() + "'" +
            ", twitter='" + getTwitter() + "'" +
            ", linkedIn='" + getLinkedIn() + "'" +
            ", instagram='" + getInstagram() + "'" +
            ", github='" + getGithub() + "'" +
            ", gitlab='" + getGitlab() + "'" +
            ", flickr='" + getFlickr() + "'" +
            ", gmail='" + getGmail() + "'" +
            ", email='" + getEmail() + "'" +
            ", website='" + getWebsite() + "'" +
            "}";
    }
}
