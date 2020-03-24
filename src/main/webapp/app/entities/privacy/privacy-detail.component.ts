import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrivacy } from 'app/shared/model/privacy.model';

@Component({
  selector: 'jhi-privacy-detail',
  templateUrl: './privacy-detail.component.html'
})
export class PrivacyDetailComponent implements OnInit {
  privacy: IPrivacy | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ privacy }) => (this.privacy = privacy));
  }

  previousState(): void {
    window.history.back();
  }
}
