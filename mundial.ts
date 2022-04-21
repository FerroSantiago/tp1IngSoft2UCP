//Equipo Class
export class Equipo{
    public puntosEnGrupo: number = 0;
    constructor(public readonly Nombre: string, public readonly Codigo: string){}
}

//Grupo Class
export class Grupo{
    public Equipos : Equipo[] = [];
    private PuestosPorPuntos: number[] = [0, 0, -1, -1];
    private RankGrupo: Equipo[] = [new Equipo("ejem", "ej"), new Equipo("ejemm", "ejj"), new Equipo("ejemmm", "ejjj"), new Equipo("ejemmmm", "ejjjj")];
    public readonly Nombre: string;
    private Partidos: Partido[] = [];

    constructor(nombre: string){
        switch(nombre) { 
            case "A": { 
                this.Nombre = nombre; 
               break; 
            } 
            case "B": { 
                this.Nombre = nombre;this.Nombre = nombre; 
               break; 
            } 
            case "C": { 
                this.Nombre = nombre;
               break; 
            } 
            case "D": { 
                this.Nombre = nombre; 
               break; 
            } 
            case "E": { 
                this.Nombre = nombre; 
               break; 
            } 
            case "F": { 
                this.Nombre = nombre; 
               break; 
            } 
            case "G": { 
                this.Nombre = nombre;
               break; 
            } 
            case "H": { 
                this.Nombre = nombre;
               break; 
            }
            default: {
                throw new Error (`Nombre de Grupo no valido ${nombre}`);
            }  
        } 
    }
    CreacionPartidos(){
        this.Partidos.push(new Partido(this.Equipos[0], this.Equipos[1]));
        this.Partidos.push(new Partido(this.Equipos[2], this.Equipos[3]));
        this.Partidos.push(new Partido(this.Equipos[0], this.Equipos[2]));
        this.Partidos.push(new Partido(this.Equipos[1], this.Equipos[3]));
        this.Partidos.push(new Partido(this.Equipos[0], this.Equipos[3]));
        this.Partidos.push(new Partido(this.Equipos[1], this.Equipos[2]));
    }
    SePidePartidoX(num: number){
        return this.Partidos[num-1];
    }
    SePidePartidos(){
        return this.Partidos;
    }
    AgregarEquipo(equipo: Equipo): boolean{
        if (this.Equipos.find(eq => eq.Codigo === equipo.Codigo) || this.Equipos.length > 4){
            return false;
        }else{
            this.Equipos.push(equipo);
            return true;
        }
    }
    ObtenerPuntos(){
        for(const i of this.Equipos){
            for(const j of this.Partidos){
                if(i.Codigo === j.Local.Codigo){
                    i.puntosEnGrupo = i.puntosEnGrupo + j.PuntosLocal();
                }else if(i.Codigo === j.Visitante.Codigo){
                    i.puntosEnGrupo = i.puntosEnGrupo + j.PuntosVisitante();
                }
            }
        }
    }

    PuntosPorEquipo(equipo: Equipo){
        if(this.Equipos.find(eq => eq.Nombre === equipo.Nombre)){
            return equipo.puntosEnGrupo;
        }
    }
    PuntosPorCodigoEquipo(codigo: string){
        for(const i of this.Equipos){
            if(i.Codigo === codigo){
                return i.puntosEnGrupo
            }
        }
    }

    Ranking(): Equipo[]{
        for (const j of this.Equipos){
            if(this.RankGrupo.find(eq => eq.Codigo === j.Codigo)){
                break;
            }else{
                if(j.puntosEnGrupo > this.PuestosPorPuntos[0]){
                    this.PuestosPorPuntos[0] = j.puntosEnGrupo;
                    this.RankGrupo[0] = j;
                }else if(j.puntosEnGrupo > this.PuestosPorPuntos[1]){
                    this.PuestosPorPuntos[1] = j.puntosEnGrupo;
                    this.RankGrupo[1] = j;
                }else if(j.puntosEnGrupo > this.PuestosPorPuntos[2]){
                    this.PuestosPorPuntos[2] = j.puntosEnGrupo;
                    this.RankGrupo[2] = j;
                }else{
                    this.PuestosPorPuntos[3] = j.puntosEnGrupo;
                    this.RankGrupo[3] = j;
                }
            }
        }
        return this.RankGrupo;
    }
}

//Partido Class
export class Partido{
    public fin: number = 0;
    private golesTotalLocal: number = 0;
    private golesTotalVisitante: number = 0;
    private golesLocalNormal: number = 0;
    private golesVisitanteNormal: number = 0;
    private golesLocalSuplementario: number = 0;
    private golesVisitanteSuplementario: number = 0;
    constructor(public Local: Equipo, public Visitante: Equipo){
        if (this.Local.Codigo === this.Visitante.Codigo){
            throw new Error ("Mismo equipo");
        }
    }
    SumarGolLocal(): void{
        if(this.fin === 1){
            throw new Error("Ya finalizo el partido");
        }else{
            this.golesLocalNormal++;
            this.golesTotalLocal++;
        }
    }
    SumarGolLocalSuplementario(): void{
        if(this.fin === 1){
            throw new Error("Ya finalizo el partido");
        }else{
            this.golesLocalSuplementario++;
            this.golesTotalLocal++;
        }
    }
    ObtenerGolesLocalNormal(): number{
        return this.golesLocalNormal;
    }
    ObtenerGolesLocalSuplementario(): number{
        return this.golesLocalSuplementario;
    }
    ObtenerGolesLocalTotal(): number{
        return this.golesTotalLocal;
    }
    PuntosLocal(): number{
        if(this.fin == 1 && (this.golesTotalLocal > this.golesTotalVisitante)){
            return 3;
        } else if(this.fin == 1 && (this.golesTotalLocal === this.golesTotalVisitante)){
            return 1;
        }else{
            return 0;
        }
    }

    SumarGolVisitante(): void{
        if(this.fin === 1){
            throw new Error("Ya finalizo el partido");
        }else{
            this.golesVisitanteNormal++;
            this.golesTotalVisitante++;
        }    
    }
    SumarGolVisitanteSuplementario(): void{
        if(this.fin === 1){
            throw new Error("Ya finalizo el partido");
        }else{
            this.golesVisitanteSuplementario++;
            this.golesTotalVisitante++;
        }    
    }
    ObtenerGolesVisitanteNormal(): number{
        return this.golesVisitanteNormal;
    }
    ObtenerGolesVisitanteSuplementario(): number{
        return this.golesVisitanteSuplementario;
    }
    ObtenerGolesVisitanteTotal(): number{
        return this.golesTotalVisitante;
    }
    PuntosVisitante(): number{
        if(this.fin == 1 && (this.golesTotalVisitante > this.golesTotalLocal)){
            return 3;
        } else if(this.fin == 1 && (this.golesTotalLocal === this.golesTotalVisitante)){
            return 1;
        }else{
            return 0;
        }
    }
    EquipoGanador(){
        if(this.PuntosVisitante() === 1){
            throw new Error("EL resultado fue un empate");
        }else{
            if(this.PuntosVisitante() > this.PuntosLocal()){
                return this.Visitante;
            }else{
                return this.Local;
            }
        }
    }
    EquipoPerdedor(){
        if(this.PuntosVisitante() === 1){
            throw new Error("EL resultado fue un empate");
        }else{
            if(this.PuntosVisitante() > this.PuntosLocal()){
                return this.Local;
            }else{
                return this.Visitante;
            }
        }
    }
    Finalizar(): void{
        this.fin = 1;
    }
    EstaFinalizado(): boolean{
        if(this.fin === 1){
            return true
        }else{
            return false
        }
    }
}
export class Estadio{
    constructor(public readonly Nombre: string){}
}

//Manager Class
export class Manager{
    public Octavos: Partido[] = [new Partido(new Equipo("a", "b"), new Equipo("aa", "bb")), new Partido(new Equipo("a", "b"), new Equipo("aaa", "bbb")), new Partido(new Equipo("a", "b"), new Equipo("aa", "bb")), new Partido(new Equipo("a", "b"), new Equipo("aa", "bb")), new Partido(new Equipo("a", "b"), new Equipo("aa", "bb")), new Partido(new Equipo("a", "b"), new Equipo("aa", "bb")), new Partido(new Equipo("a", "b"), new Equipo("aa", "bb")), new Partido(new Equipo("a", "b"), new Equipo("aa", "bb"))];
    public Cuartos: Partido[] = [new Partido(new Equipo("a", "b"), new Equipo("aa", "bb")), new Partido(new Equipo("a", "b"), new Equipo("aaa", "bbb")), new Partido(new Equipo("a", "b"), new Equipo("aa", "bb")), new Partido(new Equipo("a", "b"), new Equipo("aa", "bb"))];
    public Semifinales: Partido[] = [new Partido(new Equipo("a", "b"), new Equipo("aa", "bb")), new Partido(new Equipo("a", "b"), new Equipo("aaa", "bbb"))];
    public TercerPuesto: Partido[] = [new Partido(new Equipo("a", "b"), new Equipo("aa", "bb"))];
    public Final: Partido[] = [new Partido(new Equipo("a", "b"), new Equipo("aa", "bb"))];
    private Grupos: Grupo[] = [];
    constructor(public readonly Nombre: string){}
    
    AgregarGrupos(grupo: Grupo){
        if (this.Grupos.find(gp => gp.Nombre === grupo.Nombre) || this.Grupos.length > 8){
            return false;
        }else{
            switch(grupo.Nombre) { 
                case "A": { 
                    this.Grupos[0] = grupo; 
                   break; 
                } 
                case "B": { 
                    this.Grupos[1] = grupo; 
                   break; 
                } 
                case "C": { 
                    this.Grupos[2] = grupo; 
                   break; 
                } 
                case "D": { 
                    this.Grupos[3] = grupo; 
                   break; 
                } 
                case "E": { 
                    this.Grupos[4] = grupo; 
                   break; 
                } 
                case "F": { 
                    this.Grupos[5] = grupo; 
                   break; 
                } 
                case "G": { 
                    this.Grupos[6] = grupo; 
                   break; 
                } 
                case "H": { 
                    this.Grupos[7] = grupo; 
                   break; 
                }  
             } 
            return true;
        }
    }
    OctavosGenerar(): Partido[]{
        const Rank1: Equipo[] = this.Grupos[0].Ranking();
        const Rank2: Equipo[] = this.Grupos[1].Ranking();
        const Rank3: Equipo[] = this.Grupos[2].Ranking();
        const Rank4: Equipo[] = this.Grupos[3].Ranking();
        const Rank5: Equipo[] = this.Grupos[4].Ranking();
        const Rank6: Equipo[] = this.Grupos[5].Ranking();
        const Rank7: Equipo[] = this.Grupos[6].Ranking();
        const Rank8: Equipo[] = this.Grupos[7].Ranking(); 
        this.Octavos[0] = (new Partido(Rank1[0], Rank2[1]));
        this.Octavos[1] = (new Partido(Rank2[0], Rank1[1]));
        this.Octavos[2] = (new Partido(Rank3[0], Rank4[1]));
        this.Octavos[3] = (new Partido(Rank4[0], Rank3[1]));
        this.Octavos[4] = (new Partido(Rank5[0], Rank6[1]));
        this.Octavos[5] = (new Partido(Rank6[0], Rank5[1]));
        this.Octavos[6] = (new Partido(Rank7[0], Rank8[1]));
        this.Octavos[7] = (new Partido(Rank8[0], Rank7[1]));
        return this.Octavos;
    }
    CuartosGenerar(): Partido[]{
        this.Cuartos[0] = (new Partido(this.Octavos[0].EquipoGanador(), this.Octavos[1].EquipoGanador()));
        this.Cuartos[1] = (new Partido(this.Octavos[2].EquipoGanador(), this.Octavos[3].EquipoGanador()));
        this.Cuartos[2] = (new Partido(this.Octavos[4].EquipoGanador(), this.Octavos[5].EquipoGanador()));
        this.Cuartos[3] = (new Partido(this.Octavos[6].EquipoGanador(), this.Octavos[7].EquipoGanador()));
        return this.Cuartos;
    }
    SemisGenerar(): Partido[]{
        this.Semifinales[0] = (new Partido(this.Cuartos[0].EquipoGanador(), this.Cuartos[1].EquipoGanador()));
        this.Semifinales[1] = (new Partido(this.Cuartos[2].EquipoGanador(), this.Cuartos[3].EquipoGanador()));
        return this.Semifinales;
    }
    TercerPuestoGenerar(): Partido[]{
        this.TercerPuesto[0] = (new Partido(this.Semifinales[0].EquipoPerdedor(), this.Semifinales[1].EquipoPerdedor()));
        return this.TercerPuesto;
    }
    FinalGenerar(): Partido[]{
        this.Final[0] = (new Partido(this.Semifinales[0].EquipoGanador(), this.Semifinales[1].EquipoGanador()));
        return this.Final;
    }
    Campeon(): Equipo{
        return this.Final[0].EquipoGanador();
    }
}

//Octavos Class
export class Octavos{
    constructor(private mana: Manager){}
    Partidos(): Partido[]{
        return this.mana.Octavos;
    }
}

//Cuartos Class
export class Cuartos{
    constructor(private mana: Manager){}
    Partidos(): Partido[]{
        return this.mana.Cuartos;
    }
}

//Semi Class
export class Semifinales{
    constructor(private mana: Manager){}
    Partidos(): Partido[]{
        return this.mana.Semifinales;
    }
}

//TercerPuesto Class
export class TercerPuesto{
    constructor(private mana: Manager){}
    Partidos(): Partido[]{
        return this.mana.TercerPuesto;
    }
}


//Final Class
export class Final{
    constructor(private mana: Manager){}
    Partidos(): Partido[]{
        return this.mana.Final;
    }
}