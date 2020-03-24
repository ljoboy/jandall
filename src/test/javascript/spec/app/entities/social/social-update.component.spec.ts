import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JandallTestModule } from '../../../test.module';
import { SocialUpdateComponent } from 'app/entities/social/social-update.component';
import { SocialService } from 'app/entities/social/social.service';
import { Social } from 'app/shared/model/social.model';

describe('Component Tests', () => {
  describe('Social Management Update Component', () => {
    let comp: SocialUpdateComponent;
    let fixture: ComponentFixture<SocialUpdateComponent>;
    let service: SocialService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JandallTestModule],
        declarations: [SocialUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SocialUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SocialUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SocialService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Social(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Social();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
