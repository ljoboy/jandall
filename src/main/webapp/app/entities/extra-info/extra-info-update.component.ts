import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IExtraInfo, ExtraInfo } from 'app/shared/model/extra-info.model';
import { ExtraInfoService } from './extra-info.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISocial } from 'app/shared/model/social.model';
import { SocialService } from 'app/entities/social/social.service';
import { IPrivacy } from 'app/shared/model/privacy.model';
import { PrivacyService } from 'app/entities/privacy/privacy.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = ISocial | IPrivacy | IUser;

@Component({
  selector: 'jhi-extra-info-update',
  templateUrl: './extra-info-update.component.html'
})
export class ExtraInfoUpdateComponent implements OnInit {
  isSaving = false;
  socials: ISocial[] = [];
  privacies: IPrivacy[] = [];
  users: IUser[] = [];
  bdateDp: any;

  editForm = this.fb.group({
    id: [],
    bdate: [],
    occupation: [],
    bio: [],
    country: [],
    province: [],
    city: [],
    address: [],
    title: [],
    mobile: [null, [Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$')]],
    img: [],
    imgContentType: [],
    social: [],
    privacy: [],
    user: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected extraInfoService: ExtraInfoService,
    protected socialService: SocialService,
    protected privacyService: PrivacyService,
    protected userService: UserService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ extraInfo }) => {
      this.updateForm(extraInfo);

      this.socialService
        .query({ filter: 'extrainfo-is-null' })
        .pipe(
          map((res: HttpResponse<ISocial[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISocial[]) => {
          if (!extraInfo.social || !extraInfo.social.id) {
            this.socials = resBody;
          } else {
            this.socialService
              .find(extraInfo.social.id)
              .pipe(
                map((subRes: HttpResponse<ISocial>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISocial[]) => (this.socials = concatRes));
          }
        });

      this.privacyService
        .query({ filter: 'extrainfo-is-null' })
        .pipe(
          map((res: HttpResponse<IPrivacy[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPrivacy[]) => {
          if (!extraInfo.privacy || !extraInfo.privacy.id) {
            this.privacies = resBody;
          } else {
            this.privacyService
              .find(extraInfo.privacy.id)
              .pipe(
                map((subRes: HttpResponse<IPrivacy>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPrivacy[]) => (this.privacies = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(extraInfo: IExtraInfo): void {
    this.editForm.patchValue({
      id: extraInfo.id,
      bdate: extraInfo.bdate,
      occupation: extraInfo.occupation,
      bio: extraInfo.bio,
      country: extraInfo.country,
      province: extraInfo.province,
      city: extraInfo.city,
      address: extraInfo.address,
      title: extraInfo.title,
      mobile: extraInfo.mobile,
      img: extraInfo.img,
      imgContentType: extraInfo.imgContentType,
      social: extraInfo.social,
      privacy: extraInfo.privacy,
      user: extraInfo.user
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('jandallApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const extraInfo = this.createFromForm();
    if (extraInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.extraInfoService.update(extraInfo));
    } else {
      this.subscribeToSaveResponse(this.extraInfoService.create(extraInfo));
    }
  }

  private createFromForm(): IExtraInfo {
    return {
      ...new ExtraInfo(),
      id: this.editForm.get(['id'])!.value,
      bdate: this.editForm.get(['bdate'])!.value,
      occupation: this.editForm.get(['occupation'])!.value,
      bio: this.editForm.get(['bio'])!.value,
      country: this.editForm.get(['country'])!.value,
      province: this.editForm.get(['province'])!.value,
      city: this.editForm.get(['city'])!.value,
      address: this.editForm.get(['address'])!.value,
      title: this.editForm.get(['title'])!.value,
      mobile: this.editForm.get(['mobile'])!.value,
      imgContentType: this.editForm.get(['imgContentType'])!.value,
      img: this.editForm.get(['img'])!.value,
      social: this.editForm.get(['social'])!.value,
      privacy: this.editForm.get(['privacy'])!.value,
      user: this.editForm.get(['user'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtraInfo>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
