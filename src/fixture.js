// Fixture oficial Mundial 2026 - Grupos confirmados post-repechajes
export const GRUPOS = {
  A: ["🇲🇽 México", "🇿🇦 Sudáfrica", "🇰🇷 Corea del Sur", "🇨🇿 R. Checa"],
  B: ["🇨🇦 Canadá", "🇧🇦 Bosnia-Herzegovina", "🇶🇦 Qatar", "🇨🇭 Suiza"],
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

function generarPartidos() {
  let partidos = [];
  let pid = 1;

  // Fase de grupos: todos contra todos dentro de cada grupo
  Object.entries(GRUPOS).forEach(([g, equipos]) => {
    const cruces = [
      [0, 1], [2, 3], // Jornada 1
      [0, 2], [1, 3], // Jornada 2
      [0, 3], [1, 2], // Jornada 3
    ];
    cruces.forEach(([a, b], idx) => {
      partidos.push({
        id: pid++,
        fase: "grupos",
        subfase: `Grupo ${g}`,
        jornada: Math.floor(idx / 2) + 1,
        local: equipos[a],
        visita: equipos[b],
      });
    });
  });

  // 1ra Fase eliminatoria (32 → 16 partidos)
  const siglasGrupos = Object.keys(GRUPOS);
  for (let i = 0; i < siglasGrupos.length; i++) {
    const g = siglasGrupos[i];
    const gSig = siglasGrupos[(i + 1) % siglasGrupos.length];
    partidos.push({
      id: pid++,
      fase: "r32",
      subfase: "1ra Fase",
      local: `1° Grupo ${g}`,
      visita: `2° Grupo ${gSig}`,
    });
  }
  for (let i = 1; i <= 4; i++) {
    partidos.push({
      id: pid++,
      fase: "r32",
      subfase: "1ra Fase",
      local: `Mejor 3° #${i}`,
      visita: `Clasificado R32-${i}`,
    });
  }

  // 16avos (16 → 8)
  for (let i = 1; i <= 8; i++) {
    partidos.push({
      id: pid++,
      fase: "r16",
      subfase: "16avos de Final",
      local: `Ganador R32 partido ${(i * 2) - 1}`,
      visita: `Ganador R32 partido ${i * 2}`,
    });
  }

  // 8avos (8 → 4)
  for (let i = 1; i <= 4; i++) {
    partidos.push({
      id: pid++,
      fase: "r8",
      subfase: "8avos de Final",
      local: `Ganador 16avos partido ${(i * 2) - 1}`,
      visita: `Ganador 16avos partido ${i * 2}`,
    });
  }

  // Cuartos (4 → 2)
  for (let i = 1; i <= 2; i++) {
    partidos.push({
      id: pid++,
      fase: "r4",
      subfase: "Cuartos de Final",
      local: `Ganador 8avos partido ${(i * 2) - 1}`,
      visita: `Ganador 8avos partido ${i * 2}`,
    });
  }

  // Semis
  partidos.push({ id: pid++, fase: "semi", subfase: "Semifinal", local: "Ganador Cuarto 1", visita: "Ganador Cuarto 2" });
  partidos.push({ id: pid++, fase: "semi", subfase: "Semifinal", local: "Ganador Cuarto 3", visita: "Ganador Cuarto 4" });

  // 3er puesto y Final
  partidos.push({ id: pid++, fase: "final", subfase: "3er y 4to Puesto", local: "Perdedor SF1", visita: "Perdedor SF2" });
  partidos.push({ id: pid++, fase: "final", subfase: "⭐ Gran Final", local: "Ganador SF1", visita: "Ganador SF2" });

  return partidos;
}

export const PARTIDOS = generarPartidos();

export const FASES = [
  { id: "grupos", label: "Grupos" },
  { id: "r32",    label: "1ra Fase" },
  { id: "r16",    label: "16avos" },
  { id: "r8",     label: "8avos" },
  { id: "r4",     label: "Cuartos" },
  { id: "semi",   label: "Semis" },
  { id: "final",  label: "Final" },
];
