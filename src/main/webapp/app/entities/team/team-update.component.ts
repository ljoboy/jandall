import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ITeam, Team } from 'app/shared/model/team.model';
import { TeamService } from './team.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISocial } from 'app/shared/model/social.model';
import { SocialService } from 'app/entities/social/social.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = ISocial | IUser;

@Component({
  selector: 'jhi-team-update',
  templateUrl: './team-update.component.html'
})
export class TeamUpdateComponent implements OnInit {
  isSaving = false;
  socials: ISocial[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    about: [],
    img: [],
    imgContentType: [],
    country: [],
    province: [],
    city: [],
    address: [],
    longitude: [],
    latitude: [],
    logo: [],
    logoContentType: [],
    createdAt: [],
    updatedAt: [],
    social: [],
    members: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected teamService: TeamService,
    protected socialService: SocialService,
    protected userService: UserService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ team }) => {
      if (!team.id) {
        const today = moment().startOf('day');
        team.createdAt = today;
        team.updatedAt = today;
      }

      this.updateForm(team);

      this.socialService
        .query({ filter: 'team-is-null' })
        .pipe(
          map((res: HttpResponse<ISocial[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISocial[]) => {
          if (!team.social || !team.social.id) {
            this.socials = resBody;
          } else {
            this.socialService
              .find(team.social.id)
              .pipe(
                map((subRes: HttpResponse<ISocial>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISocial[]) => (this.socials = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(team: ITeam): void {
    this.editForm.patchValue({
      id: team.id,
      name: team.name,
      about: team.about,
      img: team.img,
      imgContentType: team.imgContentType,
      country: team.country,
      province: team.province,
      city: team.city,
      address: team.address,
      longitude: team.longitude,
      latitude: team.latitude,
      logo: team.logo,
      logoContentType: team.logoContentType,
      createdAt: team.createdAt ? team.createdAt.format(DATE_TIME_FORMAT) : null,
      updatedAt: team.updatedAt ? team.updatedAt.format(DATE_TIME_FORMAT) : null,
      social: team.social,
      members: team.members
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
    const team = this.createFromForm();
    if (team.id !== undefined) {
      this.subscribeToSaveResponse(this.teamService.update(team));
    } else {
      this.subscribeToSaveResponse(this.teamService.create(team));
    }
  }

  private createFromForm(): ITeam {
    return {
      ...new Team(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      about: this.editForm.get(['about'])!.value,
      imgContentType: this.editForm.get(['imgContentType'])!.value,
      img: this.editForm.get(['img'])!.value,
      country: this.editForm.get(['country'])!.value,
      province: this.editForm.get(['province'])!.value,
      city: this.editForm.get(['city'])!.value,
      address: this.editForm.get(['address'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      logoContentType: this.editForm.get(['logoContentType'])!.value,
      logo: this.editForm.get(['logo'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      updatedAt: this.editForm.get(['updatedAt'])!.value ? moment(this.editForm.get(['updatedAt'])!.value, DATE_TIME_FORMAT) : undefined,
      social: this.editForm.get(['social'])!.value,
      members: this.editForm.get(['members'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>): void {
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

  getSelected(selectedVals: IUser[], option: IUser): IUser {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
