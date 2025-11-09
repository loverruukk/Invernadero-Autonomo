import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeding de la base de datos...');

  // Limpiar datos existentes (opcional)
  console.log('🗑️  Limpiando datos existentes...');
  await prisma.pestTreatment.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.pest.deleteMany();

  // Crear Plagas
  console.log('🐛 Creando plagas de ejemplo...');
  
  const tutaAbsoluta = await prisma.pest.create({
    data: {
      scientificName: 'Tuta absoluta',
      commonName: 'Tuta Absoluta',
      description:
        'Polilla del tomate. Lepidóptero que causa graves daños en cultivos de tomate, formando galerías en hojas, tallos y frutos.',
    },
  });
  console.log('  ✅ Creada: Tuta Absoluta');

  const aranaRoja = await prisma.pest.create({
    data: {
      scientificName: 'Tetranychus urticae',
      commonName: 'Araña Roja',
      description:
        'Ácaro fitófago que produce decoloración y desecación de hojas. Muy común en invernaderos con ambiente seco y caluroso.',
    },
  });
  console.log('  ✅ Creada: Araña Roja');

  const moscaBlanca = await prisma.pest.create({
    data: {
      scientificName: 'Bemisia tabaci',
      commonName: 'Mosca Blanca',
      description:
        'Insecto homóptero que succiona la savia y transmite virus. Produce melaza que favorece el desarrollo de hongos.',
    },
  });
  console.log('  ✅ Creada: Mosca Blanca');

  // Crear Tratamientos
  console.log('🧪 Creando tratamientos fitosanitarios...');

  const abamectina = await prisma.treatment.create({
    data: {
      productName: 'Abamectina 1.8% EC',
      activeComponent: 'Abamectina',
      description:
        'Insecticida-acaricida de origen biológico. Efectivo contra ácaros, minadores y lepidópteros. Acción por contacto e ingestión.',
    },
  });
  console.log('  ✅ Creado: Abamectina 1.8% EC');

  const azufre = await prisma.treatment.create({
    data: {
      productName: 'Azufre Mojable 80%',
      activeComponent: 'Azufre',
      description:
        'Acaricida y fungicida de contacto. Muy efectivo contra ácaros (araña roja) y oídio. De origen mineral.',
    },
  });
  console.log('  ✅ Creado: Azufre Mojable 80%');

  const spinosad = await prisma.treatment.create({
    data: {
      productName: 'Spinosad 12% SC',
      activeComponent: 'Spinosad',
      description:
        'Insecticida biológico derivado de la fermentación bacteriana. Excelente control de trips, minadores y lepidópteros.',
    },
  });
  console.log('  ✅ Creado: Spinosad 12% SC');

  const aceiteParafina = await prisma.treatment.create({
    data: {
      productName: 'Aceite de Parafina 83%',
      activeComponent: 'Aceite mineral',
      description:
        'Insecticida-acaricida de contacto. Actúa por asfixia sobre huevos, larvas y adultos de mosca blanca, pulgones y ácaros.',
    },
  });
  console.log('  ✅ Creado: Aceite de Parafina 83%');

  const beauveria = await prisma.treatment.create({
    data: {
      productName: 'Beauveria bassiana',
      activeComponent: 'Beauveria bassiana',
      description:
        'Hongo entomopatógeno para control biológico. Efectivo contra mosca blanca, trips y ácaros. Acción por contacto.',
    },
  });
  console.log('  ✅ Creado: Beauveria bassiana');

  // Crear relaciones PestTreatment (Araña Roja con 2 tratamientos)
  console.log('🔗 Creando relaciones Plaga-Tratamiento...');

  await prisma.pestTreatment.create({
    data: {
      pestId: aranaRoja.id,
      treatmentId: azufre.id,
    },
  });
  console.log('  ✅ Conectado: Araña Roja ↔ Azufre Mojable 80%');

  await prisma.pestTreatment.create({
    data: {
      pestId: aranaRoja.id,
      treatmentId: abamectina.id,
    },
  });
  console.log('  ✅ Conectado: Araña Roja ↔ Abamectina 1.8% EC');

  // Resumen
  console.log('\n📊 Resumen del seeding:');
  const pestCount = await prisma.pest.count();
  const treatmentCount = await prisma.treatment.count();
  const pestTreatmentCount = await prisma.pestTreatment.count();

  console.log(`  - ${pestCount} plagas creadas`);
  console.log(`  - ${treatmentCount} tratamientos creados`);
  console.log(`  - ${pestTreatmentCount} relaciones plaga-tratamiento creadas`);
  
  console.log('\n✅ Seeding completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
