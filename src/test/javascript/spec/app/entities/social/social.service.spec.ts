import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SocialService } from 'app/entities/social/social.service';
import { ISocial, Social } from 'app/shared/model/social.model';

describe('Service Tests', () => {
  describe('Social Service', () => {
    let injector: TestBed;
    let service: SocialService;
    let httpMock: HttpTestingController;
    let elemDefault: ISocial;
    let expectedResult: ISocial | ISocial[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SocialService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Social(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Social', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Social()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Social', () => {
        const returnedFromService = Object.assign(
          {
            facebook: 'BBBBBB',
            twitter: 'BBBBBB',
            linkedIn: 'BBBBBB',
            instagram: 'BBBBBB',
            github: 'BBBBBB',
            gitlab: 'BBBBBB',
            flickr: 'BBBBBB',
            gmail: 'BBBBBB',
            email: 'BBBBBB',
            website: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Social', () => {
        const returnedFromService = Object.assign(
          {
            facebook: 'BBBBBB',
            twitter: 'BBBBBB',
            linkedIn: 'BBBBBB',
            instagram: 'BBBBBB',
            github: 'BBBBBB',
            gitlab: 'BBBBBB',
            flickr: 'BBBBBB',
            gmail: 'BBBBBB',
            email: 'BBBBBB',
            website: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Social', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
