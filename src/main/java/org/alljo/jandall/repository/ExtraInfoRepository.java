package org.alljo.jandall.repository;

import org.alljo.jandall.domain.ExtraInfo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ExtraInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtraInfoRepository extends JpaRepository<ExtraInfo, Long> {
}
