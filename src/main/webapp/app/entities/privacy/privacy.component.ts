import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrivacy } from 'app/shared/model/privacy.model';
import { PrivacyService } from './privacy.service';
import { PrivacyDeleteDialogComponent } from './privacy-delete-dialog.component';

@Component({
  selector: 'jhi-privacy',
  templateUrl: './privacy.component.html'
})
export class PrivacyComponent implements OnInit, OnDestroy {
  privacies?: IPrivacy[];
  eventSubscriber?: Subscription;

  constructor(protected privacyService: PrivacyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.privacyService.query().subscribe((res: HttpResponse<IPrivacy[]>) => (this.privacies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPrivacies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPrivacy): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPrivacies(): void {
    this.eventSubscriber = this.eventManager.subscribe('privacyListModification', () => this.loadAll());
  }

  delete(privacy: IPrivacy): void {
    const modalRef = this.modalService.open(PrivacyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.privacy = privacy;
  }
}
