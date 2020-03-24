package org.alljo.jandall.repository;

import org.alljo.jandall.domain.Privacy;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Privacy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrivacyRepository extends JpaRepository<Privacy, Long> {
}
