package org.alljo.jandall.repository;

import org.alljo.jandall.domain.Team;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Team entity.
 */
@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    @Query(value = "select distinct team from Team team left join fetch team.members",
        countQuery = "select count(distinct team) from Team team")
    Page<Team> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct team from Team team left join fetch team.members")
    List<Team> findAllWithEagerRelationships();

    @Query("select team from Team team left join fetch team.members where team.id =:id")
    Optional<Team> findOneWithEagerRelationships(@Param("id") Long id);
}
