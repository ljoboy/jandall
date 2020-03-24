import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ExtraInfoService } from 'app/entities/extra-info/extra-info.service';
import { IExtraInfo, ExtraInfo } from 'app/shared/model/extra-info.model';

describe('Service Tests', () => {
  describe('ExtraInfo Service', () => {
    let injector: TestBed;
    let service: ExtraInfoService;
    let httpMock: HttpTestingController;
    let elemDefault: IExtraInfo;
    let expectedResult: IExtraInfo | IExtraInfo[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ExtraInfoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ExtraInfo(
        0,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            bdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ExtraInfo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            bdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            bdate: currentDate
          },
          returnedFromService
        );

        service.create(new ExtraInfo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ExtraInfo', () => {
        const returnedFromService = Object.assign(
          {
            bdate: currentDate.format(DATE_FORMAT),
            occupation: 'BBBBBB',
            bio: 'BBBBBB',
            country: 'BBBBBB',
            province: 'BBBBBB',
            city: 'BBBBBB',
            address: 'BBBBBB',
            title: 'BBBBBB',
            mobile: 'BBBBBB',
            img: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            bdate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ExtraInfo', () => {
        const returnedFromService = Object.assign(
          {
            bdate: currentDate.format(DATE_FORMAT),
            occupation: 'BBBBBB',
            bio: 'BBBBBB',
            country: 'BBBBBB',
            province: 'BBBBBB',
            city: 'BBBBBB',
            address: 'BBBBBB',
            title: 'BBBBBB',
            mobile: 'BBBBBB',
            img: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            bdate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ExtraInfo', () => {
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
