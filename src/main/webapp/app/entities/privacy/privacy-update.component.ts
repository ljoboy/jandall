import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPrivacy, Privacy } from 'app/shared/model/privacy.model';
import { PrivacyService } from './privacy.service';

@Component({
  selector: 'jhi-privacy-update',
  templateUrl: './privacy-update.component.html'
})
export class PrivacyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    bdate: [],
    year: []
  });

  constructor(protected privacyService: PrivacyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ privacy }) => {
      this.updateForm(privacy);
    });
  }

  updateForm(privacy: IPrivacy): void {
    this.editForm.patchValue({
      id: privacy.id,
      bdate: privacy.bdate,
      year: privacy.year
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const privacy = this.createFromForm();
    if (privacy.id !== undefined) {
      this.subscribeToSaveResponse(this.privacyService.update(privacy));
    } else {
      this.subscribeToSaveResponse(this.privacyService.create(privacy));
    }
  }

  private createFromForm(): IPrivacy {
    return {
      ...new Privacy(),
      id: this.editForm.get(['id'])!.value,
      bdate: this.editForm.get(['bdate'])!.value,
      year: this.editForm.get(['year'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrivacy>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
