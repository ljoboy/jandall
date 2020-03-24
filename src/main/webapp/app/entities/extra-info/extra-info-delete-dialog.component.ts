import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtraInfo } from 'app/shared/model/extra-info.model';
import { ExtraInfoService } from './extra-info.service';

@Component({
  templateUrl: './extra-info-delete-dialog.component.html'
})
export class ExtraInfoDeleteDialogComponent {
  extraInfo?: IExtraInfo;

  constructor(protected extraInfoService: ExtraInfoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.extraInfoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('extraInfoListModification');
      this.activeModal.close();
    });
  }
}
