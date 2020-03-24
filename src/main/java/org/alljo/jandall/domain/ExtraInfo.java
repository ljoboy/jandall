package org.alljo.jandall.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A ExtraInfo.
 */
@Entity
@Table(name = "extra_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExtraInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "bdate")
    private LocalDate bdate;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "bio")
    private String bio;

    @Column(name = "country")
    private String country;

    @Column(name = "province")
    private String province;

    @Column(name = "city")
    private String city;

    @Column(name = "address")
    private String address;

    @Column(name = "title")
    private String title;

    @Pattern(regexp = "^\\+(?:[0-9] ?){6,14}[0-9]$")
    @Column(name = "mobile")
    private String mobile;

    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private Social social;

    @OneToOne
    @JoinColumn(unique = true)
    private Privacy privacy;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "extraInfo")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Interest> interests = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBdate() {
        return bdate;
    }

    public ExtraInfo bdate(LocalDate bdate) {
        this.bdate = bdate;
        return this;
    }

    public void setBdate(LocalDate bdate) {
        this.bdate = bdate;
    }

    public String getOccupation() {
        return occupation;
    }

    public ExtraInfo occupation(String occupation) {
        this.occupation = occupation;
        return this;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getBio() {
        return bio;
    }

    public ExtraInfo bio(String bio) {
        this.bio = bio;
        return this;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getCountry() {
        return country;
    }

    public ExtraInfo country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public ExtraInfo province(String province) {
        this.province = province;
        return this;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public ExtraInfo city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public ExtraInfo address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTitle() {
        return title;
    }

    public ExtraInfo title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMobile() {
        return mobile;
    }

    public ExtraInfo mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public byte[] getImg() {
        return img;
    }

    public ExtraInfo img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public ExtraInfo imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public Social getSocial() {
        return social;
    }

    public ExtraInfo social(Social social) {
        this.social = social;
        return this;
    }

    public void setSocial(Social social) {
        this.social = social;
    }

    public Privacy getPrivacy() {
        return privacy;
    }

    public ExtraInfo privacy(Privacy privacy) {
        this.privacy = privacy;
        return this;
    }

    public void setPrivacy(Privacy privacy) {
        this.privacy = privacy;
    }

    public User getUser() {
        return user;
    }

    public ExtraInfo user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Interest> getInterests() {
        return interests;
    }

    public ExtraInfo interests(Set<Interest> interests) {
        this.interests = interests;
        return this;
    }

    public ExtraInfo addInterests(Interest interest) {
        this.interests.add(interest);
        interest.setExtraInfo(this);
        return this;
    }

    public ExtraInfo removeInterests(Interest interest) {
        this.interests.remove(interest);
        interest.setExtraInfo(null);
        return this;
    }

    public void setInterests(Set<Interest> interests) {
        this.interests = interests;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExtraInfo)) {
            return false;
        }
        return id != null && id.equals(((ExtraInfo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ExtraInfo{" +
            "id=" + getId() +
            ", bdate='" + getBdate() + "'" +
            ", occupation='" + getOccupation() + "'" +
            ", bio='" + getBio() + "'" +
            ", country='" + getCountry() + "'" +
            ", province='" + getProvince() + "'" +
            ", city='" + getCity() + "'" +
            ", address='" + getAddress() + "'" +
            ", title='" + getTitle() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + getImgContentType() + "'" +
            "}";
    }
}
