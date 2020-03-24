package org.alljo.jandall.repository;

import org.alljo.jandall.domain.Social;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Social entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SocialRepository extends JpaRepository<Social, Long> {
}
