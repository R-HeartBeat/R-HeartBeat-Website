/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Leader, CaseStudy, ProductShowcase } from './types';

export const IMAGES = {
  atriumSunset: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYLfmffTNqPstoVp2s_lmq19a2RUTcL87Drt_08nefxuPaVyLgRFXLGlNJHFt9ZtdNG2_ICOPVa_UIotVIMeABcKVZWTROQWgpfFxbSAwo34NH_DlmuIs0VGADKio0jE4Eb1DtoO2BdmDCfwVG0RrpTix6JzZI-X8p5JOiN_TWnixFHHGeZ1e-6_dZeL1xRhQ3O5ocwgQLVACry9EffKPKUiNKIwmYMQryfMlXJ6ZCsBWxPMBQt2ISTG2ipKYFcMbYCTVAq_wi5g',
  alexMercer: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgo7iQHUBAnJmRF1pFMcr7-GYLIHabv74mAfrW1Vg9FchSEY-LxUHNUtdWNCxeE4leST55AlyCRvWt9fFVIgrDXtYLpm869beH4XTZhBkB8SOOOMvXXP5CaRMyg1Vk2hiNJamxhIquiNnlFC2HviOi_tQQxL9uq3w181x772Q49phizKuk6oI_KEDRS985OTMOoHcxLcnKog0eZ6GVc39SMbYog8hm_AiJfc29Ngf7crz26pz8MFgPqvJE6ZdbP9kekLFyekzYYw',
  sarahChen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoP0sWZGsyjZeGQwKEeE6i_bfkaOWj9e0cbul45M5fZTi786Qs_RwYPZZL2frliFqgW7-bEb5HLfmfEyAKnvL0WZRiGSnU2TUn6zP_1CppBoGhDTuVGY7jF67fBSWvNFa90y5p21LP-66o5D5OXc1rNDNrILgl2H4DXnT-w4W9980iS4R3ZtRZp_p7TG1DlZI-hanlkm7fUocWtuRMPbSdNUk-f9m8na1THUJPFIobfgyGRzKUeBHG7sTiVtWVB07OqvZQRZ2VCw',
  marcusThorne: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIY0V2CsxOIRSbJFkmnCR10hAmQL96LZg8VJsc95BBH50R5-hKzb0h2ZeHZ2mpncEB2AuwpUExc45l0WP0UiRVdG1pUdYV6xV2p9EV7WWRBen7IC7v1ad0e3o_6s0RhXSPu6hzr5BbQe2SStGQJzV8EcirDNlP0JsGQVwo0xJPTY4UQOMt-3thWyk66RyBsJO_y1IC3FqsoQAwMOO20u3hA9ww6g0xPkxjAwCBkMUck-1QwCzn4laRiusKSpz9-JtH7r7SExqhUw',
  elenaRodriguez: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAboAYOVyMkzlLczXF73be63vbo1x4lf7WIviIUqLI6j2ivFy67lb1sJHzaik8PK1NM2TSeR_0J1aXMvLQ6Bn2rK-mRRGLfH-Ub8OTX6NDDDrB1bPO09NLjdByiuFD2YM9CTl-79G-WMkdKZ2QJSr6Ew9_78RWNc-Q16SSm2ndkU0FioenJAANuyeJZE9SJs2wRaFO4_MydY5ED9ZEHDgR3cJPS8aN7ozQ5-YRpKHfVX106msXIeXcV-7rIEm0Q-ledoqql3h4qnw'
};

export const LEADERS: Leader[] = [
  {
    id: 'alex',
    name: 'Alex Mercer',
    role: 'Chief Innovation Officer',
    bio: 'Decades of experience spearheading deep-tech initiatives. Former senior product director in Silicon Valley, specialized in AI integration and custom hardware acceleration models.',
    avatar: IMAGES.alexMercer,
    email: 'a.mercer@r-heartbeat.com',
    linkedin: 'https://linkedin.com/in/alex-mercer-r-heartbeat',
    contributions: ['Pioneered AI-Powered Analytics pipeline', 'Authored the Dual-Model software delivery thesis', 'Established R&D partnerships with global research universities']
  },
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Head of Global Services',
    bio: 'Distinguished architect in global enterprise scale-outs. Managed multi-million dollar legacy modernizations in finance and health sectors with surgical reliability.',
    avatar: IMAGES.sarahChen,
    email: 's.chen@r-heartbeat.com',
    linkedin: 'https://linkedin.com/in/sarah-chen-r-heartbeat',
    contributions: ['Oversaw 150+ successful global deployments', 'Architected secure cloud infrastructures for major central banks', 'Maintained 99.999% uptime compliance across active enterprise clients']
  },
  {
    id: 'marcus',
    name: 'Marcus Thorne',
    role: 'VP of Product Strategy',
    bio: 'Product general with a focus on defense-grade cybersecurity and developer utilities. Guided three software products from initial whiteboard design to hyper-scale market acquisition.',
    avatar: IMAGES.marcusThorne,
    email: 'm.thorne@r-heartbeat.com',
    linkedin: 'https://linkedin.com/in/marcus-thorne-r-heartbeat',
    contributions: ['Incubated Edge Security Prototypes internally', 'Designed ApexForge, our next-gen container deployment engine', 'Drives global scaling roadmap for R-HeartBeat SaaS suite']
  },
  {
    id: 'elena',
    name: 'Elena Rodriguez',
    role: 'Director of Engineering',
    bio: 'Hands-on system designer and open-source contributor. Specializes in concurrent programming, reactive UI ecosystems, and ultra-low latency server side architectures.',
    avatar: IMAGES.elenaRodriguez,
    email: 'e.rodriguez@r-heartbeat.com',
    linkedin: 'https://linkedin.com/in/elena-rodriguez-r-heartbeat',
    contributions: ['Engineered the live real-time metrics telemetry dashboard', 'Reduced infrastructure costs by 45% using serverless microservices', 'Maintains our internal open-source developer toolkits']
  }
];

export const PRODUCTS: ProductShowcase[] = [
  {
    id: 'acuity',
    name: 'Acuity AI',
    tagline: 'AI-Powered Business Intelligence',
    description: 'Transform multi-tenant infrastructure logs and financial transactions into real-time operational foresight. Features automated anomaly detection, self-optimizing queries, and natural language report synthesis.',
    features: [
      'Automated predictive alerting',
      'Unified logs and business data analysis',
      'Instant vector search across operational files',
      'Dynamic forecasting on network metrics'
    ],
    status: 'Production',
    demoMetrics: [
      { name: 'Accuracy Rate', value: 99.4 },
      { name: 'Query Speed (ms)', value: 12 },
      { name: 'Operational Cost Reduction', value: 35 }
    ]
  },
  {
    id: 'sentinel',
    name: 'Sentinel Edge',
    tagline: 'Zero-Trust Defense-Grade Security',
    description: 'Protect edge nodes and IoT device fleets against zero-day vulnerabilities with decentralized credentialing and active visual threats maps.',
    features: [
      'Real-time automated thread analysis',
      'Decentralized cryptographic identities',
      'Micro-segmentation of private network nodes',
      'Instant isolation of compromised devices'
    ],
    status: 'Beta',
    demoMetrics: [
      { name: 'Threat Detection Time (s)', value: 0.4 },
      { name: 'Uptime Reliability', value: 99.999 },
      { name: 'Encrypted Throughput (Gbps)', value: 120 }
    ]
  },
  {
    id: 'apexforge',
    name: 'ApexForge',
    tagline: 'Next-Gen Developer & Deployment Suite',
    description: 'A lightning-fast, sandboxed micro-container execution framework that compiles and ships applications in milliseconds. Built for modern engineering teams demanding continuous deployment loops.',
    features: [
      'Instant container cold starts (< 5ms)',
      'Git-push to live production workflow',
      'Integrated live-telemetry and trace-mapping',
      'Smart micro-routing and automatic API proxying'
    ],
    status: 'R&D Lab',
    demoMetrics: [
      { name: 'Build Time (s)', value: 1.2 },
      { name: 'Cold Start Time (ms)', value: 4 },
      { name: 'Developer NPS Score', value: 92 }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Smart Grid Load Forecasting Solution',
    client: 'Global Grid Systems Inc.',
    category: 'Service Excellence',
    description: 'We collaborated with a multi-national energy distributor to optimize live power routing across 4 separate regions during extreme weather events.',
    challenge: 'Unprecedented weather volatility caused extreme load imbalances, threatening blackouts and spiking purchase prices across regional energy pools.',
    solution: 'Designed and deployed an integrated high-performance AI forecasting model that ingests weather and load data from over 2 million smart-meters and routes loads with micro-second adjustments.',
    impact: 'Reduced overall network overload risks by 84%, saved $12.4M in peak electricity procurement fees, and improved grid reliability indexes.',
    techStack: ['React', 'Python', 'Apache Kafka', 'TensorFlow', 'PostgreSQL'],
    metrics: [
      { value: '84%', label: 'Overload Risk Reduced' },
      { value: '$12.4M', label: 'Procurement Fees Saved' },
      { value: '2.4M', label: 'IoT Smart Meters Connected' }
    ]
  },
  {
    id: 'cs2',
    title: 'Legacy Modernization for Central European Bank',
    client: 'Vanguard European Trust',
    category: 'Service Excellence',
    description: 'Migrating a 35-year-old COBOL ledger system to a multi-region distributed cloud database with zero downstream service interruption.',
    challenge: 'Old monolithic ledgers prevented fast API transactions, making modern digital banking features impossible, but migration risk was deemed catastrophic.',
    solution: 'Engineered a real-time shadow ledger utilizing event sourcing, allowing parallel runs, deep cryptographic verification, and eventual incremental migration of account blocks.',
    impact: 'Successfully migrated 12 million account ledgers without a single second of service disruption, resulting in a 14x improvement in ledger transaction speeds.',
    techStack: ['TypeScript', 'Apache Flink', 'Go', 'Cassandra', 'Kubernetes'],
    metrics: [
      { value: '12M+', label: 'Ledgers Safely Migrated' },
      { value: '0 sec', label: 'Transaction Uptime Deficit' },
      { value: '14x', label: 'API Speed Acceleration' }
    ]
  },
  {
    id: 'cs3',
    title: 'Visual Security Mapping Engine',
    client: 'Sentinel Edge R&D Lab',
    category: 'Product Innovation',
    description: 'Developing high-fidelity real-time graphical maps for threat classification across distributed edge server installations.',
    challenge: 'Presenting multi-million connection records to cybersecurity engineers in a way that highlights anomalies instantly without visual over-saturation.',
    solution: 'Built a custom high-performance canvas engine with dynamic color-coding and force-directed connection clusters, integrated directly with Sentinel Edge agents.',
    impact: 'Engineers can detect threat sources 8x faster, leading to quicker incident quarantines and minimized data leaks.',
    techStack: ['React', 'd3', 'WebAssembly', 'Rust', 'WebSockets'],
    metrics: [
      { value: '8x', label: 'Quicker Threat Isolation' },
      { value: '5M+', label: 'Packets Scaled Per Second' },
      { value: '98%', label: 'Engineer Review Efficiency' }
    ]
  }
];

export const SERVICE_OFFERINGS = [
  {
    title: 'Enterprise Architecture',
    description: 'High-performance systematic designs for mission-critical digital systems. We define secure network topologies, decoupled database schemas, and robust transaction boundaries built for future scalability.',
    details: ['Multi-region global infrastructure', 'Microservice decoupled designs', 'Data governance & compliance frameworks']
  },
  {
    title: 'Legacy Modernization',
    description: 'Breathe new life into aging mainframes and monoliths. Using safe event-shadow ledgers and step-by-step decoupling techniques, we transition business-critical programs to contemporary cloud systems.',
    details: ['Risk-free shadow-ledger deployment', 'Monolith splitting strategies', 'Legacy code transpilation & translation']
  },
  {
    title: 'Managed Cloud Services',
    description: 'Continuous optimization, elastic scale-out, and hands-off server infrastructure. We handle operations, automated security updates, and real-time alerts to let your teams focus entirely on code and product logic.',
    details: ['99.999% high-availability guarantees', 'Zero-trust network boundaries', 'Active optimization for cloud spends']
  }
];
