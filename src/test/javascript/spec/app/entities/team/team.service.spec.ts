import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TeamService } from 'app/entities/team/team.service';
import { ITeam, Team } from 'app/shared/model/team.model';

describe('Service Tests', () => {
  describe('Team Service', () => {
    let injector: TestBed;
    let service: TeamService;
    let httpMock: HttpTestingController;
    let elemDefault: ITeam;
    let expectedResult: ITeam | ITeam[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TeamService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Team(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        'image/png',
        'AAAAAAA',
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            updatedAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Team', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            updatedAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
            updatedAt: currentDate
          },
          returnedFromService
        );

        service.create(new Team()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Team', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            about: 'BBBBBB',
            img: 'BBBBBB',
            country: 'BBBBBB',
            province: 'BBBBBB',
            city: 'BBBBBB',
            address: 'BBBBBB',
            longitude: 1,
            latitude: 1,
            logo: 'BBBBBB',
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            updatedAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
            updatedAt: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Team', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            about: 'BBBBBB',
            img: 'BBBBBB',
            country: 'BBBBBB',
            province: 'BBBBBB',
            city: 'BBBBBB',
            address: 'BBBBBB',
            longitude: 1,
            latitude: 1,
            logo: 'BBBBBB',
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            updatedAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
            updatedAt: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Team', () => {
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
