package org.alljo.jandall.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Team.
 */
@Entity
@Table(name = "team")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "about")
    private String about;

    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @Column(name = "country")
    private String country;

    @Column(name = "province")
    private String province;

    @Column(name = "city")
    private String city;

    @Column(name = "address")
    private String address;

    @Column(name = "longitude")
    private Long longitude;

    @Column(name = "latitude")
    private Long latitude;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToOne
    @JoinColumn(unique = true)
    private Social social;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "team_members",
               joinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "members_id", referencedColumnName = "id"))
    private Set<User> members = new HashSet<>();

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

    public Team name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbout() {
        return about;
    }

    public Team about(String about) {
        this.about = about;
        return this;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public byte[] getImg() {
        return img;
    }

    public Team img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Team imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public String getCountry() {
        return country;
    }

    public Team country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public Team province(String province) {
        this.province = province;
        return this;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public Team city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public Team address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getLongitude() {
        return longitude;
    }

    public Team longitude(Long longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Long longitude) {
        this.longitude = longitude;
    }

    public Long getLatitude() {
        return latitude;
    }

    public Team latitude(Long latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Long latitude) {
        this.latitude = latitude;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Team logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Team logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Team createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Team updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Social getSocial() {
        return social;
    }

    public Team social(Social social) {
        this.social = social;
        return this;
    }

    public void setSocial(Social social) {
        this.social = social;
    }

    public Set<User> getMembers() {
        return members;
    }

    public Team members(Set<User> users) {
        this.members = users;
        return this;
    }

    public Team addMembers(User user) {
        this.members.add(user);
        return this;
    }

    public Team removeMembers(User user) {
        this.members.remove(user);
        return this;
    }

    public void setMembers(Set<User> users) {
        this.members = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Team)) {
            return false;
        }
        return id != null && id.equals(((Team) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", about='" + getAbout() + "'" +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + getImgContentType() + "'" +
            ", country='" + getCountry() + "'" +
            ", province='" + getProvince() + "'" +
            ", city='" + getCity() + "'" +
            ", address='" + getAddress() + "'" +
            ", longitude=" + getLongitude() +
            ", latitude=" + getLatitude() +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
