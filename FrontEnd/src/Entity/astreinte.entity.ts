import {Semaine} from './semaine.entity';

export interface Astreinte {
    id: number,
    user: object,
    paye: string,
    rapport: object,
    semaine: Semaine,
    vivier: object,
}
