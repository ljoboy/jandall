import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISocial, Social } from 'app/shared/model/social.model';
import { SocialService } from './social.service';

@Component({
  selector: 'jhi-social-update',
  templateUrl: './social-update.component.html'
})
export class SocialUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    facebook: [],
    twitter: [],
    linkedIn: [],
    instagram: [],
    github: [],
    gitlab: [],
    flickr: [],
    gmail: [null, [Validators.pattern('^[a-z0-9](\\.?[a-z0-9]){5,}@g(oogle)?mail\\.com$')]],
    email: [null, [Validators.pattern('[\\w-]+@([\\w-]+\\.)+[\\w-]+')]],
    website: []
  });

  constructor(protected socialService: SocialService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ social }) => {
      this.updateForm(social);
    });
  }

  updateForm(social: ISocial): void {
    this.editForm.patchValue({
      id: social.id,
      facebook: social.facebook,
      twitter: social.twitter,
      linkedIn: social.linkedIn,
      instagram: social.instagram,
      github: social.github,
      gitlab: social.gitlab,
      flickr: social.flickr,
      gmail: social.gmail,
      email: social.email,
      website: social.website
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const social = this.createFromForm();
    if (social.id !== undefined) {
      this.subscribeToSaveResponse(this.socialService.update(social));
    } else {
      this.subscribeToSaveResponse(this.socialService.create(social));
    }
  }

  private createFromForm(): ISocial {
    return {
      ...new Social(),
      id: this.editForm.get(['id'])!.value,
      facebook: this.editForm.get(['facebook'])!.value,
      twitter: this.editForm.get(['twitter'])!.value,
      linkedIn: this.editForm.get(['linkedIn'])!.value,
      instagram: this.editForm.get(['instagram'])!.value,
      github: this.editForm.get(['github'])!.value,
      gitlab: this.editForm.get(['gitlab'])!.value,
      flickr: this.editForm.get(['flickr'])!.value,
      gmail: this.editForm.get(['gmail'])!.value,
      email: this.editForm.get(['email'])!.value,
      website: this.editForm.get(['website'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISocial>>): void {
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
