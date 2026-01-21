import { TestBed } from '@angular/core/testing';
import { PadronService } from './padron.service';
import { firstValueFrom } from 'rxjs';

describe('PadronService', () => {
    let service: PadronService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PadronService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return Google Argentina for CUIT 30-70918329-5', async () => {
        const data = await firstValueFrom(service.getPersonaByCuit('30-70918329-5'));
        expect(data).toBeTruthy();
        expect(data?.denominacion).toBe('GOOGLE ARGENTINA S.R.L.');
    });

    it('should return null for unknown CUIT', async () => {
        const data = await firstValueFrom(service.getPersonaByCuit('99-99999999-9'));
        expect(data).toBeNull();
    });
});
