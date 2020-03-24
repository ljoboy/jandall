import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExtraInfo } from 'app/shared/model/extra-info.model';
import { ExtraInfoService } from './extra-info.service';
import { ExtraInfoDeleteDialogComponent } from './extra-info-delete-dialog.component';

@Component({
  selector: 'jhi-extra-info',
  templateUrl: './extra-info.component.html'
})
export class ExtraInfoComponent implements OnInit, OnDestroy {
  extraInfos?: IExtraInfo[];
  eventSubscriber?: Subscription;

  constructor(
    protected extraInfoService: ExtraInfoService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.extraInfoService.query().subscribe((res: HttpResponse<IExtraInfo[]>) => (this.extraInfos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExtraInfos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExtraInfo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInExtraInfos(): void {
    this.eventSubscriber = this.eventManager.subscribe('extraInfoListModification', () => this.loadAll());
  }

  delete(extraInfo: IExtraInfo): void {
    const modalRef = this.modalService.open(ExtraInfoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.extraInfo = extraInfo;
  }
}
