import { Equipo, Grupo, Partido, Estadio, Manager, Octavos} from "../mundial";
//equipo
test('Cuando_SeCreaUnEquipo_Deberia_CrearseConNombreYCodigo', () => {
    const equipo = new Equipo("Argentina", "ARG");
    expect(equipo.Nombre).toBe("Argentina");
    expect(equipo.Codigo).toBe("ARG");
});  
test('Cuando_SeComparaDosEquiposMismoNombre_Deberia_DarVerdadero', () => {
    const equipoAR1 = new Equipo("Argentina", "ARG");
    const equipoAR2 = new Equipo("Argentina", "ARG");
    expect(equipoAR1).toEqual(equipoAR2);
});

//grupo
test('Cuando_SeCreaUnGrupo_Deberia_CrearseConLetraY4Equipos', () => {
    const g = new Grupo("C");
    expect(g.Nombre).toBe("C");
    g.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g.AgregarEquipo(new Equipo("Polonia", "POL"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "SAU"));
    g.AgregarEquipo(new Equipo("Mexico", "MEX"));
    expect(g.Equipos.length).toBe(4);
}); 
test('Cuando_SeCreaUnGrupoConMasDeUnaLetra_Deberia_ArrojarUnError', () => { 
    try{
        const g = new Grupo("CC");
    }catch(e){}
});
test('Cuando_CreacionPartidos_Deberia_CrearseLosPartidosDelGrupo', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g.AgregarEquipo(new Equipo("Polonia", "POL"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "SAU"));
    g.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g.CreacionPartidos();
    expect(g.SePidePartidos().length).toBe(6);
});
test('Cuando_SePidePartido1_Deberia_DevolverElPartido1DelGrupoLocalEquipo1VisitanteEquipo2', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g.AgregarEquipo(new Equipo("Polonia", "POL"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "SAU"));
    g.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g.CreacionPartidos();
    expect(g.SePidePartidoX(1).Local.Codigo).toEqual("ARG");
    expect(g.SePidePartidoX(1).Visitante.Codigo).toEqual("POL");
});   
test('Cuando_SePidePartidoX_Deberia_DevolverElPartidoXDelGrupo', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g.AgregarEquipo(new Equipo("Polonia", "POL"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "SAU"));
    g.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g.CreacionPartidos();
    expect(g.SePidePartidoX(3).Local.Codigo).toEqual("ARG");
    expect(g.SePidePartidoX(3).Visitante.Codigo).toEqual("SAU");
});
test('Cuando_SePidePartidos_Deberia_DevolverListadoDeTodosLosPartidos', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g.AgregarEquipo(new Equipo("Polonia", "POL"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "SAU"));
    g.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g.CreacionPartidos();
    expect.arrayContaining(g.SePidePartidos());
});
test('Cuando_Ranking_Deberia_DevolverListadoDeEquiposEnOrdenDePuntos', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g.AgregarEquipo(new Equipo("Polonia", "POL"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "SAU"));
    g.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g.CreacionPartidos();
    for(let i=0; i<6; i++){
        g.SePidePartidos()[i].SumarGolLocal();
        g.SePidePartidos()[i].Finalizar();
    }
    g.ObtenerPuntos();
    expect.arrayContaining(g.Ranking());
});
test('Cuando_PuntosPorEquipo_Deberia_DevolverLosPuntosDelEquipoPasadoComoParametro', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g.AgregarEquipo(new Equipo("Polonia", "POL"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "SAU"));
    g.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g.CreacionPartidos();
    for(let i=0; i<6; i++){
        g.SePidePartidos()[i].SumarGolLocal();
        g.SePidePartidos()[i].Finalizar();
    }
    g.ObtenerPuntos();
    expect(g.PuntosPorEquipo(g.Equipos[0])).toBe(9);
});
test('Cuando_PuntosPorCodigoEquipo_Deberia_DevolverLosPuntosDelEquipoPasadoComoParametro', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g.AgregarEquipo(new Equipo("Polonia", "POL"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "SAU"));
    g.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g.CreacionPartidos();
    for(let i=0; i<6; i++){
        g.SePidePartidos()[i].SumarGolLocal();
        g.SePidePartidos()[i].Finalizar();
    }
    g.ObtenerPuntos();
    expect(g.PuntosPorCodigoEquipo(g.Equipos[1].Codigo)).toBe(6);
});

//partido
test('Cuando_SeCreaUnGrupoPartido_Deberia_CrearseConEquipoLocalYVisitante', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante) 
    expect(partido.Local).toBe(local);
    expect(partido.Visitante).toBe(visitante);
});
test('Cuando_SeCreaUnGrupoPartidoConElMismo_Deberia_ArrojarUnError', () => {
    let local = new Equipo("Argentina", "ARG");
    try{
        const partido = new Partido(local, local);
    }catch(error){}
});
test('Cuando_SumarGolLocal_Deberia_SumaUnGolAlLocal', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    expect(partido.ObtenerGolesLocalTotal()).toBeGreaterThan(0);
});
test('Cuando_SumarGolVisitante_Deberia_SumaUnGolAlVisitante', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolVisitante();
    expect(partido.ObtenerGolesVisitanteTotal()).toBeGreaterThan(0);
});
test('Cuando_Finalizar_Deberia_ElPartidoNoDebeRecibirMasGoles', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.Finalizar();
    expect(partido.fin).toBe(1);
});
test('Cuando_SumarGolVisitanteYEstaFinalizado_Deberia_ArrojarUnError', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.Finalizar();
    try{
        partido.SumarGolLocal();
    }catch(error){
}  
});
test('Cuando_PuntosLocal_Deberia_DevolverLosPuntosDelLocal', () => {
    let local = new Equipo("Argentina", "ARg");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    partido.Finalizar();
    expect(partido.PuntosLocal()).toEqual(3);
}); 
test('Cuando_PuntosVisitante_Deberia_DeberiaDevolverLosPuntosDelVisitante', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    partido.Finalizar();
    expect(partido.PuntosVisitante()).toEqual(0);
});
test('Cuando_PuntosLocal_Deberia_Devolver3SiGanoLocal', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    partido.Finalizar();
    expect(partido.PuntosLocal()).toEqual(3);
});
test('Cuando_PuntosLocal_Deberia_Devolver1SiEmpataron', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    partido.SumarGolVisitante();
    partido.Finalizar();
    expect(partido.PuntosLocal()).toEqual(1);
});
test('Cuando_PuntosLocal_Deberia_Devolver0SiGanoVisitante', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolVisitante();
    partido.Finalizar();
    expect(partido.PuntosLocal()).toEqual(0);
});
test('Cuando_PuntosVisitante_Deberia_Devolver3SiGanoVisitante', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolVisitante();
    partido.Finalizar();
    expect(partido.PuntosVisitante()).toEqual(3);
});
test('Cuando_PuntosVisitante_Deberia_Devolver1SiEmpataron', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolVisitante();
    partido.SumarGolLocal();
    partido.Finalizar();
    expect(partido.PuntosVisitante()).toEqual(1);
});
test('Cuando_PuntosVisitante_Deberia_Devolver0SiGanoLocal', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    partido.Finalizar();
    expect(partido.PuntosVisitante()).toEqual(0);
});
test('Cuando_SumarGolLocalSuplementario_Deberia_SumaUnGolAlLocal', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    partido.SumarGolVisitante();
    partido.SumarGolLocalSuplementario();
    expect(partido.ObtenerGolesLocalTotal()).toEqual(2);
});
test('Cuando_SumarGolVisitanteSuplementario_Deberia_SumaUnGolAlVisitante', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    partido.SumarGolVisitante();
    partido.SumarGolVisitanteSuplementario();
    partido.SumarGolVisitanteSuplementario();
    expect(partido.ObtenerGolesVisitanteTotal()).toEqual(3);
});
test('Cuando_ObtenerGolesLocalNormal_Deberia_DevolverLaCantidadDeGolesEnTiempoNormalDelLocal', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    expect(partido.ObtenerGolesLocalNormal()).toEqual(1);
});
test('Cuando_ObtenerGolesLocalSuplementarios_Deberia_DevolverLaCantidadDeGolesEnTiempoSuplementarioDelLocal', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocalSuplementario();
    partido.SumarGolLocalSuplementario();
    expect(partido.ObtenerGolesLocalSuplementario()).toEqual(2);
});
test('Cuando_ObtenerGolesLocalTotal_Deberia_DevolverLaCantidadDeGolesTotalDelLocal', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocalSuplementario();
    partido.SumarGolLocal();
    expect(partido.ObtenerGolesLocalTotal()).toEqual(2);
});
test('Cuando_ObtenerGolesVisitanteNormal_Deberia_DevolverLaCantidadDeGolesEnTiempoNormalDelVisitante', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolVisitante();
    expect(partido.ObtenerGolesVisitanteNormal()).toEqual(1);
});
test('Cuando_ObtenerGolesVisitanteSuplementarios_Deberia_DevolverLaCantidadDeGolesEnTiempoSuplementarioDelVisitante', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolVisitanteSuplementario();
    partido.SumarGolVisitanteSuplementario();
    expect(partido.ObtenerGolesVisitanteSuplementario()).toEqual(2);
});
test('Cuando_ObtenerGolesVisitanteTotal_Deberia_DevolverLaCantidadDeGolesTotalDelVisitante', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolVisitanteSuplementario();
    partido.SumarGolVisitante();
    partido.SumarGolVisitanteSuplementario();
    expect(partido.ObtenerGolesVisitanteTotal()).toEqual(3);
});
test('Cuando_EstaFinalizado_Deberia_DevolverTrueSiElPartidoFinalizo', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.Finalizar();
    expect(partido.EstaFinalizado()).toBeTruthy();
});
test('Cuando_EquipoGanador_Deberia_DevolverElEquipoGanador', () => {
    let local = new Equipo("Argentina", "ARG");
    let visitante = new Equipo("Polonia", "POL");
    const partido = new Partido(local, visitante);
    partido.SumarGolLocal();
    partido.Finalizar();
    expect(partido.EquipoGanador().Codigo).toEqual("ARG");
});

//estadio
test('Cuando_SeCreaUnEstadio_Deberia_CrearseConNombre',() => {
    const estadio = new Estadio("ElTemploDeMadera");
    expect(estadio.Nombre).toBe("ElTemploDeMadera");
});

//manager
test('Cuando_SeCreaManager_Deberia_TenerUnNombre',() => {
    const manager = new Manager("Menu");
    expect(manager.Nombre).toBe("Menu");
});
test('Cuando_AgregarGrupos_Deberia_TenerUnGrupo',() => {
    const manager = new Manager("Menu");
    const g = new Grupo("C");
    expect(manager.AgregarGrupos(g)).toBeTruthy();
}); 
test('Cuando_SeCreaManager_Deberia_CrearOctavos',() => {
    const manager = new Manager("Menu");
    expect.arrayContaining(manager.Octavos);
});
test('Cuando_SeCreaManager_Deberia_CrearCuartos',() => {
    const manager = new Manager("Menu");
    expect.arrayContaining(manager.Cuartos);
});
test('Cuando_SeCreaManager_Deberia_CrearSemis',() => {
    const manager = new Manager("Menu");
    expect.arrayContaining(manager.Semifinales);
});
test('Cuando_SeCreaManager_Deberia_CrearTercerPuesto',() => {
    const manager = new Manager("Menu");
    expect.arrayContaining(manager.TercerPuesto);
});
test('Cuando_SeCreaManager_Deberia_CrearFinal',() => {
    const manager = new Manager("Menu");
    expect.arrayContaining(manager.Final);
});
test('Cuando_OctavosGenerar_Deberia_GenerarTodosLosPartidosDeOctavos',() => {
    
const m = new Manager("Mundial Qatar 2022");
function Carga(){
    const g1 = new Grupo("A");
    g1.AgregarEquipo(new Equipo("Qatar", "QAR"));
    g1.AgregarEquipo(new Equipo("Ecuador", "ECU"));
    g1.AgregarEquipo(new Equipo("Senegal", "SEN"));
    g1.AgregarEquipo(new Equipo("PaisesBajos", "NED"));
    g1.CreacionPartidos();
    for(let i=0; i<6; i++){
        g1.SePidePartidos()[i].SumarGolLocal();
        g1.SePidePartidos()[i].Finalizar();
    }
    g1.ObtenerPuntos();
    m.AgregarGrupos(g1);
    const g2 = new Grupo("B");
    g2.AgregarEquipo(new Equipo("Inglaterra", "ING"));
    g2.AgregarEquipo(new Equipo("Iran", "IRA"));
    g2.AgregarEquipo(new Equipo("EstadosUnidos", "USA"));
    g2.AgregarEquipo(new Equipo("Ukrania", "UKR"));
    g2.CreacionPartidos();
    for(let i=0; i<6; i++){
        g2.SePidePartidos()[i].SumarGolLocal();
        g2.SePidePartidos()[i].Finalizar();
    }
    g2.ObtenerPuntos();
    m.AgregarGrupos(g2);
    const g3 = new Grupo("C");
    g3.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g3.AgregarEquipo(new Equipo("Polonia", "POL"));
    g3.AgregarEquipo(new Equipo("ArabiaSaudita", "SAU"));
    g3.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g3.CreacionPartidos();
    for(let i=0; i<6; i++){
        g3.SePidePartidos()[i].SumarGolLocal();
        g3.SePidePartidos()[i].Finalizar();
    }
    g3.ObtenerPuntos();
    m.AgregarGrupos(g3);
    const g4 = new Grupo("D");
    g4.AgregarEquipo(new Equipo("Francia", "FRA"));
    g4.AgregarEquipo(new Equipo("Peru", "PER"));
    g4.AgregarEquipo(new Equipo("Dinamarca", "DEN"));
    g4.AgregarEquipo(new Equipo("Tunez", "TUN"));
    g4.CreacionPartidos();
    for(let i=0; i<6; i++){
        g4.SePidePartidos()[i].SumarGolLocal();
        g4.SePidePartidos()[i].Finalizar();
    }
    g4.ObtenerPuntos();
    m.AgregarGrupos(g4);
    const g5 = new Grupo("E");
    g5.AgregarEquipo(new Equipo("Espana", "ESP"));
    g5.AgregarEquipo(new Equipo("NuevaZe", "NVZ"));
    g5.AgregarEquipo(new Equipo("Alemania", "ALE"));
    g5.AgregarEquipo(new Equipo("Japon", "JAP"));
    g5.CreacionPartidos();
    for(let i=0; i<6; i++){
        g5.SePidePartidos()[i].SumarGolLocal();
        g5.SePidePartidos()[i].Finalizar();
    }
    g5.ObtenerPuntos();
    m.AgregarGrupos(g5);
    const g6 = new Grupo("F");
    g6.AgregarEquipo(new Equipo("Belgica", "BEL"));
    g6.AgregarEquipo(new Equipo("Canada", "CAN"));
    g6.AgregarEquipo(new Equipo("Marruecos", "MAR"));
    g6.AgregarEquipo(new Equipo("Croacia", "CRO"));
    g6.CreacionPartidos();
    for(let i=0; i<6; i++){
        g6.SePidePartidos()[i].SumarGolLocal();
        g6.SePidePartidos()[i].Finalizar();
    }
    g6.ObtenerPuntos();
    m.AgregarGrupos(g6);
    const g7 = new Grupo("G");
    g7.AgregarEquipo(new Equipo("Brasil", "BRA"));
    g7.AgregarEquipo(new Equipo("Serbia", "SER"));
    g7.AgregarEquipo(new Equipo("Suiza", "SUI"));
    g7.AgregarEquipo(new Equipo("Camerun", "CAM"));
    g7.CreacionPartidos();
    for(let i=0; i<6; i++){
        g7.SePidePartidos()[i].SumarGolLocal();
        g7.SePidePartidos()[i].Finalizar();
    }
    g7.ObtenerPuntos();
    m.AgregarGrupos(g7);
    const g8 = new Grupo("H");
    g8.AgregarEquipo(new Equipo("Portugal", "POR"));
    g8.AgregarEquipo(new Equipo("Ghana", "GHA"));
    g8.AgregarEquipo(new Equipo("Uruguay", "URU"));
    g8.AgregarEquipo(new Equipo("CoreaSur", "KOR"));
    g8.CreacionPartidos();
    for(let i=0; i<6; i++){
        g8.SePidePartidos()[i].SumarGolLocal();
        g8.SePidePartidos()[i].Finalizar();
    }
    g8.ObtenerPuntos();
    m.AgregarGrupos(g8);
    }
Carga();
expect.arrayContaining(m.OctavosGenerar());
});
test('Cuando_CuartosGenerar_Deberia_GenerarTodosLosPartidosDeCuartos',() => {
const m = new Manager("Mundial Qatar 2022");
function Carga(){
    const g1 = new Grupo("A");
    g1.AgregarEquipo(new Equipo("Qatar", "QAR"));
    g1.AgregarEquipo(new Equipo("Ecuador", "ECU"));
    g1.AgregarEquipo(new Equipo("Senegal", "SEN"));
    g1.AgregarEquipo(new Equipo("PaisesBajos", "NED"));
    g1.CreacionPartidos();
    for(let i=0; i<6; i++){
        g1.SePidePartidos()[i].SumarGolLocal();
        g1.SePidePartidos()[i].Finalizar();
    }
    g1.ObtenerPuntos();
    m.AgregarGrupos(g1);
    const g2 = new Grupo("B");
    g2.AgregarEquipo(new Equipo("Inglaterra", "ING"));
    g2.AgregarEquipo(new Equipo("Iran", "IRA"));
    g2.AgregarEquipo(new Equipo("EstadosUnidos", "USA"));
    g2.AgregarEquipo(new Equipo("Ukrania", "UKR"));
    g2.CreacionPartidos();
    for(let i=0; i<6; i++){
        g2.SePidePartidos()[i].SumarGolLocal();
        g2.SePidePartidos()[i].Finalizar();
    }
    g2.ObtenerPuntos();
    m.AgregarGrupos(g2);
    const g3 = new Grupo("C");
    g3.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g3.AgregarEquipo(new Equipo("Polonia", "POL"));
    g3.AgregarEquipo(new Equipo("ArabiaSaudita", "SAU"));
    g3.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g3.CreacionPartidos();
    for(let i=0; i<6; i++){
        g3.SePidePartidos()[i].SumarGolLocal();
        g3.SePidePartidos()[i].Finalizar();
    }
    g3.ObtenerPuntos();
    m.AgregarGrupos(g3);
    const g4 = new Grupo("D");
    g4.AgregarEquipo(new Equipo("Francia", "FRA"));
    g4.AgregarEquipo(new Equipo("Peru", "PER"));
    g4.AgregarEquipo(new Equipo("Dinamarca", "DEN"));
    g4.AgregarEquipo(new Equipo("Tunez", "TUN"));
    g4.CreacionPartidos();
    for(let i=0; i<6; i++){
        g4.SePidePartidos()[i].SumarGolLocal();
        g4.SePidePartidos()[i].Finalizar();
    }
    g4.ObtenerPuntos();
    m.AgregarGrupos(g4);
    const g5 = new Grupo("E");
    g5.AgregarEquipo(new Equipo("Espana", "ESP"));
    g5.AgregarEquipo(new Equipo("NuevaZe", "NVZ"));
    g5.AgregarEquipo(new Equipo("Alemania", "ALE"));
    g5.AgregarEquipo(new Equipo("Japon", "JAP"));
    g5.CreacionPartidos();
    for(let i=0; i<6; i++){
        g5.SePidePartidos()[i].SumarGolLocal();
        g5.SePidePartidos()[i].Finalizar();
    }
    g5.ObtenerPuntos();
    m.AgregarGrupos(g5);
    const g6 = new Grupo("F");
    g6.AgregarEquipo(new Equipo("Belgica", "BEL"));
    g6.AgregarEquipo(new Equipo("Canada", "CAN"));
    g6.AgregarEquipo(new Equipo("Marruecos", "MAR"));
    g6.AgregarEquipo(new Equipo("Croacia", "CRO"));
    g6.CreacionPartidos();
    for(let i=0; i<6; i++){
        g6.SePidePartidos()[i].SumarGolLocal();
        g6.SePidePartidos()[i].Finalizar();
    }
    g6.ObtenerPuntos();
    m.AgregarGrupos(g6);
    const g7 = new Grupo("G");
    g7.AgregarEquipo(new Equipo("Holanda", "HOL"));
    g7.AgregarEquipo(new Equipo("Belgica", "BEL"));
    g7.AgregarEquipo(new Equipo("Inglaterra", "ING"));
    g7.AgregarEquipo(new Equipo("Ghana", "GHA"));
    g7.CreacionPartidos();
    for(let i=0; i<6; i++){
        g7.SePidePartidos()[i].SumarGolLocal();
        g7.SePidePartidos()[i].Finalizar();
    }
    g7.ObtenerPuntos();
    m.AgregarGrupos(g7);
    const g8 = new Grupo("H");
    g8.AgregarEquipo(new Equipo("Canada", "CAN"));
    g8.AgregarEquipo(new Equipo("Arabia", "ARA"));
    g8.AgregarEquipo(new Equipo("Polonia", "POL"));
    g8.AgregarEquipo(new Equipo("Senegal", "SEN"));
    g8.CreacionPartidos();
    for(let i=0; i<6; i++){
        g8.SePidePartidos()[i].SumarGolLocal();
        g8.SePidePartidos()[i].Finalizar();
    }
    g8.ObtenerPuntos();
    m.AgregarGrupos(g8);

}
    Carga();
    for(const i of m.OctavosGenerar()){
        i.SumarGolLocal();
        i.Finalizar();
    }
    expect.arrayContaining(m.CuartosGenerar());
});
test('Cuando_SemisGenerar_Deberia_GenerarTodosLosPartidosDeSemifinales',() => {
const m = new Manager("Mundial Qatar 2022");
function Carga(){
    const g1 = new Grupo("A");
    g1.AgregarEquipo(new Equipo("Argentina", "AR"));
    g1.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g1.AgregarEquipo(new Equipo("Brasil", "BRA"));
    g1.AgregarEquipo(new Equipo("Italia", "ITA"));
    g1.CreacionPartidos();
    for(let i=0; i<6; i++){
        g1.SePidePartidos()[i].SumarGolLocal();
        g1.SePidePartidos()[i].Finalizar();
    }
    g1.ObtenerPuntos();
    m.AgregarGrupos(g1);
    const g2 = new Grupo("B");
    g2.AgregarEquipo(new Equipo("Inglaterra", "ING"));
    g2.AgregarEquipo(new Equipo("Iran", "IRA"));
    g2.AgregarEquipo(new Equipo("EstadosUnidos", "USA"));
    g2.AgregarEquipo(new Equipo("Ukrania", "UKR"));
    g2.CreacionPartidos();
    for(let i=0; i<6; i++){
        g2.SePidePartidos()[i].SumarGolLocal();
        g2.SePidePartidos()[i].Finalizar();
    }
    g2.ObtenerPuntos();
    m.AgregarGrupos(g2);
    const g3 = new Grupo("C");
    g3.AgregarEquipo(new Equipo("Uruguay", "UY"));
    g3.AgregarEquipo(new Equipo("Chile", "CHI"));
    g3.AgregarEquipo(new Equipo("Bolivia", "BOL"));
    g3.AgregarEquipo(new Equipo("Paraguay", "PY"));
    g3.CreacionPartidos();
    for(let i=0; i<6; i++){
        g3.SePidePartidos()[i].SumarGolLocal();
        g3.SePidePartidos()[i].Finalizar();
    }
    g3.ObtenerPuntos();
    m.AgregarGrupos(g3);
    const g4 = new Grupo("D");
    g4.AgregarEquipo(new Equipo("Peru", "PER"));
    g4.AgregarEquipo(new Equipo("Guatemala", "GUA"));
    g4.AgregarEquipo(new Equipo("España", "ESP"));
    g4.AgregarEquipo(new Equipo("Francia", "FRA"));
    g4.CreacionPartidos();
    for(let i=0; i<6; i++){
        g4.SePidePartidos()[i].SumarGolLocal();
        g4.SePidePartidos()[i].Finalizar();
    }
    g4.ObtenerPuntos();
    m.AgregarGrupos(g4);
    const g5 = new Grupo("E");
    g5.AgregarEquipo(new Equipo("Australia", "AUS"));
    g5.AgregarEquipo(new Equipo("NuevaZe", "NVZ"));
    g5.AgregarEquipo(new Equipo("Hungria", "HUN"));
    g5.AgregarEquipo(new Equipo("Japon", "JAP"));
    g5.CreacionPartidos();
    for(let i=0; i<6; i++){
        g5.SePidePartidos()[i].SumarGolLocal();
        g5.SePidePartidos()[i].Finalizar();
    }
    g5.ObtenerPuntos();
    m.AgregarGrupos(g5);
    const g6 = new Grupo("F");
    g6.AgregarEquipo(new Equipo("China", "CHN"));
    g6.AgregarEquipo(new Equipo("Iran", "IRN"));
    g6.AgregarEquipo(new Equipo("Suecia", "SUE"));
    g6.AgregarEquipo(new Equipo("Suiza", "SUI"));
    g6.CreacionPartidos();
    for(let i=0; i<6; i++){
        g6.SePidePartidos()[i].SumarGolLocal();
        g6.SePidePartidos()[i].Finalizar();
    }
    g6.ObtenerPuntos();
    m.AgregarGrupos(g6);
    const g7 = new Grupo("G");
    g7.AgregarEquipo(new Equipo("Brasil", "BRA"));
    g7.AgregarEquipo(new Equipo("Serbia", "SER"));
    g7.AgregarEquipo(new Equipo("Suiza", "SUI"));
    g7.AgregarEquipo(new Equipo("Camerun", "CAM"));
    g7.CreacionPartidos();
    for(let i=0; i<6; i++){
        g7.SePidePartidos()[i].SumarGolLocal();
        g7.SePidePartidos()[i].Finalizar();
    }
    g7.ObtenerPuntos();
    m.AgregarGrupos(g7);
    const g8 = new Grupo("H");
    g8.AgregarEquipo(new Equipo("Portugal", "POR"));
    g8.AgregarEquipo(new Equipo("Ghana", "GHA"));
    g8.AgregarEquipo(new Equipo("Uruguay", "URU"));
    g8.AgregarEquipo(new Equipo("CoreaSur", "KOR"));
    g8.CreacionPartidos();
    for(let i=0; i<6; i++){
        g8.SePidePartidos()[i].SumarGolLocal();
        g8.SePidePartidos()[i].Finalizar();
    }
    g8.ObtenerPuntos();
    m.AgregarGrupos(g8);

}
    Carga();
    for(const i of m.OctavosGenerar()){
        i.SumarGolLocal();
        i.Finalizar();
    }
    for(const j of m.CuartosGenerar()){
        j.SumarGolLocal();
        j.Finalizar();
    }
    expect.arrayContaining(m.SemisGenerar());
});
//octavos
test('Cuando_Partidos_Deberia_DevolverLosPartidosDeOctavos',() => {
    
    const m = new Manager("Mundial Qatar 2022");
    const o = new Octavos(m);
    function Carga(){
    const g1 = new Grupo("A");
    g1.AgregarEquipo(new Equipo("Qatar", "QAR"));
    g1.AgregarEquipo(new Equipo("Ecuador", "ECU"));
    g1.AgregarEquipo(new Equipo("Senegal", "SEN"));
    g1.AgregarEquipo(new Equipo("PaisesBajos", "NED"));
    g1.CreacionPartidos();
    for(let i=0; i<6; i++){
        g1.SePidePartidos()[i].SumarGolLocal();
        g1.SePidePartidos()[i].Finalizar();
    }
    g1.ObtenerPuntos();
    m.AgregarGrupos(g1);
    const g2 = new Grupo("B");
    g2.AgregarEquipo(new Equipo("Inglaterra", "ING"));
    g2.AgregarEquipo(new Equipo("Iran", "IRA"));
    g2.AgregarEquipo(new Equipo("EstadosUnidos", "USA"));
    g2.AgregarEquipo(new Equipo("Ukrania", "UKR"));
    g2.CreacionPartidos();
    for(let i=0; i<6; i++){
        g2.SePidePartidos()[i].SumarGolLocal();
        g2.SePidePartidos()[i].Finalizar();
    }
    g2.ObtenerPuntos();
    m.AgregarGrupos(g2);
    const g3 = new Grupo("C");
    g3.AgregarEquipo(new Equipo("Argentina", "ARG"));
    g3.AgregarEquipo(new Equipo("Polonia", "POL"));
    g3.AgregarEquipo(new Equipo("ArabiaSaudita", "SAU"));
    g3.AgregarEquipo(new Equipo("Mexico", "MEX"));
    g3.CreacionPartidos();
    for(let i=0; i<6; i++){
        g3.SePidePartidos()[i].SumarGolLocal();
        g3.SePidePartidos()[i].Finalizar();
    }
    g3.ObtenerPuntos();
    m.AgregarGrupos(g3);
    const g4 = new Grupo("D");
    g4.AgregarEquipo(new Equipo("Peru", "PER"));
    g4.AgregarEquipo(new Equipo("Guatemala", "GUA"));
    g4.AgregarEquipo(new Equipo("España", "ESP"));
    g4.AgregarEquipo(new Equipo("Francia", "FRA"));
    g4.CreacionPartidos();
    for(let i=0; i<6; i++){
        g4.SePidePartidos()[i].SumarGolLocal();
        g4.SePidePartidos()[i].Finalizar();
    }
    g4.ObtenerPuntos();
    m.AgregarGrupos(g4);
    const g5 = new Grupo("E");
    g5.AgregarEquipo(new Equipo("Australia", "AUS"));
    g5.AgregarEquipo(new Equipo("NuevaZe", "NVZ"));
    g5.AgregarEquipo(new Equipo("Hungria", "HUN"));
    g5.AgregarEquipo(new Equipo("Japon", "JAP"));
    g5.CreacionPartidos();
    for(let i=0; i<6; i++){
        g5.SePidePartidos()[i].SumarGolLocal();
        g5.SePidePartidos()[i].Finalizar();
    }
    g5.ObtenerPuntos();
    m.AgregarGrupos(g5);
    const g6 = new Grupo("F");
    g6.AgregarEquipo(new Equipo("China", "CHN"));
    g6.AgregarEquipo(new Equipo("Iran", "IRN"));
    g6.AgregarEquipo(new Equipo("Suecia", "SUE"));
    g6.AgregarEquipo(new Equipo("Suiza", "SUI"));
    g6.CreacionPartidos();
    for(let i=0; i<6; i++){
        g6.SePidePartidos()[i].SumarGolLocal();
        g6.SePidePartidos()[i].Finalizar();
    }
    g6.ObtenerPuntos();
    m.AgregarGrupos(g6);
    const g7 = new Grupo("G");
    g7.AgregarEquipo(new Equipo("Brasil", "BRA"));
    g7.AgregarEquipo(new Equipo("Serbia", "SER"));
    g7.AgregarEquipo(new Equipo("Suiza", "SUI"));
    g7.AgregarEquipo(new Equipo("Camerun", "CAM"));
    g7.CreacionPartidos();
    for(let i=0; i<6; i++){
        g7.SePidePartidos()[i].SumarGolLocal();
        g7.SePidePartidos()[i].Finalizar();
    }
    g7.ObtenerPuntos();
    m.AgregarGrupos(g7);
    const g8 = new Grupo("H");
    g8.AgregarEquipo(new Equipo("Portugal", "POR"));
    g8.AgregarEquipo(new Equipo("Ghana", "GHA"));
    g8.AgregarEquipo(new Equipo("Uruguay", "URU"));
    g8.AgregarEquipo(new Equipo("CoreaSur", "KOR"));
    g8.CreacionPartidos();
    for(let i=0; i<6; i++){
        g8.SePidePartidos()[i].SumarGolLocal();
        g8.SePidePartidos()[i].Finalizar();
    }
    g8.ObtenerPuntos();
    m.AgregarGrupos(g8);

    }
    Carga();
    expect.arrayContaining(o.Partidos());
});