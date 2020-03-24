import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISocial } from 'app/shared/model/social.model';

@Component({
  selector: 'jhi-social-detail',
  templateUrl: './social-detail.component.html'
})
export class SocialDetailComponent implements OnInit {
  social: ISocial | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ social }) => (this.social = social));
  }

  previousState(): void {
    window.history.back();
  }
}
