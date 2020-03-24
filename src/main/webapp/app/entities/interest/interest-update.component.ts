import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInterest, Interest } from 'app/shared/model/interest.model';
import { InterestService } from './interest.service';
import { IExtraInfo } from 'app/shared/model/extra-info.model';
import { ExtraInfoService } from 'app/entities/extra-info/extra-info.service';

@Component({
  selector: 'jhi-interest-update',
  templateUrl: './interest-update.component.html'
})
export class InterestUpdateComponent implements OnInit {
  isSaving = false;
  extrainfos: IExtraInfo[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    percentage: [],
    extraInfo: []
  });

  constructor(
    protected interestService: InterestService,
    protected extraInfoService: ExtraInfoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ interest }) => {
      this.updateForm(interest);

      this.extraInfoService.query().subscribe((res: HttpResponse<IExtraInfo[]>) => (this.extrainfos = res.body || []));
    });
  }

  updateForm(interest: IInterest): void {
    this.editForm.patchValue({
      id: interest.id,
      name: interest.name,
      percentage: interest.percentage,
      extraInfo: interest.extraInfo
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const interest = this.createFromForm();
    if (interest.id !== undefined) {
      this.subscribeToSaveResponse(this.interestService.update(interest));
    } else {
      this.subscribeToSaveResponse(this.interestService.create(interest));
    }
  }

  private createFromForm(): IInterest {
    return {
      ...new Interest(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      percentage: this.editForm.get(['percentage'])!.value,
      extraInfo: this.editForm.get(['extraInfo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInterest>>): void {
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

  trackById(index: number, item: IExtraInfo): any {
    return item.id;
  }
}
