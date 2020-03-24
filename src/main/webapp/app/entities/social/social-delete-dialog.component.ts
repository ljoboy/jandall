import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISocial } from 'app/shared/model/social.model';
import { SocialService } from './social.service';

@Component({
  templateUrl: './social-delete-dialog.component.html'
})
export class SocialDeleteDialogComponent {
  social?: ISocial;

  constructor(protected socialService: SocialService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.socialService.delete(id).subscribe(() => {
      this.eventManager.broadcast('socialListModification');
      this.activeModal.close();
    });
  }
}
