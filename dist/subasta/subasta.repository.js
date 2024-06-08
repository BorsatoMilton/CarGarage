import { Subasta } from './subasta.entity.js';
const subastas = [
    new Subasta(new Date(), new Date(), 100, 200),
    new Subasta(new Date(), new Date(), 300, 400),
    new Subasta(new Date(), new Date(), 500, 600),
    new Subasta(new Date(), new Date(), 700, 800),
];
export class SubastaRepository {
    findAll() {
        return subastas;
    }
    findOne(item) {
        return subastas.find(subasta => subasta.idSubasta === item.id);
    }
    add(item) {
        subastas.push(item);
        return item;
    }
    update(item) {
        const index = subastas.findIndex(subasta => subasta.idSubasta === item.idSubasta);
        if (index !== -1) {
            subastas[index] = { ...subastas[index], ...item };
        }
        return subastas[index];
    }
    delete(item) {
        const index = subastas.findIndex(subasta => subasta.idSubasta === item.id);
        if (index !== -1) {
            const subastaBorrada = subastas[index];
            subastas.splice(index, 1);
            return subastaBorrada;
        }
    }
}
//# sourceMappingURL=subasta.repository.js.map