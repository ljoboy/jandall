import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrivacy } from 'app/shared/model/privacy.model';
import { PrivacyService } from './privacy.service';

@Component({
  templateUrl: './privacy-delete-dialog.component.html'
})
export class PrivacyDeleteDialogComponent {
  privacy?: IPrivacy;

  constructor(protected privacyService: PrivacyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.privacyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('privacyListModification');
      this.activeModal.close();
    });
  }
}
