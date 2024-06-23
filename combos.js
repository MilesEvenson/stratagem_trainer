const ALL_COMBOS = [
  {
    category: 'backpack',
    code: 'dlddul',
    label: 'Ballistic Shield',
    slug: 'backpack-ballistic',
  },
  {
    category: 'backpack',
    code: 'dulurd',
    label: 'Guard Dog (bullets)',
    slug: 'backpack-guard-dog-bullets',
  },
  {
    category: 'backpack',
    code: 'dulurr',
    label: 'Guard Dog (Rover Laser)',
    slug: 'backpack-guard-dog-laser',
  },
  {
    category: 'backpack',
    code: 'duudu',
    label: 'Jump Pack',
    slug: 'backpack-jump-pack',
  },
  {
    category: 'backpack',
    code: 'dulrlr',
    label: 'Shield Generator',
    slug: 'backpack-shield-generator',
  },
  {
    category: 'backpack',
    code: 'dlduud',
    label: 'Supply Pack',
    slug: 'backpack-supply-pack',
  },

  {
    category: 'eagle',
    code: 'urul',
    label: 'Eagle 110mm Rocket Pods',
    slug: 'eagle-rocket-pods',
  },
  {
    category: 'eagle',
    code: 'urddd',
    label: 'Eagle 500kg Bomb',
    slug: 'eagle-500',
  },
  {
    category: 'eagle',
    code: 'urdr',
    label: 'Eagle Airstrike',
    slug: 'eagle-airstrike',
  },
  {
    category: 'eagle',
    code: 'urddr',
    label: 'Eagle Cluster Bomb',
    slug: 'eagle-cluster',
  },
  {
    category: 'eagle',
    code: 'urdu',
    label: 'Eagle Napalm Airstrike',
    slug: 'eagle-napalm',
  },
  {
    category: 'eagle',
    code: 'urud',
    label: 'Eagle Smoke Strike',
    slug: 'eagle-smoke',
  },
  {
    category: 'eagle',
    code: 'urr',
    label: 'Eagle Strafing Run',
    slug: 'eagle-strafe',
  },


  {
    category: 'orbital',
    code: 'rrdlrd',
    label: 'Orbital 120mm HE Barrage',
    slug: 'orbital-120',
  },
  {
    category: 'orbital',
    code: 'rduuldd',
    label: 'Orbital 380 HE Barrage',
    slug: 'orbital-380',
  },
  {
    category: 'orbital',
    code: 'rrr',
    label: 'Orbital Airburst Strike',
    slug: 'orbital-airburst',
  },
  {
    category: 'orbital',
    code: 'rrld',
    label: 'Orbital EMS Strike',
    slug: 'orbital-ems',
  },
  {
    category: 'orbital',
    code: 'rrdr',
    label: 'Orbital Gas Strike',
    slug: 'orbital-gas',
  },
  {
    category: 'orbital',
    code: 'rdluu',
    label: 'Orbital Gatling Barrage',
    slug: 'orbital-gatling',
  },
  {
    category: 'orbital',
    code: 'rdurd',
    label: 'Orbital Laser',
    slug: 'orbital-laser',
  },
  {
    category: 'orbital',
    code: 'rru',
    label: 'Orbital Precision Strike',
    slug: 'orbital-precision',
  },
  {
    category: 'orbital',
    code: 'ruddr',
    label: 'Orbital Railcannon Strike',
    slug: 'orbital-railcannon',
  },
  {
    category: 'orbital',
    code: 'rrdu',
    label: 'Orbital Smoke Strike',
    slug: 'orbital-smoke',
  },
  {
    category: 'orbital',
    code: 'rdrdrd',
    label: 'Orbital Walking Barrage',
    slug: 'orbital-walking',
  },


  {
    category: 'ship',
    code: 'udrlu',
    label: 'Reinforce',
    slug: 'ship-reinforce',
  },
  {
    category: 'ship',
    code: 'ddur',
    label: 'Resupply',
    slug: 'ship-resupply',
  },

  {
    category: 'weapon',
    code: 'dlrud',
    label: 'Anti-Materiel Rifle',
    slug: 'weapon-anti-materiel',
  },
  {
    category: 'weapon',
    code: 'drdull',
    label: 'Arc Thrower',
    slug: 'weapon-arc',
  },
  {
    category: 'weapon',
    code: 'dlduur',
    label: 'Autocannon',
    slug: 'weapon-autocannon',
  },
  {
    category: 'weapon',
    code: 'ddlur',
    label: 'Expendable Anti-Tank',
    slug: 'weapon-eat',
  },
  {
    category: 'weapon',
    code: 'dludu',
    label: 'Flamethrower',
    slug: 'weapon-flamethrower',
  },
  {
    category: 'weapon',
    code: 'dluld',
    label: 'Grenade Launcher',
    slug: 'weapon-grenade-launcher',
  },
  {
    category: 'weapon',
    code: 'dldul',
    label: 'Laser Cannon',
    slug: 'weapon-laser-cannon',
  },
  {
    category: 'weapon',
    code: 'ddulr',
    label: 'Quasar Cannon',
    slug: 'weapon-quasar',
  },
  {
    category: 'weapon',
    code: 'drdulr',
    label: 'Railgun',
    slug: 'weapon-railgun',
  },
  {
    category: 'weapon',
    code: 'dlrrl',
    label: 'Recoilless Rifle',
    slug: 'weapon-recoilless',
  },
  {
    category: 'weapon',
    code: 'ddudd',
    label: 'Spear',
    slug: 'weapon-spear',
  },
];

