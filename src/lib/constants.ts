import { SocialPreset, FaviconSize } from './types';

export interface ToolDef {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: 'resize' | 'convert' | 'optimize' | 'generate' | 'analyze';
  color: string;
  cardBg: string;
  cardBorder: string;
  accentBadge: string;
  buttonText: string;
}

export const TOOLS: ToolDef[] = [
  {
    slug: 'resize',
    name: 'Resize',
    description: 'Scale images by exact pixels, percentage, or max dimensions while preserving crisp quality.',
    icon: 'Maximize2',
    category: 'resize',
    color: 'from-[#44ACFF] to-[#89D4FF]',
    cardBg: 'bg-[#89D4FF]/30',
    cardBorder: 'border-[#89D4FF]/80 hover:border-[#44ACFF]',
    accentBadge: 'bg-[#44ACFF]/20 text-[#005B9C]',
    buttonText: 'text-[#005B9C]',
  },
  {
    slug: 'crop',
    name: 'Crop',
    description: 'Cut out a specific region from your image with pixel-precise touch and mouse control.',
    icon: 'Crop',
    category: 'resize',
    color: 'from-[#FE9EC7] to-[#44ACFF]',
    cardBg: 'bg-[#FE9EC7]/30',
    cardBorder: 'border-[#FE9EC7]/80 hover:border-[#FE9EC7]',
    accentBadge: 'bg-[#FE9EC7]/30 text-[#A61E55]',
    buttonText: 'text-[#A61E55]',
  },
  {
    slug: 'compress',
    name: 'Compress',
    description: 'Reduce file size intelligently with adjustable visual quality for JPEG, WebP, and PNG.',
    icon: 'Minimize2',
    category: 'optimize',
    color: 'from-[#44ACFF] to-[#F9F6C4]',
    cardBg: 'bg-[#F9F6C4]/80',
    cardBorder: 'border-[#EADF60] hover:border-[#D1C532]',
    accentBadge: 'bg-[#EFE887] text-[#635700]',
    buttonText: 'text-[#635700]',
  },
  {
    slug: 'convert',
    name: 'Convert Format',
    description: 'Transform between PNG, JPEG, WebP, AVIF, and BMP in high-speed with a single click.',
    icon: 'RefreshCw',
    category: 'convert',
    color: 'from-[#FE9EC7] to-[#F9F6C4]',
    cardBg: 'bg-gradient-to-br from-[#FE9EC7]/35 via-white/80 to-[#F9F6C4]/60',
    cardBorder: 'border-[#FE9EC7]/70 hover:border-[#FE9EC7]',
    accentBadge: 'bg-[#FE9EC7]/30 text-[#A61E55]',
    buttonText: 'text-[#A61E55]',
  },
  {
    slug: 'metadata',
    name: 'Remove Metadata',
    description: 'Strip sensitive EXIF privacy data including GPS location, camera model, and timestamps.',
    icon: 'Shield',
    category: 'optimize',
    color: 'from-[#FE9EC7] via-[#89D4FF] to-[#44ACFF]',
    cardBg: 'bg-gradient-to-br from-[#89D4FF]/35 via-white/80 to-[#FE9EC7]/30',
    cardBorder: 'border-[#89D4FF]/70 hover:border-[#44ACFF]',
    accentBadge: 'bg-[#89D4FF]/30 text-[#005B9C]',
    buttonText: 'text-[#005B9C]',
  },
  {
    slug: 'grid-split',
    name: 'Grid Split',
    description: 'Divide an image into a seamless grid of tiles for social media carousels or puzzles.',
    icon: 'Grid3X3',
    category: 'resize',
    color: 'from-[#89D4FF] via-[#F9F6C4] to-[#FE9EC7]',
    cardBg: 'bg-gradient-to-br from-[#F9F6C4]/70 via-white/80 to-[#89D4FF]/35',
    cardBorder: 'border-[#89D4FF]/60 hover:border-[#44ACFF]',
    accentBadge: 'bg-[#89D4FF]/30 text-[#005B9C]',
    buttonText: 'text-[#005B9C]',
  },
  {
    slug: 'social-presets',
    name: 'Social Media Presets',
    description: 'Auto-resize to perfect aspect ratios for Instagram, Twitter, Facebook, YouTube, and LinkedIn.',
    icon: 'Share2',
    category: 'resize',
    color: 'from-[#FE9EC7] to-[#89D4FF]',
    cardBg: 'bg-[#FE9EC7]/30',
    cardBorder: 'border-[#FE9EC7]/80 hover:border-[#FE9EC7]',
    accentBadge: 'bg-[#FE9EC7]/30 text-[#A61E55]',
    buttonText: 'text-[#A61E55]',
  },
  {
    slug: 'favicon',
    name: 'Favicon Generator',
    description: 'Generate complete multi-resolution favicon and Apple touch icon packages instantly.',
    icon: 'Star',
    category: 'generate',
    color: 'from-[#44ACFF] to-[#F9F6C4]',
    cardBg: 'bg-gradient-to-br from-[#44ACFF]/25 via-white/80 to-[#F9F6C4]/65',
    cardBorder: 'border-[#44ACFF]/60 hover:border-[#44ACFF]',
    accentBadge: 'bg-[#44ACFF]/25 text-[#005B9C]',
    buttonText: 'text-[#005B9C]',
  },
  {
    slug: 'compare',
    name: 'Before / After',
    description: 'Compare original and processed images side by side with an interactive split slider.',
    icon: 'ArrowLeftRight',
    category: 'analyze',
    color: 'from-[#44ACFF] via-[#FE9EC7] to-[#89D4FF]',
    cardBg: 'bg-gradient-to-br from-[#89D4FF]/35 via-white/80 to-[#FE9EC7]/25',
    cardBorder: 'border-[#44ACFF]/60 hover:border-[#44ACFF]',
    accentBadge: 'bg-[#44ACFF]/25 text-[#005B9C]',
    buttonText: 'text-[#005B9C]',
  },
];

export const SOCIAL_PRESETS: SocialPreset[] = [
  { name: 'Instagram Post', platform: 'Instagram', width: 1080, height: 1080, description: 'Square post (1:1)', icon: 'instagram' },
  { name: 'Instagram Portrait', platform: 'Instagram', width: 1080, height: 1350, description: 'Portrait post (4:5)', icon: 'instagram' },
  { name: 'Instagram Story', platform: 'Instagram', width: 1080, height: 1920, description: 'Story / Reel (9:16)', icon: 'instagram' },
  { name: 'Instagram Landscape', platform: 'Instagram', width: 1080, height: 566, description: 'Landscape post (1.91:1)', icon: 'instagram' },
  { name: 'Facebook Post', platform: 'Facebook', width: 1200, height: 630, description: 'Link share / post', icon: 'facebook' },
  { name: 'Facebook Cover', platform: 'Facebook', width: 820, height: 312, description: 'Page cover photo', icon: 'facebook' },
  { name: 'Facebook Profile', platform: 'Facebook', width: 170, height: 170, description: 'Profile picture', icon: 'facebook' },
  { name: 'Facebook Event', platform: 'Facebook', width: 1920, height: 1005, description: 'Event cover photo', icon: 'facebook' },
  { name: 'Twitter Post', platform: 'Twitter', width: 1200, height: 675, description: 'Tweet image (16:9)', icon: 'twitter' },
  { name: 'Twitter Header', platform: 'Twitter', width: 1500, height: 500, description: 'Profile header', icon: 'twitter' },
  { name: 'Twitter Profile', platform: 'Twitter', width: 400, height: 400, description: 'Profile picture', icon: 'twitter' },
  { name: 'LinkedIn Post', platform: 'LinkedIn', width: 1200, height: 627, description: 'Feed post', icon: 'linkedin' },
  { name: 'LinkedIn Cover', platform: 'LinkedIn', width: 1584, height: 396, description: 'Profile background', icon: 'linkedin' },
  { name: 'LinkedIn Company', platform: 'LinkedIn', width: 1128, height: 191, description: 'Company cover', icon: 'linkedin' },
  { name: 'YouTube Thumbnail', platform: 'YouTube', width: 1280, height: 720, description: 'Video thumbnail (16:9)', icon: 'youtube' },
  { name: 'YouTube Banner', platform: 'YouTube', width: 2560, height: 1440, description: 'Channel banner', icon: 'youtube' },
  { name: 'YouTube Profile', platform: 'YouTube', width: 800, height: 800, description: 'Channel picture', icon: 'youtube' },
  { name: 'Pinterest Pin', platform: 'Pinterest', width: 1000, height: 1500, description: 'Standard pin (2:3)', icon: 'pin' },
  { name: 'Pinterest Square', platform: 'Pinterest', width: 1000, height: 1000, description: 'Square pin', icon: 'pin' },
  { name: 'TikTok Video', platform: 'TikTok', width: 1080, height: 1920, description: 'Video cover (9:16)', icon: 'video' },
  { name: 'TikTok Profile', platform: 'TikTok', width: 200, height: 200, description: 'Profile picture', icon: 'video' },
  { name: 'WhatsApp Profile', platform: 'WhatsApp', width: 500, height: 500, description: 'Profile picture', icon: 'message-circle' },
  { name: 'Open Graph', platform: 'Web', width: 1200, height: 630, description: 'OG link preview', icon: 'globe' },
  { name: 'Twitter Card', platform: 'Web', width: 1200, height: 628, description: 'Large summary card', icon: 'globe' },
];

export const SOCIAL_PLATFORMS = [...new Set(SOCIAL_PRESETS.map(p => p.platform))];

export const FAVICON_SIZES: FaviconSize[] = [
  { size: 16, label: '16×16', usage: 'Browser tab icon' },
  { size: 32, label: '32×32', usage: 'Browser tab (retina)' },
  { size: 48, label: '48×48', usage: 'Windows site tile' },
  { size: 72, label: '72×72', usage: 'iOS (iPad)' },
  { size: 96, label: '96×96', usage: 'Google TV' },
  { size: 120, label: '120×120', usage: 'iOS (retina)' },
  { size: 128, label: '128×128', usage: 'Chrome Web Store' },
  { size: 144, label: '144×144', usage: 'Windows tile' },
  { size: 152, label: '152×152', usage: 'iOS (iPad retina)' },
  { size: 180, label: '180×180', usage: 'Apple Touch Icon' },
  { size: 192, label: '192×192', usage: 'Android Chrome' },
  { size: 512, label: '512×512', usage: 'PWA splash screen' },
];

export const FORMAT_OPTIONS = [
  { value: 'png', label: 'PNG', description: 'Lossless, supports transparency', ext: '.png' },
  { value: 'jpeg', label: 'JPEG', description: 'Lossy, smaller file size', ext: '.jpg' },
  { value: 'webp', label: 'WebP', description: 'Modern, excellent compression', ext: '.webp' },
  { value: 'avif', label: 'AVIF', description: 'Next-gen, best compression', ext: '.avif' },
  { value: 'bmp', label: 'BMP', description: 'Uncompressed bitmap', ext: '.bmp' },
] as const;

export const ASPECT_RATIOS = [
  { label: 'Free', value: null },
  { label: '1:1', value: '1:1' },
  { label: '4:3', value: '4:3' },
  { label: '3:2', value: '3:2' },
  { label: '16:9', value: '16:9' },
  { label: '9:16', value: '9:16' },
  { label: '2:3', value: '2:3' },
  { label: '3:4', value: '3:4' },
  { label: '21:9', value: '21:9' },
  { label: '5:4', value: '5:4' },
];

export const ACCEPTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/svg+xml',
  'image/avif',
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
