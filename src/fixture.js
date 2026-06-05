// Fixture oficial Mundial 2026 — grupos, fechas, horarios ARG y estadios
export const GRUPOS = {
  A: ["🇲🇽 México", "🇿🇦 Sudáfrica", "🇰🇷 Corea del Sur", "🇨🇿 R. Checa"],
  B: ["🇨🇦 Canadá", "🇧🇦 Bosnia-Herz.", "🇶🇦 Qatar", "🇨🇭 Suiza"],
  C: ["🇧🇷 Brasil", "🇲🇦 Marruecos", "🇭🇹 Haití", "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia"],
  D: ["🇺🇸 EE.UU.", "🇵🇾 Paraguay", "🇦🇺 Australia", "🇹🇷 Turquía"],
  E: ["🇩🇪 Alemania", "🇨🇼 Curazao", "🇨🇮 Costa de Marfil", "🇪🇨 Ecuador"],
  F: ["🇳🇱 Países Bajos", "🇯🇵 Japón", "🇸🇪 Suecia", "🇹🇳 Túnez"],
  G: ["🇧🇪 Bélgica", "🇪🇬 Egipto", "🇮🇷 Irán", "🇳🇿 Nueva Zelanda"],
  H: ["🇪🇸 España", "🇨🇻 Cabo Verde", "🇸🇦 Arabia Saudí", "🇺🇾 Uruguay"],
  I: ["🇫🇷 Francia", "🇸🇳 Senegal", "🇮🇶 Irak", "🇳🇴 Noruega"],
  J: ["🇦🇷 Argentina", "🇩🇿 Argelia", "🇦🇹 Austria", "🇯🇴 Jordania"],
  K: ["🇵🇹 Portugal", "🇨🇩 RD Congo", "🇺🇿 Uzbekistán", "🇨🇴 Colombia"],
  L: ["🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra", "🇭🇷 Croacia", "🇬🇭 Ghana", "🇵🇦 Panamá"],
};

// Fase de grupos completa con fechas, horarios ARG y estadios
const PARTIDOS_GRUPOS = [
  // ── GRUPO A ──
  { id:1,  fase:"grupos", subfase:"Grupo A", jornada:1, local:"🇲🇽 México",        visita:"🇿🇦 Sudáfrica",       fecha:"Jue 11 Jun", hora:"16:00", estadio:"Estadio Azteca, Ciudad de México" },
  { id:2,  fase:"grupos", subfase:"Grupo A", jornada:1, local:"🇰🇷 Corea del Sur", visita:"🇨🇿 R. Checa",        fecha:"Jue 11 Jun", hora:"23:00", estadio:"Estadio Guadalajara" },
  { id:3,  fase:"grupos", subfase:"Grupo A", jornada:2, local:"🇨🇿 R. Checa",      visita:"🇿🇦 Sudáfrica",       fecha:"Jue 18 Jun", hora:"13:00", estadio:"Atlanta Stadium" },
  { id:4,  fase:"grupos", subfase:"Grupo A", jornada:2, local:"🇲🇽 México",        visita:"🇰🇷 Corea del Sur",   fecha:"Jue 18 Jun", hora:"22:00", estadio:"Estadio Guadalajara" },
  { id:5,  fase:"grupos", subfase:"Grupo A", jornada:3, local:"🇨🇿 R. Checa",      visita:"🇲🇽 México",          fecha:"Mar 24 Jun", hora:"22:00", estadio:"Estadio Azteca, Ciudad de México" },
  { id:6,  fase:"grupos", subfase:"Grupo A", jornada:3, local:"🇿🇦 Sudáfrica",     visita:"🇰🇷 Corea del Sur",   fecha:"Mar 24 Jun", hora:"22:00", estadio:"Estadio Monterrey" },
  // ── GRUPO B ──
  { id:7,  fase:"grupos", subfase:"Grupo B", jornada:1, local:"🇨🇦 Canadá",        visita:"🇧🇦 Bosnia-Herz.",    fecha:"Vie 12 Jun", hora:"16:00", estadio:"Toronto Stadium" },
  { id:8,  fase:"grupos", subfase:"Grupo B", jornada:1, local:"🇶🇦 Qatar",         visita:"🇨🇭 Suiza",           fecha:"Sáb 13 Jun", hora:"16:00", estadio:"San Francisco Bay Area Stadium" },
  { id:9,  fase:"grupos", subfase:"Grupo B", jornada:2, local:"🇨🇭 Suiza",         visita:"🇧🇦 Bosnia-Herz.",    fecha:"Jue 18 Jun", hora:"16:00", estadio:"Los Angeles Stadium" },
  { id:10, fase:"grupos", subfase:"Grupo B", jornada:2, local:"🇨🇦 Canadá",        visita:"🇶🇦 Qatar",           fecha:"Jue 18 Jun", hora:"19:00", estadio:"BC Place Vancouver" },
  { id:11, fase:"grupos", subfase:"Grupo B", jornada:3, local:"🇨🇭 Suiza",         visita:"🇨🇦 Canadá",          fecha:"Mié 24 Jun", hora:"16:00", estadio:"BC Place Vancouver" },
  { id:12, fase:"grupos", subfase:"Grupo B", jornada:3, local:"🇧🇦 Bosnia-Herz.",  visita:"🇶🇦 Qatar",           fecha:"Mié 24 Jun", hora:"16:00", estadio:"Seattle Stadium" },
  // ── GRUPO C ──
  { id:13, fase:"grupos", subfase:"Grupo C", jornada:1, local:"🇧🇷 Brasil",        visita:"🇲🇦 Marruecos",       fecha:"Sáb 13 Jun", hora:"19:00", estadio:"MetLife, Nueva York/Nueva Jersey" },
  { id:14, fase:"grupos", subfase:"Grupo C", jornada:1, local:"🇭🇹 Haití",         visita:"🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia",        fecha:"Sáb 13 Jun", hora:"22:00", estadio:"Boston Stadium" },
  { id:15, fase:"grupos", subfase:"Grupo C", jornada:2, local:"🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia",      visita:"🇲🇦 Marruecos",       fecha:"Vie 19 Jun", hora:"19:00", estadio:"Boston Stadium" },
  { id:16, fase:"grupos", subfase:"Grupo C", jornada:2, local:"🇧🇷 Brasil",        visita:"🇭🇹 Haití",           fecha:"Vie 19 Jun", hora:"22:00", estadio:"Philadelphia Stadium" },
  { id:17, fase:"grupos", subfase:"Grupo C", jornada:3, local:"🏴󠁧󠁢󠁳󠁣󠁴󠁿 Escocia",      visita:"🇧🇷 Brasil",          fecha:"Mié 24 Jun", hora:"19:00", estadio:"Miami Stadium" },
  { id:18, fase:"grupos", subfase:"Grupo C", jornada:3, local:"🇲🇦 Marruecos",     visita:"🇭🇹 Haití",           fecha:"Mié 24 Jun", hora:"19:00", estadio:"Atlanta Stadium" },
  // ── GRUPO D ──
  { id:19, fase:"grupos", subfase:"Grupo D", jornada:1, local:"🇺🇸 EE.UU.",        visita:"🇵🇾 Paraguay",        fecha:"Vie 12 Jun", hora:"22:00", estadio:"Los Angeles Stadium" },
  { id:20, fase:"grupos", subfase:"Grupo D", jornada:1, local:"🇦🇺 Australia",     visita:"🇹🇷 Turquía",         fecha:"Dom 13 Jun", hora:"01:00*",estadio:"BC Place Vancouver" },
  { id:21, fase:"grupos", subfase:"Grupo D", jornada:2, local:"🇺🇸 EE.UU.",        visita:"🇦🇺 Australia",       fecha:"Vie 19 Jun", hora:"16:00", estadio:"Seattle Stadium" },
  { id:22, fase:"grupos", subfase:"Grupo D", jornada:2, local:"🇹🇷 Turquía",       visita:"🇵🇾 Paraguay",        fecha:"Sáb 20 Jun", hora:"01:00*",estadio:"San Francisco Bay Area Stadium" },
  { id:23, fase:"grupos", subfase:"Grupo D", jornada:3, local:"🇹🇷 Turquía",       visita:"🇺🇸 EE.UU.",          fecha:"Jue 25 Jun", hora:"23:00", estadio:"Los Angeles Stadium" },
  { id:24, fase:"grupos", subfase:"Grupo D", jornada:3, local:"🇵🇾 Paraguay",      visita:"🇦🇺 Australia",       fecha:"Jue 25 Jun", hora:"23:00", estadio:"San Francisco Bay Area Stadium" },
  // ── GRUPO E ──
  { id:25, fase:"grupos", subfase:"Grupo E", jornada:1, local:"🇩🇪 Alemania",      visita:"🇨🇼 Curazao",         fecha:"Dom 14 Jun", hora:"14:00", estadio:"Houston Stadium" },
  { id:26, fase:"grupos", subfase:"Grupo E", jornada:1, local:"🇨🇮 Costa de Marfil",visita:"🇪🇨 Ecuador",        fecha:"Dom 14 Jun", hora:"20:00", estadio:"Philadelphia Stadium" },
  { id:27, fase:"grupos", subfase:"Grupo E", jornada:2, local:"🇩🇪 Alemania",      visita:"🇨🇮 Costa de Marfil", fecha:"Sáb 20 Jun", hora:"17:00", estadio:"Toronto Stadium" },
  { id:28, fase:"grupos", subfase:"Grupo E", jornada:2, local:"🇪🇨 Ecuador",       visita:"🇨🇼 Curazao",         fecha:"Sáb 20 Jun", hora:"21:00", estadio:"Kansas City Stadium" },
  { id:29, fase:"grupos", subfase:"Grupo E", jornada:3, local:"🇪🇨 Ecuador",       visita:"🇩🇪 Alemania",        fecha:"Jue 25 Jun", hora:"17:00", estadio:"MetLife, Nueva York/Nueva Jersey" },
  { id:30, fase:"grupos", subfase:"Grupo E", jornada:3, local:"🇨🇼 Curazao",       visita:"🇨🇮 Costa de Marfil", fecha:"Jue 25 Jun", hora:"17:00", estadio:"Philadelphia Stadium" },
  // ── GRUPO F ──
  { id:31, fase:"grupos", subfase:"Grupo F", jornada:1, local:"🇳🇱 Países Bajos",  visita:"🇯🇵 Japón",           fecha:"Dom 14 Jun", hora:"17:00", estadio:"Dallas Stadium" },
  { id:32, fase:"grupos", subfase:"Grupo F", jornada:1, local:"🇸🇪 Suecia",        visita:"🇹🇳 Túnez",           fecha:"Dom 14 Jun", hora:"23:00", estadio:"Estadio Monterrey" },
  { id:33, fase:"grupos", subfase:"Grupo F", jornada:2, local:"🇳🇱 Países Bajos",  visita:"🇸🇪 Suecia",          fecha:"Sáb 20 Jun", hora:"14:00", estadio:"Houston Stadium" },
  { id:34, fase:"grupos", subfase:"Grupo F", jornada:2, local:"🇹🇳 Túnez",         visita:"🇯🇵 Japón",           fecha:"Dom 21 Jun", hora:"01:00*",estadio:"Estadio Monterrey" },
  { id:35, fase:"grupos", subfase:"Grupo F", jornada:3, local:"🇹🇳 Túnez",         visita:"🇳🇱 Países Bajos",    fecha:"Jue 25 Jun", hora:"20:00", estadio:"Kansas City Stadium" },
  { id:36, fase:"grupos", subfase:"Grupo F", jornada:3, local:"🇯🇵 Japón",         visita:"🇸🇪 Suecia",          fecha:"Jue 25 Jun", hora:"20:00", estadio:"Dallas Stadium" },
  // ── GRUPO G ──
  { id:37, fase:"grupos", subfase:"Grupo G", jornada:1, local:"🇧🇪 Bélgica",       visita:"🇪🇬 Egipto",          fecha:"Lun 15 Jun", hora:"16:00", estadio:"Seattle Stadium" },
  { id:38, fase:"grupos", subfase:"Grupo G", jornada:1, local:"🇮🇷 Irán",          visita:"🇳🇿 Nueva Zelanda",   fecha:"Lun 15 Jun", hora:"22:00", estadio:"Los Angeles Stadium" },
  { id:39, fase:"grupos", subfase:"Grupo G", jornada:2, local:"🇧🇪 Bélgica",       visita:"🇮🇷 Irán",            fecha:"Dom 21 Jun", hora:"16:00", estadio:"Los Angeles Stadium" },
  { id:40, fase:"grupos", subfase:"Grupo G", jornada:2, local:"🇳🇿 Nueva Zelanda", visita:"🇪🇬 Egipto",          fecha:"Dom 21 Jun", hora:"22:00", estadio:"BC Place Vancouver" },
  { id:41, fase:"grupos", subfase:"Grupo G", jornada:3, local:"🇳🇿 Nueva Zelanda", visita:"🇧🇪 Bélgica",         fecha:"Sáb 27 Jun", hora:"00:00*",estadio:"BC Place Vancouver" },
  { id:42, fase:"grupos", subfase:"Grupo G", jornada:3, local:"🇪🇬 Egipto",        visita:"🇮🇷 Irán",            fecha:"Sáb 27 Jun", hora:"00:00*",estadio:"Seattle Stadium" },
  // ── GRUPO H ──
  { id:43, fase:"grupos", subfase:"Grupo H", jornada:1, local:"🇪🇸 España",        visita:"🇨🇻 Cabo Verde",      fecha:"Lun 15 Jun", hora:"13:00", estadio:"Atlanta Stadium" },
  { id:44, fase:"grupos", subfase:"Grupo H", jornada:1, local:"🇸🇦 Arabia Saudí",  visita:"🇺🇾 Uruguay",         fecha:"Lun 15 Jun", hora:"19:00", estadio:"Miami Stadium" },
  { id:45, fase:"grupos", subfase:"Grupo H", jornada:2, local:"🇪🇸 España",        visita:"🇸🇦 Arabia Saudí",    fecha:"Dom 21 Jun", hora:"13:00", estadio:"Atlanta Stadium" },
  { id:46, fase:"grupos", subfase:"Grupo H", jornada:2, local:"🇺🇾 Uruguay",       visita:"🇨🇻 Cabo Verde",      fecha:"Dom 21 Jun", hora:"19:00", estadio:"Miami Stadium" },
  { id:47, fase:"grupos", subfase:"Grupo H", jornada:3, local:"🇺🇾 Uruguay",       visita:"🇪🇸 España",          fecha:"Vie 26 Jun", hora:"21:00", estadio:"Estadio Guadalajara" },
  { id:48, fase:"grupos", subfase:"Grupo H", jornada:3, local:"🇨🇻 Cabo Verde",    visita:"🇸🇦 Arabia Saudí",    fecha:"Vie 26 Jun", hora:"21:00", estadio:"Houston Stadium" },
  // ── GRUPO I ──
  { id:49, fase:"grupos", subfase:"Grupo I", jornada:1, local:"🇫🇷 Francia",       visita:"🇸🇳 Senegal",         fecha:"Mar 16 Jun", hora:"16:00", estadio:"MetLife, Nueva York/Nueva Jersey" },
  { id:50, fase:"grupos", subfase:"Grupo I", jornada:1, local:"🇮🇶 Irak",          visita:"🇳🇴 Noruega",         fecha:"Mar 16 Jun", hora:"19:00", estadio:"Boston Stadium" },
  { id:51, fase:"grupos", subfase:"Grupo I", jornada:2, local:"🇫🇷 Francia",       visita:"🇮🇶 Irak",            fecha:"Lun 22 Jun", hora:"18:00", estadio:"Philadelphia Stadium" },
  { id:52, fase:"grupos", subfase:"Grupo I", jornada:2, local:"🇳🇴 Noruega",       visita:"🇸🇳 Senegal",         fecha:"Lun 22 Jun", hora:"21:00", estadio:"MetLife, Nueva York/Nueva Jersey" },
  { id:53, fase:"grupos", subfase:"Grupo I", jornada:3, local:"🇳🇴 Noruega",       visita:"🇫🇷 Francia",         fecha:"Vie 26 Jun", hora:"16:00", estadio:"Boston Stadium" },
  { id:54, fase:"grupos", subfase:"Grupo I", jornada:3, local:"🇸🇳 Senegal",       visita:"🇮🇶 Irak",            fecha:"Vie 26 Jun", hora:"16:00", estadio:"Toronto Stadium" },
  // ── GRUPO J ──
  { id:55, fase:"grupos", subfase:"Grupo J", jornada:1, local:"🇦🇷 Argentina",     visita:"🇩🇿 Argelia",         fecha:"Mar 16 Jun", hora:"22:00", estadio:"Kansas City Stadium" },
  { id:56, fase:"grupos", subfase:"Grupo J", jornada:1, local:"🇦🇹 Austria",       visita:"🇯🇴 Jordania",        fecha:"Mié 17 Jun", hora:"01:00*",estadio:"San Francisco Bay Area Stadium" },
  { id:57, fase:"grupos", subfase:"Grupo J", jornada:2, local:"🇦🇷 Argentina",     visita:"🇦🇹 Austria",         fecha:"Lun 22 Jun", hora:"14:00", estadio:"Dallas Stadium" },
  { id:58, fase:"grupos", subfase:"Grupo J", jornada:2, local:"🇯🇴 Jordania",      visita:"🇩🇿 Argelia",         fecha:"Mar 23 Jun", hora:"00:00*",estadio:"San Francisco Bay Area Stadium" },
  { id:59, fase:"grupos", subfase:"Grupo J", jornada:3, local:"🇦🇷 Argentina",     visita:"🇯🇴 Jordania",        fecha:"Sáb 27 Jun", hora:"23:00", estadio:"Dallas Stadium" },
  { id:60, fase:"grupos", subfase:"Grupo J", jornada:3, local:"🇩🇿 Argelia",       visita:"🇦🇹 Austria",         fecha:"Sáb 27 Jun", hora:"23:00", estadio:"Kansas City Stadium" },
  // ── GRUPO K ──
  { id:61, fase:"grupos", subfase:"Grupo K", jornada:1, local:"🇵🇹 Portugal",      visita:"🇨🇩 RD Congo",        fecha:"Mié 17 Jun", hora:"14:00", estadio:"Houston Stadium" },
  { id:62, fase:"grupos", subfase:"Grupo K", jornada:1, local:"🇺🇿 Uzbekistán",    visita:"🇨🇴 Colombia",        fecha:"Mié 17 Jun", hora:"23:00", estadio:"Estadio Azteca, Ciudad de México" },
  { id:63, fase:"grupos", subfase:"Grupo K", jornada:2, local:"🇵🇹 Portugal",      visita:"🇺🇿 Uzbekistán",      fecha:"Mar 23 Jun", hora:"14:00", estadio:"Houston Stadium" },
  { id:64, fase:"grupos", subfase:"Grupo K", jornada:2, local:"🇨🇴 Colombia",      visita:"🇨🇩 RD Congo",        fecha:"Mar 23 Jun", hora:"23:00", estadio:"Estadio Guadalajara" },
  { id:65, fase:"grupos", subfase:"Grupo K", jornada:3, local:"🇨🇴 Colombia",      visita:"🇵🇹 Portugal",        fecha:"Sáb 27 Jun", hora:"20:30", estadio:"Miami Stadium" },
  { id:66, fase:"grupos", subfase:"Grupo K", jornada:3, local:"🇨🇩 RD Congo",      visita:"🇺🇿 Uzbekistán",      fecha:"Sáb 27 Jun", hora:"20:30", estadio:"Atlanta Stadium" },
  // ── GRUPO L ──
  { id:67, fase:"grupos", subfase:"Grupo L", jornada:1, local:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra",  visita:"🇭🇷 Croacia",          fecha:"Mié 17 Jun", hora:"17:00", estadio:"Dallas Stadium" },
  { id:68, fase:"grupos", subfase:"Grupo L", jornada:1, local:"🇬🇭 Ghana",         visita:"🇵🇦 Panamá",          fecha:"Mié 17 Jun", hora:"20:00", estadio:"Toronto Stadium" },
  { id:69, fase:"grupos", subfase:"Grupo L", jornada:2, local:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra",  visita:"🇬🇭 Ghana",            fecha:"Mar 23 Jun", hora:"17:00", estadio:"Boston Stadium" },
  { id:70, fase:"grupos", subfase:"Grupo L", jornada:2, local:"🇵🇦 Panamá",        visita:"🇭🇷 Croacia",         fecha:"Mar 23 Jun", hora:"20:00", estadio:"Toronto Stadium" },
  { id:71, fase:"grupos", subfase:"Grupo L", jornada:3, local:"🇵🇦 Panamá",        visita:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra",   fecha:"Sáb 27 Jun", hora:"18:00", estadio:"MetLife, Nueva York/Nueva Jersey" },
  { id:72, fase:"grupos", subfase:"Grupo L", jornada:3, local:"🇭🇷 Croacia",       visita:"🇬🇭 Ghana",           fecha:"Sáb 27 Jun", hora:"18:00", estadio:"Philadelphia Stadium" },
];

function generarFasesEliminatorias() {
  let partidos = [];
  let pid = 73;

  for (let i = 1; i <= 16; i++) {
    partidos.push({ id: pid++, fase: "r32", subfase: "1ra Fase", local: `Clasificado R32-${(i*2)-1}`, visita: `Clasificado R32-${i*2}` });
  }
  for (let i = 1; i <= 8; i++) {
    partidos.push({ id: pid++, fase: "r16", subfase: "16avos de Final", local: `Gan. 1ra Fase ${(i*2)-1}`, visita: `Gan. 1ra Fase ${i*2}` });
  }
  for (let i = 1; i <= 4; i++) {
    partidos.push({ id: pid++, fase: "r8", subfase: "8avos de Final", local: `Gan. 16avos ${(i*2)-1}`, visita: `Gan. 16avos ${i*2}` });
  }
  for (let i = 1; i <= 2; i++) {
    partidos.push({ id: pid++, fase: "r4", subfase: "Cuartos de Final", local: `Gan. 8avos ${(i*2)-1}`, visita: `Gan. 8avos ${i*2}` });
  }
  partidos.push({ id: pid++, fase: "semi", subfase: "Semifinal", local: "Gan. Cuarto 1", visita: "Gan. Cuarto 2" });
  partidos.push({ id: pid++, fase: "semi", subfase: "Semifinal", local: "Gan. Cuarto 3", visita: "Gan. Cuarto 4" });
  partidos.push({ id: pid++, fase: "final", subfase: "3er y 4to Puesto", local: "Perd. Semifinal 1", visita: "Perd. Semifinal 2", fecha: "Sáb 18 Jul", hora: "20:00", estadio: "AT&T Stadium, Dallas" });
  partidos.push({ id: pid++, fase: "final", subfase: "⭐ Gran Final", local: "Gan. Semifinal 1", visita: "Gan. Semifinal 2", fecha: "Dom 19 Jul", hora: "19:00", estadio: "MetLife Stadium, Nueva York/Nueva Jersey" });
  return partidos;
}

export const PARTIDOS = [...PARTIDOS_GRUPOS, ...generarFasesEliminatorias()];

export const FASES = [
  { id: "grupos", label: "Grupos" },
  { id: "r32",    label: "1ra Fase" },
  { id: "r16",    label: "16avos" },
  { id: "r8",     label: "8avos" },
  { id: "r4",     label: "Cuartos" },
  { id: "semi",   label: "Semis" },
  { id: "final",  label: "Final" },
];
