import {Repository}from '../shared/repository.js';
import {Subasta} from './subasta.entity.js';
const subastas = [
    new Subasta(new Date(), new Date(), 100, 200),
    new Subasta(new Date(), new Date(), 300, 400),
    new Subasta(new Date(), new Date(), 500, 600),
    new Subasta(new Date(), new Date(), 700, 800),
];
export class SubastaRepository implements Repository<Subasta>{
    public findAll(): Subasta[] | undefined{
        return subastas
    }
    public findOne(item: {id: string}): Subasta | undefined{
        return subastas.find(subasta => subasta.idSubasta === item.id)
    }
    public add(item: Subasta): Subasta | undefined{
        subastas.push(item)
        return item
    }
    public update(item: Subasta): Subasta | undefined{
        const index = subastas.findIndex(subasta => subasta.idSubasta === item.idSubasta)
        if(index !== -1){
            subastas[index] = {...subastas[index], ...item}
        }
        return subastas[index]
    }
    public delete(item: {id: string}): Subasta | undefined{
        const index = subastas.findIndex(subasta => subasta.idSubasta === item.id)
        if(index !== -1){
            const subastaBorrada = subastas[index]
            subastas.splice(index, 1)
            return subastaBorrada
        }
    }
}
