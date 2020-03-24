import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISocial } from 'app/shared/model/social.model';
import { SocialService } from './social.service';
import { SocialDeleteDialogComponent } from './social-delete-dialog.component';

@Component({
  selector: 'jhi-social',
  templateUrl: './social.component.html'
})
export class SocialComponent implements OnInit, OnDestroy {
  socials?: ISocial[];
  eventSubscriber?: Subscription;

  constructor(protected socialService: SocialService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.socialService.query().subscribe((res: HttpResponse<ISocial[]>) => (this.socials = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSocials();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISocial): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSocials(): void {
    this.eventSubscriber = this.eventManager.subscribe('socialListModification', () => this.loadAll());
  }

  delete(social: ISocial): void {
    const modalRef = this.modalService.open(SocialDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.social = social;
  }
}
