import {Semaine} from './semaine.entity';
import {Remplacement} from './remplacement.entity';

export interface Astreinte {
    id: number,
    user: object,
    paye: string,
    rapport: object,
    semaine: Semaine,
    vivier: object,
    repos: Repos;
    remplacements: Remplacement[],
}


export interface Repos {
    nombreHeures: number;
    repoSalaire: number;
}

