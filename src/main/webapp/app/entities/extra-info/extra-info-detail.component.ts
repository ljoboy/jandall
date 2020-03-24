import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IExtraInfo } from 'app/shared/model/extra-info.model';

@Component({
  selector: 'jhi-extra-info-detail',
  templateUrl: './extra-info-detail.component.html'
})
export class ExtraInfoDetailComponent implements OnInit {
  extraInfo: IExtraInfo | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ extraInfo }) => (this.extraInfo = extraInfo));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
