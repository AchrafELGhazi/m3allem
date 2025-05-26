import { Service } from '../../models/Service';
import { User } from '../../models/User';

const services = [
  {
    name: 'Electrical Installation',
    nameAr: 'تركيب كهربائي',
    nameFr: 'Installation électrique',
    category: 'electrical',
    description:
      'Professional electrical installation services for homes and offices',
    descriptionAr: 'خدمات التركيب الكهربائي المهنية للمنازل والمكاتب',
    descriptionFr:
      "Services d'installation électrique professionnelle pour maisons et bureaux",
    icon: 'electrical-plug',
    averagePrice: { min: 150, max: 500, unit: 'job' },
    estimatedDuration: { min: 2, max: 8, unit: 'hours' },
    requiredExperienceLevel: 'Khrayfi',
    tags: ['electrical', 'installation', 'wiring', 'safety'],
  },
  {
    name: 'Electrical Repair',
    nameAr: 'إصلاح كهربائي',
    nameFr: 'Réparation électrique',
    category: 'electrical',
    description:
      'Fix electrical issues, outlets, switches, and circuit problems',
    descriptionAr: 'إصلاح المشاكل الكهربائية والمقابس والمفاتيح ومشاكل الدوائر',
    descriptionFr:
      'Réparer les problèmes électriques, prises, interrupteurs et circuits',
    icon: 'electrical-repair',
    averagePrice: { min: 100, max: 300, unit: 'job' },
    estimatedDuration: { min: 1, max: 4, unit: 'hours' },
    requiredExperienceLevel: 'Snaaï',
    tags: ['electrical', 'repair', 'troubleshooting'],
  },

  {
    name: 'Plumbing Installation',
    nameAr: 'تركيب سباكة',
    nameFr: 'Installation de plomberie',
    category: 'plumbing',
    description:
      'Complete plumbing installation for bathrooms, kitchens, and water systems',
    descriptionAr: 'تركيب السباكة الكاملة للحمامات والمطابخ وأنظمة المياه',
    descriptionFr:
      "Installation complète de plomberie pour salles de bains, cuisines et systèmes d'eau",
    icon: 'plumbing',
    averagePrice: { min: 200, max: 800, unit: 'job' },
    estimatedDuration: { min: 3, max: 12, unit: 'hours' },
    requiredExperienceLevel: 'Khrayfi',
    tags: ['plumbing', 'installation', 'pipes', 'water'],
  },
  {
    name: 'Pipe Repair',
    nameAr: 'إصلاح الأنابيب',
    nameFr: 'Réparation de tuyaux',
    category: 'plumbing',
    description: 'Fix leaking pipes, unclog drains, and repair water fixtures',
    descriptionAr: 'إصلاح الأنابيب المتسربة وفتح المصارف وإصلاح تركيبات المياह',
    descriptionFr:
      "Réparer les fuites, déboucher les drains et réparer les installations d'eau",
    icon: 'pipe-repair',
    averagePrice: { min: 80, max: 250, unit: 'job' },
    estimatedDuration: { min: 1, max: 3, unit: 'hours' },
    requiredExperienceLevel: 'Snaaï',
    tags: ['plumbing', 'repair', 'leak', 'drain'],
  },

  {
    name: 'Interior Painting',
    nameAr: 'طلاء داخلي',
    nameFr: 'Peinture intérieure',
    category: 'painting',
    description: 'Professional interior wall painting and decoration',
    descriptionAr: 'طلاء الجدران الداخلية والديكور المهني',
    descriptionFr: 'Peinture murale intérieure professionnelle et décoration',
    icon: 'paint-brush',
    averagePrice: { min: 15, max: 35, unit: 'sqm' },
    estimatedDuration: { min: 4, max: 16, unit: 'hours' },
    requiredExperienceLevel: 'Snaaï',
    tags: ['painting', 'interior', 'walls', 'decoration'],
  },
  {
    name: 'Exterior Painting',
    nameAr: 'طلاء خارجي',
    nameFr: 'Peinture extérieure',
    category: 'painting',
    description:
      'Weather-resistant exterior painting for buildings and facades',
    descriptionAr: 'طلاء خارجي مقاوم للطقس للمباني والواجهات',
    descriptionFr:
      'Peinture extérieure résistante aux intempéries pour bâtiments et façades',
    icon: 'exterior-paint',
    averagePrice: { min: 20, max: 45, unit: 'sqm' },
    estimatedDuration: { min: 6, max: 24, unit: 'hours' },
    requiredExperienceLevel: 'Khrayfi',
    tags: ['painting', 'exterior', 'weather-resistant', 'facade'],
  },

  // Tiling Services
  {
    name: 'Floor Tiling',
    nameAr: 'تبليط الأرضيات',
    nameFr: 'Carrelage de sol',
    category: 'tiling',
    description:
      'Professional floor tiling installation with various materials',
    descriptionAr: 'تركيب تبليط الأرضيات المهني بمواد متنوعة',
    descriptionFr:
      'Installation professionnelle de carrelage de sol avec divers matériaux',
    icon: 'tiles',
    averagePrice: { min: 50, max: 150, unit: 'sqm' },
    estimatedDuration: { min: 6, max: 20, unit: 'hours' },
    requiredExperienceLevel: 'Khrayfi',
    tags: ['tiling', 'floor', 'ceramic', 'installation'],
  },
  {
    name: 'Wall Tiling',
    nameAr: 'تبليط الجدران',
    nameFr: 'Carrelage mural',
    category: 'tiling',
    description: 'Wall tiling for bathrooms, kitchens, and decorative purposes',
    descriptionAr: 'تبليط الجدران للحمامات والمطابخ والأغراض الزخرفية',
    descriptionFr:
      'Carrelage mural pour salles de bains, cuisines et décoration',
    icon: 'wall-tiles',
    averagePrice: { min: 40, max: 120, unit: 'sqm' },
    estimatedDuration: { min: 4, max: 12, unit: 'hours' },
    requiredExperienceLevel: 'Snaaï',
    tags: ['tiling', 'wall', 'bathroom', 'kitchen'],
  },

  // Plastering Services
  {
    name: 'Wall Plastering',
    nameAr: 'جبص الجدران',
    nameFr: 'Plâtrage des murs',
    category: 'plastering',
    description: 'Professional wall plastering and smoothing services',
    descriptionAr: 'خدمات جبص وتنعيم الجدران المهنية',
    descriptionFr: 'Services professionnels de plâtrage et lissage des murs',
    icon: 'plastering',
    averagePrice: { min: 25, max: 60, unit: 'sqm' },
    estimatedDuration: { min: 4, max: 16, unit: 'hours' },
    requiredExperienceLevel: 'Snaaï',
    tags: ['plastering', 'walls', 'smoothing', 'finishing'],
  },
  {
    name: 'Ceiling Plastering',
    nameAr: 'جبص الأسقف',
    nameFr: 'Plâtrage des plafonds',
    category: 'plastering',
    description: 'Ceiling plastering and decorative finishing',
    descriptionAr: 'جبص الأسقف والتشطيب الزخرفي',
    descriptionFr: 'Plâtrage des plafonds et finition décorative',
    icon: 'ceiling-plaster',
    averagePrice: { min: 30, max: 80, unit: 'sqm' },
    estimatedDuration: { min: 3, max: 10, unit: 'hours' },
    requiredExperienceLevel: 'Khrayfi',
    tags: ['plastering', 'ceiling', 'decorative', 'finishing'],
  },

  // Furniture Assembly
  {
    name: 'Furniture Assembly',
    nameAr: 'تجميع الأثاث',
    nameFr: 'Assemblage de meubles',
    category: 'furniture_assembly',
    description: 'Professional furniture assembly and installation',
    descriptionAr: 'تجميع وتركيب الأثاث المهني',
    descriptionFr: 'Assemblage et installation professionnelle de meubles',
    icon: 'furniture',
    averagePrice: { min: 50, max: 200, unit: 'job' },
    estimatedDuration: { min: 1, max: 6, unit: 'hours' },
    requiredExperienceLevel: 'Snaaï',
    tags: ['furniture', 'assembly', 'installation', 'ikea'],
  },

  // AC Services
  {
    name: 'AC Installation',
    nameAr: 'تركيب المكيف',
    nameFr: 'Installation de climatisation',
    category: 'ac_repair',
    description: 'Air conditioning installation and setup',
    descriptionAr: 'تركيب وإعداد أجهزة التكييف',
    descriptionFr: 'Installation et configuration de climatisation',
    icon: 'ac-unit',
    averagePrice: { min: 200, max: 600, unit: 'job' },
    estimatedDuration: { min: 2, max: 8, unit: 'hours' },
    requiredExperienceLevel: 'Khrayfi',
    tags: ['ac', 'installation', 'cooling', 'hvac'],
  },
  {
    name: 'AC Repair & Maintenance',
    nameAr: 'إصلاح وصيانة المكيف',
    nameFr: 'Réparation et maintenance de climatisation',
    category: 'ac_repair',
    description: 'Air conditioning repair, cleaning, and maintenance',
    descriptionAr: 'إصلاح وتنظيف وصيانة أجهزة التكييف',
    descriptionFr: 'Réparation, nettoyage et maintenance de climatisation',
    icon: 'ac-repair',
    averagePrice: { min: 100, max: 400, unit: 'job' },
    estimatedDuration: { min: 1, max: 4, unit: 'hours' },
    requiredExperienceLevel: 'Snaaï',
    tags: ['ac', 'repair', 'maintenance', 'cleaning'],
  },

  // Carpentry
  {
    name: 'Custom Carpentry',
    nameAr: 'نجارة مخصصة',
    nameFr: 'Menuiserie sur mesure',
    category: 'carpentry',
    description: 'Custom woodwork, cabinets, and furniture making',
    descriptionAr: 'أعمال خشبية مخصصة وخزائن وصناعة الأثاث',
    descriptionFr:
      'Travail du bois sur mesure, armoires et fabrication de meubles',
    icon: 'hammer',
    averagePrice: { min: 300, max: 1500, unit: 'job' },
    estimatedDuration: { min: 8, max: 48, unit: 'hours' },
    requiredExperienceLevel: 'M3allem',
    tags: ['carpentry', 'woodwork', 'custom', 'furniture'],
  },
  {
    name: 'Door & Window Installation',
    nameAr: 'تركيب الأبواب والنوافذ',
    nameFr: 'Installation de portes et fenêtres',
    category: 'carpentry',
    description: 'Professional door and window installation services',
    descriptionAr: 'خدمات تركيب الأبواب والنوافذ المهنية',
    descriptionFr:
      "Services professionnels d'installation de portes et fenêtres",
    icon: 'door',
    averagePrice: { min: 150, max: 500, unit: 'job' },
    estimatedDuration: { min: 2, max: 8, unit: 'hours' },
    requiredExperienceLevel: 'Khrayfi',
    tags: ['carpentry', 'doors', 'windows', 'installation'],
  },

  // Beauty Services
  {
    name: 'Facial Treatment',
    nameAr: 'علاج الوجه',
    nameFr: 'Soin du visage',
    category: 'beauty',
    description: 'Professional facial treatments and skincare',
    descriptionAr: 'علاجات الوجه المهنية والعناية بالبشرة',
    descriptionFr: 'Soins du visage professionnels et soins de la peau',
    icon: 'face-treatment',
    averagePrice: { min: 150, max: 400, unit: 'job' },
    estimatedDuration: { min: 60, max: 120, unit: 'minutes' },
    requiredExperienceLevel: 'Khrayfi',
    tags: ['beauty', 'facial', 'skincare', 'treatment'],
  },
  {
    name: 'Manicure & Pedicure',
    nameAr: 'مانيكير وبيديكير',
    nameFr: 'Manucure et pédicure',
    category: 'beauty',
    description: 'Professional nail care and beautification',
    descriptionAr: 'العناية المهنية بالأظافر والتجميل',
    descriptionFr: 'Soins professionnels des ongles et embellissement',
    icon: 'nail-care',
    averagePrice: { min: 80, max: 200, unit: 'job' },
    estimatedDuration: { min: 45, max: 90, unit: 'minutes' },
    requiredExperienceLevel: 'Snaaï',
    tags: ['beauty', 'nails', 'manicure', 'pedicure'],
  },

  // Hair Services
  {
    name: 'Haircut & Styling',
    nameAr: 'قص وتصفيف الشعر',
    nameFr: 'Coupe et coiffure',
    category: 'hair',
    description: 'Professional haircut and styling services for men and women',
    descriptionAr: 'خدمات قص وتصفيف الشعر المهنية للرجال والنساء',
    descriptionFr:
      'Services professionnels de coupe et coiffure pour hommes et femmes',
    icon: 'scissors',
    averagePrice: { min: 50, max: 200, unit: 'job' },
    estimatedDuration: { min: 30, max: 90, unit: 'minutes' },
    requiredExperienceLevel: 'Snaaï',
    tags: ['hair', 'haircut', 'styling', 'salon'],
  },
  {
    name: 'Hair Coloring',
    nameAr: 'صبغ الشعر',
    nameFr: 'Coloration des cheveux',
    category: 'hair',
    description: 'Professional hair coloring and highlighting services',
    descriptionAr: 'خدمات صبغ الشعر والهايلايت المهنية',
    descriptionFr: 'Services professionnels de coloration et de mèches',
    icon: 'hair-color',
    averagePrice: { min: 150, max: 500, unit: 'job' },
    estimatedDuration: { min: 90, max: 180, unit: 'minutes' },
    requiredExperienceLevel: 'Khrayfi',
    tags: ['hair', 'coloring', 'highlights', 'salon'],
  },
];

export const seedServices = async () => {
  try {
    console.log('🌱 Seeding services...');

    await Service.deleteMany({});

    const createdServices = await Service.insertMany(services);

    console.log(`✅ Successfully seeded ${createdServices.length} services`);
    return createdServices;
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  }
};
