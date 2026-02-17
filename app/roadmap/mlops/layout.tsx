import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MLOps Roadmap 2026 - Complete Learning Path | The Tutor Bridge',
  description: 'Master MLOps with our comprehensive 2026 roadmap. Learn ML pipelines, model deployment, CI/CD for ML, monitoring, Kubernetes, MLflow, and production ML systems. Start your MLOps career today!',
  keywords: [
    'mlops roadmap',
    'mlops roadmap 2026',
    'mlops learning path',
    'machine learning operations',
    'ml pipeline',
    'model deployment',
    'mlops engineer',
    'mlflow tutorial',
    'kubeflow',
    'ml monitoring',
    'feature store',
    'model registry',
    'ml infrastructure',
    'data versioning',
    'dvc',
    'ml ci/cd',
    'model serving',
    'tensorflow serving',
    'seldon core',
    'mlops tools',
    'mlops platform',
    'ml engineering',
    'production ml',
    'ml lifecycle',
    'experiment tracking',
    'mlops best practices',
    'mlops certification',
    'mlops career',
    'mlops skills',
    'mlops for beginners'
  ],
  alternates: {
    canonical: 'https://www.thetutorbridge.com/roadmap/mlops',
  },
  openGraph: {
    title: 'MLOps Roadmap 2026 - Complete Learning Path',
    description: 'Master MLOps with our comprehensive 2026 roadmap. Learn ML pipelines, model deployment, CI/CD for ML, monitoring, and production ML systems.',
    url: 'https://www.thetutorbridge.com/roadmap/mlops',
    siteName: 'The Tutor Bridge',
    type: 'article',
    images: [
      {
        url: 'https://www.thetutorbridge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MLOps Developer Roadmap 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MLOps Roadmap 2026 - Complete Learning Path',
    description: 'Master MLOps with our comprehensive 2026 roadmap. Learn ML pipelines, model deployment, CI/CD for ML, monitoring, and production ML systems.',
    images: ['https://www.thetutorbridge.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function MLOpsRoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
