'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  Eye,
  Brain,
  Camera,
  Box,
  Layers,
  Cpu,
  Video,
  Scan,
  Car,
  Zap,
  Code,
  Database
} from 'lucide-react';
import {
  RoadmapHero,
  WhatIsSection,
  VisualRoadmapSection,
  SalarySection,
  ProjectsSection,
  FAQSection,
  RelatedRoadmapsSection,
  CTASection,
  RoadmapStage
} from '@/components/roadmap/RoadmapComponents';

const roadmapStages: RoadmapStage[] = [
  {
    title: 'Programming & Math Foundation',
    icon: Code,
    color: 'bg-blue-500',
    steps: [
      {
        id: 1,
        title: 'Python & Libraries',
        description: 'Core programming',
        topics: ['Python Fundamentals', 'NumPy', 'Matplotlib', 'Pandas', 'PIL/Pillow', 'Data Manipulation']
      },
      {
        id: 2,
        title: 'Mathematics',
        description: 'Mathematical foundations',
        topics: ['Linear Algebra', 'Calculus', 'Probability', 'Statistics', 'Matrix Operations', 'Optimization']
      }
    ],
    milestone: 'You have programming foundation!'
  },
  {
    title: 'Image Processing Fundamentals',
    icon: Camera,
    color: 'bg-green-500',
    steps: [
      {
        id: 3,
        title: 'Image Basics',
        description: 'Digital image fundamentals',
        topics: ['Image Representation', 'Color Spaces', 'Histograms', 'Image I/O', 'Pixel Operations', 'Image Types']
      },
      {
        id: 4,
        title: 'OpenCV Basics',
        description: 'Core image processing',
        topics: ['Filtering', 'Edge Detection', 'Morphological Ops', 'Contours', 'Thresholding', 'Geometric Transforms']
      }
    ]
  },
  {
    title: 'Classical Computer Vision',
    icon: Eye,
    color: 'bg-purple-500',
    steps: [
      {
        id: 5,
        title: 'Feature Detection',
        description: 'Traditional CV methods',
        topics: ['Harris Corners', 'SIFT/SURF', 'ORB Features', 'Feature Matching', 'Homography', 'RANSAC']
      },
      {
        id: 6,
        title: 'Camera Geometry',
        description: 'Multi-view geometry',
        topics: ['Camera Models', 'Calibration', 'Stereo Vision', 'Depth Estimation', 'Epipolar Geometry', '3D Reconstruction']
      }
    ],
    milestone: 'You know classical CV!'
  },
  {
    title: 'Deep Learning Fundamentals',
    icon: Brain,
    color: 'bg-orange-500',
    steps: [
      {
        id: 7,
        title: 'Neural Networks',
        description: 'Deep learning basics',
        topics: ['Perceptrons', 'Activation Functions', 'Backpropagation', 'Loss Functions', 'Optimizers', 'Regularization']
      },
      {
        id: 8,
        title: 'Frameworks',
        description: 'PyTorch & TensorFlow',
        topics: ['PyTorch Basics', 'TensorFlow/Keras', 'Tensors', 'Autograd', 'Model Training', 'GPU Acceleration']
      }
    ]
  },
  {
    title: 'CNNs & Image Classification',
    icon: Layers,
    color: 'bg-cyan-500',
    steps: [
      {
        id: 9,
        title: 'CNN Architecture',
        description: 'Convolutional networks',
        topics: ['Convolutions', 'Pooling', 'LeNet/AlexNet', 'VGG', 'ResNet', 'Transfer Learning']
      },
      {
        id: 10,
        title: 'Modern Architectures',
        description: 'State-of-the-art models',
        topics: ['EfficientNet', 'Vision Transformers (ViT)', 'Attention Mechanisms', 'Pre-training', 'Fine-tuning', 'Model Selection']
      }
    ],
    milestone: 'You can build classifiers!'
  },
  {
    title: 'Object Detection',
    icon: Box,
    color: 'bg-yellow-500',
    steps: [
      {
        id: 11,
        title: 'Detection Fundamentals',
        description: 'Locate objects in images',
        topics: ['R-CNN Family', 'YOLO Series', 'SSD', 'Anchor Boxes', 'NMS', 'mAP Metrics']
      },
      {
        id: 12,
        title: 'Modern Detection',
        description: 'Latest approaches',
        topics: ['YOLOv8/YOLO11', 'DETR', 'Anchor-Free Methods', 'Real-Time Detection', 'Multi-Scale Detection', 'Custom Training']
      }
    ]
  },
  {
    title: 'Segmentation',
    icon: Scan,
    color: 'bg-pink-500',
    steps: [
      {
        id: 13,
        title: 'Image Segmentation',
        description: 'Pixel-level understanding',
        topics: ['Semantic Segmentation', 'Instance Segmentation', 'U-Net', 'Mask R-CNN', 'DeepLab', 'Panoptic Segmentation']
      },
      {
        id: 14,
        title: 'Foundation Models',
        description: 'Modern segmentation',
        topics: ['SAM (Segment Anything)', 'Prompt-Based Segmentation', 'Zero-Shot Segmentation', 'Interactive Segmentation', 'Video Segmentation']
      }
    ],
    milestone: 'You can segment images!'
  },
  {
    title: 'Video & Temporal Analysis',
    icon: Video,
    color: 'bg-indigo-500',
    steps: [
      {
        id: 15,
        title: 'Video Processing',
        description: 'Analyze video streams',
        topics: ['Video I/O', 'Frame Extraction', 'Optical Flow', 'Background Subtraction', 'Video Stabilization', 'Tracking']
      },
      {
        id: 16,
        title: 'Object Tracking',
        description: 'Track objects across frames',
        topics: ['SORT/DeepSORT', 'ByteTrack', 'Multi-Object Tracking', 'Re-identification', 'Trajectory Prediction', 'Occlusion Handling']
      }
    ]
  },
  {
    title: 'Specialized Applications',
    icon: Cpu,
    color: 'bg-teal-500',
    steps: [
      {
        id: 17,
        title: 'Face & Human Analysis',
        description: 'Human-centric vision',
        topics: ['Face Detection', 'Face Recognition', 'Pose Estimation', 'Action Recognition', 'Emotion Detection', 'Gesture Recognition']
      },
      {
        id: 18,
        title: 'OCR & Document',
        description: 'Text in images',
        topics: ['Text Detection', 'Text Recognition', 'Document Layout', 'Table Extraction', 'Handwriting Recognition', 'Scene Text']
      }
    ]
  },
  {
    title: 'Generative Vision',
    icon: Zap,
    color: 'bg-rose-500',
    steps: [
      {
        id: 19,
        title: 'Generative Models',
        description: 'Create visual content',
        topics: ['GANs', 'VAEs', 'Diffusion Models', 'Stable Diffusion', 'Image Generation', 'Style Transfer']
      },
      {
        id: 20,
        title: 'Vision-Language',
        description: 'Multi-modal AI',
        topics: ['CLIP', 'Image Captioning', 'Visual QA', 'Text-to-Image', 'Multimodal LLMs', 'GPT-4V']
      }
    ]
  },
  {
    title: 'Deployment & Production',
    icon: Car,
    color: 'bg-emerald-500',
    steps: [
      {
        id: 21,
        title: 'Model Optimization',
        description: 'Production-ready models',
        topics: ['Quantization', 'Pruning', 'Knowledge Distillation', 'ONNX', 'TensorRT', 'Model Compression']
      },
      {
        id: 22,
        title: 'Edge Deployment',
        description: 'Deploy to devices',
        topics: ['Edge Devices', 'NVIDIA Jetson', 'Mobile Deployment', 'OpenVINO', 'TFLite', 'Real-Time Inference']
      }
    ],
    milestone: 'You are a Computer Vision Engineer!'
  }
];

const usaSalaries = [
  { level: 'Entry (0-2 yrs)', range: '$85K - $115K', avg: '$100K' },
  { level: 'Mid (2-5 yrs)', range: '$115K - $160K', avg: '$135K' },
  { level: 'Senior (5-8 yrs)', range: '$150K - $210K', avg: '$180K' },
  { level: 'Staff/Principal (8+ yrs)', range: '$200K - $300K+', avg: '$240K' }
];

const indiaSalaries = [
  { level: 'Fresher (0-1 yr)', range: '₹6L - ₹12L', avg: '₹9L' },
  { level: 'Junior (1-3 yrs)', range: '₹12L - ₹22L', avg: '₹16L' },
  { level: 'Mid (3-5 yrs)', range: '₹20L - ₹38L', avg: '₹28L' },
  { level: 'Senior (5+ yrs)', range: '₹35L - ₹65L+', avg: '₹48L' }
];

const projects = [
  { title: 'Image Classifier', level: 'Beginner' as const, description: 'CNN classification app', skills: ['PyTorch', 'Transfer Learning', 'Data Augmentation', 'Gradio UI'] },
  { title: 'Face Detection System', level: 'Beginner' as const, description: 'Real-time face detection', skills: ['OpenCV', 'Haar Cascades', 'Video Processing', 'Bounding Boxes'] },
  { title: 'Object Detection API', level: 'Intermediate' as const, description: 'YOLOv8 detection service', skills: ['YOLOv8', 'FastAPI', 'Docker', 'Custom Training'] },
  { title: 'Document Scanner', level: 'Intermediate' as const, description: 'OCR with preprocessing', skills: ['Edge Detection', 'Perspective Transform', 'Tesseract', 'Text Extraction'] },
  { title: 'Video Analytics System', level: 'Advanced' as const, description: 'Multi-object tracking', skills: ['DeepSORT', 'Counting', 'Heatmaps', 'Real-Time Processing'] },
  { title: 'Autonomous Vehicle Module', level: 'Advanced' as const, description: 'Lane and object detection', skills: ['Segmentation', 'Depth Estimation', 'Sensor Fusion', 'Edge Deployment'] }
];

const faqs = [
  {
    question: 'What programming skills do I need for computer vision?',
    answer: 'Python is essential - 95%+ of CV work uses Python. Master NumPy for array operations, OpenCV for image processing, and PyTorch/TensorFlow for deep learning. C++ knowledge helps for performance-critical applications and edge deployment.'
  },
  {
    question: 'How long does it take to become a CV engineer?',
    answer: 'With programming background, 6-9 months for foundational CV skills. Deep learning expertise takes 12-18 months. Specialization in areas like autonomous vehicles or medical imaging adds another year. The field evolves rapidly - continuous learning is required.'
  },
  {
    question: 'Do I need a PhD for computer vision jobs?',
    answer: 'No, but it helps for research roles. Most industry positions accept MS or BS with strong portfolio. Practical skills and projects matter more than degrees. Research publications are valuable but not required outside research-focused teams.'
  },
  {
    question: 'Is computer vision a good career in 2026?',
    answer: 'Excellent career prospects. Autonomous vehicles, medical imaging, retail, manufacturing, and AR/VR drive demand. Foundation models (SAM, CLIP) are creating new applications. Competition is intense for top roles, but demand exceeds supply overall.'
  },
  {
    question: 'PyTorch or TensorFlow for computer vision?',
    answer: 'PyTorch dominates research and is gaining in industry. TensorFlow is strong in production, especially mobile (TFLite). Most CV engineers learn both. Start with PyTorch - more intuitive and better for learning. Add TensorFlow for deployment skills.'
  },
  {
    question: 'How important is math for computer vision?',
    answer: 'Very important. Linear algebra is essential for understanding transformations and neural networks. Calculus for backpropagation. Probability/statistics for model evaluation. You don\'t need to derive everything, but intuition matters for debugging and innovation.'
  },
  {
    question: 'What hardware do I need for CV development?',
    answer: 'GPU is essential for deep learning. NVIDIA RTX 3060+ or cloud GPUs (Google Colab, AWS). 16GB+ RAM recommended. For edge work, get a Jetson Nano. Most learning can be done with free cloud GPUs initially.'
  },
  {
    question: 'How do I build a computer vision portfolio?',
    answer: 'Build end-to-end projects: data collection, training, deployment. Document on GitHub with clear READMEs. Include notebooks and demos. Show variety: classification, detection, segmentation. Deploy at least one project as API or app. Kaggle competitions help too.'
  }
];

const relatedRoadmaps = [
  { title: 'Machine Learning', description: 'ML fundamentals', href: '/roadmap/machine-learning', icon: Brain, color: 'bg-purple-500' },
  { title: 'AI Engineer', description: 'Applied AI skills', href: '/roadmap/ai-engineer', icon: Cpu, color: 'bg-blue-500' },
  { title: 'Data Scientist', description: 'Data analysis', href: '/roadmap/data-scientist', icon: Database, color: 'bg-green-500' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Computer Vision Engineer Roadmap 2026',
  description: 'Complete guide to becoming a Computer Vision Engineer in 2026',
  author: { '@type': 'Organization', name: 'The Tutor Bridge' },
  publisher: { '@type': 'Organization', name: 'The Tutor Bridge' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
};

export default function ComputerVisionRoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <RoadmapHero
          title="Computer Vision Engineer Roadmap"
          description="Master OpenCV, deep learning, CNNs, object detection, segmentation, and visual AI. Your complete guide to becoming a Computer Vision Engineer in 2026."
          duration="8-14 Months"
          difficulty="Advanced"
          accentColor="#8B5CF6"
        />
        <WhatIsSection
          title="What is a Computer Vision Engineer?"
          paragraphs={[
            'Computer Vision Engineers develop systems that enable machines to interpret and understand visual information from images and videos. They build AI models for detection, recognition, segmentation, and visual understanding.',
            'As a Computer Vision Engineer, you will train deep learning models, process images and video streams, deploy vision systems to edge devices, and solve real-world problems in autonomous vehicles, healthcare, retail, and more.'
          ]}
          responsibilities={[
            'Build image classification and object detection models',
            'Develop video analytics and tracking systems',
            'Train and fine-tune CNNs and vision transformers',
            'Process and augment image/video datasets',
            'Deploy models to edge devices and cloud',
            'Optimize models for real-time inference',
            'Collaborate with product teams on visual AI features'
          ]}
        />
        <VisualRoadmapSection stages={roadmapStages} accentColor="#8B5CF6" />
        <SalarySection
          title="Computer Vision Engineer Salaries 2026"
          usaSalaries={usaSalaries}
          indiaSalaries={indiaSalaries}
          tip="Autonomous vehicle and medical imaging companies pay premium salaries. Expertise in foundation models (SAM, CLIP) is highly valued. Edge deployment skills add significant value. Research publications boost compensation at senior levels."
          gradient="bg-gradient-to-r from-violet-500 to-purple-500"
        />
        <ProjectsSection projects={projects} />
        <FAQSection faqs={faqs} />
        <RelatedRoadmapsSection roadmaps={relatedRoadmaps} />
        <CTASection
          title="Ready to Start Your Computer Vision Journey?"
          description="Get personalized guidance from experienced CV engineers who have built production vision systems."
          gradient="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
        />
      </main>
      <Footer />
    </>
  );
}
